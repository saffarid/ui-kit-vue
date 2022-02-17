<template>
    <svg :x="x" :y="y" :width="width" :height="height" viewBox="0 0 25 25">
        <path d="M23.458,16.9l-7.99-13.25a3.573,3.573,0,0,0-6.021,0L1.458,16.9a3.125,3.125,0,0,0-.052,3.125,3.51,3.51,0,0,0,3.062,1.771H20.447a3.51,3.51,0,0,0,3.063-1.729,3.125,3.125,0,0,0-.052-3.167Zm-1.771,2.135a1.365,1.365,0,0,1-1.24.677H4.468a1.365,1.365,0,0,1-1.24-.677,1.042,1.042,0,0,1,0-1.042l8-13.26a1.542,1.542,0,0,1,2.458,0l7.99,13.25a1.042,1.042,0,0,1,.01,1.052Z"
              transform="translate(0.042 0.083)" fill="#FF0000"/>
        <circle cx="1.042" cy="1.042" r="1.042"
                transform="translate(11.458 15.625)" fill="#FF0000"/>
        <path d="M12.042,8A1.042,1.042,0,0,0,11,9.042v4.167a1.042,1.042,0,1,0,2.083,0V9.042A1.042,1.042,0,0,0,12.042,8Z"
              transform="translate(0.458 0.333)" fill="#FF0000"/>
    </svg>
</template>

<script>
    import ZeroPoint from "../mixins/ZeroPoint";
    import Size from "../mixins/Size";

    export default {
        name: 'Alarm',
        mixins: [
            Size,
            ZeroPoint
        ],
    }
</script>

<style scoped>

</style>