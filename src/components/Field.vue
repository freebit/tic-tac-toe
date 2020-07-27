<template>
  <div :class="{ field: true, disabled }" @click.stop="fieldClickHandler">
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
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      isCanMove: true,
      lastMove: null
    }),
    computed: {
      symbolType() {
        return this.$store.getters.currentSymbolType
      }
    },
    methods: {
      fieldClickHandler(evt) {
        if (!this.isCanMove) return
        const { classList } = evt.target
        const position = evt.target.getAttribute('data-id')
        if (!this.symbolType || classList.contains(SymbolType.Cross) || classList.contains(SymbolType.Zero)) return

        classList.add(this.symbolType)
        this.$store.dispatch('GAME_MOVE', { position, symbol: this.symbolType })

        this.lastMove = `${position}-${this.symbolType}`
        // this.isCanMove = !this.isCanMove
      }
    },
    watch: {
      '$store.getters.gameMove'({ position, symbol }) {
        if (this.lastMove !== `${position}-${symbol}`) {
          this.$el.querySelector(`[data-id="${position}"]`).classList.add(symbol)
          this.isCanMove = true
        } else {
          this.isCanMove = false
        }
        console.log('MOVE WATCH -', position, symbol, 'мой ход -', this.isCanMove)
      },
      '$store.getters.isWinning'(vector) {
        if (!vector) return
        console.log('FIELD WINNING WATCH ПОБЕДА!!! -', vector)
        const cells = this.$el.querySelectorAll(
          `[data-id="${vector[0]}"], [data-id="${vector[1]}"], [data-id="${vector[2]}"]`
        )
        for (const cell of [...cells]) {
          cell.classList.add('winning')
        }
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

    &.disabled {
      pointer-events: none;
    }
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

    &.winning {
      animation: fade-in 1.2s 1.2s alternate infinite, scale 1.2s alternate infinite;
    }

    @keyframes twin {
      0% {
        transform: scale(0.5) rotate(0deg);
      }
      100% {
        transform: scale(0.75) rotate(360deg);
      }
    }

    @keyframes scale {
      0% {
        transform: scale(0.97);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes fade-in {
      0% {
        opacity: 0.1;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
