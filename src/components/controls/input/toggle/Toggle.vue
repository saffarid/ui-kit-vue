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
         v-bind="$attrs" />
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

<script>
   import { unref } from 'vue'
   import useStyle from './composables/useStyle'

   function debug() {}
   //function debug(val) { console.debug(val) }

   export default {
      name: 'Toggle',
      inheritAttrs: false,
      emits: ['update:modelValue'],
      props: {
         prevValue: {
            type: [String, Number, Boolean],
            required: false,
         },
         modelValue: {
            type: [String, Number, Boolean],
            required: true,
         },
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
         changeBlink: function () {
            debug(['UToggle.compute.changeBlink', this.modelValue, this.prevValue])
            return this.prevValue !== undefined && this.prevValue != this.modelValue
         },
      },
      setup(props) {
         const style = useStyle(props)

         return {
            ...style,
         }
      },
   }
</script>

<style lang="scss" scoped>
   @import "default.scss";
   .change-blink {
      /*border-right: 5px solid var(--border_color_hover);*/
      /*border-radius: 12px;*/
      /*padding-right: 2px;*/
      /*justify-self: start;*/
      /*--toggle-on-handle-color: red;*/
   }
</style>