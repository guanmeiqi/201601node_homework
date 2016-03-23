/**
 * Created by TonyTed on 16/3/18.
 */

var path = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var dataBox = [];
var server = http.createServer(function (req, res) {
    var _mime = req.url === '/' ? 'text/html' : mime.lookup(req.url);
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    res.setHeader('Content-Type', _mime + ';charset=utf-8');

    var contentType = req.headers['content-type'];
    if (pathname === '/init') {
        var clientData = '';
        res.statusCode = 200;
        req.on('data', function (data) {
            clientData += data;
        });
        req.on('end', function () {
            if (contentType === 'application/json') {
                dataBox.push(JSON.parse(clientData));
                res.write('这是9090服务器发回的信息,\n\n');
                res.write('响应服务器URL是' + urlObj.href + '\n\n');
                res.end(JSON.stringify(dataBox));
            } else {
                dataBox.push(clientData);
                res.write('这是9090服务器发回的信息,\n\n');
                res.write('响应服务器URL是' + urlObj.href + '\n\n');
                res.end(JSON.stringify(dataBox));
            }
        })

    } else {
        res.statusCode = 404;
        res.end();
    }

}).listen(9090);