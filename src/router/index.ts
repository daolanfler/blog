import { RouteRecordRaw } from "vue-router";

const blogs = import.meta.glob("../mds/blog/*.md", { eager: true });

const blogRoutes: RouteRecordRaw[] = Object.keys(blogs).map(key => {
  return {
    path: /\/([^/]+)\.md$/.exec(key)![1],
    component: (blogs[key] as any).default,
  };
});

// see  https://github.com/hannoeru/vite-plugin-pages
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/bookmarks",
    component: () => import("../pages/bookmarks/index.md"),
  },
  {
    path: "/snippets",
    component: () => import("../pages/snippets/index.md"),
  },
  {
    path: "/post",
    component: () => import("../pages/post/index.vue"),
    children: [...blogRoutes],
  },
];

export { routes };
