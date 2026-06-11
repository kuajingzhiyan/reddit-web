<script setup lang="ts">
import { motion } from 'motion-v'
const { t } = useI18n()

const approachCards = computed(() => [
    {
        title: '数据驱动战略',
        description: '所有行动都基于研究、意图信号和绩效跟踪。',
    },
    {
        title: '长远思维',
        description: '我们致力于打造随着时间推移而不断增长的可持续知名度，而不是短期的短暂飙升。',
    },
    {
        title: '社区至上的理念',
        description: '我们遵循 Reddit 文化——价值第一，推广第二。',
    },
])

useSeoMeta({
    title: () => `${t('关于我们')} | SpanGrowth`,
    description: () => t('关于 SpanGrowth 介绍段落一'),
})
</script>

<template>
    <div>
        <!-- 区块一：关于 SpanGrowth（居中文案） -->
        <section class="section-wrapper about-intro overflow-hidden sm:pb-10 lg:pb-16">
            <div class="about-intro-glow pointer-events-none absolute inset-0" aria-hidden="true" />

            <div class="section-container relative text-center">
                <h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    {{ $t('关于 SpanGrowth') }}
                </h1>
                <motion.div :initial="{ opacity: 0, y: 80 }" :whileInView="{ opacity: 1, y: 0 }"
                    :inViewOptions="{ once: true }" :transition="{ duration: 0.5 }">
                    <p class="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {{ $t('关于 SpanGrowth 介绍段落一') }}
                    </p>
                    <p class="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {{ $t('关于 SpanGrowth 介绍段落二') }}
                    </p>
                </motion.div>

            </div>
        </section>

        <!-- 区块二：我们的方法（左文右卡；卡片 hover 高亮，参考设计稿第三张卡效果） -->
        <section class="section-wrapper sm:pt-10 lg:pt-16 border-t border-border">
            <div class="section-container">
                <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                    <div class="space-y-6 lg:max-w-xl">
                        <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {{ $t('我们的方法') }}
                        </h2>
                        <motion.div :initial="{ opacity: 0, y: 100 }" :whileInView="{ opacity: 1, y: 0 }"
                            :inViewOptions="{ once: true }" :transition="{ duration: 0.5 }">
                            <p class="text-base leading-relaxed text-muted-foreground">
                                {{ $t('我们的方法段落一') }}
                            </p>
                            <p class="text-base leading-relaxed text-muted-foreground">
                                {{ $t('我们的方法段落二') }}
                            </p>
                            <p class="text-base leading-relaxed text-muted-foreground">
                                {{ $t('我们的方法段落三') }}
                            </p>
                        </motion.div>
                    </div>

                    <div class="flex flex-col gap-4 sm:gap-5">
                        <motion.article v-for="card in approachCards" :key="card.title"
                            :initial="{ opacity: 0, x: 100 }" :whileInView="{ opacity: 1, x: 0 }"
                            :inViewOptions="{ once: true }" :transition="{ duration: 0.5 }"
                            class="about-approach-card rounded-2xl border p-6 sm:p-7">
                            <h3 class="text-lg font-bold text-foreground">
                                {{ $t(card.title) }}
                            </h3>
                            <p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {{ $t(card.description) }}
                            </p>
                        </motion.article>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.about-intro {
    /* 顶部柔和光晕，对应设计稿浅粉渐变，适配深色主题 */
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(115, 98, 168, 0.12) 0%, transparent 70%);
}

.about-intro-glow {
    background:
        radial-gradient(circle at 15% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 75%, rgba(115, 98, 168, 0.1) 0%, transparent 50%);
}

.about-intro-ring {
    border: 1px solid rgba(255, 107, 53, 0.22);
    border-radius: 9999px;
}

.about-intro-ring--a {
    top: 2.5rem;
    left: 12%;
    width: 3.5rem;
    height: 3.5rem;
}

.about-intro-ring--b {
    top: 42%;
    right: 10%;
    width: 5rem;
    height: 5rem;
    opacity: 0.65;
}

/* 默认：半透明底；hover：primary 实心 + 白字（设计稿第三卡） */
.about-approach-card {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
}

.about-approach-card:hover {
    background-color: var(--primary);
    border-color: rgba(115, 98, 168, 0.85);
    box-shadow: 0 12px 40px rgba(115, 98, 168, 0.28);
    /* transform: translateY(-2px); */
}

.about-approach-card:hover h3,
.about-approach-card:hover p {
    color: var(--primary-foreground);
}

@media (prefers-reduced-motion: reduce) {
    .about-approach-card {
        transition-duration: 0.01ms;
    }

    .about-approach-card:hover {
        transform: none;
    }
}
</style>
