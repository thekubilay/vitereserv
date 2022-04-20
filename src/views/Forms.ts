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
    sessionStorage.setItem(dataName, data)
    sessionStorage.setItem("form", formID.value.toString())
  }
  const getSessionData = (): any => {
    return sessionStorage.getItem(dataName)
  }
  const getSessionForm = () => {
    return sessionStorage.getItem("form")
  }
  const removeSessionData = () => {
    sessionStorage.removeItem(dataName)
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
    checkVacancy,
    hasSessionData,
    saveSessionData,
    getSessionData,
    getSessionForm,
    removeSessionData,
    setupYubinBango,
  }
}