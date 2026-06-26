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
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
