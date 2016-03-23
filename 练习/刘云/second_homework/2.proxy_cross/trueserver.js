var http = require('http');
var bodyparser = require('./bodyParser');
var users = [];

http.createServer(function (req, res) {
    bodyparser(req, function (result) {
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users));
    })
}).listen(6060);

