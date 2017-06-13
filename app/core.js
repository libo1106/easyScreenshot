/**
 * 框架代码
 * 主要处理全局中间间
 */
const express = require('express')
const router = require('./router')

const app = express()

// 加载存静态资源到根目录中，例如 fav.ico
app.use(express.static('/public'))

// 加载路由配置
app.use(router)

module.exports = app