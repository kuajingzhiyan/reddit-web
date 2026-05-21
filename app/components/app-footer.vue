<script setup lang="ts">
import { cn } from '~/utils/cn'
import { assetUrl } from '~/utils/asset-url'

const { t } = useI18n()

// Telegram 图标：assets 内 SVG 经 assetUrl 解析为可访问 URL
const tgIconUrl = assetUrl('images/svgs/tg.svg')

// 页脚链接对齐 React components/footer-section.tsx
interface FooterLinkItem {
  label: string
  href: string
}

interface FooterLinkSection {
  title: string
  links: FooterLinkItem[]
}

/** 静态配置：首项为 i18n key，可选第二项为 href（默认 #） */
const FOOTER_NAV = [
  {
    title: '关于 SpanGrowth',
    links: [['公司简介'], ['团队介绍'], ['发展历程']],
  },
  {
    title: '核心业务',
    links: [
      ['GEO 定向发帖', '#services'],
      ['UGC 内容种草', '#services'],
      ['SEO 霸屏服务', '#services'],
    ],
  },
  {
    title: 'AI 工具栈',
    links: [['品牌扫描仪'], ['关键词分析'], ['竞品监控'], ['内容生成器']],
  },
  {
    title: '获取资源',
    links: [['免费调研报告']],
  },
] as const satisfies ReadonlyArray<{
  title: string
  links: ReadonlyArray<readonly [string] | readonly [string, string]>
}>

function buildFooterLinks(t: (key: string) => string): FooterLinkSection[] {
  return FOOTER_NAV.map(({ title, links }) => ({
    title: t(title),
    links: links.map(([label, href = '#']) => ({ label: t(label), href })),
  }))
}

const footerLinks = computed(() => buildFooterLinks(t))

const socialIcons = [
  { icon: 'i-lucide-twitter', label: 'Twitter' },
  { icon: 'i-lucide-linkedin', label: 'LinkedIn' },
  { icon: 'i-lucide-youtube', label: 'YouTube' },
  { icon: 'i-lucide-mail', label: 'Email' },
  { icon: 'i-lucide-send', label: 'Telegram' },
]

const isChatOpen = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <footer class="relative py-16 border-t border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-6 gap-12 mb-12">
          <div class="lg:col-span-2 space-y-6">
            <a href="#" class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="SpanGrowth" class="w-8 h-8">
              </div>
              <span class="text-2xl font-bold tracking-tight text-foreground">SpanGrowth</span>
            </a>
            <p class="text-muted-foreground leading-relaxed max-w-sm">
              {{ $t('专注 Reddit 营销增长，用 AI 技术和原生策略帮助出海品牌突破流量瓶颈，实现可持续的全球化增长。') }}
            </p>
            <div class="flex items-center gap-3">
              <!-- <ButtonsButtonTypeIcon
                v-for="social in socialIcons"
                :key="social.label"
                :icon="social.icon"
                :label="social.label"
              /> -->
            </div>
          </div>
          <div class="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 ">
            <div v-for="section in footerLinks" :key="section.title" class="space-y-4">
              <h4 class="text-sm font-semibold text-foreground">
                {{ section.title }}
              </h4>
              <ul class="space-y-3">
                <li v-for="link in section.links" :key="link.label">
                  <a :href="link.href"
                    class="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-muted-foreground">
            © 2026 SpanGrowth. All rights reserved.
          </div>
          <div class="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" class="hover:text-foreground transition-colors duration-200">
              {{ $t('隐私政策') }}
            </a>
            <a href="#" class="hover:text-foreground transition-colors duration-200">
              {{ $t('服务条款') }}
            </a>
            <a href="#" class="hover:text-foreground transition-colors duration-200">
              {{ $t('Cookie 设置') }}
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- 浮动联系按钮：对齐 React footer-section.tsx -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      <!-- <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        :class="cn(
          'w-14 h-14 rounded-full glass-card flex items-center justify-center transition-all duration-300',
          'shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 hover:shadow-[0_0_35px_rgba(37,211,102,0.8)]',
        )"
        aria-label="Contact on WhatsApp"
      >
        <span class="i-lucide-phone w-6 h-6 text-[#25D366]" />
      </a> -->

      <a href="https://t.me/spangrowth" target="_blank" rel="noopener noreferrer" :class="cn(
        'w-14 h-14 rounded-full glass-card flex items-center justify-center transition-all duration-300',
        'shadow-[0_0_20px_rgba(0,136,204,0.6)] hover:scale-110 hover:shadow-[0_0_35px_rgba(0,136,204,0.8)]',
      )" aria-label="Contact on Telegram">
        <!-- <span class="i-lucide-send w-6 h-6 text-[#0088cc]" /> -->
        <img :src="tgIconUrl" alt="Telegram" class="w-14 h-14 object-contain">
      </a>

      <!-- <button
        type="button"
        :class="cn(
          'w-14 h-14 rounded-full glass-card flex items-center justify-center transition-all duration-300',
          'shadow-[0_0_20px_rgba(115,98,168,0.6)] hover:scale-110 hover:shadow-[0_0_35px_rgba(115,98,168,0.8)]',
          isChatOpen && 'bg-primary shadow-[0_0_30px_rgba(115,98,168,0.9)]',
        )"
        aria-label="Open chat"
        @click="isChatOpen = !isChatOpen"
      >
        <span
          :class="cn(
            'i-lucide-message-circle w-6 h-6 transition-colors duration-200',
            isChatOpen ? 'text-primary-foreground' : 'text-foreground',
          )"
        />
      </button> -->

      <!-- <div v-if="isChatOpen" class="absolute bottom-16 right-0 w-80 glass-card rounded-2xl p-6 space-y-4 animate-blur-in">
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-foreground">{{ $t('在线咨询') }}</h4>
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <p class="text-sm text-muted-foreground">
          {{ $t('您好！欢迎咨询 SpanGrowth。请问有什么可以帮助您的？') }}
        </p>
        <input
          type="text"
          :placeholder="$t('输入您的问题...')"
          class="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        >
      </div> -->
    </div>

    <button type="button"
      class="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(115,98,168,0.4)]"
      aria-label="Back to top" @click="scrollToTop">
      <span class="i-lucide-arrow-up w-5 h-5 text-foreground" />
    </button>
  </div>
</template>
