<template>
  <main id="main" class="relative flex-column">
    <VitHeader v-if="headFootRoutes.includes(''+String(route.name))" v-model:theme="theme"/>
    <router-view />
    <VitFooter v-if="headFootRoutes.includes(''+String(route.name))"/>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount, onMounted } from 'vue';
import {useRouter, useRoute} from "vue-router";
import Form from "./views/Form.vue"
import Room from "./views/Room.vue"
import VitFooter from "./components/Footer.vue"
import VitHeader from "./components/Header.vue"
export default defineComponent({
  components: {Form, Room, VitHeader, VitFooter},
  setup(){
    const theme = ref<string>("light")
    const headFootRoutes = ["Room","Form"]
    const route = useRoute()
    // const html: HTMLElement|null = document.querySelector("html")

    // onMounted(() => {
    //   if(html){
    //     html.setAttribute("theme",theme.value)
    //   }
    // })

    onBeforeMount((): void => {
      const storageTheme: any = localStorage.getItem("theme")
      const browserTheme: string = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

      if (!storageTheme){
        theme.value = browserTheme
      } else theme.value = storageTheme

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        theme.value = event.matches ? "dark" : "light";
        localStorage.setItem("theme", theme.value)
      });
    })

    watch(theme, val => {
      localStorage.setItem("theme", val)
      document.getElementsByTagName("html")[0].setAttribute("theme", val)
    })
    return {
      theme, headFootRoutes, route
    }
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
