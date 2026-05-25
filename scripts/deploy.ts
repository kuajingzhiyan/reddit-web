/**
 * 本地构建 + SSH(SFTP) 上传到服务器（不依赖 rsync）
 * 配置：复制 .env.deploy.example 为 .env.deploy
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client, type ConnectConfig, type SFTPWrapper } from 'ssh2'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv(filePath: string) {
  if (!existsSync(filePath))
    return
  for (const line of readFileSync(filePath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#'))
      continue
    const i = trimmed.indexOf('=')
    if (i === -1)
      continue
    const key = trimmed.slice(0, i).trim()
    let val = trimmed.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\'')))
      val = val.slice(1, -1)
    if (!(key in process.env))
      process.env[key] = val
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    console.error(`[deploy] 缺少 ${name}，请在 .env.deploy 中配置`)
    process.exit(1)
  }
  return value
}

function assertSafeRemoteDeployPath(remotePath: string) {
  if (!remotePath.startsWith('/'))
    throw new Error(`DEPLOY_PATH 必须是绝对路径，当前：${remotePath}`)
  if (remotePath.includes('\n') || remotePath.includes('..'))
    throw new Error('DEPLOY_PATH 含非法字符')
}

function shellQuoteRemote(p: string) {
  return `'${p.replace(/'/g, `'\\''`)}'`
}

function run(cmd: string, args: string[]) {
  console.log(`\n> ${cmd} ${args.join(' ')}`)
  /** shell:false：避免 Node 带 shell:true 时出现 DEP0190，且仍能解析 PATH 中的 pnpm/cmd */
  const r = spawnSync(cmd, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: false,
  })
  if (r.status !== 0)
    process.exit(r.status ?? 1)
}

/** 递归列出文件：相对路径 + 磁盘绝对路径 */
function walkFiles(dir: string, baseLen: number): { rel: string; abs: string }[] {
  const out: { rel: string; abs: string }[] = []
  for (const name of readdirSync(dir)) {
    const abs = path.join(dir, name)
    const rel = abs.slice(baseLen).replace(/^[/\\]/, '')
    const st = statSync(abs)
    if (st.isDirectory())
      out.push(...walkFiles(abs, baseLen))
    else
      out.push({ rel: rel.replace(/\\/g, '/'), abs })
  }
  return out
}

function collectRemoteDirs(remoteBase: string, relPaths: string[]): string[] {
  const set = new Set<string>()
  for (const rel of relPaths) {
    const posix = rel.replace(/\\/g, '/')
    const dir = posix.includes('/') ? posix.slice(0, posix.lastIndexOf('/')) : ''
    if (!dir)
      continue
    const segments = dir.split('/')
    for (let i = 1; i <= segments.length; i++) {
      const sub = segments.slice(0, i).join('/')
      set.add(`${remoteBase}/${sub}`)
    }
  }
  return [...set].sort((a, b) => a.length - b.length)
}

function connectSsh(cfg: ConnectConfig): Promise<Client> {
  const readyTimeoutMs = Number(process.env.DEPLOY_SSH_READY_TIMEOUT_MS?.trim() || '20000')

  const effectiveCfg: ConnectConfig = {
    ...cfg,
    // 握手超时：网络差或未开端口时及早失败，而非长时间无响应
    readyTimeout: Number.isFinite(readyTimeoutMs) ? readyTimeoutMs : 20000,
  }

  return new Promise((resolve, reject) => {
    const conn = new Client()

    conn
      .on('ready', () => resolve(conn))
      .on('error', reject)

    conn.connect(effectiveCfg)
  })
}

/**
 * 在远端执行 Shell 命令。
 * 必须监听并消费 ssh2 exec 的 stdout，否则缓冲区满远端会阻塞（表现为卡住）。
 */
function execRemote(conn: Client, command: string, label?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err)
        return
      }

      let errTail = ''

      /** 排空 stdout（避免远端写满缓冲区阻塞）；stderr 保留末尾便于失败时排查 */
      stream.on('data', () => {})

      stream.stderr.on('data', (d: Buffer) => {
        errTail += d.toString()
        if (errTail.length > 8000)
          errTail = errTail.slice(-4000)
      })

      stream.on('close', (code) => {
        if (code === 0) {
          if (process.env.DEPLOY_VERBOSE === '1' && label)
            console.log(`[deploy] ${label} ✓`)
          resolve()
        }
        else {
          const hint = errTail.trim() || '(无 stderr)'
          reject(new Error(`${label ?? 'SSH exec'} exit ${code}: ${hint}`))
        }
      })
    })
  })
}

function sftpFastPut(sftp: SFTPWrapper, localPath: string, remotePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    sftp.fastPut(localPath, remotePath, {}, (err) => {
      if (err)
        reject(err)
      else
        resolve()
    })
  })
}

loadEnv(path.join(projectRoot, '.env.deploy'))

const host = requireEnv('DEPLOY_HOST')
const user = requireEnv('DEPLOY_USER')
const deployPathRaw = requireEnv('DEPLOY_PATH')
const deployPath = deployPathRaw.replace(/\/+$/, '')
const port = Number(process.env.DEPLOY_PORT?.trim() || '22')
const sshKey = process.env.DEPLOY_KEY?.trim()
const sshPassword = process.env.DEPLOY_PASSWORD?.trim()
const remoteCmd = process.env.DEPLOY_REMOTE_CMD?.trim()

console.log(`[deploy] SSH ${user}@${host}:${port} -> ${deployPath}`)

run('pnpm', ['generate'])

const localDir = path.join(projectRoot, '.output/public')
if (!existsSync(localDir)) {
  console.error(`[deploy] 构建产物不存在: ${localDir}`)
  process.exit(1)
}

assertSafeRemoteDeployPath(deployPath)

const files = walkFiles(localDir, localDir.length)
console.log(`[deploy] 待上传文件数: ${files.length}`)

function buildConnectConfig(): ConnectConfig {
  const config: ConnectConfig = {
    host,
    port,
    username: user,
  }
  if (sshKey)
    config.privateKey = readFileSync(sshKey)
  else if (sshPassword)
    config.password = sshPassword
  else {
    console.error('[deploy] 请在 .env.deploy 中配置 DEPLOY_KEY（私钥）或 DEPLOY_PASSWORD')
    process.exit(1)
  }
  return config
}

;(async () => {
  console.log('\n[deploy] 连接 SSH...')
  const conn = await connectSsh(buildConnectConfig())
  console.log('[deploy] SSH 已连接')

  try {
    // 整目录删掉再建，比 find … rm 更稳，也少踩 BusyBox/find 差异
    const clearCmd = `rm -rf ${shellQuoteRemote(deployPath)} && mkdir -p ${shellQuoteRemote(deployPath)}`
    console.log('\n[deploy] 清空远端部署目录...')
    await execRemote(conn, clearCmd, '清空部署目录')

    // 预创建多级目录（比逐文件 SFTP mkdir 可靠）
    const relList = files.map(f => f.rel)
    const mkdirChunks = collectRemoteDirs(deployPath, relList).map(d => `mkdir -p ${shellQuoteRemote(d)}`)
    if (mkdirChunks.length > 0) {
      console.log('\n[deploy] 创建远端子目录...')
      /** 单次 exec 过长时拆批（避免命令行超限） */
      const MAX_BATCH = 60
      for (let i = 0; i < mkdirChunks.length; i += MAX_BATCH) {
        const slice = mkdirChunks.slice(i, i + MAX_BATCH)
        await execRemote(conn, slice.join(' && '))
      }
    }

    const sftp = await new Promise<SFTPWrapper>((resolve, reject) => {
      conn.sftp((err, sftp) => {
        if (err)
          reject(err)
        else if (sftp)
          resolve(sftp)
        else
          reject(new Error('SFTP 未就绪'))
      })
    })

    let n = 0
    for (const { rel, abs } of files) {
      const remoteFull = `${deployPath}/${rel}`
      await sftpFastPut(sftp, abs, remoteFull)
      n++
      if (n % 50 === 0 || n === files.length)
        console.log(`[deploy] 已上传 ${n}/${files.length}`)
    }

    sftp.end?.()
  }
  finally {
    if (remoteCmd) {
      console.log('\n[deploy] 执行远程命令...')
      await execRemote(conn, remoteCmd)
    }
    conn.end()
  }

  console.log('\n[deploy] 完成')
})().catch((err) => {
  console.error('[deploy] 失败:', err)
  process.exit(1)
})
