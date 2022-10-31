<template>
    <input class="text-field"
            ref="input"
            :type="type"
            :value="inputValue"
            :step="step"
            :min="min"
            :max="max"
            :maxlength="maxLength"
            :class="{'error-blink': errorBlink}"
            @input="onInput"
            @change="onChange"
            @blur="onBlur"/>
</template>

<script>
    import {ref} from 'vue'
    import Value from "../mixins/Value";

    function debug() {
    }

    //function debug(val) { console.debug(val) }

    const isNumericRegex = /^[\+\-]?\d+([\.\,]\d)?$/ // eslint-disable-line
    function isNumeric(value) {
        return isNumericRegex.test(value)
    }

    /**
     * Поле текстового ввода
     * */
    export default {
        name: 'TextField',
        mixins: [
            Value
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
            modelModifiers: {
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
        watch: {
            modelValue: {
                handler: function (newValue) {
                    debug(['UText.watch.modelValue', newValue, this.inputValue, this.modelValue])
                    if (newValue != this.inputValue) this.setValue(newValue, true, false)
                },
                immediate: false,
                deep: true,
            },
        },
        emits: ['update:modelValue'],
        setup(props) {
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

            let formatFunc
            if (typeof format.value === 'function') formatFunc = format.value
            else if (type.value === 'number') {
                const found = step.value.toString().match(/[\.\,](\d+)$/) // eslint-disable-line
                if (found && found.length > 1) {
                    const deceminals = found[1].length
                    formatFunc = function (value) {
                        return Number(value).toFixed(deceminals)
                    }
                }
            }

            if (!formatFunc) {
                formatFunc = function (value) {
                    return value === undefined ? '' : value.toString()
                }
            }

            return {
                errorBlink: ref(false),
                inputValue: formatFunc(modelValue.value),
                formatFunc,
            }
        },
        methods: {
            emitValue: function (value) {
                //const value = (event.target.type == 'number' || this.modelModifiers.number)? Number(event.target.value) : event.target.value
                debug(['UText.emit.update:modelValue', value])
                this.$emit('update:modelValue', value)
            },
            /**
             * @param newVal - новое значение для поля ввода
             * @param applyFormatValue - присвоить форматированное или сырое значение в inputValue
             * @param emitValue - уведомить об изменении значения
             */
            setValue: function (newVal, applyFormatValue, emitValue) {
                debug(['UText.setValue', newVal, applyFormatValue, emitValue])

                const input = this.$refs.input
                newVal = newVal === undefined ? '' : newVal.toString()
                let value = newVal
                let formatValue = newVal
                let error = false
                if (input.type == 'number' || this.modelModifiers.number) {
                    value = value.replace(/[,\.]$/, '') // eslint-disable-line
                    error = !isNumeric(value)
                    if (error) debug(['UText.setValue', 'value is not a number'])
                    else {
                        value = Number(value)
                        if (this.step != 1 && isNumeric(this.step)) value = Math.round(value / this.step) * this.step

                        if (isNumeric(this.min) && value < this.min) value = this.min
                        else if (isNumeric(this.max) && value > this.max) value = this.max
                        //debug(`UText.setValue.fix ${}`)
                    }
                } else {
                    if (this.regex) {
                        error = !this.regex.test(value)
                        if (error) debug(['UText.setValue', `regex(${this.regex}).test('${value}') fail`])
                    }

                    if (!error) {
                        //debug(["min,max,step", input.min, input.max, step.value])
                        error =
                            (isNumeric(this.maxLength) && value.length > Number(this.maxLength)) ||
                            (isNumeric(this.minlength) && value.length < Number(this.minlength))
                        if (error) debug(['UText.setValue', 'length fail'])
                    }
                }

                if (!error) formatValue = this.formatFunc(value)

                this.errorBlink = error
                this.inputValue = applyFormatValue ? formatValue : newVal
                if (applyFormatValue)
                    // для гарантии
                    this.$refs.input.value = this.inputValue

                if (!error && emitValue) this.emitValue(value)

                //debug(['result', this.errorBlink, this.inputValue, input.value])
                return {error, value, formatValue}
            },
            onInput: function (event) {
                debug(['UText.onInput', event])
                this.setValue(event.target.value, false, !this.modelModifiers.lazy)
            },
            onChange: function (event) {
                debug(['UText.onChange', event])
                this.setValue(event.target.value, true, true)
            },
            onBlur: function (event) {
                debug(['UText.onBlur', event])
                const curValue = this.inputValue
                const newValue = event.target.value
                let res = this.setValue(newValue, true, true)
                if (res.error) {
                    // если новое значение кривое, то попытаемся присвоить обратно исходное значение
                    res = this.setValue(curValue, true, true)
                    if (res.error) {
                        res = this.setValue(this.modelValue, true, true)
                        if (res.error) {
                            // все значения кривые, поэтому возвращаем последнее введенное юзером и пусть сам его правит
                            res = this.setValue(newValue, true, true)
                        }
                    }
                }
            },
        },
    }
</script>
