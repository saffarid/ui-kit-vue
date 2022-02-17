<template>
  <div class='page-load'>
    <LoadingCom/>
  </div>
</template>

<script>
  import LoadingCom from './LoadingCom'

  export default {
    name: 'PageLoading',
    components:{ LoadingCom }
  }
</script>

<style lang="scss" scoped>

  .page-load{
    display: grid;
    min-height: 100%;
    min-width: 100%;
    align-content: start;
    align-items: start;
    align-self: start;
    justify-content: center;
    justify-items: center;
    justify-self: center;
  }

</style>