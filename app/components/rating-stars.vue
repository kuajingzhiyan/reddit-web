<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = withDefaults(defineProps<{
  /** 当前评分，支持小数（如 4.5 显示半星） */
  rating: number
  /** 最大星数 */
  max?: number
  size?: 'sm' | 'md' | 'lg'
  /** 已点亮的星星颜色类 */
  activeClass?: string
  /** 未点亮的星星颜色类 */
  inactiveClass?: string
  /** true：始终渲染 max 颗星（含空星）；false：仅渲染已点亮颗数 */
  showEmpty?: boolean
}>(), {
  max: 5,
  size: 'md',
  activeClass: 'text-primary',
  inactiveClass: 'text-muted-foreground/40',
  showEmpty: true,
})

// lucide star 实心 path（避免 Uno mask 图标无法 fill）
const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

const sizeClass = computed(() => ({
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}[props.size]))

/** 每颗星的填充比例 0~1，用于半星/动态评分 */
const starItems = computed(() => {
  const clampedRating = Math.min(props.max, Math.max(0, props.rating))

  if (props.showEmpty) {
    return Array.from({ length: props.max }, (_, index) => ({
      key: index,
      fill: Math.min(1, Math.max(0, clampedRating - index)),
    }))
  }

  const count = Math.ceil(clampedRating)
  return Array.from({ length: count }, (_, index) => ({
    key: index,
    fill: Math.min(1, Math.max(0, clampedRating - index)),
  }))
})

const ariaLabel = computed(() => `${props.rating} / ${props.max}`)
</script>

<template>
  <div
    class="inline-flex items-center gap-1"
    role="img"
    :aria-label="ariaLabel"
  >
    <span
      v-for="star in starItems"
      :key="star.key"
      :class="cn('relative inline-block shrink-0', sizeClass)"
    >
      <!-- 底图：空星 -->
      <svg
        viewBox="0 0 24 24"
        class="block h-full w-full"
        :class="inactiveClass"
        aria-hidden="true"
      >
        <path fill="currentColor" :d="STAR_PATH" />
      </svg>

      <!-- 前景：按 fill 比例裁剪，支持半星 -->
      <span
        v-if="star.fill > 0"
        class="absolute inset-y-0 left-0 overflow-hidden"
        :style="{ width: `${star.fill * 100}%` }"
      >
        <svg
          viewBox="0 0 24 24"
          :class="cn('block h-full', sizeClass, activeClass)"
          aria-hidden="true"
        >
          <path fill="currentColor" :d="STAR_PATH" />
        </svg>
      </span>
    </span>
  </div>
</template>
