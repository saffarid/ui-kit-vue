<template>
    <svg :x="x" :y="y-50" width="150" height="100" viewBox="0 -50 150 100">

        <slot name="alarm">
                    <Alarm v-if="isAlarm" :x="(isMirror)?(15):(115)" :y="-30"/>
        </slot>

        <line
                :class="{active_wire: (!isMirror)?(isPrepared):(isActive), inactive_wire: (!isMirror)?(!isPrepared):(!isActive) }"
                class="wire"
                x1="0" y1="0" x2="50" y2="0" fill="none"/>
        <template v-if="isMirror">
            <svg class="mirror" x="50" y="-50" width="100" height="100" viewBox="-50 -50 100 100">
                <line
                        :class="{open: !isClose, close:isClose, active_wire: isActive, inactive_wire:!isActive}"
                        class="wire rot"
                        x1="-50" y1="0" x2="0" y2="0" fill="none"/>
                <circle
                        :class="{active_rect: isActive, inactive_rect:!isActive}"
                        class="rect"
                        cx="0" cy="0" r="5"/>
            </svg>
        </template>
        <template v-else>
            <svg x="0" y="-50" width="100" height="100" viewBox="-50 -50 100 100">
                <line
                        :class="{open: !isClose, close:isClose, active_wire: isActive, inactive_wire:!isActive}"
                        class="wire rot"
                        x1="0" y1="0" x2="50" y2="0" fill="none"/>
                <circle
                        :class="{active_rect: isActive, inactive_rect:!isActive}"
                        class="rect"
                        cx="0" cy="0" r="5"/>
            </svg>
        </template>

        <line
                :class="{active_wire: (isMirror)?(isPrepared):(isActive), inactive_wire: ( isMirror)?(!isPrepared):(!isActive) }"
                class="wire"
                x1="100" y1="0" x2="150" y2="0" fill="none" stroke="#008014" stroke-width="5"/>
        <circle v-if="pointIsShow" cx="50" cy="0" r="5" fill="white" stroke="white"/>

    </svg>
</template>

<script>
    import Alarm from "../images/Alarm";
    import ZeroPoint from "../mixins/ZeroPoint";
    import FlagsStates from "../mixins/FlagsStates";

    /**
     * Компонент представляет графическое отображение ключа, аналогично электрическим схемам
     * */
    export default {
        name: 'Key',
        components: {Alarm},
        mixins: [
            FlagsStates,
            ZeroPoint
        ],
        props: {
            /**
             * Флаг зеркального отображения компонента относительно оси Y.
             * @values true, false
             * */
            isMirror: {
                type: Boolean,
                required: false,
                default: false,
            },
            /**
             * Флаг отображения закрытого ключа. true - ключ отображается закрытым, false - иначе.
             * @values true, false
             * */
            isClose: {
                type: Boolean,
                required: true,
            },
            pointIsShow: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
    }
</script>

<style lang="scss">

    .active_wire {
        --wire: #008014;
        filter: drop-shadow(0 0 5px var(--wire));
    }

    .inactive_wire {
        --wire: #707070;
    }

    .alarm_wire {
        --wire: #9F0000;
        filter: drop-shadow(0 0 5px var(--wire));
    }

    .warning_wire {
        --wire: #dea500;
        filter: drop-shadow(0 0 5px var(--wire));
    }

    .wire {
        stroke: var(--wire);
        stroke-width: 7;
        transition-property: stroke;
        transition-duration: 3s;
    }

    .active_rect {
        --rect_fill: #008014;
    }

    .inactive_rect {
        --rect_fill: #707070;
    }

    .alarm_rect {
        --rect_fill: #9F0000;
    }

    .rect {
        fill: var(--rect_fill);
        transition-property: fill;
        transition-duration: 3s;
    }

    .backgroundSvg {
        fill: var(--menu_item_color);
    }

    .mirror {
        .open {
            --key_deg: 30deg;
        }

        .close {
            --key_deg: 0deg;
        }
    }


    .open {
        --key_deg: -30deg;
    }

    .close {
        --key_deg: 0deg;
    }


    .rot {
        transform: rotate(var(--key_deg));
    }

</style>