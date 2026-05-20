<script setup lang="ts">
const { t } = useI18n()

// 社会证明标签：中文 key 与首页其它区块一致
const trustIndicators = computed(() => [
  t('已服务 200+ 出海品牌'),
  t('平均 ROI 提升 280%'),
  t('客户续约率 95%'),
])
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Testimonial Card -->
      <div class="relative glass-card rounded-3xl p-8 lg:p-12 text-center space-y-8 animate-glow-pulse">
        <!-- Quote Icon -->
        <div class="absolute top-6 left-6 lg:top-8 lg:left-8">
          <span class="i-lucide-quote w-12 h-12 text-primary/20" />
        </div>

        <!-- Stars -->
        <div class="flex items-center justify-center gap-1">
          <span
            v-for="i in 5"
            :key="i"
            class="i-lucide-star w-6 h-6 fill-primary text-primary"
          />
        </div>

        <!-- Quote -->
        <blockquote class="text-xl lg:text-2xl font-medium text-foreground leading-relaxed text-balance">
          &ldquo;{{ $t('SpanGrowth 团队的专业度令人惊叹。通过独有 AI 工具和 GEO 定向发帖，独立站推荐流量两月飙升 300%！') }}&rdquo;
        </blockquote>

        <!-- Author -->
        <div class="space-y-2">
          <div class="w-16 h-16 mx-auto rounded-full bg-primary p-0.5">
            <div class="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span class="text-xl font-bold text-foreground">DC</span>
            </div>
          </div>
          <div>
            <div class="text-lg font-semibold text-foreground">
              David Chen
            </div>
            <div class="text-sm text-muted-foreground">
              {{ $t('出海 3C 品牌营销总监') }}
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute -top-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
        <div class="absolute -bottom-2 -left-2 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
      </div>

      <!-- Trust indicators -->
      <div class="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
        <div
          v-for="indicator in trustIndicators"
          :key="indicator"
          class="flex items-center gap-2"
        >
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span class="text-sm">{{ indicator }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
