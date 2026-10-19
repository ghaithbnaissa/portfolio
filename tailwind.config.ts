import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        mx: {
          bg: 'rgb(var(--mx-bg) / <alpha-value>)',
          deep: 'rgb(var(--mx-deep) / <alpha-value>)',
          panel: 'rgb(var(--mx-panel) / <alpha-value>)',
          panel2: 'rgb(var(--mx-panel-2) / <alpha-value>)',
          line: 'rgb(var(--mx-line) / <alpha-value>)',
          lineStrong: 'rgb(var(--mx-line-strong) / <alpha-value>)',
          primary: 'rgb(var(--mx-primary) / <alpha-value>)',
          bright: 'rgb(var(--mx-primary-bright) / <alpha-value>)',
          dim: 'rgb(var(--mx-primary-dim) / <alpha-value>)',
          muted: 'rgb(var(--mx-primary-muted) / <alpha-value>)',
          accent: 'rgb(var(--mx-accent) / <alpha-value>)',
          accentDim: 'rgb(var(--mx-accent-dim) / <alpha-value>)',
          text: 'rgb(var(--mx-text) / <alpha-value>)',
          textDim: 'rgb(var(--mx-text-dim) / <alpha-value>)',
          textFaint: 'rgb(var(--mx-text-faint) / <alpha-value>)',
          warn: 'rgb(var(--mx-warn) / <alpha-value>)',
          danger: 'rgb(var(--mx-danger) / <alpha-value>)',
          success: 'rgb(var(--mx-success) / <alpha-value>)',
        },
        background: 'rgb(var(--mx-bg) / <alpha-value>)',
        surface: 'rgb(var(--mx-panel) / <alpha-value>)',
        accent: 'rgb(var(--mx-primary) / <alpha-value>)',
        success: 'rgb(var(--mx-success) / <alpha-value>)',
        edge: 'rgb(var(--mx-line) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.9rem' }]
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--mx-primary) / 0.25), 0 0 20px -4px rgb(var(--mx-primary) / 0.2)',
        'glow-lg': '0 0 0 1px rgb(var(--mx-primary) / 0.35), 0 0 50px -8px rgb(var(--mx-primary) / 0.3)',
        panel: '0 24px 70px -30px rgb(0 0 0 / 0.85)',
        soft: '0 4px 24px -4px rgb(0 0 0 / 0.4)',
        elevated: '0 8px 40px -8px rgb(0 0 0 / 0.6)',
      },
      letterSpacing: {
        terminal: '0.18em'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' }
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        marqueeX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
      },
      animation: {
        blink: 'blink 1.05s steps(1, end) infinite',
        'pulse-glow': 'pulseGlow 2.6s ease-in-out infinite',
        'rise-in': 'riseIn 0.5s ease-out both',
        marquee: 'marqueeX 38s linear infinite',
        'slide-in': 'slideIn 0.4s ease-out both',
        'scale-in': 'scaleIn 0.3s ease-out both',
      }
    }
  },
  plugins: []
} satisfies Config
