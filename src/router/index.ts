import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] =[
    {
        path: '/',
        component: () => import('../pages/home/index.vue')
    },
    {
        path: '/bookmarks',
        component: () => import('../pages/bookmarks/index.vue')
    },
    {
        path: '/snippets',
        component: () => import('../pages/snippets/index.vue')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash
            }
        }
    }
})