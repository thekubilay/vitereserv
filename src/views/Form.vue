<template>
  <div id="request" class="form_page">
    <div class="template__Wrapper ">
      <div class="container relative">
        <LoadingSpinner v-model="isLoading" text="ローディング中"/>
        <h1 class="header-text">お申込み内容の入力</h1>
        <div class="relative">
          <section class="flex-column header-subtext">
            <h2>{{ pageTitle || "名前なし" }}</h2>
            <!-- <p></p>
            <p>ご利用日時</p> -->
            <p>{{ dateAndTime }}&nbsp;<button class="return-btn" @click="goTo('Room')">日付変更</button>
            </p>
          </section>
          <form method="post" action="" class="h-adr" id="form" name="theForm" ref="formElem">
            <span class="p-country-name" style="display:none;">Japan</span>

            <div v-for="(row, rowIdx) in formRows" :key="rowIdx"
                 class="form-row flex justify-space-between w100"
                 :class="''+row.classes">

              <component v-for="(comp , idx) in row.form_items"
                         :key="idx"
                         :index="{one:rowIdx, two:idx}"
                         :is="getComp(comp.type)"
                         :form="formRows[rowIdx].form_items[idx]"
                         :modelValue="formRows[rowIdx].form_items[idx].model"
                         @updateModel="updateModel"
                         @cVal="saveForm()"
                         :error="formRows[rowIdx].form_items[idx]['error']"
                         :showErrors="showErrors"
                         :class="row.form_items.length>1?'column-'+row.form_items.length+'-space':'w100'"
                         :rowClasses="row.classes"
              />

            </div>
            <div class="form-button-wrapper flex justify-end align-center">
              <button type="button" class="submit-button flex align-center justify-center" @click="checkForm"
                      id="submit_button" :disabled="isLoading">送信する
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, shallowRef, onMounted, ref,} from "vue";
import {FormItem, FormRow} from "@/types/Form";
import axios from "axios";
import ENV from "../config"
import router from "@/router";
import useValidation from "@/utils/useValidation";
import FormsFunc from "./Forms"
import useStore from "../helpers/useStore"
import LoadingSpinner from "../components/loaders/LoadingSpinner.vue"

// import {Core as YubinBangoCore} from 'yubinbango-core'
interface Indeces {
  one: number,
  two: number,
}

interface RadioData {
  name: String,
  value: String
}

export default defineComponent({
  components: {
    LoadingSpinner,
  },
  setup() {
    const {store} = useStore()
    const formRows = ref<FormRow[]>([]);
    const formElem = ref<any>(null);
    // const formModel = ref<Array<Array<string|RadioData|string[]>>>([]);
    const formRules: { (data: any): boolean | string }[][][] = []; //Array of functions
    const textComp = shallowRef<object | null>(null);
    const numberComp = shallowRef<object | null>(null);
    const selectComp = shallowRef<object | null>(null);
    const checkComp = shallowRef<object | null>(null);
    const radioComp = shallowRef<object | null>(null);
    const showErrors = ref<boolean>(false);
    const isLoading = ref<boolean>(false)
    const time = ref<string>("");
    const date = ref<string>("");
    const pageTitle = ref<string>("");
    const {
      vacancyID,
      formID,
      roomID,
      cityOptions,
      hasSessionData,
      getSessionData,
      saveSessionData,
      getSessionForm,
      removeSessionData,
      checkVacancy,
      setupYubinBango,
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
    import("../components/DynamicNumber.vue").then(val => {
      numberComp.value = val.default;
    })
    const getComp = (name: string) => {
      if (name === 'text') {
        return textComp.value
      } else if (name === 'select') {
        return selectComp.value
      } else if (name === 'checkbox') {
        return checkComp.value
      } else if (name === 'radio') {
        return radioComp.value
      } else if (name === 'number') {
        return numberComp.value
      } else {
        return textComp.value
      }
    }

    function init() {
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
          if (data.sub_title) {
            pageTitle.value = data.title !== "null" ?  data.title.toString() : ""
          }
          //2.5 Setup form data
          setupForm(data.form_rows)
          //3. Check for session data
          // console.log("session:",getSessionData())
          if (hasSessionData()) {
            let d_n = getSessionData()
            let d = JSON.parse(d_n)
            // console.log("data",d)
            let f = getSessionForm()
            if (f === formID.value.toString()) {
              for (let i = 0; i < d.length; i++) {
                d[i].forEach((item: any, idx: number) => {
                  if (formRows.value[i] && formRows.value[i].form_items[idx])
                    formRows.value[i].form_items[idx].model = item
                })
              }

              // formModel.value = JSON.parse(d) //TODO add
            }
          }
          //4. Get vacancy data

          axios.get<any>(ENV.API + "vacancies/" + vacancyID.value + "/")
            .then((response2) => {
              // console.log("vacancy:",response2.data)
              date.value = response2.data.date
              time.value = response2.data.time
              isLoading.value = false
              console.log("data", formRows.value)
              setupYubinBango()
            })
            .catch((error2) => {
              isLoading.value = false
              store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
              console.log("vacancy problem")
              goTo("Room")
            })
        })
        .catch((error) => {
          isLoading.value = false;
          store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
          console.log(error)
          goTo("Room")
        })
    }

    function setupForm(f: FormRow[]): void {
      formRows.value = f
      formRows.value.forEach((row, idx) => {
        // formModel.value.push([])
        formRules.push([])
        row.form_items.forEach((item, itemIdx) => {
          if (item.type === "text") {
            item.model = null
            // formModel.value[idx].push("_")
          } else if (item.type === "select") {
            item.model = {label: "", value: ""}
            if (["city", "cities"].includes(item.label)) {
              item.options = cityOptions
            }
            // formModel.value[idx].push({name: "", value: ""})
          } else if (item.type === "number") {
            item.model = null
            // formModel.value[idx].push({name: "", value: ""})
          } else {
            item.model = null
            // formModel.value[idx].push("_")
          }

          let rules = getRuleFunctions(item)
          formRules[idx][itemIdx] = rules
          item['error'] = ''
        })

      })
      // console.log(formRows.value)
    }

    function saveForm() {
      setTimeout(() => {//wait a bit so model is updated first
        // console.log("saving from to session")
        let data: any = []
        formRows.value.forEach((row, idx) => {
          data.push([])
          row.form_items.forEach((item, itemIdx) => {
            data[idx].push(item.model)
          })
        })
        saveSessionData(JSON.stringify(data))
        // console.log(data)
      }, 400)
    }

    function getRuleFunctions(data: FormItem): { (data: any): boolean | string }[] {
      const res: { (data: any): boolean | string }[] = []
      if (data.required) {
        res.push(useValidation.required)
      }
      if (!data.rules)
        return res
      const rules = data.rules.replace(" ", "").split(",")
      if (rules && rules.length > 0) {

        rules.forEach((rule, idx) => {
          if (rule === "email") {
            res.push(useValidation.mailCheck)
            // }else if(rule === "required"){
            //   res.push(useValidation.required)
            // }else if(rule === "password"){
            //   res.push()
          } else if (rule === "kankakukigou") {
            res.push(useValidation.hankakukigouCheck)
          } else if (rule === "kana") {
            res.push(useValidation.kanaCheck)
          } else if (rule === "zipcode") {
            res.push(useValidation.zipCodeCheck)
          } else if (rule === "tel") {
            res.push(useValidation.phoneNumberCheck)
          } else if (rule.startsWith("minlength")) {
            let reg = /\(([0-9]+)\)/
            let match = reg.exec(rule)
            if (match && match.length > 0) {
              let num = parseInt(match[1], 10)
              res.push((data: string) => {
                if (data.length >= num) {
                  return true
                }
                return `${num}文字以上を入力してください。`
              })
            }
          } else if (rule.startsWith("maxlength")) {
            let reg = /\(([0-9]+)\)/
            let match = reg.exec(rule)
            if (match && match.length > 0) {
              let num = parseInt(match[1], 10)
              res.push((data: string) => {
                if (data.length <= num) {
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

    const clearModel = () => {
      // setupYubinBango()
      // testYubin()

      formRows.value.forEach((row, rowIdx) => {
        row.form_items.forEach((item, itemIdx) => {
          if (item.model) {
            if (typeof item.model === "string") {
              formRows.value[rowIdx].form_items[itemIdx].model = ""
            } else if (typeof item.model === "number") {
              formRows.value[rowIdx].form_items[itemIdx].model = null
            } else if (item.type === "select") {
              formRows.value[rowIdx].form_items[itemIdx].model = {label: "", value: ""}
            }
          }
        })
      })
      saveForm()
      // console.log(formRows.value)
    }

    const updateModel = (val: string | string[] | RadioData, indeces: Indeces) => {
      // console.log("update model")
      formRows.value[indeces.one].form_items[indeces.two].model = val;
      validateField(val, indeces)
    }

    const validateField = (val: string | string[] | RadioData, indeces: Indeces): void => {
      const f = formRows.value[indeces.one].form_items[indeces.two]
      for (let i = 0; i < formRules[indeces.one][indeces.two].length; i++) {
        const rule = formRules[indeces.one][indeces.two][i]
        let res = rule(val);
        // console.log(res)
        if (typeof res !== "boolean") {
          f['error'] = res
          return
        }
      }
      f['error'] = ""
    }

    function checkAllErrors(): boolean {
      let res = true
      for (const row of formRows.value) {
        for (const item of row.form_items) {
          if (item.hasOwnProperty('error')) {
            // console.log(item.error)
            if (typeof item.error === "string" && item.error.length > 0) {
              res = false
            }
          }
        }
      }
      // console.log(res)
      return res
    }

    function buildRequestData(): FormData {
      const requestData: FormData = new FormData();

      requestData.append("vacancy", vacancyID.value.toString())
      // requestData.append("vacancy","444")
      requestData.append("date", date.value.toString())
      requestData.append("time", time.value.toString())
      requestData.append("room", roomID.value.toString())
      requestData.append("form", formID.value.toString())
      // Fill the requestData with key-value pairs
      formRows.value.forEach((row, rowIdx) => {
        row.form_items.forEach((val, idx) => {
          if (typeof val.model === "string") {
            // console.log("appending"+formRows.value[idx].label+val)
            requestData.append(formRows.value[rowIdx].form_items[idx].label, val.model)
          } else if (typeof val.model === "number") {
            // console.log("appending"+formRows.value[idx].label+val)
            requestData.append(formRows.value[rowIdx].form_items[idx].label, val.model.toString())
          } else if (Array.isArray(val.model)) {
            let res = ""
            for (let v of val.model) {
              res += v + ","
            }
            requestData.append(formRows.value[rowIdx].form_items[idx].label, res)
          } else if (typeof val.model === "object" && val.model !== null) {
            if (val.model.value) {
              requestData.append(formRows.value[rowIdx].form_items[idx].label, val.model.value as string)
            }
          }

        })

      })
      // console.log(requestData)
      return requestData
    }

    const checkForm = () => {
      if (!showErrors.value) {//actively validate
        showErrors.value = true;
        formRows.value.forEach((row, idx) => {
          row.form_items.forEach((val, rowIdx) => {
            validateField(val.model, {one: idx, two: rowIdx})
          })
        })
      }
      if (checkAllErrors()) {
        const requestData = buildRequestData()

        // console.log("ready to send")
        // for (var [key, value] of requestData.entries()) {
        //   console.log(key, value);
        // }
        isLoading.value = true;
        axios.request({
          method: "post",
          baseURL: ENV.API,
          url: "applicants/",
          data: requestData,
        }).then((response: any) => {
          isLoading.value = false;
          // console.log(response)
          if (response.data && response.data.status) {
            // console.log(response.data.status)
            const status = response.data.status.toString()
            if (status === "OK") {
              removeSessionData()
              goTo('Thanks')
            } else if (status.toLowerCase() === "refused") {
              store.SET_ERROR({title: "エラー", text: response.data.info})
              goTo("Room")
            }
          }
        }).catch((error: Error) => {
          isLoading.value = false;
          console.error("Server could not accept response:" + error)
          store.SET_ERROR({title: "エラー", text: "サーバーのエラーが発生しました。"})
          goTo("Room")
        })

        // document.querySelector("#theForm").submit()
      }
    }

    // function testYubin(){
    //   const zip = document.querySelector("#zip")
    //   new YubinBangoCore(zip, (addr: any)=>{
    //     console.log(addr)
    //   })
    // }

    const dateAndTime = computed(() => {
      if (date.value && time.value) {
        let dateN = date.value.split('-')
        let timeN = time.value.split(':')
        if (dateN.length > 2 && timeN.length > 1) {
          return `${dateN[0]}年 ${dateN[1]}月 ${dateN[2]}日 ${timeN[0]}:${timeN[1]}`
        }
      }
      return ""
    })

    const goTo = (where: string) => {
      const param = {rid: ""}
      if (where === 'Room') {
        param.rid = roomID.value.toString()
      }
      router.push({
        name: where,
        params: param,
      })
    }

    onMounted(() => {
      init()
    })

    return {
      showErrors, isLoading, formRules,
      formElem, date, time, pageTitle,
      formRows, dateAndTime,
      getComp, updateModel,
      checkForm, saveForm, clearModel,
      goTo,
    }
  }

})
</script>

<style>

#request {
  color: rgb(32, 64, 97)
}

#request .w100 {
  width: 100%
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
  margin-bottom: 60px;
}

#request section.header-subtext h2 {
  font-size: 1.6rem;
  margin-bottom: 20px;
}

/* ---- Form ---- */
#request .form-row {
  margin-bottom: 20px;
}

#request .form-row label.label {
  font-size: .85rem;
  margin-bottom: 6px;
  font-weight: 600;
  align-items: center;
  /* color: rgb(54,71,89); */
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

#request .error-wrapper {
  display: flex;
  height: 25px;
}

#request span.is-danger {
  /* display: block; */
  /* position: absolute;
  right: 10px;
  top: -5px; */
  padding: 1px 3px 1px 0;
  border-radius: 0px;
  font-size: .7rem;
  color: #ec5700;
  /* color: white; */
}

#request .p-dropdown {
  padding: 0;
  width: 100%;
  margin-right: 0;
  font: inherit;
  /* border-width: 0 !important; */
  /* border: 1px solid #ccc;
  box-sizing: border-box; */
  /* border-color: #ccc; */
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
}


/* ---Button--- */

#request button.submit-button {
  width: 200px;
  color: #f5f6fa;
  background: radial-gradient(circle, rgba(102, 105, 242, 1) 75%, rgba(88, 91, 210, 1) 100%);
  height: 44px;
  font-weight: 500;
  border-radius: 0px;
  /* padding: 6px 12px; */
  font-size: 1rem;
}

#request .form-button-wrapper {
  margin-top: 50px;
}

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

/* --- Form end --- */
</style>
