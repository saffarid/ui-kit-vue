<template>
    <BorderPane>
        <template v-slot:left>
            <Logo/>
        </template>
        <template v-slot:right>
            LOGOUT
        </template>
    </BorderPane>
</template>

<script>
    import BorderPane from "@/components/layout/BorderPane";
    import Logo from "@/components/notpublish/Logo";
    export default {
        name: "Header",
        components: {Logo, BorderPane}
    }
</script>

<style scoped>

</style>