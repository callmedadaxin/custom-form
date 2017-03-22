// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path'),
  fs = require('fs');

var dev = require('./dev.js');

var path = require('path'),
  entryName = 'index'; //配置入口文件名称

//获取环境参数
var env = process.argv[2];

if (['dev', 'test', 'prod'].indexOf(env) < 0) {
  env = 'dev';
}

//获取环境对应配置 .env.js
var envopt = path.resolve(__dirname, './' + env + '.env');

if (!fs.existsSync(envopt + '.js')) {
  envopt = path.resolve(__dirname, './dev.env');
};

module.exports = {
  build: {
    entry: {
      index: './src/main.js',
    },
    html: [{
      filename: 'index.html', //模板输出名称
      entrys: ['index'], //页面需要引用的入口文件
      title: '测试', //html中的title
      tmplPath: './index.ejs' //模板路径，以src为起始路径
    }, ],
    htmlOutputPath: '../public/', //模板输出路径
    assetsRoot: path.resolve(__dirname, '../public/static/'), //静态资源输出根路径
    assetsSubDirectory: '',
    publicPath: './static/', //和正常的PublicPath相同
    assetsPublicPath: '../', //css内部图片等资源的公有路径
    productionSourceMap: true,
    envopt: envopt,
    env: require(envopt),
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: dev
}