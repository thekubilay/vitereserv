<template>
    <div id="index" class="main">
      <transition name="slide-fade" appear>
        <div v-if="isNotification"
              id="notification" class="notification">
          <span class="close" @click="closeNotification()">×</span>
          <h3 class="title">{{errorMessage.title}}</h3>
          <p class="body-text">{{errorMessage.text}}</p>
        </div>
      </transition>

      <LoadingSpinner v-model="isLoading" text="ローディング中"/>
      <div id="overlay" ref="overlay"></div>
      <div class="template__Wrapper">
        <div class="container">
          <div class="header-container">
            <div class="top-line flex">
              <h1 class="header-text">{{room?.name||"ご予約内容の選択"}}</h1>
              <!-- ご予約内容の選択 -->
              <div class="selected-week-wrapper flex align-center">
  
                <div class="flex justify-center align-center arrow prev" @click="changeWeek(-1)">
                  <i class="pi pi-angle-left"></i>
                  <!-- <img src="/arrow.svg" /> -->
                </div>
                <span class="week-text" v-if="weekDatesObjs"> {{ weekDatesObjs[0].date }}（日） 〜 {{ weekDatesObjs[6].date }}（土） </span>
                <div class="flex justify-center align-center arrow next" @click="changeWeek(1)">
                  <i class="pi pi-angle-right"></i>
                  <!-- <img src="/arrow.svg" /> -->
                </div>
  
              </div>
            </div>
            <p class="header-subtext">
              <!-- <h2 v-if="room">{{ room.name }}</h2> -->
              <ul class="icon-list flex flex-wrap">
                  <li class="flex align-center">
                    <svg
                      width="12"
                      height="12"
                      fill="#c2c2c2"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"></path>
                    </svg>
                    <span class="">予約できます</span>
                  </li>
                  <li class="flex align-center">
                    <svg
                      width="14"
                      height="12"
                      fill="#c2c2c2"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M408.95,482.41H103.05c-37.76,0-72.41-20.12-90.43-52.49A97.36,97.36,0,0,1,15,330.06L172.31, 76.18a98.47,98.47,0,0,1,167.38,0L497,330.06a97.36,97.36,0,0,1,2.37,99.86C481.35,462.29,446.7,482.41, 408.95,482.41ZM256,108.34a19.42,19.42,0,0,0-16.75,9.32L81.94,371.54a19.14,19.14,0,0,0-.52,20.07c4.2, 7.55,12.29,12.05,21.63,12.05H408.95c9.34,0,17.43-4.5,21.63-12.05a19.14,19.14,0,0,0-.52-20.07L272.75, 117.66A19.42,19.42,0,0,0,256,108.34Z"
                      ></path>
                    </svg>
                    <span class="">残りわずか</span>
                  </li>
                  <!-- <li class="flex align-center">
                    <svg
                      width="9"
                      height="9"
                      fill="#c2c2c2"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                      ></path>
                    </svg>
                    <span class="">予約できません</span>
                  </li> -->
              </ul>
            </p>
          </div>




          <div class="calender-wrapper">
<!-- new -->
            <section class="calendar-outer flex justify-space-between">
              <div v-for="(item, idx) in weekDatesObjs" :key="idx" class="weekday-wrapper flex-column">
                <div class="week-cell-header flex justify-space-between align-start">
                  <div class="day">{{ item.day }}</div>
                  &nbsp;
                  <div class="date">{{ item.date.slice(5, item.date.length) }}</div>
                </div>

                <div class="week-cell__contents flex column justify-start align-center">
                  <!-- 休日の場合 -->
                  <div v-if="holidays.includes(item.day) || separatedHolidaysCheck(item.date)" class="sec holiday">
                    <p class="holiday flex align-center justify-center">
                      定休日
                    </p>
                  </div>

                  <div v-else-if="pastTimeCheck(item.timestamp)" class="sec empty">
                    <div class="btn_select disable" style="height: 100%">
                      <div class="icon-wrapper noflame">
                        <!-- <figure class="icon cross">
                          <svg fill="#c2c2c2" viewBox="0 0 512 512">
                            <path
                              d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                            ></path>
                          </svg>
                        </figure> -->
                      </div>
                    </div>
                  </div>

                  <template v-else-if="room && room.times && room.times.length > 0">
                      <div v-for="(time, index) in room.times" :key="index" class="sec">
                        <!-- マル -->
                        <div v-if="vacanciesCheck(item.date, time.time).mark==='circle'" class="btn_select" @click="goToForm(item.date, time.time, room)">
                          <p class="time">
                            <span>{{ getPrepTime(time.time) }}</span>
                          </p>
                          <div class="icon-wrapper">
                            <figure class="icon circle">
                              <svg fill="#6366f1" viewBox="0 0 512 512">
                                <path
                                  d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
                                ></path>
                              </svg>
                            </figure>
                          </div>

                        </div>
                        <!-- 三角 -->
                        <div v-else-if="vacanciesCheck(item.date, time.time).mark==='triangle'" class="btn_select" @click="goToForm(item.date, time.time, room)">
                          <p class="time">
                            <span>{{ getPrepTime(time.time) }}</span>
                          </p>
                          <div class="icon-wrapper">
                            <figure class="icon triangle">
                              <svg fill="#6366f1" fill-opacity="0.7" viewBox="0 0 512 512">
                                <path
                                  d="M408.95,482.41H103.05c-37.76,0-72.41-20.12-90.43-52.49A97.36,97.36,0,0,1,15,330.06L172.31, 76.18a98.47,98.47,0,0,1,167.38,0L497,330.06a97.36,97.36,0,0,1,2.37,99.86C481.35,462.29,446.7,482.41, 408.95,482.41ZM256,108.34a19.42,19.42,0,0,0-16.75,9.32L81.94,371.54a19.14,19.14,0,0,0-.52,20.07c4.2, 7.55,12.29,12.05,21.63,12.05H408.95c9.34,0,17.43-4.5,21.63-12.05a19.14,19.14,0,0,0-.52-20.07L272.75, 117.66A19.42,19.42,0,0,0,256,108.34Z"
                                ></path>
                              </svg>
                            </figure>
                          </div>

                        </div>

                        <div v-else class="btn_select disable">
                          <p class="time">
                            <span>{{ getPrepTime(time.time) }}</span>
                          </p>
                          <div class="icon-wrapper noflame">
                            <figure class="icon cross">
                              <svg fill="#edebe7" viewBox="0 0 512 512">
                                <path
                                  d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                                ></path>
                              </svg>
                            </figure>
                          </div>

                        </div>
                      </div>
                  </template>
                </div>

              </div>
            </section>
            
          </div><!-- calendar-wrapper -->
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, ref } from "vue";
import useStore from "@/helpers/useStore"
import {useRouter, useRoute} from "vue-router";
import { Room, SeparatedHoliday, Vacancy, Error } from "@/types/Room"
import { WeekDatesAsObject } from "@/types/Calendar";
import axios from "axios";
import ENV from "../config"
import calendarServiceClass from "../helpers/CalendarService";
import LoadingSpinner from "../components/loaders/LoadingSpinner.vue"

export default defineComponent({
  components: {
    LoadingSpinner
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {store} = useStore()
    const overlay = ref<HTMLElement | null>(null)
    const calendarService = ref()
    const currentWeek = ref<number | null>(null);
    const weekDatesObjs = ref<WeekDatesAsObject[] | null>(null);
    const room = ref<Room | null>(null)
    const holidays = ref<string[]>([])
    const vacancies = ref<Vacancy[]>([])
    const errorMessage = reactive<Error>({
      title: "",
      text: ""
    })
    const isNotification = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    const mainColor: string = "rgb(99, 102, 241)"

    const formatDate = (val:string):string => {
      return val.replaceAll("-", "/")
    }

    const formatTime = (val:string):string => {
      return val.slice( 0, -3 )
    }

    const changeWeek = (num:number):void => {
      overlay.value?.classList.add('active')
      if(currentWeek.value){
        currentWeek.value += num
      }
      weekDatesObjs.value = calendarService.value.getWeekDatesAsObject(currentWeek.value)
      getRooms();
      setTimeout(() => {
        overlay.value?.classList.remove('active')
      }, 100);
    }

    const separatedHolidaysCheck = (date:string):Boolean => {
      if(room.value && room.value.seperated_holidays){
        return room.value.seperated_holidays.some((element: SeparatedHoliday) => formatDate(String(element.date)) === date)
      }
      return false
    }

    interface Mark {
      id: number,
      mark: string,
    }
    const vacanciesCheck = (date:string, time:string):Mark=> {
      const vacancy = findVacancy(date, time)
      if(vacancy) {
        
        const left:number = vacancy.limit - vacancy.applicants.length;
        if(left > vacancy.status_triangle){
          return {id: vacancy.id, mark: "circle"}
        }else if(left <= vacancy.status_triangle && left > 0){
          return {id: vacancy.id, mark: "triangle"}
        }else if(left  <= 0) {
          return {id: vacancy.id, mark: "cross"}
        }
      }
      return {id: 0, mark: "none"}
    }

    const pastTimeCheck = (timestamp:number):boolean => {
      const todayTimestamp = new Date().getTime()
      // ＊Added one day's time to the timestamp
      if(todayTimestamp >= (timestamp + 86400000)) {
        return true
      }
      return false
    }
    const getPrepTime = (time: string) => {
      let splits = time.split(":")
      if(splits.length>1 && splits[1]=="00")
        return splits[0]+"時"
      return time
    }

    const goToForm = (date:string, time:string, room:Room|null) => {
      const vacancy = findVacancy(date, time)
      if(vacancy){
        router.push({
          name: "Form",
          params: {rid:route.params.rid, fid:room?.form},
          query: {vacancy: vacancy.id}
        })
      }
    }

    const closeNotification = () => {
      isNotification.value =! isNotification.value
      store.SET_ERROR(null)
    }

    function findVacancy(date:string, time:string):any{
      return vacancies.value.find((element:Vacancy) => {
        return (formatDate(element.date) === date) && (formatTime(element.time) === time)
      })
    }

    function getRooms(){
      isLoading.value = true
      axios.request({
        method: "get",
        baseURL: ENV.API,
        // baseURL: "http://viterve-env.eba-pwmisykt.ap-northeast-1.elasticbeanstalk.com/api/v1/",
        url: "rooms/" + route.params.rid + "/",
        params: {week: currentWeek.value? currentWeek.value : 0}
      })
      .then((response) => {
        const data = JSON.parse(JSON.stringify(response.data))
        room.value = data
        holidays.value = data.holidays.split(",")
        vacancies.value = data.vacancies
        isLoading.value = false
      })
      .catch((eroor) => {
        isLoading.value = false
        console.log(eroor)
      })
    }

    function deleteQuery(){
      if(route.query){
        router.push({
          name: "Room",
          params: {rid:route.params.rid},
        })
      }
    }

    function init() {
      deleteQuery()
      calendarService.value = new calendarServiceClass();
      currentWeek.value = calendarService.value.currentWeek
      weekDatesObjs.value = calendarService.value.getWeekDatesAsObject(currentWeek.value)
      getRooms();
      if(store.error){
        Object.assign(errorMessage, store.error)
        isNotification.value = true
      }
      // setTimeout(() => {
      //   isNotification.value = true
      // }, 1000)
    }

    onMounted(() => {
      init()
    })

    return {
      overlay, calendarService, currentWeek, weekDatesObjs, room, holidays, vacancies, isNotification, errorMessage, isLoading, mainColor,
      formatDate, changeWeek, separatedHolidaysCheck, vacanciesCheck, goToForm, pastTimeCheck, closeNotification, getPrepTime,
    };
  },
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  height: auto;
  width: 350px;
  background-color: #e4e5ff;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
}
.notification .title {
  padding: 7px 15px;
  color: aliceblue;
  background-color: #ff7979;
  min-height: 38px;
}
.notification .body-text {
  padding: 7px 15px;
  min-height: 80px;
}
.notification > .close {
  z-index: 20;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  color: #e6e6e6;
  font-size: 20px;
  font-weight: 700;
  line-height: 35px;
  text-align: center;
  text-decoration: none;
  text-indent: 0;
  cursor: pointer;
}

.notification > .close:hover {
  color: #b5c4f7;
}

/* アニメーション */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<style>
/* --- Header --- */
#index .header-container{
  margin-bottom: 30px;
}
#index .top-line{
  margin-bottom: 20px;
}
#index h1.header-text {
  display: inline-block;
}


#index .selected-week-wrapper{
  margin-left: 20px
}
#index .selected-week-wrapper span.week-text{
  padding-bottom: 2px;
}
#index .selected-week-wrapper .arrow{
  cursor: pointer;
  padding: 4px;
  /* border: 1px solid black; */
  margin: 0 5px;
}
#index .selected-week-wrapper .arrow i{
  font-size: 1.4rem;
}


#index .icon-list {
  /* -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end; */
  font-size: 0.8rem;
  font-weight: 300;
  margin: 10px 0 10px;
}
#index .icon-list li {
  margin-left: 8px;
  color: #555;
}

#index .icon-list li span{
  padding-left: 5px;
}


/* #index .selected-week-wrapper .arrow:first-of-type{

} */
/* --- Content --- */
#index .weekday-wrapper {
  margin-right: 20px;
  /* transition: all 0.3s; */
}

#index .week-cell__contents{
  transition: all 0.3s;
}

#index .week-cell-header {
  width: auto;
  height: 50px;
  line-height: 1.2;
  text-align: start;
  background-color: white;
  padding-bottom: 30px;
}

#index .week-cell-header .day{
  font-weight: bold;
}

#index .week-cell-header .date{
  font-weight: 300;
  font-size: 0.8rem;
}

/* time content cells */

#index .calendar-outer .week-cell__contents .icon-wrapper{
  min-width: 90px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px 0 1px;
  background-color: none;
  /* background: linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(236,236,236,1) 22%, rgba(255,255,255,1) 100%); */
  /* border: 1px solid #b9b9b9; */
  /* box-shadow: 1px 1px 2px 0px rgb(200 200 200);
  -webkit-box-shadow: 1px 1px 2px 0px rgb(200 200 200);
  -moz-box-shadow: 1px 1px 2px 0px rgb(200 200 200); */
}

#index .calendar-outer .week-cell__contents .icon {
  width: 50px;
  height: 50px;
}

#index .calendar-outer .week-cell__contents .icon.bar svg,
#index .calendar-outer .week-cell__contents .icon.circle svg,
#index .calendar-outer .week-cell__contents .icon.triangle svg,
#index .calendar-outer .week-cell__contents .icon.cross svg{
  width: auto;
  height: auto;
}


#index .calendar-outer .week-cell__contents p.time {
  display: inline;
  font-size: 1.2rem;
  line-height: 1.3;
  margin: 0px 0 10px 0;
  transition: all 0.3s;
}

#index .calendar-outer .week-cell__contents{
  height: 100%;
}

#index .calendar-outer .week-cell__contents .sec {
    min-height: 70px;
    margin: 0px auto 20px;
    text-align: center;
}
#index .calendar-outer .week-cell__contents .sec.holiday{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin: 0;
  background-color: #6366f10f;
  border-top: 2px solid black;
}


#index .sec.holiday p{
  width: 90px;
  margin: 0;
}

#index .calendar-outer .week-cell__contents .sec.holiday{
  font-size: 1.4rem;
  font-weight: bold;
  color: #d5d5d5;
}

#index .calendar-outer .week-cell__contents .sec.empty{
  height: 100%;
} 



#index .sec .btn_select{
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px 0;
  border-top: 2px solid black;
}
#index .sec .btn_select:hover{
  color: rgb(208, 85, 68);
  background-color: #f8f8f6;
  border-color: rgb(208, 85, 68);
}
#index .sec .btn_select:hover p.time{
  margin-left: 10px;
}

/* #index .weekday-wrapper:hover .week-cell__contents{
  background-color: rgb(237,235,231);
} */

#index .weekday-wrapper:hover .week-cell-header{
  border-color: rgb(208, 85, 68);
}






@media screen and (max-width: 767px) {
  #index h1.header-text{
    text-align: center;
  }
  #index .calendar-outer {
    flex-direction: column;
  }
  #index .weekday-wrapper{
    margin: 0;
  }
  #index .calendar-outer .week-cell__contents {
    margin-bottom: 5px;
  }
  #index .top-line{
    flex-direction: column;
    margin-bottom: 10px;
  }
  #index .selected-week-wrapper span.week-text{
    padding-bottom: 1px;
  }
  /* #index .selected-week-wrapper .arrow {
    border: 1px solid black;
  } */
  #index .week-cell__contents .sec.empty{
    min-height: 0;
  }
  #index .selected-week-wrapper .arrow i{
    font-size: 1.7rem;
  }

  #index .selected-week-wrapper {
    margin-left: 0px;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }

  #index .week-cell-header{
    padding-bottom: 5px;
    height: 30px;
  }
}

</style>