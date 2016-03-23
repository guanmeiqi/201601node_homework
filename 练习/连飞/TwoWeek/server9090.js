var http = require('http');
var fs = require('fs');
var parseBody = require('./parseBody');
var proxy = require('./request');
var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.createReadStream('./2index.html').pipe(res);
    } else if (req.url == '/reg') {
        parseBody(req, function (result) {
            proxy({
                host: 'localhost',
                port: 3000,
                path: '/users',
                method: 'POST'
            }, result, function (response) {
                res.end(response);
            });

        })
    }

}).listen(9090);