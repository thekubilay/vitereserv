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
          <form method="post" action="" class="" id="form" name="theForm" ref="formElem">
            <!-- <p id="counter__Wrapper" class="counter__Wrapper for-pc">
              あと<br><span id="counter">12</span>項目
            </p> -->

            <table class="formTable">
            <tbody>
              <tr v-for="(row, rowIdx) in formRows" :key="rowIdx">
                <component v-for="(comp , idx) in row.form_items" 
                    :key="idx" 
                    :index="{one:rowIdx, two:idx}"
                    :is="getComp(comp.type)" 
                    :form="formRows[rowIdx].form_items[idx]" 
                    :modelValue="formModel[rowIdx][idx]"
                    @updateModel="updateModel"
                    @cVal="saveForm()"
                    :error="formRows[rowIdx].form_items[idx]['error']"
                    :showErrors="showErrors"
                />
              </tr>

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
                <button type="button" @click="checkForm" id="submit_button" pr>上記に同意の上、送信</button>
              </li>
            </ul>
{{formModel}}
          </form>
        </div> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, shallowRef, onMounted, ref } from "vue";
import { FormItem, FormRow } from "@/types/Form";
import axios from "axios";
import ENV from "../config"
import useValidation from "@/utils/useValidation";
import FormsFunc from "./Forms"
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  components: {
  },
  setup(){
    interface RadioData {
      name: String,
      value: String
    }
    const formRows = ref<FormRow[]>([]);
    const formElem = ref<any>(null);
    const formModel = ref<Array<Array<string|RadioData|string[]>>>([]);
    const formRules: { (data: any): boolean|string}[][][] = []; //Array of functions
    const textComp = shallowRef<object | null>(null);
    const selectComp = shallowRef<object | null>(null);
    const checkComp = shallowRef<object | null>(null);
    const radioComp = shallowRef<object | null>(null);
    const showErrors = ref(false);
    const {vacancyID,
      formID,
      roomID, 
      hasSessionData,
      getSessionData,
      saveSessionData,
      checkVacancy
      } = FormsFunc()

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
      // 1. Check vacancy
      checkVacancy()

      // 2. Request form data
      const path = ENV.API + "forms/"+formID.value+"/"
      console.log(path)
      axios.get<FormItem[]>(path)
      .then((response) => {
          const data = JSON.parse(JSON.stringify(response.data))
          console.log(data)
          setupForm(data.form_rows)

          //3. Check for session data
          // console.log("session:",getSessionData())
          if(hasSessionData()){
            let d = getSessionData()
            // console.log("load session data ",d)
            // TODO add savechecks
            formModel.value = JSON.parse(d)
          }
      })
      .catch((error) => {
          console.log(error)
      })

    }

    function setupForm(f:FormRow[]):void{
      formRows.value = f
      formRows.value.forEach((row,idx)=>{
        formModel.value.push([]) //TODO How to structure model?
        formRules.push([])
        row.form_items.forEach((item,itemIdx) => {
          formModel.value[idx].push("")
          let rules = getRuleFunctions(item)
          formRules[idx][itemIdx] = rules //TODO How to structure rules?
        })
        
        //@ts-ignore
        row['error'] = ''
      })
    }

    function saveForm(){
      // console.log("saving from to session")
      saveSessionData(JSON.stringify(formModel.value))
    }

    function getRuleFunctions(data:FormItem):{ (data: any): boolean|string}[]{
      const res:{ (data: any): boolean|string}[] = []
      if(data.required){
        res.push(useValidation.required)
      }
      if(!data.rules)
        return res
      const rules = data.rules.replace(" ","").split(",")
      if(rules && rules.length>0){

        rules.forEach((rule,idx)=>{
          if(rule === "email"){
            res.push(useValidation.mailCheck)
          // }else if(rule === "required"){
          //   res.push(useValidation.required)
          // }else if(rule === "password"){
          //   res.push()
          }else if(rule === "kankakukigou"){
            res.push(useValidation.hankakukigouCheck)
          }else if(rule === "kana"){
            res.push(useValidation.kanaCheck)
          }else if(rule === "zipcode"){
            res.push(useValidation.zipCodeCheck)
          }else if(rule === "phonenumber"){
            res.push(useValidation.phoneNumberCheck)
          }else if(rule.startsWith("minlength")){
            let reg = /\(([0-9]+)\)/
            let match = reg.exec(rule)
            if(match && match.length>0){
              let num = parseInt(match[1],10)
              res.push((data: string)=>{
                if(data.length>=num){
                  return true
                }
                return `${num}文字以上を入力してください。`
              })
            }
          }else if(rule .startsWith("maxlength")){
            let reg = /\(([0-9]+)\)/
            let match = reg.exec(rule)
            if(match && match.length>0){
              let num = parseInt(match[1],10)
              res.push((data: string)=>{
                if(data.length<=num){
                  return true
                }
                return `${num}文字以下に入れてください。`
              })
            }
          }
        })
        return res
      }
      return []
    }

    const updateModel = (val: string|string[]|RadioData, indeces: Indeces) => {
      formModel.value[indeces.one][indeces.two] = val;
      validateField(val,indeces)
    }

    const validateField = (val: string|string[]|RadioData,indeces: Indeces):void => {
      const f = formRows.value[indeces.one].form_items[indeces.two]
      for(let i = 0; i<formRules[indeces.one][indeces.two].length; i++){
        const rule = formRules[indeces.one][indeces.two][i]
        let res = rule(val);
        // console.log(res)
        if(typeof res!=="boolean"){
          //@ts-ignore
          f['error'] = res
          return
        }
      }
      //@ts-ignore
      f['error'] = ""
    }

    function checkAllErrors():boolean{
      let res = true
      for(const row of formRows.value){
        for(const item of row.form_items){
          if(item.hasOwnProperty('error')){
            console.log(item.error)
            if(typeof item.error === "string" && item.error.length>0){
              res = false
            }
          }
        }
      }
      console.log(res)
      return res
    }

    const checkForm = () => {
      if(!showErrors.value){//actively validate
        showErrors.value = true;
        formModel.value.forEach((row,idx)=>{
          row.forEach((val, rowIdx) => {
            validateField(val,{one: idx, two: rowIdx})
          })
        })
      }
      if(checkAllErrors()){
        const requestData:FormData = new FormData();
        requestData.append("vacancyID",vacancyID.value.toString())
        // Fill the requestData with key-value pairs
        formModel.value.forEach((row,rowIdx)=>{
          row.forEach((val,idx)=>{
            if(typeof val === "string"){
              // console.log("appending"+formRows.value[idx].label+val)
              requestData.append(formRows.value[rowIdx].form_items[idx].label,val)
            }else if(Array.isArray(val)){
              let res = ""
              for(let v of val){
                res += v+","
              }
              requestData.append(formRows.value[rowIdx].form_items[idx].label,res)
            }else if(typeof val === "object" && val!==null){
              if(val.value){
                requestData.append(formRows.value[rowIdx].form_items[idx].label,val.value as string)
              }
            }

          })

        })
        console.log("ready to send")
        for (var [key, value] of requestData.entries()) { 
          console.log(key, value);
        }
        axios.request({
          method: "post",
          // baseURL: ENV.API,
          url: "applicants/",
          data: requestData,
        }).then((response: any) => {
          console.log(response)
        }).catch((error: Error) => {
          console.error("Server could not accept response"+error)
        })
        // document.querySelector("#theForm").submit()
      }
    }
    // const validate = () => {
    //   for(const f of formRows.value){

    //   }
    // }
    onMounted(() => {
        init()
    })

    return {
      showErrors,
      formRows, formModel,
      getComp, updateModel,
      checkForm, saveForm,
      formElem,
      // validate
    }
  }

})
</script>

<style>

/* ADDED */
#request span.is-danger {
  display: block;
  position: absolute;
  right: 10px;
  top: -5px;
  padding: 5px;
  border-radius: 4px;
  background-color: #ec5700;
  color: white;
  font-size: 1rem;
}
</style>
