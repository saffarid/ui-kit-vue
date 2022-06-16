<template>
    <select
            class="combo-box"
            :disabled="disabled"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="(opt, index) in options" :key="index" :value="index">
            <slot name="option" :index="index" :option="opt">{{opt}}</slot>
        </option>
    </select>
</template>

<script>
    //import {ref} from "vue";

    import Value from "../mixins/Value";

    export default {
        name: 'ComboBox',
        mixins: [
            Value
        ],
        props: {
            prevValue: {
                type: [String, Number],
                required: false,
            },
            options: {
                type: Object,
                required: true,
            },
            disabled: {
                type: Boolean,
                required: false,
            },
        },
        emits: ['update:modelValue'],
        computed: {
            changeBlink: function () {
                if (this.prevValue === undefined) return false
                return this.prevValue != this.modelValue
            },
        },
        // setup(props, {emit}) {
        //   const value = ref(props.modelValue)

        //   function update(event) {
        //     emit('update', value)
        //   }

        //   return {
        //     value,
        //     update,
        //   }
        // }
    }
</script>
