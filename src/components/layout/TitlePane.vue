<template>
    <div class="title_pane">
        <div class="title">{{ title }}</div>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TitlePane',
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

    .title_pane{

        display: grid;
        grid-template-rows: min-content auto;

        .title{
            justify-self: stretch;
            text-align: start;
        }

        .content{
            align-content: stretch;
            justify-content: stretch;
        }

    }

</style>