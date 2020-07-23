const express = require('express')
const https = require('https')
const cors = require('./middleware/cors')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const config = require('./config')

const SocketMount = require('./ws')

const App = express()
const serverPort = process.env.PORT || config.port
const httpServer = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, 'cert/local-server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert/local-server.cert')),
    requestCert: false,
    rejectUnauthorized: false
  },
  App
)

App.use(cors(config.clientOrigins))

App.get('/', (req, res) => {
  res.send('<code>server ok</code>')
})

SocketMount(httpServer, config)

httpServer.listen(serverPort, () => {
  console.log(chalk.blue(`\nExpress web app is available at https://localhost:${serverPort}\n`))
})
