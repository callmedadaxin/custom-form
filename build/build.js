require('shelljs/global')

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')

var webpackConfig = require('./webpack.build.conf')

var spinner = ora('building for ' + config.build.env.NODE_ENV + '...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
