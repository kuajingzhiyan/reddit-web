<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  defaultText?: string
  loadingText?: string
  isLoading?: boolean
  class?: string
}>(), {
  isLoading: false,
})

const emit = defineEmits<{
  click: []
}>()

const { t } = useI18n()
// 未传入 props 时回落到中文 key 文案
const resolvedDefaultText = computed(() => props.defaultText ?? t('智能扫描'))
const resolvedLoadingText = computed(() => props.loadingText ?? t('扫描中...'))

const displayText = ref('')
let timerId: ReturnType<typeof setTimeout> | null = null

function clearTypewriter() {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
}

function delayForIndex(_index: number) {
  return 80
}

function startTypewriter(target: string) {
  clearTypewriter()
  displayText.value = ''
  let index = 0

  const tick = () => {
    if (index > target.length) {
      displayText.value = target
      clearTypewriter()
      return
    }
    displayText.value = target.slice(0, index) + (index < target.length ? '_' : '')
    index++
    timerId = setTimeout(tick, delayForIndex(index))
  }

  timerId = setTimeout(tick, delayForIndex(0))
}

watch(
  [() => props.isLoading, resolvedDefaultText, resolvedLoadingText],
  () => {
    const target = props.isLoading ? resolvedLoadingText.value : resolvedDefaultText.value
    clearTypewriter()

    // SSR 下直接展示完整文案，避免 setTimeout 在服务端执行
    if (import.meta.server) {
      displayText.value = target
      return
    }

    startTypewriter(target)
  },
  { immediate: true },
)

onUnmounted(() => {
  clearTypewriter()
})
</script>

<template>
  <button
    type="button"
    :disabled="props.isLoading"
    :class="cn(
      'relative px-6 py-3 rounded-xl font-semibold text-sm',
      'bg-primary text-primary-foreground overflow-hidden group',
      'transition-all duration-300',
      'hover:shadow-[0_0_25px_rgba(115,98,168,0.5)]',
      'disabled:opacity-70 disabled:cursor-not-allowed',
      props.class,
    )"
    @click="emit('click')"
  >
    <span class="relative z-10 flex items-center gap-2">
      <span
        class="i-lucide-star w-4 h-4 transition-transform duration-300"
        :class="props.isLoading && 'animate-spin'"
      />
      <span class="min-w-[80px] text-left">{{ displayText }}</span>
    </span>
  </button>
</template>
