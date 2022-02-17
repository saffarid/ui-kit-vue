<template>
    <Card title="Элементы управления">
        <Row>
            <TextLabel label="Поле ввода"/>
            <TextField currentValue="TextField"/>
        </Row>
        <Row>
            <TextLabel label="Текстовая метка"/>
            <TextLabel label="Текстовая метка"/>
        </Row>
        <Row>
            <TextLabel label="Выпадающий список"/>
            <ComboBox/>
        </Row>
        <Row>
            <TextLabel label="Переключатель"/>
            <Toggle modelValue="true" :id="`tgl-enabled`"/>
        </Row>
        <Row>
            <TextLabel label="Кнопка"/>
            <Button text="button"/>
        </Row>
        <Row>
            <TextLabel label="Слайдер"/>
            <Slider
                    :tooltips="false"
                    v-model="slider"
                    :connect="true"
            />
            <template v-slot:optional>
                <TextLabel :label="slider"/>
            </template>
        </Row>
    </Card>
</template>

<script>
    import Card from "@/components/layout/Card";
    import Row from "@/components/layout/row/Row";
    import TextLabel from "@/components/controls/TextLabel";
    import TextField from "@/components/controls/input/TextField";
    import ComboBox from "@/components/controls/input/ComboBox";
    import Toggle from "@/components/controls/input/toggle/Toggle";
    import Button from "@/components/controls/input/Button";
    import Slider from "@/components/controls/input/slider/Slider";
    export default {
        name: "ElementsContorl",
        data(){
            return {
                slider:0
            }
        },
        components: {Slider, Button, Toggle, ComboBox, TextField, TextLabel, Row, Card}
    }
</script>

<style scoped>

</style>