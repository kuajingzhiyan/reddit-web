<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

/** 背景星点：极坐标 + 旋转速度 + 闪烁参数 */
interface Star {
  angle: number
  radius: number
  size: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
  rotationSpeed: number
}

/** 轨道环：同心椭圆虚线圆环 */
interface OrbitRing {
  radius: number
  rotation: number
  rotationSpeed: number
  dotSpacing: number
}

const STAR_COLOR_BRIGHT = '195, 180, 235'
const STAR_COLOR_DIM = '235, 232, 245'

function createStars(width: number, height: number): Star[] {
  const maxRadius = Math.hypot(width, height) * 0.62
  const count = Math.min(260, Math.floor((width * height) / 5000))

  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.28
    return {
      angle: Math.random() * Math.PI * 2,
      radius: maxRadius * (0.12 + Math.random() * 0.88),
      size: isBright ? 3 + Math.random() * 2.5 : 1.1 + Math.random() * 1.5,
      baseAlpha: isBright ? 0.58 + Math.random() * 0.3 : 0.38 + Math.random() * 0.3,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0012 + Math.random() * 0.003,
      rotationSpeed: 0.45 + Math.random() * 0.85,
    }
  })
}

function createOrbitRings(width: number, height: number): OrbitRing[] {
  const base = Math.min(width, height) * 0.38
  return [0, 1, 2, 3].map(index => ({
    radius: base * (0.5 + index * 0.2),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: 0.000025 + index * 0.000012,
    dotSpacing: 13 + index * 3,
  }))
}

function initStarfield(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context)
    return () => {}

  const ctx = context

  let width = 0
  let height = 0
  let stars: Star[] = []
  let rings: OrbitRing[] = []
  let animationId = 0
  let scrollY = 0

  const center = () => ({
    x: width * 0.52,
    y: height * 0.58,
  })

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

    stars = createStars(width, height)
    rings = createOrbitRings(width, height)
  }

  function drawOrbitRings(time: number) {
    const { x: cx, y: cy } = center()
    const scrollLift = scrollY * 0.12

    for (const ring of rings) {
      ring.rotation += ring.rotationSpeed
      const dotCount = Math.floor((Math.PI * 2 * ring.radius) / ring.dotSpacing)

      for (let i = 0; i < dotCount; i++) {
        const angle = ring.rotation + (i / dotCount) * Math.PI * 2
        const x = cx + Math.cos(angle) * ring.radius
        const y = cy + scrollLift + Math.sin(angle) * ring.radius * 0.32
        const alpha = 0.32 + 0.14 * Math.sin(time * 0.00035 + i * 0.35)

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165, 145, 210, ${alpha})`
        ctx.fill()
      }
    }
  }

  function drawStars(time: number) {
    const { x: cx, y: cy } = center()
    const scrollLift = scrollY * 0.06
    const baseRotation = time * 0.00006

    for (const star of stars) {
      const twinkle = 0.78 + 0.22 * Math.sin(time * star.twinkleSpeed + star.twinklePhase)
      const alpha = Math.min(1, star.baseAlpha * twinkle)
      const isBright = star.size > 2.5
      const rgb = isBright ? STAR_COLOR_BRIGHT : STAR_COLOR_DIM

      const angle = star.angle + baseRotation * star.rotationSpeed
      const x = cx + Math.cos(angle) * star.radius
      const y = cy + scrollLift + Math.sin(angle) * star.radius * 0.32

      ctx.beginPath()
      ctx.arc(x, y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`
      ctx.fill()

      if (isBright) {
        ctx.beginPath()
        ctx.arc(x, y, star.size * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_COLOR_BRIGHT}, ${alpha * 0.22})`
        ctx.fill()
      }
    }
  }

  function render(time: number) {
    ctx.clearRect(0, 0, width, height)
    drawOrbitRings(time)
    drawStars(time)
    animationId = requestAnimationFrame(render)
  }

  function onResize() {
    resize()
  }

  function onScroll() {
    scrollY = window.scrollY
  }

  resize()
  animationId = requestAnimationFrame(render)
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', onScroll)
  }
}

let disposeStarfield: (() => void) | undefined

onMounted(() => {
  if (!canvasRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  disposeStarfield = initStarfield(canvasRef.value)
})

onUnmounted(() => {
  disposeStarfield?.()
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <canvas
      ref="canvasRef"
      class="hero-starfield-canvas"
      aria-hidden="true"
    />
    <div class="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]" />
    <div class="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px]" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_92%)]" />
  </div>
</template>

<style scoped>
.hero-starfield-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
