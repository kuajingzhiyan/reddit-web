<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
import { getAllBlogPosts } from '~/utils/blog-posts'

const blogPosts = getAllBlogPosts()
const searchQuery = ref('')

interface BlogPost {
    slug: string
    title: string
    date: string
    thumbnail: string
}

/** 精选文章（大图卡片） */
const featuredPost = computed(() => blogPosts)

const recentPosts: BlogPost[] = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    thumbnail: '/logo-mark.png',
})) || []

const categories = computed(() => [
    { labelKey: '分类_Reddit营销', count: 12 },
    { labelKey: '分类_SEO', count: 8 },
    { labelKey: '分类_社区运营', count: 6 },
    { labelKey: '分类_AI可见性', count: 5 },
    { labelKey: '分类_品牌增长', count: 9 },
])

const filteredRecentPosts = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q)
        return recentPosts
    return recentPosts.filter((post) => {
        const title = post.title.toLowerCase()
        return title.includes(q) || post.date.toLowerCase().includes(q)
    })
})

function goToPost(slug: string) {
    router.push(localePath(`/blog/${slug}`))
}

useSeoMeta({
    title: () => `${t('博客')} | SpanGrowth`,
    description: () => t('博客页描述'),
})
</script>

<template>
    <div>
        <!-- 页头 Banner -->
        <section class="section-wrapper pb-10 lg:pb-12">
            <div class="section-container">
                <div
                    class="mx-auto flex h-48 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7362a8] to-[#9b8ac7] sm:h-56 lg:h-60">
                    <h1 class="text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">
                        {{ $t('博客') }}
                    </h1>
                </div>
            </div>
        </section>

        <!-- 主栏 + 侧边栏 -->
        <section class="section-wrapper pt-0">
            <div class="section-container">
                <div class="block lg:hidden blog-sidebar-panel glass-card rounded-2xl border border-border p-5 sm:p-6">
                    <label for="blog-search" class="mb-3 block text-sm font-semibold text-foreground">
                        {{ $t('搜索') }}
                    </label>
                    <div class="relative">
                        <input id="blog-search" v-model="searchQuery" type="search" class="input-field pr-10"
                            :placeholder="$t('搜索占位')">
                        <span
                            class="i-lucide-search pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true" />
                    </div>
                </div>
                <div class="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
                    <!-- 左侧：精选文章 -->
                    <div class="lg:col-span-8">
                        <div v-for="value in featuredPost" :key="value.slug"
                            class="blog-featured-wrap glass-card mt-8 rounded-2xl border border-border p-4">
                            <article class="blog-featured-card overflow-hidden rounded-2xl border border-border">
                                <!-- 卡片内：品牌 + 标题 + 示意插画 -->
                                <div class="w-full h-100">
                                    <img src="/logo.png" alt="" class="size-full object-cover">
                                </div>
                                <!-- 底部日期 pill（居中） -->
                                <div class="flex justify-center border-t border-border bg-background/40 px-6 py-4">
                                    <span
                                        class="rounded-full border border-border bg-background/90 px-5 py-2 text-sm text-muted-foreground">
                                        {{ value.date }}
                                    </span>
                                </div>
                            </article>

                            <!-- 标题 + Read More -->
                            <div class="mt-8 space-y-6">
                                <h3 class="text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                                    <!-- {{ $t(featuredPost.titlePrefixKey) }}{{ $t(featuredPost.titleHighlightKey) }} -->
                                    {{ value.title }}
                                </h3>
                                <button type="button"
                                    class="btn-reset inline-flex items-center gap-3 rounded-full bg-primary py-2.5 pl-6 pr-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(115,98,168,0.45)]"
                                    @click="goToPost(value.slug)">
                                    <span>{{ $t('阅读更多') }}</span>
                                    <span
                                        class="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/25"
                                        aria-hidden="true">
                                        <span class="i-lucide-arrow-right size-4 text-primary-foreground" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 右侧：Search / Recent / Categories -->
                    <aside class="space-y-8 lg:col-span-4">
                        <!-- Search -->
                        <div class="hidden lg:block blog-sidebar-panel glass-card rounded-2xl border border-border p-5 sm:p-6">
                            <label for="blog-search" class="mb-3 block text-sm font-semibold text-foreground">
                                {{ $t('搜索') }}
                            </label>
                            <div class="relative">
                                <input id="blog-search" v-model="searchQuery" type="search" class="input-field pr-10"
                                    :placeholder="$t('搜索占位')">
                                <span
                                    class="i-lucide-search pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                                    aria-hidden="true" />
                            </div>
                        </div>

                        <!-- Recent Posts -->
                        <div class="blog-sidebar-panel glass-card rounded-2xl border border-border p-5 sm:p-6">
                            <h2 class="blog-widget-title text-lg font-bold text-foreground">
                                {{ $t('最新文章') }}
                            </h2>
                            <ul class="mt-5 space-y-4">
                                <li v-for="post in filteredRecentPosts" :key="post.slug">
                                    <button type="button"
                                        class="btn-reset blog-recent-item flex w-full gap-3 rounded-xl p-2 text-left transition-colors"
                                        @click="goToPost(post.slug)">
                                        <img :src="post.thumbnail" alt=""
                                            class="size-14 shrink-0 rounded-lg border border-border object-cover bg-background/80 p-1"
                                            width="56" height="56" loading="lazy" decoding="async">
                                        <div class="min-w-0 flex-1 pt-0.5">
                                            <time class="text-xs text-muted-foreground">{{ post.date }}</time>
                                            <p
                                                class="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                                                <!-- {{ $t(post.titleKey) }} -->
                                                {{ post.title }}
                                            </p>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                            <p v-if="filteredRecentPosts.length === 0" class="mt-4 text-sm text-muted-foreground">
                                {{ $t('无搜索结果') }}
                            </p>
                        </div>

                        <!-- Categories -->
                        <!-- <div class="blog-sidebar-panel rounded-2xl border border-border p-5 sm:p-6">
                            <h2 class="blog-widget-title text-lg font-bold text-foreground">
                                {{ $t('分类') }}
                            </h2>
                            <ul class="mt-5 space-y-2">
                                <li v-for="cat in categories" :key="cat.labelKey">
                                    <button type="button"
                                        class="btn-reset flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground">
                                        <span>{{ $t(cat.labelKey) }}</span>
                                        <span class="text-xs tabular-nums opacity-70">{{ cat.count }}</span>
                                    </button>
                                </li>
                            </ul>
                        </div> -->
                    </aside>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.blog-featured-wrap {
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.blog-featured-wrap:hover {
  border-color: rgba(115, 98, 168, 0.45);
  box-shadow: 0 12px 40px rgba(115, 98, 168, 0.22);
}

.blog-featured-card {
  background: linear-gradient(145deg,
      rgba(115, 98, 168, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 100%);
}

/* 侧边栏标题下 primary 短下划线 */
.blog-widget-title {
  position: relative;
  padding-bottom: 0.75rem;
}

.blog-widget-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.5rem;
  height: 3px;
  border-radius: 9999px;
  background-color: var(--primary);
}

.blog-recent-item:hover {
  background-color: rgba(115, 98, 168, 0.1);
}

.blog-recent-item:hover p {
  color: var(--primary);
}

/* 精选卡片右侧浮动图标（预留） */
.blog-float-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(115, 98, 168, 0.35);
  background-color: rgba(115, 98, 168, 0.2);
  color: #9b8ac7;
  font-size: 1rem;
  box-shadow: 0 4px 14px rgba(115, 98, 168, 0.25);
}

.blog-featured-visual {
  min-height: 12rem;
}
</style>
