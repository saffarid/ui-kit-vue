<template>
    <select
            class="combo-box"
            :disabled="disabled"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="(opt, index) in options"
                :key="index"
                :value="opt.value"
                :disabled="opt.disabled"
                :label="opt.label"
                :selected="opt.selected"
        />
    </select>
</template>

<script>
    import Value from "../mixins/Value";

    export default {
        name: 'ComboBox',
        mixins: [
            Value
        ],
        props: {
            /**
             * Массив пунктов списка.
             * Компонент ожидает увидеть в массиве объекты
             * {
             *     disabled: boolean - блокировка доступа к элементу списка
             *     label: string - метка пункта списка
             *     selected: boolean - заранее устанавливает определённый пункс списка выделенным
             *     value: string - значение пункта списка, которое будет отправлено на сервер или прочитано с помощью скриптов
             * }
             * */
            options: {
                type: Array,
                required: true,
            },
            /**
             * Блокировка доступа к элементу
             * */
            disabled: {
                type: Boolean,
                required: false,
            },
        },
        emits: ['update:modelValue'],
    }
</script>
