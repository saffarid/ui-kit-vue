1<template>
    <button :disabled="options.disabled" class="button">
        <slot>{{options.text}}</slot>
    </button>
</template>

<script>
   export default {
      name: 'SimpleButton',
      props: {
         options: {
            type: Object,
            required: true,
         },
      },
   }
</script>

