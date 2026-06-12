<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('联系我们')} | SpanGrowth`,
  description: () => t('有疑问或想讨论您的 Reddit 使用策略？'),
})

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

function getContactErrorMessage(error: unknown) {
  return getApiErrorMessage(error)
}

async function onSubmit() {
  submitError.value = ''
  submitSuccess.value = false

  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name) {
    submitError.value = t('请填写姓名')
    return
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    submitError.value = t('请填写有效的邮箱')
    return
  }
  if (!message) {
    submitError.value = t('请填写留言内容')
    return
  }



  isSubmitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { name, email, message },
    })
    submitSuccess.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  }
  catch (error) {
    const message = getContactErrorMessage(error)
    if (message === '请填写姓名')
      submitError.value = t('请填写姓名')
    else if (message === '请填写有效的邮箱')
      submitError.value = t('请填写有效的邮箱')
    else if (message === '请填写留言内容')
      submitError.value = t('请填写留言内容')
    else
      submitError.value = message || t('提交失败，请稍后重试')
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <!-- 固定 header 占位 + 双栏布局（左文案 / 右表单），配色贴合本站深色 glass 体系 -->
  <section class="section-wrapper">
    <div class="section-container">
      <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <!-- 左侧：标题与说明 -->
        <div class="space-y-6 lg:max-w-xl lg:pt-4">
          <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {{ $t('联系我们') }}
          </h1>
          <p class="text-lg font-medium text-foreground/90">
            {{ $t('有疑问或想讨论您的 Reddit 使用策略？') }}
          </p>
          <p class="text-base leading-relaxed text-muted-foreground">
            {{ $t('请给我们留言，我们会尽快回复。无论您是在了解 Reddit 营销服务、希望提高曝光度，还是需要特定项目的帮助——我们都乐意为您效劳。') }}
          </p>
        </div>

        <!-- 右侧：联系表单卡片 -->
        <div class="glass-card rounded-2xl border border-border p-6 sm:p-8 lg:p-10">
          <h2 class="mb-8 text-2xl font-bold tracking-tight text-foreground">
            {{ $t('联系我们') }}
          </h2>

          <form class="space-y-6" @submit.prevent="onSubmit">
            <div class="space-y-2">
              <label for="contact-name" class="text-sm font-medium text-foreground">
                {{ $t('姓名') }}
                <span class="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                required
                class="input-field"
                :placeholder="$t('请输入您的姓名')"
              >
            </div>

            <div class="space-y-2">
              <label for="contact-email" class="text-sm font-medium text-foreground">
                {{ $t('电子邮件') }}
                <span class="text-primary" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                required
                class="input-field"
                :placeholder="$t('请输入您的邮箱')"
              >
            </div>

            <div class="space-y-2">
              <label for="contact-message" class="text-sm font-medium text-foreground">
                {{ $t('信息') }}
                <span class="text-primary" aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                required
                class="input-field min-h-[140px] resize-y"
                :placeholder="$t('在Reddit上告诉我们你的项目或目标......')"
              />
            </div>

            <p
              v-if="submitError"
              class="text-sm text-[#FF6B35]"
              role="alert"
            >
              {{ submitError }}
            </p>
            <p
              v-if="submitSuccess"
              class="text-sm text-primary"
              role="status"
            >
              {{ $t('留言已发送，我们会尽快与您联系。') }}
            </p>

            <!-- 参考设计稿 pill 按钮 + 圆形箭头，主色用本站 primary -->
            <button
              type="submit"
              class="btn-reset inline-flex items-center gap-3 rounded-full bg-primary py-2.5 pl-6 pr-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSubmitting"
            >
              <span>{{ isSubmitting ? $t('发送中...') : $t('发送') }}</span>
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/85"
                aria-hidden="true"
              >
                <span class="i-lucide-arrow-right size-4 text-white" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
