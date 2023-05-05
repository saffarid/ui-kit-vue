<template>
    <table>
        <thead>
            <tr class="t-head-row">
                <th class="t-head-cell" v-for="(header, colIndex) in headers" :key="colIndex">
                    <slot name='head' :col="colIndex" :header="header">
                        {{ header.name }}
                    </slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <slot name='row' v-for="(item, rowIndex) in items" :key="rowIndex" :item="item">
                <tr class="t-body-row">
                    <td class="t-body-cell" v-for="(header, colIndex) in headers" :key="colIndex">
                        {{ item[header.value] }}
                    </td>
                </tr>
            </slot>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "ElmTablePane",
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