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
      border-radius: 0;
      border: #2c3e50 2px solid;
      cursor:pointer;
      display: grid;
      align-content: center;
      justify-content: center;
      padding: 5px;
      /*min-height: 20px;*/
      /*max-height: 40px;*/
   }
</style>