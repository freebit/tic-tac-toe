const webpackbar = require('webpackbar')
const path = require('path')
module.exports = {
  lintOnSave: true,
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_common.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [new webpackbar()]
  },
  devServer: {
    host: '0.0.0.0',
    https: false,
    socket: 'socket',
    sockHost: 'https://localhost:3000',
    sockPath: '/ws',
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
