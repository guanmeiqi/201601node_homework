/**
 * Created by TonyTed on 16/3/11.
 * 注册信息系统
 * 要求:
 * 1.查询 把后台存放的用户数组查出来放在table里;
 * 2.增加 把用户填写的表单添加到后台;
 * 3.删除
 * 4.修改
 *
 * 3月13日 更新 RESTFUL
 */

var http = require('http');
var fs = require('fs');
var mime = require('mime');
var url = require('url');

var regInfo = [];
var server = http.createServer(function (req, res) {
        var urlObj = url.parse(req.url, true);
        var _mime = req.url === '/' ? 'text/html' : mime.lookup(req.url);
        var pathname = urlObj.pathname;
        res.setHeader('Content-Type', _mime + ';charset=utf8');

        var type = req.method.toLowerCase();

        if (pathname === '/register.html') {
            res.statusCode = 200;
            fs.readFile('./register.html', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.end(data);
                }
            })

        } else if (pathname === '/registerList' && type === 'post') {
            res.statusCode = 200;
            var r = '';
            req.on('data', function (data) {
                r += data.toString();
            });
            req.on('end', function () {
                regInfo.push(JSON.parse(r));
                res.end('恭喜你,注册成功!');
            })

        } else if (pathname === '/registerList' && type === 'get') {
            res.statusCode = 200;
            res.end(JSON.stringify(regInfo));

        } else if (pathname === '/registerList' && type === 'delete') {
            res.statusCode = 200;
            regInfo.length = 0;
            res.end('注册信息已清除');

        } else if (pathname === '/registerList' && type === 'put') {
            res.statusCode = 200;
            var m = '';
            req.on('data', function (data) {
                m += data.toString();
            });
            req.on('end', function () {
                var result = JSON.parse(m);
                var hasModify = 0;
                regInfo.forEach(function (val) {
                    if (val.name == result.name) {
                        val.age = result.age;
                        hasModify = 1;
                    }
                });
                if (hasModify) {
                    res.end('注册信息已修改');
                } else {
                    res.end('尚无注册信息可修改');
                }
            })

        } else {
            res.statusCode = 404;
            res.end();
        }
});

server.listen('8081', '127.0.0.1');

