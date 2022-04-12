<template>

  <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span class="hissu">必須</span></th>
    <td class="td"><input type="text" name="姓" :id="form?.label" class="w40 validate[required] center" data-prompt-position="topLeft:40" :placeholder="form?.placeholder||''"></td>
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