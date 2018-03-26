/**
 * Created by libo on 2017/6/14.
 */
const path = require('path');
const child_process = require('child_process');
const crypto = require('crypto');

// const phantomjs = require('phantomjs-prebuilt');
const puppeteer = require('puppeteer');
// const bin_path = phantomjs.path;

const worker_pools = [];

init();

exports.screenshot = function (req, res, next) {

    let worker = worker_puppeteer(req.query.url);

    worker
        .then((filename) => {
            res.redirect(`/output/${filename}`)
        })
        .catch(next)

};

exports.screenshot_async = function (req, res, next) {
    res.send(`截图成功，稍后会有回调请求到目标服务器`)
}

exports.prerender = function (req, res, next) {
    res.send('prerender is building!');
};

/**
 * phantomjs 引擎
 * @deprecated
 * @param target_url
 * @return {Promise}
 */
function worker_phantomjs (target_url) {
    const TIMEOUT = 1000 * 10;

    let filename = `${md5(target_url)}.jpeg`;
    let save_path = path.resolve('./public/output/', filename);

    let args = [
        path.resolve('./app/phantomjs_script/base_screenshot.js'),
        target_url,
        save_path
    ];

    let worker = child_process.spawn(bin_path, args);

    worker.stdout.pipe(process.stdout);
    worker.stderr.pipe(process.stderr);

    let timer = setTimeout(() => {
        worker.kill();
    }, TIMEOUT);

    return new Promise ((resolve, reject) => {

        worker.on('exit', (code, signal) => {

            clearTimeout(timer);

            if (!signal) {
                resolve(filename);
            } else {
                reject(new Error('截图失败，目标网站没有在10秒内返回 HTML 内容'))
            }

        });

        worker.on('error', reject)

    })
}

async function worker_puppeteer (target_url) {

    // 默认超时时间
    const TIMEOUT = 1000 * 10;

    let filename = `${md5(target_url)}.jpeg`;
    let save_path = path.resolve('./public/output/', filename);

    let worker = worker_pools[0];

    await worker.goto(target_url, {timeout: TIMEOUT});
    await worker.screenshot({path: save_path});

    return filename;
}

async function init () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    worker_pools.push(page);
}

function md5 (str) {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}