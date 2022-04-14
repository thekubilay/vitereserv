export interface Room {
  id: string,
  name: string,
  header: string,
  body: string,
  company: number,
  seperated_holidays: SeparatedHoliday[],
  vacancies: Vacancy[],

  salon: null | number,
  form: number,
  user: number[]
}
export interface SeparatedHoliday {
  id: number,
  date: Date|string,
}
export interface Vacancy {
  id: number,
  date_time?: Date|null,
  date: string,
  left: number,
  limit: number,
  tel: boolean,
  time: string,
}
export interface Time {
  id: number,
  time: string,
}
