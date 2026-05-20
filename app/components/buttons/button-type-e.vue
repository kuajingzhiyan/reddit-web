<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const isHovered = ref(false)
</script>

<template>
  <button
    type="button"
    :class="cn(
      'relative px-8 py-4 rounded-xl font-semibold text-base',
      'bg-primary/10 border border-primary/30',
      'text-foreground overflow-hidden group',
      'transition-all duration-300 hover:border-primary/60',
      props.class,
    )"
    @click="emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span
      class="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500"
      :class="isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'"
    />
    <span
      class="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
    />
    <span
      class="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />
    <span class="relative z-10 flex items-center gap-2">
      <slot />
    </span>
  </button>
</template>
