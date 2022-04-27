<template>
  <div class="flex-column relative" :style="'width:'+form?.width+';'">
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
    </label>
    <InputText type="text"
      :name="form?.label"
      :id="form?.label"
      class="w40 center"
      :class="{'validate[required]':form?.required}"
      :placeholder="form?.placeholder||''"
      :required="form?.required"
      @change="$emit('cVal')"
      v-model="localModel"
    />
    <div v-if="form && form.hint && form?.hint.length>1" class="hint">
      <span>{{form.hint}}</span>
    </div>
    <span v-if="error && error!==true && showErrors" class="error-wrapper">
      <span v-if="error && error!==true && showErrors" class="is-danger">

        {{error}}
      </span>
    </span>
  </div>

</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { FormItem } from "@/types/Form";
import InputText from 'primevue/inputtext';
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
    },
    showErrors: Boolean,
    rowClasses: String,
  },
  components: {
    InputText
  },
  setup(props,{emit}){
    const localModel = ref<string>("")
    if(props.modelValue){
      localModel.value = props.modelValue;
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val, props.index)
    })
    watch(() => props.modelValue, (val) => {
      if(typeof val === "string")
        localModel.value = val
    })
    return {
      localModel
    }
  }
})
</script>
