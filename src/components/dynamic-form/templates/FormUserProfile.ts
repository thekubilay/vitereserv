import {DynamicForm} from "../types/DynamicForm";
import {isRomaji} from "../helpers/useRules";

export const FormUserProfile: DynamicForm = {
  rows: [
    {
      class: "column-1 flex justify-space-between",
      margin: "0 0 16px 0",
      columns: [
        {
          component: null,
          type: "text",
          model: null,
          required: true,
          disabled: false,
          name: "姓",
          db: "last_name",
          placeholder: "田中",
          class: "column-2-space",
          props: ["placeholder","options","optionValue","optionLabel"],//only for for this specific element necessary
          errors:[],
          rules:[isRomaji],
          options: [{name: "abc", value: "lkjad"}],
          optionValue:"name", 
          optionLabel:"value",
          invalid: false,
        },
        {
          component: null,
          type: "text",
          model: null,
          required: true,
          disabled: false,
          name: "名",
          db: "first_name",
          placeholder: "太郎",
          class: "column-2-space",
          props: ["placeholder"],
          errors:[],
          invalid: false,
        },
      ]
    },
    {
      class: "column-1 flex justify-space-between",
      margin: "0 0 16px 0",
      columns: [
        {
          component: null,
          type: "text",
          model: null,
          required: true,
          disabled: false,
          name: "セイ",
          db: "last_name_kana",
          placeholder: "タナカ",
          class: "column-2-space",
          props: ["placeholder"],
          errors:[],
          invalid: false,
        },
        {
          component: null,
          type: "text",
          model: null,
          required: true,
          disabled: false,
          name: "メイ",
          db: "first_name_kana",
          placeholder: "タロウ",
          class: "column-2-space",
          props: ["placeholder"],
          errors:[],
          invalid: false,
        },
      ]
    },
    {
      class: "column-1",
      margin: "0 0 16px 0",
      columns: [
        {
          component: null,
          type: "text",
          model: null,
          required: true,
          disabled: true,
          name: "メールアドレス",
          db: "email",
          placeholder: "タナカ",
          class: "column-1 f-warning",
          hint: "メールアドレスを更新したい場合、マネージャへのご連絡ください。",
          props: ["placeholder", "disabled"],
          errors:[],
          invalid: false,
        },
      ]
    },
  ]
}

