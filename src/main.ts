import './styles/main.postcss'
import './styles/markdown.postcss'
import './index.css'
import 'virtual:windi.css'

import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { RouterScrollBehavior } from 'vue-router'
import allPages from 'virtual:generated-pages'
import NProgress from 'nprogress'
import App from './App.vue'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: any
  }
}

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  else {
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
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
