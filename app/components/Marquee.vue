<script setup lang="ts">
withDefaults(defineProps<{
    pauseOnHover?: boolean
    reverse?: boolean
}>(), {
    pauseOnHover: true,
    reverse: false
})

const repeat = 4
</script>

<template>
    <!-- gap值很重要，会影响页面是否流畅滚动，gap是每个容器的间隔，如果间隔不一致就会出现卡顿 -->
    <div class="group flex flex-row overflow-hidden p-2 [--marquee-duration:40s]  [--gap:1rem] [gap:var(--gap)]">
       <div v-for="i in repeat" :key="i" class="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee" :class="{
         'group-hover:[animation-play-state:paused]': pauseOnHover
       }" :style="{animationDirection: reverse ? 'reverse' : 'normal'}">
        <slot />
       </div>
    </div>
</template>