<template>
    <div class="row" :class="containerStyle" ref="row" :style="varSize">
        <slot></slot>
        <div class="optional">
            <slot name="optional">
                <div></div>
            </slot>
        </div>
    </div>
</template>

<script>
    import calcSize from "./calcSize";

    import {
        ref,
        reactive,
        // computed,
        watch,
        onMounted
    } from 'vue'

    /**
     * Компонент-строка, адаптирует положение
     * активного элемента таким образом,
     * что он всегда располагается по центру окна браузера.
     * */
    export default {
        name: 'Row',
        setup() {
            const varSize = calcSize()
            const row = ref(null)

            const containerStyle = ref('')

            const widths = reactive({
                minWidthCol: 200,
                maxWidthCol1: 400,
                maxWidthCol2: 400,
            })

            const calcStyle = () => {
                const r = (widths.maxWidthCol1 + widths.maxWidthCol2 + 5)*1.0
                console.log('r' + r)
                console.log('clientWidth' + row.value.clientWidth)
                if(row.value.clientWidth > r){
                    console.log('row-1')
                    containerStyle.value = 'row-1'
                } else {
                    console.log('row-2')
                    containerStyle.value = 'row-2'
                }
            }

            watch(row, () => {
                console.log('Навешиваем слушателя')
                window.onresize = () => {
                    console.log('Изменение размеров')
                    calcStyle()
                }
            })


            onMounted(() => {
                widths.maxWidthCol1 = parseFloat(varSize["--maxWidthCol1"].replace('px', ''))
                widths.maxWidthCol2 = parseFloat(varSize["--maxWidthCol2"].replace('px', ''))
                widths.minWidthCol = parseFloat(varSize["--minWidthCol"].replace('px', ''))
                calcStyle()
            })

            return {
                containerStyle,
                row,
                varSize
            }
        }
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