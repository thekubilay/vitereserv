import {DynamicForm} from "../types/DynamicForm";

export const setProps = (column: any): object => {
  return column.props.reduce((obj: any, key: string) => {
    obj[key] = column[key];
    return obj
  }, {})
}
export const changeTab = (emits:any, tab:string): void => {
  emits("update:tab", tab)
}

export const updateModels = (form:DynamicForm, data: any) => {
  form.rows.forEach(row => {
    row.columns.forEach(column => {
      if (Object.keys(data).length && typeof data[column.db] !== null) {
        if (["multiple", "multiselect"].includes(column.type)){
          if (data[column.db] && data[column.db].length) {
            if (typeof data[column.db] === "string")
              column.model = data[column.db].split(",")
            else {
              if (column.hasOwnProperty("depth")){
                column.model = data[column.db].map((d: any) => {
                  //@ts-ignore
                  return d[column.depth]
                })
              } else {
                column.model = data[column.db]
              }
            }
          }
        } else {
          column.model = data[column.db]
        }
      }
    })
  })
  return form
}
