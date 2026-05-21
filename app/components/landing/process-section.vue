<script setup lang="ts">
const { t } = useI18n()

// 流程四步：标题与说明为面向用户文案，使用中文 key
const steps = computed(() => [
  {
    number: '01',
    icon: 'i-lucide-file-search',
    title: t('免费深度调研报告'),
    description: t('全面分析您的品牌定位、目标受众和竞争对手，输出可执行的策略蓝图。'),
    duration: t('1-2 天'),
  },
  {
    number: '02',
    icon: 'i-lucide-brain',
    title: t('AI 策略制定'),
    description: t('基于数据洞察，AI 生成最优 Subreddit 组合、内容矩阵和发布时间表。'),
    duration: t('1 天'),
  },
  {
    number: '03',
    icon: 'i-lucide-target',
    title: t('定向发帖互动'),
    description: t('老号矩阵精准投放，原生内容自然渗透，建立品牌社区影响力。'),
    duration: t('持续进行'),
  },
  {
    number: '04',
    icon: 'i-lucide-bar-chart',
    title: t('转化与报表监控'),
    description: t('实时追踪关键指标，优化内容策略，确保投资回报最大化。'),
    duration: t('每周更新'),
  },
])
</script>

<template>
  <section id="process" class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {{ $t('全案增长闭环') }}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('从调研到转化，四步打造可持续增长引擎') }}
        </p>
      </div>

      <!-- Process Steps -->
      <div class="relative">
        <!-- Connection Line -->
        <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="relative group h-full"
          >
            <!-- Card：flex 等高，底部 duration 对齐 -->
            <div class="flex h-full flex-col glass-card glass-card-hover rounded-2xl p-6 transition-all duration-300">
              <!-- Number Badge -->
              <div class="mb-4 flex shrink-0 items-center justify-between">
                <span class="text-4xl font-bold text-gradient">{{ step.number }}</span>
                <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span :class="[step.icon, 'w-6 h-6 text-foreground']" />
                </div>
              </div>

              <!-- Content -->
              <div class="mb-4 flex flex-1 flex-col space-y-2">
                <h3 class="text-lg font-bold tracking-tight text-foreground line-clamp-2 min-h-[3.5rem]">
                  {{ step.title }}
                </h3>
                <p class="flex-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>

              <!-- Duration -->
              <div class="mt-auto shrink-0 border-t border-border pt-4">
                <span class="text-xs text-primary font-medium">{{ step.duration }}</span>
              </div>
            </div>

            <!-- Arrow Connector (Desktop) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10"
            >
              <div class="w-full h-full rounded-full bg-background border border-border flex items-center justify-center">
                <span class="i-lucide-chevron-right w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <a
          href="#hero-form"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(115,98,168,0.5)]"
        >
          {{ $t('立即开始免费调研') }}
          <span class="i-lucide-arrow-right w-5 h-5" />
        </a>
      </div>
    </div>
  </section>
</template>
