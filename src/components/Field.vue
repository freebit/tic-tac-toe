<template>
  <div class="field" @click.stop="fieldClickHandler($event)">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { SymbolType } from '@/types'

  export default Vue.extend({
    name: 'Field',
    props: {},
    data: () => ({}),
    computed: {
      symbolType() {
        return this.$store.getters.currentSymbolType
      }
    },
    methods: {
      fieldClickHandler(evt) {
        const { classList } = evt.target
        if (!this.symbolType || classList.contains(SymbolType.Cross) || classList.contains(SymbolType.Zero)) return
        classList.add(this.symbolType)
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .field {
    display: grid;
    position: relative;
    width: 100vh;
    height: 100vh;
    margin: 0 auto;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.2em;
  }

  .cell {
    position: relative;
    background-color: cadetblue;

    &.cross {
      &::before,
      &::after {
        position: absolute;
        display: block;
        content: '';
        width: 10px;
        height: 80%;
        border-radius: 6px;
        background-color: #fff;
        top: 50%;
        left: 50%;
        margin-top: -40%;
        margin-left: -5px;
        animation: fade-in 0.3s forwards;
      }
      &::before {
        transform: rotate(-45deg);
      }
      &::after {
        transform: rotate(45deg);
      }
    }

    &.zero {
      &::before {
        position: absolute;
        display: block;
        content: '';
        width: 55%;
        height: 55%;
        border-radius: 50%;
        border: 8px solid #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: fade-in 0.3s forwards;
      }
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
