<script setup lang="ts">
import { cn } from '~/utils/cn'

const { t } = useI18n()

const trustBadges = [
  { icon: 'i-lucide-shield', label: '100% Ban-Safe' },
  { icon: 'i-lucide-users', label: 'Real UGC Engine' },
  { icon: 'i-lucide-trending-up', label: 'Data-driven ROI' },
]

const budgetOptions = computed(() => [
  t('请选择月度预算'),
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
])

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  website: '',
  budget: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

async function handleSubmit(e: Event) {
  e.preventDefault()
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isSubmitting.value = false
  isSubmitted.value = true
}
</script>

<template>
  <section class="relative min-h-screen pt-24 lg:pt-32 pb-16 overflow-hidden">
    <LandingHeroStarCanvas />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- 左侧内容 -->
        <div class="space-y-8">
          <div class="space-y-6">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
              {{ $t('高精准受众定位，用原生创意与') }}
              <span class="text-gradient">{{ $t('AI 矩阵') }}</span>
              {{ $t('引爆 Reddit 流量') }}
            </h1>
            <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
              {{ $t('突破传统广告壁垒。依托活跃老号矩阵与全景数据监控，为您提供安全、高转化的定制方案。') }}
            </p>
          </div>

          <!-- 信任徽章 -->
          <div class="flex flex-wrap gap-4">
            <div
              v-for="(badge, index) in trustBadges"
              :key="badge.label"
              :class="cn(
                'flex items-center gap-2 px-4 py-2 rounded-full',
                'glass-card',
                'animate-blur-in',
              )"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <span :class="[badge.icon, 'w-4 h-4 text-primary']" />
              <span class="text-sm font-medium text-foreground">{{ badge.label }}</span>
            </div>
          </div>

          <!-- 数据统计 -->
          <div class="grid grid-cols-3 gap-6 pt-4">
            <div class="space-y-1">
              <div class="text-3xl font-bold text-gradient">300%</div>
              <div class="text-sm text-muted-foreground">{{ $t('平均流量增长') }}</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-bold text-gradient">500+</div>
              <div class="text-sm text-muted-foreground">{{ $t('活跃账号矩阵') }}</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-bold text-gradient">0</div>
              <div class="text-sm text-muted-foreground">{{ $t('封号率') }}</div>
            </div>
          </div>
        </div>

        <!-- 右侧表单 -->
        <div id="hero-form" class="relative">
          <div class="glass-card rounded-2xl p-8 space-y-6">
            <div class="space-y-2 text-center">
              <h2 class="text-xl font-bold tracking-tight text-foreground">
                {{ $t('加入我们，免费获取品牌调研报告') }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ $t('填写信息，48小时内收到专属分析报告') }}
              </p>
            </div>

            <div v-if="isSubmitted" class="py-12 text-center space-y-4">
              <div class="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <span class="i-lucide-trending-up w-8 h-8 text-primary" />
              </div>
              <h3 class="text-lg font-semibold text-foreground">{{ $t('提交成功！') }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ $t('我们的团队将在 48 小时内与您联系，敬请期待您的专属报告。') }}
              </p>
            </div>

            <form v-else class="space-y-4" @submit="handleSubmit">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="firstName" class="text-sm font-medium text-foreground">{{ $t('名') }}</label>
                  <input id="firstName" v-model="formData.firstName" type="text" required class="input-field" placeholder="John">
                </div>
                <div class="space-y-2">
                  <label for="lastName" class="text-sm font-medium text-foreground">{{ $t('姓') }}</label>
                  <input id="lastName" v-model="formData.lastName" type="text" required class="input-field" placeholder="Doe">
                </div>
              </div>

              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-foreground">Business Email</label>
                <input id="email" v-model="formData.email" type="email" required class="input-field" placeholder="john@company.com">
              </div>

              <div class="space-y-2">
                <label for="website" class="text-sm font-medium text-foreground">Website URL</label>
                <input id="website" v-model="formData.website" type="url" required class="input-field" placeholder="https://yourbrand.com">
              </div>

              <div class="space-y-2">
                <label for="budget" class="text-sm font-medium text-foreground">{{ $t('月度预算') }}</label>
                <RtSelect
                  id="budget"
                  v-model="formData.budget"
                  :options="budgetOptions.map(option => ({ value: option, label: option }))"
                  :placeholder="$t('请选择月度预算')"
                  required
                />
              </div>

              <div class="space-y-2">
                <label for="message" class="text-sm font-medium text-foreground">{{ $t('核心诉求') }}</label>
                <textarea id="message" v-model="formData.message" rows="3" class="input-field resize-none" :placeholder="$t('描述您的营销目标和预期效果...')" />
              </div>

              <ButtonsButtonTypeB type="submit" class="w-full">
                {{ isSubmitting ? $t('提交中...') : $t('立即获取免费报告') }}
              </ButtonsButtonTypeB>

              <p class="text-xs text-center text-muted-foreground">
                {{ $t('提交即表示您同意我们的服务条款和隐私政策') }}
              </p>
            </form>
          </div>

          <!-- 装饰元素 -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  </section>
</template>
