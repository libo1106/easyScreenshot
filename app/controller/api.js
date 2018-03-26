/**
 * Created by libo on 2017/6/14.
 */
const path = require('path');
const child_process = require('child_process');
const crypto = require('crypto');

// const phantomjs = require('phantomjs-prebuilt');
const puppeteer = require('puppeteer');
const emulateDevices = require('puppeteer/DeviceDescriptors');
// const bin_path = phantomjs.path;

// todo 共享 worker 线程，减少进程启停切换的开销
// const worker_pools = [];

// init();

exports.screenshot = function (req, res, next) {

    let {url, mobile} = req.body;

    let worker = worker_puppeteer(url, mobile);

    worker.then((filename) => {
            res.json({
                status: 1,
                data: `/output/${filename}`
            });
        })
        .catch(next)

};

exports.screenshot_async = function (req, res, next) {
    res.send(`截图成功，稍后会有回调请求到目标服务器`)
}

exports.prerender = function (req, res, next) {
    res.send('prerender is building!');
};

async function worker_puppeteer (target_url, isMobile = false) {

    // 默认超时时间
    const TIMEOUT = 1000 * 10;

    let filename = `${md5(target_url)}.jpeg`;
    let save_path = path.resolve('./public/output/', filename);

    // let worker = worker_pools[0];
    // await worker.goto(target_url, {timeout: TIMEOUT});
    // await worker.screenshot({path: save_path});

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (isMobile) {
        await page.emulate(emulateDevices['iPhone 6']);
    }
    await page.goto(target_url, {timeout: TIMEOUT});
    await page.screenshot({path: save_path});
    await browser.close();

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