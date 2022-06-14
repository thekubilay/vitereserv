/* primevue component loader */
import {shallowRef} from "vue";
import {DynamicForm} from "../types/DynamicForm";
import {updateModels} from "@/components/dynamic-form/helpers/events";

export const pvcl = (form: DynamicForm, data: any): Promise<boolean> => {
  return new Promise<boolean>((resolve,reject) => {
    const reform: DynamicForm = updateModels(form, data)
    let count: number = 0;
    reform.rows.forEach(row => {
      row.columns.forEach(column => {
        switch (column.type) {
          case "text":
            return import("primevue/inputtext").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "number":
            /* number input needs to be imported in main ts as well*/
            return import("primevue/inputnumber").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "checkbox":
            return import("primevue/checkbox").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "select":
            return import("primevue/dropdown").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "radio":
            return import("primevue/radiobutton").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "multipleselect":
            return import("primevue/multiselect").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "multiple":
            return import("primevue/multiselect").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "textarea":
            return import("primevue/textarea").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "calendar":
            return import("primevue/calendar").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "autocomplete":
            return import("primevue/autocomplete").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          case "password":
            return import("primevue/password").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
          default:
            return import("primevue/inputtext").then((component) => {
              column.component = shallowRef<any>(component.default)
            })
        }
      })
      count+=1
    })

    if (count===form.rows.length) resolve(true)
    else reject(false)
  })
}
