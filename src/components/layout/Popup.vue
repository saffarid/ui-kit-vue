<template>
   <div class="popup_wrapper" ref="popupWrapper">
      <div class="closer" @click="$emit('close')"></div>
      <div class="popup">
         <div class="popup_header">
            <p>
               {{title}}
            </p>
            <div>
<!--               <img height="25" width="25" src="@/assets/img/close.png" @click="$emit('close')" />-->
            </div>
         </div>
         <div class="content">
            <slot name="content" />
         </div>
         <div class="footer">
            <slot name="footer" />
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Popup',
      props: {
         title: {
            type: String,
            required: false,
         },
      },
      emits: ['close'],
      /*mounted() {
                  let vm = this;
                  document.addEventListener('click', function (item) {
                      if (item.target === vm.$refs['popupWrapper']) {
                          vm.close();
                      }
                  })
              }*/
   }
</script>

<style lang="scss" scoped>

    .popup_wrapper {
        display: grid;
        align-self: stretch;
        align-items: center;
        justify-items: center;
        background-color: rgba(64, 64, 64, 0.4);
        position: absolute;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        color: white;

        .closer{
            display: grid;
            background-color: transparent;
            align-self: stretch;
            justify-self: stretch;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .popup {
            z-index: 2;
            display: grid;
            grid-template-rows: auto auto auto;
            color: var(--text_color);
            padding: 5px;
            background-color: var(--pane_color);
            min-width: 700px;
            max-width: 1000px;
            box-shadow: black 0 0 20px;

            .numberParam{
                justify-self: center;
            }
            .nameParam{
                justify-self: end;
            }
            .param{
                justify-items: start;
            }


            .popup_header {
                display: grid;
                grid-template-columns: 2fr 1fr;
                align-items: center;
                padding-bottom: 5px;
                border-bottom: 1px solid grey;

                p {
                    justify-self: left;
                }

                div {
                    justify-self: right;
                    cursor: pointer;
                }
            }

            .content {
                display: grid;
                gap: 5px;
                padding: 10px;

                .row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
                    gap: 5px;
                }

                .userInfo{
                    display: grid;
                    grid-template-rows: repeat(auto-fill, 34px);
                    gap: 10px;

                }

                .infoIo {
                    display: grid;
                    grid-template-rows: repeat(auto-fill, auto);
                    gap: 10px;

                    .infoIoRow {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        align-items: center;
                        align-content: stretch;
                        align-self: stretch;
                        gap: 10px;
                    }
                }
            }

            .footer{
                display: grid;
                .buttonsBar{
                    display: grid;
                    justify-self: end;
                    width: 50%;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;

                    .button{
                        padding-left: 5px;
                        padding-right: 5px;
                    }

                }
            }
        }
    }

</style>
