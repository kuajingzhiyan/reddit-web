<script setup lang="ts">
import { marked } from 'marked'
import { getBlogPost } from '~/utils/blog-posts'

const route = useRoute()
const { t } = useI18n()

/** catch-all 路由参数归一化为 slug 字符串 */
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param ?? '')
})

const post = computed(() => {
  const found = getBlogPost(slug.value)
  if (!found) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Blog post not found',
    })
  }
  return found
})

/** Markdown 正文转 HTML */
const htmlContent = computed(() => marked.parse(post.value.body, { gfm: true }) as string)

useSeoMeta({
  title: () => `${post.value.title} | SpanGrowth`,
  description: () => t('博客页描述'),
})
</script>

<template>
  <div>
    <!-- 文章 Banner：标题 + 日期 -->
    <section class="section-wrapper pb-0 lg:pb-0">
      <div class="section-container">
        <div
          class="mx-auto flex min-h-48 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7362a8] to-[#9b8ac7] px-6 py-10 sm:min-h-56 lg:min-h-60">
          <div class="flex max-w-4xl flex-col items-center gap-4 text-center">
            <h1 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              <!-- 深度揭秘：为何顶尖品牌都在抢占 Reddit？ -->
               {{ post.title }}
            </h1>
            <div class="mt-2 rounded-full border border-white px-4 py-2 text-sm text-white">
              <time>{{ post.date }}</time>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Markdown 正文 -->
    <section class="section-wrapper pt-10 pb-16">
      <div class="section-container">
        <article
          class="blog-prose mx-auto max-w-7xl rounded-2xl border border-border bg-card/40 p-6 sm:p-10"
          v-html="htmlContent"
         />
          <!-- <div>
            <h2>我们的社区增长方法论</h2>
            <p>在数字化营销的版图中，Reddit 是一片尚未被完全驯服的沃土。不同于传统社交媒体的即时性，Reddit 依靠深度内容和高粘性社群，正成为品牌获取高质量自然流量的关键地带。作为深耕此领域的营销团队，我们认为 Reddit 营销已从单纯的「发帖」进化为一场由技术驱动的精密战争。</p>
            <h2>一、为什么 Reddit 是品牌增长的「必争之地」？</h2>
            <p>Reddit 的核心优势在于其精准的社区转化漏斗（The Community Funnel）。在这里，用户不是在浏览碎片化信息，而是在寻找信任、共鸣与解决方案。</p>
            <ul>
              <li>高粘性与真实感：社区用户对于 KOC（关键意见消费者）和 UGC（用户原创内容）的信赖程度远高于硬广。</li>
              <li>长尾流量效应：优质内容在社区中具有极长的生命周期，配合 SEO 优化与 GEO（生成式引擎优化）技术，能够实现精准流量的长期沉淀。</li>
            </ul>
            <h2>二、我们的技术驱动增长体系</h2>
            <h3>1. 压倒性的账号与资源矩阵</h3>
            <p>成功的社区运营离不开厚实的资源储备。我们的矩阵包含：</p>
            <ul>
              <li>账号储备：超过 5,000 个高质量账号储备，确保运营的广度与维度。</li>
              <li>多维度覆盖：通过 SEO 与 GEO 双引擎，实现对目标搜索流量的全覆盖。</li>
            </ul>
            <h3>2. 「真诚」的人设打造与社区沟通</h3>
            <p>在 Reddit，违和感是品牌最大的敌人。我们的核心运营策略之一是「融入而非入侵」：</p>
            <ul>
              <li>精准场景植入：我们不仅是在发布广告，更是在参与讨论。例如，在针对 RayNeo Air 4 Pro 的推广中，我们通过模拟真实用户的疑问（如「Is Air 4 Pro the best screen on the market?」），在相关垂直社群中引发关于画质、HDR10 技术及音频体验的深度讨论。</li>
              <li>去商业化叙事：我们的内容策略强调个人体验与客观评价，而非推销语言。通过在不同社区（如 r/RayNeo、r/Xreal、r/BangandOlufsen 等）发起差异化的话题测试，精准捕捉高意向用户。</li>
            </ul>
            <h3>3. 实时监控与风险控制</h3>
            <p>Reddit 的社区环境复杂，竞品干扰与删除风险时刻存在。我们的运营流程中包含了严密的风险评估：</p>
            <ul>
              <li>流量劫持防范：识别竞品的恶意 hijacking 行为，利用负面 Karma 模式和用户行为规律进行实时监测。</li>
              <li>SLA 承诺：我们为客户提供清晰的合作模式与 SLA（服务等级协议）承诺，确保营销效果可衡量、风险可控。</li>
            </ul>
            <h2>三、结语</h2>
            <p>Reddit 营销是一场关于「洞察」的比赛。通过将技术与人性化运营深度结合，我们帮助众多大厂成功打破了出海营销的壁垒。如果您的品牌正寻求从 Reddit 中挖掘高质量的长尾增长，我们成熟的运营体系将是您最坚实的引擎。</p>
            <p>如果您对我们的 Reddit 运营方案感兴趣，欢迎联系我们，共同探讨如何为您的品牌打造定制化的社区增长策略。</p>
          </div>   -->
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 博客正文排版：配合 marked 输出的 HTML 标签 */
.blog-prose :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--foreground);
}

.blog-prose :deep(h2:first-child) {
  margin-top: 0;
}

.blog-prose :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--foreground);
}

.blog-prose :deep(p) {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: var(--muted-foreground);
}

.blog-prose :deep(ul) {
  margin-bottom: 1.25rem;
  padding-left: 1.25rem;
  list-style: disc;
}

.blog-prose :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.75;
  color: var(--muted-foreground);
}

.blog-prose :deep(strong) {
  font-weight: 600;
  color: var(--foreground);
}
</style>
