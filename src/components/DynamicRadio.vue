<template>
  <div class="flex-column relative" :style="'width:'+form?.width+';'"> 
    <label class="label comp-header flex" :for="form?.label">{{form?.title}}
      <span v-if="form?.required" class="hissu">必須</span>
    </label>
    <div class="radio">
      <ul class="flex justify-between">
        <template v-if="form.options">
          <li v-for="(o,idx) in form?.options" :key="idx">
            <input 
                type="radio" 
                :id="form.label+'radio'+idx"
                :name="form?.label" 
                :value="form.options[idx].value" 
                class="radio-input" 
                :class="{'validate[required]':form?.required}" 
                @change="$emit('cVal')"
                v-model="localModel"
            >
            <label :for="form.label+'radio'+idx">{{form.options[idx].value}}</label>
          </li>
        </template>
        
      </ul>
    </div>
    <div v-if="form && form.hint && form?.hint.length>1" class="hint">
      <span>{{form.hint}}</span>
    </div>
    <span v-if="error && error!==true && showErrors" class="error-wrapper">
      <span v-if="error && error!==true && showErrors" class="is-danger">
        {{error}}
      </span>
    </span>
  </div>

  <!-- <tr class="tr flex align-center">
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
              @change="$emit('cVal')"
              v-model="localModel"
          >
          <label :for="form.label+'radio'+idx">{{form.options[idx].value}}</label>
        </li>
        
      </ul>
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
  name: "DynamicRadio",
  emits: ['updateModel','cVal'],
  props: {
    form: {
      type: Object as PropType<FormItem>,
      required: true
    },
    index: Object as PropType<Indeces>,
    modelValue: [String, Array],
    error: {
      type: [String,Boolean],
      default: ""
    },
    showErrors: Boolean,
    rowClasses: String,
  },
  setup(props,{emit}){
    const localModel = ref<String|Array<String>>("")
    if(props.modelValue){
      localModel.value = props.modelValue as any;
    }
    watch(() => localModel.value, (val) => {
      emit('updateModel', val, props.index)
    })
    watch(() => props.modelValue, (val) => {
      if(typeof val=== "string" || Array.isArray(val))
        localModel.value = val as string|string[]
    })
    return {
      localModel
    }
  }
})
</script>
<style scoped>

</style>