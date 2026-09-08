import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--ivory)',
        'ivory-2': 'var(--ivory-2)',
        line: 'var(--line)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        espresso: 'var(--espresso)',
        bronze: 'var(--bronze)',
        'bronze-deep': 'var(--bronze-deep)',
        rust: 'var(--rust)'
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        content: '1180px'
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--ink)',
            '--tw-prose-headings': 'var(--ink)',
            '--tw-prose-links': 'var(--bronze)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-quotes': 'var(--espresso)',
            '--tw-prose-quote-borders': 'var(--bronze)',
            '--tw-prose-hr': 'var(--line)',
            '--tw-prose-th-borders': 'var(--line)',
            '--tw-prose-td-borders': 'var(--line)',
            maxWidth: '68ch'
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
