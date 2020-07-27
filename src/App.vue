<template>
  <div id="app">
    <header class="header">
      <div class="header__panel">
        <router-link to="/tic-tac-toe">Игра</router-link>
        <button @click="reloadPage" class="header__button">Сначала <span>&#10226;</span></button>
      </div>
    </header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import MyInput from '@/components/MyInput.vue'
  export default Vue.extend({
    name: 'App',
    components: {
      // MyInput
    },
    data: () => ({
      myInput: ''
    }),
    methods: {
      reloadPage() {
        window.location.reload()
      }
    }
  })
</script>

<style lang="scss">
  .header {
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

    &__panel {
      display: flex;
      position: relative;
      min-width: calc(100vh - #{$header-height});
      justify-content: space-around;
    }
  }
</style>
