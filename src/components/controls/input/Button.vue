<template>
   <div class="button" @click="$emit('click')">
      <slot>{{text}}</slot>
   </div>
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

<style lang="scss" scoped>
   .button{
      cursor:pointer;
      display: grid;
      align-content: center;
      justify-content: center;
      /*min-height: 20px;*/
      /*max-height: 40px;*/
   }
</style>