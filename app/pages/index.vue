<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('SpanGrowth | Reddit 营销增长专家'),
  description: t('高精准受众定位，用原生创意与 AI 矩阵引爆 Reddit 流量。突破传统广告壁垒，为您提供安全、高转化的定制方案。'),
})
</script>

<template>
  <main class="min-h-screen bg-background text-foreground overflow-x-hidden text-left">
    <AppHeader />
    <LandingHeroSection />
    <LandingPlanetMarquee />
    <LandingCreditRechargeSection />
    <LandingAiScanner />
    <LandingWhySpangrowth />
    <LandingServicesSection />
    <LandingTestimonialSection />
    <LandingProcessSection />
    <LandingSpecialInquiries />
    <LandingFooterSection />
  </main>
</template>
