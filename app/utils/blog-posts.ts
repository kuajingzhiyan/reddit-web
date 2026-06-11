/**
 * import.meta.glob 限制：
 * 1. 不支持 ~ 别名，必须用相对路径
 * 2. 需 query: '?raw' 才能以字符串形式读取 .md 内容
 */
const blogModules = import.meta.glob('../pages/blog/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface BlogPost {
  slug: string
  title: string
  date: string
  /** 正文 Markdown（不含一级标题，避免与 Banner 重复） */
  body: string
}

interface BlogPostSource {
  slug: string
  date: string
  markdown: string
}

/** 从 glob 路径提取 slug，兼容 Windows 反斜杠路径 */
function slugFromPath(path: string): string {
  const filename = path.split(/[/\\]/).pop() ?? path
  return filename.replace(/\.md$/, '')
}

/** 解析可选 YAML frontmatter（仅支持 key: value 单行字段） */
function parseFrontmatter(markdown: string): { meta: Record<string, string>, content: string } {
  const match = markdown.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match)
    return { meta: {}, content: markdown }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([\w-]+):\s*(.+)$/)
    if (field)
      meta[field[1]] = field[2].trim()
  }

  return { meta, content: match[2] }
}

/** 从 Markdown 提取 `# 标题` 并返回标题与剩余正文 */
function splitMarkdownTitle(markdown: string): { title: string, body: string } {
  const lines = markdown.split('\n')
  const titleLineIndex = lines.findIndex(line => line.startsWith('# '))

  if (titleLineIndex === -1)
    return { title: '', body: markdown.trim() }

  const title = lines[titleLineIndex].slice(2).trim()
  const body = lines.slice(titleLineIndex + 1).join('\n').trim()

  return { title, body }
}

/** 由 glob 自动构建 slug -> 文章映射 */
const blogPostSources: Record<string, BlogPostSource> = Object.fromEntries(
  Object.entries(blogModules).map(([path, rawMarkdown]) => {

    const slug = slugFromPath(path)
    console.log(slug);
    
    const { meta, content } = parseFrontmatter(rawMarkdown)

    return [slug, {
      slug,
      date: meta.date ?? '',
      markdown: content,
    }]
  }),
)

// 获取单个md文章内容
export function getBlogPost(slug: string): BlogPost | null {
  const source = blogPostSources[slug]
  if (!source)
    return null

  const { title, body } = splitMarkdownTitle(source.markdown)

  return {
    slug,
    title,
    date: source.date,
    body,
  }
}

// 获取所有md文章内容
export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogPostSlugs()
    .map(slug => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
}

// 获取md文章的slug/文件名称
export function getAllBlogPostSlugs(): string[] {
  return Object.keys(blogPostSources)
}
