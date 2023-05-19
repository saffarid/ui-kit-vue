<template>
    <Popup class="dialog-pane" @dismiss="$emit('dismiss')">
        <template v-slot:default>
            <div class="dialog-pane-body">
                <div class="dialog-pane-title">{{title}}</div>

                <div class="dialog-pane-content">
                    <slot></slot>
                </div>

                <div class="button-bar">
                    <Button class="positive-button"
                            v-if="positiveButton != undefined || positiveButton != null"
                            :options="positiveButton"/>

                    <Button class="neutral-button"
                            v-if="neutralButton != undefined || neutralButton != null"
                            :options="neutralButton"/>

                    <Button class="negative-button"
                            v-if="negativeButton != undefined || negativeButton != null"
                            :options="negativeButton"/>
                </div>
            </div>
        </template>
    </Popup>
</template>

<script>
   import Button         from '../../controls/input/button/Button'
   import {button_types} from '../../controls/input/button/button_types'
   import Popup          from './Popup.vue'

   export default {
      name: 'DialogPane',
      components: {
         Popup,
         Button,
      },
      emits: ['dismiss'],
      props: {
         title: {
            type: String,
            required: false,
            default: '',
         },
         positiveButton: {
            type: Object,
            required: false,
            default: null,
         },
         neutralButton: {
            type: Object,
            required: false,
            default: null,
         },
         negativeButton: {
            type: Object,
            required: false,
            default: null,
         },
      },
      setup() {
         return {
            button_types,
         }
      },
   }
</script>

<style lang="scss">
    .dialog-pane {
        .body {
            .dialog-pane-body {
                display: grid;
                grid-template-rows: repeat(auto-fit, min-content);

                .button-bar {
                    display: flex;
                    column-gap: 5px;
                    justify-content: end;

                    .button {
                        .page-load {
                            min-height: 28px;
                        }
                    }
                }
            }
        }
    }
</style>