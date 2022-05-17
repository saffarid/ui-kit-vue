<template>
   <div
           class="button" @click="click">
      <slot>{{text}}</slot>
   </div>
</template>

<script>
   export default {
      name: 'Button',
      props: {
         text: String,
         disabled:{
            type: Boolean,
            required: false,
            default: false
         }
      },
      emits: ['click'],
      setup(props, context){
         const click = () => {
            if (!props.disabled) {
               context.emit('click')
            }
         }

         return {
            click
         }
      }
   }
</script>

<style lang="scss" scoped>
   .button{
      cursor:pointer;
      display: grid;
      align-content: center;
      justify-content: center;
   }
</style>