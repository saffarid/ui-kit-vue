<template>
    <div v-bind="sliderProps" ref="slider"></div>
</template>

<script lang="ts">
   import {
      defineComponent,
      ref,
      toRefs,
      toRaw,
      computed,
      watch,
      onMounted,
      onUnmounted
   }                 from 'vue'
   import nouislider from 'nouislider'
   import isNullish  from './utils/isNullish'
   import useClasses from './composables/useClasses'
   import useTooltip from './composables/useTooltip'
   //import useSlider from './composables/useSlider'
   //import useValue from './composables/useValue'

   function debug() {
   }

   //function debug(val) { console.debug(val) }

   function floatArraysEquals(array1, array2) {
      const array1Sorted = (Array.isArray(array1) ? array1 : [array1]).slice().sort()
      const array2Sorted = (Array.isArray(array2) ? array2 : [array2]).slice().sort()

      if (array1Sorted.length !== array2Sorted.length) return false

      return array1Sorted.every(function(value, index) {
         return Number(value) === Number(array2Sorted[index])
      })
   }

   export default defineComponent({
      name: 'Slider',
      emits: ['input', 'update:modelValue', 'update', 'change'],
      props: {
         id: {
            type: [String, Number],
            required: false,
         },
         disabled: {
            type: Boolean,
            required: false,
            default: false,
         },
         modelValue: {
            validator: function(p) {
               return typeof p === 'number' || p instanceof Array || p === null || p === undefined || p === false
            },
            required: true,
         },
         modelModifiers: {
            default: () => ({}),
         },
         range: {
            type: Object,
            required: false,
            default: () => ({ min: 0, max: 100 }),
         },
         step: {
            type: Number,
            required: false,
            default: 1,
         },
         margin: {
            type: [Number, Array],
            required: false,
         },
         padding: {
            type: [Number, Array],
            required: false,
         },
         limit: {
            type: Number,
            required: false,
         },
         pips: {
            type: Object,
            required: false,
         },
         animate: {
            type: Boolean,
            required: false,
         },
         animationDuration: {
            type: Number,
            required: false,
         },
         snap: {
            type: Boolean,
            required: false,
            default: false,
         },
         /****************
          * ��������, ��������� ������� ������� ������������ uiSlider
          ***************/
         options: {
            type: Object,
            required: false,
            default: () => ({}),
         },
         connect: {
            type: [Boolean, String, Array],
            required: false,
            default: 'lower',
         },
         orientation: {
            type: String,
            required: false,
            default: 'horizontal',
         },
         direction: {
            type: String,
            required: false,
            default: 'ltr',
         },
         behaviour: {
            type: String,
            required: false,
            default: 'snap',
         },

         tooltips: {
            type: [Boolean, Array, Function],
            required: false,
            default: true,
         },
         format: {
            type: [Object, Function, Boolean],
            required: false,
            default: null,
         },
         merge: {
            type: Number,
            required: false,
            default: -1,
         },
         classes: {
            type: Object,
            required: false,
            default: () => ({}),
         },
         showTooltip: {
            type: String,
            required: false,
            default: 'always',
         },
         tooltipPosition: {
            type: String,
            required: false,
            default: null,
         },
      },
      setup(props, context) {
         debug(['Slider.setup.props', props])
         const {
                  modelValue,
                  modelModifiers,
                  id,
                  disabled,
                  options,
                  orientation,
                  direction,
                  merge,
                  behaviour,
                  connect,
                  margin,
                  padding,
                  limit,
                  step,
                  range,
                  pips,
                  tooltips,
                  animate,
                  animationDuration,
                  snap,
               } = toRefs(props)

         // этих полей в options быть не должно
         delete options.value.id
         delete options.value.disabled
         delete options.value.style
         delete options.value.orientation
         delete options.value.direction
         delete options.value.tooltips

         // ================ DATA ================
         const initValue = toRaw(modelValue.value)

         //const value = useValue(props) // no export

         const classes = useClasses(props, context)
         const tooltip = useTooltip(props, context, {
            modelValue: modelValue,
            classList: classes.classList,
         })

         // const slider = useSlider(props, context, {
         //   initValue: initValue,
         //   modelValue: modelValue,
         //   classList: classes.classList,
         //   tooltipsFormat: tooltip.tooltipsFormat,
         //   tooltipsMerge: tooltip.tooltipsMerge,
         // })

         // ============ DEPENDENCIES ============

         //const {modelValue, initValue, tooltipsFormat, tooltipsMerge, classList} = dependencies

         // ================ DATA ================

         const slider = ref(null)

         const slider$ = ref(null)

         // no export
         const inited = ref(false)

         // ============== COMPUTED ==============

         // no export
         const defaultOptions = {
            cssPrefix: '',
            orientation: 'horizontal',
            direction: 'ltr',
            tooltips: false,
            connect: 'lower',
            start: 0,
            range: { min: 0, max: 100 },
            step: 1,
         }

         // no export
         const initOptions = computed(() => {
            const opt = {
               cssClasses: classes.classList.value,
               tooltips: tooltips && tooltips.value && tooltip.format.value ? tooltip.format.value : false,
            }

            const f = function(field, refValue) {
               if (refValue !== undefined && refValue.value !== undefined) opt[field] = refValue.value
            }

            f('orientation', orientation)
            f('direction', direction)

            if (Array.isArray(modelValue.value)) opt.connect = true

            return Object.assign(opt, options.value)
         })

         // no export
         const userOptions = computed(() => {
            // range, step, margin, padding, limit, pips, animate, animationDuration, snap
            const opt = {}
            const f = function(field, refValue) {
               if (refValue !== undefined && refValue.value !== undefined) opt[field] = refValue.value
            }

            if (Array.isArray(modelValue.value)) {
               opt.connect = true
            }

            f('range', range)
            f('step', step)
            f('connect', connect)
            f('margin', margin)
            f('padding', padding)
            f('limit', limit)
            f('pips', pips)
            f('snap', snap)
            f('behaviour', behaviour)
            f('animate', animate)
            f('animationDuration', animationDuration)

            return opt
         })

         const isRange = computed(() => {
            return Array.isArray(modelValue.value)
         })

         // =============== METHODS ==============

         const reset = () => {
            emitUpdateValue(initValue.value)
         }

         /**
          * Получить текущие значения слайдера в формате float из самого компонента
          * no export
          */
         const getSliderValue = () => {
            const sliderValue = slider$.value.get()

            return Array.isArray(sliderValue) ? sliderValue.map(v => parseFloat(v)) : parseFloat(sliderValue)
         }

         const update = (val, triggerChange = true) => {
            debug(['Slider.value.set', val])
            slider$.value.set(val, triggerChange)
         }

         // no export
         const emitUpdateValue = val => {
            debug(['Slider.emit.input', val])
            context.emit('input', val)
            if (!modelModifiers.value.lazy) {
               debug(['Slider.emit.update:modelValue', val])
               context.emit('update:modelValue', val)
            }
         }

         const emitChangeValue = val => {
            debug(['Slider.emit.update:modelValue', val])
            context.emit('update:modelValue', val)
            debug(['Slider.emit.change', val])
            context.emit('change', val)
         }

         const isEquals = function(newVal, curVal) {
            if (isRange.value) return floatArraysEquals(newVal, curVal)

            if (Array.isArray(newVal)) newVal = newVal[0]
            return newVal == curVal
         }

         let initOptionsStr = ''
         let userOptionsStr = ''
         let ignoreUpdateOnce = false
         const initSlider = () => {
            let opts = {
               start: isNullish(modelValue.value) ? range.value.min : modelValue.value,
            }

            initOptionsStr = toComparableStr(initOptions.value)
            userOptionsStr = toComparableStr(userOptions.value)

            opts = Object.assign({}, defaultOptions, initOptions.value, userOptions.value, opts)
            debug(['Slider.initSlider', opts])
            slider$.value = nouislider.create(slider.value, opts)

            if (tooltips.value && isRange.value && merge.value >= 0) {
               tooltip.merge(slider.value, merge.value, ' - ')
            }

            // slider$.value.on('set', (val) => {
            //   if( !inited.value )
            //     return

            //   const sliderValue = getSliderValue()
            //   debug(['Slider.on.set', val, sliderValue, modelValue.value])
            //   if( !isEquals(sliderValue, modelValue.value) )
            //     emitUpdateValue(sliderValue)
            // })

            /**
             * Событие обновления бегунка по любой причине! изменилось хоть значение, хоть настройки
             */
            slider$.value.on('update', val => {
               if (!inited.value) return

               if (ignoreUpdateOnce == true) {
                  ignoreUpdateOnce = false
                  return
               }

               const sliderValue = getSliderValue()
               debug(['Slider.on.update', val, sliderValue, modelValue.value])

               if (isEquals(sliderValue, modelValue.value)) {
                  //IDN: если новое значение не отличается от старого, то вызываем только событие update???
                  debug(['Slider.emit.update', sliderValue])
                  context.emit('update', sliderValue)
                  // Required because set event is not triggered even though it should be
                  return
               }

               emitUpdateValue(sliderValue)
            })

            /** вызывается при окончании draga, либо про изменении положения клавой */
            slider$.value.on('change', val => {
               if (!inited.value) return

               const sliderValue = getSliderValue()
               debug(['Slider.on.change', val, sliderValue, modelValue.value])

               if (!isEquals(sliderValue, modelValue.value)) emitChangeValue(sliderValue)
            })

            slider.value.querySelectorAll('[data-handle]').forEach(handle => {
               handle.onblur = () => {
                  classes.classList.value.focused.split(' ').forEach(c => {
                     slider.value.classList.remove(c)
                  })
               }

               handle.onfocus = () => {
                  classes.classList.value.focused.split(' ').forEach(c => {
                     slider.value.classList.add(c)
                  })
               }
            })

            inited.value = true
         }

         const destroySlider = () => {
            debug('Slider.destroySlider')
            slider$.value.off()
            slider$.value.destroy()
            slider$.value = null
         }

         // ============== WATCHERS ==============
         const toComparableStr = obj => (JSON.stringify(obj) ?? '').replaceAll('"', '')

         const sliderProps = computed(() => {
            let sliderProps = {
               id: id && id.value ? id.value : undefined,
            }

            if (disabled.value) {
               sliderProps.disabled = true
            }

            return sliderProps
         })


         watch(slider, () => {
            watch(
               initOptions,
               () => {
                  debug('Slider.watch.initOptions')
                  const str = toComparableStr(initOptions.value)
                  if (initOptionsStr != str) {
                     initOptionsStr = str
                     inited.value = false
                     destroySlider()
                     initSlider()
                  }
               },
               { immediate: false },
            )

            watch(
               userOptions,
               () => {
                  debug('Slider.watch.userOptions')
                  const str = toComparableStr(userOptions.value)
                  if (userOptionsStr != str) {
                     userOptionsStr = str
                     const options = Object.assign({}, initOptions.value, userOptions.value, { start: modelValue.value })
                     debug(['Slider.updateOptions', options])
                     ignoreUpdateOnce = true
                     slider$.value.updateOptions(options)
                  }
               },
               { immediate: false },
            )
            /*
            noUiSlider has an updateOptions method that can change the
            'margin', 'padding', 'limit', 'step', 'range', 'pips', 'tooltips', 'animate' and 'snap' options.
            To update any other option, destroy the slider using slider.noUiSlider.destroy() and create a new one.
            */

            watch(
               modelValue,
               newValue => {
                  const sliderValue = getSliderValue()
                  debug(['Slider.watch.modelValue', newValue, sliderValue, modelValue.value])

                  // if( isNullish(newValue.value) ) {
                  //   updateUiSlider()
                  //   //update(range.value.min, false)
                  //   return
                  // }

                  if (!isEquals(newValue, sliderValue)) {
                     //updateUiSlider()
                     update(newValue, false)
                  }
               },
               { immediate: false, deep: true },
            )
         })

         onMounted(initSlider)

         onUnmounted(destroySlider)

         return {
            ...classes,
            ...tooltip,
            slider,
            sliderProps,
            update,
            reset,
            initSlider,
            destroySlider,
         }
      },
   })
</script>
