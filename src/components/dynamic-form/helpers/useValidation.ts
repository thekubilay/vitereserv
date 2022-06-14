import {DynamicForm, DynamicFormRowColumn} from "../types/DynamicForm";

/* checks validation applies or not */
function pass(column: DynamicFormRowColumn): boolean {
  return typeof column.model === "boolean" || !column.required
}


export const useSubmitValidation = (form: DynamicForm): Promise<{ valid: boolean, form: DynamicForm }> => {
  return new Promise<{ valid: boolean, form: DynamicForm }>((resolve, reject) => {
    const errors: string[] = []
    form.rows.forEach(row => {
      row.columns.forEach(column => {
        column.errors = []
        if (column.model && column.hasOwnProperty("rules")){
          column.rules?.forEach(item => {
            let message = item(column.model)
            if (message.length) {
              column.errors.push(message)
              column.invalid = true
              errors.push(column.db)
            }
          })
        }
        if (!pass(column as DynamicFormRowColumn)){
          if (!column.model || column.model===""){
            column.invalid = true
            errors.push(column.db)
          }
        }
      })
    })

    resolve({valid: errors.length === 0, form: form})
  })
}

export const useResetErrors = (form: DynamicForm): DynamicForm => {
  form.rows.forEach(row => {
    row.columns.forEach(column => {
      column.errors = []
      column.invalid = false
      column.model = null
    })
  })

  return form
}
