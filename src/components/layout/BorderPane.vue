<template>
    <div class="border-pane">
        <slot name="top">
            <div></div>
        </slot>

        <div class="center-line">
            <slot name="left">
                <div></div>
            </slot>

            <slot name="center">
                <div></div>
            </slot>

            <slot name="right">
                <div></div>
            </slot>
        </div>

        <slot name="bottom">
            <div></div>
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
        grid-template-rows: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);
        height: 100%;
        width: 100%;

        .center-line {
            display: grid;
            grid-template-columns: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);
            height: 100%;
            width: 100%;
        }

    }

</style>