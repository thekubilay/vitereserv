import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

let routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/404', 
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: "404" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes
})

router.beforeEach((to,from) => {

})