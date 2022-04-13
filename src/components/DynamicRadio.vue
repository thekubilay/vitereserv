<template>
  <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td radio">
      <ul class="flex justify-between">
        <li v-for="(o,idx) in form?.options" :key="idx">
          <input 
              type="radio" 
              :id="form.label+'radio'+idx"
              :name="form?.label" 
              :value="form.options[idx].value" 
              class="radio-input" 
              :class="{'validate[required]':form?.required}" 
              v-model="localModel"
          >
          <label :for="form.label+'radio'+idx">{{form.options[idx].value}}</label>
        </li>
        
      </ul>
    </td>
    <span v-if="error&&error!==true" class="is-danger">
      {{error}}
    </span>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";

export default defineComponent({
  name: "DynamicRadio",
  props: {
    form: Object as PropType<FormItem>,
    modelValue: [String, Array],
    error: {
      type: [String,Boolean],
      default: ""
    }
  },
  setup(props,{emit}){
    const localModel = ref<String|Array<String>>("")
    // if(props.modelValue){
    //   localModel.value = props.modelValue as any;
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
