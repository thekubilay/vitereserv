type options = string[] | object[]
type varchar = string|number
type model = string|boolean|null|number[]

interface Styles {
  inputHeight?: string,
  columnWidth?: string,
  border?: string,
  borderRadius?: string,
}

/* check primevue form props for more information */
interface PrimeVueFormType {
  options?: options
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
  dateFormat?: string,
  showTime?: boolean,
  hourFormat?: string,
}

export interface DynamicFormRowColumn extends PrimeVueFormType, Styles {
  type: string,
  component: any,
  db: string,
  model: model,
  disabled: boolean,
  required: boolean,
  placeholder?: string,
  name?: string,
  for?: string,
  hint?: string,
  invalid: boolean,
  depth?: string,
  errors: string[],
  props?: string[],
  class?: string,
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
