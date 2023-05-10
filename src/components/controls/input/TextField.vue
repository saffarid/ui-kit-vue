<template>
    <input
            class="text-field"
            ref="tField"
            :type="type"
            :value="inputValue"
            :step="step"
            :min="min"
            :max="max"
            :maxlength="max_length"
            :class="{'error-blink': errorBlink, 'change-blink': changeBlink}"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"/>
</template>

<script>
   import {
      computed,
      ref,
      watch,
   }                 from 'vue'
   import MixinValue from './../mixins/MixinValue'

   const isNumericRegex = /^[\+\-]?\d+([\.\,]\d)?$/ // eslint-disable-line
   function isNumeric(value) {
      return isNumericRegex.test(value)
   }

   function debug() {
   }

   //function debug(val) { console.debug(val) }


   /**
    * Поле текстового ввода
    * */
   export default {
      name: 'TextField',
      mixins: [
         MixinValue,
      ],
      props: {
         /**
          * Предыдущее значение.
          * При отличии текущего значения от предыдущего,
          * компонент оповещает об изменении.
          * */
         prevValue: {
            type: [String, Number],
            required: false,
            default: '',
         },
         /**
          * Тип вводимого значения
          * @values См. атрибут type тега input
          * */
         type: {
            type: String,
            required: false,
            default: 'text',
         },
         /**
          * Регулярное выражение для проверки корректности вводимого значения.
          * */
         regex: {
            type: RegExp,
            required: false,
         },
         mododifiers: {
            default: () => ({}),
         },
         format: {
            type: Function,
            required: false,
            //default: () => { return (value) => value.toString() },
         },
         /**
          * Шаг изменения численного значения поля.
          * @values Любое положительное число.
          * */
         step: {
            type: Number,
            required: false,
            default: 1,
         },
         /**
          * Минимальное значение поля
          * */
         min: {
            type: Number,
            required: false,
            default: 0,
         },
         /**
          * Максимальное значение поля
          * */
         max: {
            type: Number,
            required: false,
            default: 0,
         },
         /**
          * Максимальное кол-во символов в поле.
          * @values Любое целое не отрицательное число.
          * */
         maxLength: {
            type: Number,
            required: false,
            default: 524288,
         },
      },
      emits: ['update:modelValue'],
      setup(props, context) {
         const tField = ref(null)
         //!!! если использовать такую запись, то если этого элемента нет в props,
         // то получим что сама переменная (например format) будет undefined
         //const {modelValue, format, type, step, min, max} = toRefs(props)
         // а если писать так, то format будет существовать, а format.value будет undefined, что гораздо удобнее!!!
         const modelValue = ref(props.modelValue)
         const format = ref(props.format)
         const type = ref(props.type)
         const step = ref(props.step)
         //const min = ref(props.min)
         //const max = ref(props.max)
         const errorBlink = ref(false)

         let max_length
         if (props.mododifiers.ip) {
            max_length = 16
         }
         else {
            max_length = props.maxLength
         }

         let formatFunc
         if (typeof format.value === 'function') {
            formatFunc = format.value
         }
         else if (type.value === 'number') {
            const found = step.value.toString().match(/[\.\,](\d+)$/) // eslint-disable-line
            if (found && found.length > 1) {
               const deceminals = found[1].length
               formatFunc = function(value) {
                  return Number(value).toFixed(deceminals)
               }
            }
         }

         if (!formatFunc) {
            formatFunc = function(value) {
               return value === undefined ? '' : value.toString()
            }
         }

         const inputValue = ref(formatFunc(modelValue.value))

         const emitVal = (value) => {
            debug(['TextField.emit.update:modelValue', value])
            context.emit('update:modelValue', value)
         }

         /**
          * @param newVal - новое значение для поля ввода
          * @param applyFormatValue - присвоить форматированное или сырое значение в inputValue
          * @param emitValue - уведомить об изменении значения
          */
         const setValue = (newVal, applyFormatValue, emitValue, commit = false) => {
            debug(['TextField.setValue', newVal, applyFormatValue, emitValue])

            const input = tField.value
            newVal = newVal === undefined ? '' : newVal.toString()
            let value = newVal
            let formatValue = newVal
            let error = false
            let applyToInput = false
            let selectIndex = tField.value.selectionStart
            if (input.type == 'number' || props.mododifiers.number) {
               value = parseFloat(value)
               error = isNaN(value)
               if (error) {
                  debug(['UText.setValue', 'value is not a number', value])
               }
               else {
                  value = Number(value)
                  if (props.step != 1 && isNumeric(props.step)) value = Math.round(value / props.step) * props.step

                  if (isNumeric(props.min) && value < props.min) {
                     value = props.min
                  }
                  else if (isNumeric(props.max) && value > props.max) value = props.max
                  //debug(`TextField.setValue.fix ${}`)
               }
            }
            else {
               const wrongSym = /["'`\\]/g
               if (wrongSym.test(value)) {
                  value = value.replace(wrongSym, '')
                  selectIndex -= 1
                  newVal = value
                  applyToInput = true
               }

               if (props.mododifiers.upperCase) {
                  value = value.toUpperCase()
                  newVal = value
                  applyToInput = true
               }
               if (props.mododifiers.ip) {
                  const patternIP =
                           /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
                  const segIpPattern = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
                  const pointPattern = /\.{2,}/g
                  let pointCounter = 0
                  let wrongPointIndex = 100

                  value = value.replaceAll(',', '.')
                  if (value == '.') {
                     value = value.replace('.', '')
                  }
                  // value = value.replace(/[^0-9.,]/g, '')
                  if (/[^0-9.,]/g.test(value)) {
                     value = value.replace(/[^0-9.,]/g, '')
                     selectIndex -= 1
                  }
                  value = value.replace(pointPattern, '.')

                  for (let i = 0; i < value.length; i++) {
                     if (value.charAt(i) == '.') pointCounter++
                     if (pointCounter > 3) {
                        wrongPointIndex = i
                        break
                     }
                  }
                  value = value.slice(0, wrongPointIndex)

                  const segmentsIp = value.split('.')
                  const oldSegmentsIp = inputValue.value.split('.')

                  for (let segmentIndex = 0; segmentIndex < segmentsIp.length; segmentIndex++) {
                     const segment = segmentsIp[segmentIndex]
                     const oldSegment = oldSegmentsIp[segmentIndex]

                     if (segment == oldSegment) continue

                     const s = segIpPattern.exec(segment)
                     if (s == null) continue
                     if (s[0].length > 1) {
                        if (s[0].startsWith('0')) {
                           s[0] = s[0].substring(1)
                        }
                        if (s[0].startsWith('00')) {
                           s[0] = s[0].substring(2)
                        }
                     }

                     if (s[0].length == 3 && s[0].length == oldSegment.length) {
                        for (let charIndex = 0; charIndex < 3; charIndex++) {
                           if (s[0].charAt(charIndex) != oldSegment.charAt(charIndex)) {
                              s[0] = s[0].substring(0, charIndex + 1) + oldSegment.substring(charIndex + 1)
                              break
                           }
                        }
                     }

                     if (inputValue.value.charAt(selectIndex - 1) == '.' && parseInt(segment) > 255) {
                        selectIndex = selectIndex - 1
                     }

                     if (parseInt(s[0]) > 255) s[0] = '255'

                     value = value.replace(segment, s[0])
                  }

                  newVal = value
                  applyToInput = true
               }
               if (props.regex && commit) {
                  error = !props.regex.test(value)
                  if (error) debug(['TextField.setValue', `regex(${props.regex}).test('${value}') fail`])
               }

               if (!error) {
                  //debug(["min,max,step", input.min, input.max, step.value])
                  error =
                     (isNumeric(props.maxLength) && value.length > Number(props.maxLength)) ||
                     (isNumeric(props.minlength) && value.length < Number(props.minlength))
                  if (error) debug(['TextField.setValue', 'length fail'])
               }
            }

            if (!error) formatValue = formatFunc(value)

            errorBlink.value = error
            inputValue.value = applyFormatValue ? formatValue : newVal
            if (applyFormatValue || applyToInput)
               // для гарантии
            {
               input.value = inputValue.value
            }
            if (selectIndex != null) {
               tField.value.selectionStart = tField.value.selectionEnd = selectIndex
            }
            if (!error && emitValue) emitVal(value)

            //debug(['result', this.errorBlink, this.inputValue, input.value])
            return { error, value, formatValue }
         }

         const onInput = (event) => {
            debug(['TextField.onInput', event])
            setValue(event.target.value, false, !props.mododifiers.lazy)
         }

         const onChange = (event) => {
            debug(['TextField.onChange', event])
            setValue(event.target.value, true, true)
         }

         const onBlur = (event) => {
            debug(['TextField.onBlur', event])
            const curValue = inputValue.value
            const newValue = event.target.value
            let res = setValue(newValue, true, true)
            if (res.error) {
               // если новое значение кривое, то попытаемся присвоить обратно исходное значение
               res = setValue(curValue, true, true)
               if (res.error) {
                  res = setValue(modelValue, true, true)
                  if (res.error) {
                     // все значения кривые, поэтому возвращаем последнее введенное юзером и пусть сам его правит
                     res = setValue(newValue, true, true)
                  }
               }
            }
         }

         watch(props, () => {
            modelValue.value = props.modelValue
            format.value = props.format
            type.value = props.type
            step.value = props.step
         })

         watch(modelValue, (newValue) => {
               debug(['TextField.watch.modelValue', newValue, inputValue.value, modelValue.value])
               if (newValue != inputValue.value) setValue(newValue, true, false)
            },
            {
               immediate: false,
               deep: true,
            })

         const changeBlink = computed(() => {
            debug(['TextField.compute.changeBlink', modelValue.value, props.prevValue])
            if (props.prevValue === undefined) return false
            if (typeof modelValue.value == 'string') {
               return modelValue.value.localeCompare(props.prevValue.toString()) != 0
            }
            else {
               return props.prevValue != modelValue.value
            }
         })

         return {
            max_length,
            tField,
            changeBlink,
            errorBlink,
            inputValue,
            formatFunc,
            setValue,
            onInput,
            onChange,
            onBlur,
         }
      },
   }
</script>
