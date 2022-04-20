<template>
  <div class="flex-column relative">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
      <span v-if="form?.hint" class="td2">({{form.hint}})</span>
    </label>
      <select
        @change="$emit('cVal')"
        v-model="localModel"
        :name="form?.label" 
        :id="form?.label" 
        :class="{'validate[required]':form?.required}" 
        data-prompt-position="topLeft:40"
      >
        <option value="">{{form?.placeholder}}</option>
        <option v-for="(o, idx) in form.options" :key="idx" :value="o.value">{{o.label}}</option>
      </select>
      <span class="select-icon"><i class="fas fa-caret-down"></i></span>
    
    <!-- <Dropdown @change="$emit('cVal')" v-model="localModel" :options="form?.options" optionLabel="label" :placeholder="(form?.placeholder?.toString())"></Dropdown> -->
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
      {{error}}
    </span>
  </div>

  <!-- <tr class="tr flex align-center">
    <th class="th"><label :for="form?.label">{{form?.title}}</label><span v-if="form?.required" class="hissu">必須</span></th>
    <td class="td select">
      <select :name="form?.label" :id="form?.label" :class="{'validate[required]':form?.required}" data-prompt-position="topLeft:40">
        <option value="">{{form?.placeholder}}</option>
        <option v-for="(o, idx) in form.options" :key="idx" :value="o.value">{{o.label}}</option>
      </select>
      <span class="select-icon"><i class="fas fa-caret-down"></i></span>
      <Dropdown @change="$emit('cVal')" v-model="localModel" :options="form?.options" optionLabel="label" :placeholder="(form?.placeholder?.toString())"></Dropdown>
    </td>
    <span v-if="error&&error!==true&&showErrors" class="is-danger">
      {{error}}
    </span>
    <td v-if="form?.hint" class="td2">{{form.hint}}</td>
  </tr> -->

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";
interface Indeces {
  one: number,
  two: number,
}
export default defineComponent({
  name: "DynamicSelect",
  emits: ['updateModel','cVal'],
  props: {
    form: Object as PropType<FormItem>,
    index: Object as PropType<Indeces>,
    modelValue: [String, Object],
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean
  },
  setup(props,{emit}){
    const localModel = ref<Array<any>>([])
    if(props.modelValue){
      localModel.value = props.modelValue as any;
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