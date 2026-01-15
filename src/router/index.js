import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/home/Home.vue"),
    },
    {
      path: "/tools",
      children: [
        {
          path: "regular",
          component: () => import("@/views/tools/RegularParse.vue"),
        },
        {
          path: "colortrans",
          component: () => import("@/views/tools/ColorTransform.vue"),
        },
      ]
    }
  ],
})

export default router
