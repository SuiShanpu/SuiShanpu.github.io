import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      ]
    }
  ],
})

export default router
