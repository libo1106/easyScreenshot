/**
 * Created by libo on 2017/6/15.
 * 基础截图脚本，只能处理传统页面直出的截图
 */

var page = require('webpage').create()
var args = require('system').args

var url = args[1]
var output = args[2]

page.open(url, function() {
    page.render(output);
    phantom.exit();
});