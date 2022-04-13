<template>
  <tr class="tr flex">
    <th class="th">
      <label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span>
    </th>
    <td class="td checkbox flex flex-wrap">
      <label v-for="(o,idx) in form?.options" :key="idx" :for="form.label+'check'+idx">
        <input :name="form?.label" :value="o.value" type="checkbox" :id="form.label+'check'+idx" class="HopeTypeExample form-control">{{o.label}}
      </label>

    </td>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItem } from "@/types/Form";

export default defineComponent({
  name: "DynamicCheckBoxes",
  props: {
    form: Object as PropType<FormItem>
  },
  setup(){

    return {

    }
  }
})
</script>
