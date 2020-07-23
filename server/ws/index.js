const chalk = require('chalk')

const gameState = {}

module.exports = (httpServer, config) => {
  const socket = require('socket.io')(httpServer, {
    path: '/ws',
    serveClient: true,
    origins: config.clientOrigins
  })

  const playerState = playerUid => {
    const player = playerUid

    return {
      symbol: '',
      onSymbolSelect(symbol) {
        this.symbol = symbol
        socket.emit('symbol-selected', symbol)
        console.log('selected symbol -', symbol)
      },
      onPlayerInit() {
        const playersCount = Object.keys(gameState).length
        console.log(chalk.bgBlue.white(` * WS player init ${player}`))
        console.log('players -', playersCount)

        if (playersCount === 2) {
          socket.emit('game-start', true)
        }
      },
      onDisconnect() {
        delete gameState[player]
        const playersCount = Object.keys(gameState).length
        if (playersCount !== 2) {
          socket.emit('game-stop', true)
        }
        console.log(chalk.bgRed.white(` * WS player is disconnected ${player}`))
        console.log('players -', playersCount)
      }
    }
  }

  socket.on('connection', socket => {
    const player = socket.handshake.query.player
    gameState[player] = playerState(player, gameState)

    socket.on('disconnect', gameState[player].onDisconnect)
    socket.on('player-init', gameState[player].onPlayerInit)
    socket.on('symbol-selected', gameState[player].onSymbolSelect)

    console.log(chalk.bgGreen.black(` * WS player is connected ${player}`))
  })
}
