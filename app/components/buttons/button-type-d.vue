<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  class?: string
  href?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const isHovered = ref(false)

const contentClass = computed(() =>
  cn(
    'relative inline-flex items-center gap-2 text-sm font-medium',
    'text-muted-foreground hover:text-foreground',
    'transition-all duration-500',
    isHovered.value && 'animate-blur-in',
    props.class,
  ),
)
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    type="button"
    :class="contentClass"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="emit('click')"
  >
    <span class="relative">
      <slot />
      <span
        class="absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300"
        :class="isHovered ? 'w-full' : 'w-0'"
      />
    </span>
    <span
      class="i-lucide-arrow-right w-4 h-4 transition-transform duration-300"
      :class="isHovered && 'translate-x-1'"
    />
    <span
      class="absolute -inset-2 rounded-lg opacity-0 transition-opacity duration-300 bg-primary/10 blur-sm pointer-events-none"
      :class="isHovered && 'opacity-100'"
    />
  </component>
</template>
