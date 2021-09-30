import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import routes from "virtual:generated-pages";

// see  https://github.com/hannoeru/vite-plugin-pages

export { routes };

// export default{
//     history: createWebHistory(),
//     routes,
//     scrollBehavior(to, from, savedPosition) {
//         if (to.hash) {
//             return {
//                 el: to.hash
//             }
//         }
//     }
// }
