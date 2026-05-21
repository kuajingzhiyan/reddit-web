<script setup lang="ts">
// 品牌跑马灯：对齐 React components/planet-marquee.tsx（纯文本品牌名）
const brands = [
  { name: 'Anker' },
  { name: 'RayNeo' },
  { name: 'Angry Miao' },
  { name: 'Sharge' },
  { name: 'GravaStar' },
  { name: 'totwoo' },
  { name: 'Seeed Studio' },
  { name: 'Meta' },
  { name: 'Razer' },
  { name: 'Framework' },
  { name: 'Teenage Engineering' },
  { name: 'Opal' },
  { name: 'Peak Design' },
  { name: 'Analogue' },
  { name: 'Rabbit' },
]

const reversedBrands = [...brands].reverse()

const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${10 + i * 8}%`,
  top: `${60 + Math.sin(i) * 20}%`,
  animationDelay: `${i * 0.2}s`,
  animationDuration: `${2 + (i % 4) * 0.5}s`,
}))
</script>

<template>
  <section class="relative py-24 overflow-hidden bg-black">
    <div class="text-center mb-16 relative z-10">
      <h2 class="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
        {{ $t('赋能全球顶尖出海品牌') }}
      </h2>
      <p class="text-zinc-500 text-lg">
        {{ $t('深受 100+ 高成长初创企业及全球企业品牌的信赖') }}
      </p>
    </div>

    <div class="relative h-[400px] overflow-hidden">
      <div class="absolute top-8 left-0 right-0 z-10 overflow-hidden">
        <!-- <div class="flex animate-marquee [--marquee-duration:40s] [--gap:1rem] [gap:var(--gap)]"> -->
        <Marquee :repeat="4">
          <div v-for="(brand, index) in [...brands]" :key="`first-${index}`"
            class="group/brand flex items-center px-12 py-8 cursor-pointer transition-all duration-500 hover:scale-110">
            <span
              class="font-bold text-3xl md:text-4xl tracking-wider uppercase whitespace-nowrap text-zinc-500 group-hover/brand:text-white group-hover/brand:drop-shadow-[0_0_20px_rgba(115,98,168,0.8)] transition-all duration-500">
              {{ brand.name }}
            </span>
          </div>
        </Marquee>
        <!-- </div> -->
      </div>

      <div class="absolute top-24 left-0 right-0 z-10 overflow-hidden">
        <!-- <div class="flex animate-marquee-reverse [--marquee-duration:40s] [--gap:1rem] [gap:var(--gap)]"> -->
          <Marquee :repeat="4" :reverse="true">  
          <div v-for="(brand, index) in [...reversedBrands]" :key="`second-${index}`"
            class="group/brand flex items-center px-12 py-8 cursor-pointer transition-all duration-500 hover:scale-110">
            <span
              class="font-bold text-3xl md:text-4xl tracking-wider uppercase whitespace-nowrap text-zinc-500 group-hover/brand:text-white group-hover/brand:drop-shadow-[0_0_20px_rgba(115,98,168,0.8)] transition-all duration-500">
              {{ brand.name }}
            </span>
          </div>
        </Marquee>
        <!-- </div> -->
      </div>

      <div
        class="absolute -bottom-[400px] left-1/2 -translate-x-1/2 w-[150vw] h-[500px] rounded-[100%] border-t border-[#7362a8]/50"
        style="background: radial-gradient(ellipse at top, rgba(115, 98, 168, 0.15) 0%, rgba(115, 98, 168, 0.05) 30%, transparent 70%); box-shadow: 0 -20px 60px rgba(115, 98, 168, 0.3), 0 -5px 20px rgba(115, 98, 168, 0.2), inset 0 2px 20px rgba(115, 98, 168, 0.1);" />

      <div
        class="absolute -bottom-[380px] left-1/2 -translate-x-1/2 w-[140vw] h-[480px] rounded-[100%] pointer-events-none"
        style="background: radial-gradient(ellipse at top, rgba(115, 98, 168, 0.08) 0%, transparent 50%);" />

      <div class="absolute inset-0 pointer-events-none">
        <div v-for="(particle, i) in particles" :key="i"
          class="absolute w-1 h-1 bg-[#7362a8]/40 rounded-full animate-pulse" :style="{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }" />
      </div>
    </div>

    <div
      class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
    <div
      class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
  </section>
</template>
