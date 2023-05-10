<template>
    <div class="navigation-menu">
        <template v-for="(btn,name) in buttons" :key="name">
            <Button
                    :class="{'active':btn.active, 'changed':btn.changed}"
                    @click="$emit('navigate', name)"
                    :options="{
                       type: button_types.simpleButton
                    }">

                <component :is="btn.img"/>
                <span>{{btn.title}}</span>

            </Button>
        </template>
    </div>
</template>

<script>
   import Button from './input/button/Button.vue'
   import { button_types } from './input/button/button_types'

   export default {
      name: 'NavigationMenu',
      components: {
         Button,
      },
      emits: ['navigate'],
      props: {
         buttons: {
            type: Object,
            required: true,
         },
      },
      setup() {
         return {
            button_types,
         }
      },
   }
</script>
