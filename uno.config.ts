import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'glass-card': 'bg-[rgba(255,255,255,0.03)] backdrop-blur-20 border border-[rgba(255,255,255,0.1)]',
    'glass-card-hover':
      'hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(115,98,168,0.3)]',
    'text-gradient':
      'bg-gradient-to-br from-[#7362a8] to-[#9b8ac7] bg-clip-text text-transparent',
    'glow-hover':
      'border border-[#8F86C9] transition-all duration-300 hover:border-[#A89FE0] hover:bg-[rgba(143,134,201,0.08)] hover:shadow-[0_0_16px_rgba(143,134,201,0.55),0_0_32px_rgba(143,134,201,0.28)]',
    // 清除浏览器 button 默认样式（背景、边框、内边距等）
    'btn-reset':
      'appearance-none bg-transparent border-none p-0 m-0 cursor-pointer outline-none shadow-none ring-0 font-inherit text-inherit leading-inherit',
    'nav-link':
      'btn-reset inline-block no-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group',
    'lang-btn': 'btn-reset text-sm transition-colors duration-200',
    'input-field':
      'w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.6)] outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200',
  },
  theme: {
    colors: {
      background: '#000000',
      foreground: '#ffffff',
      card: 'rgba(255, 255, 255, 0.03)',
      'card-foreground': '#ffffff',
      primary: '#7362a8',
      'primary-foreground': '#ffffff',
      muted: 'rgba(255, 255, 255, 0.05)',
      'muted-foreground': 'rgba(255, 255, 255, 0.6)',
      destructive: '#7362a8',
      border: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.05)',
      ring: '#7362a8',
      brand: {
        purple: '#8F86C9',
        'purple-light': '#A89FE0',
      },
    },
    animation: {
      keyframes: {
        marquee:
          '{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
        'marquee-reverse':
          '{from{transform:translateX(-50%)}to{transform:translateX(0)}}',
        'typing-cursor': '{0%,100%{opacity:1}50%{opacity:0}}',
        'blur-in':
          '{0%{filter:blur(10px);opacity:0;transform:translateY(10px)}100%{filter:blur(0);opacity:1;transform:translateY(0)}}',
        'glow-pulse':
          '{0%,100%{box-shadow:0 0 20px rgba(115,98,168,0.5)}50%{box-shadow:0 0 40px rgba(115,98,168,0.8)}}',
      },
      durations: {
        marquee: '40s',
        'marquee-reverse': '45s',
        'typing-cursor': '1s',
        'blur-in': '0.5s',
        'glow-pulse': '2s',
        
      },
      timingFns: {
        marquee: 'linear',
        'marquee-reverse': 'linear',
        'typing-cursor': 'step-end',
        'glow-pulse': 'ease-in-out',
      },
      counts: {
        marquee: 'infinite',
        'marquee-reverse': 'infinite',
        'typing-cursor': 'infinite',
        'glow-pulse': 'infinite',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
