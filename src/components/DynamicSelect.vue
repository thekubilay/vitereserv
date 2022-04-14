<template>

  <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td select">
      <!-- <select :name="form?.label" :id="form?.label" :class="{'validate[required]':form?.required}" data-prompt-position="topLeft:40">
        <option value="">{{form?.placeholder}}</option>
        <option v-for="(o, idx) in form.options" :key="idx" :value="o.value">{{o.label}}</option>
      </select>
      <span class="select-icon"><i class="fas fa-caret-down"></i></span> -->
      <Dropdown v-model="localModel" :options="form?.options" optionLabel="label" :placeholder="(form?.placeholder?.toString())"></Dropdown>
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
  name: "DynamicSelect",
  props: {
    form: Object as PropType<FormItem>,
    modelValue: [String, Object],
    error: {
      type: [String,Boolean],
      default: ""
    }
  },
  setup(props,{emit}){
    const localModel = ref<Array<any>>([])
    // if(props.modelValue){
    //   localModel.value = props.modelValue;
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
<style>
.p-dropdown{

    padding: 8px 0px 8px 8px;
    width: 100%;
    margin-right: 5%;
    font: inherit;
    /* border: 1px solid #ccc;
    box-sizing: border-box; */
    border-color: #ccc;
    border-radius: 0px;
}
.p-inputtext{
  font-size: 1.4rem;
  padding: 0;
  color: #000;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item{
  font-size: 1.4rem;
}
</style>