<template>
  <div class="flex-column relative" :style="'width:'+form?.width+';'">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
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
    <div v-if="form && form.hint && form?.hint.length>1" class="hint">
      <span>{{form.hint}}</span>
    </div>
    <span v-if="error && showErrors" class="error-wrapper">
      <span v-if="error && showErrors" class="is-danger">
        {{error}}
      </span>
    </span>
  </div>
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
    },
    showErrors: Boolean,
    rowClasses: String,
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
<style scoped>
</style>
