import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import Components from 'unplugin-vue-components/vite'

import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Markdown({
      markdownItSetup(md) {
        // this line put first
        md.use(markdownItAttrs)
        md.use(anchor, {
         level: 1,
         permalink: anchor.permalink.headerLink()
        })
        md.use(prism)
      }
    }),

    Components({
      dts: true
    }),
    viteCompression()
  ],
});
