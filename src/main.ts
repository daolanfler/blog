import "./index.css";

import { ViteSSG } from "vite-ssg";
// import { createApp } from 'vue'
import App from "./App.vue";
import { routes } from "./router";
// import { createWebHistory } from "vue-router";

// const app = createApp(App).use(router)

// app.mount('#app')

// src/main.ts
// import App from './App.vue'

// `export const createApp` is required
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
);
