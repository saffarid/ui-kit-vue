<template>

    <BorderPane>
        <template v-slot:center>
            <div class="controls">
                <ElementsContorl v-if="pages.Controls.vIf" v-show="pages.Controls.active"/>
                <ElectroSchemeCard v-if="pages.Scheme.vIf" v-show="pages.Scheme.active"/>
                <ElementsLimited v-if="pages.LimitedControls.vIf" v-show="pages.LimitedControls.active" />
            </div>
        </template>
        <template v-slot:right>
            <NavigationMenu :buttons="pages" @navigate="setActivePage"/>
        </template>
    </BorderPane>

</template>

<script>
    import {reactive} from "vue"
    import ElectroSchemeCard from "@/components/notpublish/controls/ElectroSchemeCard";
    import ElementsContorl from "@/components/notpublish/controls/ElementsContorl";
    import ElementsLimited from "@/components/notpublish/controls/ElementsLimited";
    import BorderPane from "@/components/layout/BorderPane";
    import NavigationMenu from "@/components/controls/NavigationMenu";

    /**
     * Страничка отображения доступных элементов управления
     * */
    export default {
        name: "Controls",
        components: {
            NavigationMenu,
            BorderPane,
            ElementsLimited,
            ElementsContorl,
            ElectroSchemeCard,
        },

        setup(){

            const pages = reactive({
                Controls: {
                    title: 'Controls',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: true,
                },
                Scheme: {
                    title: 'Scheme',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: false,
                },
                LimitedControls: {
                    title: 'LimitedControls',
                    active: false,
                    allow: true,
                    changed:false,
                    vIf: false,
                },
            })
            var activePage = 'Controls'
            function setActivePage(page) {
                if (activePage === page) return

                if (activePage != '') pages[activePage].active = false

                if (page !== '' && pages[page].allow) {
                    pages[page].vIf |= true // если хоть раз открыли, то кешируем true, чтобы страница не грохнулась при переключении на другую
                    pages[page].active = true
                }
                activePage = page
            }

            return {
                pages,
                setActivePage
            }
        }
    }
</script>

<style lang="scss" scoped>

    .controls {
        display: grid;
        padding: 5px;
        grid-gap: 5px;
        grid-template-columns: repeat(auto-fit, minmax(810px, 1fr));
    }

</style>