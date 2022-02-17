<template>
    <label class="u-label" :class="textAlignClass" :for="uid">
        <slot>
            {{label}}
        </slot>
    </label>
</template>

<script>
    // import { inject, ref } from 'vue'

    export default {
        name: 'TextLabel',
        computed: {
            textAlignClass() {
                const str = 'text-' + this.textAlign
                //console.debug(`textAlignClass = ${str}`)
                return str
            },
        },
        props: {
            label: {
                type: String,
                required: false,
                default: '',
            },
            id: {
                type: String,
                required: false,
                default: '',
            },
            textAlign: {
                required: false,
                default: 'right',
                validator(val) {
                    return val == 'left' || val == 'right' || val == 'center'
                },
            },
        },
        // emits: ['update'],
        // setup(props) {
        // const uid = ref(props.id)
        // if (!uid.value) uid.value = inject('getNextUid')('label')

        // return {
        // uid,
        // }
        // },
    }
</script>
