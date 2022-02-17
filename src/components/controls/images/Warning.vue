<template>
    <svg :x="x" :y="y" width="25" height="25" viewBox="0 0 25 25">
        <path d="M12.417,2A10.417,10.417,0,1,0,22.833,12.417,10.417,10.417,0,0,0,12.417,2Zm0,18.75a8.333,8.333,0,1,1,8.333-8.333A8.333,8.333,0,0,1,12.417,20.75Z"
              transform="translate(0.083 0.083)" fill="#fbdd1f"/>
        <circle cx="1.042" cy="1.042" r="1.042"
                transform="translate(11.458 15.625)" fill="#fbdd1f"/>
        <path d="M12.042,7A1.042,1.042,0,0,0,11,8.042V13.25a1.042,1.042,0,0,0,2.083,0V8.042A1.042,1.042,0,0,0,12.042,7Z"
              transform="translate(0.458 0.292)" fill="#fbdd1f"/>
    </svg>

</template>

<script>
    import ZeroPoint from "../mixins/ZeroPoint";

    export default {
        name: 'Warning',
        mixins: [
            ZeroPoint
        ],
    }
</script>

<style scoped>

</style>