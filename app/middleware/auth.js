/**
 * Created by libo on 2017/6/14.
 */
exports.jwt = function (req, res, next) {

    console.info(`jwt is coding!`);
    next();

};

exports.deny_phantomjs = function (req, res, next) {

    let userAgent = req.header('user-agent');

    if (/PhantomJS/.test(userAgent)){
        res.status(403).send('禁止 phantomjs 访问');
    } else {
        next();
    }

};