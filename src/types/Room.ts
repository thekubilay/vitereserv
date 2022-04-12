export interface Room {
  id: string,
  name: string,
  header: string,
  body: string,
  company: number,
  salon: null | number,
  form: number,
  user: string[]
}