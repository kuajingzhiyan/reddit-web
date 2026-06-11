<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { cn } from '~/utils/cn'

const router = useRouter()
const appConfig = useAppConfig()
const tgUrl = appConfig.tgUrl

const { locale, setLocale } = useI18n()

// 导航文案对齐 React header.tsx（中文 key + i18n 翻译）
const navLinks = computed(() => [
  { label: '关于我们', href: '/about' },
  { label: '积分中心', href: '/',  },
  { label: '客户案例', href: '/testimonials' },
  { label: '博客', href: '/blog' },
  { label: 'Ai工具', href: '/' },
  { label: '联系我们', href: '/contact' },
])

/** 核心服务下拉菜单项 */
const coreServiceItems = computed(() => [
  { label: '品牌提及和帖子', href: '/' },
  { label: '营销策略', href: '/' },
  { label: 'SEO:谷歌排名靠前', href: '#services' },
  { label: '潜在客户开发', href: '/' },
  { label: 'AEO 和搜索可见性', href: '/' },
  { label: '品牌声誉管理', href: '/' },
  { label: '社区管理服务', href: '#services' },
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
/** 移动端「核心服务」子菜单展开态 */
const isMobileServicesOpen = ref(false)
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

function navigateTo(href: string) {
  router.push({ path: href })
}

function openTgChat() {
  window.open(tgUrl, '_blank')
  isMobileMenuOpen.value = false
  isMobileServicesOpen.value = false
}

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
  isMobileServicesOpen.value = false
}

function toggleMobileServices() {
  isMobileServicesOpen.value = !isMobileServicesOpen.value
}

watch(locale, (value) => {
  activeLanguage.value = value === 'en' ? 'EN' : 'ZH'
})

watch(isMobileMenuOpen, (open) => {
  if (!open)
    isMobileServicesOpen.value = false
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
          <a href="/" class="flex items-center gap-2 group no-underline">
            <div class="w-8 h-8 rounded-lg  flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/logo-mark.png"
                  alt=""
                  class="size-8 object-contain"
                  width="128"
                  height="127"
                  decoding="async"
                >
            </div>
            <span class="text-xl font-bold tracking-tight text-foreground group-hover:text-gradient transition-all duration-300">
              SpanGrowth
            </span>
          </a>

          <nav class="hidden lg:flex items-center gap-4">
            <!-- 核心服务：pill 触发器 + hover 下拉（参考设计稿，配色适配本站深色 header） -->
            <div class="nav-services group relative">
              <button
                type="button"
                class="nav-services-trigger btn-reset inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200"
              >
                {{ $t('核心服务') }}
                <span
                  class="i-lucide-chevron-down size-4 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden="true"
                />
              </button>

              <!-- pt-2 作 hover 桥，避免移入面板时菜单消失 -->
              <div class="nav-services-panel-wrap pointer-events-none absolute left-0 top-full z-50 w-max translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div
                  class="nav-services-panel min-w-[17rem] max-w-[22rem] rounded-2xl py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  role="menu"
                >
                  <button
                    v-for="item in coreServiceItems"
                    :key="item.label"
                    type="button"
                    role="menuitem"
                    class="nav-services-item btn-reset block w-full px-5 py-2.5 text-left text-sm font-medium leading-snug text-muted-foreground rounded-lg transition-colors duration-200"
                    @click="navigateTo(item.href)"
                  >
                    {{ $t(item.label) }}
                  </button>
                </div>
              </div>
            </div>

            <button
              v-for="link in navLinks"
              :key="link.href"
              type="button"
              class="btn-reset text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              @click="navigateTo(link.href)"
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
              <!-- <div class="flex items-center gap-1">
                <span class="i-lucide-globe size-4"></span>
                <span class="text-sm">EN</span>
              </div> -->
            </div>
            <ButtonsButtonTypeA class="hidden xl:block" @click="openTgChat">
              {{ $t('联系我们') }}
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
              <motion.div
                class="flex flex-col gap-2"
                :initial="{ opacity: 0, x: -14 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -8 }"
                :transition="mobileNavItemTransition(0)"
              >
                <button
                  type="button"
                  class="nav-link flex w-full items-center justify-between text-left font-medium"
                  :aria-expanded="isMobileServicesOpen"
                  @click="toggleMobileServices"
                >
                  {{ $t('核心服务') }}
                  <span
                    class="i-lucide-chevron-down size-4 shrink-0 opacity-70 transition-transform duration-200"
                    :class="{ 'rotate-180': isMobileServicesOpen }"
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  <motion.div
                    v-if="isMobileServicesOpen"
                    key="mobile-services-sub"
                    class="flex flex-col gap-1 overflow-hidden"
                    :initial="{ height: 0, opacity: 0 }"
                    :animate="{ height: 'auto', opacity: 1 }"
                    :exit="{ height: 0, opacity: 0 }"
                    :transition="{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }"
                  >
                    <button
                      v-for="item in coreServiceItems"
                      :key="item.label"
                      type="button"
                      class="nav-link text-left pl-4 text-sm text-muted-foreground"
                      @click="navigateTo(item.href)"
                    >
                      <div class="mt-1">
                        {{ $t(item.label) }}
                      </div>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.button
                v-for="(link, index) in navLinks"
                :key="link.href"
                type="button"
                class="nav-link text-left"
                :initial="{ opacity: 0, x: -14 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -8 }"
                :transition="mobileNavItemTransition(index + 1)"
                @click="navigateTo(link.href)"
              >
                {{ $t(link.label) }}
              </motion.button>

              <div class="grid grid-cols-2 gap-5 text-center">
                <div
                  :class="cn(
                    'border-1 border-primary rounded-lg py-3',
                    activeLanguage === 'EN' ? 'text-foreground bg-primary' : 'text-muted-foreground hover:text-foreground',
                  )"
                  @click="changeLanguage('EN')"
                >
                  EN
                </div>
                <div
                  :class="cn(
                    'border-1 border-primary rounded-lg py-3',
                    activeLanguage === 'ZH' ? 'text-foreground bg-primary' : 'text-muted-foreground hover:text-foreground',
                  )"
                  @click="changeLanguage('ZH')"
                >
                  ZH
                </div>
              </div>
              <motion.div
                class="pt-4 border-t border-border "
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 6 }"
                :transition="mobileNavItemTransition(navLinks.length + 1)"
              >
                <ButtonsButtonTypeA class="max-w-fit" @click="openTgChat">
                  {{ $t('联系我们') }}
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

/* 核心服务：pill 触发器 hover 高亮，与参考稿圆角胶囊一致 */
.nav-services-trigger:hover,
.nav-services.group:hover .nav-services-trigger {
  color: var(--foreground);
  background-color: rgba(255, 255, 255, 0.08);
}

/* 下拉面板：左缘与触发器对齐；玻璃质感贴合本站 card */
.nav-services-panel {
  background-color: rgba(18, 18, 18, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

.nav-services-item:hover {
  color: var(--foreground);
  background-color: rgba(115, 98, 168, 0.12);
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
