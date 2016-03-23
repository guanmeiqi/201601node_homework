var http = require('http');
var fs = require('fs');
var bodyparser = require('./bodyParser');
var proxy = require('./request')

http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.createReadStream('./index.html').pipe(res);
    } else if (req.url == '/reg') {
        /**
         * 1. get request body from request
         * 2. build a request to point to the port 6060 and transfer the request body
         * 3. get the response from 6060 and send to browser
         */
        bodyparser(req, function (result) {
            proxy({
                host: 'localhost',
                port: 6060,
                path: '/',
                method: 'POST'
            }, result, function (response) {
                res.end(response);
            })
        })


    }
}).listen(7070);

