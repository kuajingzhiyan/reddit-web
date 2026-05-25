<script setup lang="ts">
const { t } = useI18n()

// 四大服务：对齐 React components/services-section.tsx
const services = computed(() => [
  {
    icon: 'i-lucide-map-pin',
    title: t('GEO 区域发帖与精准评论'),
    description: t('深入挖掘特定地域 Local Subreddits，结合当地文化进行精准定向发帖。从美国、欧洲到东南亚，我们覆盖全球主要市场。'),
    features: [t('本地化内容策略'), t('地域文化适配'), t('多语言支持')],
    gradient: 'from-primary to-primary/60',
  },
  {
    icon: 'i-lucide-pen',
    title: t('原生内容 & UGC 种草'),
    description: t('发布高质量图文，植入社区关键词。真实用户分享使用体验，打造口碑效应，让品牌自然融入目标社区。'),
    features: [t('爆款内容创作'), t('用户故事挖掘'), t('互动评论管理')],
    gradient: 'from-primary to-primary/60',
  },
  {
    icon: 'i-lucide-search',
    title: t('Reddit 站内与 Google SEO 霸屏'),
    description: t('挖掘高潜长尾关键词，长期占据搜索首页。Reddit 内容在 Google 排名权重极高，一次投入，持续收益。'),
    features: [t('关键词研究'), t('内容优化'), t('排名追踪')],
    gradient: 'from-primary to-primary/60',
  },
  {
    icon: 'i-lucide-shield',
    title: t('AI 舆情监控与品牌风控'),
    description: t('24/7 全天候毫秒级检索 Reddit 全网动态，精准捕捉品牌提及、竞品走向与用户负面情绪。在公关危机爆发前智能预警，全方位守护品牌海外声誉。'),
    features: [t('全网声誉实时监测'), t('负面情感智能预警'), t('竞品动态情报追踪')],
    gradient: 'from-primary to-primary/60',
  },
])
</script>

<template>
  <section id="services" class="relative py-24 overflow-hidden">
    <LandingSparkleCanvas />
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
          {{ $t('四大核心服务支柱') }}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('全方位 Reddit 营销解决方案，从内容创作到 SEO 优化一站式服务') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <div
          v-for="service in services"
          :key="service.title"
          class="group relative flex h-full flex-col glass-card glass-card-hover rounded-2xl p-8 transition-all duration-500"
        >
          <div class="flex flex-1 flex-col space-y-6">
            <div :class="['w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br p-0.5', service.gradient]">
              <div class="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span :class="[service.icon, 'w-6 h-6 text-foreground']" />
              </div>
            </div>

            <div class="flex flex-1 flex-col space-y-4">
              <h3 class="text-xl font-bold tracking-tight text-foreground line-clamp-2 min-h-[3.5rem]">
                {{ service.title }}
              </h3>
              <p class="flex-1 text-muted-foreground leading-relaxed">
                {{ service.description }}
              </p>
            </div>

            <ul class="space-y-2 shrink-0">
              <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm">
                <div class="w-1.5 h-1.5 shrink-0 rounded-full bg-primary" />
                <span class="text-foreground">{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="pt-4 mt-auto shrink-0">
            <!-- 普通链接样式，无箭头位移动画 / blur-in -->
            <a
              href="#hero-form"
              class="inline-flex items-center justify-center gap-2 rounded-xl"
            >
              {{ $t('了解更多') }}
              <span class="i-lucide-arrow-right size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          </div>

          <div
            :class="[
              'absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r blur-sm -z-10',
              service.gradient,
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
