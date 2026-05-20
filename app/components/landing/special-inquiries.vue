<script setup lang="ts">
function handleContact() {
  const contactSection = document.querySelector('#contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="relative py-16 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-2xl bg-primary/10 border border-primary/20">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(115,98,168,0.3),transparent_50%)]" />
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(115,98,168,0.2),transparent_50%)]" />
        </div>

        <div class="relative px-8 py-10 lg:px-12 lg:py-12">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
            <!-- Content -->
            <div class="flex items-start gap-4 max-w-2xl">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <span class="i-lucide-lock w-6 h-6 text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold tracking-tight text-foreground">
                  {{ $t('需要定制化业务支持？') }}
                </h3>
                <p class="text-muted-foreground leading-relaxed">
                  {{ $t('对于特殊推广需求、底层矩阵资源合作等非标准业务，请与专家直接对接。我们提供企业级解决方案和专属服务通道。') }}
                </p>
              </div>
            </div>

            <!-- CTA -->
            <ButtonsButtonTypeE @click="handleContact">
              {{ $t('单独联系我们') }}
            </ButtonsButtonTypeE>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
