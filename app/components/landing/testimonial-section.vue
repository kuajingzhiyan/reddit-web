<script setup lang="ts">
// 9 条客户反馈：对齐 React components/testimonial-section.tsx
const testimonialData = [
  { id: 1, name: 'Alex Chen', title: 'Apparel E-commerce', rating: 5, roi: 95, quote: "I've always known Reddit is highly effective; one viral post can potentially bring tens of thousands of impressions. Leadmore AI perfectly solved the ban problem for me.", avatar: 'AC' },
  { id: 2, name: 'Mike Johnson', title: 'AI Startup CEO', rating: 5, roi: 88, quote: 'As a small company with limited budget, we targeted Reddit for traffic potential. Leadmore AI genuinely solved the subreddit selection and ban anxiety perfectly for me.', avatar: 'MJ' },
  { id: 3, name: 'Daniel Zhang', title: 'Electronics E-commerce', rating: 5, roi: 92, quote: 'Electronic products are particularly well-suited for Reddit, especially high-ticket items. I primarily use Leadmore AI for content publishing and tracking.', avatar: 'DZ' },
  { id: 4, name: 'David Chen', title: 'Outbound 3C Brand Marketing Director', rating: 5, roi: 300, quote: "SpanGrowth's team is amazingly professional. With unique AI tools and GEO-targeted posting, my independent site's referral traffic skyrocketed 300% in two months!", avatar: 'DC' },
  { id: 5, name: 'Sarah Miller', title: 'Skincare Brand Founder', rating: 5, roi: 75, quote: "Leadmore's tracking identified 20 high-value leads in subreddits I didn't even know existed. It's transformed our top-of-funnel strategy.", avatar: 'SM' },
  { id: 6, name: 'Emily Rose', title: 'Artisan Jewelry Designer', rating: 5, roi: 110, quote: 'Reddit traffic is now our #2 referral source. The content suggestions are surprisingly spot on and capture our brand voice perfectly.', avatar: 'ER' },
  { id: 7, name: "Liam O'Brien", title: 'Niche Content Creator', rating: 5, roi: 40, quote: "I used to get shadowbanned weekly. With Leadmore's warm-up tools and persona management, I haven't had a single issue in four months.", avatar: 'LO' },
  { id: 8, name: 'Maria Garcia', title: 'Tech Gadgets Retailer', rating: 5, roi: 85, quote: "Scaling our Reddit presence was impossible manually. Now it's our most predictable channel for organic discovery and customer feedback.", avatar: 'MG' },
  { id: 9, name: 'Sofia L.', title: 'Education Platform Director', rating: 5, roi: 140, quote: "The insights into competitor subreddits gave us a massive edge in our Q3 launch. It's more than a posting tool; it's market intelligence.", avatar: 'SL' },
]

const trustIndicators = computed(() => [
  '已服务 200+ 出海品牌',
  '平均 ROI 提升 280%',
  '客户续约率 95%',
])
</script>

<template>
  <section id="testimonials" class="relative py-24 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
    </div>

    <div class="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
          {{ $t('成功案例') }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {{ $t('客户真实反馈') }}
        </h2>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          {{ $t('看看我们的客户如何通过 SpanGrowth 取得成功') }}
        </p>
      </div>

      <!-- 横排 Marquee 滚动；两侧渐变遮罩增强边缘过渡 -->
      <div class="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent" />
        <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent" />

        <Marquee :repeat="2" class="[--marquee-duration:80s] [--gap:1.5rem]">
          <div
            v-for="testimonial in testimonialData"
            :key="testimonial.id"
            class="w-[320px] sm:w-[360px] shrink-0 glass-card rounded-2xl p-6 border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            <RatingStars :rating="testimonial.rating" class="mb-4" />

            <p class="text-foreground/90 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5.5rem]">
              &ldquo;{{ testimonial.quote }}&rdquo;
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {{ testimonial.avatar }}
                </div>
                <div class="min-w-0">
                  <p class="text-foreground font-medium text-sm truncate">{{ testimonial.name }}</p>
                  <p class="text-muted-foreground text-xs truncate">{{ testimonial.title }}</p>
                </div>
              </div>
              <div class="text-right shrink-0 pl-3">
                <span class="text-primary font-bold text-lg">+{{ testimonial.roi }}%</span>
                <p class="text-muted-foreground text-xs">ROI</p>
              </div>
            </div>
          </div>
        </Marquee>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
        <div v-for="item in trustIndicators" :key="item" class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span class="text-sm">{{ $t(item) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
