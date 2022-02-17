<template>
    <Card title="Элементы отображения величин в определённых рамках">
        <Row>
            <TextLabel label="Стрелочный прибор"/>
            <ArrowView
                    :minLimit="arrow[0]"
                    :minSetpoint="arrow[1]"
                    :currentValue="arrowCurrent"
                    :maxSetpoint="arrow[2]"
                    :maxLimit="arrow[3]"
                    :isAlarm="arrowFlags[0]"
                    :isInfo="arrowFlags[1]"
                    :isWarning="arrowFlags[2]"
            />

            <template v-slot:optional>
                <div class="optionalSettings">
                    <Row>
                        <TextLabel label="Текущее значение. Обязательно. "/>
                        <Slider
                                :tooltips="false"
                                v-model="arrowCurrent"
                                :range="{min:0, max:400}"
                                :connect="true"
                        />
                    </Row>
                    <Row>
                        <div class="desc">
                            <TextLabel label="Уставки"/>
                            <TextLabel label="minLimit - нижняя граница, не обязательно. default - 0."/>
                            <TextLabel label="minSetpoint - нижняя уставка, обязательно."/>
                            <TextLabel label="maxSetpoint - верхняя уставка, обязательно."/>
                            <TextLabel label="maxLimit - верхняя границы, обязательно."/>
                        </div>
                        <Slider
                                :tooltips="false"
                                :modelValue="arrow"
                                :range="{min:0, max:400}"
                                :connect="true"
                                @update:modelValue="function(val) {
                              arrow = val
                            }"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Авария"/>
                        <Toggle
                                id="keyArrowAlarm"
                                v-model="arrowFlags[0]"
                                :false-value="false"
                                :true-value="true"
                                on-label="This is fine"
                                off-label="Авария"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Информация"/>
                        <Toggle
                                id="keyArrowActive"
                                v-model="arrowFlags[1]"
                                :false-value="false"
                                :true-value="true"
                                on-label="Компонент информирует"
                                off-label="Компонент не информирует"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Предупреждение"/>
                        <Toggle
                                id="keyArrowWarning"
                                v-model="arrowFlags[2]"
                                :false-value="false"
                                :true-value="true"
                                on-label="Компонент предупреждает"
                                off-label="Компонент не предупреждает"
                                width="200"
                        />
                    </Row>
                </div>
            </template>
        </Row>
        <Row>
            <TextLabel label="Круговой бар"/>
            <CircleBar
                    :minLimit="circle[0]"
                    :maxLimit="circle[1]"
                    :currentValue="circleCurrent"
                    :isAlarm="circleFlags[0]"
                    :isActive="circleFlags[1]"
                    :isWarning="circleFlags[2]"
                    :countDivide="circleDivider"
            />
            <template v-slot:optional>
                <div class="optionalSettings">
                    <Row>
                        <TextLabel label="Текущее значение"/>
                        <Slider
                                :tooltips="false"
                                v-model="circleCurrent"
                                :range="{min:0, max:20}"
                                :connect="true"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Уставки"/>
                        <Slider
                                :tooltips="false"
                                :modelValue="circle"
                                :range="{min:0, max:20}"
                                :connect="true"
                                @update:modelValue="function(val) {
                              circle = val
                            }"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Авария"/>
                        <Toggle
                                id="keyCircleAlarm"
                                v-model="circleFlags[0]"
                                :false-value="false"
                                :true-value="true"
                                on-label="This is fine"
                                off-label="Авария"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Активность"/>
                        <Toggle
                                id="keyCircleActive"
                                v-model="circleFlags[1]"
                                :false-value="false"
                                :true-value="true"
                                on-label="Компонент активен"
                                off-label="Компонент не активен"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Предупреждение"/>
                        <Toggle
                                id="keyCircleWarning"
                                v-model="circleFlags[2]"
                                :false-value="false"
                                :true-value="true"
                                on-label="Компонент предупреждает"
                                off-label="Компонент не предупреждает"
                                width="200"
                        />
                    </Row>
                </div>
            </template>
        </Row>
        <Row>
            <TextLabel label="Горизонталиный бар"/>
            <HorizontalBar
                    :minLimit="hor[0]"
                    :minSetpoint="hor[1]"
                    :currentValue="horCurrent"
                    :maxSetpoint="hor[2]"
                    :maxLimit="hor[3]"
            />
            <template v-slot:optional>
                <div class="optionalSettings">
                    <Row>
                        <TextLabel label="Текущее значение"/>
                        <Slider
                                :tooltips="false"
                                v-model="horCurrent"
                                :range="{min:0, max:400}"
                                :connect="true"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="Уставки"/>
                        <Slider
                                :tooltips="false"
                                :modelValue="hor"
                                :range="{min:0, max:400}"
                                :connect="true"
                                @update:modelValue="function(val) {
                              hor = val
                            }"
                        />
                    </Row>
                </div>
            </template>
        </Row>
    </Card>
</template>

<script>
    import Card from "@/components/layout/Card";
    import Row from "@/components/layout/row/Row";
    import TextLabel from "@/components/controls/TextLabel";
    import ArrowView from "@/components/controls/ArrowView";
    import CircleBar from "@/components/controls/CircleBar";
    import HorizontalBar from "@/components/controls/HorizontalBar";
    import Slider from "@/components/controls/input/slider/Slider";
    import Toggle from "@/components/controls/input/toggle/Toggle";

    export default {
        name: "ElementsLimited",
        data() {
            return {
                arrow: [0, 120, 250, 320],
                arrowCurrent: 150,
                arrowFlags:[false, false, false],
                circle: [0, 10],
                circleCurrent: 5,
                circleDivider: 1,
                circleFlags: [false, false, false],
                hor: [0, 120, 250, 320],
                horCurrent: 150,
            }
        },
        components: {
            Toggle,
            ArrowView,
            Card,
            CircleBar,
            HorizontalBar,
            Row,
            Slider,
            TextLabel
        }
    }
</script>

<style lang="scss" scoped>

    .row {
        /*border-top: 1px grey solid;*/
        border-bottom: 1px grey solid;
        padding: 5px;

        .optionalSettings {
            display: grid;
            gap: 10px;

            .row {
                /*grid-template-columns: 350px auto;*/
                border: 0px grey solid;
                padding: 0;
                column-gap: 10px;
                .desc{
                    display: grid;
                    justify-self: start;
                    label{
                        justify-self: start;
                    }

                }

            }
        }
    }

</style>