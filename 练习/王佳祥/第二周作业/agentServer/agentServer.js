var http = require('http');
var https = require('https');
var fs = require('fs');
var mime = require('mime');
var url = require('url');
var queryString = require('querystring');

var server = http.createServer(function (request, response) {
    var objUrl = url.parse(request.url);
    var query = queryString.parse(objUrl.query);
    var requestUrl = objUrl.pathname;
    if (requestUrl == '/favicon.ico') {
        return response.end('404');
    }
    if (requestUrl == '/') {
        requestUrl = '/index.html';
    }
    if (requestUrl === '/cross') {
        var httpsRequest = https.request(
            {
                host:'gsp0.baidu.com',
                port:'',
                path:'/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=res&wd=ww',
                headers:{'Content-Type':'text/javascript; charset=utf8'},
                method: 'GET'
            },
            function (res) {
                var result = '';
                res.on('data', function (data) {
                    result += data;
                });
                res.on('end', function () {
                    console.log(result);
                    response.end(result);
                });
            }
        );
        httpsRequest.write('');
        httpsRequest.end();
    } else {
        response.setHeader('Content-Type', mime.lookup(requestUrl) + ';charset=utf-8');//设置响应头
        fs.exists('.' + requestUrl, function (exists) {
            if (exists) {
                fs.readFile('.' + requestUrl, function (err, data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }
                })
            } else {
                response.statusCode = 404;
                response.end();
            }
        })
    }
});
server.listen(8062);