/**
 * Created by TonyTed on 16/3/18.
 * 实现一个 通过node代理实现跨域请求其他服务器的代码
 */
var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer(function (req, res) {
    var urlObject = url.parse(req.url, true);
    var _mime = req.url === '/' ? 'text/html' : mime.lookup(req.url);
    var pathname = urlObject.pathname;
    res.setHeader('Content-Type', _mime + ';charset=utf-8');
    
    if (pathname == '/') {
        fs.exists('./2.client_proxy.html', function (exists) {
            if (exists) {
                res.statusCode = 200;
                fs.readFile('./2.client_proxy.html', function (err, data) {
                    if (err) {
                        console.warn(err);
                    } else {
                        res.end(data);
                    }
                })
            } else {
                res.statusCode = 404;
                res.end('404');
            }
        });

    } else if (pathname === '/client') {
        var opt = {
            host: '127.0.0.1',
            port: '9090',
            path: '/init?client=8080',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'      //方便目标服务器判断请求体数据类型
            }
        };

        var htmlData = '';
        req.on('data', function (data) {
            htmlData += data;
        });
        req.on('end', function () {
            var clientReq = http.request(opt, function (ress) {
                var initData = '';
                ress.on('data', function (data) {
                    initData += data;
                });
                ress.on('end', function () {
                    //返回给HTML从9090上的响应数据
                    res.write(initData);
                    res.end('\n\n中间经过了8080服务器');
                })
            });

            clientReq.on('error', function (err) {
                console.log(err);
            });
            clientReq.end(htmlData);
        });
    } else {
        res.statusCode = 404;
        res.end();
    }

}).listen('8080');
