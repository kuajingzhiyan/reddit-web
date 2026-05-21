<script setup lang="ts">
import QRCode from 'qrcode'

// 问卷链接：客户端用 qrcode 包生成二维码 Data URL
const QR_CODE_URL = 'https://v.wjx.cn/vm/Q8scpV1.aspx'

const qrDataUrl = ref('')
const qrError = ref(false)

const benefits = computed(() => [
  '深度品牌声誉分析',
  '竞品对比报告',
  '定制增长策略方案',
])

onMounted(async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(QR_CODE_URL, {
      width: 180,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
  }
  catch {
    qrError.value = true
  }
})
</script>

<template>
  <section id="hero-form" class="relative py-24 overflow-hidden">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card rounded-2xl p-8 lg:p-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- 左侧文案 -->
          <div class="space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {{ $t('加入我们，免费获取品牌调研报告') }}
            </h2>
            <p class="text-muted-foreground leading-relaxed">
              {{ $t('填写信息，48小时内收到专属分析报告。我们的专家团队将为您提供定制化的 Reddit 营销策略建议。') }}
            </p>
            <ul class="space-y-3">
              <li v-for="item in benefits" :key="item" class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-[#FF6B35]" />
                <span class="text-foreground">{{ $t(item) }}</span>
              </li>
            </ul>
          </div>

          <!-- 右侧二维码 -->
          <div class="flex flex-col items-center justify-center space-y-6">
            <div class="relative w-48 h-48 rounded-xl overflow-hidden bg-white p-3">
              <img
                v-if="qrDataUrl"
                :src="qrDataUrl"
                :alt="$t('扫码获取免费报告')"
                class="w-full h-full object-contain"
              >
              <div
                v-else-if="qrError"
                class="flex h-full w-full items-center justify-center text-center text-xs text-muted-foreground"
              >
                {{ $t('二维码加载失败') }}
              </div>
              <div
                v-else
                class="h-full w-full animate-pulse rounded-lg bg-muted"
              />
            </div>
            <div class="text-center space-y-2">
              <p class="text-lg font-semibold text-foreground">
                {{ $t('扫码获取免费报告') }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ $t('微信扫一扫，立即与我们取得联系') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
