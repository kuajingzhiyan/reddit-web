<script setup lang="ts">
const { t } = useI18n()

// 三大痛点与方案文案走 i18n
const problems = computed(() => [
  {
    icon: 'i-lucide-ban',
    title: t('反广告文化'),
    description: t('Reddit 社区对明显的广告内容高度敏感，直接推销会被秒删并招来负面评价。'),
    solution: t('我们通过原生 UGC 内容和真实用户互动，让您的品牌自然融入社区讨论。'),
    solutionIcon: 'i-lucide-shield',
  },
  {
    icon: 'i-lucide-lock',
    title: t('严苛的 Karma 限制'),
    description: t('新账号无法在大多数热门 Subreddit 发帖，积累 Karma 需要数月时间。'),
    solution: t('500+ 高 Karma 活跃老号矩阵，覆盖各垂直领域，即刻触达目标受众。'),
    solutionIcon: 'i-lucide-users',
  },
  {
    icon: 'i-lucide-help-circle',
    title: t('算法难以捉摸'),
    description: t('Reddit 的排名算法复杂，发帖时间、互动率都会影响内容曝光。'),
    solution: t('AI 驱动的数据分析系统，实时监控最佳发帖时机和内容表现。'),
    solutionIcon: 'i-lucide-bar-chart-3',
  },
])
</script>

<template>
  <section id="why-spangrowth" class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
          {{ $t('为什么 90% 的品牌在 Reddit 会被封号？') }}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('了解 Reddit 营销的三大致命陷阱，以及 SpanGrowth 如何帮您安全绕过') }}
        </p>
      </div>

      <!-- Problems Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(problem, index) in problems"
          :key="problem.title"
          class="relative glass-card glass-card-hover rounded-2xl p-8 space-y-6 transition-all duration-300 group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Problem -->
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <span :class="[problem.icon, 'w-6 h-6 text-destructive']" />
            </div>
            <h3 class="text-xl font-bold tracking-tight text-foreground">
              {{ problem.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ problem.description }}
            </p>
          </div>

          <!-- Divider -->
          <div class="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <!-- Solution -->
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-primary">
              <span :class="[problem.solutionIcon, 'w-5 h-5']" />
              <span class="text-sm font-semibold">{{ $t('SpanGrowth 解决方案') }}</span>
            </div>
            <p class="text-sm text-foreground leading-relaxed">
              {{ problem.solution }}
            </p>
          </div>

          <!-- Hover Glow Effect -->
          <div class="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-primary/10 blur-xl" />
        </div>
      </div>
    </div>
  </section>
</template>
