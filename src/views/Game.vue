<template>
  <div class="game">
    <Field />
    <div class="game__state">
      <span v-if="!gameIsStarted">Ждем подключения минимум двух игроков</span>
      <span v-else-if="!isSymbolSelected">Теперь выберете символ!</span>
    </div>
    <div v-if="gameIsStarted" class="game__controls">
      <button v-if="currentSymbol !== stringZero" :disabled="isSymbolSelected" @click="symbolSelect(stringCross)">
        &#10005;
      </button>
      <button v-if="currentSymbol !== stringCross" :disabled="isSymbolSelected" @click="symbolSelect(stringZero)">
        &#10061;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import io from 'socket.io-client'
  import Field from '../components/Field.vue'
  import { SymbolType } from '@/types'
  import { uuid } from '../utils/'

  let socket: SocketIOClient.Socket

  export default Vue.extend({
    name: 'Game',
    components: {
      Field
    },
    data: () => ({
      playerUid: ''
    }),
    created() {
      this.playerUid = uuid()
      socket = io(`https://localhost:3000?player=${this.playerUid}`, {
        path: '/ws'
      })
      socket.on('game-start', () => {
        this.$store.dispatch('START_GAME')
      })
      socket.on('symbol-selected', (symbol: SymbolType) => {
        if (!this.isSymbolSelected) {
          // выбираем для клиента противоположный символ
          symbol = symbol === SymbolType.Cross ? SymbolType.Zero : SymbolType.Cross
          this.$store.commit('SET_SYMBOL_TYPE', symbol)
        }
      })
      socket.on('game-stop', () => {
        this.$store.dispatch('STOP_GAME')
        window.location.reload()
      })
    },
    mounted() {
      socket.emit('player-init', { player: this.playerUid })
      console.log('player-init - ok')
    },
    computed: {
      ...mapGetters(['gameIsStarted']),
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
    },

    methods: {
      symbolSelect(symbolType: SymbolType) {
        this.$store.commit('SET_SYMBOL_TYPE', symbolType)
        socket.emit('symbol-selected', symbolType)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .game {
    position: relative;
    margin: 0 auto;
    width: calc(100vh - #{$header-height});
    height: calc(100vh - #{$header-height});

    &__state {
      position: absolute;
      top: 30%;
      right: -8px;
      transform: translate(100%, 0);
      font-size: 14px;
    }

    &__controls {
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
  }
</style>
