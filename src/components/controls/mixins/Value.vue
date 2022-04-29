<script>

    /**
     * Текущее значение параметра
     * */
    export default {
        name: "Value",
        props: {
            /**
             * Текущее значение некоторой величины.
             * @values String, Number, Boolean
             * */
            modelValue: {
                type: [String, Number, Boolean],
                required: true,
                validator(val) {
                    if(val instanceof Boolean){
                        return val;
                    } else if (val instanceof Number){
                        return parseFloat(val)
                    } else {
                        return val;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>