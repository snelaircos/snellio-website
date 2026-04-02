import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#0f2133', dark: '#0a1a28', light: '#162d42' },
        accent:  { DEFAULT: '#0090b8', hover: '#007da0' },
        cyan:    { DEFAULT: '#0abbd6', light: 'rgba(10,187,214,.1)' },
        green:   '#12a87a',
        orange:  '#e07a30',
        muted:   { DEFAULT: '#5a7d96', light: '#8fafc8' },
        snellio: { text: '#e8f2f8', text2: '#b8d0e0' },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter:  ['var(--font-inter)',  'sans-serif'],
        mono:   ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'hero-radial': `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,187,214,.12) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,144,184,.1)  0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(18,168,122,.07) 0%, transparent 60%)
        `,
        'gradient-cta': 'linear-gradient(135deg, #0a1a28 0%, #0f2133 100%)',
        'gradient-btn': 'linear-gradient(135deg, #0090b8, #0abbd6)',
      },
      animation: {
        'fade-up':    'fadeUp .6s ease both',
        'fade-up-1':  'fadeUp .6s .1s ease both',
        'fade-up-2':  'fadeUp .6s .2s ease both',
        'fade-up-3':  'fadeUp .6s .3s ease both',
        'fade-up-4':  'fadeUp .6s .4s ease both',
        'pulse-dot':  'pulseDot 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        pulseDot: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '.4' },
        },
      },
    },
  },
  plugins: [],
}

export default config
