import fs from 'fs'
import path from 'path'

const root = path.resolve('app')
const files = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(fullPath)
    else if (entry.name.endsWith('.vue')) files.push(fullPath)
  }
}

walk(root)

const found = new Set()

function addString(raw) {
  if (!raw || !/[\u4e00-\u9fff]/.test(raw)) return
  if (raw.includes('$t(') || raw.includes('{{') || raw.includes('i-lucide')) return

  const text = raw.replace(/\s+/g, (space) => (space.includes('\n') ? space : ' ')).trim()
  if (text.length < 1) return
  found.add(text)
}

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  content = content.replace(/<!--[\s\S]*?-->/g, ' ')
  content = content.replace(/\/\/[^\n]*/g, (line) => (/[\u4e00-\u9fff]/.test(line) ? ' ' : line))
  content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => (/[\u4e00-\u9fff]/.test(block) ? ' ' : block))

  const attrRe = /(?:placeholder|title|description|label|defaultText|loadingText|textStr)\s*=\s*["']([^"']+)["']/g
  let match
  while ((match = attrRe.exec(content)) !== null) addString(match[1])

  const attrRe2 = /(?:placeholder|title|description|label|defaultText|loadingText|textStr):\s*["']([^"']+)["']/g
  while ((match = attrRe2.exec(content)) !== null) addString(match[1])

  const quoteRe = /["']([^"']*[\u4e00-\u9fff][^"']*)["']/g
  while ((match = quoteRe.exec(content)) !== null) addString(match[1])

  const textRe = />([^<{}]+)</g
  while ((match = textRe.exec(content)) !== null) addString(match[1])
}

const manual = [
  '#Reddit营销',
  '#SEO优化',
  '#内容营销',
  '#品牌出海',
  '#增长黑客',
  'SpanGrowth | Reddit 营销增长专家',
  '高精准受众定位，用原生创意与 AI 矩阵引爆 Reddit 流量。突破传统广告壁垒，为您提供安全、高转化的定制方案。',
  '积分生态系统 | SpanGrowth',
  '返回首页',
  '请选择',
  '+{bonus} 赠送',
  '提交中...',
  '立即获取免费报告',
]

manual.forEach((item) => found.add(item))

const sorted = [...found].sort((a, b) => a.localeCompare(b, 'zh-CN'))
const obj = Object.fromEntries(sorted.map((key) => [key, key]))

const outPath = path.resolve('app/i18n/locales/zh.json')
fs.writeFileSync(outPath, `${JSON.stringify(obj, null, 2)}\n`)
console.log(`Wrote ${sorted.length} keys to ${outPath}`)
