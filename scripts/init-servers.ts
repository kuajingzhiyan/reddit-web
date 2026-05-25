import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Client, type ConnectConfig } from 'ssh2'
import { serverConfig, type ServerItem } from '../config/server-config.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// 从 .env.init 读取 INIT_SSH_PASSWORD
loadEnv(path.join(projectRoot, '.env.init'))
const password = process.env.INIT_SSH_PASSWORD ?? ''

type InitResult = { skipped: boolean; success: boolean; error?: string }

function loadEnv(filePath: string) {
  if (!fs.existsSync(filePath))
    return
  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
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

function buildNginxConfigContent(item: ServerItem): string {
  const template = fs.readFileSync(path.join(projectRoot, 'nginx.conf'), 'utf8')
  const deployPath = item.deployPath ?? '/var/www/html'
  return template
    .replace(/__WWW_DOMAIN__/g, item.wwwDomain)
    .replace(/__DOMAIN__/g, item.domain)
    .replace(/__DEPLOY_PATH__/g, deployPath)
}

function runRemoteCommand(conn: Client, command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        reject(err)
        return
      }
      let stderr = ''
      stream.stderr.on('data', (d: Buffer) => { stderr += d.toString() })
      stream.on('close', (code) => {
        if (code === 0)
          resolve()
        else
          reject(new Error(stderr || `exit ${code}`))
      })
    })
  })
}

async function remoteCheck(conn: Client, command: string): Promise<boolean> {
  try {
    await runRemoteCommand(conn, command)
    return true
  }
  catch {
    return false
  }
}

function uploadText(conn: Client, remotePath: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => {
      if (err) {
        reject(err)
        return
      }
      const stream = sftp.createWriteStream(remotePath, { encoding: 'utf8' })
      stream.on('error', reject)
      stream.on('close', () => resolve())
      stream.end(content)
    })
  })
}

async function initServer(siteName: string, item: ServerItem): Promise<InitResult> {
  if (!item.host) {
    console.log(`\x1B[33m[${siteName}]\x1B[0m 跳过：未配置服务器 IP`)
    return { skipped: true, success: false }
  }

  const nginxConfig = buildNginxConfigContent(item)
  const conn = new Client()
  const connectConfig: ConnectConfig = {
    host: item.host,
    port: 22,
    username: 'root',
    password,
  }

  return new Promise((resolve) => {
    conn
      .on('ready', async () => {
        try {
          console.log(`\x1B[36m[${siteName}]\x1B[0m 1/7 更新 apt 索引...`)
          await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt update')

          console.log(`\x1B[36m[${siteName}]\x1B[0m 2/7 确保 iptables 工具...`)
          const hasIptablesSave = await remoteCheck(conn, 'command -v iptables-save >/dev/null 2>&1')
          if (hasIptablesSave) {
            console.log(`\x1B[33m[${siteName}]\x1B[0m iptables-save 已可用，跳过安装`)
          }
          else {
            await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y iptables')
          }

          console.log(`\x1B[36m[${siteName}]\x1B[0m 3/7 检查 nginx/curl 是否已安装...`)
          const nginxInstalled = await remoteCheck(conn, 'dpkg -s nginx >/dev/null 2>&1')
          const curlInstalled = await remoteCheck(conn, 'dpkg -s curl >/dev/null 2>&1')
          if (nginxInstalled && curlInstalled) {
            console.log(`\x1B[33m[${siteName}]\x1B[0m nginx 与 curl 已安装，跳过安装`)
          }
          else {
            await runRemoteCommand(conn, 'DEBIAN_FRONTEND=noninteractive apt install -y nginx curl')
          }

          console.log(`\x1B[36m[${siteName}]\x1B[0m 4/7 检查 nginx 服务状态...`)
          const nginxEnabled = await remoteCheck(conn, 'systemctl is-enabled --quiet nginx')
          const nginxActive = await remoteCheck(conn, 'systemctl is-active --quiet nginx')
          if (nginxEnabled && nginxActive) {
            console.log(`\x1B[33m[${siteName}]\x1B[0m nginx 已启用且运行中，跳过启动`)
          }
          else {
            await runRemoteCommand(conn, 'systemctl enable nginx && systemctl restart nginx')
          }

          console.log(`\x1B[36m[${siteName}]\x1B[0m 5/7 检查 nginx 是否成功启动...`)
          await runRemoteCommand(conn, 'systemctl is-active --quiet nginx')
          await runRemoteCommand(
            conn,
            'code=$(curl -sS -o /dev/null -w \'%{http_code}\' --max-time 10 http://127.0.0.1 || true); [ "$code" != "000" ]',
          )

          console.log(`\x1B[36m[${siteName}]\x1B[0m 6/7 检查 default 配置是否已是目标内容...`)
          const tempConfigPath = `/tmp/${siteName.replace(/[^a-zA-Z0-9.-]/g, '_')}-default.conf`
          await uploadText(conn, tempConfigPath, nginxConfig)
          const defaultConfigSame = await remoteCheck(
            conn,
            `test -f /etc/nginx/sites-enabled/default && cmp -s /etc/nginx/sites-enabled/default ${tempConfigPath}`,
          )
          if (defaultConfigSame) {
            console.log(`\x1B[33m[${siteName}]\x1B[0m default 配置已是最新，跳过下发`)
            await runRemoteCommand(conn, `rm -f ${tempConfigPath}`)
          }
          else {
            await runRemoteCommand(
              conn,
              [
                'mkdir -p /etc/nginx/sites-enabled',
                'mkdir -p /etc/nginx/backup',
                '[ -f /etc/nginx/sites-enabled/default ] && cp /etc/nginx/sites-enabled/default /etc/nginx/backup/default.bak || true',
                `mv ${tempConfigPath} /etc/nginx/sites-enabled/default`,
              ].join(' && '),
            )
          }

          console.log(`\x1B[36m[${siteName}]\x1B[0m 7/7 校验并重载 nginx...`)
          await runRemoteCommand(conn, 'rm -f /etc/nginx/sites-enabled/*.bak')
          await runRemoteCommand(conn, 'nginx -t')
          await runRemoteCommand(conn, 'systemctl reload nginx')

          console.log(`\x1B[32m[${siteName}]\x1B[0m 初始化完成`)
          conn.end()
          resolve({ skipped: false, success: true })
        }
        catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error)
          console.log(`\x1B[31m[${siteName}]\x1B[0m 初始化失败：${msg}`)
          conn.end()
          resolve({ skipped: false, success: false, error: msg })
        }
      })
      .on('error', (error: unknown) => {
        const msg = error instanceof Error ? error.message : String(error)
        console.log(`\x1B[31m[${siteName}]\x1B[0m 连接失败：${msg}`)
        resolve({ skipped: false, success: false, error: msg })
      })
      .connect(connectConfig)
  })
}

async function main() {
  if (!password) {
    console.error('\x1B[31m请在 .env.init 中配置 INIT_SSH_PASSWORD\x1B[0m')
    process.exit(1)
  }

  const siteArg = process.argv[2]
  const sites = siteArg ? [siteArg] : Object.keys(serverConfig)

  for (const site of sites) {
    const item = serverConfig[site]
    if (!item) {
      console.error(`\x1B[31m未知站点：${site}\x1B[0m，可用：${Object.keys(serverConfig).join(', ')}`)
      process.exit(1)
    }
    await initServer(site, item)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
