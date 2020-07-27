import store from '../store'
import { SymbolType } from '@/types'

export default {
  'game-start'() {
    store.dispatch('START_GAME')
    console.log('* ws server game-start')
  },

  'symbol-selected'({ symbol }) {
    if (!store.getters.currentSymbolType) {
      // выбираем для клиента противоположный символ
      symbol = symbol === SymbolType.Cross ? SymbolType.Zero : SymbolType.Cross
      store.commit('SET_SYMBOL_TYPE', symbol)
    }
    console.log('* ws server symbol-selected -', symbol)
  },
  'game-move'({ position, symbol }) {
    store.commit('GAME_MOVE', { position, symbol })
    console.log('* ws server game-move - ', position, symbol)
  },
  'game-won'({ vector }) {
    store.commit('CHANGE_WINNING', vector)
  },
  'game-stop'() {
    store.dispatch('STOP_GAME')
    console.log('* ws server game-stop')
  }
}
