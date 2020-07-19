<template>
  <div id="app">
    <Field />
    <div class="controls">
      <button
        v-if="currentSymbol !== stringZero"
        :disabled="isSymbolSelected"
        @click="$store.commit('SET_SYMBOL_TYPE', stringCross)"
      >
        &#10005;
      </button>
      <button
        v-if="currentSymbol !== stringCross"
        :disabled="isSymbolSelected"
        @click="$store.commit('SET_SYMBOL_TYPE', stringZero)"
      >
        &#10061;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Field from './components/Field.vue'

  import { SymbolType } from '@/types'

  export default Vue.extend({
    name: 'App',
    components: {
      Field
    },
    data: () => ({}),
    computed: {
      stringCross() {
        return SymbolType.Cross
      },
      stringZero() {
        return SymbolType.Zero
      },
      currentSymbol() {
        return this.$store.getters.currentSymbolType
      },
      isSymbolSelected() {
        return this.$store.getters.currentSymbolType !== null
      }
    }
  })
</script>

<style lang="scss">
  #app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0 auto;
    width: 100vh;
    height: 100vh;
  }

  .controls {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    right: -60px;
    width: 50px;
    min-height: 100px;

    button {
      width: 44px;
      height: 44px;
      font-size: 1.5em;
    }
  }
</style>
