<script setup lang="ts">
import { cn } from '~/utils/cn'

export interface RtSelectOption {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: string
  options: RtSelectOption[]
  placeholder?: string
  id?: string
  required?: boolean
  disabled?: boolean
  inputClass?: string
}>(), {
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const { t } = useI18n()
// 未传 placeholder 时使用中文 key 作为默认占位
const resolvedPlaceholder = computed(() => props.placeholder ?? t('请选择'))

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const displayLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected?.label ?? resolvedPlaceholder.value
})

const hasValue = computed(() => props.modelValue !== '')

function toggleOpen() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function selectOption(option: RtSelectOption) {
  if (option.disabled)
    return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

function onClickOutside(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node))
    closeDropdown()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closeDropdown()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    ref="rootRef"
    class="relative"
  >
    <!-- 用于原生表单 required 校验 -->
    <input
      v-if="required"
      type="text"
      :value="modelValue"
      :required="required"
      tabindex="-1"
      aria-hidden="true"
      class="absolute opacity-0 w-0 h-0 pointer-events-none"
    >

    <button
      :id="id"
      type="button"
      :disabled="disabled"
      :class="cn(
        'input-field w-full flex items-center justify-between gap-2 text-left',
        !hasValue && 'text-[rgba(255,255,255,0.6)]',
        hasValue && 'text-white',
        disabled && 'opacity-60 cursor-not-allowed',
        props.inputClass,
      )"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click.stop="toggleOpen"
    >
      <span class="truncate">{{ displayLabel }}</span>
      <span
        class="i-lucide-chevron-down w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200"
        :class="isOpen && 'rotate-180'"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        class="rt-select-dropdown absolute left-0 right-0 top-[calc(100%+0.25rem)] z-50 max-h-56 overflow-y-auto rounded-lg p-1"
      >
        <li
          v-for="option in options"
          :key="`${option.value}-${option.label}`"
          role="option"
          :aria-selected="modelValue === option.value"
          :class="cn(
            'rounded-md px-3 py-2.5 text-sm transition-colors duration-150',
            option.disabled && 'cursor-not-allowed text-muted-foreground/60',
            !option.disabled && 'cursor-pointer text-foreground hover:bg-primary/15',
            modelValue === option.value && !option.disabled && 'bg-primary/20 text-white',
          )"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.rt-select-dropdown {
  background: rgba(12, 12, 12, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(115, 98, 168, 0.15);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}
</style>
