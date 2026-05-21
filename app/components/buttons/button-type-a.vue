<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: []
}>()

// 对齐 React custom-buttons ButtonTypeA：实心紫色圆角按钮 + 箭头
</script>

<template>
  <button
    type="button"
    :class="cn(
      'relative px-6 py-2.5 rounded-full font-medium text-sm',
      'bg-primary hover:bg-primary/90 text-primary-foreground',
      'transition-all duration-300 hover:shadow-[0_0_20px_rgba(115,98,168,0.5)]',
      props.class,
    )"
    @click="emit('click')"
  >
    <span class="relative z-10 flex items-center gap-2">
      <slot>{{ $t('免费品牌调研报告') }}</slot>
      <span class="i-lucide-arrow-right w-4 h-4" />
    </span>
  </button>
</template>
