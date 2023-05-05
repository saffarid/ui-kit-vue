<template>
    <label class="text-label" :class="textAlignClass" :for="uid">
        <slot>
            {{label}}
        </slot>
    </label>
</template>

<script>
   import {
      computed,
      defineComponent,
   } from 'vue'

   export default defineComponent({
      name: 'ElmTextLabel',
      props: {
         label: {
            type: String,
            required: false,
            default: '',
         },
         id: {
            type: String,
            required: false,
            default: '',
         },
         textAlign: {
            required: false,
            default: 'right',
            validator(val) {
               return val == 'left' || val == 'right' || val == 'center'
            },
         },
      },
      setup(props) {
         const textAlignClass = computed(() => {
            return `text-${props.textAlign}`
         })
         return {
            textAlignClass,
         }
      },
   })
</script>

<style lang="scss">
    .text-left {
        text-align: start;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: end;
    }
</style>