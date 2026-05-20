<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  icon?: string
  label?: string
  class?: string
}>(), {
  icon: 'i-lucide-message-circle',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    :aria-label="props.label"
    :class="cn(
      'relative p-3 rounded-xl glass-card text-foreground',
      'transition-all duration-300',
      'hover:scale-110 hover:shadow-[0_0_20px_rgba(115,98,168,0.4)]',
      'hover:border-primary/40',
      props.class,
    )"
    @click="emit('click')"
  >
    <span :class="[props.icon, 'w-5 h-5']" />
  </button>
</template>
