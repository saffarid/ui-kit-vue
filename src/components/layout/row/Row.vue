<template>
    <div class="row" :class="containerStyle" ref="rows" :style="varSize">
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

    /**
     * Компонент-строка, адаптирует положение
     * активного элемента таким образом,
     * что он всегда располагается по центру окна браузера.
     * */
    export default {
        name: 'Row',
        data() {
            return {
                minWidthCol: 200,
                maxWidthCol1: 400,
                maxWidthCol2: 400,
                /**
                 * Ширина компонента
                 * */
                width: 0
            }
        },
        computed: {
            containerStyle: function () {
                let rubicon = (this.maxWidthCol1 + this.maxWidthCol2 + 5) * 1.0
                console.log(this.width)
                if (this.width > rubicon) {
                    return {
                        'row-1': true,
                        'row-2': false,
                    }
                } else {
                    return {
                        'row-1': false,
                        'row-2': true,
                    }
                }
            }
        },
        mounted() {

            this.maxWidthCol1 = parseFloat(this.varSize["--maxWidthCol1"].replace('px', ''))
            this.maxWidthCol2 = parseFloat(this.varSize["--maxWidthCol2"].replace('px', ''))
            this.minWidthCol = parseFloat(this.varSize["--minWidthCol"].replace('px', ''))
            this.width = this.$refs.rows.clientWidth
            window.addEventListener('resize', () => {
                this.width = this.$refs.rows.clientWidth
            })
        },
        setup() {
            const varSize = calcSize()
            return {
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