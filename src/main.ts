import "./styles/main.postcss";
import "./styles/markdown.postcss";
import "./index.css";
import "virtual:windi.css";

import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
// import { routes } from "./router";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { RouterScrollBehavior } from "vue-router";
import allPages from 'virtual:generated-pages'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return {
      top: 0,
    };
  }
};

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes: allPages, scrollBehavior },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
    dayjs.extend(LocalizedFormat);
  }
);
