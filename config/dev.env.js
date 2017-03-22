var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  isUglyfy: false, //是否压缩
  baseApi: '/api/'
})
