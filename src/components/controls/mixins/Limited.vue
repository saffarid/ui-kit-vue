<script>
    /**
     * Ограничение величины диапазоном минимального и максимального значения
     * */
    export default {
        name: "Limited",
        props:{
            /**
             * Минимальное значение.
             * Не обязательное для заполнения.
             * @default 0
             * @values Любое числовое значение.
             * */
            minLimit: {
                type: Number,
                required: false,
                default: 0.0,
            },
            /**
             * Максимальное значение.
             * Обязательное для заполнения.
             * @values Любое числовое значение.
             * */
            maxLimit: {
                type: Number,
                required: true,
            }
        },

    }
</script>

<style scoped>

</style>