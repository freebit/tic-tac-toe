const webpackbar = require('webpackbar');
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
    plugins: [
      new webpackbar()
    ]
  },
  devServer: {
    host: '0.0.0.0',
    https: false,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
