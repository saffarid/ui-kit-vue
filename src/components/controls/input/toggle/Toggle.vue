<template>
    <div class="toggle-input" :style="cssVars" :class="{'change-blink': changeBlink}">
        <input
                type="checkbox"
                :name="name"
                :id="id"
                :disabled="disabled"
                :trueValue="trueValue"
                :falseValue="falseValue"
                v-model="value"
                v-bind="$attrs"/>
        <label :for="id">
            <slot name="on">
                <span class="toggle-on" v-html="onLabel"></span>
            </slot>
            <slot name="off">
                <span class="toggle-off" v-html="offLabel"></span>
            </slot>
        </label>
    </div>
</template>

<script lang="ts">
   import {
      unref,
      defineComponent,
   } from 'vue'
   import useStyle from './composables/useStyle'
   import { computed } from '@vue/runtime-dom'

   export default defineComponent({
      name: 'Toggle',
      inheritAttrs: false,
      emits: ['update:modelValue'],
      props: {
         /**
          * Предыдущее значение
          * @type String, Number, Boolean
          * @requires false
          * */
         prevValue: {
            type: [String, Number, Boolean],
            required: false,
         },
         /**
          * Текущее значение
          * @type String, Number, Boolean
          * @requires false
          * */
         modelValue: {
            type: [String, Number, Boolean],
            required: true,
         },
         /**
          * Идентификатор
          * @requires true
          * */
         id: {
            type: [String, Number],
            required: true,
         },

         name: {
            type: [String, Number],
            required: false,
            default: 'toggle',
         },
         disabled: {
            type: Boolean,
            required: false,
            default: false,
         },
         falseValue: {
            type: [Boolean, Number, String],
            required: false,
            default: false,
         },
         trueValue: {
            type: [Boolean, Number, String],
            required: false,
            default: true,
         },
         offLabel: {
            type: [String, Object],
            required: false,
            default: '',
         },
         onLabel: {
            type: [String, Object],
            required: false,
            default: '',
         },
         width: {
            type: Number,
            required: false,
            default: 54,
         },
         height: {
            type: Number,
            required: false,
            default: 24,
         },
         speed: {
            type: Number,
            required: false,
            default: 300,
         },
         colors: {
            type: Object,
            required: false,
            default: () => ({}),
         },
         fontSize: {
            type: String,
            required: false,
            default: '13px',
         },
      },
      computed: {
         value: {
            get() {
               return this.modelValue == unref(this.trueValue)
            },
            set(v) {
               this.$emit('update:modelValue', v ? unref(this.trueValue) : unref(this.falseValue))
            },
         },
      },
      setup(props) {
         const style = useStyle(props)

         const changeBlink = computed(() => {
            if (props.prevValue === undefined) {
               return false
            }
            return props.prevValue != props.modelValue
         })

         return {
            changeBlink,
            ...style,
         }
      },
   })
</script>