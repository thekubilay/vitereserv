import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import ENV from "../config"
import axios from "axios"

let routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    name: 'Home',
    component: () => import('../views/Home.vue'),
    // meta: {gtm: 'ホーム'}
  },
  {
    path: '/:rid', 
    name: 'Room',
    component: () => import('../views/Room.vue'),
    // meta: {gtm: 'ルーム'}
  },
  {
    path: '/:rid/:fid', 
    name: 'Form',
    component: () => import('../views/Form.vue'),
    // meta: {gtm: 'フォーム'}
  },
  {
    path: '/404', 
    name: 'Error',
    component: () => import('../views/Error.vue'),
    // meta: {gtm: 'エラー'}
  },
  {
    path: '/:rid/:fid/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    // meta: {gtm: 'サンクス'}
  },
  { path: '/:pathMatch(.*)*', redirect: "404" },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes
})

router.beforeEach((to,from) => {
  //Check if the room exists or active
  // if(to.params.rid){
  //   axios.request({
  //     method: "get",
  //     baseURL: ENV.API,
  //     url: "rooms/" + to.params.rid + "/",
  //     params: {year: to.query.year, week: to.query.week}
  //   })
  //   .then((response) => {
  //     if(!response.data.active) {
  //       router.push({ name: "Error"})
  //     }
  //   })
  //   .catch(() => {
  //     router.push({name: "Error"})
  //   })
  // }
})

export default router;