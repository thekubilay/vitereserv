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
    if(route.query.hasOwnProperty("vacancyID") && route.query.vacancyID)
    {
      vacancyID.value = parseInt(route.query.vacancyID.toString(),10)
      roomID.value = parseInt(route.params.rid as string)
      formID.value = parseInt(route.params.fid as string)
      console.log(vacancyID.value, roomID.value, formID.value)
    }else{
      router.push({path: '/'+route.params.rid+'/'})
    }
  }

  const hasSessionData = () => {
    console.log("checkfor session",sessionStorage.getItem(dataName))
    return sessionStorage.getItem(dataName)!==null
  }
  const saveSessionData = (data: any) => {
    sessionStorage.setItem(dataName, data)
  }
  const getSessionData = (): any => {
    return sessionStorage.getItem(dataName)
  }
  const removeSessionData = () => {
    sessionStorage.removeItem(dataName)
  }

  return {
    vacancyID,
    checkVacancy,
    hasSessionData,
    saveSessionData,
    getSessionData,
    removeSessionData,
  }
}