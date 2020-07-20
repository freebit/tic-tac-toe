import Vue from 'vue'
import App from './App.vue'
import store from './store'
import io from 'socket.io-client'

import { uuid } from './utils/'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

const player = uuid()
const socket = io(`https://localhost:3000?player=${player}`, {
  path: '/ws'
})

socket.on('start-game', () => {
  alert(`Game is started}`)
})
