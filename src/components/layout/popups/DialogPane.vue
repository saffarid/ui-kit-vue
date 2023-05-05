<template>
    <ElmPopup class="dialog-pane" @dismiss="$emit('dismiss')">
        <template v-slot:default>
            <div class="dialog-pane-body">
                <div class="dialog-pane-title">{{title}}</div>

                <div class="dialog-pane-content">
                    <slot></slot>
                </div>

                <div class="button-bar">
                    <ElmButton class="positive-button"
                            v-if="positiveButton != undefined || positiveButton != null"
                            @click="positiveButton.action"
                            :options="{
                              type: button_types.loadingButton,
                              text: positiveButton.text,
                              isBusy: positiveButton.isBusy
                            }"/>

                    <ElmButton class="neutral-button"
                            v-if="neutralButton != undefined || neutralButton != null"
                            @click="neutralButton.action"
                            :options="{
                              type: button_types.loadingButton,
                              text: neutralButton.text,
                              isBusy: neutralButton.isBusy
                            }"/>

                    <ElmButton class="negative-button"
                            v-if="negativeButton != undefined || negativeButton != null"
                            @click="negativeButton.action"
                            :options="{
                              type: button_types.loadingButton,
                              text: negativeButton.text,
                              isBusy: negativeButton.isBusy
                            }"/>
                </div>
            </div>
        </template>
    </ElmPopup>
</template>

<script>
   import {
      ElmButton,
      button_types,
   }               from 'elemy-controls'
   import ElmPopup from './Popup.vue'

   export default {
      name: 'DialogPane',
      components: {
         ElmPopup,
         ElmButton,
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
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
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