export interface DateObject {
  date: string|Date,
  day: string,
  week: number,
  month: string
}

export interface Month {
  weeks_nums: number[]
  weeks: DateObject[][],
  month: string,
  dates: DateObject[]
  year: number

}

export interface Calendar {

}

export interface WeekDatesAsObject {
  date: string,
  day: string,
  month: string,
  week: number
}
