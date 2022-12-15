import {ref} from "vue";
import moment from "moment/moment";
import {useRoute} from "vue-router";

interface D {
  day: string,
  dayShort: string,
  month: number,
  monthName: string|number,
  date: string,
  date2: string,
  dateJP: string,
  timestamp: number,
}

export default function () {
  const route = useRoute()
  const lang = ref("jp");
  const today = ref(moment(new Date()).format("YYYY年MM月DD日"))
  const weekNum = ref(moment(new Date()).week() - 1)
  const weekDates = ref<D[]>([])
  const year = ref(moment().year())
  const weekdays = ref(["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"])
  const weekdaysShort = ref(["日", "月", "火", "水", "木", "金", "土"])
  const weekdaysEN = ref(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
  const weekdaysShortEN = ref(["sun", "mon", "tue", "wed", "thu", "fri", "sat"])


  const getWeekDatesByNum = (num: number = 100): void => {
    weekDates.value = []

    if (num !== 100) weekNum.value += num

    if (weekNum.value === 53) {
      weekNum.value = 1
      year.value += num
    } else if (weekNum.value === 0) {
      weekNum.value = 52
      year.value += num
    }

    const date = moment().year(year.value).isoWeek(weekNum.value).startOf("week");

    for (let i = 0; i < 7; i++) {
      const object = {
        day: lang.value === "ja" ? weekdays.value[i] : weekdaysEN.value[i],
        dayShort: lang.value === "ja" ? weekdaysShort.value[i] : weekdaysShortEN.value[i],
        month: parseInt(date.format('MM')),
        monthName: lang.value === "ja" ? date.format('MM') : date.format('ll').substring(0,3),
        date: date.format('YYYY-MM-DD'),
        date2: date.format('YYYY/MM/DD'),
        dateJP: date.format('YYYY年MM月DD日'),
        timestamp: moment(date).valueOf()
      }
      date.add(1, "day")
      weekDates.value.push(object)
    }
  }


  function init() {
    if (route.query?.lang) {
      lang.value = route.query.lang as string
    } else {
      lang.value = window.navigator.language === "ja" ? "ja" : "en"
    }

    getWeekDatesByNum()
  }

  init()

  return {
    today,
    weekdays,
    weekdaysShort,
    weekdaysEN,
    weekdaysShortEN,
    weekNum,
    weekDates,
    year,

    getWeekDatesByNum
  }
}