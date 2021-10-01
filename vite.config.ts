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

import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jsdoc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    WindiCSS(),
    
    Pages({
      extensions: ['vue', 'md'],
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
  ssgOptions: {
    // script: "async",
    // dirStyle: 'nested',
    // includeAllRoutes: true
  },
});
