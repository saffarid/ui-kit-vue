<template>
    <div class="navigation-menu">
        <template v-for="(btn,name) in buttons" :key="name">
            <Button
                    :class="{'active':btn.active}"
                    @click="$emit('navigate', name)">
                <component :is="btn.img"/>
                <span>{{btn.title}}</span>
            </Button>
        </template>
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
    }
</script>