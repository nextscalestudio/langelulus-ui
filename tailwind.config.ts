import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-elevated': 'var(--color-bg-elevated)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem,6vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem,4vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem,2.5vw,2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 40px rgba(0, 0, 0, 0.08)',
        button: '0 2px 8px rgba(0, 0, 102, 0.15)',
        'button-hover': '0 4px 16px rgba(0, 0, 102, 0.2)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backgroundImage: {
        'gradient-section': 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-subtle) 100%)',
        'gradient-fade-up': 'linear-gradient(180deg, transparent 0%, var(--color-bg) 100%)',
        'gradient-fade-down': 'linear-gradient(180deg, var(--color-bg) 0%, transparent 100%)',
        'button-primary': 'linear-gradient(180deg, #3333ff 0%, #0000cc 100%)',
      },
    },
  },
  plugins: [],
}

export default config
