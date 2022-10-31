<template>
    <div class="popup" ref="popup" @keyup.esc="$emit('close')" tabindex="0"
         :style="styleVars">
        <div class="closer" @click="$emit('close')"></div>
        <div class="popup-body">
            <slot name="popup-body-header"/>
            <slot name="popup-body-content"/>
            <slot name="popup-body-footer"/>
        </div>
    </div>
</template>

<script>
    import {
        reactive,
        ref,
        watch
    } from 'vue'

    export default {
        name: 'Popup',
        emits: ['close'],
        setup() {
            const popup = ref(null)

            const styleVars = reactive({
                '--height': '0px'
            })

            watch(popup, () => {
                popup.value.focus()
                styleVars['--height'] = popup.value.scrollHeight + 'px'
            })

            return {
                popup,
                styleVars
            }
        }
    }
</script>

<style lang="scss">

    .popup {
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
            height: calc(max(100%, var(--height)));
            z-index: 1;
        }

        .popup-body {
            z-index: 2;
        }
    }

</style>
