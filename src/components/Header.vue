<template>
  <header id="app_header" class="flex justify-center">
    <div class="header-content flex justify-space-between">
      <a href="/" class="part flex align-center" id="brand">
        <img id="logo" src="/viterve_logo2.png" alt="logo">
      </a>
      <div class="button-group flex align-center">
        <ThemeButton v-model:theme="innerTheme"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, watch, onMounted} from "vue";
import ThemeButton from "./ThemeButton.vue";
export default defineComponent({
  name: "Header",
  components: {ThemeButton},
  props: {
    theme: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props,{emit}){
    const innerTheme = ref<string>(props.theme)

    watch(()=> innerTheme.value,val => {
      emit("update:theme",val)
    })

    return {
      innerTheme
    }
  }
})
</script>
<style scoped>
header#app_header {
  z-index: 10;
  min-height: 66px;
  padding: 0 0;
  /* border-bottom: 1px solid #f1f2f6; */
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.05);
}

header#app_header .header-content {
  max-width: 1600px;
  width: 100%;
  padding: 0 40px;
}

header#app_header .part {
  height: 100%;
}

header#app_header .part#brand img {
  height: 25px;
}

header[theme="dark"] {
  background-color: #141417;;
}
@media screen and (min-width: 1600px) {
header#app_header .header-content {
  padding: 0 0px;
}
}
@media screen and (max-width: 414px) {
header#app_header .header-content {
  padding: 0 10px;
}
}
</style>