export interface Room {
  id: string,
  name: string,
  header: string,
  body: string,
  company: number,
  holidays: string,
  seperated_holidays: SeparatedHoliday[],
  vacancies: Vacancy[],
  times: Time[],
  salon: null | number,
  form: number,
  user: number[],
  [key:string]:string|number|number[]|null|SeparatedHoliday[]|Vacancy[]|Time[]
}
export interface SeparatedHoliday {
  id: number,
  date: Date|string,
}
export interface Vacancy {
  id: number,
  date: string,
  limit: number,
  status_triangle: number,
  tel?: boolean,
  time: string,
  applicants: number[]
}
export interface Time {
  id: number,
  time: string,
}