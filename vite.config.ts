import { build, defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'

import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    WindiCSS(),
    
    Pages(),

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
  ssgOptions: {
    script: "async",
    dirStyle: 'nested',
    includeAllRoutes: true
  },
});
