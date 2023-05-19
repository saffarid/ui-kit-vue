<template>
    <component :is="comp" :options="options" @click="options.action">
        <template #default>
            <slot/>
        </template>
    </component>
</template>

<script>
   import {
      defineAsyncComponent
   } from 'vue'
   import { button_types } from './button_types'

   export default {
      name: 'Button',
      props: {
         options: {
            type: Object,
            required: true,
         },
      },
      setup(props) {
         const comp = defineAsyncComponent(() => import(`./types/${props.options.type ?? button_types.simpleButton}.vue`))
         return {
            comp,
         }
      },
   }
</script>
