<template>
    <svg :x="x" :y="y" width="122" height="122" viewBox="-61 -61 122 122">

        <path class="wire"
              style="stroke: #a39f9f; stroke-width: 5px"
              :d="fillFullPhantom"
              stroke-width="5px"
              fill="transparent"
        />

        <path :class="{active_wire: isActive && !isAlarm && !isWarning, alarm_wire:isAlarm, inactive_wire:!isActive, warning_wire:isWarning}"
              class="wire"
              style="filter: drop-shadow(0 0 0 var(--wire)); stroke-width: 5px"
              :d="fillProgress"
              stroke-width="5px"
              fill="transparent"
        />

        <template v-if="countDivide !== 0">
                <line v-for="i in countDivide" :key="i"
                      :x1=" 35*Math.cos(toRad(90-(i)*step))"
                      :y1="-35*Math.sin(toRad(90-(i)*step))"
                      :x2=" 45*Math.cos(toRad(90-(i)*step))"
                      :y2="-45*Math.sin(toRad(90-(i)*step))"
                      stroke="#474747"
                      stroke-width="1px"
                />
        </template>

        <circle r="45"
                :class="{active_wire: isActive && !isAlarm && !isWarning, alarm_wire:isAlarm, inactive_wire:!isActive, warning_wire:isWarning}"
                class="wire"
                style="filter: drop-shadow(0 0 0 var(--wire)); stroke-width: 2px"
                fill="transparent" stroke-width="1px"/>
        <circle r="35"
                :class="{active_wire: isActive && !isAlarm && !isWarning, alarm_wire:isAlarm, inactive_wire:!isActive, warning_wire:isWarning}"
                class="wire"
                style="filter: drop-shadow(0 0 0 var(--wire)); stroke-width: 2px"
                fill="transparent" stroke-width="2px"/>

        <text fill="#fff" font-size="20" font-family="Arial-BoldMT, Arial" text-anchor="middle" v-if="unitMeas !== undefined">
            <tspan x="0" y="-2">{{trimCurValue}}</tspan>
            <tspan x="0" y="20">{{unitMeas}}</tspan>
        </text>
        <text fill="#fff" font-size="20" font-family="Arial-BoldMT, Arial" text-anchor="middle" v-else>
            <tspan x="0" y="5">{{trimCurValue}}</tspan>
        </text>

    </svg>
</template>

<script>
    import { checkRange, map, toRad } from '../../assets/math'

    import FlagsStates from "./mixins/FlagsStates";
    import Limited from "./mixins/Limited";
    import Value from "./mixins/Value";
    import ZeroPoint from "./mixins/ZeroPoint";

    /**
     * Круговой прогресс бар.
     * */
    export default {
        name: 'CircleBar',
        mixins: [
            FlagsStates,
            Limited,
            Value,
            ZeroPoint
        ],
        props: {
            /**
             * Кол-во рисок
             * */
            countDivide: {
                type: Number,
                required: false,
                default: 0,
            },
            /**
             * Единица измерения
             * */
            unitMeas: {
                type: String,
                required: false,
            },
            /**
             * Максимальный угол, на который рисуется полоса.
             * Начало в точке x=0; y=1
             * */
            maxAngle: {
                type: Number,
                required: false,
                default: 270,
            },
        },
        methods: {
            fill: function (val) {
                let fill = map(val, this.minLimit, this.maxLimit, 0, this.maxAngle)
                fill = checkRange(0, fill, this.maxAngle)
                let angle = 90 - fill

                angle = toRad(angle)

                let xEnd = 40 * Math.cos(angle)
                let yEnd = -40 * Math.sin(angle)

                let arc = (fill <= 180) ? (0) : (1)

                return `M 0 -40 A 40 40 0 ${arc} 1 ${xEnd} ${yEnd}`
            },
        },
        computed: {
            fillProgress: function () {
                return this.fill(this.currentValue)
            },
            fillFullPhantom: function () {
                return this.fill(this.maxLimit)
            },
            trimCurValue: function () {
                let currentValue = parseFloat(this.currentValue);
                let s = currentValue.toFixed(2);
                return s;
            }
        },
        setup(props){
            let step = props.countDivide!==0?props.maxAngle/(props.countDivide+1):props.countDivide
            return {
                toRad,
                step
            }
        }
    }
</script>

<style lang="scss" scoped>

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

</style>