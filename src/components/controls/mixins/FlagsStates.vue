<script>
    /**
     * Флаги состояний узла
     * */
    export default {
        name: "FlagsStates",
        props:{
            /**
             * Флаг активного состояния узла.
             * Значение по-умолчанию - false.
             * @values true, false
             * */
            isActive: {
                type: Boolean,
                required: false,
                default: false,
            },
            /**
             * Флаг отображения аварийного состояния узла.
             * Значение по-умолчанию - false.
             * @values true, false
             * */
            isAlarm: {
                type: Boolean,
                required: false,
                default: false,
            },
            /**
             * Флаг отображения информационного состояния узла.
             * Значение по-умолчанию - false.
             * @values true, false
             * */
            isInfo:{
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Флаг подготовительного состояния узла.
             * Значение по-умолчанию - false.
             * @values true, false
             * */
            isPrepared: {
                type: Boolean,
                required: false,
                default: false
            },
            /**
             * Флаг отображения предупреждающего состояния узла.
             * Значение по-умолчанию - false.
             * @values true, false
             * */
            isWarning: {
                type: Boolean,
                required: false,
                default: false,
            },
        }
    }
</script>

<style scoped>

</style>

