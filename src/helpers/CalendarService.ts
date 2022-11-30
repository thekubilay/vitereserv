import moment from "moment";
import {DateObject, Month, WeekDatesAsObject} from "../types/Calendar";
import { languageSetting } from "../utils/useVocabularies";

if(languageSetting === "ja") {
  moment.locale("ja", {
    weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]
  });
}else{
  moment.locale("en", {
    weekdays: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    weekdaysShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
  });
}



export default class CalendarService {
  public weekdays: string[] = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
  public weekdaysShort: string[] = ["日", "月", "火", "水", "木", "金", "土"]
  public currentDate: string = moment().format("YYYY年MM月DD日")
  public currentWeek: number = parseInt(moment(new Date()).clone().startOf("isoWeek").format("W"))
  public currentMonth: number = moment(new Date()).month() + 1
  public currentYear: number = moment().year()

  constructor(year: number|null=null) {
    if (year) this.currentYear = year
  }

  test(): string {
//     let mLocal = moment();
//     let mISO = mLocal.clone();
//     let f = 'ddd DD MMM YYYY';
//     console.log('Start date : ' + mLocal.format(f));
//
// // "locale aware" start of week
//     mLocal.startOf("week");
// // ISO start of week
//     mISO.startOf("isoWeek");
//
//
//     console.log('Local start: ' + mLocal.format(f));
//     console.log('ISO week   : ' + mLocal.format("W, YYYY"))
//     console.log('ISO start  : ' + mISO.format(f));
//     console.log('ISO week   : ' + mISO.format("W, YYYY"))

    return ""
  }

  get currentWeekDates(): string[] {
    return this.getWeekDates(this.currentWeek as number);
  }

  get currentWeekDatesAsObject(): DateObject[] {
    return this.getWeekDates(this.currentWeek as number).map(date => {
      return {
        date: moment(date).format('YYYY/MM/DD'),
        day: moment(date).format('ddd'),
        week: this.currentWeek,
        month: this.currentMonth + "月"
      }
    })
  }

  get currentWeeks(): number[] {
    return this.getWeeksOfMonth(this.currentMonth)
  }

  get currentMonthDates(): string[] {
    const dates: string[] = []
    for (const w of this.currentWeeks) {
      this.getWeekDates(w).forEach(d => {
        dates.push(d)
      })
    }
    return dates
  }

  get currentMonthDatesAsObject(): DateObject[] {
    const dates: DateObject[] = []
    for (const w of this.currentWeeks) {
      this.getWeekDates(w).forEach(d => {
        dates.push({
          date: d,
          day: moment(d).format('ddd'),
          week: w,
          month: this.currentMonth + "月"
        })
      })
    }
    return dates
  }

  get weeksByMonths(): number[][] {
    let weeks: number[][] = [];
    moment.months().forEach((month, i) => {
      weeks.push(this.getWeeksOfMonth(i + 1))
    })
    return weeks
  }

  get calendar(): Month[] {
    return moment.months().map((month, index) => {
      return this.getMonthDatesObject(index + 1)
    }) as []
  }


  getWeeksOfMonth(month: number = 1): number[] {
    const firstDayOfMonth = moment(this.currentYear+"-"+month, 'YYYY-MM-DD');
    const numOfDays = firstDayOfMonth.daysInMonth();
    let weeks = new Set();

    for(let i = 0; i < numOfDays; i++){
      const currentDay = moment(firstDayOfMonth, 'YYYY-MM-DD').add(i, 'days');
      weeks.add(currentDay.isoWeek());
    }
    return [...weeks] as number[]
  }

  getWeekDates(week_num: number): string [] {
    let len = 7
    const date = moment().isoWeek(week_num).startOf("week");
    const result = [];

    while (len--) {
      result.push(date.format('YYYY/MM/DD'));
      date.add(1, "day")
    }

    return result;
  }

  getMonthDates(month: number): string[] {
    const dates: string[] = []
    this.getWeeksOfMonth(month).forEach(week => {
      this.getWeekDates(week).forEach(date => {
        dates.push(date)
      })
    })

    return dates
  }

  getMonthDatesObject(month: number): DateObject[] {
    const dates: DateObject[] = []
    this.getWeeksOfMonth(month).forEach(week => {
      this.getWeekDates(week).forEach(date => {
        dates.push({
          date: date,
          day: moment(date).format('ddd'),
          week: week,
          month: month + "月"
        })
      })
    })

    return dates
  }

  getWeekDatesAsObject(week_num: number): WeekDatesAsObject[] {
    return this.getWeekDates(week_num).map(date => {
      //'date' has format of 2022/01/01, but '/' is not ISO standard -> throws deprecated warning
      //See:   https://momentjs.com/docs/#/parsing/string/
      const weekdaysShortEn = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
      const dayJa = this.weekdaysShort[weekdaysShortEn.indexOf( moment(date).format('ddd') )]
      return {
        date: moment(date).format('YYYY/MM/DD'),
        day: moment(date).format('ddd'),
        dayJa: (languageSetting === "ja") ? moment(date).format('ddd') : dayJa,
        week: moment(date, "YYYY-MM-DD").week(),
        month: (languageSetting === "ja") ? (moment(date).month() + 1) + "月" : moment(date).format('MMM'),
        timestamp: moment(date).valueOf()
      }
    })
  }

}
