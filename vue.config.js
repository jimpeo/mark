'use strict'

module.exports = {
  publicPath: './',
  outputDir: 'docs',
  devServer: {
    port: 3333,
    open: false
  },
  chainWebpack(config) {
    config.module
      .rule('img')
      .test(/\.(eot|svg|ttf|woff|woff2|cur)(\?\S*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }
}
