var http = require('http');
var bodyParser = require('./bodyParser');
var users = [];
var server = http.createServer(function (req, res) {
    bodyParser(req,function(result){
        console.log('穿越千山万水终于来到如来佛这里');
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users));
    });
}).listen(666);
