1<template>
    <button :disabled="options.disabled" class="button">
        <slot>{{options.text}}</slot>
    </button>
</template>

<script lang="ts">
   import { defineComponent } from 'vue'

   export default defineComponent({
      name: 'SimpleButton',
      props: {
         options: {
            type: Object,
            required: true,
         },
      },
   })
</script>

