import Vue from 'vue'
import Vuex from 'vuex'

import { SymbolType, State } from '@/types'

Vue.use(Vuex)

const state: State = {
  symbolType: null
}

export default new Vuex.Store({
  state: state,
  mutations: {
    SET_SYMBOL_TYPE(state: State, type: SymbolType) {
      state.symbolType = type
    }
  },
  actions: {},
  getters: {
    currentSymbolType: (state: State) => state.symbolType
  },
  modules: {}
})
