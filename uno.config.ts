// uno.config.js
import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  // ...
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno()],
  shortcuts: {
    code: "px-1 rounded-sm dark:(text-red-500 bg-dark-200) text-red-500 bg-light-700",
    "demo-wrapper": "min-h-[calc(100vh-8rem)]",
    "btn-primary": "h-8 bg-green-500 rounded mt-4 px-4 text-light-400",
    "btn": "h-8 rounded mt-4 px-4 text-light-400 border"
  },
});
