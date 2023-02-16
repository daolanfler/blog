import "uno.css"
import '@unocss/reset/tailwind.css'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import NProgress from 'nprogress'
import { createPinia } from 'pinia'
import allPages from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import { RouterScrollBehavior } from 'vue-router'
import App from './App.vue'
import 'nprogress/nprogress.css'
import './index.css'
import './styles/main.postcss'
import './styles/markdown.postcss'
import { FrontMatter } from './utils/types'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: FrontMatter
  }
}

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      top: 0,
    }
  }
}

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes: allPages, scrollBehavior },
  // function to have custom setups
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ app, router, routes, isClient, initialState }) => {
    dayjs.extend(LocalizedFormat)
    dayjs.extend(utc)
    dayjs.extend(timezone)
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done();
      })
    }

    app.use(createPinia())
  }
)
