var http = require('http');
var proxy = require('./request');
var url = require('url');
var bodyParser = require('./bodyParser');
// 获取请求的headers，去掉host和connection
var getHeader = function (req) {
    var ret = {};
    for (var i in req.headers) {
        if (!/host|connection/i.test(i)) {
            ret[i] = req.headers[i];
        }
    }
    return ret;
};
//暂时只支持get，post
http.createServer(function (req, res) {
    switch(req.method.toLocaleLowerCase()){
        case 'get':
            var path = url.parse(req.url).path;
            var method = req.method;
            var options = {
                host:req.headers.realhost? req.headers.realhost : 'localhost',
                port:req.headers.port ?req.headers.port : 8888,
                path: path,
                method: method,
                headers:  getHeader(req)
            }
            proxy(options, function (response) {
                res.end(response);
            });
        break;
        case 'post':
            bodyParser(req, function (result) {
                var options = {
                    host: 'localhost',
                    port: 8888,
                    path: path,
                    method: method,
                    headers:  getHeader(req),
                    body: result
                }
                proxy(options,result, function (response) {
                    res.end(response);
                });
            });
        break;
    }
    
}).listen(9090);

