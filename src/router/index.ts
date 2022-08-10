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
    path: '/thanks',
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


//// This will refresh the page when changing view /////
// router.afterEach((to, from) => {
//     const isReloaded = sessionStorage.getItem("reload")

//     if (typeof isReloaded === "string") {
//       if (to.name === from.name) {
//         sessionStorage.setItem("reload", "true")
//       } else if (isReloaded === "false"){
//         sessionStorage.setItem("reload", "true")
//         document.location.reload()
//       }
//     }

//     setTimeout(() => {
//       sessionStorage.setItem("reload", "false")        
//       console.log(isReloaded + " timeout1")
//     }, 200);   
//     console.log(isReloaded)

// })

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