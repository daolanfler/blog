import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import viteCompression from 'vite-plugin-compression'
import fs from 'fs-extra'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'

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
  optimizeDeps: {
    include: [
    ],
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    WindiCSS(),

    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        if (path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      },
    }),

    Markdown({
      wrapperComponent: 'PostWrapper',
      markdownItSetup(md) {
        // this line put first
        md.use(markdownItAttrs)

        md.use(anchor, {
          level: 1,
          permalink: anchor.permalink.headerLink(),
        })

        md.use(prism)
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.md$/],
      // resolvers: IconsResolver({
      //   componentPrefix: '',
      // }),
    }),
    viteCompression(),
  ],
  ssgOptions: {
    // script: "async",
    // dirStyle: 'nested',
    // includeAllRoutes: true
  },
})
