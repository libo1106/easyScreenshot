/**
 * Created by libo on 2017/6/14.
 */
const path = require('path');
const child_process = require('child_process');
const crypto = require('crypto');

const phantomjs = require('phantomjs-prebuilt');
const bin_path = phantomjs.path;

exports.screenshot = function (req, res, next) {

    const TIMEOUT_SECOND = 10;
    const TIMEOUT = 1000 * 10;
    const NS_PER_SEC = 1e9;

    let target_url = req.query.url;
    let filename = `${md5(target_url)}.jpeg`;
    let save_path = path.resolve('./public/output/', filename);

    let args = [
        path.resolve('./app/phantomjs_script/base_screenshot.js'),
        target_url,
        save_path
    ];

    let time = process.hrtime();

    let worker = child_process.spawn(bin_path, args);

    worker.stdout.pipe(process.stdout);
    worker.stderr.pipe(process.stderr);

    let timer = setTimeout(() => {
        worker.kill();
    }, TIMEOUT);

    worker.on('exit', (code, signal) => {

        clearTimeout(timer);

        let diff = process.hrtime(time);
        console.info(`worker exit, exit code: ${code}, signal: ${signal}, ${req.url} took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds, file at ${save_path}`)

        if (!signal) {
            res.redirect(`/output/${filename}`);
        } else {
            res.status(500).send(`截图失败，目标网站无法在 ${TIMEOUT_SECOND} 秒内触发 onload 事件`);
        }

    });

    worker.on('error', (err) => {
        console.error(`phantomjs worker run err, err msg: ${err.message}, stack: ${err.stack}, url: ${req.url}`)
    });

};

exports.prerender = function (req, res, next) {
    res.send('prerender is building!');
};

function md5 (str) {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}