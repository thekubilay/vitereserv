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
          @change="$emit('cVal')"
          v-model="localModel"
      >
    </td>
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
      {{error}}
    </span>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  name: "DynamicInput",
  emit: ['updateModel','cVal'],
  props: {
    form: Object as PropType<FormItem>,
    index: Object as PropType<Indeces>,
    modelValue: String,
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean
  },
  setup(props,{emit}){
    const localModel = ref<string>("")
    if(props.modelValue){
      localModel.value = props.modelValue;
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val, props.index)
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
