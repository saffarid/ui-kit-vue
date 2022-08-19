<template>
   <div class="popup_wrapper" ref="popupWrapper" @keyup.esc="$emit('close')" tabindex="0">
      <div class="closer" @click="$emit('close')"></div>
      <div class="popup">
         <slot name="header"/>
         <slot name="content"/>
         <slot name="footer"/>
      </div>
   </div>
</template>

<script>
   import {
      ref,
      watch
   } from 'vue'

   export default {
      name: 'Popup',
      emits: ['close'],
      setup() {
         const popupWrapper = ref(null)
         watch(popupWrapper, () => {
            popupWrapper.value.focus()
         })
         return {
            popupWrapper
         }
      }
   }
</script>

<style lang="scss" scoped>

   .popup_wrapper {
      display: grid;
      align-self: stretch;
      align-items: center;
      justify-items: center;
      background-color: rgba(64, 64, 64, 0.4);
      position: absolute;
      height: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      color: white;
      outline: transparent;

      .closer {
         display: grid;
         align-self: stretch;
         justify-self: stretch;
         position: absolute;
         width: 100%;
         height: 100%;
         z-index: 1;
      }

      .popup {
         z-index: 2;
      }
   }

</style>
