<script setup lang="ts">
import { cn } from '~/utils/cn'

const { t } = useI18n()

// 营销方法卡片：从 React 项目 reddit-marketing-section.tsx 迁移
const marketingMethods = computed(() => [
  {
    icon: 'i-lucide-search',
    title: t('Reddit SEO：谷歌排名靠前'),
    description: t('专注于真正的讨论，而不是推广。回答问题，分享见解，并将你的品牌自然地融入到合适的讨论中。这有助于在Reddit上建立信任、提升用户参与度和长期知名度。'),
  },
  {
    icon: 'i-lucide-shield',
    title: t('Reddit品牌声誉管理'),
    description: t('追踪品牌讨论情况，并在必要时做出回应。支持积极讨论，解决疑虑，引导对话，以维护强大而平衡的品牌形象。'),
  },
  {
    icon: 'i-lucide-users',
    title: t('Reddit潜在客户开发'),
    description: t('锁定用户正在积极寻找解决方案的帖子。这些讨论能带来最有价值的流量，因为用户已经有了明确的意图，这使得在 Reddit 上进行推广更加有效。'),
  },
  {
    icon: 'i-lucide-eye',
    title: t('Reddit AEO 和搜索可见性'),
    description: t('利用 Reddit 来塑造您的品牌在搜索结果和 AI 答案中的呈现方式。持续提及和结构化的内容能够提升您在 Google 和 AI 驱动型平台上的曝光度。'),
  },
])

// 全周期策略手风琴数据
const strategies = computed(() => [
  {
    id: 1,
    title: t('深层社区洞察与同理心分析'),
    content: t('深入 Subreddits 之外，分析用户的底层动机和独特行话。使用语义分析工具捕捉未满足的需求和潜在的情感爆点，而不仅仅是识别 Subreddits。'),
  },
  {
    id: 2,
    title: t('构建无品牌的社区资产'),
    content: t('创建和维护一个不直接宣传品牌但解决社区痛点的 Wiki、独立讨论 Subreddit 或 Wiki 资源。建立一个纯粹的、无商业味道的服务性形象。'),
  },
  {
    id: 3,
    title: t('培育内部品牌大使'),
    content: t('通过自然互动识别并建立与现有高声望用户的关系。为他们提供独家信息或资源，让真正的社区领袖成为品牌声音，而非「代表」。'),
  },
  {
    id: 4,
    title: t('共创与社区反馈循环'),
    content: t('将新产品或功能作为「内部测试版」提交给特定 Subreddit 进行早期反馈。让社区参与品牌决策，而非仅仅是营销受众。'),
  },
  {
    id: 5,
    title: t('跨平台放大与危机先导管理'),
    content: t('策略性地将 Reddit 上的积极讨论放大到其他平台。建立一个由社区驱动的早期危机警告系统，让品牌大使在负面情绪爆发前介入。'),
  },
])

const openId = ref<number | null>(1)

function toggleStrategy(id: number) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 如何利用 Reddit 进行营销 -->
      <div class="mb-24">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {{ $t('如何利用 Reddit 进行营销') }}
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div v-for="method in marketingMethods" :key="method.title" class="space-y-4">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span :class="[method.icon, 'w-8 h-8 text-primary']" />
            </div>
            <h3 class="text-xl font-bold text-foreground">
              {{ method.title }}
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ method.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-24" />

      <!-- Reddit 社区品牌化全周期策略 -->
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {{ $t('Reddit 社区品牌化全周期策略') }}
          </h2>
          <p class="text-sm text-muted-foreground/70 mb-2">
            {{ $t('全周期社区品牌化策略') }}
          </p>
          <p class="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {{ $t('有效的 Reddit 品牌战略不再依赖零散的提及或发帖，而是通过从被动洞察到主动合作的演变，重点在于培育品牌大使和构建长期社区信任。目标是打造一个与社区共生的品牌形象。') }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="strategy in strategies"
            :key="strategy.id"
            class="glass-card rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors"
              @click="toggleStrategy(strategy.id)"
            >
              <span class="text-xl font-bold text-foreground">
                {{ strategy.id }}. {{ strategy.title }}
              </span>
              <div
                :class="cn(
                  'w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-transform duration-300',
                  openId === strategy.id && 'rotate-180',
                )"
              >
                <span class="i-lucide-chevron-down w-5 h-5 text-muted-foreground" />
              </div>
            </button>
            <div
              :class="cn(
                'overflow-hidden transition-all duration-300',
                openId === strategy.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
              )"
            >
              <p class="px-6 pb-6 text-muted-foreground leading-relaxed">
                {{ strategy.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
