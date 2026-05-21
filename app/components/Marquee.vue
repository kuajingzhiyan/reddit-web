<script setup lang="ts">
withDefaults(defineProps<{
    pauseOnHover?: boolean
    reverse?: boolean
    repeat?: number
}>(), {
    pauseOnHover: true,
    reverse: false,
    repeat: 4
})

</script>

<template>
    <!-- 使用 group/marquee 命名，避免子元素 group-hover 误触发整行高亮 -->
    <div class="group/marquee flex flex-row overflow-hidden p-2 [--marquee-duration:80s]  [--gap:1rem] [gap:var(--gap)]">
       <div v-for="i in repeat" :key="i" class="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee" :class="{
         'group-hover/marquee:[animation-play-state:paused]': pauseOnHover
       }" :style="{animationDirection: reverse ? 'reverse' : 'normal'}">
        <slot />
       </div>
    </div>
</template>