<template>
    <table class='text-white'>
        <thead>
        <tr class='bg-gray-dark t-row'>
            <th class="t-cell" v-for="(header, colIndex) in headers" :key="colIndex">
                <slot name='head' :col="colIndex" :header="header">
                    {{ header.name }}
                </slot>
            </th>
        </tr>
        </thead>
        <tbody>
        <slot name='row' v-for="(item, rowIndex) in items" :key="rowIndex" :item="item">
            <tr class='bg-gray even:bg-gray-dark t-row'>
                <td class="t-cell" v-for="(header, colIndex) in headers" :key="colIndex">
                    {{ item[header.value] }}
                </td>
            </tr>
        </slot>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "TableView",
        props: {
            headers: {
                type: Array,
                required: true
            },
            items: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>

</style>