<template>
    <div class="card">
        <div class="title">{{ title }}</div>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            /**
             * Заголовок слоя.
             * Обязательно для заполнения.
             * */
            title: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style lang="scss" scoped>

        .card{

        .title{
            justify-self: stretch;
            text-align: start;
            padding: 10px;
            /*padding-left: 10px;*/
        }

        .content{
            padding: 5px;
            align-content: stretch;
            justify-content: stretch;
        }

    }

</style>