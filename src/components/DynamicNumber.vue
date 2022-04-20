<template>
  <div class="flex-column relative">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
      <span v-if="form?.hint" class="td2">({{form.hint}})</span>

    </label>
    <InputNumber 
      :name="form?.label" 
      :id="form?.label" 
      class="w40 center"
      :placeholder="form?.placeholder||''"
      :required="form?.required"
      :maxFractionDigits="0"
      :useGrouping="false"
      @input="$emit('cVal')"
      v-model="localModel"
    />
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
    {{error}}
    </span>
  </div>
  <!-- <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td" :class="{long: form?.width}">

    </td>
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
      {{error}}
    </span>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr> -->

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";
import InputNumber from "primevue/inputnumber"
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  name: "DynamicInput",
  emit: ['updateModel','cVal'],
  components: {
    InputNumber
  },
  props: {
    form: Object as PropType<FormItem>,
    index: Object as PropType<Indeces>,
    modelValue: Number,
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean
  },
  setup(props,{emit}){
    const localModel = ref<number>()
    if(props.modelValue){
      localModel.value = props.modelValue;
    }
    watch(() => localModel.value, (val) => {
      // console.log("number changes")
      emit('updateModel', val, props.index)
    })
    watch(() => props.modelValue, (val) => {
      localModel.value = val
    })
    return {
      localModel
    }
  }
})
</script>
<style>
.formTable input.p-inputnumber-input {
    padding: 8px;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
span.p-inputnumber.p-component {
  font: inherit;
}
</style>
