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
          >
          <label :for="form.label+'radio'+idx">{{form.options[idx].value}}</label>
        </li>
        
      </ul>
    </td>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItem } from "@/types/Form";

export default defineComponent({
  name: "DynamicRadio",
  props: {
    form: Object as PropType<FormItem>
  },
  setup(){

    return {

    }
  }
})
</script>
