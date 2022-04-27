export interface Form {
  id: number,
  form_items: FormItem[]
  title: string,
  sub_title: string,
  company: number,
  user: number,
}
export interface FormRow{
  classes: string | null,
  column: number,
  form: number,
  form_items: FormItem[],
  id: number,
  order_id: number,
  title: string,
}

export interface FormItem{
  column: number,
  form_row: number,
  hint: null | string,
  id: number,
  label: string,
  options? : Array<Option>,
  order_od: number,
  placeholder: null | string,
  required: boolean,
  row: number | null,
  rules?: string,
  title: string,
  type: string,
  width: null | string | number,
  error?: string | boolean,
  model: any,
  rulefunctions?: any
  // model: string | object | string[]
}

export interface Option{
  label: string,
  value: string,
  extra?: string,
}