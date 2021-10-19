import { defineConfig } from '@windicss/plugin-utils'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
  },
  safelist: ['prose', 'prose-sm', 'm-auto'],
  plugins: [typography()],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
    },
  },
})
