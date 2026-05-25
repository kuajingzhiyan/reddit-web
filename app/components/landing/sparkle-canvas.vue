<script setup lang="ts">
// fixed：仅铺满视口；勿放在「包一整页」的 relative 里，否则画布按整页高度分配辨率会极卡
const props = withDefaults(defineProps<{
  fixed?: boolean
}>(), {
  fixed: false,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

/** 散落星点：全屏随机分布 + 柔和闪烁 */
interface SparkleStar {
  x: number
  y: number
  size: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
  isBright: boolean
}

const COLOR_BRIGHT = '195, 180, 235'
const COLOR_DIM = '235, 232, 245'

/** 视口级画布：略压 DPR，老款 Mac / 高 DPR 屏更省显存 */
function effectiveDpr(): number {
  const raw = window.devicePixelRatio || 1
  let cap = Math.min(raw, 1.75)
  if (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
    cap = Math.min(cap, 1.25)
  return cap
}

function createSparkles(width: number, height: number): SparkleStar[] {
  const area = width * height
  // 视口面积有限，仍设上限避免极端宽屏
  const count = Math.min(100, Math.max(40, Math.floor(area / 12000)))

  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.18
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: isBright ? 2 + Math.random() * 1.6 : 0.85 + Math.random() * 1,
      baseAlpha: isBright ? 0.42 + Math.random() * 0.3 : 0.2 + Math.random() * 0.22,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0008 + Math.random() * 0.002,
      isBright,
    }
  })
}

function initSparkleField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d', { alpha: true })
  if (!context)
    return () => {}

  const ctx = context
  let width = 0
  let height = 0
  let stars: SparkleStar[] = []
  let animationId = 0
  let docVisible = !document.hidden

  function resize() {
    const parent = canvas.parentElement
    if (!parent)
      return

    width = parent.clientWidth
    height = parent.clientHeight
    const dpr = effectiveDpr()

    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    stars = createSparkles(width, height)
  }

  function draw(time: number) {
    ctx.clearRect(0, 0, width, height)

    for (const star of stars) {
      const twinkle = 0.75 + 0.25 * Math.sin(time * star.twinkleSpeed + star.twinklePhase)
      const alpha = Math.min(1, star.baseAlpha * twinkle)
      const rgb = star.isBright ? COLOR_BRIGHT : COLOR_DIM

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`
      ctx.fill()

      if (star.isBright) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR_BRIGHT}, ${alpha * 0.14})`
        ctx.fill()
      }
    }
  }

  function tick(time: number) {
    if (docVisible)
      draw(time)
    animationId = requestAnimationFrame(tick)
  }

  function onVisibility() {
    docVisible = !document.hidden
  }

  function onResize() {
    resize()
  }

  resize()
  animationId = requestAnimationFrame(tick)
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}

let dispose: (() => void) | undefined

onMounted(() => {
  if (!canvasRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  dispose = initSparkleField(canvasRef.value)
})

onUnmounted(() => {
  dispose?.()
})
</script>

<template>
  <div
    class="overflow-hidden pointer-events-none"
    :class="props.fixed ? 'fixed inset-0 z-0 h-[100dvh] w-full' : 'absolute inset-0'"
  >
    <canvas
      ref="canvasRef"
      class="sparkle-starfield-canvas"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.sparkle-starfield-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
