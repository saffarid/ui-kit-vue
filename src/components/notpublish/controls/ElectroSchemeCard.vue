<template>
    <Card title="Элементы электрических схем">
        <Row>
            <TextLabel label="Текстовая метка"/>
            <Key :isMirror="keyIsMirror"
                 :isClose="keyIsClose"
                 :isActive="keyIsActive"
                 :isAlarm="keyIsAlarm"
                 :isPrepared="keyIsPrepared"
                :isWarning="keyIsWarning"
            />
            <template v-slot:optional>
                <div class="optionalSettings">
                    <Row>
                        <TextLabel label="props - isClose. Обязательный"/>
                        <Toggle
                                id="keyCloser"
                                v-model="keyIsClose"
                                :false-value="false"
                                :true-value="true"
                                on-label="Ключ закрыт"
                                off-label="Ключ открыт"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="props - isMirror. Не обязательный. default - false"/>
                        <Toggle
                                id="keyMirror"
                                v-model="keyIsMirror"
                                :false-value="false"
                                :true-value="true"
                                on-label="Направление ключа ->"
                                off-label="Направление ключа <-"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="props - isActive. Не обязательный. default - false"/>
                        <Toggle
                                id="keyIsActive"
                                v-model="keyIsActive"
                                :false-value="false"
                                :true-value="true"
                                on-label="Ключ активен"
                                off-label="Ключ не активен"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="props - isAlarm. Не обязательный. default - false"/>
                        <Toggle
                                id="keyIsAlarm"
                                v-model="keyIsAlarm"
                                :false-value="false"
                                :true-value="true"
                                on-label="This is fine"
                                off-label="Всё хорошо"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="props - isPrepared. Не обязательный. default - false"/>
                        <Toggle
                                id="keyIsPrepared"
                                v-model="keyIsPrepared"
                                :false-value="false"
                                :true-value="true"
                                on-label="Ключ готов"
                                off-label="Ключ не готов"
                                width="200"
                        />
                    </Row>
                    <Row>
                        <TextLabel label="props - isWarning. Не обязательный. default - false"/>
                        <Toggle
                                id="keyIsWarning"
                                v-model="keyIsWarning"
                                :false-value="false"
                                :true-value="true"
                                on-label="Ключ предупреждает"
                                off-label="Ключ не предупреждает"
                                width="200"
                        />
                    </Row>

                </div>
            </template>
        </Row>
    </Card>
</template>

<script>
    import Card from "@/components/layout/Card";
    import TextLabel from "@/components/controls/TextLabel";
    import Key from "@/components/controls/electro_scheme/Key";
    import Toggle from "@/components/controls/input/toggle/Toggle";
    import Row from "@/components/layout/row/Row";

    export default {
        name: "ElectroSchemeCard",
        data() {
            return {
                keyIsMirror: false,
                keyIsClose: false,
                keyIsActive: false,
                keyIsAlarm: false,
                keyIsPrepared: false,
                keyIsWarning: false,
            }
        },
        components: {
            Row,
            Toggle,
            Key,
            TextLabel,
            Card
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
            gap: 5px;

            .row {
                /*grid-template-columns: 400px auto;*/
                border: 0px grey solid;
                padding: 0;
                label {
                    justify-self: start;
                }
            }
        }
    }

</style>