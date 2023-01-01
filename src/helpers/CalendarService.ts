import moment from "moment";
import {DateObject, Month, WeekDatesAsObject} from "../types/Calendar";
import { languageSetting } from "../utils/useVocabularies";



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


  getWeekDatesAsObject(week_num: number): WeekDatesAsObject[] {
    return this.getWeekDates(week_num).map(date => {
      const d = date.replaceAll("/", "-")
      //'date' has format of 2022/01/01, but '/' is not ISO standard -> throws deprecated warning
      //See:   https://momentjs.com/docs/#/parsing/string/
      const weekdaysShortEn = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
      const dayJa = this.weekdaysShort[weekdaysShortEn.indexOf( moment(d).format('ddd') )]
      return {
        date: moment(d).format('YYYY/MM/DD'),
        day: moment(d).format('ddd'),
        dayJa: (languageSetting === "ja") ? moment(d).format('ddd') : dayJa,
        week: moment(d, "YYYY-MM-DD").week(),
        month: (languageSetting === "ja") ? (moment(d).month() + 1) + "月" : moment(date).format('MMM'),
        timestamp: moment(d).valueOf()
      }
    })
  }

}
