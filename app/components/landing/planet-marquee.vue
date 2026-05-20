<script setup lang="ts">
/** 品牌跑马灯数据：icon 为 UnoCSS Iconify lucide 类名 */
const brands = [
  { name: 'ANKER', icon: 'i-lucide-zap' },
  { name: 'RAYNEO', icon: 'i-lucide-database' },
  { name: 'ANGRYMAIO', icon: 'i-lucide-cloud' },
  { name: 'SHARGE', icon: 'i-lucide-triangle' },
  { name: 'GRAVASTAR', icon: 'i-lucide-hexagon' },
  { name: 'TOTWOOGLOBAL', icon: 'i-lucide-square' },
  { name: 'SEEEDSTUDIO', icon: 'i-lucide-circle' },
  { name: 'META', icon: 'i-lucide-star' },
  { name: 'RAZER', icon: 'i-lucide-diamond' },
  { name: 'FRAME', icon: 'i-lucide-octagon' },
  { name: 'TEENAGE', icon: 'i-lucide-zap' },
  { name: 'OPALCAMERA', icon: 'i-lucide-triangle' },
  { name: 'PEAKDESIGN', icon: 'i-lucide-star' },
  { name: 'ANALOGUE', icon: 'i-lucide-circle' },
  { name: 'RABBIT', icon: 'i-lucide-hexagon' },
]

const reversedBrands = [...brands].reverse()

/** 环境粒子样式（固定值，避免每次渲染随机） */
const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${10 + i * 8}%`,
  top: `${60 + Math.sin(i) * 20}%`,
  animationDelay: `${i * 0.2}s`,
  animationDuration: `${2 + (i % 4) * 0.5}s`,
}))
</script>

<template>
  <section class="relative py-24 overflow-hidden bg-black">
    <!-- Section Header -->
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
        {{ $t('赋能全球顶尖出海品牌') }}
      </h2>
      <p class="text-zinc-500 text-lg">
        Trusted by 100+ High-Growth Startups & Enterprise Brands Worldwide
      </p>
    </div>

    <!-- Planet Arc Container -->
    <div class="relative h-[400px] overflow-hidden">
      <!-- Marquee Track - positioned above the planet -->
      <div class="absolute top-8 left-0 right-0 z-10 overflow-hidden">
        <div class="flex animate-marquee">
          <div
            v-for="(brand, index) in [...brands, ...brands]"
            :key="`row1-${index}`"
            class="group flex items-center gap-3 px-8 py-4 cursor-pointer transition-all duration-300 text-zinc-600 grayscale opacity-60 hover:text-white hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(115,98,168,0.8)]"
          >
            <span :class="[brand.icon, 'w-5 h-5 transition-colors duration-300']" />
            <span class="font-black text-lg tracking-widest uppercase whitespace-nowrap">
              {{ brand.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Second row - reverse direction -->
      <div class="absolute top-24 left-0 right-0 z-10 overflow-hidden">
        <div class="flex animate-marquee-reverse">
          <div
            v-for="(brand, index) in [...reversedBrands, ...reversedBrands]"
            :key="`row2-${index}`"
            class="group flex items-center gap-3 px-8 py-4 cursor-pointer transition-all duration-300 text-zinc-600 grayscale opacity-60 hover:text-white hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(115,98,168,0.8)]"
          >
            <span :class="[brand.icon, 'w-5 h-5 transition-colors duration-300']" />
            <span class="font-black text-lg tracking-widest uppercase whitespace-nowrap">
              {{ brand.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Giant Planet Edge -->
      <div
        class="absolute -bottom-[400px] left-1/2 -translate-x-1/2 w-[150vw] h-[500px] rounded-[100%] border-t border-[#7362a8]/50"
        :style="{
          background: 'radial-gradient(ellipse at top, rgba(115, 98, 168, 0.15) 0%, rgba(115, 98, 168, 0.05) 30%, transparent 70%)',
          boxShadow: '0 -20px 60px rgba(115, 98, 168, 0.3), 0 -5px 20px rgba(115, 98, 168, 0.2), inset 0 2px 20px rgba(115, 98, 168, 0.1)',
        }"
      />

      <!-- Additional glow layer -->
      <div
        class="absolute -bottom-[380px] left-1/2 -translate-x-1/2 w-[140vw] h-[480px] rounded-[100%] pointer-events-none"
        :style="{
          background: 'radial-gradient(ellipse at top, rgba(115, 98, 168, 0.08) 0%, transparent 50%)',
        }"
      />

      <!-- Ambient particles -->
      <div class="absolute inset-0 pointer-events-none">
        <div
          v-for="(particle, i) in particles"
          :key="i"
          class="absolute w-1 h-1 bg-[#7362a8]/40 rounded-full animate-pulse"
          :style="particle"
        />
      </div>
    </div>

    <!-- Gradient fade edges -->
    <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
    <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
  </section>
</template>
