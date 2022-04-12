import useMainStore from '../stores/main'
import {storeToRefs} from 'pinia'
import {computed, watch} from 'vue'


export default function () {
  const store = useMainStore()
  const appData = computed<any>((): any => {
    return store.room
    // if (store.dataType === "salonType") {
    //   return store.salon || null
    // } else {
    //   return store.project || null
    // }
  })
  return {
    store, appData, 
    ...storeToRefs(store)
  }
}
