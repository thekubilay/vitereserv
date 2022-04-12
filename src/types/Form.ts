export interface Form {
  id: number,
  form_items: FormItem[]
  title: string,
  sub_title: string,
  company: number,
  user: number,
}

export interface FormItem{
  id: number,
  label: string,
  titel: string,
  required: boolean,
  type: string,
  hint: null | string,
  row: number,
  column: number,
  width: null | string | number,
  form: number
}