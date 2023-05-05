<template>
    <button :disabled="options.disabled" class="button">
        <Loading v-if="options.isBusy != undefined && options.isBusy"/>
        <slot v-else>{{options.text}}</slot>
    </button>
</template>

<script lang="ts">
   import Loading from './../../../Loading'
   import SimpleButton from './SimpleButton'
   import { defineComponent } from 'vue'

   export default defineComponent({
      name: 'LoadingButton',
      components: {
         SimpleButton,
         Loading,
      },
      props: {
         options: {
            type: Object,
            required: true,
         },
      },
   })
</script>
