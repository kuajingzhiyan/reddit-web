<script setup lang="ts">
const { t } = useI18n()

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
</script>

<template>
  <div>
    <section id="contact" class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {{ $t('7/24 全天候响应') }}
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            {{ $t('跨越时区的增长护航，让您的品牌永不停歇') }}
          </p>
        </div>

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
                <!-- <a
                  href="mailto:contact@spangrowth.com"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold transition-all duration-300 hover:bg-muted"
                >
                  <span class="i-lucide-mail w-4 h-4" />
                  contact@spangrowth.com
                </a> -->
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
  </div>
</template>
