<script setup lang="ts">
withDefaults(defineProps<{
  pauseOnHover?: boolean
  reverse?: boolean
  repeat?: number
}>(), {
  pauseOnHover: true,
  reverse: false,
  repeat: 4,
})
</script>

<template>
  <!--
    轨道仅用 transform 动画；translate3d + isolate 促合成层。
    勿在全局 index.css 再定义 .animate-marquee，否则会与 Uno 冲突导致循环重置顿挫。
  -->
  <div
    class="group/marquee isolate flex flex-row overflow-hidden p-2 [--marquee-duration:80s] [--gap:1rem] [gap:var(--gap)]"
  >
    <div
      v-for="i in repeat"
      :key="i"
      class="marquee-track flex shrink-0 justify-around [gap:var(--gap)] animate-marquee [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
      :class="{
        'group-hover/marquee:[animation-play-state:paused]': pauseOnHover,
      }"
      :style="{ animationDirection: reverse ? 'reverse' : 'normal' }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
  }
}
</style>
