import {ref} from "vue";
import moment from "moment/moment";
import {useRoute} from "vue-router";
import {languageSetting} from "@/utils/useVocabularies";

interface D {
  day: string,
  dayShort: string,
  month: number,
  monthName: string | number,
  date: string,
  date2: string,
  dateJP: string,
  timestamp: number,
}

export default function () {
  if (languageSetting === "ja") {
    moment.updateLocale("ja", {
      weekdays: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
      weekdaysShort: ["月", "火", "水", "木", "金", "土","日"],
      week: {
        dow: 0, // Monday is the first day of the week
        doy: 0 // The week that includes January 1st is the first week of the year
      }
    });
  } else {
    moment.updateLocale("en", {
      weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      weekdaysShort: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      week: {
        dow: 0, // Monday is the first day of the week
        doy: 0 // The week that includes January 1st is the first week of the year
      }
    });
  }


  const route = useRoute()
  const lang = ref("jp");
  const today = ref(moment(new Date()).format("YYYY年MM月DD日"))
  const weekNum = ref(moment().isoWeek())
  const weekDates = ref<D[]>([])
  const year = ref(moment().year())
  const weekdays = ref(["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"])
  const weekdaysShort = ref(["月", "火", "水", "木", "金", "土","日"])
  const weekdaysEN = ref(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
  const weekdaysShortEN = ref(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])


  const getWeekDatesByNum = (num: number = 0): void => {
    weekDates.value = []
    if (num !== 0) weekNum.value += num

    if (weekNum.value === 53) {
      weekNum.value = 1
      year.value += num
    } else if (weekNum.value === 0) {
      weekNum.value = 52
      year.value += num
    }


    let date;
    date = moment().year(year.value).isoWeek(weekNum.value).startOf('isoWeek');

    // if (year.value === 2023 || year.value === 2022) {
    //   if (year.value === 2022){
    //     date = moment().year(year.value + 1).isoWeek(weekNum.value - 1);
    //   } else {
    //     date = moment().year(year.value + 1).isoWeek(weekNum.value);
    //   }
    //
    //   date = date.toString().replace(/^.{4}/, year.value.toString());
    //   date = moment(date)
    // } else {
    //   date = moment().year(year.value).isoWeeks(weekNum.value);
    // }

    for (let i = 0; i < 7; i++) {
      const object = {
        day: lang.value === "ja" ? weekdays.value[i] : weekdaysEN.value[i],
        dayShort: lang.value === "ja" ? weekdaysShort.value[i] : weekdaysShortEN.value[i],
        month: parseInt(date.format('MM')),
        monthName: lang.value === "ja" ? date.format('MM') : date.format('ll').substring(0, 3),
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

    let currentQuery = Object.assign({}, route.query)
    if(currentQuery.year) year.value = Number(currentQuery.year);
    if(currentQuery.week) weekNum.value = Number(currentQuery.week);

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