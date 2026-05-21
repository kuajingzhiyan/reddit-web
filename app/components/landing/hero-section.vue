<script setup lang="ts">
// Hero 居中布局：对齐 React components/hero-section.tsx
function scrollToForm() {
  document.querySelector('#hero-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
    <LandingHeroStarCanvas />
    <div class="pt-18">
      <img src="/logo.png" alt="SpanGrowth" class="w-60 h-60">
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-10">
      <h1 class="md:text-[48px] text-[28px] font-bold tracking-tight leading-[1.4] text-foreground">
        {{ $t('告别无效曝光 用 AI 原生矩阵') }}
        <br>
        <span class="text-gradient">{{ $t('重塑您的 Reddit 增长引擎') }}</span>
      </h1>

      <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {{ $t('突破海外传统广告壁垒。SpanGrowth 依托独家全景监控与 GEO 精准定位系统，将全球最具价值的社区转化为您安全、可持续的利润中心。') }}
      </p>

      <div class="pt-6">
        <button
          type="button"
          class="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
          @click="scrollToForm"
        >
          <span>{{ $t('免费获取调研报告') }}</span>
          <span class="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
            <span class="i-lucide-arrow-down w-4 h-4 -rotate-90" />
          </span>
        </button>
      </div>

      <div class="pt-16">
        <div class="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer" @click="scrollToForm">
          <span class="text-sm">{{ $t('看看如何') }}</span>
          <span class="i-lucide-arrow-down w-5 h-5 animate-bounce" />
        </div>
      </div>
    </div>
  </section>
</template>
