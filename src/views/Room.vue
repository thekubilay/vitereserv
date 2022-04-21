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
          <h2 class="h2">ご予約内容の選択</h2>
          <div class="">
            <section v-if="room" class="menu__Wrapper">
              <h3 class="h3">{{ room.name }}</h3>
              <div class="menu__contents">
                <p class="p1">
                  <span class="list-item">{{ room.header }}</span>
                </p>
              </div>
            </section>

            <section class="calendar__Wrapper">
              <div class="calendar__header flex justify-between align-center">
                <div class="title flex flex-wrap">
                  ご希望の予約日時のボタン
                  <div
                    class="icon__Wrapper flex column justify-center align-center"
                  >
                    <figure class="icon circle">
                      <svg :fill="mainColor" viewBox="0 0 512 512">
                        <path
                          d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
                        ></path>
                      </svg>
                    </figure>
                  </div>
                  <div
                    class="icon__Wrapper flex column justify-center align-center"
                  >
                    <figure class="icon triangle">
                      <svg :fill="mainColor" viewBox="0 0 512 512">
                        <path
                          d="M408.95,482.41H103.05c-37.76,0-72.41-20.12-90.43-52.49A97.36,97.36,0,0,1,15,330.06L172.31, 76.18a98.47,98.47,0,0,1,167.38,0L497,330.06a97.36,97.36,0,0,1,2.37,99.86C481.35,462.29,446.7,482.41, 408.95,482.41ZM256,108.34a19.42,19.42,0,0,0-16.75,9.32L81.94,371.54a19.14,19.14,0,0,0-.52,20.07c4.2, 7.55,12.29,12.05,21.63,12.05H408.95c9.34,0,17.43-4.5,21.63-12.05a19.14,19.14,0,0,0-.52-20.07L272.75, 117.66A19.42,19.42,0,0,0,256,108.34Z"
                        ></path>
                      </svg>
                    </figure>
                  </div>
                  を選択してください
                </div>
                <div class="week flex justify-between align-center">
                  <div class="flex justify-center align-center arrow prev" @click="changeWeek(-1)">
                    <img src="/arrow.svg" />
                  </div>
                  <span v-if="weekDatesObjs"> {{ weekDatesObjs[0].date }}（日） 〜 {{ weekDatesObjs[6].date }}（土） </span>
                  <div class="flex justify-center align-center arrow next" @click="changeWeek(1)">
                    <img src="/arrow.svg" />
                  </div>
                </div>
              </div>
              <div class="calendar__contents">
                <ul class="ul flex">
                  <template v-if="calendarService">
                    <!-- v-for -->
                    <li v-for="(item, idx) in weekDatesObjs" :key="idx" class="week-cell__Wrapper" >
                      <div class="week-cell__header flex column justify-center align-center">
                        <div class="day">{{ item.day }}</div>
                        <div class="date">{{ item.date.slice(5, item.date.length) }}</div>
                      </div>
                      <div class="week-cell__contents flex column justify-center align-center">
                      <!-- 休日の場合 -->
                      <div v-if="holidays.includes(item.day) || separatedHolidaysCheck(item.date) || pastTimeCheck(item.timestamp)" class="sec">
                        <div class="btn_select disable">
                          <div class="icon__Wrapper noflame">
                            <figure class="icon bar" >
                              <svg fill="#c2c2c2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 3.92"><defs></defs><rect class="cls-1" width="32" height="3.92"/></svg>
                            </figure>
                          </div>
                          <p v-if="holidays.includes(item.day) || separatedHolidaysCheck(item.date) " class="time">
                            定休日
                          </p>
                        </div>
                      </div>
                      <!-- 休日以外の場合 -->
                      <template v-else-if="room && room.times && room.times.length > 0">
                        <!-- telの場合 -->
                        <!-- <div class="sec">
                          <a class="btn_select">
                            <div class="icon__Wrapper noflame">
                              <figure class="icon tel">
                                <svg
                                  fill="#c2c2c2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 32 32"
                                  style="enable-background: new 0 0 32 32"
                                  xml:space="preserve"
                                >
                                  <g>
                                    <g>
                                      <polygon
                                        class="st0"
                                        points="6.8,12.6 9.4,12.6 9.4,20.7 10.8,20.7 10.8,12.6 13.5,12.6 13.5,11.3 6.8,11.3     "
                                      />
                                      <polygon
                                        class="st0"
                                        points="15.4,16.4 18.7,16.4 18.7,15.1 15.4,15.1 15.4,12.6 18.9,12.6 18.9,11.3 14,11.3 14,20.7 19.1,20.7 19.1,19.4 15.4,19.4     "
                                      />
                                      <polygon
                                        class="st0"
                                        points="21.6,19.4 21.6,11.3 20.1,11.3 20.1,20.7 25.2,20.7 25.2,19.4     "
                                      />
                                    </g>
                                    <path
                                      class="st0"
                                      d="M29.9,7.7c0.2,0,0.4,0.2,0.4,0.4v15.8c0,0.2-0.2,0.4-0.4,0.4H2.1c-0.2,0-0.4-0.2-0.4-0.4V8.1c0-0.2,0.2-0.4,0.4-0.4H29.9 M29.9,6H2.1C0.9,6,0,6.9,0,8.1v15.8C0,25.1,0.9,26,2.1,26h27.8c1.2,0,2.1-0.9,2.1-2.1V8.1C32,6.9,31.1,6,29.9,6L29.9,6z"
                                    />
                                  </g>
                                </svg>
                              </figure>
                            </div>
                            <p class="time">
                              <span>10:00〜<br /><span>11:00</span></span>
                            </p>
                          </a>
                        </div> -->
                        <!-- v-for -->
                          <div v-for="(time, index) in room.times" :key="index" class="sec">
                            <!-- マル -->
                            <div v-if="vacanciesCheck(item.date, time.time).mark==='circle'" class="btn_select" @click="goToForm(item.date, time.time, room)">
                              <div class="icon__Wrapper">
                                <figure class="icon circle">
                                  <svg :fill="mainColor" viewBox="0 0 512 512">
                                    <path
                                      d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
                                    ></path>
                                  </svg>
                                </figure>
                              </div>
                              <p class="time">
                                <span>{{ time.time }}</span>
                              </p>
                            </div>
                            <!-- 三角 -->
                            <div v-else-if="vacanciesCheck(item.date, time.time).mark==='triangle'" class="btn_select" @click="goToForm(item.date, time.time, room)">
                              <div class="icon__Wrapper">
                                <figure class="icon triangle">
                                  <svg :fill="mainColor" viewBox="0 0 512 512">
                                    <path
                                      d="M408.95,482.41H103.05c-37.76,0-72.41-20.12-90.43-52.49A97.36,97.36,0,0,1,15,330.06L172.31, 76.18a98.47,98.47,0,0,1,167.38,0L497,330.06a97.36,97.36,0,0,1,2.37,99.86C481.35,462.29,446.7,482.41, 408.95,482.41ZM256,108.34a19.42,19.42,0,0,0-16.75,9.32L81.94,371.54a19.14,19.14,0,0,0-.52,20.07c4.2, 7.55,12.29,12.05,21.63,12.05H408.95c9.34,0,17.43-4.5,21.63-12.05a19.14,19.14,0,0,0-.52-20.07L272.75, 117.66A19.42,19.42,0,0,0,256,108.34Z"
                                    ></path>
                                  </svg>
                                </figure>
                              </div>
                              <p class="time">
                                <span>{{ time.time }}</span>
                              </p>
                            </div>
                            <!-- 残席ゼロ -->
                            <div v-else-if="vacanciesCheck(item.date, time.time).mark==='cross'" class="btn_select disable">
                              <div class="icon__Wrapper noflame">
                                <figure class="icon cross">
                                  <svg fill="#c2c2c2" viewBox="0 0 512 512">
                                    <path
                                      d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                                    ></path>
                                  </svg>
                                </figure>
                              </div>
                              <p class="time">
                                <span>{{ time.time }}</span>
                              </p>
                            </div>
                            <!-- バー -->
                            <div v-else class="btn_select disable">
                              <div class="icon__Wrapper noflame">
                                <figure class="icon bar" >
                                  <svg fill="#c2c2c2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 3.92"><defs></defs><rect class="cls-1" width="32" height="3.92"/></svg>
                                </figure>
                              </div>
                              <p class="time">
                                <span>{{ time.time }}</span>
                              </p>
                            </div>
                          </div>
                      </template>
                    </div>
                  </li>
                  </template>
                </ul>

                <ul class="icon-list flex flex-wrap">
                  <li class="flex align-center">
                    <svg
                      width="12"
                      height="12"
                      fill="#c2c2c2"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
                      ></path>
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
                  <li class="flex align-center">
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
                  </li>
                  <!-- <li class="flex align-center">
                    <svg
                      width="16"
                      height="16"
                      fill="#c2c2c2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      style="enable-background: new 0 0 32 32"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <polygon
                            class="st0"
                            points="6.8,12.6 9.4,12.6 9.4,20.7 10.8,20.7 10.8,12.6 13.5,12.6 13.5,11.3 6.8,11.3    "
                          />
                          <polygon
                            class="st0"
                            points="15.4,16.4 18.7,16.4 18.7,15.1 15.4,15.1 15.4,12.6 18.9,12.6 18.9,11.3 14,11.3 14,20.7 19.1,20.7 19.1,19.4 15.4,19.4     "
                          />
                          <polygon
                            class="st0"
                            points="21.6,19.4 21.6,11.3 20.1,11.3 20.1,20.7 25.2,20.7 25.2,19.4     "
                          />
                        </g>
                        <path
                          class="st0"
                          d="M29.9,7.7c0.2,0,0.4,0.2,0.4,0.4v15.8c0,0.2-0.2,0.4-0.4,0.4H2.1c-0.2,0-0.4-0.2-0.4-0.4V8.1c0-0.2,0.2-0.4,0.4-0.4H29.9 M29.9,6H2.1C0.9,6,0,6.9,0,8.1v15.8C0,25.1,0.9,26,2.1,26h27.8c1.2,0,2.1-0.9,2.1-2.1V8.1C32,6.9,31.1,6,29.9,6L29.9,6z"
                        />
                      </g>
                    </svg>
                    <span class="">お電話でご予約ください</span>
                  </li> -->
                </ul>
              </div>
              <!-- calendar__contents -->

              <div class="calendar__notice">
                <!-- <ul class="">
                  <li><p class="p1">現在予約できる期間：
                    <span>
                      {{backData.contents.reservation_start_date.slice(0,4)+"年"+backData.contents.reservation_start_date.slice(5,7)+"月"+backData.contents.reservation_start_date.slice(8,10)+"日"}}
                      〜
                      {{backData.contents.reservation_finish_date.slice(0,4)+"年"+backData.contents.reservation_finish_date.slice(5,7)+"月"+backData.contents.reservation_finish_date.slice(8,10)+"日"}}
                    </span>
                  </p>
                  </li>
                  <li><p class="p1">{{period_description}}</p></li>
                </ul> -->
                <p v-if="room" class="p1 left">
                  <span class="list-item">{{ room.body }}</span>
                </p>
              </div>
            </section>
            <!-- calendar__Wrapper -->

            
            <!-- definition__Wrapper -->
          </div>
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
        console.log(vacancy,left)
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
      formatDate, changeWeek, separatedHolidaysCheck, vacanciesCheck, goToForm, pastTimeCheck, closeNotification,
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
  background-color: #6366F1;
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