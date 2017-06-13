/**
 * Created by libo on 2017/6/14.
 */
const path = require('path')
const child_process = require('child_process')
const crypto = require('crypto')

exports.screenshot = function (req, res, next) {

    let target_url = req.query.url;
    let filename = `${md5(target_url)}.jpeg`
    let save_path = path.resolve(__dirname, './output/', filename)

    let args = [
        target_url,
        path.resolve(__dirname, './app/phantomjs_script/normal.js'),
        save_path
    ]

    let worker = child_process.spawn('phantomjs', args)

    worker.stdout.pipe(process.stdout)
    worker.stderr.pipe(process.stderr)

    worker.on('exit', (code) => {
        res.send(`/output/${filename}`)
    })

    worker.on('error', (err) => {
        console.error(`phantomjs worker run err, err msg: ${err.message}, stack: ${err.stack}`)
        res.status(500).send(err.message);
    })

}

exports.prerender = function (req, res, next) {
    res.send('prerender is building!')
}

function md5 (str) {
    let hash = crypto.createHash('md5')
    hash.update(str)
    return hash.digest('hex')
}
