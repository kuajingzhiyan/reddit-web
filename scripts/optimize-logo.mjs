/**
 * 缩放 / 压缩 public/logo.png，避免首屏加载 1000px+ 位图解码卡顿。
 * 运行：pnpm optimize:logo
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const srcPath = path.join(publicDir, 'logo.png')

async function main() {
  const buf = readFileSync(srcPath)

  const optimized = await sharp(buf)
    .resize(480, 480, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()

  writeFileSync(srcPath, optimized)

  const markBuf = await sharp(buf)
    .resize(128, 128, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()

  writeFileSync(path.join(publicDir, 'logo-mark.png'), markBuf)

  const mainMeta = await sharp(optimized).metadata()
  const markMeta = await sharp(markBuf).metadata()
  console.log('[optimize-logo] logo.png →', `${mainMeta.width}x${mainMeta.height}`, `(${(optimized.length / 1024).toFixed(1)} KiB)`)
  console.log('[optimize-logo] logo-mark.png →', `${markMeta.width}x${markMeta.height}`, `(${(markBuf.length / 1024).toFixed(1)} KiB)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
