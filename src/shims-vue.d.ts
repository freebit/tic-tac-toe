import Vue from 'vue'
import 'socket.io-client'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $socket: SocketIOClient.Socket
  }
}
