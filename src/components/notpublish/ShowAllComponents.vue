<template>
    <div class="dark mainContainer" style="height: 100%">
        <BorderPane>

            <template v-slot:top>
                <Header/>
            </template>
            <template v-slot:left>
                <NavigationMenu
                        :buttons="pages" @navigate="setActivePage"
                />
            </template>
            <template v-slot:center>
                <Main v-if="pages.Main.vIf" v-show="pages.Main.active"/>
                <Layouts v-if="pages.Layouts.vIf" v-show="pages.Layouts.active"/>
                <Controls v-if="pages.Controls.vIf" v-show="pages.Controls.active"/>
                <SvgImages v-if="pages.SvgImages.vIf" v-show="pages.SvgImages.active"/>
            </template>
            <template v-slot:bottom>
                <div>bottom</div>
            </template>

        </BorderPane>
    </div>
</template>

<script>
    import {reactive} from "vue";
    import NavigationMenu from "@/components/controls/NavigationMenu";

    import BorderPane from "../layout/BorderPane";

    import Layouts from "@/components/notpublish/Layouts";
    import Controls from "@/components/notpublish/controls/Controls";
    import Header from "@/components/notpublish/Header";
    import Main from "@/components/notpublish/Main";
    import SvgImages from "@/components/notpublish/SvgImages";

    // function debug() {    }
    function debug(val) { console.debug(val) }

    export default {
        name: "ShowAllComponents",
        data() {
            return {
                popupIsShow: false,
            }
        },
        components: {
            SvgImages,
            Main,
            Header,
            Controls,
            Layouts,

            BorderPane,
            NavigationMenu
        },
        setup() {
            const pages = reactive({
                Main: {
                    title: 'Основной экран',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: true,
                },
                Layouts: {
                    title: 'Панели компоновки',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: false,
                },
                Controls: {
                    title: 'Элементы управления',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: false,
                },
                SvgImages:{
                    title: 'Svg изображения',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: false,
                }
            })

            var activePage = ''

            function setActivePage(page) {
                debug(['setActivePage', page])
                if (activePage === page) return

                if (activePage != '') pages[activePage].active = false

                if (page !== '' && pages[page].allow) {
                    pages[page].vIf |= true // если хоть раз открыли, то кешируем true, чтобы страница не грохнулась при переключении на другую
                    pages[page].active = true
                    debug('setActivePage ok')
                }
                activePage = page
            }

            setActivePage('Main')

            return {
                pages,
                setActivePage
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>