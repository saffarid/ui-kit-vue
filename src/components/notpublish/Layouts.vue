<template>
    <div class="layouts">

        <Card title="Card">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
        </Card>

    </div>
</template>

<script>

    import Card from "@/components/layout/Card";
    /**
     * Страничка отображения доступных панелей компоновки
     * */
    export default {
        name: "Layouts",
        components: {
            Card,
        }
    }
</script>

<style lang="scss" scoped>

    .layouts{
        padding: 5px;
    }

</style>