<template>

  <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td select">
      <select :name="form?.label" :id="form?.label" :class="{'validate[required]':form?.required}" data-prompt-position="topLeft:40">
        <option value="">{{form?.placeholder}}</option>
        <option v-for="(o, idx) in form.options" :key="idx" :value="o.value">{{o.label}}</option>
      </select>
      <span class="select-icon"><i class="fas fa-caret-down"></i></span>
      <!-- <Dropdown></Dropdown> -->
    </td>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr>

</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItem } from "@/types/Form";


export default defineComponent({
  name: "DynamicSelect",
  props: {
    form: Object as PropType<FormItem>
  },
  setup(){

    return {

    }
  }
})
</script>