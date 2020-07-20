const chalk = require('chalk');

const playerState = (playerUid, state) => {
  const player = playerUid;

  console.log(chalk.bgGreen.black(` * WS player is connected ${player}`));

  return {
    disconnect() {
      delete state[player];
      console.log(chalk.bgRed.white(` * WS player is disconnected ${player}`));
    }
  }
}

const gameState = {}

module.exports = (httpServer, config) => {

  const socket = require('socket.io')(httpServer, {
    path: '/ws',
    serveClient: false,
    origins: config.clientOrigins
  });

  socket.on('connection', (socket) => {
    const player = socket.handshake.query.player;
    gameState[player] = playerState(player, gameState);

    socket.on('disconnect', gameState[player].disconnect);


    if (Object.keys(gameState).length === 2) {
      socket.emit('start-game', true);
      console.log(chalk.bgBlue.white(` * WS game start with 2 players`));
    }

  });



}