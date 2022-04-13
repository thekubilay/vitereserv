<template>
  <div id="request" class="form_page">

    <div class="template__Wrapper ">
      <div class="container">
        <h2 class="h2">資料請求者情報の入力</h2>
        <div class="">

          <section class="menu__Wrapper">
            <h3 class="h3" id="project_name">
            </h3>
          </section>
          <form method="post" action="" class="" id="form">
            <p id="counter__Wrapper" class="counter__Wrapper for-pc">
              あと<br><span id="counter">12</span>項目
            </p>

            <table class="formTable">
            <tbody>
              <component v-for="(comp , idx) in myform" :key="idx" :is="getComp(comp.type)" :form="myform[idx]"></component>

            </tbody>
            </table>

            <p id="anquate" class="anquate">よろしければアンケートにお答えください。<span class="hissu">アンケートに答える</span></p>

            <p class="bottom_note">個人情報の取扱いについて<br>
              当サイトより取得した個人情報はプレサンスグループの<a href="https://">個人情報保護方針</a>に従い、適切な取扱いに努めてまいります。<br>
              個人情報保護法に定める例外事項を除き、ご本人の同意を得ることなく第三者に提供、開示いたしません。<br>
              ※このページはSSLを使った暗号化モードで表示されています。
            </p>

            <ul class="submit__Wrapper flex align-center justify-center">
              <li>
                <button type="submit" id="submit_button" >上記に同意の上、送信</button>
              </li>
            </ul>

          </form>
        </div> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, shallowRef, onMounted, ref } from "vue";
import { FormItem } from "@/types/Form";
import axios from "axios";
import ENV from "../config"

export default defineComponent({
  components: {
  },
  setup(){
    const myform = ref<FormItem[]>([])
    const textComp = shallowRef<object | null>(null)
    const selectComp = shallowRef<object | null>(null)
    const checkComp = shallowRef<object | null>(null)
    const radioComp = shallowRef<object | null>(null)


    import("../components/DynamicInput.vue").then(val => {
      textComp.value = val.default;
    })
    import("../components/DynamicSelect.vue").then(val => {
      selectComp.value = val.default;
    })
    import("../components/DynamicCheckBoxes.vue").then(val => {
      checkComp.value = val.default;
    })
    import("../components/DynamicRadio.vue").then(val => {
      radioComp.value = val.default;
    })
    const getComp = (name: string) => {
      if (name === 'text'){
        return textComp.value
      }else if (name === 'select'){
        return selectComp.value
      }else if (name === 'check'){
        return checkComp.value
      }else if (name === 'radio'){
        return radioComp.value
      }else{
        return textComp.value
      }
    }

    function init(){
        axios.get<FormItem[]>(ENV.API + "/forms.json")
        .then((response) => {
            const data = JSON.parse(JSON.stringify(response.data))
            myform.value = data.form_items
        })
        .catch((error) => {
            console.log(error)
        })
    }

    onMounted(() => {
        init()
    })

    return {
      myform,
      getComp
    }
  }

})
</script>

<style scoped>

</style>