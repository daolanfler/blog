import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
  },
  plugins: [typography()],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
      maxWidth: {
        'screen-read': '900px',
      },
      fontFamily: {
        serif: ['Georgia', 'serif', 'ui-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'mono'],
        wenkai: ['LXGW WenKai']
      },
    },
  },
})
