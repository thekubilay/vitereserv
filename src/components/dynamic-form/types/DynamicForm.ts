type options = string[] | object[]
type varchar = string|number
type model = string|boolean|null|number[]

interface Styles {
  inputHeight?: string,
  columnWidth?: string,
  border?: string,
  borderRadius?: string,
}

interface SelectOptions {
  extra: string,
  form_item: number
  id: number
  label: string
  order_id: number,
  value: string,
}

/* check primevue form props for more information */
interface PrimeVueFormType
{ 
  options?: options|SelectOptions[]
  optionLabel?: varchar,
  optionValue?: varchar,
  appendTo?: string,
  min?: varchar,
  max?: varchar,
  prefix?: string,
  suffix?: string,
  minFractionDigits?: boolean,
  maxFractionDigits?: boolean,
  mode?: string,
  locale?: string,
  previewText?: string,
  sizeLimit?: string,
  accept?: string,
  binary?:boolean,
  separator?: string,
  dateFormat?: string,
  showTime?: boolean,
  hourFormat?: string,
}

export interface DynamicFormRowColumn extends PrimeVueFormType, Styles {
  component: any,
  db: string,
  model: model,
  type: string,
  disabled: boolean,
  required: boolean,
  class?: string,
  depth?: string,
  errors: string[],
  for?: string,
  hint?: string,
  invalid: boolean,
  name?: string,
  placeholder?: string,
  props?: string[],
  rules?: Function[],
}

export interface DynamicFormRow {
  class: string,
  columns: DynamicFormRowColumn[]
  name?: string, // if no column label
  nameWidth?: string, // applies column parts width 100px
  columnsWidth?: string, // applies columns parts width calc(100% - 100px)
  margin?: string, // 10px 0
}

export interface DynamicForm {
  rows: DynamicFormRow[]
  class?: string,
}
