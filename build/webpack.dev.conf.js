var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var devEntry = {};

// add hot-reload related code to entry chunks
Object.keys(config.dev.entry).forEach(function (name) {
  devEntry[name] = ['./build/dev-client'].concat(config.dev.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  entry: devEntry,
  output: {
    publicPath: '',
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // template: path.join('./src/tmpl/', config.dev.tmpl || 'index.html'),
      template: './src/index.ejs',
      inject: true
    }),
    new webpack.ProvidePlugin({
      ENV_OPT: config.dev.envopt
    })
  ]
})
