/**
 * app/assets 下静态资源（构建时解析为 URL）
 * key 示例：../assets/images/svgs/tg.svg
 */
const assetUrlMap = import.meta.glob<string>(
  '../assets/**/*.{svg,png,jpg,jpeg,gif,webp,ico}',
  { eager: true, query: '?url', import: 'default' },
)

function normalizeAssetPath(path: string) {
  return path.replace(/^\/+/, '').replace(/^assets\//, '')
}

/**
 * 获取 app/assets 内图片/图标的构建后地址
 * @param path 相对 assets 的路径，如 `images/svgs/tg.svg`
 */
export function assetUrl(path: string): string {
  const normalized = normalizeAssetPath(path)

  const matched = Object.entries(assetUrlMap).find(([key]) => {
    const keyPath = key.replace(/\\/g, '/')
    return keyPath.endsWith(`/assets/${normalized}`) || keyPath.endsWith(`/${normalized}`)
  })

  if (!matched) {
    if (import.meta.dev) {
      console.warn(`[assetUrl] 未找到资源: ${path}`)
    }
    return ''
  }

  return matched[1]
}

/**
 * 获取 public 目录静态文件地址（无需打包）
 * @param path 相对 public 的路径，如 `logo.png`
 */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\/+/, '').replace(/^public\//, '')
  return `/${normalized}`
}

/**
 * 统一获取图片地址：public 用 / 开头，否则走 assets
 */
export function imageUrl(path: string): string {
  if (path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return assetUrl(path)
}
