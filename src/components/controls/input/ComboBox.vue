<template>
    <select
            class="combo-box"
            :class="{'change-blink': changeBlink}"
            :disabled="disabled"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="(opt, index) in options" :key="index" :value="opt.value" :label="opt.label"/>
    </select>

</template>

<script lang="ts">
   import {
      computed,
      defineComponent,
   } from 'vue'
   import MixinValue from '../mixins/MixinValue'

   export default defineComponent({
      name: 'ComboBox',
      mixins: [MixinValue],
      props: {
         prevValue: {
            type: [String, Number],
            required: false,
         },
         options: {
            type: Object,
            required: true,
         },
         disabled: {
            type: Boolean,
            required: false,
         },
      },
      emits: ['update:modelValue'],
      setup(props) {
         const changeBlink = computed(() => {
            if (props.prevValue === undefined) {
               return false
            }
            return props.prevValue != props.modelValue
         })
         return { changeBlink }
      },
   })
</script>
