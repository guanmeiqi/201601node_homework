var http = require('http');
var fs = require('fs');
var bodyParser = require('./bodyParser');
var proxy = require('./request');
var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/reg') {
        console.log("一不小心来到五指山下");
        bodyParser(req, function (result) {
            proxy({
                host: 'localhost',
                port: 666,
                path: '/',
                method: 'POST',
            }, result, function (response) {
                res.end(response);
            });
        })
    }
}).listen(999);

