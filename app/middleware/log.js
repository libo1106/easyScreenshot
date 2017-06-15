/**
 * Created by libo on 2017/6/16.
 */

exports.access = function (req, res, next) {

    console.info(`${req.method} ${req.url}`)

    next()
}

exports.performance = function(req, res, next) {

    const NS_PER_SEC = 1e9;
    let time = process.hrtime();

    next()

    let diff = process.hrtime(time);

    console.info(`${req.url} took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`)

}