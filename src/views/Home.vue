<template>
  <span>HOME</span>
</template>

<script>
  export default {
    name: 'Home',
    components: {}
  }
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    margin: 0 auto;
    width: calc(100vh - #{$header-height});
    height: calc(100vh - #{$header-height});
  }
</style>
