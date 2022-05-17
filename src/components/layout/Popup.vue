<template>
   <div class="popup_wrapper" ref="popupWrapper">
      <div class="closer" @click="$emit('close')"></div>
      <div class="popup">
         <div class="popup_header">
             <slot name="header"/>
         </div>
         <div class="content">
            <slot name="content" />
         </div>
         <div class="footer">
            <slot name="footer" />
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Popup',
      emits: ['close'],
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

        .closer{
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
