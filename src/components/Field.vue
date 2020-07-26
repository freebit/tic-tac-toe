<template>
  <div class="field" @click.stop="fieldClickHandler">
    <div class="cell" data-id="0"></div>
    <div class="cell" data-id="1"></div>
    <div class="cell" data-id="2"></div>
    <div class="cell" data-id="3"></div>
    <div class="cell" data-id="4"></div>
    <div class="cell" data-id="5"></div>
    <div class="cell" data-id="6"></div>
    <div class="cell" data-id="7"></div>
    <div class="cell" data-id="8"></div>
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
        const position = evt.target.getAttribute('data-id')
        if (!this.symbolType || classList.contains(SymbolType.Cross) || classList.contains(SymbolType.Zero)) return
        classList.add(this.symbolType)
        // this.$emit('select-symbol')
        this.$store.dispatch('GAME_MOVE', { position, symbol: this.symbolType })
      }
    },
    watch: {
      '$store.getters.gameMove'({ position, symbol }) {
        console.log('MOVE WATCH -', position, symbol)
        this.$el.querySelector(`[data-id="${position}"]`).classList.add(symbol)
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .field {
    display: grid;
    position: relative;
    width: calc(100vh - #{$header-height});
    height: calc(100vh - #{$header-height});
    // margin: 0 auto;

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
