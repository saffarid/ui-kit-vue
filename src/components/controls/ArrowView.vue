<template>
    <svg :x="x" :y="y" width="180" height="148" viewBox="-90 -100 180 148">

        <rect x="-89" y="-99" width="178" height="145"
              fill="#424242"
              stroke="white"
              stroke-width="1px"
        />

        <path d="M -65 0
                 A 65 65 0 1 1 65 0"
              stroke="#424242"
              stroke-width="10px"
              fill="#424242"
        />


        <path d="M -65 0
                 A 65 65 0 0 1 -35 -56"
              fill="transparent"
              :stroke="hexToRgb(minColor)"
              stroke-width="10px"
        />

        <path d="M -35 -56
                 A 65 65 0 0 1 35 -56"
              fill="transparent"
              :stroke="hexToRgb(midColor)"
              stroke-width="10px"
        />
        <path d="M 35 -56
                 A 65 65 0 0 1 65 0"
              fill="transparent"
              :stroke="hexToRgb(maxColor)"
              stroke-width="10px"
        />

        <circle r="5" cx="0" cy="0" fill="white"/>
        <line x1="0" y1="0" :x2="endCord.x" :y2="endCord.y" stroke-width="3.5px" :stroke="colorArrow"/>

        <!--        <rect x="-20" y="0" width="40" height="25" fill="#424242"/>-->

        <text fill="#fff" font-size="20" font-family="Arial-BoldMT, Arial" text-anchor="middle">
            <tspan x="0" y="30">{{compositeValue}}</tspan>
        </text>

        <text fill="#fff" font-size="20" font-family="Arial-BoldMT, Arial" text-anchor="middle">
            <tspan x="-50" y="-70">{{minSetpoint}}</tspan>
        </text>

        <text fill="#fff" font-size="20" font-family="Arial-BoldMT, Arial" text-anchor="middle">
            <tspan x="50" y="-70">{{maxSetpoint}}</tspan>
        </text>

        <Alarm v-if="isAlarm" :x="-85" :y="10"/>
        <Warning v-if="isWarning" :x="-55" :y="10"/>
        <Info v-if="isInfo" :x="50" :y="10"/>

    </svg>
</template>

<script>
    import {checkRange, map, toRad} from "../../assets/math"

    import Alarm from './images/Alarm'
    import Warning from './images/Warning'

    import Info from './images/Info'

    import ZeroPoint from "./mixins/ZeroPoint";
    import FlagsStates from "./mixins/FlagsStates";
    import Limited from "./mixins/Limited";
    import Value from "./mixins/Value";

    /**
     * Компонент представляет стрелочное отображение
     * величины в некотором заданном диапазоне с заданными уставками.
     * */
    export default {
        name: 'ArrowView',
        components: {Info, Warning, Alarm},
        mixins: [
            FlagsStates,
            Limited,
            Value,
            ZeroPoint
        ],
        props: {
            /**
             * Минимальная уставка
             * @values Любое числовое значение
             * */
            minSetpoint: {
                type: Number,
                required: true,
            },
            /**
             * Максимальная уставка
             * @values Любое числовое значение
             * */
            maxSetpoint: {
                type: Number,
                required: true,
            },
            /**
             * Единица измерения значения
             * @values Любое строковое значение
             * */
            unitMeas: {
                type: String,
                required: false,
                default: '',
            },
            /**
             * Цвет шкалы в диапазоне менее минимальной уставки
             * @values Любое строковое значение
             * */
            minColor: {
                type: String,
                required: false,
                default: '#5d60c9',
            },
            /**
             * Цвет шкалы в диапазоне между уставками
             * @values Любое строковое значение
             * */
            midColor: {
                type: String,
                required: false,
                default: '#4ade80',
            },
            /**
             * Цвет шкалы в диапазоне более максимальной уставки
             * @values Любое строковое значение
             * */
            maxColor: {
                type: String,
                required: false,
                default: '#ef4444',
            },
        },
        methods: {
            hexToRgb: function (hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
                let color = {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                }

                return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ',' + '0.5' + ')'
            },
        },
        computed: {
            /**
             * Определение координат конца дуги заполнения
             * */
            endCord: function () {
                let r = 65
                let res = {
                    x: -65,
                    y: 0,
                }

                var angle

                if (this.currentValue <= this.minLimit) {
                    angle = 0
                } else if (this.currentValue >= this.maxLimit) {
                    angle = 180
                } else if (this.currentValue < this.minSetpoint) {
                    let locVal = map(this.currentValue, this.minLimit, this.minSetpoint, 0, 100)
                    angle = map(locVal, 0, 100, 0, 60)
                } else if (this.minSetpoint <= this.currentValue && this.currentValue <= this.maxSetpoint) {
                    let locVal = map(this.currentValue, this.minSetpoint, this.maxSetpoint, 0, 100)
                    angle = 60 + map(locVal, 0, 100, 0, 60)
                } else {
                    let locVal = map(this.currentValue, this.maxSetpoint, this.maxLimit, 0, 100)
                    angle = 120 + map(locVal, 0, 100, 0, 60)
                }


                angle = checkRange(0, 180 - angle, 180)

                angle = toRad(angle)

                res.x = r * Math.cos(angle)
                res.y = -r * Math.sin(angle)

                return res
            },
            colorArrow: function () {
                if (this.currentValue <= this.minSetpoint) {
                    return this.minColor
                } else if (this.minSetpoint < this.currentValue && this.currentValue < this.maxSetpoint) {
                    return this.midColor
                } else {
                    return this.maxColor
                }
            },
            compositeValue: function () {
                return `${this.currentValue} ${this.unitMeas}`
            },
        },
    }
</script>

<style scoped>

</style>