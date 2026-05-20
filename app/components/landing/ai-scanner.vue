<script setup lang="ts">
import { cn } from '~/utils/cn'

const { t } = useI18n()

// 演示用扫描结果：面向用户的中文标题与标签走 i18n
const mockResults = computed(() => ({
  subreddits: [
    { name: 'r/entrepreneur', relevance: 95 },
    { name: 'r/startups', relevance: 88 },
    { name: 'r/smallbusiness', relevance: 82 },
    { name: 'r/marketing', relevance: 79 },
    { name: 'r/SaaS', relevance: 75 },
  ],
  titles: [
    t('从 0 到月入 10 万：我是如何用这个工具改变营销策略的'),
    t('为什么 90% 的创业者都在用错方法做 Reddit 营销'),
    t('分享：我们如何在 30 天内获得 5000 名精准用户'),
  ],
  tags: [t('#品牌出海'), t('#增长黑客'), t('#Reddit营销'), t('#内容营销'), t('#SEO优化')],
}))

const url = ref('')
const isScanning = ref(false)
const showResults = ref(false)
const scanProgress = ref(0)

async function handleScan() {
  if (!url.value)
    return
  isScanning.value = true
  showResults.value = false
  scanProgress.value = 0

  // 模拟扫描进度
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 200))
    scanProgress.value = i
  }

  isScanning.value = false
  showResults.value = true
}
</script>

<template>
  <section id="ai-scanner" class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
    </div>

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
          <span class="i-lucide-zap w-4 h-4 text-primary" />
          <span class="text-muted-foreground">Powered by Claude + Gemini + Grammarly</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
          {{ $t('AI 品牌社群与内容生成扫描仪') }}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('输入您的品牌网址，AI 将自动分析最佳推广策略') }}
        </p>
      </div>

      <!-- Scanner Input -->
      <div class="glass-card rounded-2xl p-8 space-y-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1 relative">
            <input
              v-model="url"
              type="url"
              :placeholder="$t('输入您的品牌网址 (e.g., https://yourbrand.com)')"
              class="input-field"
            >
            <div
              v-if="isScanning"
              class="absolute bottom-0 left-0 h-1 bg-primary/20 w-full rounded-b-xl overflow-hidden"
            >
              <div
                class="h-full bg-primary transition-all duration-200"
                :style="{ width: `${scanProgress}%` }"
              />
            </div>
          </div>
          <ButtonsButtonTypeC
            :is-loading="isScanning"
            class="sm:w-auto w-full"
            @click="handleScan"
          />
        </div>

        <!-- Results -->
        <div v-if="showResults" class="space-y-6 animate-blur-in">
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Subreddits -->
            <div class="glass-card rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-2 text-primary">
                <span class="i-lucide-target w-5 h-5" />
                <h3 class="font-semibold">
                  {{ $t('推荐精准 Subreddits') }}
                </h3>
              </div>
              <ul class="space-y-3">
                <li
                  v-for="sub in mockResults.subreddits"
                  :key="sub.name"
                  class="flex items-center justify-between"
                >
                  <span class="text-sm text-foreground">{{ sub.name }}</span>
                  <span class="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {{ sub.relevance }}%
                  </span>
                </li>
              </ul>
            </div>

            <!-- Titles -->
            <div class="glass-card rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-2 text-primary">
                <span class="i-lucide-sparkles w-5 h-5" />
                <h3 class="font-semibold">
                  {{ $t('AI 生成爆款标题') }}
                </h3>
              </div>
              <ul class="space-y-3">
                <li
                  v-for="(title, i) in mockResults.titles"
                  :key="i"
                  class="text-sm text-foreground leading-relaxed"
                >
                  {{ title }}
                </li>
              </ul>
            </div>

            <!-- Tags -->
            <div class="glass-card rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-2 text-primary">
                <span class="i-lucide-tag w-5 h-5" />
                <h3 class="font-semibold">
                  {{ $t('最佳匹配标签') }}
                </h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in mockResults.tags"
                  :key="tag"
                  :class="cn(
                    'text-sm px-3 py-1.5 rounded-full',
                    'bg-primary/10 text-primary',
                    'hover:bg-primary/20 transition-colors duration-200 cursor-pointer',
                  )"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div class="text-center pt-4">
            <p class="text-sm text-muted-foreground">
              {{ $t('想获取完整分析报告？') }}
              <a href="#hero-form" class="text-primary hover:underline">
                {{ $t('免费申请深度调研') }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
