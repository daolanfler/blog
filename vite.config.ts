import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Markdown({
      markdownItUses: [
        prism
      ]
    }),

    Components({
      dts: true
    })
  ],
});
