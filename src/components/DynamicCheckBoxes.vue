<template>
  <div class="flex-column relative">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
      <span v-if="form?.hint" class="td2">({{form.hint}})</span>

    </label>
    <div class="flex checkbox flex-wrap">
      <label v-for="(o,idx) in form?.options" :key="idx" :for="form.label+'check'+idx">
        <input 
            type="checkbox" 
            :name="form?.label" 
            :value="o.value" 
            :id="form.label+'check'+idx" 
            class="HopeTypeExample form-control"
            @change="$emit('cVal')"
            v-model="localModel"
        >
        {{o.label}}
      </label>
    </div>
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
      {{error}}
    </span>
  </div>


  <!-- <tr class="tr flex">
    <th class="th">
      <label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span>
    </th>
    <td class="td checkbox flex flex-wrap">
      <label v-for="(o,idx) in form?.options" :key="idx" :for="form.label+'check'+idx">
        <input 
            type="checkbox" 
            :name="form?.label" 
            :value="o.value" 
            :id="form.label+'check'+idx" 
            class="HopeTypeExample form-control"
            @change="$emit('cVal')"
            v-model="localModel"
        >
        {{o.label}}
      </label>

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
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  name: "DynamicCheckBoxes",
  emits: ['updateModel','cVal'],
  props: {
    form: Object as PropType<FormItem>,
    index: Object as PropType<Indeces>,
    modelValue: [String,Array],
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean
  },
  setup(props,{emit}){
    const localModel = ref<String|Array<String>>([])
    if(props.modelValue && Array.isArray(props.modelValue)){
      localModel.value = props.modelValue as string[];
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val,props.index)
    })
    return {
      localModel
    }
  }
})
</script>
<style scoped>
/* span.is-danger {
  display: block;
  position: absolute;
  right: 10px;
  top: -5px;
  padding: 5px;
  border-radius: 4px;
  background-color: #ec5700;
  color: white;
} */
</style>
