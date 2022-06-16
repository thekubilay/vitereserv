import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import ENV from "../config"
import axios from "axios"

let routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/:rid', 
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/:rid/:fid', 
    name: 'Form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/404', 
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: "404" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes
})

router.beforeEach((to,from) => {
  if(to.params.rid){
    axios.request({
      method: "get",
      baseURL: ENV.API,
      url: "rooms/" + to.params.rid + "/",
      params: {week: 1}
    })
    .then((response) => {
      if(!response.data.active) {
        router.push({ name: "Error"})
      }
    })
    .catch(() => {
      router.push({name: "Error"})
    })
  }
})

export default router;