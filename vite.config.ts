import fs from 'fs-extra'
import { resolve } from 'path'
import { defineConfig } from 'vite'

import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import markdownItAttrs from 'markdown-it-attrs'
import matter from 'gray-matter'

import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import ViteCompression from 'vite-plugin-compression'
import generateSitemap from 'vite-plugin-pages-sitemap'

import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike' // for some reason prism needs this one
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jsdoc'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [],
  },
  plugins: [
    ViteCompression(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS(),

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
      onRoutesGenerated: (routes) =>
        generateSitemap({
          routes,
          hostname: 'https://vite.daolanfler.xyz/',
          readable: true,
          dest: 'dist',
        }),
    }),

    Markdown({
      wrapperComponent: 'post-wrapper',
      markdownItSetup(md) {
        md.use(markdownItAttrs)

        md.use(anchor, {
          permalink: anchor.permalink.headerLink(),
        })

        md.use(prism)
      },
    }),
  ],
  ssgOptions: {
    format: 'esm'
  },
})
