// uno.config.js
import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...
  transformers: [transformerDirectives()],
  presets: [
    presetUno()
  ]
})
