<template>

    <BorderPane>

        <template v-slot:center>
            <Card title="Картинки">

                <Row>
                    <TextLabel label="Alarm"/>
                    <Alarm :width="alarmWidth" :height="alarmHeight"/>
                    <template v-slot:optional>
                        <div>
                            <Row>
                                <TextLabel label="props - x : y. Координаты начала изображения. Не обязательно. default = 0 : 0."/>
                            </Row>
                            <Row>
                                <TextLabel label="props - height. Не обязательно. default = 25"/>
                                <TextField v-model="alarmHeight"/>
                            </Row>
                            <Row>
                                <TextLabel label="props - width. Не обязательно. default = 25"/>
                                <TextField v-model="alarmWidth"/>
                            </Row>
                        </div>
                    </template>
                </Row>
                <Row>
                    <TextLabel label="Info"/>
                    <Info :width="infoWidth" :height="infoHeight"/>
                    <template v-slot:optional>
                        <div>
                            <Row>
                                <TextLabel label="props - x : y. Координаты начала изображения. Не обязательно. default = 0 : 0."/>
                            </Row>
                            <Row>
                                <TextLabel label="props - height. Не обязательно. default = 25"/>
                                <TextField v-model="infoHeight"/>
                            </Row>
                            <Row>
                                <TextLabel label="props - width. Не обязательно. default = 25"/>
                                <TextField v-model="infoWidth"/>
                            </Row>
                        </div>
                    </template>
                </Row>
                <Row>
                    <TextLabel label="Warning"/>
                    <Warning :width="warningWidth" :height="warningHeight"/>
                    <template v-slot:optional>
                        <div>
                            <Row>
                                <TextLabel label="props - x : y. Координаты начала изображения. Не обязательно. default = 0 : 0."/>
                            </Row>
                            <Row>
                                <TextLabel label="props - height. Не обязательно. default = 25"/>
                                <TextField v-model="warningHeight"/>
                            </Row>
                            <Row>
                                <TextLabel label="props - width. Не обязательно. default = 25"/>
                                <TextField v-model="warningWidth"/>
                            </Row>
                        </div>
                    </template>
                </Row>
            </Card>
        </template>

    </BorderPane>

</template>

<script>
    import BorderPane from "@/components/layout/BorderPane";
    import Card from "@/components/layout/Card";
    import Row from "@/components/layout/row/Row";
    import TextLabel from "@/components/controls/TextLabel";
    import Alarm from "@/components/controls/images/Alarm";
    import Info from "@/components/controls/images/Info";
    import Warning from "@/components/controls/images/Warning";
    import TextField from "@/components/controls/input/TextField";
    export default {
        name: "SvgImages",
        components: {
            Alarm,
            BorderPane,
            Card,
            Info,
            Row,
            TextField,
            TextLabel,
            Warning
        },
        data(){
            return{
                alarmHeight:25,
                alarmWidth:25,
                infoHeight:25,
                infoWidth:25,
                warningHeight:25,
                warningWidth:25,
            }
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