const chalk = require('chalk')

const gameState = {
  field: [
    -1, -1, -1,
    -1, -1, -1,
    -1, -1, -1
  ],
  winning: {
    '0-3-6':'100100100',
    '1-4-7':'010010010',
    '2-5-8':'001001001',

    '0-1-2':'111000000',
    '3-4-5':'000111000',
    '6-7-8':'000000111',

    '0-4-8':'100010001',
    '2-4-6':'001010100'
  },
  players: {}
}

function map() {
  const cortege = ['',''];
  this.field.forEach((field, idx) => {
    {
      const base = 1
      cortege[0] += `${field === -1 ? 0 : field}`
    }
    {
      const base = 0
      cortege[1] += `${field === -1 ? 0 : (field === 0 ? 1 : 0)}`
    }
  })
  return cortege
}
function checkField([byOne, byZero]) {
  const winning = Object.values(this.winning)
  const vectors = Object.keys(this.winning)
  console.log('checkfield -', byOne, byZero, this.winning)
  const byOneKey = winning.indexOf(byOne)
  const byZeroKey = winning.indexOf(byZero)
  return vectors[byOneKey] || vectors[byZeroKey]
}

function clear() {
  return this.field.forEach((el, i) => this.field[i] = -1)
}

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
      onMove({ position, symbol }) {
        gameState.field[+position] = (symbol === 'cross' ? 1 : 0)
        const winningVector = checkField.call(gameState, map.call(gameState))
        socket.emit('server-message', { message: 'game-move', data: { position, symbol }})
        // console.log('server move -', position, symbol, gameState.field)

        if(winningVector) {
          socket.emit('server-message', { message: 'game-won', data: { vector: winningVector }})
          console.log('server game-won -', winningVector)
        }
      },
      onSymbolSelect(symbol) {
        this.symbol = symbol
        socket.emit('server-message', { message: 'symbol-selected', data: { symbol } })
        console.log('selected symbol -', symbol)
      },
      onPlayerInit() {
        const playersCount = Object.keys(gameState.players).length
        console.log(chalk.bgBlue.white(` * WS player init ${player}`))
        console.log('players -', playersCount)

        if (playersCount === 2) {
          socket.emit('server-message', { message: 'game-start' })
        }
      },
      onDisconnect() {
        clear.call(gameState)
        delete gameState.players[player]
        const playersCount = Object.keys(gameState.players).length
        if (playersCount !== 2) {
          socket.emit('server-message', { message: 'game-stop' })
        }
        console.log(chalk.bgRed.white(` * WS player is disconnected ${player}`))
        console.log('players -', playersCount)
      }
    }
  }

  socket.on('connection', socket => {
    const player = socket.handshake.query.player
    gameState.players[player] = playerState(player, gameState)

    socket.on('disconnect', gameState.players[player].onDisconnect)
    socket.on('player-init', gameState.players[player].onPlayerInit)
    socket.on('symbol-selected', gameState.players[player].onSymbolSelect)
    socket.on('game-move', gameState.players[player].onMove)

    console.log(chalk.bgGreen.black(` * WS player is connected ${player}`))
  })
}
