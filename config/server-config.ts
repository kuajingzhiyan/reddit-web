/** 单台服务器 / 站点配置 */
export type ServerItem = {
  /** 服务器 IP，留空则跳过初始化 */
  host: string
  /** 主域名，如 spangrowth.com */
  domain: string
  /** www 域名，如 www.spangrowth.com */
  wwwDomain: string
  /** 静态站点根目录，需与 deploy 脚本 DEPLOY_PATH 一致 */
  deployPath?: string
}

/**
 * 站点列表：键名为站点标识，可用于 `pnpm init:servers spangrowth`
 * 部署前请将 host 改为真实 IP，并确保域名已解析到该 IP
 */
export const serverConfig: Record<string, ServerItem> = {
  spangrowth: {
    host: '8.210.98.210',
    domain: 'spangrowth.com',
    wwwDomain: 'www.spangrowth.com',
    deployPath: '/var/www/html',
  },
}
