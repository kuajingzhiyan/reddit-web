<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

/** 散落星点：全屏随机分布 + 柔和闪烁 */
interface SparkleStar {
  x: number
  y: number
  size: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
}

const COLOR_BRIGHT = '195, 180, 235'
const COLOR_DIM = '235, 232, 245'

function createSparkles(width: number, height: number): SparkleStar[] {
  const count = Math.min(180, Math.floor((width * height) / 7000))

  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.2
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: isBright ? 2.2 + Math.random() * 1.8 : 0.9 + Math.random() * 1.2,
      baseAlpha: isBright ? 0.45 + Math.random() * 0.35 : 0.22 + Math.random() * 0.25,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.001 + Math.random() * 0.0025,
    }
  })
}

function initSparkleField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context)
    return () => {}

  const ctx = context
  let width = 0
  let height = 0
  let stars: SparkleStar[] = []
  let animationId = 0

  function resize() {
    const parent = canvas.parentElement
    if (!parent)
      return

    width = parent.clientWidth
    height = parent.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

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
      const isBright = star.size > 2
      const rgb = isBright ? COLOR_BRIGHT : COLOR_DIM

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`
      ctx.fill()

      if (isBright) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR_BRIGHT}, ${alpha * 0.15})`
        ctx.fill()
      }
    }
  }

  function render(time: number) {
    draw(time)
    animationId = requestAnimationFrame(render)
  }

  function onResize() {
    resize()
  }

  resize()
  animationId = requestAnimationFrame(render)
  window.addEventListener('resize', onResize)

  return () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
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
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
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
