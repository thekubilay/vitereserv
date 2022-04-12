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
  title: string,
  required: boolean,
  type: string,
  hint: null | string,
  placeholder: null | string,
  row: number,
  column: number,
  width: null | string | number,
  form: number
}