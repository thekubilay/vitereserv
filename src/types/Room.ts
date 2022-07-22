export interface Room {
  id: string,
  name: string,
  header: string,
  body: string,
  company: number,
  holidays: string,
  separate_holidays: SeparatedHoliday[],
  vacancies: Vacancy[],
  form: number,
  active: boolean,
  rest: boolean,
  settings: Settings,
  email_template?: number,
  users: number[]
  [key:string]:string|number|number[]|null|SeparatedHoliday[]|Vacancy[]|Time[]|boolean|Settings|undefined
}

export interface SeparatedHoliday {
  id: number,
  date: Date|string,
  room: number
}
export interface Vacancy {
  id: number,
  date: string,
  limit: number,
  status_triangle: number,
  tel?: boolean,
  date_time_start: string,
  date_time_end: string,
  applicants: number[],
  room: number
}
export interface Time {
  id: number,
  time: string,
}

export interface Error {
  title: string,
  text: string
}

export interface Settings {
  id: number,
  time_start: string,
  time_end: string,
  room: number
}

export interface PageContents {
  src: string,
  class: string,
  alt: string,
}
