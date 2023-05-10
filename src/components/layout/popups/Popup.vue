<template>
    <div class="popup">
        <div class="closer" @click="$emit('dismiss')"></div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
   export default {
      name: 'Popup',
      emits: ['dismiss'],
   }
</script>

<style lang="scss">
    .popup {
        display: grid;
        align-self: stretch;
        align-items: center;
        justify-items: center;
        position: absolute;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;

        .closer {
            display: grid;
            background-color: transparent;
            align-self: stretch;
            justify-self: stretch;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .body {
            z-index: 2;
            display: grid;
        }
    }
</style>

