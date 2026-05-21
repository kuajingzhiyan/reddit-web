<script setup lang="ts">
import { cn } from '~/utils/cn'

const { t } = useI18n()

interface CreditPackage {
  id: number
  credits: number
  price: number
  bonus: number
  label: string
  labelEn: string
  popular?: boolean
}

interface PaymentMethod {
  id: string
  name: string
  nameEn: string
  icon: string
  bonus: boolean
  bonusText?: string
}

// 套餐数据对齐 React components/ai-scanner.tsx
const creditPackages = computed((): CreditPackage[] => [
  { id: 1, credits: 500, price: 50, bonus: 0, label: t('入门包'), labelEn: 'Starter' },
  { id: 2, credits: 1500, price: 150, bonus: 200, label: t('增长包'), labelEn: 'Growth', popular: true },
  { id: 3, credits: 3000, price: 300, bonus: 300, label: t('专业包'), labelEn: 'Pro' },
  { id: 4, credits: 10000, price: 1000, bonus: 3000, label: t('企业包'), labelEn: 'Enterprise' },
])

const paymentMethods = computed((): PaymentMethod[] => [
  { id: 'wechat', name: t('微信支付'), nameEn: 'WeChat Pay', icon: 'i-lucide-smartphone', bonus: false },
  { id: 'alipay', name: t('支付宝'), nameEn: 'Alipay', icon: 'i-lucide-wallet', bonus: false },
  { id: 'crypto', name: t('虚拟货币'), nameEn: 'BTC / USDT / ETH', icon: 'i-lucide-bitcoin', bonus: true, bonusText: '+5%' },
  { id: 'card', name: t('银行卡'), nameEn: 'Bank Card', icon: 'i-lucide-credit-card', bonus: false },
])

const selectedPackageId = ref(2)
const selectedPackage = computed(() =>
  creditPackages.value.find(p => p.id === selectedPackageId.value) ?? creditPackages.value[1]!,
)

const selectedPayment = ref('crypto')

const cryptoBonus = computed(() =>
  selectedPayment.value === 'crypto' ? Math.floor(selectedPackage.value.credits * 0.05) : 0,
)

const totalCredits = computed(() =>
  selectedPackage.value.credits + selectedPackage.value.bonus + cryptoBonus.value,
)
</script>

<template>
  <!-- id 与 React AIScanner 一致，供 header「积分中心」锚点跳转 -->
  <section id="ai-scanner" class="relative py-24 bg-[#000000] overflow-hidden">
      
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7362a8]/5 rounded-full blur-[150px] pointer-events-none" />
    <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#7362a8]/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7362a8]/30 bg-[#7362a8]/5 mb-6">
          <span class="i-lucide-zap w-4 h-4 text-[#7362a8]" />
          <span class="text-sm text-[#7362a8] font-medium">{{ $t('积分生态系统') }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-4 tracking-tight">
          {{ $t('积分充值中心') }}
        </h2>
        <p class="text-lg text-zinc-400 max-w-2xl mx-auto">
          {{ $t('充值积分，为您的 Reddit 增长引擎注入动力') }}
        </p>
      </div>

      <div class="flex justify-center mb-12">
        <div class="flex flex-col md:flex-row items-center gap-3 px-6 py-3 rounded-full md:border md:border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
          <span class="hidden md:block i-lucide-sparkles w-5 h-5 text-[#7362a8]" />
          <span class="text-[#FFFFFF] font-medium">{{ $t('1 美元 = 100 SpanGrowth 积分') }}</span>
          <span class="hidden md:block text-zinc-500">|</span>
          <span class="md:hidden text-primary">||</span>

          <span class="text-[#7362a8] font-medium">{{ $t('虚拟货币 +5% 奖励') }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <button
          v-for="pkg in creditPackages"
          :key="pkg.id"
          type="button"
          :class="cn(
            // ! 覆盖全局 btn-reset，恢复卡片边框/背景/内边距
            'relative !p-6 rounded-2xl !border !border-solid backdrop-blur-sm transition-all duration-300 text-left group w-full',
            selectedPackageId === pkg.id
              ? '!border-[#7362a8] !bg-[#7362a8]/10 shadow-[0_0_30px_rgba(115,98,168,0.3)]'
              : '!border-zinc-800 !bg-zinc-950/50 hover:!border-[#7362a8]/50 hover:shadow-[0_0_15px_rgba(115,98,168,0.2)]',
          )"
          @click="selectedPackageId = pkg.id"
        >
          <div
            v-if="pkg.popular"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7362a8] text-[#FFFFFF] text-xs font-bold"
          >
            {{ $t('热门') }}
          </div>
          <div class="text-zinc-400 text-sm mb-2">{{ pkg.label }}</div>
          <div class="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-1">
            {{ pkg.credits.toLocaleString() }}
          </div>
          <div class="text-sm text-zinc-500 mb-3">{{ $t('积分') }}</div>
          <div
            v-if="pkg.bonus > 0"
            class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#7362a8]/20 text-[#7362a8] text-xs font-medium mb-3"
          >
            <span class="i-lucide-sparkles w-3 h-3" />
            +{{ pkg.bonus.toLocaleString() }} {{ $t('赠送') }}
          </div>
          <div class="text-xl font-bold text-[#FFFFFF]">${{ pkg.price }}</div>
        </button>
      </div>

      <div class="mb-12">
        <h3 class="text-lg font-semibold text-[#FFFFFF] mb-6 text-center">
          {{ $t('选择支付方式') }}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            type="button"
            :class="cn(
              // ! 覆盖全局 btn-reset，恢复卡片边框/背景/内边距
              'relative !p-6 rounded-2xl !border !border-solid backdrop-blur-sm transition-all duration-300 group w-full',
              selectedPayment === method.id
                ? '!border-[#7362a8] !bg-[#7362a8]/10 shadow-[0_0_30px_rgba(115,98,168,0.3)]'
                : '!border-zinc-800 !bg-zinc-950/50 hover:!border-[#7362a8]/50 hover:shadow-[0_0_15px_rgba(115,98,168,0.2)]',
            )"
            @click="selectedPayment = method.id"
          >
            <div
              v-if="method.bonus"
              class="absolute -top-3 right-4 px-2 py-1 rounded-full bg-[#7362a8] text-[#FFFFFF] text-xs font-bold"
            >
              {{ $t('{bonus} 奖励', { bonus: method.bonusText }) }}
            </div>
            <div class="flex flex-col items-center text-center">
              <div
                :class="cn(
                  'p-3 rounded-xl mb-3 transition-all duration-300',
                  selectedPayment === method.id
                    ? 'bg-[#7362a8]/20 shadow-[0_0_20px_rgba(115,98,168,0.4)]'
                    : 'bg-zinc-900 group-hover:shadow-[0_0_15px_rgba(115,98,168,0.3)]',
                )"
              >
                <span
                  :class="cn(
                    method.icon,
                    'w-6 h-6 transition-colors duration-300',
                    selectedPayment === method.id ? 'text-[#7362a8]' : 'text-[#FFFFFF] group-hover:text-[#7362a8]',
                  )"
                />
              </div>
              <div class="text-[#FFFFFF] font-medium text-sm">{{ method.name }}</div>
              <div class="text-zinc-500 text-xs mt-1">{{ method.nameEn }}</div>
            </div>
          </button>
        </div>
      </div>

      <div class="max-w-xl mx-auto">
        <div class="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
            <span class="text-zinc-400">{{ $t('套餐') }}</span>
            <span class="text-[#FFFFFF] font-medium">{{ selectedPackage.label }} - {{ selectedPackage.credits.toLocaleString() }} {{ $t('积分') }}</span>
          </div>
          <div
            v-if="selectedPackage.bonus > 0"
            class="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800"
          >
            <span class="text-zinc-400">{{ $t('套餐赠送') }}</span>
            <span class="text-[#7362a8] font-medium">+{{ selectedPackage.bonus.toLocaleString() }} {{ $t('积分') }}</span>
          </div>
          <div
            v-if="cryptoBonus > 0"
            class="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800"
          >
            <span class="text-zinc-400">{{ $t('虚拟货币奖励 (5%)') }}</span>
            <span class="text-[#7362a8] font-medium">+{{ cryptoBonus.toLocaleString() }} {{ $t('积分') }}</span>
          </div>
          <div class="flex justify-between items-center mb-6">
            <span class="text-[#FFFFFF] font-semibold text-lg">{{ $t('总计') }}</span>
            <div class="text-right">
              <div class="text-2xl font-bold text-[#FFFFFF]">{{ totalCredits.toLocaleString() }} {{ $t('积分') }}</div>
              <div class="text-[#7362a8] font-medium">${{ selectedPackage.price }} {{ $t('美元') }}</div>
            </div>
          </div>

          <button
            type="button"
            class="relative !w-full !py-4 !px-8 rounded-xl !bg-[#7362a8] text-[#FFFFFF] font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(115,98,168,0.6)] group overflow-hidden"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              {{ $t('立即充值') }}
              <span class="i-lucide-arrow-right w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
