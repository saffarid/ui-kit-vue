<template>
    <div class="navigation-menu">
        <for v-for="(btn,name) in buttons" :key="name">
            <Button
                    :class="{'active':btn.active, 'changed':btn.changed}"
                    @click="$emit('navigate', name)">
                <component :is="btn.img"/>
                <span>{{btn.title}}</span>
            </Button>
        </for>
    </div>
</template>

<script>

    import Button from "./input/Button";
    import {
        defineAsyncComponent
    }             from 'vue'

    export default {
        name: 'NavigationMenu',
        components: {
            Button,
        },
        emits: ['navigate'],
        props: {
            buttons: {
                type: Array,
                required: true,
            },
        },
        setup() {
            const getImage = (img) => {
                if (img === undefined || img === null) return
                return defineAsyncComponent(() => import(img))
            }

            return {
                getImage
            }
        }
    }
</script>

<style lang="scss">

    .navigation-menu {
        display: grid;
        grid-template-rows: repeat(auto-fit, 38px);
        padding: 5px;
        gap: 5px;
        overflow-y: auto;

        .button {
            justify-content: start;

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