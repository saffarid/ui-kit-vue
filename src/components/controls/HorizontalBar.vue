<template>
   <div class="bar" v-bind:class="classPhys">
      <div class="bar-background">
         <div class="bar-outside" :class="colorBar">
            <div class="bar-inside" v-bind:style="{width:close_percent +'%'}">

            </div>
         </div>
         <div class="cur-val">{{currentValue}}</div>
      </div>
   </div>
</template>

<script>
   import { map } from '@/assets/math'

   import Value from "./mixins/Value";
   import Limited from "./mixins/Limited";

   export default {
      name: 'HorizontalBar',
      mixins:[
              Limited,
              Value
      ],

      computed: {
         colorBar: function () {
            let closePercent = this.close_percent //Процент закрытия цветной части определяется от конца шкалы, не от начала
            if (closePercent <= 30) {
               return 'max'
            } else if (30 < closePercent && closePercent < 36) {
               return 'maxSetpoint'
            } else if (36 <= closePercent && closePercent <= 63) {
               return 'mid'
            } else if (63 < closePercent && closePercent <= 69) {
               return 'minSetpoint'
            } else {
               return 'min'
            }
         },
         classPhys: function () {
            if (this.physVal == 0) {
               return 'temp'
            }
            if (this.physVal == 1) {
               return 'humi'
            }
            return 'volt'
         },

         close_percent: function () {
            if (this.currentValue <= this.minLimit) {
               return 100
            } else if (this.currentValue >= this.maxLimit) {
               return 0
            } else if (this.currentValue < this.minSetpoint) {
               let locVal = 100 - map(this.currentValue, this.minLimit, this.minSetpoint, 0, 100)
               let res = map(locVal, 0, 100, 0, 33)
               return 66 + res
            } else if (this.minSetpoint <= this.currentValue && this.currentValue <= this.maxSetpoint) {
               let locVal = 100 - map(this.currentValue, this.minSetpoint, this.maxSetpoint, 0, 100)
               let res = map(locVal, 0, 100, 0, 33)
               return 33 + res
            }
            let locVal = 100 - map(this.currentValue, this.maxSetpoint, this.maxLimit, 0, 100)
            let res = map(locVal, 0, 100, 0, 33)
            return res
         },
      },
      props: {
         physVal: {
            type: Number,
            required: true,
         },
         maxSetpoint: {
            type: Number,
            required: true,
         },

         minSetpoint: {
            type: Number,
            required: true,
         },
      },

   }
</script>

<style lang="css" scoped>
   .volt {
      --max_val: #ef4444;
      --max_setpoint: #f60;
      --mid_val: #4ade80;
      --min_setpoint: #f60;
      --min_val: #ef4444;
   }
   .humi {
      --max_val: #0008ff;
      --max_setpoint: #5d60c9;
      --mid_val: #4ae2fb;
      --min_setpoint: #aaeee3;
      --min_val: #ffd08a;
   }
   .temp {
      --max_val: #ef4444;
      --max_setpoint: #f60;
      --mid_val: #4ade80;
      --min_setpoint: #93c5fd;
      --min_val: #376599;
   }
   .bar {
      padding: 5px;
      display: grid;
      align-self: center;
      justify-self: stretch;
      max-height: 30px;
   }
   .bar-background {
      background-color: transparent;
      display: grid;
      grid-template-columns: auto 50px;
   }
   .max {
      background: var(--max_val);
   }
   .maxSetpoint {
      background: var(--max_setpoint);
   }
   .mid {
      background: var(--mid_val);
   }
   .minSetpoint {
      background: var(--min_setpoint);
   }
   .min {
      background: var(--min_val);
   }
   .bar-outside {
      display: grid;
      align-self: stretch;
      justify-self: stretch;
      justify-items: end;
      border-width: 1px;
      border-color: rgb(107, 114, 128);
      border-style: solid;
      transition-property: background-color;
      transition-duration: 3s;
   }
   .bar-inside {
      display: grid;
      background: rgb(107, 114, 128);
      transition-property: width;
      transition-duration: 3s;
   }
   .cur-val {
      display: grid;
      align-items: center;
      justify-items: center;
      border-width: 1px;
      border-color: rgb(107, 114, 128);
      border-style: solid;
   }

</style>