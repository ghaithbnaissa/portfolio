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
          text: 'rgb(var(--mx-text) / <alpha-value>)',
          textDim: 'rgb(var(--mx-text-dim) / <alpha-value>)',
          textFaint: 'rgb(var(--mx-text-faint) / <alpha-value>)',
          warn: 'rgb(var(--mx-warn) / <alpha-value>)',
          danger: 'rgb(var(--mx-danger) / <alpha-value>)'
        },
        // Legacy aliases kept so older class names keep resolving.
        background: 'rgb(var(--mx-bg) / <alpha-value>)',
        surface: 'rgb(var(--mx-panel) / <alpha-value>)',
        accent: 'rgb(var(--mx-primary) / <alpha-value>)',
        success: 'rgb(var(--mx-primary-dim) / <alpha-value>)',
        edge: 'rgb(var(--mx-line) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Share Tech Mono', 'Plus Jakarta Sans', 'JetBrains Mono', 'monospace'],
        crt: ['VT323', 'Share Tech Mono', 'ui-monospace', 'monospace']
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.9rem' }]
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--mx-primary) / 0.35), 0 0 18px -2px rgb(var(--mx-primary) / 0.35)',
        'glow-lg': '0 0 0 1px rgb(var(--mx-primary) / 0.45), 0 0 44px -6px rgb(var(--mx-primary) / 0.45)',
        panel: '0 24px 70px -30px rgb(0 0 0 / 0.95)'
      },
      letterSpacing: {
        terminal: '0.18em'
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.78' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.9' },
          '97%': { opacity: '1' }
        },
        scanSweep: {
          '0%': { transform: 'translateY(-110%)' },
          '100%': { transform: 'translateY(110%)' }
        },
        glitchShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' }
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
        }
      },
      animation: {
        blink: 'blink 1.05s steps(1, end) infinite',
        flicker: 'flicker 6s linear infinite',
        'scan-sweep': 'scanSweep 7s linear infinite',
        glitch: 'glitchShift 0.35s steps(2, end) infinite',
        'pulse-glow': 'pulseGlow 2.6s ease-in-out infinite',
        'rise-in': 'riseIn 0.5s ease-out both',
        marquee: 'marqueeX 38s linear infinite'
      }
    }
  },
  plugins: []
} satisfies Config
