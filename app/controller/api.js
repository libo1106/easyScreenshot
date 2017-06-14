/**
 * Created by libo on 2017/6/14.
 */
const path = require('path')
const child_process = require('child_process')
const crypto = require('crypto')

const phantomjs = require('phantomjs-prebuilt')
const bin_path = phantomjs.path

exports.screenshot = function (req, res, next) {

    let target_url = req.query.url;
    let filename = `${md5(target_url)}.jpeg`
    let save_path = path.resolve('./public/output/', filename)

    let args = [
        path.resolve('./app/phantomjs_script/base_screenshot.js'),
        target_url,
        save_path
    ]

    let worker = child_process.spawn(bin_path, args)

    worker.stdout.pipe(process.stdout)
    worker.stderr.pipe(process.stderr)

    worker.on('exit', (code) => {
        res.send(`<a href="/output/${filename}" target="_blank">截图结果</a>`)
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
