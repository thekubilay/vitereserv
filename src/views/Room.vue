<template>
    <div id="index" class="main flex-column">
      <transition name="slide-fade" appear>
        <div v-if="isNotification"
              id="notification" class="notification">
          <span class="close" @click="closeNotification()">×</span>
          <h3 class="title">{{errorMessage.title}}</h3>
          <p class="body-text">{{errorMessage.text}}</p>
        </div>
      </transition>
      <div v-if="!isRest" class="template__Wrapper">
        <div class="container">
          <div class="header-container">
            <h1 class="flex-column heading">
              <span class="title block header-text">{{room?.name||"ご予約内容の選択"}}</span>
              <span v-if="room?.header && room?.header !== 'null'" class="sub-title block">{{room?.header}}</span>
            </h1>
            <div class="custom-content header flex-column justify-center align-center" v-if="pageContents.header.length>0">
              <img v-for="(img) in pageContents.header" :class="img.class" :src="ENV.STATIC+img.src" :alt="img.alt">
            </div>
            <p v-if="room?.body && room?.body !== 'null'" class="room-body-summary">{{room?.body}}</p>
          </div>


          <!-- Calendar -->
          <div class="calendar-wrapper">
            <div class="sp-buttons flex justify-center align-center">
              <div class="selected-week-wrapper flex align-center justify-center">
                <button class="flex justify-center align-center arrow prev" @click="changeWeek(-1)">
                  <i class="pi pi-chevron-left"></i>
                </button>
                <button class="flex justify-center align-center arrow next" @click="changeWeek(1)">
                  <i class="pi pi-chevron-right"></i>
                </button>
              </div>
            </div>

            <div class="calendar-dates-header flex justify-space-between align-center">
              <div class="header-btn-wrapper flex justify-center align-center">
                <button class="flex justify-center align-center arrow prev" @click="changeWeek(-1)">
                   <i class="pi pi-chevron-left"></i>
                 </button>
              </div>
              <div class="header-date flex-column align-center justify-center" v-for="(weekday, idx) in weekDatesObjs" 
                  :class="{addafter: idx+1!=weekDatesObjs?.length,today: weekday.date === currentDate}"
                  >
                <div class="header-date-inner flex-column align-center justify-center">
                  <span class="month">{{weekday.month}}</span>
                  <span class="day">{{weekday.date.split('/')[2]}}</span>
                  <span class="weekday">{{weekday.day}}</span>
                </div>
              </div>
              <div class="header-btn-wrapper flex justify-center align-center">
                <button class="flex justify-center align-center arrow next" @click="changeWeek(1)">
                  <i class="pi pi-chevron-right"></i>
                </button>
              </div>
            </div>

            <section class="calendar-outer flex justify-space-between" style="position:relative;">
              <LoadingSpinner v-model="isLoading" relative/>
              <div class="times-wrapper flex-column">
                <!-- <div class="week-cell-header flex">
                </div> -->
                <div class="times-cells flex-column justify-space-between align-center">
                  <div v-for="(time, index) in betweenHours" :key="index" class="time-cell">
                    <div>
                      <p class="sp-time">
                        <span>
                          {{time}}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, idx) in weekDatesObjs" :key="idx" class="weekday-wrapper flex-column" :class="{first : idx === 0}">
                <!-- <div class="week-cell-header flex-column justify-center align-center"
                     :class="{today: item.date === currentDate}">
                  <div class="day">{{ item.day }}</div>
                  <div class="date">{{ item.date.slice(5, item.date.length) }}</div>
                </div> -->

                <div class="week-cell__contents flex-column justify-space-around align-center">
                  <!-- 休日の場合 -->
                  <div v-if="holidays.includes(item.day) || separatedHolidaysCheck(item.date)" class="sec holiday">
                    <p class="holiday flex align-center justify-center">
                      定休日
                    </p>
                  </div>

                  <!-- <div v-else-if="pastTimeCheck(item.timestamp)" class="sec empty">
                    <div class="btn_select disable" style="height: 100%">
                      <div class="icon-wrapper noflame">
                        <figure class="icon cross">
                          <svg fill="#c2c2c2" viewBox="0 0 512 512">
                            <path
                              d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                            ></path>
                          </svg>
                        </figure>
                      </div>
                    </div>
                  </div> -->

                  <template v-else-if="room && betweenHours.length > 0">
                    <div v-for="(time, index) in betweenHours" :key="index" class="sec flex-column justify-center align-center">
                      <!-- マル -->
                      <div v-if="findHourBefore(time, item.date) && vacanciesCheck(item.date, time).mark==='circle' && !pastTimeCheck(item.timestamp,time)" 
                            class="flex-column justify-center btn_select sec-circle" 
                            @click="goToForm(item.date, time, room)">
                        <!-- <p class="time">
                          <span>{{ getPrepTime(time) }}</span>
                        </p> -->
                        <div class="icon-wrapper">
                          <figure class="icon circle">
                            <svg stroke="#6366f1" fill="none" viewBox="0 0 40.00 40.00">
                              <circle class="cls-1" cx="20" cy="20" r="15" />
                            </svg>
                          </figure>
                        </div>
                      </div>
                      <!-- 三角 -->

                      <div v-else-if="findHourBefore(time, item.date) && vacanciesCheck(item.date, time).mark==='triangle'" 
                            class="flex-column justify-center btn_select sec-triangle" 
                            @click="goToForm(item.date, time, room)">
                        <!-- <p class="time">
                          <span>{{ getPrepTime(time) }}</span>
                        </p> -->
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

                      <div v-else class="flex-column justify-center btn_select disable">
                        <!-- <p class="time">
                          <span>{{ getPrepTime(time) }}</span>
                        </p> -->
                        <div class="icon-wrapper noflame">
                          <figure class="icon cross">
                            <svg stroke="#edebe7" fill="none" stroke-linecap="round" viewBox="0 0 40 40">
                              <line class="cls-1" x1="5" y1="5" x2="35" y2="35" />
                              <line class="cls-1" x1="35" y1="5" x2="5" y2="35" />
                            </svg>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>

              </div>

              <div class="times-wrapper right flex-column">
                <!-- <div class="week-cell-header flex">
                </div> -->
                <div class="times-cells flex-column justify-space-between align-center">
                  <div v-for="(time, index) in betweenHours" :key="index" class="time-cell">
                    <div>
                      <p class="sp-time">
                        <span>
                          {{time}}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <div class="calendar-legend flex justify-end" v-if="!isLoading">
              <ul class="icon-list flex flex-wrap">
                <li class="flex align-center">
                  <svg
                    width="12"
                    height="12"
                    fill="#a6cb90"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256,78.77c97.73,0,177.23,79.51,177.23,177.23S353.73,433.23,256,433.23,78.77,353.73,78.77,256,158.27,78.77, 256,78.77M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"></path>
                  </svg>
                  <span class="">予約できます</span>
                </li>
                <!-- <li class="flex align-center">
                  <svg
                    width="14"
                    height="12"
                    fill="#6366f1"
                    fill-opacity="0.7"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M408.95,482.41H103.05c-37.76,0-72.41-20.12-90.43-52.49A97.36,97.36,0,0,1,15,330.06L172.31, 76.18a98.47,98.47,0,0,1,167.38,0L497,330.06a97.36,97.36,0,0,1,2.37,99.86C481.35,462.29,446.7,482.41, 408.95,482.41ZM256,108.34a19.42,19.42,0,0,0-16.75,9.32L81.94,371.54a19.14,19.14,0,0,0-.52,20.07c4.2, 7.55,12.29,12.05,21.63,12.05H408.95c9.34,0,17.43-4.5,21.63-12.05a19.14,19.14,0,0,0-.52-20.07L272.75, 117.66A19.42,19.42,0,0,0,256,108.34Z"
                    ></path>
                  </svg>
                  <span class="">残りわずか</span>
                </li> -->
                <li class="flex align-center">
                  <svg
                    width="9"
                    height="9"
                    fill="#e0deda"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M321.83,256,498.37,79.46a46.55,46.55,0,1,0-65.83-65.83L256,190.17,79.46,13.63A46.55,46.55,0,0,0, 13.63,79.46L190.17,256,13.63,432.54a46.55,46.55,0,0,0,65.83,65.83L256,321.83,432.54,498.37a46.55,46.55, 0,0,0,65.83-65.83Z"
                    ></path>
                  </svg>
                  <span class="">予約できません</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- calendar-wrapper -->
          <!-- <div class="custom-content footer flex-column justify-center align-center" v-if="pageContents.footer.length>0">
            <img v-for="(img) in pageContents.footer" :class="img.class" :src="img.src" :alt="img.alt">
          </div> -->

        </div>
      </div>
      <div v-else-if="isRest" class="maintenance template__Wrapper">
        <div class="container">
          <h2 class="h2">ただいまメンテナンス中です。</h2>
          <div>
            <section class="message__Wrapper">
              <h3 class="h3">ご迷惑をおかけしておりますが、<br>今しばらくお待ちください</h3>
            </section>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onMounted, ref, computed } from "vue";
import useStore from "@/helpers/useStore"
import {useRouter, useRoute, LocationQuery} from "vue-router";
import { Room, SeparatedHoliday, Vacancy, Error, PageContents } from "@/types/Room"
import { WeekDatesAsObject } from "@/types/Calendar";
import axios from "axios";
import ENV from "../config"
import calendarServiceClass from "../helpers/CalendarService";
import LoadingSpinner from "../components/loaders/LoadingSpinner.vue"
import VitFooter from "../components/Footer.vue"
import VitHeader from "../components/Header.vue"
import moment from "moment";
import { useGtm } from "@gtm-support/vue-gtm";

export default defineComponent({
  components: {
    LoadingSpinner, VitFooter, VitHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {store} = useStore()
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
    const betweenHours = ref<string[]>([])
    const currentDate = ref<string | null>(null)
    const isRest = ref<boolean>(false)
    // const currentQuery = ref<LocationQueryRaw | null>(null)
    const gtm = useGtm()

    const pageContents:{header: PageContents[], footer: PageContents[]} = {
      header: [],
      footer: [],
    }
    // Test id,      eSalon id
    if(['637599256','635834411'].includes(route.params.rid as string)){
      pageContents.header = [
        {src: "eSalonImages/esalon_flowofuse.png", class:"pc", alt:""},
        {src: "eSalonImages/esalon_flowofuse_sp.png", class:"sp", alt:""},
        // {src: "eSalonImages/esalon_header.png", class:"pc", alt:""},
        // {src: "eSalonImages/esalon_headersub.png", class:"pc sub", alt:""},
        // {src: "eSalonImages/esalon_header_sp.png", class:"sp", alt:""},
        // {src: "eSalonImages/esalon_headersub_sp.png", class:"sp", alt:""},
      ]
    }

    const currentWeekForDisplay = computed(() => {
      if(weekDatesObjs.value){
        return weekDatesObjs.value[0].date+ "  (" + weekDatesObjs.value[0].day + ")"
      }
      return ""
    })

    const findHourBefore = (param:any, date:string):boolean => {
      // const now: any = moment()
      // const timeFormatted: any = new Date (new Date().toDateString() + ' ' + param.time)
      // const time: any = moment(moment(timeFormatted))

      // const isTimeNotOver: boolean = parseInt(param?.replace(":", "")) - parseInt(now) >= 100;
      // const varDate = new Date(date.replaceAll("/","-"));
      // const today = new Date();
      // if (varDate >= today){
      //   return true
      // } else {
      //   return time.diff(now, "hours") >= 0;
      // }
      return true
    }

    const formatDate = (val:string):string => {
      return val.replaceAll("-", "/")
    }

    const formatTime = (val:string):string => {
      return val.slice( -9, -4 )
    }

    const changeWeek = (num:number):void => {
      if(currentWeek.value){
        currentWeek.value += num
      }
      weekDatesObjs.value = calendarService.value.getWeekDatesAsObject(currentWeek.value as number)
      let currentQuery = Object.assign({}, route.query)
      currentQuery = Object.assign(currentQuery, {week:currentWeek.value})
      router.push({query: currentQuery})
      getRooms();
    }

    const separatedHolidaysCheck = (date:string):Boolean => {
      if(room.value && room.value.separate_holidays){
        return room.value.separate_holidays.some((element: SeparatedHoliday) => formatDate(String(element.date)) === date)
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
        if(left > Number(vacancy.status_triangle)){
          return {id: vacancy.id, mark: "circle"}
        }else if(left <= Number(vacancy.status_triangle) && left > 0){
          return {id: vacancy.id, mark: "triangle"}
        }else if(left  <= 0) {
          return {id: vacancy.id, mark: "cross"}
        }
      }
      return {id: 0, mark: "none"}
    }

    const pastTimeCheck = (timestamp:number,time:string):boolean => {
      const todayTimestamp = moment().unix()*1000//new Date().getTime()
      const targetTime = timestamp+(parseInt(time.split(':')[0]))*3600000
      // console.log(moment(timestamp).format(),(targetTime-todayTimestamp),new Date())
      if(targetTime < todayTimestamp) {
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
      let currentQuery = Object.assign({}, route.query)
      if(vacancy){
        currentQuery = Object.assign(currentQuery, {vacancy: vacancy.id})
        router.push({
          name: "Form",
          params: {rid:route.params.rid, fid:room?.form},
          query: currentQuery
        })
      }
    }

    const closeNotification = () => {
      isNotification.value =! isNotification.value
      store.SET_ERROR(null)
    }

    const getBetweenHours = (start:string, end:string):void => {
      const hours: string[] = []
      let startIdx, endIdx;
      for (let i = 0; i < 24; i++) {
        hours.push(moment(new Date().setHours(0, 0, 0, 0)).add(i, 'hours').format('HH:mm'))
      }
      hours.findIndex((hour, idx) => {
        if (start=== hour) startIdx = idx
        else if (end === hour) endIdx = idx
        else return;
      })
      betweenHours.value = hours.slice(startIdx, endIdx)
    }

    function findVacancy(date:string, time:string):any{
      return vacancies.value.find((element:Vacancy) => {
        return (formatDate(element.date) === date) && (formatTime(element.date_time_start) === time)
      })
    }

    function getRooms(){
      isLoading.value = true
      axios.request({
        method: "get",
        baseURL: ENV.API,
        url: "rooms/" + route.params.rid + "/",
        params: {week: currentWeek.value ? (currentWeek.value) : "0"}
      })
      .then((response) => {
        const data = JSON.parse(JSON.stringify(response.data))
        // if(!data.active){
        //   router.push({ name: "Error"})
        // }
        room.value = data
        isRest.value = data.rest
        holidays.value = data.holidays.includes(",") ? data.holidays.split(",") : [data.holidays]
        vacancies.value = data.vacancies
        document.getElementsByTagName('title')[0].innerHTML = (room.value)?room.value.name:"ビターブ｜予約システム作成・予約管理ならおまかせ｜viterve"
        isLoading.value = false
        getBetweenHours(data.settings.time_start, data.settings.time_end)
        // betweenHours.value = data.times
      })
      .catch((eroor) => {
        isLoading.value = false
        console.log(eroor)
      })
    }

    /**
    * If the query has vacancy when returning from the form, delete it
    * @param {object} currentQuery
    * @return {object} trimed currentQuery
    */
    function deleteQueryVacancy(currentQuery:LocationQuery){
      delete currentQuery.vacancy
      return currentQuery
    }

    function init() {
      calendarService.value = new calendarServiceClass();
      currentWeek.value = calendarService.value.currentWeek
      ////// for query /////
      if(route.query.hasOwnProperty("week") && route.query.week && (currentWeek.value !== Number(route.query.week))){
        currentWeek.value = Number(route.query.week)
      }
      let currentQuery = Object.assign({}, route.query)
      currentQuery = Object.assign(currentQuery, {week: currentWeek.value})
      if(route.query.hasOwnProperty("vacancy") && route.query.vacancy){
        currentQuery = deleteQueryVacancy(currentQuery)
      }
      router.push({query: currentQuery})
      ////// for query end /////
      weekDatesObjs.value = calendarService.value.getWeekDatesAsObject(currentWeek.value as number)
      currentDate.value = calendarService.value.currentDate.replace("年","/").replace("月","/").replace("日","")
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
      if(!gtm?.enabled()){
        gtm?.enable(true)
      }else{
        gtm?.trackEvent({event: 'gtm.init_consent'})
        gtm?.trackEvent({event: 'gtm.init'})
      }
      init()
    })

    return {
      calendarService, currentWeek, weekDatesObjs, room, holidays, vacancies, 
      isNotification, errorMessage, isLoading, mainColor, betweenHours, currentWeekForDisplay, currentDate, isRest, pageContents, ENV,
      formatDate, changeWeek, separatedHolidaysCheck, vacanciesCheck, goToForm, pastTimeCheck, closeNotification, getPrepTime, findHourBefore,
    };
  },
});
</script>

<style scoped>
/* Notification */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  height: auto;
  width: 350px;
  background-color: #e4e5ff;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  z-index: 99;
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
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

/* ルーム */

#index {
  /* height: 100%; */
  background-color: white;
  flex-grow: 1;
  padding-top: 66px;
}

.container{
  max-width:1160px;
  /* min-width: 400px; */
}
.container .calendar-wrapper {
  margin-top: 10px;
}
.container .calendar-wrapper .calendar-outer {
  min-height: 50px;
}

/* --- Header --- */
.container .header-container h1 .title {
  display: inline-block;
  font-size: 1.8rem;
}
.container .header-container h1 .sub-title {
  display: inline-block;
  font-size: 1.0rem;
  font-weight: 500;
}
.container .header-container p.room-body-summary{
  font-size: 0.75rem;
  margin-top: 20px;
  background-color: #faebd76f;
  padding: 10px;
  border-left: 4px solid #f0932b;
}

/* ---- Smartphone buttons ---- */
.calendar-wrapper .sp-buttons{
  display: none;
  margin-top: 14px;
  height: 44px;
}
.calendar-wrapper .sp-buttons .selected-week-wrapper{
  position: relative;
  width: 100%;
  height: 44px;
  /* background-color: #e2e6e9; */
  background-color: #eef2f5;;
  border-radius: 6px;
  padding: 2px;
}
/*.calendar-wrapper .sp-buttons .selected-week-wrapper .currentWeek{
  position: absolute;
  left: 10px;
  font-size: 1rem;
  font-weight: 700;
  color: #5b5ede;
  border-radius: 6px;
} */

/*.calendar-wrapper .sp-buttons .selected-week-wrapper span.week-text{
  color: #555555;
  font-weight: 400;
  padding-bottom: 2px;
}
.calendar-wrapper .sp-buttons .selected-week-wrapper span.week-text > span{
  font-weight:600;
} */


.calendar-wrapper .sp-buttons .selected-week-wrapper .arrow {
  height: 100%;
  padding: 0 10px;
  background-color: #fff;
  color: #778beb;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
  transition: 0.3s;
}
.calendar-wrapper .sp-buttons .selected-week-wrapper .arrow:first-of-type {
  margin-right: 2px;
}
.calendar-wrapper .sp-buttons .selected-week-wrapper .arrow i {
  font-size: 0.9rem;
  position: relative;
  top: 1px;
}

.calendar-wrapper .sp-buttons .selected-week-wrapper .arrow:active{
  transform: translateY(2px);
  /* background-color: rgb(99, 102, 241,0.05); */
}

.calendar-wrapper .sp-buttons .selected-week-wrapper .arrow:hover{
  background-color: #fafafa;
  color: #6366f1;
}

/* ---- Calendar header ---- */


.calendar-dates-header .header-btn-wrapper {
  width: 60px;
}
.calendar-dates-header .header-date {
  height: 120px;
  width: calc((100% - 60px) / 7);
  min-width: 33px;
  margin: 15px 0;
  position: relative;
}
.calendar-dates-header .header-date.addafter::after {
  content: "";
  position: absolute;
  right: 0;
  height: 40%;
  width: 2px;
  border-radius: 30px;
  background-color: #f1f2f6;
}
.calendar-dates-header .header-date .header-date-inner {
  padding: 10px;
}
.calendar-dates-header .header-date.today .header-date-inner {
  background-color: #6366f1;
  border-radius: 10px;
  color: white;
}

/* .calendar-dates-header .header-date .month {} */
.calendar-dates-header .header-date .header-date-inner .day {
  font-size: 1.6rem;
  font-weight: 600;
}
/* .calendar-dates-header .header-date .weekday {} */


/* Calendar buttons for PC */
.calendar-dates-header .header-btn-wrapper button.arrow {
  cursor: pointer;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4f6f9;
  transition: transform 0.15s;
}
.calendar-dates-header .header-btn-wrapper button.arrow.disable {
  opacity: 0.3;
  pointer-events: none;
}
.calendar-dates-header .header-btn-wrapper button.arrow:active{
  transform: translateY(2px);
}

.calendar-dates-header .header-btn-wrapper button.arrow i {
  position: relative;
  top: 1px;
  font-size: 1rem;
  font-weight: 500;
}

/* ----- Calendar content ----- */
.calendar-outer .weekday-wrapper {
  width: calc((100% - 60px) / 7);
}
.calendar-outer .weekday-wrapper .week-cell__contents{
  transition: all 0.3s;
  height: 100%;
}

/* Content time cells */
.calendar-outer .times-wrapper {
  width: 60px;
}

/* .calendar-outer .times-wrapper .week-cell-header {
    position: relative;
    width: auto;
    height: 65px;
    line-height: 1.2;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #f1f2f6;
    background-color: #f5f6fa66;
} */

/*.calendar-outer .times-wrapper .week-cell__contents {
    border-top: none;
    height: 100%;
} */

/* .calendar-outer .times-wrapper .week-cell__contents .sec { */
.calendar-outer .times-wrapper .times-cells .time-cell{
  height: 75px;
  width: 100%;
  margin: 0px auto 0px;
  text-align: center;
  border-top: 1px solid #f1f2f6;
  /* border-bottom: none; */
  /* border-right: 1px solid #f1f2f6; */
  position: relative;
  z-index: 12;
}
.calendar-outer .times-wrapper .times-cells .time-cell::after{
  content: "";
  position: absolute;
  top: -1px;
  width: 50%;
  right: 50%;
  height: 1px;
  background-color: white;
}
.calendar-outer .times-wrapper.right .times-cells .time-cell::after{
  right: auto;
  left: 50%;
}

.calendar-outer .times-wrapper .times-cells p.sp-time {
  font-size: 0.7rem;
  font-weight: 400;
  color: #000000;
  line-height: 1.3;
  /* margin: -10px 0 10px 0; */
  position: absolute;
  top: -0.6rem;
  left: -15%;
  /* transform: translateX(-50%); */
  z-index: 15;
}
.calendar-outer .times-wrapper.times-wrapper.right .times-cells p.sp-time {
  left: auto;
  right: -15%;
}

/* ----- Calendar legend ----- */
.calendar-legend {
  margin-right: 60px;
}
.calendar-legend .icon-list {
  font-size: 0.8rem;
  font-weight: 300;
  margin: 0;
  padding: 10px 10px 10px 0;
  /* border-left: 4px solid rgb(99, 102, 241); */
  /* background-color: rgb(99, 102, 241,0.05); */
}
.calendar-legend .icon-list li {
  margin-left: 8px;
  color: #555;
}

.calendar-legend .icon-list li span{
  padding-left: 5px;
}

/* ---- Media for smart phone ---- */

@media screen and (max-width: 415px){
  .calendar-wrapper .sp-buttons{
    display: block;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
  }
  .calendar-dates-header {
    justify-content: space-around;
  }
  .calendar-dates-header .header-date {
    height: 85px;
  }
  .calendar-dates-header .header-date::after {
    display: none;
    content: none;
  }
  .calendar-dates-header .header-date .header-date-inner{
    padding: 5px;
    font-size: 0.9rem;
  }
  .calendar-dates-header .header-date .header-date-inner .day {
    font-size: 1rem;
  }
  /* Calendar legend */
  .calendar-legend {
    margin: 0;
  }
  .calendar-legend .icon-list {
    border: none;
    justify-content: center;
    background-color: white;
  }

  #index .calendar-outer .times-wrapper.right {
    display: none;
  }
  .calendar-dates-header .header-btn-wrapper {
    display: none;
  }
  #index .calendar-outer .times-wrapper .times-cells .time-cell{
    height: 45px;
  }
}

.custom-content {
  width: 100%;
  padding: 20px 0;
}
.custom-content.header {
  border-bottom: solid 3px #000000;
}
.custom-content.footer {
  border-top: solid 3px #000000;
}
.custom-content img {
  width: 100%;
  height: auto;
}

.custom-content img.sub {
  width: 60%;
  /* padding: 0 40px; */
} 
.custom-content img:not(:first-child) {
  margin-top: 20px;
}
.custom-content img.sp {
  display: none;
}
@media screen and (max-width: 415px){
  .custom-content.header {
    padding: 0 0 15px 0;
  }
  .custom-content.footer {
    padding: 15px 0 0 0;
  }
  .custom-content img {
    width: 100%;
    display: none;
  }
  .custom-content img.sp {
    display: block;
  }
}
</style>


<style>

/* --- Content --- */


#index .weekday-wrapper .week-cell-header {
  position: relative;
  width: auto;
  height: 65px;
  line-height: 1.2;
  margin-bottom: 10px;
  border-bottom: 1px solid #f1f2f6;
  background-color: #f5f6fa66;
}

#index .weekday-wrapper .week-cell-header::before {
  position: absolute;
  content: "";
  right: 0;
  top: 15%;
  width: 1px;
  height: 70%;
  background-color: #f1f2f6;
}

#index .weekday-wrapper:first-child .week-cell-header::before,
#index .weekday-wrapper:last-child .week-cell-header::before {
  display: none;
}

#index .week-cell-header .day {
  font-weight: 500;
}
#index .week-cell-header.today .day {
  background-color: #6366f1;
  color: #fff;
  border-radius: 50%;
  padding: 4px 5px 5px;
  line-height: 1;
}

#index .week-cell-header .date{
  color: #757383;
  font-weight: 500;
  font-size: 0.8rem;
  margin-top: 5px;
}


/* day content cells */
#index .calendar-outer .week-cell__contents .sec {
  height: 100%;
  min-height: 75px;
  width: 100%;
  padding: 3px 3px;
  margin: 0px auto 0px;
  text-align: center;
  border-right: 1px solid #f1f2f6;
  border-bottom: 1px solid #f1f2f6;
}
#index .calendar-outer .weekday-wrapper.first .week-cell__contents .sec {
  border-left: 1px solid #f1f2f6;
}

#index .calendar-outer .week-cell__contents .icon-wrapper{
  background-color: transparent;
  width: 100%;
}

#index .calendar-outer .week-cell__contents .icon {
  width: 45px;
  height: 45px;
  stroke-width: 5px;
}
#index .calendar-outer .week-cell__contents .icon.circle svg {
  padding: 0;
}
#index .calendar-outer .week-cell__contents .icon.bar svg,
#index .calendar-outer .week-cell__contents .icon.circle svg,
#index .calendar-outer .week-cell__contents .icon.triangle svg,
#index .calendar-outer .week-cell__contents .icon.cross svg{
  width: 100%;
  height: 100%;
}

#index .calendar-outer .week-cell__contents p.time {
  display: inline;
  font-size: 1.1rem;
  line-height: 1.3;
  margin: 0px 0 5px 0;
  transition: all 0.3s;
}

#index .calendar-outer .week-cell__contents .sp-sec .space{
  height: 60px;
}

#index .calendar-outer .week-cell__contents .sec.holiday{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin: 0;
  background-color: #f1f2f652;
  color: #dfe4ea;
}

#index .sec.holiday p{
  width: 90%;
  height: 99%;
  /* margin: 0; */
  font-size: 1.4rem;
  font-weight: bold;
}

#index .calendar-outer .week-cell__contents .sec.empty{
  height: 100%;
}

#index .weekday-wrapper {
  border-top: 1px solid #f1f2f6;
}

#index .weekday-wrapper .sec .btn_select{
  width: 100%;
  height: 100%;
  color: #555;
}

#index .weekday-wrapper .sec .btn_select.sec-circle {
  color: #fff;
  /* background-color: #2ecc71; */
  background-color: #D7FDC9;
  border-radius: 8px;
  /* border-left: 4px solid #16a085; */
}

#index .weekday-wrapper .sec .btn_select.sec-circle svg{
  /* stroke: #fff; */
  stroke: #2ECC71;
  margin: 0;
}

#index .weekday-wrapper .sec .btn_select.disable svg{
  /* stroke: #d5d5d5; */
  /* clouds */
  /* stroke: #ecf0f1; */
  /* lynx white */
  stroke: #f5f6fa; 
  margin: 0;
}

#index .weekday-wrapper .sec .btn_select.sec-circle:hover{
  color: #fff;
  background-color: #2ECC71;
}
#index .weekday-wrapper .sec .btn_select.sec-circle:hover svg{
  stroke: #fff;
}


#index .weekday-wrapper .sec .btn_select.sec-circle:hover p.time{
  margin-left: 10px;
}

#index .weekday-wrapper .sec .btn_select.disable {
  color: #edebe7;
}

/* maintenance */
#index .maintenance h2 {
  margin-top: 100px;
  text-align: center;
}

#index .maintenance h3 {
  font-size: 1.4rem;
  margin-top: 60px;
  text-align: center;
}

@media screen and (max-width: 414px) {
  #index h1 .title{
    text-align: center;
    font-size: 1.5rem;
  }
  #index .header-container h1 .sub-title{
    text-align: center
  }
  #index .weekday-wrapper{
    margin: 0;
    width: 100%;
  }

  #index .week-cell-header{
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 0px;
    height: 50px;
  }
  #index .week-cell-header .date{
    font-size: 0.6rem;
  }

  /* Time */
  #index .calendar-outer .times-wrapper .times-cells p.sp-time {
    left: 0;
    font-weight: 400;
  }
  #index .calendar-outer .times-wrapper .times-cells .time-cell::after {
    width: 80%;
    right: 20%;
  }

  /* --- Calendar css --- */
  #index .calendar-outer .week-cell__contents {
    margin-bottom: 5px;
  }
  #index .calendar-outer .week-cell__contents .icon {
    height: 18px;
    width: 18px;
  }
  #index .calendar-outer .week-cell__contents .icon.circle svg,
  #index .calendar-outer .week-cell__contents .icon.triangle svg,
  #index .calendar-outer .week-cell__contents .icon.cross svg {
    margin: 0;
  }
  #index .calendar-outer .week-cell__contents .icon-wrapper {
    padding: 0;
  }

  #index .top-line{
    flex-direction: column;
    margin-bottom: 10px;
  }

  #index .calendar-outer .week-cell__contents p.sp-time {
    font-size: 0.7rem;
  }
  #index .calendar-outer .week-cell__contents .sec.holiday {
    font-size: 0.7rem;
    border-width: 1px;
    min-width: 35px;
  }
  #index .selected-week-wrapper span.week-text{
    padding-bottom: 1px;
  }

  #index .calendar-outer .week-cell__contents .sec {
    min-width: 100%;
    min-height: 45px;
    margin: 0;
    align-items: center;
    padding: 2px;
  }

  #index .sec .btn_select {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-width: 30px;
    height: 40px;
    border-width: 1px;
  }

  #index .week-cell__contents .sec.empty{
    min-height: 0;
  }
  #index .selected-week-wrapper .arrow i{
    font-size: 1.3rem;
  }

  #index .selected-week-wrapper {
    margin-left: 0px;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
  }

  #index .calendar-outer .week-cell__contents p.time {
    display: none;

  }
  #index .sec .btn_select:hover p.time{
    margin-left: 0px;
  }

  #index .calendar-dates-header {
    padding-left: 45px;
    min-width: 290px;
  }
  #index .calendar-outer .times-wrapper {
    min-width: 45px;
  }

}

</style>