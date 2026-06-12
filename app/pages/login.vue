<script setup lang="ts">
import { motion } from 'motion-v'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { isLoggedIn, login, loginWithGoogle, register } = useAuth()
const { isEnabled: isGoogleEnabled, openSignIn } = useGoogleAuth()
const { locale } = useI18n()

const isRegisterMode = ref(false)
const isGoogleSubmitting = ref(false)

useSeoMeta({
  title: () => `${t(isRegisterMode.value ? '注册' : '登录')} | SpanGrowth`,
  description: () => t(
    isRegisterMode.value
      ? '创建账户，开始管理您的 Reddit 增长项目'
      : '欢迎回来，登录以管理您的 Reddit 增长项目',
  ),
})

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  remember: true,
})

const isSubmitting = ref(false)
const submitError = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const redirectPath = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/'
})

watch(isLoggedIn, (loggedIn) => {
  if (loggedIn)
    router.replace(redirectPath.value)
}, { immediate: true })

function getLoginErrorMessage(error: unknown) {
  return getApiErrorMessage(error)
}

function switchMode(registerMode: boolean) {
  isRegisterMode.value = registerMode
  submitError.value = ''
  form.confirmPassword = ''
}

async function handleGoogleCredential(credential: string) {
  if (isSubmitting.value || isGoogleSubmitting.value)
    return

  submitError.value = ''
  isGoogleSubmitting.value = true
  try {
    await loginWithGoogle(credential)
    await router.replace(redirectPath.value)
  }
  catch (error) {
    submitError.value = getLoginErrorMessage(error) || t('谷歌登录失败，请稍后重试')
  }
  finally {
    isGoogleSubmitting.value = false
  }
}

async function onGoogleLoginClick() {
  if (isSubmitting.value || isGoogleSubmitting.value)
    return

  submitError.value = ''

  if (!isGoogleEnabled.value) {
    submitError.value = t('谷歌登录未配置，请在环境变量中设置 NUXT_PUBLIC_GOOGLE_CLIENT_ID')
    return
  }

  isGoogleSubmitting.value = true
  try {
    await openSignIn(
      handleGoogleCredential,
      locale.value === 'zh' ? 'zh_CN' : 'en',
    )
  }
  catch (error) {
    if (error instanceof Error && error.message === 'GOOGLE_CLIENT_ID_NOT_CONFIGURED') {
      submitError.value = t('谷歌登录未配置，请在环境变量中设置 NUXT_PUBLIC_GOOGLE_CLIENT_ID')
    }
    else {
      submitError.value = t('谷歌登录初始化失败，请刷新页面重试')
    }
  }
  finally {
    isGoogleSubmitting.value = false
  }
}

async function onSubmit() {
  submitError.value = ''

  const email = form.email.trim()
  const password = form.password
  const name = form.name.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    submitError.value = t('请填写有效的邮箱')
    return
  }
  if (!password) {
    submitError.value = t('请填写密码')
    return
  }
  if (password.length < 6) {
    submitError.value = t('密码至少 6 位')
    return
  }
  if (isRegisterMode.value && password !== form.confirmPassword) {
    submitError.value = t('两次输入的密码不一致')
    return
  }

  isSubmitting.value = true
  try {
    if (isRegisterMode.value) {
      await register(email, password, name || undefined)
    }
    else {
      await login(email, password, form.remember)
    }
    await router.replace(redirectPath.value)
  }
  catch (error) {
    const message = getLoginErrorMessage(error)
    if (isRegisterMode.value) {
      submitError.value = message || t('注册失败，请稍后重试')
    }
    else {
      submitError.value = message === '邮箱或密码错误' || !message
        ? t('登录失败，请检查邮箱和密码')
        : message
    }
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="login-page section-wrapper overflow-hidden">
    <div class="login-page-glow pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="section-container relative flex justify-center">
      <motion.div
        class="w-full max-w-md"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }"
      >
        <div class="mb-8 text-center">
          <NuxtLink to="/" class="inline-flex items-center gap-2 no-underline group">
            <img
              src="/logo-mark.png"
              alt=""
              class="size-10 object-contain"
              width="128"
              height="127"
              decoding="async"
            >
            <span class="text-xl font-bold tracking-tight text-foreground group-hover:text-gradient transition-all duration-300">
              SpanGrowth
            </span>
          </NuxtLink>
        </div>

        <div class="glass-card rounded-2xl border border-border p-6 sm:p-8 lg:p-10">
          <div class="mb-8 space-y-2 text-center">
            <h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {{ isRegisterMode ? $t('注册') : $t('登录') }}
            </h1>
            <p class="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {{
                isRegisterMode
                  ? $t('创建账户，开始管理您的 Reddit 增长项目')
                  : $t('欢迎回来，登录以管理您的 Reddit 增长项目')
              }}
            </p>
          </div>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <div v-if="isRegisterMode" class="space-y-2">
              <label for="register-name" class="text-sm font-medium text-foreground">
                {{ $t('姓名') }}
              </label>
              <input
                id="register-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                class="input-field"
                :placeholder="$t('请输入您的姓名（选填）')"
              >
            </div>

            <div class="space-y-2">
              <label for="login-email" class="text-sm font-medium text-foreground">
                {{ $t('电子邮件') }}
                <span class="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                id="login-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                class="input-field"
                :placeholder="$t('请输入您的邮箱')"
              >
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between gap-3">
                <label for="login-password" class="text-sm font-medium text-foreground">
                  {{ $t('密码') }}
                  <span class="text-primary" aria-hidden="true">*</span>
                </label>
                <NuxtLink
                  v-if="!isRegisterMode"
                  to="/contact"
                  class="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                >
                  {{ $t('忘记密码？') }}
                </NuxtLink>
              </div>
              <div class="relative">
                <input
                  id="login-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  :autocomplete="isRegisterMode ? 'new-password' : 'current-password'"
                  required
                  class="input-field pr-11"
                  :placeholder="$t('请输入您的密码')"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  :aria-label="showPassword ? $t('隐藏密码') : $t('显示密码')"
                  @click="showPassword = !showPassword"
                >
                  <span
                    class="size-5"
                    :class="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div v-if="isRegisterMode" class="space-y-2">
              <label for="register-confirm-password" class="text-sm font-medium text-foreground">
                {{ $t('确认密码') }}
                <span class="text-primary" aria-hidden="true">*</span>
              </label>
              <div class="relative">
                <input
                  id="register-confirm-password"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  name="confirmPassword"
                  autocomplete="new-password"
                  required
                  class="input-field pr-11"
                  :placeholder="$t('请再次输入密码')"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  :aria-label="showConfirmPassword ? $t('隐藏密码') : $t('显示密码')"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <span
                    class="size-5"
                    :class="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <label
              v-if="!isRegisterMode"
              class="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground"
            >
              <input
                v-model="form.remember"
                type="checkbox"
                class="login-checkbox"
              >
              {{ $t('记住我') }}
            </label>

            <p
              v-if="submitError"
              class="text-sm text-[#FF6B35]"
              role="alert"
            >
              {{ submitError }}
            </p>

            <button
              type="submit"
              class="btn-reset inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary py-2.5 pl-6 pr-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(115,98,168,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSubmitting || isGoogleSubmitting"
            >
              <span>{{
                isSubmitting
                  ? (isRegisterMode ? $t('注册中...') : $t('登录中...'))
                  : (isRegisterMode ? $t('注册') : $t('登录'))
              }}</span>
            </button>

            <template v-if="!isRegisterMode">
              <p class="login-or text-center text-sm text-muted-foreground">
                {{ $t('或') }}
              </p>

              <button
                type="button"
                class="google-login-btn btn-reset flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#e8e8e8] bg-[#f5f5f7] px-4 py-3 text-sm font-normal text-[#1f1f1f] transition-colors hover:bg-[#ececef] disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isGoogleSubmitting || isSubmitting"
                @click="onGoogleLoginClick"
              >
                <svg class="size-[18px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>{{ isGoogleSubmitting ? $t('谷歌登录中...') : $t('通过 Google 账号登录') }}</span>
              </button>
            </template>
          </form>

          <p class="mt-8 text-center text-sm text-muted-foreground">
            <template v-if="isRegisterMode">
              {{ $t('已有账户？') }}
              <button
                type="button"
                class="font-medium text-primary transition-colors hover:text-primary/80"
                @click="switchMode(false)"
              >
                {{ $t('立即登录') }}
              </button>
            </template>
            <template v-else>
              {{ $t('还没有账户？') }}
              <button
                type="button"
                class="font-medium text-primary transition-colors hover:text-primary/80"
                @click="switchMode(true)"
              >
                {{ $t('立即注册') }}
              </button>
            </template>
          </p>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(115, 98, 168, 0.14) 0%, transparent 70%);
}

.login-page-glow {
  background:
    radial-gradient(circle at 20% 25%, rgba(255, 107, 53, 0.07) 0%, transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(115, 98, 168, 0.12) 0%, transparent 50%);
}

.login-checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
  background: var(--input);
  accent-color: var(--primary);
  cursor: pointer;
}

.login-or {
  margin: 0.25rem 0;
  line-height: 1.25rem;
}

</style>
