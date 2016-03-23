/**
 * Created by lijl on 2016/3/18.
 */
var http = require('http');
var fs = require('fs');
var users = [];
var server = http.createServer(function (req, res) {
    var result = '';
    req.on('data',function(data){
        result+=data;
    })
    req.on('end',function(data){
        //console.log(result);
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users));
    })

}).listen(8080);