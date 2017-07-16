/**
 * 框架代码
 * 主要处理全局中间间
 */
const express = require('express')
const router = require('./router')

const log = require('./middleware/log')

const app = express()

// 加载存静态资源到根目录中，例如 fav.ico
app.use(express.static('./public'))

// 采集 http access log
app.use(log.access)

// 统计接口耗时
app.use(log.performance)

// 加载路由配置
app.use(router)

module.exports = app