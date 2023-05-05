<template>
    <component :is="comp" :options="options">
        <template #default>
            <slot/>
        </template>
    </component>
</template>

<script lang="ts">
   import {
      defineAsyncComponent,
      defineComponent,
   } from 'vue'
   import { button_types } from './button_types'

   export default defineComponent({
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
   })
</script>
