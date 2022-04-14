<template>
  <main id="main" class="relative">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Forms from "./views/Forms.vue"
import Room from "./views/Room.vue"

export default defineComponent({
  components: {Forms, Room},
  setup(){

    return {}
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
