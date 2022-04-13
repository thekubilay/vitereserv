<template>

  <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td" :class="{long: form?.width}">
      <input type="text" 
          :name="form?.label" 
          :id="form?.label" 
          class="w40 center"
          :class="{'validate[required]':form?.required}" 
          data-prompt-position="topLeft:40" 
          :placeholder="form?.placeholder||''"
          :required="form?.required"
          v-model="localModel"
      >
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
import { propsToAttrMap } from "@vue/shared";

export default defineComponent({
  name: "DynamicInput",
  props: {
    form: Object as PropType<FormItem>,
    modelValue: String,
    error: {
      type: [String,Boolean],
      default: ""
    }
  },
  setup(props,{emit}){
    const localModel = ref<string>("")
    if(props.modelValue){
      localModel.value = props.modelValue;
    }
    watch(() => localModel.value, (val) => {
      emit('update:modelValue', val)
    })
    return {
      localModel
    }
  }
})
</script>