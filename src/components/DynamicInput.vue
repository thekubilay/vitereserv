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
      >
    </td>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItem } from "@/types/Form";

export default defineComponent({
  name: "DynamicInput",
  props: {
    form: Object as PropType<FormItem>
  },
  setup(){

    return {

    }
  }
})
</script>