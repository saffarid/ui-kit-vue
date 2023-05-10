<template>
    <button :disabled="options.disabled" class="button">
        <Loading v-if="options.isBusy != undefined && options.isBusy"/>
        <slot v-else>{{options.text}}</slot>
    </button>
</template>

<script>
   import Loading from '../../../Loading'

   export default {
      name: 'LoadingButton',
      components: {
         Loading,
      },
      props: {
         options: {
            type: Object,
            required: true,
         },
      },
   }
</script>
