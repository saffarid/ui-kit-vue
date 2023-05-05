<template>
    <div class="navigation-menu">
        <template v-for="(btn,name) in buttons" :key="name">
            <ElmButton
                    :class="{'active':btn.active, 'changed':btn.changed}"
                    @click="$emit('navigate', name)"
                    :options="{
                       type: button_types.simpleButton
                    }">

                <component :is="btn.img"/>
                <span>{{btn.title}}</span>

            </ElmButton>
        </template>
    </div>
</template>

<script lang="ts">
   import ElmButton from './input/button/Button.vue'
   import { button_types } from './input/button/button_types'
   import { defineComponent } from 'vue'

   export default defineComponent({
      name: 'NavigationMenu',
      components: {
         ElmButton,
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
   })
</script>
