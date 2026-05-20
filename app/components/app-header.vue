<script setup lang="ts">
import { cn } from '~/utils/cn'

const { t,locale,setLocale } = useI18n()

// 导航文案走 i18n，便于后续切换语言
const navLinks = computed(() => [
  { label: t('核心优势'), href: '#why-spangrowth' },
  { label: t('GEO发帖与评论'), href: '#services' },
  { label: t('服务流程'), href: '#process' },
  { label: t('AI 扫描仪'), href: '#ai-scanner' },
  { label: t('联系我们'), href: '#contact' },
])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeLanguage = ref<'EN' | 'ZH'>('ZH')

const SCROLL_ON = 25
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

// 切换语言
const changeLanguage = (language: 'EN' | 'ZH') => {
  activeLanguage.value = language
  setLocale(language === 'EN' ? 'en' : 'zh')
}

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
}

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

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <a href="#" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span class="text-primary-foreground font-bold text-sm">S</span>
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
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        <div class="hidden lg:flex items-center gap-4">
          <div class="flex items-center gap-1 text-sm">
            <div
              class="btn-reset"
              :class="cn('px-2 py-1 rounded transition-colors', activeLanguage === 'EN' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')"
              @click="changeLanguage('EN')"
            >
              EN
            </div>
            <span class="text-muted-foreground">/</span>
            <button
              class="btn-reset"
              type="button"
              :class="cn('px-2 py-1 rounded transition-colors', activeLanguage === 'ZH' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')"
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
          class="btn-reset lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span
            :class="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="w-6 h-6"
          />
        </button>
      </div>

      <div
        :class="cn(
          'mobile-menu-panel lg:hidden overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0',
        )"
      >
        <nav class="flex flex-col gap-4 pt-4">
          <button
            v-for="link in navLinks"
            :key="link.href"
            type="button"
            class="btn-reset text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
            @click="scrollToSection(link.href)"
          >
            {{ link.label }}
          </button>
          <div class="pt-4 border-t border-border">
            <ButtonsButtonTypeA class="w-full" @click="scrollToSection('#hero-form')">
              {{ $t('免费品牌调研报告') }}
            </ButtonsButtonTypeA>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-scroll-bg {
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  transition: opacity 0.3s ease-out;
  will-change: opacity;
}

/* 移动端菜单：不透明毛玻璃，铺满视口宽度 */
.mobile-menu-panel {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
}

@media (min-width: 640px) {
  .mobile-menu-panel {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
