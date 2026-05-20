<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const { t } = useI18n()
// 打字机文案与默认 slot 均用中文 key，便于与 zh.json 同步
const typewriterSource = computed(() => t('免费品牌调研报告'))

const isHovered = ref(false)
const displayText = ref('')
let timerId: ReturnType<typeof setTimeout> | null = null

function clearTypewriter() {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
}

function delayForIndex(_index: number) {
  return 50
}

function startTypewriter() {
  clearTypewriter()
  displayText.value = ''
  let index = 0
  const textStr = typewriterSource.value

  const tick = () => {
    if (index >= textStr.length) {
      clearTypewriter()
      return
    }
    index++
    displayText.value = textStr.slice(0, index)
    timerId = setTimeout(tick, delayForIndex(index))
  }

  timerId = setTimeout(tick, delayForIndex(0))
}

watch(isHovered, (hovered) => {
    clearTypewriter()
    if (hovered)
      startTypewriter()
    else
      displayText.value = ''
})

onUnmounted(() => {
  clearTypewriter()
})
</script>

<template>
  <button
    type="button"
    :class="cn(
      'relative px-6 py-2.5 rounded-lg font-medium text-sm',
      'bg-transparent border border-primary/50',
      'text-primary hover:text-foreground',
      'transition-all duration-300',
      'hover:border-primary hover:shadow-[0_0_20px_rgba(115,98,168,0.5)]',
      props.class,
    )"
    @click="emit('click')"

  >
    <span class="relative z-10 flex items-center gap-2"> 
      <template v-if="isHovered">
        <span class="text-gradient font-semibold">{{ displayText }}</span>
        <span class="w-0.5 h-4 bg-primary animate-typing-cursor" />
      </template>
      <template v-else>
        <slot>{{ $t('免费品牌调研报告') }}</slot>
      </template>
    </span>
    <div
      class="absolute inset-0 rounded-lg bg-primary/20 transition-opacity duration-300"
      :class="isHovered ? 'opacity-100' : 'opacity-0'"
    />
  </button>
</template>
