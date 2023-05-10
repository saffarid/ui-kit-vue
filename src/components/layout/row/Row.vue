<template>
    <div class="row" :class="containerStyle" ref="row" :style="varSize">
        <slot></slot>
        <div class="optional" ref="optional">
            <slot name="optional">
                <div></div>
            </slot>
        </div>
    </div>
</template>

<script>
    import calcSize from './calcSize'

    import {
        ref,
        watch,
        reactive,
        onMounted,
        onBeforeUpdate,
    } from 'vue'

    /**
     * Компонент-строка, адаптирует положение
     * активного элемента таким образом,
     * что он всегда располагается по центру окна браузера.
     * */
    export default {
        name: 'Row',
        setup() {
            const row = ref(null)
            const optional = ref(null)
            const varSize = calcSize()
            const containerStyle = reactive({
                'row-1': true,
                'row-2': false,
            })

            const pastWidths = reactive({
                row: 0,
                first: 0,
                second: 0,
            })

            const widths = {
                minWidthCol: 200,
                maxWidthCol1: 400,
                maxWidthCol2: 400,
            }

            const setPastWidths = () => {
                pastWidths.row = (row.value.clientWidth !== 0) ? (row.value.clientWidth) : (pastWidths.row)
                pastWidths.first = (row.value.childNodes[1].clientWidth !== 0) ? (row.value.childNodes[1].clientWidth) : (pastWidths.first)
                pastWidths.second = (row.value.childNodes[2].clientWidth !== 0) ? (row.value.childNodes[2].clientWidth) : (pastWidths.second)
            }

            const containerStyleCalc = () => {
                const rubicon = (widths.maxWidthCol1 + widths.maxWidthCol2 + 5) * 1.0
                if(row.value == null) return
                setPastWidths()
                const optionalW = pastWidths.row - pastWidths.first - pastWidths.second
                if(pastWidths.row === 0) return
                if (optionalW > rubicon) {
                    containerStyle['row-1'] = true
                    containerStyle['row-2'] = false
                }
                else {
                    containerStyle['row-1'] = false
                    containerStyle['row-2'] = true
                }
            }

            onMounted(() => {
                widths.maxWidthCol1 = parseFloat(varSize['--maxWidthCol1'].replace('px', ''))
                widths.maxWidthCol2 = parseFloat(varSize['--maxWidthCol2'].replace('px', ''))
                widths.minWidthCol = parseFloat(varSize['--minWidthCol'].replace('px', ''))
                containerStyleCalc()
            })

            onBeforeUpdate(() => {
                containerStyleCalc()
            })

            watch(row, () => {
                containerStyleCalc()
                window.addEventListener('resize', containerStyleCalc)
            })

            return {
                containerStyle,
                optional,
                varSize,
                row,
            }
        },
    }
</script>

<style>

    .row {
        display: grid;
        column-gap: 5px;
        align-content: center;
        align-items: center;
    }

    .row-1 {
        grid-template-columns: var(--maxWidthCol1) var(--maxWidthCol2) repeat(auto-fit, minmax(var(--minWidthCol), 1fr));
    }

    .row-2 {
        grid-template-columns: minmax(var(--minWidthCol), var(--maxWidthCol1)) minmax(var(--minWidthCol), var(--maxWidthCol2));
    }

    .row label {
        align-self: center;
        justify-self: end;
    }

    .row input {
        justify-self: stretch;
    }

    .optional {
        grid-column-end: span 2;
    }

</style>