<script setup lang="ts">
const { t } = useI18n()

/** 客户案例卡片：i18n key 不含「案例_」前缀，保留后缀语义（标签_/分类_/指标_ 等） */
interface CaseStudyStat {
  value: string
  labelKey: string
}

interface CaseStudy {
  id: string
  featured?: boolean
  icon: string
  titleKey: string
  descriptionKey: string
  categoryKeys: [string, string, string]
  stats: [CaseStudyStat, CaseStudyStat, CaseStudyStat]
  tagKeys: string[]
  moreCount?: number
}

const caseStudies: CaseStudy[] = [
  {
    id: 'google-competitor',
    featured: true,
    icon: 'i-lucide-trophy',
    titleKey: '三周内谷歌超越竞品_标题',
    descriptionKey: '三周内谷歌超越竞品_描述',
    categoryKeys: ['分类_B2B软件', '分类_SMB', '分类_3周'],
    stats: [
      { value: '#1', labelKey: '指标_Google排名' },
      { value: 'Hot Page', labelKey: '指标_Reddit表现' },
      { value: '3 weeks', labelKey: '指标_成功耗时' },
    ],
    tagKeys: ['标签_SEO', '标签_资产管理', '标签_竞品分析', '标签_Google排名'],
    moreCount: 1,
  },
  {
    id: 'cleaning-orders',
    featured: true,
    icon: 'i-lucide-shopping-cart',
    titleKey: '单帖34K订单_标题',
    descriptionKey: '单帖34K订单_描述',
    categoryKeys: ['分类_家庭服务', '分类_初创', '分类_2周'],
    stats: [
      { value: '$34,000', labelKey: '指标_总营收' },
      { value: '137', labelKey: '指标_独立订单' },
      { value: '$251', labelKey: '指标_平均订单额' },
    ],
    tagKeys: ['标签_Reddit营销', '标签_本地SEO', '标签_AI优化', '标签_ChatGPT'],
    moreCount: 2,
  },
  {
    id: 'skincare-keywords',
    featured: true,
    icon: 'i-lucide-search',
    titleKey: '317护肤关键词_标题',
    descriptionKey: '317护肤关键词_描述',
    categoryKeys: ['分类_美妆护肤', '分类_SMB', '分类_6周'],
    stats: [
      { value: '317', labelKey: '指标_关键词排名' },
      { value: '25,000+', labelKey: '指标_月搜索量' },
      { value: '15+', labelKey: '指标_投放帖子数' },
    ],
    tagKeys: ['标签_护肤', '标签_国际化扩张', '标签_RedditSEO', '标签_AI优化'],
    moreCount: 3,
  },
  {
    id: 'product-hunt',
    icon: 'i-lucide-rocket',
    titleKey: 'ProductHunt28到2_标题',
    descriptionKey: 'ProductHunt28到2_描述',
    categoryKeys: ['分类_浏览器扩展', '分类_初创', '分类_1天'],
    stats: [
      { value: '#2', labelKey: '指标_最终排名' },
      { value: '1,000+', labelKey: '指标_总点赞' },
      { value: '160+', labelKey: '指标_评论数' },
    ],
    tagKeys: ['标签_ProductHunt', '标签_Chrome扩展', '标签_发布策略', '标签_社区营销'],
  },
  {
    id: 'web3-views',
    icon: 'i-lucide-trending-up',
    titleKey: '280万Web3浏览_标题',
    descriptionKey: '280万Web3浏览_描述',
    categoryKeys: ['分类_Web3', '分类_SMB', '分类_3个月'],
    stats: [
      { value: '2.8M+', labelKey: '指标_Reddit总浏览' },
      { value: '6,700+', labelKey: '指标_发起对话' },
      { value: '-84%', labelKey: '指标_下架减少' },
    ],
    tagKeys: ['标签_Reddit', '标签_Web3', '标签_内容分发', '标签_加密营销'],
    moreCount: 1,
  },
  {
    id: 'kickstarter',
    icon: 'i-lucide-target',
    titleKey: 'Kickstarter110万浏览_标题',
    descriptionKey: 'Kickstarter110万浏览_描述',
    categoryKeys: ['分类_零售制造', '分类_初创', '分类_1个月'],
    stats: [
      { value: '1.1M+', labelKey: '指标_Reddit总浏览' },
      { value: '3,100+', labelKey: '指标_发起对话' },
      { value: '#10', labelKey: '指标_平均帖子位置' },
    ],
    tagKeys: ['标签_Kickstarter', '标签_Reddit', '标签_众筹', '标签_零售'],
    moreCount: 2,
  },
  {
    id: 'gaming-trust',
    icon: 'i-lucide-gamepad-2',
    titleKey: '游戏社区信任_标题',
    descriptionKey: '游戏社区信任_描述',
    categoryKeys: ['分类_移动游戏', '分类_SMB', '分类_5周'],
    stats: [
      { value: '52.8K+', labelKey: '指标_Reddit总浏览' },
      { value: '171+', labelKey: '指标_发起对话' },
      { value: '#1', labelKey: '指标_平均帖子位置' },
    ],
    tagKeys: ['标签_游戏', '标签_移动应用', '标签_Reddit', '标签_品牌认知'],
    moreCount: 1,
  },
  {
    id: 'hair-brand',
    icon: 'i-lucide-heart-handshake',
    titleKey: '163K品牌权威_标题',
    descriptionKey: '163K品牌权威_描述',
    categoryKeys: ['分类_健康美容', '分类_SMB', '分类_3个月'],
    stats: [
      { value: '163K+', labelKey: '指标_Reddit总浏览' },
      { value: '811+', labelKey: '指标_发起对话' },
      { value: '#1', labelKey: '指标_平均帖子位置' },
    ],
    tagKeys: ['标签_护发', '标签_品牌认知', '标签_Reddit', '标签_健康美容'],
    moreCount: 1,
  },
]

useSeoMeta({
  title: () => `${t('客户案例')} | SpanGrowth`,
  description: () => t('客户案例页描述'),
})
</script>

<template>
  <section class="section-wrapper">
    <div class="section-container">
      <div class="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {{ $t('客户案例') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {{ $t('客户案例页描述') }}
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
        <article
          v-for="study in caseStudies"
          :key="study.id"
          class="case-card glass-card flex flex-col rounded-2xl border border-border p-6 sm:p-7 lg:p-8"
        >
          <div class="mb-4">
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0 flex-1">
                <div
                  v-if="study.featured"
                  class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                >
                  <span class="i-lucide-star size-3.5 fill-primary text-primary" aria-hidden="true" />
                  {{ $t('精选案例') }}
                </div>
                <h2 class="text-xl font-bold leading-snug text-foreground sm:text-[1.35rem]">
                  {{ $t(study.titleKey) }}
                </h2>
              </div>
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10"
                aria-hidden="true"
              >
                <span :class="[study.icon, 'size-5 text-primary']" />
              </div>
            </div>
          </div>

          <p class="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {{ $t(study.descriptionKey) }}
          </p>

          <div class="mb-6 flex flex-wrap gap-2">
            <span
              v-for="cat in study.categoryKeys"
              :key="cat"
              class="case-category-pill rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {{ $t(cat) }}
            </span>
          </div>

          <div class="mb-6 grid grid-cols-3 gap-3 border-y border-border py-5">
            <div
              v-for="stat in study.stats"
              :key="stat.labelKey"
              class="text-center sm:text-left"
            >
              <div class="text-lg font-bold leading-tight text-primary sm:text-xl">
                {{ stat.value }}
              </div>
              <div class="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                {{ $t(stat.labelKey) }}
              </div>
            </div>
          </div>

          <div class="mt-auto flex flex-wrap gap-2">
            <span
              v-for="tag in study.tagKeys"
              :key="tag"
              class="case-tag-pill rounded-full px-3 py-1 text-xs font-medium"
            >
              {{ $t(tag) }}
            </span>
            <!-- <span
              v-if="study.moreCount"
              class="case-more-pill rounded-full px-3 py-1 text-xs font-medium"
            >
              {{ $t('更多标签', { count: study.moreCount }) }}
            </span> -->
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 卡片 hover：与 about 页 approach-card 一致的 primary 高亮 */
.case-card {
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease,
    background-color 0.25s ease;
}

.case-card:hover {
  border-color: rgba(115, 98, 168, 0.45);
  background-color: rgba(115, 98, 168, 0.08);
  box-shadow: 0 12px 40px rgba(115, 98, 168, 0.28);
  transform: translateY(-2px);
}

.case-category-pill {
  border-color: var(--border);
  background-color: rgba(255, 255, 255, 0.06);
}

.case-tag-pill {
  color: #9b8ac7;
  background-color: rgba(115, 98, 168, 0.18);
}

.case-more-pill {
  color: var(--muted-foreground);
  background-color: rgba(115, 98, 168, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .case-card {
    transition-duration: 0.01ms;
  }

  .case-card:hover {
    transform: none;
  }
}
</style>
