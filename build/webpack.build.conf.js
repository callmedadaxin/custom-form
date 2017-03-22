var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: config.build.entry,
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: env.NODE_ENV == 'development' ? config.build.publicPath : env.cdnUrl || config.build.publicPath
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.ProvidePlugin({
      ENV_OPT: config.build.envopt
    })
  ]
})

//根据配置进行判断
if (env.isUglyfy) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
};

//遍历入口页面，创建页面
var html = config.build.html;

html.map(function(item) {
  var itemPath = path.join(config.build.htmlOutputPath, item.filename);
  var template = path.join('./src/', item.tmplPath || 'index.ejs');

  itemPath = path.resolve(__dirname, itemPath);

  //配置入口文件
  var chunks = item.entrys ? ['manifest', 'vendor'].concat(item.entrys) : [];

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: itemPath,
    template: template,
    inject: true,
    title: item.title || 'Document',
    chunks: chunks,
    chunksSortMode: 'dependency',
  }));
})

module.exports = webpackConfig