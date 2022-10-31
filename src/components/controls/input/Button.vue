<template>
   <button class="button" @click="$emit('click')">
      <slot>{{text}}</slot>
   </button>
</template>

<script>
   export default {
      name: 'Button',
      props: {
         text: String,
      },
      emits: ['click'],
   }
</script>

<style lang="scss">
   .button{
      cursor:pointer;
      display: grid;
      align-content: center;
      justify-content: center;
   }
</style>