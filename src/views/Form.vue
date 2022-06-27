<template>
  <div id="request" class="form_page flex-column">
    <!-- <VitHeader/> -->
    <div class="template__Wrapper">
      <div class="container relative">
        <LoadingSpinner v-model="isLoading" />
        <div class="relative">
          <section class="flex-column header-subtext">
            <header class="flex justify-space-between">
              <div class="flex-column title-wrapper">
                <h1 class="title">{{ pageTitle || "名前なし" }}</h1>
                
                <span class="timeslot">
                  {{ date.split('-')[0]}}<span>年</span>
                  {{ date.split('-')[1]}}月
                  {{ date.split('-')[2]}}日
                  &nbsp;
                  {{ time.split(':')[0]}}:{{ time.split(':')[1]}}
                </span>

              </div>
              <div class="flex justify-center align-center">
                <div class="back-calendar flex align-center justify-center"  @click="goTo('Room')">
                  <i class="pi pi-calendar"></i>
                  <span class="back-calendar-text">カレンダーへ</span>
                </div>
              </div>
            </header>
          </section>
          <Form
            v-if="Object.keys(dynForm).length > 0"
            v-model:form="dynForm"
            :data="modelData"
            :extraData="extraData"
            :config="config"
            :confirm="false"
            :submit="submit"
            :onComplete="onComplete"
            :onError="onError"
          />
        </div>
      </div>
    </div>
    <!-- <VitFooter/> -->
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, ref, watch, ComputedRef} from "vue";
import {useRouter} from "vue-router";
import {FormItem, FormRow} from "@/types/Form";
import {DynamicFormRow, DynamicForm} from "../components/dynamic-form/types/DynamicForm"
import {Crud} from "../components/dynamic-form/types/Crud"
import Form from "../components/dynamic-form/templates/Form.vue"
import VitFooter from "../components/Footer.vue"
import VitHeader from "../components/Header.vue"
import axios from "axios";
import ENV from "../config"

import FormsFunc from "./Forms"
import useStore from "../helpers/useStore"
import LoadingSpinner from "@/components/loaders/LoadingSpinner.vue"
import { DynamicFormRowColumn } from "@/components/dynamic-form/types/DynamicForm";
import { isRomaji, isKatakana, isMail, isZip, isRomajiWithIrregulars, isNumber, phoneNumberCheck } from "@/components/dynamic-form/helpers/useRules";

interface Extra {
  vacancy?: string,
  date?: string,
  time?: string,
  form?: string,
  room?: string,
}

export default defineComponent({
  components: {
    LoadingSpinner, Form, VitFooter, VitHeader
  },
  setup() {
    const {store} = useStore()
    const dynForm = ref<DynamicForm>({} as DynamicForm);
    const pageTitle = ref<string>("");
    const subTitle = ref<string>("");
    const router = useRouter();
    const extraData = ref<Extra>({vacancy: "",});
    const config = ref<Crud>({method: "POST", url: ENV.API+"applicants/"})
    const isLoading = ref<boolean>(false)
    const time = ref<string>("");
    const date = ref<string>("");
    const modelData = ref<any>();
    let isPageLoaded = false
    const {
      vacancyID,
      cityOptions,
      formID,
      roomID,
      getSessionFormID,
      hasSessionData,
      getSessionData,
      removeSessionData,
      checkVacancy,
      saveSessionData,
    } = FormsFunc()

    async function init(): Promise<void>{
      // 1. Check if vacancy, if not send back to calendar
      checkVacancy()
      try{
        // 2. Request form data
        const path = ENV.API + "forms/" + formID.value + "/"
        isLoading.value = true
        const response = await  axios.get<FormItem[]>(path)
        const data = JSON.parse(JSON.stringify(response.data))
        if (data.title) {
          pageTitle.value = data.title !== "null" ?  data.title.toString() : ""
          document.getElementsByTagName('title')[0].innerHTML = (pageTitle.value)?pageTitle.value:"ビターブ｜予約システム作成・予約管理ならおまかせ｜viterve"
        }
        if (data.sub_title){
          subTitle.value = data.sub_title !== "null" ?  data.sub_title.toString() : ""
        }
        // 2.5 Setup form data
        setupForm(data.form_rows)

        // 3. Check for session data
        loadSession()

        // 4. Get vacancy data
        const response2 =  await axios.get<any>(ENV.API + "vacancies/" + vacancyID.value + "/")
        if(parseInt(response2.data.applicants.length) < parseInt(response2.data.limit)){
          date.value = response2.data.date
          time.value = response2.data.date_time_start.slice( -9, -4 )
          isLoading.value = false
          isPageLoaded = true
          setupExtraData()
        }else{
          throw "予約が上限に達しました。他の日時を選択して下さい。"
        }
      }catch(error){
        isLoading.value = false;
        store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
        console.log(error)
        goTo("Room")
      }
    }

    function getRows(rows: FormRow[]): DynamicFormRow[]{
      const retRows: DynamicFormRow[] = []
      rows.forEach((row:FormRow, idx: number) => {
        retRows.push(
          {
            class: (row.column?`column-${row.column}`:"")+" "+row.classes+" "+(row.column==1?'flex justify-space-between':''),
            columns: getColumns(row.form_items),
            margin: "0 0 16px 0",
          }
        )
      })
      return retRows
    }

    function getColumns(form_items: FormItem[]): DynamicFormRowColumn[]{
      const retColumns:DynamicFormRowColumn[] = []
      form_items.forEach((formItem:FormItem) => {
        let column: DynamicFormRowColumn =
        {
          component: null,
          columnWidth: formItem.width?""+formItem.width:"",
          type: formItem.type,
          model: null,
          required: formItem.required,
          disabled: false,
          name: formItem.title,
          db: formItem.label,
          placeholder: ""+formItem.placeholder,
          class: formItem.column?`column-${formItem.column}-space`:"",
          props: getColumnProps(formItem),//addOptions if available
          errors: [],
          rules: getRulesFunctions(formItem.rules||""),
          options: getColumnOptions(formItem),
          optionValue: "value",
          optionLabel: "label",
          invalid: false,
        }
        retColumns.push(column)
      })
      return retColumns
    }

    function getColumnProps(formItem: FormItem): string[]{
      let res = ["placeholder"]
      if(formItem.options && formItem.options.length>0){
        res.push("options")
        res.push("optionValue")
        res.push("optionLabel")
      }
      return res
    }

    function getColumnOptions(formItem: FormItem): string[]|object[]{
      if(formItem.type === "select"){
        if(formItem.title === "都道府県"){
          return cityOptions
        }
      }
      return formItem.options||[]
    }

    function getRulesFunctions(rules: string): Function[]{
      const r:string[] = rules.replace(" ", "").split(",")
      const res: Function[] = []
      // if (rules && rules.length > 0) {
      r.forEach((rule: string) => {
        if(rule === "katakana"){
          res.push(isKatakana)
        }else if(rule === "email"){
          res.push(isMail)
        }else if(rule === "zipcode"){
          res.push(isZip)
        }else if(rule === "number"){
          res.push(isNumber)
        }else if(rule === "tel"){
          res.push(phoneNumberCheck)
        }else if(rule === "kana"){
          res.push(isKatakana)
        }else if(rule === "kankakukigou"){
          res.push(isRomajiWithIrregulars)
        }
      })
      return res
    }

    function setupForm(f: FormRow[]): void {
      dynForm.value = {class: "",rows: getRows(f)}
    }

    function setupExtraData(): void{
      extraData.value.vacancy = vacancyID.value.toString()
      extraData.value.date = date.value.toString()
      extraData.value.time = time.value.toString()
      extraData.value.room = roomID.value.toString()
      extraData.value.form = formID.value.toString()
    }

    function saveForm(): void {
      setTimeout(() => {//wait a bit so model is updated first
        let saveData: any = {}
        dynForm.value.rows.forEach(row => {
          row.columns.forEach(column => {
            if (typeof column.model === "boolean") {
              saveData[column.db] = column.model ? "1" : "0"
            } else {
              if (column.model) saveData[column.db] = column.model.toString()
            }
          })
        })
        saveSessionData(JSON.stringify(saveData))
      }, 400)
    }

    function loadSession(): void{
      if (hasSessionData()) {
        let d = JSON.parse(getSessionData())
        let f = getSessionFormID()
        if (f === formID.value.toString()) {
          modelData.value = d;
        }
      }
    }

    const submit = (form: DynamicForm, config: Crud, extraData: any): Promise<any> => {
      isLoading.value = true
      return new Promise<any>((resolve, reject) => {
        const formData = new FormData()
        form.rows.forEach(row => {
          row.columns.forEach(column => {
            if (typeof column.model === "boolean") {
              formData.append(column.db, column.model ? "1" : "0")
            } else {
              if (column.model) formData.append(column.db, column.model.toString())
            }
          })
        })

        const keys = Object.keys(extraData)
        keys.forEach(key => {
          formData.append(key, extraData[key])
        })

        const ul = config.url.length - 1
        if (config.url[ul] !== "/") config.url += "/"
        config.data = formData

        try {
          axios(config).then((response) => {
            isLoading.value = false
            resolve(response)
            reject(false)
          }).catch(error => {
            resolve(error.response)
          })
        } catch (e) {
          console.log("error: " + e)
          reject(false)
        }
      })
    }

    const onError = (): void => {
      isLoading.value = false;
      console.error("Server could not accept response")
      store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
      goTo("Room")
    }

    const onComplete = (response: any): void => {
      setTimeout(()=>{
        isLoading.value = false;
        if(response.data && response.data.status && response.data.status ==="REFUSED"){
          store.SET_ERROR({title: "エラー", text: response.data.info}) // text:  //"予約が上限に達しました。他の日時を選択して下さい。"
          goTo('Room')
        }
        if(response.data && response.data.status && response.data.status ==="OK"){
          removeSessionData()
          goTo('Thanks')
        }
      },600)
    }

    const dateAndTime:ComputedRef<string> = computed(() => {
      if (date.value && time.value) {
        let dateN = date.value.split('-')
        let timeN = time.value.split(':')
        if (dateN.length > 2 && timeN.length > 1) {
          return `${dateN[0]}年 ${dateN[1]}月 ${dateN[2]}日 ${timeN[0]}:${timeN[1]}`
        }
      }
      return ""
    })

    const goTo = (where: string): void => {
      const param = {rid: ""}
      if (where === 'Room') {
        param.rid = roomID.value.toString()
      }
      router.push({
        name: where,
        params: param,
      })
    }

    watch(() => dynForm.value, val =>{
      if(Object.keys(val).length>0 && isPageLoaded){
        saveForm()
      }
    },{deep:true})

    onMounted(() => {
      init()
    })

    return {
      date, time, pageTitle, subTitle, dateAndTime,
      dynForm, modelData,
      extraData,config,
      isLoading, 
      submit, onError, onComplete,
      goTo,
    }
  }

})
</script>
<style scoped>
#request {
  color: rgb(32, 64, 97);
  flex-grow: 1;
  padding-top: 66px;
}
#request .template__Wrapper{
  flex-grow: 1;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}
#request section.header-subtext {
  margin-bottom: 50px;
}

header .title-wrapper {
  padding: 3px 0 3px 15px;
  position: relative;
}
header .title-wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  border-radius: 30px;
  background-color: #6366f1;
}
header .title-wrapper h1.title {
  font-size: 1.3rem;
  margin-bottom: 0px;
}

header .title-wrapper span.timeslot {
  display: inline-block;
  font-size: 0.8rem;
  padding-bottom: 3px;
  font-weight: 600;
  color: #6366f1;
  line-height: 1.1;
}
header .back-calendar {
  height: 34px;
  padding: 4px 14px;
  /* background-color: #F5F6FA; */
  border-radius: 4px;
  /* border: 1px solid #6366f1; */
  border: 1px solid #dcdcdc;
  cursor: pointer;
  color: #6366f1;
}
header .back-calendar i {
  font-size: 0.9rem;
}
header span.back-calendar-text {
  display: inline-block;
  position: relative;
  bottom: 1px;
  margin-left: 8px;
  font-size: 0.85rem;
}

@media screen and (max-width: 414px) {
  header {
    flex-direction: column;
    align-items: start;/*center*/
  }
  header .title-wrapper {
    margin-bottom: 10px;
  }
}
</style>

<style>
/* #request section.header-subtext .page-title {
  font-size: 1.8rem;
  display: inline-block;
} */
/* #request section.header-subtext .page-subtitle {
  font-size: 1.0rem;
  font-weight: 500;
  display: inline-block;
} */

/* p.room-body-summary{
  font-size: 0.75rem;
  margin-top: 20px;
  background-color: #faebd76f;
  padding: 10px;
  border-left: 4px solid #f0932b;
} */

/* @media screen and (max-width: 767px) {
  #request .form-row .form-row-wrapper {
    flex-direction: column;
  }

  #request .form-row .form-row-wrapper .flex-column {
    width: 100%;
  }
} */

/* @media screen and (max-width: 480px) {
  #request .form-row .form-row-wrapper .flex-column {
    width: 100% !important;
  }

  #request button.submit-button {
    width: 100%;
  }
} */
</style>