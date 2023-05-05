<script lang="ts">
    import {defineComponent} from "vue"
    /**
     * Текущее значение параметра
     * */
    export default defineComponent({
        name: "ElmMixinValue",
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
    })
</script>