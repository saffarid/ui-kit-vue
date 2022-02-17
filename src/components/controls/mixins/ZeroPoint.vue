
<script>
    /**
     * Используется для установки компонентам на основе SVG начальной точки отрисовки.
     * */
    export default {
        name: "ZeroPoint",
        props:{
            /**
             * Положение по оси X
             * @values Любое числовое значение
             * */
            x: {
                type: Number,
                required: false,
                default: 0
            },
            /**
             * Положение по оси Y
             * @values Любое числовое значение
             * */
            y: {
                type: Number,
                required: false,
                default: 0
            },
        }
    }
</script>

<style scoped>

</style>