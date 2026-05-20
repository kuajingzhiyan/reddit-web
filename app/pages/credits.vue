<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('积分生态系统 | SpanGrowth'),
  description: 'Top up your credits to fuel your Reddit Growth Engine.',
})

const creditPackages = computed(() => [
  { id: 'starter', name: t('入门包'), nameEn: 'Starter', credits: 5000, price: 50, icon: 'i-lucide-zap', popular: false, bonus: 0, description: t('适合初次体验') },
  { id: 'growth', name: t('成长包'), nameEn: 'Growth', credits: 20000, price: 180, icon: 'i-lucide-trending-up', popular: true, bonus: 2000, description: t('最受欢迎选择') },
  { id: 'pro', name: t('专业包'), nameEn: 'Professional', credits: 50000, price: 400, icon: 'i-lucide-crown', popular: false, bonus: 7500, description: t('高频使用推荐') },
  { id: 'enterprise', name: t('企业包'), nameEn: 'Enterprise', credits: 150000, price: 1000, icon: 'i-lucide-rocket', popular: false, bonus: 30000, description: t('大规模营销首选') },
])

const paymentMethods = computed(() => [
  { id: 'wechat', name: t('微信支付'), nameEn: 'WeChat Pay', icon: 'i-lucide-wallet', gradient: 'from-green-500 via-emerald-400 to-violet-500', bgGlow: 'bg-green-500/20' },
  { id: 'alipay', name: t('支付宝'), nameEn: 'Alipay', icon: 'i-lucide-credit-card', gradient: 'from-blue-500 via-cyan-400 to-violet-500', bgGlow: 'bg-blue-500/20' },
  { id: 'crypto', name: t('虚拟货币'), nameEn: 'Crypto', icon: 'i-lucide-bitcoin', gradient: 'from-orange-500 via-amber-400 to-violet-500', bgGlow: 'bg-violet-500/20', bonus: true },
  { id: 'bank', name: t('银行卡'), nameEn: 'Bank Card', icon: 'i-lucide-building-2', gradient: 'from-slate-400 via-gray-300 to-violet-400', bgGlow: 'bg-slate-500/20' },
])

const selectedPackage = ref<string | null>('growth')
const selectedPayment = ref<string | null>(null)
const currentBalance = 0

const selectedPkg = computed(() => creditPackages.find(p => p.id === selectedPackage.value))
const selectedPay = computed(() => paymentMethods.find(p => p.id === selectedPayment.value))
const baseCredits = computed(() => selectedPkg.value?.credits ?? 0)
const packageBonus = computed(() => selectedPkg.value?.bonus ?? 0)
const cryptoBonus = computed(() =>
  selectedPayment.value === 'crypto' ? Math.floor(baseCredits.value * 0.05) : 0,
)
const totalCredits = computed(() => baseCredits.value + packageBonus.value + cryptoBonus.value)
</script>

<template>
  <div class="min-h-screen bg-background text-foreground text-left">
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[150px]" />
      <div class="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-violet-600/3 rounded-full blur-[120px]" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-8">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
        <span class="i-lucide-arrow-left w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{{ $t('返回首页') }}</span>
      </NuxtLink>

      <header class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
          <span class="i-lucide-sparkles w-4 h-4 text-violet-400" />
          <span class="text-sm text-violet-300">Credit Ecosystem</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {{ $t('积分生态系统') }}
        </h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Top up your credits to fuel your Reddit Growth Engine.
        </p>
      </header>

      <div class="mb-12">
        <div class="relative max-w-md mx-auto">
          <div class="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 rounded-2xl blur-lg opacity-50 animate-pulse" />
          <div class="relative glass-card rounded-2xl p-8 border border-violet-500/30">
            <div class="flex items-center justify-between mb-4">
              <span class="text-muted-foreground">{{ $t('当前余额') }}</span>
              <span class="text-xs text-violet-400 uppercase tracking-wider">Current Balance</span>
            </div>
            <div class="flex items-baseline gap-3 justify-center">
              <span class="text-5xl font-bold text-gradient">{{ currentBalance.toLocaleString() }}</span>
              <span class="text-xl text-muted-foreground">Credits</span>
            </div>
            <div class="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <span class="i-lucide-gift w-4 h-4 text-violet-400" />
              <span>{{ $t('充值即享额外赠送积分') }}</span>
            </div>
          </div>
        </div>
      </div>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-foreground mb-6 text-center">
          {{ $t('选择充值套餐') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="pkg in creditPackages"
            :key="pkg.id"
            role="button"
            tabindex="0"
            class="relative group text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer"
            :class="selectedPackage === pkg.id ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'border-border bg-card hover:border-violet-500/50 hover:bg-violet-500/5'"
            @click="selectedPackage = pkg.id"
            @keydown.enter="selectedPackage = pkg.id"
          >
            <div v-if="pkg.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 rounded-full text-xs font-medium text-white">
              {{ $t('最受欢迎') }}
            </div>
            <div v-if="selectedPackage === pkg.id" class="absolute top-4 right-4 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
              <span class="i-lucide-check w-4 h-4 text-white" />
            </div>
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" :class="selectedPackage === pkg.id ? 'bg-violet-500/20' : 'bg-muted'">
              <span :class="[pkg.icon, 'w-6 h-6', selectedPackage === pkg.id ? 'text-violet-400' : 'text-muted-foreground']" />
            </div>
            <div class="mb-2">
              <h3 class="text-lg font-semibold text-foreground">{{ pkg.name }}</h3>
              <p class="text-xs text-muted-foreground">{{ pkg.nameEn }}</p>
            </div>
            <div class="mb-3">
              <span class="text-3xl font-bold text-foreground">{{ pkg.credits.toLocaleString() }}</span>
              <span class="text-muted-foreground ml-1">{{ $t('积分') }}</span>
            </div>
            <div v-if="pkg.bonus > 0" class="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/20 rounded text-xs text-violet-300 mb-3">
              <span class="i-lucide-gift w-3 h-3" />
              <span>{{ $t('+{bonus} 赠送', { bonus: pkg.bonus.toLocaleString() }) }}</span>
            </div>
            <div class="mt-auto pt-3 border-t border-border">
              <span class="text-2xl font-bold text-foreground">${{ pkg.price }}</span>
              <span class="text-sm text-muted-foreground ml-1">USD</span>
            </div>
            <p class="text-xs text-muted-foreground mt-2">{{ pkg.description }}</p>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-foreground mb-6 text-center">
          {{ $t('选择支付方式') }}
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            role="button"
            tabindex="0"
            class="relative group flex flex-col items-center p-6 rounded-xl border transition-all duration-300 min-w-[140px] cursor-pointer"
            :class="selectedPayment === method.id ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'border-border bg-card hover:border-violet-500/50 hover:bg-violet-500/5'"
            @click="selectedPayment = method.id"
            @keydown.enter="selectedPayment = method.id"
          >
            <div v-if="method.bonus" class="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full text-[10px] font-medium text-white">
              +5%
            </div>
            <div class="relative w-14 h-14 rounded-xl flex items-center justify-center mb-3 overflow-hidden" :class="selectedPayment === method.id ? method.bgGlow : 'bg-muted'">
              <div class="absolute inset-0 bg-gradient-to-br transition-opacity" :class="[method.gradient, selectedPayment === method.id ? 'opacity-30' : 'opacity-0 group-hover:opacity-20']" />
              <span :class="[method.icon, 'w-7 h-7 relative z-10 transition-colors', selectedPayment === method.id ? 'text-violet-300' : 'text-muted-foreground group-hover:text-foreground']" />
            </div>
            <span class="text-sm font-medium text-foreground">{{ method.name }}</span>
            <span class="text-xs text-muted-foreground">{{ method.nameEn }}</span>
            <div v-if="selectedPayment === method.id" class="absolute inset-0 rounded-xl border-2 border-violet-500 pointer-events-none" />
          </div>
        </div>
        <div class="mt-6 text-center">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card flex-wrap justify-center">
            <span class="text-sm text-muted-foreground">{{ $t('汇率:') }}</span>
            <span class="text-sm font-medium text-foreground">1 USD = 100 SpanGrowth Credits</span>
            <span class="text-violet-400">•</span>
            <span class="text-sm text-violet-400">{{ $t('虚拟货币支付额外 +5% 奖励') }}</span>
          </div>
        </div>
      </section>

      <section class="max-w-lg mx-auto">
        <div class="relative">
          <div class="absolute -inset-2 bg-violet-500/20 rounded-2xl blur-xl opacity-50" />
          <div class="relative glass-card rounded-2xl p-8 border border-violet-500/30">
            <h3 class="text-lg font-semibold text-foreground mb-6">{{ $t('订单摘要') }}</h3>
            <template v-if="selectedPkg">
              <div class="space-y-4">
                <div class="flex justify-between items-center py-3 border-b border-border">
                  <span class="text-muted-foreground">{{ $t('套餐') }}</span>
                  <span class="font-medium text-foreground">{{ selectedPkg.name }} ({{ selectedPkg.nameEn }})</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">{{ $t('基础积分') }}</span>
                  <span class="text-foreground">{{ baseCredits.toLocaleString() }}</span>
                </div>
                <div v-if="packageBonus > 0" class="flex justify-between items-center">
                  <span class="text-muted-foreground">{{ $t('套餐赠送') }}</span>
                  <span class="text-violet-400">+{{ packageBonus.toLocaleString() }}</span>
                </div>
                <div v-if="cryptoBonus > 0" class="flex justify-between items-center">
                  <span class="text-muted-foreground">{{ $t('虚拟货币奖励 (5%)') }}</span>
                  <span class="text-violet-400">+{{ cryptoBonus.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center py-3 border-t border-border">
                  <span class="text-foreground font-medium">{{ $t('总计积分') }}</span>
                  <span class="text-2xl font-bold text-gradient">{{ totalCredits.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center py-3 border-t border-border">
                  <span class="text-muted-foreground">{{ $t('支付方式') }}</span>
                  <span class="font-medium text-foreground">{{ selectedPay?.name ?? $t('请选择') }}</span>
                </div>
                <div class="flex justify-between items-center py-3 border-t border-border">
                  <span class="text-foreground font-medium">{{ $t('应付金额') }}</span>
                  <span class="text-3xl font-bold text-foreground">${{ selectedPkg.price }}</span>
                </div>
                <div class="pt-4">
                  <ButtonsButtonTypeB class="w-full py-4 text-lg" :disabled="!selectedPayment">
                    {{ $t('确认并支付') }}
                    <span class="ml-2 text-sm opacity-80">Confirm & Pay Now</span>
                  </ButtonsButtonTypeB>
                  <p v-if="!selectedPayment" class="text-center text-sm text-muted-foreground mt-3">
                    {{ $t('请先选择支付方式') }}
                  </p>
                </div>
              </div>
            </template>
            <div v-else class="text-center py-8 text-muted-foreground">
              {{ $t('请选择一个充值套餐') }}
            </div>
          </div>
        </div>
      </section>

      <div class="mt-12 text-center text-sm text-muted-foreground">
        <p>{{ $t('所有交易均采用 SSL 加密保护 • 积分永久有效 • 支持随时退款') }}</p>
      </div>
    </div>
  </div>
</template>
