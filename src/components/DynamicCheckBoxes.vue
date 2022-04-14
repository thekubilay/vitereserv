<template>
  <tr class="tr flex">
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
            v-model="localModel"
        >
        {{o.label}}
      </label>

    </td>
    
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";

export default defineComponent({
  name: "DynamicCheckBoxes",
  props: {
    form: Object as PropType<FormItem>,
    modelValue: [String,Array],
    error: {
      type: [String,Boolean],
      default: ""
    }
  },
  setup(props,{emit}){
    const localModel = ref<String|Array<String>>([])
    // if(props.modelValue){
    //   localModel.value = [];
    // }
    watch(() => localModel.value, (val) => {
      emit('update:modelValue', val)
    })
    return {
      localModel
    }
  }
})
</script>
