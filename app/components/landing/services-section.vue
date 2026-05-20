<script setup lang="ts">
const { t } = useI18n()

// 三大服务卡片数据：中文文案用 t() 以便与 zh.json 对齐
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
])
</script>

<template>
  <section id="services" class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
          {{ $t('三大核心服务支柱') }}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('全方位 Reddit 营销解决方案，从内容创作到 SEO 优化一站式服务') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        <div v-for="service in services" :key="service.title"
          class="group relative glass-card glass-card-hover rounded-2xl p-8  transition-all duration-500">
          <div class="space-y-6">
            <!-- Icon -->
            <div :class="['w-14 h-14 rounded-xl bg-gradient-to-br p-0.5', service.gradient]">
              <div class="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span :class="[service.icon, 'w-6 h-6 text-foreground']" />
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-4">
              <h3 class="text-xl font-bold tracking-tight text-foreground">
                {{ service.title }}
              </h3>
              <p class="text-muted-foreground leading-relaxed">
                {{ service.description }}
              </p>
            </div>

            <!-- Features -->
            <ul class="space-y-2">
              <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm">
                <div class="w-1.5 h-1.5 rounded-full bg-primary" />
                <span class="text-foreground">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <div class="pt-4">
              <ButtonsButtonTypeD href="#hero-form">
                {{ $t('了解更多') }}
              </ButtonsButtonTypeD>
            </div>
          </div>


          <!-- Decorative gradient border on hover -->
          <div :class="[
            'absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r mt-[-1px] blur-sm -z-10',
            service.gradient,
          ]" />
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-16 glass-card rounded-2xl p-8 lg:p-12">
        <div class="grid lg:grid-cols-3 gap-8 items-center">
          <div class="lg:col-span-2 space-y-4">
            <h3 class="text-2xl font-bold tracking-tight text-foreground">
              {{ $t('为什么选择全案服务？') }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ $t('单一渠道的营销效果有限。我们的全案服务将 GEO 定向、UGC 内容和 SEO 优化有机结合，形成增长飞轮。数据显示，采用全案服务的客户平均 ROI 比单一服务高出 3.5 倍。') }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row lg:flex-col gap-4">
            <div class="flex items-center gap-3 p-4 rounded-xl bg-muted">
              <span class="i-lucide-globe w-8 h-8 text-primary" />
              <div>
                <div class="text-2xl font-bold text-foreground">
                  50+
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ $t('覆盖国家地区') }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 rounded-xl bg-muted">
              <span class="i-lucide-message-square w-8 h-8 text-primary" />
              <div>
                <div class="text-2xl font-bold text-foreground">
                  10K+
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ $t('月度互动量') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
