var http = require('http');
var url = require('url');
var bodyParser = require('./bodyParser');

var server = http.createServer(function (req,res) {
    bodyParser(req, function (result) {
        console.log('hhhhh');
        console.log(result);
        console.log('hhhhh');
    });
    res.end('real server worked');
});

server.listen(8888,function(){
   console.log('real server started at http://localhost:8888');
});
