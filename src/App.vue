<template>
  <div id="app">
    <Field />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Field from './components/Field.vue'

  export default Vue.extend({
    name: 'App',
    components: {
      Field
    }
  })
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    min-height: 100vh;
  }
</style>
