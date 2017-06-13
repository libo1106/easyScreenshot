/**
 * Created by libo on 2017/6/14.
 * 路由
 * 胶水代码，负责组装请求和实际处理请求的控制器，
 */
const express  = require('express')
const router = express.Router()

let middleware_auth = require('./middleware/auth')

let controller_home = require('./controller/home')
let controller_api = require('./controller/api')

router.get('/', controller_home.index)
router.get('/api/screenshot', middleware_auth.jwt, controller_api.screenshot)
router.get('/api/prerender', middleware_auth.jwt, controller_api.prerender)

module.exports = router