<template>
  <div id="request" class="form_page flex-column">
    <!-- <VitHeader/> -->
    <div class="template__Wrapper">
      <div class="container relative">
        <LoadingSpinner v-model="isLoading" />
        <!-- <h1 class="header-text">ご予約内容の入力</h1> -->
        <div class="relative">
          <section class="flex-column header-subtext">
            <header class="flex justify-space-between">
              <div class="flex-column title-wrapper">
                <h1 class="title">{{ pageTitle || "名前なし" }}</h1>
                <p>
                  <span class="timeslot">
                    {{ date.split('-')[0]}}<span>年</span>{{ date.split('-')[1]}}月{{ date.split('-')[2]}}日
                    &nbsp;
                    {{ time.split(':')[0]}}:{{ time.split(':')[1]}}
                    &nbsp;
                  </span>
                </p>
              </div>
              <div class="flex justify-center align-center">
                <div class="back-calendar flex align-center justify-center"  @click="goTo('Room')">
                  <i class="pi pi-calendar"></i>
                </div>
              </div>
            </header>
            <!-- <h1 class="flex-column">
              <span class="page-title">
                {{ pageTitle || "名前なし" }}
              </span>
            </h1>
            <p>
              <span class="timeslot">
                {{ date.split('-')[0]}}<span>年</span>{{ date.split('-')[1]}}月{{ date.split('-')[2]}}日
                &nbsp;
                {{ time.split(':')[0]}}:{{ time.split(':')[1]}}
                &nbsp;
              </span>
            <div class="back-btn-wrap">
              <button class="back-btn" @click="goTo('Room')">
                <i class="pi pi-calendar"></i>
                <span class="btn-text">日付変更</span> 
              </button></div>
            </p>
            <p v-if="subTitle && subTitle !== 'null'" class="room-body-summary">{{subTitle}}</p> -->
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

    function init(): void {
      // 1. Check if vacancy, if not send back to calendar
      checkVacancy()

      // 2. Request form data
      const path = ENV.API + "forms/" + formID.value + "/"
      // console.log(path)
      isLoading.value = true
      axios.get<FormItem[]>(path)
        .then((response) => {
          const data = JSON.parse(JSON.stringify(response.data))
          // console.log(data)
          if (data.title) {
            pageTitle.value = data.title !== "null" ?  data.title.toString() : ""
          }
          if (data.sub_title){
            subTitle.value = data.sub_title !== "null" ?  data.sub_title.toString() : ""
          }
          // 2.5 Setup form data
          setupForm(data.form_rows)

          // 3. Check for session data
          loadSession()

          // 4. Get vacancy data
          axios.get<any>(ENV.API + "vacancies/" + vacancyID.value + "/")
            .then((response2) => {
              // console.log("vacancy:",response2.data)
              if(parseInt(response2.data.applicants.length) < parseInt(response2.data.limit)){
                date.value = response2.data.date
                time.value = response2.data.date_time_start.slice( -9, -4 )
                document.getElementsByTagName('title')[0].innerHTML = (pageTitle.value)?pageTitle.value:"ビターブ｜予約システム作成・予約管理ならおまかせ｜viterve"
                isLoading.value = false
                isPageLoaded = true
                setupExtraData()
              }else{
                isLoading.value = false
                isPageLoaded = true
                store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
                goTo("Room")
                }
            })
            .catch((error2) => {
              isLoading.value = false
              isPageLoaded = true
              store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
              console.log(error2)
              goTo("Room")
            })
          // isLoading.value = false
        })
        .catch((error) => {
          isLoading.value = false;
          store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
          console.log(error)
          goTo("Room")
        })
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
    //   if (rules && rules.length > 0) {
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
      // console.log(dynForm.value)
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
        // console.log("saving from to session")
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
        // console.log(data)
      }, 400)
    }

    function loadSession(): void{
      if (hasSessionData()) {
        // console.log("loading session data from browser")
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
      // console.log("error")
      // store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"}) // text: response.data.info
      // goTo("Room")
    }
    const onComplete = (response: any): void => {
      setTimeout(()=>{
        isLoading.value = false;
        // console.log("complete",response)
        removeSessionData()
        goTo('Thanks')
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
        // console.log("form changed")
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
/* .container[theme="dark"] {
  background-color: #16181ad1;;
} */
p .page-btn-wrap{
  display: inline;
  margin-left: 5px;
}

header .title-wrapper {
  padding: 5px 0 5px 15px;
  position: relative;
}
header .title-wrapper::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  border-radius: 30px;
  background-color: #6366f1;
}
header h1.title {
  margin-bottom: 5px;
}
header .title-wrapper p {
  color: #6366f1;
  font-size: 0.7rem;
}

header .back-calendar i{
  /* font-size: 60px; */
  font-size: 32px;
  color: #2ECC71;
}
header .back-calendar {
  /* height: 80px;
  width: 80px; */
  height: 60px;
  width: 60px;
  padding: 6px;
  background-color: #D7FDC9;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<style>

p .page-btn-wrap{
  display: inline;
  margin-left: 5px;
}

#request {
  color: rgb(32, 64, 97);
  /* height: 100%; */
  flex-grow: 1;
  padding-top: 66px;
}

#request .w100 {
  width: 100%
}

#request .template__Wrapper{
  flex-grow: 1;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}

#request button.return-btn {
  color: #fff;
  background-color: rgba(99, 102, 241, 0.7);
  text-align: center;
  padding: 2px 6px 4px;
  margin-left: 4px;
  font-size: 1rem;
  position: relative;
  bottom: 2px;
}

#request button.reset-form {
  color: #fff;
  background-color: #999;
  text-align: center;
  padding: 0px 4px 2px;
  margin-left: 0px;
  font-size: 1rem;
}

#request h1.header-text {
  font-size: 2.5rem;
  margin-bottom: 60px;
}

#request section.header-subtext {
  margin-bottom: 50px;
  /* padding: 0 24px */
}
#request section.header-subtext .timeslot {
  font-size: 1.2rem;
  font-weight: 600;
}

/* #request section.header-subtext h1 {
  font-size: 1.6rem;
  margin-bottom: 20px;
} */

#request section.header-subtext .page-title {
  font-size: 1.8rem;
  display: inline-block;
}
#request section.header-subtext .page-subtitle {
  font-size: 1.0rem;
  font-weight: 500;
  display: inline-block;
}

p.room-body-summary{
  font-size: 0.75rem;
  margin-top: 20px;
  background-color: #faebd76f;
  padding: 10px;
  border-left: 4px solid #f0932b;
}

/* ---- Form ---- */
/* #request .form-row {
  margin-bottom: 20px;
}

#request .form-row label.label {
  font-size: .85rem;
  margin-bottom: 6px;
  font-weight: 600;
  align-items: center;
}

#request .hissu {
  background-color: #e74c3c;
  padding: 0 4px 1px;
  color: #f1f2f6;
  font-size: .67rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
  border-radius: 0px;
}

#request .td2 {
  margin-left: 5px;
  color: #808080;
}
#request .hint {
  font-size: .7rem;
  font-weight: 600;
  color: #929292;
}

#request .error-wrapper {
  display: flex;
}

#request span.is-danger {
  padding: 0px 3px 0px 0;
  border-radius: 0px;
  font-size: .7rem;
  color: #ec5700;
}

#request .p-dropdown {
  padding: 0;
  width: 100%;
  margin-right: 0;
  font: inherit;
  border-radius: 0px;
  background-color: rgba(245, 243, 250, 0.6);
}

#request .p-dropdown .p-inputtext {
  height: 34px;
  line-height: 2.4;
}

#request .p-dropdown .p-dropdown-trigger {
  background-color: rgba(245, 243, 250, 0.6);
}

#request .p-dropdown,
#request .p-inputtext {
  height: 40px;
  width: 100%;
  border-radius: 0px;
  font-size: 1.0rem;
  padding: 0 0 0 10px;
  color: #000;
  background-color: rgba(245, 243, 250, 0.6);
}

#request .p-dropdown {
  padding-left: 0;
}

#request .p-inputtext::placeholder {
  color: rgba(128, 127, 130, .7);
}

#request .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  font-size: 1.4rem;
}

#request .p-checkbox .p-checkbox-box {
  border-radius: 0;
}

#request .checkbox-wrapper {
  margin-right: 8px;
}

#request .flex-column .checkbox-wrapper {
  margin-bottom: 8px;
}

#request .checkbox-wrapper:last-of-type {
  margin-right: 0px;
}

#request .flex-column .checkbox-wrapper:last-of-type {
  margin-bottom: 0;
}

#request .checkbox-wrapper label {
  font-size: 0.8rem;
  margin-left: 4px;
} */


/* ---Button--- */

/* #request button.submit-button {
  width: 200px;
  color: #f5f6fa;
  background: radial-gradient(circle, rgba(102, 105, 242, 1) 75%, rgba(88, 91, 210, 1) 100%);
  height: 44px;
  font-weight: 500;
  border-radius: 0px;
  font-size: 1rem;
}

#request .form-button-wrapper {
  margin-top: 50px;
} */

@media screen and (max-width: 767px) {
  #request .form-row .form-row-wrapper {
    flex-direction: column;
  }

  #request .form-row .form-row-wrapper .flex-column {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  #request .form-row .form-row-wrapper .flex-column {
    width: 100% !important;
  }

  #request button.submit-button {
    width: 100%;
  }
}
@media screen and (max-width: 414px) {
  header {
    flex-direction: column;
    align-items: center;
  }
}

/* --- Form end --- */



</style>
