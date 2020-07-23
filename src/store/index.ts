import Vue from 'vue'
import Vuex from 'vuex'

import { SymbolType, State } from '@/types'

Vue.use(Vuex)

const state: State = {
  gameStarted: false,
  symbolType: null
}

export default new Vuex.Store({
  state: state,
  mutations: {
    SET_GAME_STARTED(state: State, flag: boolean) {
      state.gameStarted = flag
    },
    SET_SYMBOL_TYPE(state: State, type: SymbolType) {
      state.symbolType = type
    }
  },
  actions: {
    START_GAME({ commit }) {
      commit('SET_GAME_STARTED', true)
    },
    STOP_GAME({ commit }) {
      commit('SET_GAME_STARTED', false)
    }
  },
  getters: {
    gameIsStarted: (state: State) => state.gameStarted,
    currentSymbolType: (state: State) => state.symbolType
  },
  modules: {}
})
