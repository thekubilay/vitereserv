import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default function() {
  const vacancyID = ref<number>(0);
  const roomID = ref<number>(0);
  const formID = ref<number>(0);
  const route = useRoute();
  const router = useRouter();
  const dataName = "formdata";

  const cityOptions = [
          {"label": "北海道", "value": "北海道", "extra":""},
          {"label": "青森県", "value": "青森県", "extra":""},
          {"label": "岩手県", "value": "岩手県", "extra":""},
          {"label": "宮城県", "value": "宮城県", "extra":""},
          {"label": "秋田県", "value": "秋田県", "extra":""},
          {"label": "山形県", "value": "山形県", "extra":""},
          {"label": "福島県", "value": "福島県", "extra":""},
          {"label": "茨城県", "value": "茨城県", "extra":""},
          {"label": "栃木県", "value": "栃木県", "extra":""},
          {"label": "群馬県", "value": "群馬県", "extra":""},
          {"label": "埼玉県", "value": "埼玉県", "extra":""},
          {"label": "千葉県", "value": "千葉県", "extra":""},
          {"label": "東京都", "value": "東京都", "extra":""},
          {"label": "神奈川県", "value": "神奈川県", "extra":""},
          {"label": "新潟県", "value": "新潟県", "extra":""},
          {"label": "富山県", "value": "富山県", "extra":""},
          {"label": "石川県", "value": "石川県", "extra":""},
          {"label": "福井県", "value": "福井県", "extra":""},
          {"label": "山梨県", "value": "山梨県", "extra":""},
          {"label": "長野県", "value": "長野県", "extra":""},
          {"label": "岐阜県", "value": "岐阜県", "extra":""},
          {"label": "静岡県", "value": "静岡県", "extra":""},
          {"label": "愛知県", "value": "愛知県", "extra":""},
          {"label": "三重県", "value": "三重県", "extra":""},
          {"label": "滋賀県", "value": "滋賀県", "extra":""},
          {"label": "京都府", "value": "京都府", "extra":""},
          {"label": "大阪府", "value": "大阪府", "extra":""},
          {"label": "兵庫県", "value": "兵庫県", "extra":""},
          {"label": "奈良県", "value": "奈良県", "extra":""},
          {"label": "和歌山県", "value": "和歌山県", "extra":""},
          {"label": "鳥取県", "value": "鳥取県", "extra":""},
          {"label": "島根県", "value": "島根県", "extra":""},
          {"label": "岡山県", "value": "岡山県", "extra":""},
          {"label": "広島県", "value": "広島県", "extra":""},
          {"label": "山口県", "value": "山口県", "extra":""},
          {"label": "徳島県", "value": "徳島県", "extra":""},
          {"label": "香川県", "value": "香川県", "extra":""},
          {"label": "愛媛県", "value": "愛媛県", "extra":""},
          {"label": "高知県", "value": "高知県", "extra":""},
          {"label": "福岡県", "value": "福岡県", "extra":""},
          {"label": "佐賀県", "value": "佐賀県", "extra":""},
          {"label": "長崎県", "value": "長崎県", "extra":""},
          {"label": "熊本県", "value": "熊本県", "extra":""},
          {"label": "大分県", "value": "大分県", "extra":""},
          {"label": "宮崎県", "value": "宮崎県", "extra":""},
          {"label": "鹿児島県", "value": "鹿児島県", "extra":""},
          {"label": "沖縄県", "value": "沖縄県", "extra":""}
  ]

  const checkVacancy = ():void => {
    if(route.query.hasOwnProperty("vacancy") && route.query.vacancy)
    {
      vacancyID.value = parseInt(route.query.vacancy.toString(),10)
      roomID.value = parseInt(route.params.rid as string)
      formID.value = parseInt(route.params.fid as string)
      // console.log(vacancyID.value, roomID.value, formID.value)
    }else{
      router.push({path: '/'+route.params.rid+'/'})
    }
  }

  const hasSessionData = () => {
    // console.log("checkfor session",sessionStorage.getItem(dataName))
    return sessionStorage.getItem(dataName)!==null
  }
  const saveSessionData = (data: any) => {
    // console.log(data)
    sessionStorage.setItem(dataName, data)
    sessionStorage.setItem("form", formID.value.toString())
  }
  const getSessionData = (): any => {
    const data = sessionStorage.getItem(dataName)
    // console.log(data)
    return data
  }
  const getSessionForm = () => {
    return sessionStorage.getItem("form")
  }
  const removeSessionData = () => {
    sessionStorage.removeItem(dataName)
    sessionStorage.removeItem("form")
  }

  function setupYubinBango(){
    const zip = document.querySelector("#zip")
    const add1 = document.querySelector("#address1")
    // console.log("yubin",zip,add1)
    if(zip){
      zip.classList.add("p-postal-code")
    }
    if(add1){
      add1.classList.add("p-region")
    }
  }

  return {
    vacancyID,
    formID,
    roomID,
    cityOptions,
    checkVacancy,
    hasSessionData,
    saveSessionData,
    getSessionData,
    getSessionForm,
    removeSessionData,
    setupYubinBango,
  }
}