import Vue from 'vue'

declare class Slider extends Vue {
   modelValue?: any
   id?: string
   disabled?: boolean
   range?: object
   step?: number
   orientation?: 'horizontal' | 'vertical'
   direction?: 'ltr' | 'rtl'
   tooltips?: boolean
   options?: object
   merge?: number
   format?: any
   classes?: object
   showTooltip?: 'always' | 'focus' | 'drag'
   tooltipPosition?: null | 'top' | 'bottom' | 'left' | 'right'

   $emit(eventName: 'input', e: { originalEvent: Event; value: any }): this
   $emit(eventName: 'update:modelValue', e: { originalEvent: Event; value: any }): this
   $emit(eventName: 'change', e: { originalEvent: Event; value: any }): this
}

export default Slider
