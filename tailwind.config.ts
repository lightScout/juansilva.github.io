import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-2': 'hsl(var(--surface-2) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-2': 'hsl(var(--border-2) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        'foreground-2': 'hsl(var(--foreground-2) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        dim: 'hsl(var(--dim) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        wider: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config
