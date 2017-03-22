# vue2.0模板

> 针对vue2.0使用，支持多页面生成，支持配置不同环境Build,根据环境.env.js暴露不同公用变量

在vue-cli webpack模板上进行修改。

## Build Setup

``` bash
# 安装依赖
npm install

# 开启端口进行调试 port 可以是10000~65535之间的数字
npm run dev port

# 开发环境编译
npm run build

# 测试环境编译
npm run build:test

# 生产环境编译
npm run build:prod
```

## 配置
基本配置都放在 config/index.js  dev.js进行更改

## 不同环境区分
在config.*.env.js中进行不同环境配置，包括

- NODE_ENV：环境名称
- isUglyfy: 是否压缩代码
- 其他: 暴露全局变量，如接口等

全局变量通过 ENV_OPT 进行访问

## 多页面支持
当我们想根据不同入口生成多个页面时，进行配置build.html字段即可



