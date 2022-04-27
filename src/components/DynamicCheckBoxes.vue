<template>
  <div class="flex-column relative" :style="'width:'+form?.width+';'">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
    </label>
    <div class="checkbox flex" :class="rowClasses">
      <label :for="form.label+'check'" v-if="!form.options || form.options?.length<1">
        <input 
          type="checkbox"
        >
        {{form.title}}
      </label>
      <div v-for="(o,idx) in form?.options" :key="idx" class="checkbox-wrapper flex align-center">
        <Checkbox
          :name="form.label"
          :value="o.value"
          :id="form.label+'check'+idx" 
          @change="$emit('cVal')"
          v-model="localModel"
        />
        <label :for="form.label+'check'+idx">
          {{o.label}}
        </label>
      </div>
    </div>
    <div v-if="form && form.hint && form?.hint.length>1" class="hint">
      <span>{{form.hint}}</span>
    </div>
    <span v-if="error&&error!==true&&showErrors" class="error-wrapper">
      <span v-if="error&&error!==true&&showErrors" class="is-danger">
        {{error}}
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";
import Checkbox from "primevue/checkbox"
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  name: "DynamicCheckBoxes",
  emits: ['updateModel','cVal'],
  props: {
    form: {
      type: Object as PropType<FormItem>,
      required: true
    },
    index: Object as PropType<Indeces>,
    modelValue: [String,Array],
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean,
    rowClasses: String,
  },
  components: {
    Checkbox
  },
  setup(props,{emit}){
    const localModel = ref<string[]>([])
    if(props.modelValue && Array.isArray(props.modelValue)){
      localModel.value = props.modelValue as string[];
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val,props.index)
    })
    watch(() => props.modelValue, (val) => {
      if(typeof val=== "string" || Array.isArray(val))
        localModel.value = val as string[]
    })
    return {
      localModel
    }
  }
})
</script>
<style scoped>
</style>
