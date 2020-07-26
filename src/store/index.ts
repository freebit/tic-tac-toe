import Vue from 'vue'
import Vuex from 'vuex'

import { socket, playerUid } from '../ws'
import { SymbolType, State } from '@/types'

Vue.use(Vuex)

const state: State = {
  playerUid: null,
  gameStarted: false,
  symbolType: null,
  move: null
}

export default new Vuex.Store({
  state: state,
  mutations: {
    SET_GAME_STARTED(state: State, flag: boolean) {
      state.gameStarted = flag
    },
    SET_SYMBOL_TYPE(state: State, type: SymbolType) {
      state.symbolType = type
    },
    GAME_MOVE(state: State, { position, symbol }) {
      state.move = { position, symbol }
    }
  },
  actions: {
    PLAYER_INIT({ state }) {
      state.playerUid = playerUid
      socket.emit('player-init', { player: playerUid })
    },
    START_GAME({ commit }) {
      commit('SET_GAME_STARTED', true)
    },
    STOP_GAME({ commit }) {
      commit('SET_GAME_STARTED', false)
      window.location.reload()
    },
    SYMBOL_SELECT({ commit }, symbol: SymbolType) {
      commit('SET_SYMBOL_TYPE', symbol)
      socket.emit('symbol-selected', symbol)
    },
    GAME_MOVE(state, { position, symbol }) {
      socket.emit('game-move', { position, symbol })
    }
  },
  getters: {
    gameIsStarted: (state: State) => state.gameStarted,
    currentSymbolType: (state: State) => state.symbolType,
    gameMove: (state: State) => state.move
  },
  modules: {}
})
