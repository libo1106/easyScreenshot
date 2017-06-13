/**
 * Created by libo on 2017/6/13.
 */
const config_deploy = require('./config/deploy')
const app = require('./app/core')

const server = app.listen(config_deploy.PORT, config_deploy.HOSTNAME)

server.on('listening', netListenHandler)
server.on('error', netErrorHandler)

function netErrorHandler (err) {
    console.error(`network error, detail: ${err.message}`)
}

function netListenHandler() {
    let { address , port } = server.address();
    console.info(`server start at ${address}:${port}`)
}