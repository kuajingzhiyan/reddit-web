<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { cn } from '~/utils/cn'

const { locale, setLocale } = useI18n()

// 导航文案对齐 React header.tsx（中文 key + i18n 翻译）
const navLinks = computed(() => [
  { label: '核心服务', href: '#services' },
  { label: '积分中心', href: '#ai-scanner' },
  { label: '客户反馈', href: '#testimonials' },
  { label: '服务流程', href: '#process' },
  { label: '工具', href: '#tools' },
])

// 移动端菜单：面板展开 + 导航项错峰入场
const mobileMenuTransition = {
  duration: 0.32,
  ease: [0.32, 0.72, 0, 1] as const,
}

const mobileNavItemTransition = (index: number) => ({
  delay: 0.05 + index * 0.045,
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1] as const,
})

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeLanguage = ref<'EN' | 'ZH'>(locale.value === 'en' ? 'EN' : 'ZH')

// 滞后阈值，避免 scrollY 在 0 附近来回切换导致闪烁
const SCROLL_ON = 12
const SCROLL_OFF = 4
let scrollTicking = false

function updateScrollState() {
  if (scrollTicking)
    return

  scrollTicking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    if (!isScrolled.value && y >= SCROLL_ON)
      isScrolled.value = true
    else if (isScrolled.value && y <= SCROLL_OFF)
      isScrolled.value = false

    scrollTicking = false
  })
}

function changeLanguage(language: 'EN' | 'ZH') {
  activeLanguage.value = language
  setLocale(language === 'EN' ? 'en' : 'zh')
}

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
}

watch(locale, (value) => {
  activeLanguage.value = value === 'en' ? 'EN' : 'ZH'
})

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- 背景层常驻，只过渡 opacity，避免 blur / border 切换时出现白条 -->
    <div
      aria-hidden="true"
      class="header-scroll-bg pointer-events-none absolute inset-0 border-b border-border"
      :class="isScrolled ? 'opacity-100' : 'opacity-0'"
    />

    <div class="relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <a href="#" class="flex items-center gap-2 group no-underline">
            <div class="w-8 h-8 rounded-lg  flex items-center justify-center">
                <img src="/logo.png" alt="SpanGrowth" class="w-8 h-8">
            </div>
            <span class="text-xl font-bold tracking-tight text-foreground group-hover:text-gradient transition-all duration-300">
              SpanGrowth
            </span>
          </a>

          <nav class="hidden lg:flex items-center gap-8">
            <button
              v-for="link in navLinks"
              :key="link.href"
            class="btn-reset text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              @click="scrollToSection(link.href)"
            >
            {{ $t(link.label) }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          <div class="hidden lg:flex items-center gap-4">
            <div class="flex items-center gap-1 text-sm">
              <button
                type="button"
                :class="cn(
                  'lang-btn px-2 py-1 rounded',
                  activeLanguage === 'EN' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )"
                @click="changeLanguage('EN')"
              >
                EN
              </button>
              <span class="text-muted-foreground">/</span>
              <button
                type="button"
                :class="cn(
                  'lang-btn px-2 py-1 rounded',
                  activeLanguage === 'ZH' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )"
                @click="changeLanguage('ZH')"
              >
                ZH
              </button>
            </div>
            <ButtonsButtonTypeA @click="scrollToSection('#hero-form')">
              {{ $t('免费品牌调研报告') }}
            </ButtonsButtonTypeA>
          </div>

          <button
            type="button"
            class="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span :class="isMobileMenuOpen ? 'i-lucide-x w-6 h-6' : 'i-lucide-menu w-6 h-6'" />
          </button>
        </div>

        <AnimatePresence>
          <motion.div
            v-if="isMobileMenuOpen"
            key="mobile-menu"
            class="mobile-menu-panel lg:hidden overflow-hidden"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="mobileMenuTransition"
          >
            <nav class="flex flex-col gap-4 pt-4 pb-6">
              <motion.button
                v-for="(link, index) in navLinks"
                :key="link.href"
                type="button"
                class="nav-link text-left"
                :initial="{ opacity: 0, x: -14 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -8 }"
                :transition="mobileNavItemTransition(index)"
                @click="scrollToSection(link.href)"
              >
                {{ $t(link.label) }}
              </motion.button>
              <motion.div
                class="pt-4 border-t border-border "
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 6 }"
                :transition="mobileNavItemTransition(navLinks.length)"
              >
                <ButtonsButtonTypeA class="max-w-fit" @click="scrollToSection('#hero-form')">
                  {{ $t('免费品牌调研报告') }}
                </ButtonsButtonTypeA>
              </motion.div>
            </nav>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 滚动背景：blur 常驻，仅 opacity 过渡，避免切换 backdrop-filter 闪白 */
.header-scroll-bg {
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  transition: opacity 0.3s ease-out;
  will-change: opacity;
}

/* 导航下划线：用 ::after 替代 group-hover，避免 shortcut 内 group 失效 */
.nav-link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.25rem;
  width: 0;
  height: 1px;
  background-color: #7362a8;
  transition: width 0.3s ease;
}

.nav-link-underline:hover::after {
  width: 100%;
}

/* 移动端菜单：不透明毛玻璃，铺满视口宽度 */
.mobile-menu-panel {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background-color: rgba(0, 0, 0, 0.95);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
