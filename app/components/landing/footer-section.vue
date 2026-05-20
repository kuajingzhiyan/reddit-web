<script setup lang="ts">
import { cn } from '~/utils/cn'
import tgIcon from '~/assets/images/svgs/tg.svg'

const { t } = useI18n()

const bottomNavLinks = computed(() => [
  {
    href: 'https://t.me/RoxyBrowser_EN2',
    icon: tgIcon,
    alt: 'Telegram',
    ariaLabel: $t('打开 Telegram'),
  }
])

// 页脚支持区与链接区文案走 i18n（中文作 key）
const supportFeatures = computed(() => [
  {
    icon: 'i-lucide-zap',
    title: t('0 秒 AI 响应'),
    description: t('智能客服即时解答常见问题'),
  },
  {
    icon: 'i-lucide-globe',
    title: t('全球人工专家'),
    description: t('覆盖中美欧三大时区的专业团队'),
  },
  {
    icon: 'i-lucide-clock',
    title: t('15 分钟紧急干预'),
    description: t('突发情况快速响应机制'),
  },
])

const footerLinks = computed(() => ({
  about: {
    title: t('关于 SpanGrowth'),
    links: [t('公司简介'), t('团队介绍'), t('发展历程'), t('加入我们')],
  },
  services: {
    title: t('核心业务'),
    links: [t('GEO 定向发帖'), t('UGC 内容种草'), t('SEO 霸屏服务'), t('账号矩阵租赁')],
  },
  tools: {
    title: t('AI 工具栈'),
    links: [t('品牌扫描仪'), t('关键词分析'), t('竞品监控'), t('内容生成器')],
  },
  resources: {
    title: t('获取资源'),
    links: [t('免费调研报告'), t('营销白皮书'), t('案例研究'), t('博客文章')],
  },
}))

const socialIcons = [
  { icon: 'i-lucide-twitter', label: 'Twitter' },
  { icon: 'i-lucide-linkedin', label: 'LinkedIn' },
  { icon: 'i-lucide-youtube', label: 'YouTube' },
  { icon: 'i-lucide-mail', label: 'Email' },
]

const isChatOpen = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Support Section -->
    <section id="contact" class="relative py-24 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {{ $t('7/24 全天候响应') }}
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            {{ $t('跨越时区的增长护航，让您的品牌永不停歇') }}
          </p>
        </div>

        <!-- Support Features -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div
            v-for="feature in supportFeatures"
            :key="feature.title"
            class="glass-card glass-card-hover rounded-2xl p-8 text-center space-y-4 transition-all duration-300"
          >
            <div class="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
              <span :class="[feature.icon, 'w-8 h-8 text-primary']" />
            </div>
            <h3 class="text-xl font-bold tracking-tight text-foreground">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground">
              {{ feature.description }}
            </p>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="glass-card rounded-2xl p-8 lg:p-12">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold tracking-tight text-foreground">
                {{ $t('准备好引爆您的 Reddit 增长了吗？') }}
              </h3>
              <p class="text-muted-foreground leading-relaxed">
                {{ $t('与我们的增长顾问预约一对一咨询，获取专属品牌策略。首次咨询完全免费，无任何附加条件。') }}
              </p>
              <div class="flex flex-wrap gap-4 pt-4">
                <a
                  href="#hero-form"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:bg-primary/90"
                >
                  {{ $t('预约免费咨询') }}
                </a>
                <a
                  href="mailto:contact@spangrowth.com"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold transition-all duration-300 hover:bg-muted"
                >
                  <span class="i-lucide-mail w-4 h-4" />
                  contact@spangrowth.com
                </a>
              </div>
            </div>
            <div class="lg:text-right space-y-6">
              <div class="inline-block glass-card rounded-xl p-6 text-left">
                <div class="text-sm text-muted-foreground mb-2">
                  {{ $t('工作时间') }}
                </div>
                <div class="space-y-1 text-foreground">
                  <div>{{ $t('中国: 09:00 - 22:00 (UTC+8)') }}</div>
                  <div>{{ $t('美国: 09:00 - 18:00 (EST/PST)') }}</div>
                  <div>{{ $t('欧洲: 09:00 - 18:00 (CET)') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative py-16 border-t border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Footer -->
        <div class="grid lg:grid-cols-6 gap-12 mb-12">
          <!-- Brand -->
          <div class="lg:col-span-2 space-y-6">
            <a href="#" class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span class="text-primary-foreground font-bold">S</span>
              </div>
              <span class="text-2xl font-bold tracking-tight text-foreground">SpanGrowth</span>
            </a>
            <p class="text-muted-foreground leading-relaxed max-w-sm">
              {{ $t('专注 Reddit 营销增长，用 AI 技术和原生策略帮助出海品牌突破流量瓶颈，实现可持续的全球化增长。') }}
            </p>
            <!-- Social Icons -->
            <div class="flex items-center gap-3">
              <ButtonsButtonTypeF
                v-for="social in socialIcons"
                :key="social.label"
                :icon="social.icon"
                :label="social.label"
              />
            </div>
          </div>

          <!-- Links -->
          <div
            v-for="(section, key) in footerLinks"
            :key="key"
            class="space-y-4"
          >
            <h4 class="text-sm font-semibold text-foreground">
              {{ section.title }}
            </h4>
            <ul class="space-y-3">
              <li
                v-for="link in section.links"
                :key="link"
              >
                <a
                  href="#"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
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

    <!-- Floating Chat Widget -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
      v-for="link in bottomNavLinks"
      :key="link.href"
        type="button"
        :class="cn(
          'w-14 h-14 rounded-full glass-card',
          'flex items-center justify-center',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-[0_0_30px_rgba(115,98,168,0.5)]',
          isChatOpen && 'bg-primary',
        )"
        :aria-label="link.ariaLabel"
      >
        <!-- <span
          :class="cn(
            'i-lucide-message-circle w-6 h-6 transition-colors duration-200',
            isChatOpen ? 'text-primary-foreground' : 'text-foreground',
          )"
        /> -->
        <NuxtLink :href="link.href" target="_blank">
          <img :src="link.icon" :alt="link.alt" class="w-full h-full">
        </NuxtLink>
      </button>

      <!-- Chat Panel -->
      <!-- <div
        v-if="isChatOpen"
        class="absolute bottom-16 right-0 w-80 glass-card rounded-2xl p-6 space-y-4 animate-blur-in"
      >
        <div class="flex items-center justify-between">
          <h4 class="font-semibold text-foreground">
            {{ $t('在线咨询') }}
          </h4>
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

    <!-- Back to Top -->
    <button
      type="button"
      class="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(115,98,168,0.4)]"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <span class="i-lucide-arrow-up w-5 h-5 text-foreground" />
    </button>
  </div>
</template>
