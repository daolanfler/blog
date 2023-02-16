// uno.config.js
import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig({
  // ...
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetUno()],
  shortcuts: {
    code: "px-1 rounded-sm dark:(text-red-500 bg-dark-200) text-red-500 bg-light-700",
  },
});
