<template>
    <div class="border-pane">
        <slot name="top">
        </slot>
        <div class="center-line">
            <slot name="left">
            </slot>
            <slot name="center">
            </slot>
            <slot name="right">
            </slot>
        </div>
        <slot name="bottom">
        </slot>
    </div>
</template>

<script>
   export default {
      name: 'BorderPane',
   }
</script>

<style lang="scss">
    .border-pane {
        margin: 0;
        display: grid;
        height: 100%;
        grid-template-rows: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);

        .center-line {
            display: grid;
            grid-template-columns: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);
        }
    }
</style>