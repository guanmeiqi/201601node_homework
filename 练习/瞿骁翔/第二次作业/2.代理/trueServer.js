var http = require('http');
var fs = require('fs');
var users = ["localhost:9090","localhost:3000"];
var server = http.createServer(function (req, res) {
    var result = '';
    req.on('data',function(data){
        result+=data;
    })
    req.on('end',function(data){
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users));
    })

}).listen(8080);