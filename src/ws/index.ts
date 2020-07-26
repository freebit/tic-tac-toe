import io from 'socket.io-client'
// import { SymbolType } from '@/types'
import messagesHandler from './messagesHandler'
import { uuid } from '../utils/'

export let playerUid: string
export let socket: SocketIOClient.Socket

export const socketInit = () => {
  playerUid = uuid()
  socket = io(`https://localhost:3000?player=${playerUid}`, { path: '/ws' })

  socket.on('server-message', ({ message, data }) => {
    messagesHandler[message](data)
  })
}
