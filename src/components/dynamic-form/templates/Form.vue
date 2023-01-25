<template>
  <div id="df" class="dynamic-form">

    <div v-if="tabs.length" class="f-header">
      <button v-for="(tab, idx) in tabs" :key="idx" @click="changeTab(emits, tab)" class="tab-btn">{{ tab }}</button>
    </div>


    <div class="f-body relative">
      <transition name="slideDown" mode="in-out">
        <div class="placeholder" v-if="!components">
          <Skeleton width="100px"></Skeleton>
          <div class="flex justify-space-between">
            <Skeleton width="48%" height="36px"></Skeleton>
            <Skeleton width="48%" height="36px"></Skeleton>
          </div>
          <Skeleton width="100px"></Skeleton>
          <div class="flex justify-space-between">
            <Skeleton width="48%" height="36px"></Skeleton>
            <Skeleton width="48%" height="36px"></Skeleton>
          </div>
          <div class="flex justify-space-between">
            <Skeleton height="36px"></Skeleton>
          </div>
        </div>

        <div v-else class="ctx flex-column align-start">
          <div v-for="(row, idx) in reform.rows" :key="idx" :style="{margin: row.margin}" :class="row.class"
               class="f-row">
            <div v-for="(column, cid) in row.columns" :key="column.db" :class="[column.class]" :style="{width:column.columnWidth}" class="f-r-column">

              <span v-if="column.name" class="f-name flex align-center">
                {{ column.name }}
                <span v-if="column.required" class="required">[{{t('formRequired')}}]</span>
              </span>

              <component @change="useTypeValidation($event, idx, cid)"
                         :is="column.component"
                         v-model="column.model"
                         :style="{height:column.inputHeight, border:column.border, borderRadius:column.borderRadius}"
                         v-bind="setProps(column)"
                         :class="{'p-invalid':column.invalid}"/>

              <span v-if="column.hint" v-html="column.hint" class="f-hint"></span>

              <span v-if="column.invalid" class="f-error">{{ t('formRequireError') }}</span>
              <span v-for="(error, i) in column.errors" :key="i+'error'" class="f-error">{{ error }}</span>
            </div>
          </div>

          <div class="extra-row">
            <slot name="row"></slot>
          </div>

          <!--     server side errors    -->
          <transition name="slideDown" mode="in-out">
            <div v-if="serverSideErrors.length" class="ss-errors">
              <ul class="sse">
                <li v-for="(sse, idx) in serverSideErrors" :key="idx+'sse'">・{{ sse }}</li>
              </ul>
            </div>
          </transition>

          <div class="actions flex justify-end align-center">
            <!-- <button v-if="Object.keys(data).length>0" @click="$emit('update:confirm', true)" class="remove">削除</button> -->
            <button @click="submitter()" class="submit">{{ t('formSubmitButton') }}</button>
          </div>
        </div>

      </transition>
    </div>

  </div>
</template>

<script lang="ts" setup>


import Skeleton from "primevue/skeleton";
import {onBeforeMount, onBeforeUnmount, onMounted, PropType, ref, watch} from "vue";
import {DynamicForm, DynamicFormRow, DynamicFormRowColumn} from "../types/DynamicForm";
import {changeTab, setProps} from "@/components/dynamic-form/helpers/events";
import {useResetErrors, useSubmitValidation} from "@/components/dynamic-form/helpers/useValidation";
import {pvcl} from "@/components/dynamic-form/helpers/usePrimeInputs";
import {Crud} from "../types/Crud";
import { vocabularies } from '../../../utils/useVocabularies';

interface Emits {
  (e: "update:modelValue", modelValue: boolean): void;

  (e: "update:confirm", modelValue: boolean): void;

  (e: "update:form", form: DynamicForm): void;

  (e: "update:tab", tab: string): void;
}

const emits = defineEmits<Emits>()
const props = defineProps({
  form: Object as PropType<DynamicForm>,
  tabs: {type: Array as PropType<string[]>, default: []},
  data: {type: Object as PropType<object>, default: {}},
  extraData: {type: Object as PropType<object>, default: {}},
  confirm: Boolean as PropType<boolean>,
  submit: Function as PropType<any>,
  onError: {
    type: Function as PropType<any>, default: (): void => {
    }
  },
  onComplete: {
    type: Function as PropType<any>, default: (): void => {
    }
  },
  config: Object as PropType<Crud>,
  watchers: {type: Array as PropType<string[]>, default: []}
})

const unwatch = ref<any[]>([])
const components = ref<boolean>(false)
const reform = ref<DynamicForm>({} as DynamicForm)
const syncWatchOnNulls = ref<boolean>(false)
const serverSideErrors = ref<string[]>([])
const { t } = vocabularies();

onMounted((): void => {
  reform.value = props.form as DynamicForm
  pvcl(reform.value as DynamicForm, props.data).then((response) => {
    setTimeout((): void => {
      components.value = response
      setWatchers()
    }, 500)
  })
})

onBeforeUnmount((): void => {
  unwatch.value.forEach(item => item()) // preventing infinite recursivity on watchers
  syncWatchOnNulls.value = false
  reform.value = useResetErrors(reform.value as DynamicForm)
  emits("update:confirm", false)
})

const useTypeValidation = (event: any, rid: number, cid: number): void => {
  if (event.hasOwnProperty("value")) {
    reform.value.rows[rid].columns[cid].invalid = event.value === "" || !event.value
  } else {
    reform.value.rows[rid].columns[cid].invalid = event.target.value === "" || !event.target.value
  }
}

const submitter = (): void => {
  syncWatchOnNulls.value = true
  useSubmitValidation(reform.value as DynamicForm).then((response: { valid: boolean, form: DynamicForm }) => {
    reform.value = response.form
    if (response.valid) {
      props.submit(reform.value, props.config, props.extraData).then((response: any) => {
        if (response.status === 400) {
          /* handles if there is any input error returns from server side */
          const keys: string[] = Object.keys(response.data)
          keys.forEach(key => {
            response.data[key].forEach((item: string) => {
              serverSideErrors.value.push(item)
            })
          })

          props.onError()

        } else {
          props.onComplete(response)
          emits("update:modelValue", false)
        }
      })
    }
  })
}

function setWatchers() {
  if (props.watchers?.length > 0) {
    reform.value.rows.forEach(row => {
      row.columns.forEach(column => {
        props.watchers?.forEach(item => {
          if (column.db === item) {
            unwatch.value.push(watch((): DynamicFormRowColumn => column, (col: DynamicFormRowColumn) => {
              if (col.model === "") col.invalid = (col.model === "" || (!col.model && syncWatchOnNulls.value)) && column.required
              else {
                col.invalid = col.model === "" || (!col.model && syncWatchOnNulls.value && col.required && typeof column.model !== "boolean")
                emits("update:form", reform.value as DynamicForm)
              }
            }, {deep: true}))
          }
        })
      })
    })
  } else {
    reform.value.rows.forEach(row => {
      row.columns.forEach(column => {
        if (column.required) {
          unwatch.value.push(watch((): DynamicFormRowColumn => column, (col: DynamicFormRowColumn) => {
            if (col.model === "") col.invalid = (col.model === "" || (!col.model && syncWatchOnNulls.value)) && column.required
            else {
              col.invalid = col.model === "" || (!col.model && syncWatchOnNulls.value && col.required && typeof column.model !== "boolean")
              emits("update:form", reform.value as DynamicForm)
            }
          }, {deep: true}))
        }
      })
    })
  }
}


</script>
