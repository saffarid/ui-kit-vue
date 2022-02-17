<script>

    /**
     * Используется для указания требуемых размеров Svg изображения
     * */
    export default {
        name: "Size",
        props:{
            width:{
                type:Number,
                required: false,
                default: 25
            },
            height:{
                type: Number,
                required: false,
                default: 25
            },
        }
    }
</script>

<style scoped>

</style>