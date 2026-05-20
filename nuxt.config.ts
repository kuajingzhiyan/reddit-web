// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@nuxtjs/i18n'],
  css: [
    '@unocss/reset/tailwind-compat.css',
    '~/assets/style/index.css',
  ],
  // i18n 配置：中文为默认语言，文案 key 使用中文
  i18n: {
    locales: [
      { code: 'zh', language: 'zh-CN', file: 'zh.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'zh',
    langDir: 'locales',
    vueI18n: './i18n/i18n.config.ts',
    strategy: 'no_prefix',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'SpanGrowth | Reddit 营销增长专家',
      meta: [
        {
          name: 'description',
          content:
            '高精准受众定位，用原生创意与 AI 矩阵引爆 Reddit 流量。突破传统广告壁垒，为您提供安全、高转化的定制方案。',
        },
        {
          name: 'keywords',
          content:
            'Reddit营销, Reddit推广, AI营销, 出海营销, GEO定向, UGC内容, SEO优化',
        },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      ],
    },
  },
  compatibilityDate: '2025-05-20',
})