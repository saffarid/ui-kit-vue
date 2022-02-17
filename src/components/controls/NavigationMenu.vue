<template>
    <div class="navigation-menu">
        <for v-for="(btn,name) in buttons" :key="name">
            <Button
                    :class="{'active':btn.active, 'changed':btn.changed}"
                    :text="btn.title"
                    @click="$emit('navigate', name)"/>
        </for>
    </div>
</template>

<script>
    import Button from "./input/Button";
    // import MenuImg from '@/assets/svg_img/MenuImg'

    export default {
        name: 'NavigationMenu',
        components: {
            Button,
            // MenuImg
        },
        emits: ['navigate'],
        props: {
            buttons: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style lang="scss">

    .navigation-menu{
        display: grid;
        padding: 5px;
        gap: 5px;
        overflow-y: auto;

        .button {
            &:hover {
                border-left-color: var(--border_color_hover);
            }
            &.active {
                border-left-color: var(--border_color_hover);
            }
            &.changed {
                border-right-color: var(--border_color_hover);
            }
        }

    }

</style>