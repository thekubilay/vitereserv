<template>
  <div class="flex-column relative" :style="'width:'+form?.width+';'" style="margin: 20px 0">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
      <span v-if="form?.hint" class="td2">({{form.hint}})</span>
    </label>

    <Dropdown
      @change="$emit('cVal')"
      v-model="localModel"
      :options="form?.options"
      optionLabel="label"
      :placeholder="(form?.placeholder?.toString())"
    >
    </Dropdown>
    <span v-if="error" class="error-wrapper">
      <span v-if="error&&error!==true&&showErrors" class="is-danger">
        {{error}}
      </span>
    </span>
  </div>

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
    showErrors: Boolean,
    rowClasses: String,
  },
  setup(props,{emit}){
    const localModel = ref<Array<any>>([])
    if(props.modelValue){
      localModel.value = props.modelValue as any;
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val, props.index)
    })
    watch(() => props.modelValue, (val) => {
      localModel.value = val as any[]
    })
    return {
      localModel
    }
  }
})
</script>
<style>
/* .p-dropdown{
    padding: 8px 0px 8px 8px;
    width: 100%;
    margin-right: 5%;
    font: inherit;
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
} */
</style>
<style scoped>

</style>
