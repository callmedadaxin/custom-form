var path = require('path');

//获取端口
var port = process.argv[2];

if(isNaN(port) && port <= 10000 && port > 65535){
    port = 8089;
}

module.exports = {
  env: require('./dev.env'),
  envopt: path.resolve(__dirname, './dev.env'),
  port: port || 8080,
  // tmpl: 'index.html',
  //调试入口文件，只包括一个页面内容
  entry: {
    index: './src/main.js',
  },
  //配置proxy跨域
  proxyTable: {
    '/api': {
      target: 'http://dev.imoxiu.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
