<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  class?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  type: 'button',
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)
const glowPosition = ref({ x: 50, y: 50 })

function handleMouseMove(e: MouseEvent) {
  if (!buttonRef.value)
    return
  const rect = buttonRef.value.getBoundingClientRect()
  glowPosition.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    :type="props.type"
    :disabled="props.disabled"
    :class="cn(
      'relative px-8 py-4 rounded-xl font-semibold text-base',
      'text-primary-foreground overflow-hidden group',
      'transition-all duration-300',
      'hover:shadow-[0_0_30px_rgba(115,98,168,0.6)]',
      props.disabled && 'opacity-50 cursor-not-allowed',
      props.class,
    )"
    :style="{
      background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(115,98,168,1) 0%, rgba(115,98,168,0.8) 50%, rgba(95,78,148,1) 100%)`,
    }"
    @click="emit('click')"
    @mousemove="handleMouseMove"
  >
    <span class="relative z-10 flex items-center justify-center gap-3">
      <slot />
      <span class="i-lucide-arrow-right w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      :style="{
        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(115,98,168,0.3) 0%, transparent 50%)`,
      }"
    />
  </button>
</template>
