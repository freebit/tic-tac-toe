<template>
  <div id="app">
    <header>
      <router-link to="/" exact>Главная</router-link>
      <router-link to="/tic-tac-toe">Игра</router-link>
    </header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'App'
  })
</script>

<style lang="scss">
  header {
    display: flex;
    position: relative;
    height: $header-height;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #95e0d4, $alpha: 0.5);

    a {
      margin: 0 16px;
      font-family: monospace;
      text-decoration: none;

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }
</style>
