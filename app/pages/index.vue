<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('SpanGrowth | Reddit 营销增长专家'),
  description: t('高精准受众定位，用原生创意与 AI 矩阵引爆 Reddit 流量。突破传统广告壁垒，为您提供安全、高转化的定制方案。'),
})
</script>

<template>
  <!-- 全页星点：fixed 铺满视口，滚动各区块时持续可见 -->
  <!-- <LandingSparkleCanvas fixed /> -->
  <div class="relative z-10">
    <LandingSparkleCanvas />
    <LandingHeroSection />
    <LandingContactQrSection />
    <LandingPlanetMarquee />
    <LandingServicesSection />
    <LandingRedditMarketingSection />
    <LandingCreditRechargeSection />
    <LandingTestimonialSection />
    <LandingProcessSection />
    <LandingFooterSection />
  </div>
</template>
