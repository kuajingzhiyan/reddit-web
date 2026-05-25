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
  isBright: boolean
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
const ORBIT_RGB = '165, 145, 210'

/** 压低 DPR，减少每帧写入像素（老款 MacBook Retina 上收益明显） */
function effectiveDpr(): number {
  const raw = window.devicePixelRatio || 1
  let cap = Math.min(raw, 1.5)
  if (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
    cap = Math.min(cap, 1.25)
  return cap
}

/** 低配机：更少星 / 更少轨道点 */
function isLowTierDevice(): boolean {
  return !!(navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
}

function createStars(width: number, height: number): Star[] {
  const maxRadius = Math.hypot(width, height) * 0.62
  const low = isLowTierDevice()
  const cap = low ? 90 : 130
  const divisor = low ? 10000 : 7500
  const count = Math.min(cap, Math.max(48, Math.floor((width * height) / divisor)))

  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.26
    return {
      angle: Math.random() * Math.PI * 2,
      radius: maxRadius * (0.12 + Math.random() * 0.88),
      size: isBright ? 2.4 + Math.random() * 2 : 1 + Math.random() * 1.3,
      baseAlpha: isBright ? 0.52 + Math.random() * 0.28 : 0.34 + Math.random() * 0.26,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.001 + Math.random() * 0.0025,
      rotationSpeed: 0.45 + Math.random() * 0.85,
      isBright,
    }
  })
}

function createOrbitRings(width: number, height: number): OrbitRing[] {
  const base = Math.min(width, height) * 0.38
  const low = isLowTierDevice()
  // 3 条环即可，少一次内层大量 arc
  const indices = [0, 1, 2] as const
  return indices.map(index => ({
    radius: base * (0.5 + index * 0.22),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: 0.00002 + index * 0.00001,
    // 拉大点距，并限制每环最大点数，避免每帧数百次 fill
    dotSpacing: low ? 28 + index * 10 : 20 + index * 6,
  }))
}

function initStarfield(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d', { alpha: true })
  if (!context)
    return () => {}

  const ctx = context

  let width = 0
  let height = 0
  let stars: Star[] = []
  let rings: OrbitRing[] = []
  let animationId = 0
  let docVisible = !document.hidden
  /** Hero 滚出视口后不再绘制，省 CPU */
  let heroInView = true
  let intersectionObserver: IntersectionObserver | null = null

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
    const dpr = effectiveDpr()

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
    const low = isLowTierDevice()
    const maxDots = low ? 28 : 40

    for (const ring of rings) {
      ring.rotation += ring.rotationSpeed
      let dotCount = Math.floor((Math.PI * 2 * ring.radius) / ring.dotSpacing)
      dotCount = Math.min(maxDots, Math.max(12, dotCount))

      for (let i = 0; i < dotCount; i++) {
        const angle = ring.rotation + (i / dotCount) * Math.PI * 2
        const x = cx + Math.cos(angle) * ring.radius
        const y = cy + Math.sin(angle) * ring.radius * 0.32
        const alpha = 0.3 + 0.12 * Math.sin(time * 0.00035 + i * 0.35)

        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ORBIT_RGB}, ${alpha})`
        ctx.fill()
      }
    }
  }

  function drawStars(time: number) {
    const { x: cx, y: cy } = center()
    const baseRotation = time * 0.000055
    const lowTier = isLowTierDevice()

    for (const star of stars) {
      const twinkle = 0.78 + 0.22 * Math.sin(time * star.twinkleSpeed + star.twinklePhase)
      const alpha = Math.min(1, star.baseAlpha * twinkle)
      const rgb = star.isBright ? STAR_COLOR_BRIGHT : STAR_COLOR_DIM

      const angle = star.angle + baseRotation * star.rotationSpeed
      const x = cx + Math.cos(angle) * star.radius
      const y = cy + Math.sin(angle) * star.radius * 0.32

      ctx.beginPath()
      ctx.arc(x, y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`
      ctx.fill()

      // 低配机去掉光晕第二层，减半 fill 调用
      if (star.isBright && !lowTier) {
        ctx.beginPath()
        ctx.arc(x, y, star.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_COLOR_BRIGHT}, ${alpha * 0.2})`
        ctx.fill()
      }
    }
  }

  function frame(time: number) {
    if (docVisible && heroInView && width > 0) {
      ctx.clearRect(0, 0, width, height)
      drawOrbitRings(time)
      drawStars(time)
    }
    animationId = requestAnimationFrame(frame)
  }

  function onVisibility() {
    docVisible = !document.hidden
  }

  function onResize() {
    resize()
  }

  resize()
  animationId = requestAnimationFrame(frame)
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)

  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      heroInView = entry?.isIntersecting ?? true
    },
    { threshold: 0, rootMargin: '80px' },
  )
  intersectionObserver.observe(canvas)

  return () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    intersectionObserver?.disconnect()
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
