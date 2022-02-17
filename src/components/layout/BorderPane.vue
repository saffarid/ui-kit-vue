<template>
    <div class="border-pane">

        <div class="top">
            <slot name="top">
                <div></div>
            </slot>
        </div>
        <div class="left">
            <slot name="left">
                <div></div>
            </slot>
        </div>
        <div class="center">
            <slot name="center">
                <div></div>
            </slot>
        </div>
        <div class="right">
            <slot name="right">
                <div></div>
            </slot>
        </div>
        <div class="bottom">
            <slot name="bottom">
                <div></div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BorderPane"
    }
</script>

<style lang="scss" scoped>

    .border-pane{
        margin: 0;
        display: grid;
        height: 100%;
        grid-template-areas: "top top top"
                             "left center right"
                             "bottom bottom bottom";
        grid-template-columns: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);
        grid-template-rows: minmax(min-content, max-content) minmax(min-content, auto) minmax(min-content, max-content);
        /*overflow-y: auto;*/

        .top{
            grid-area: top;
        }

        .left{
            grid-area: left;
        }

        .center{
            grid-area: center;
            overflow-y: auto;
        }

        .right{
            grid-area: right;
        }

        .bottom{
            grid-area: bottom;
        }
    }

</style>