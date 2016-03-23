var http = require('http');
var fs = require('fs');
var users = [];
var server = http.createServer(function (req, res) {
    var result = '';
    var contentType = req.headers['content-type'];
    req.on('data',function(data){
        result+=data;
    })
    req.on('end',function(data){
        var user = '';
        if(contentType =='application/json'){
            user = JSON.parse(result);
        } else if(contentType =='application/x-www-form-urlencoded'){
            //name=zfpx&age=6
            user = require('querystring').parse(result);
        }else if(contentType =='application/zfpx'){
            //name@zfpx|age@6
            user = require('querystring').parse(result,'|','@');
        }

        users.push(user);
        res.writeHead(200,{"Access-Control-Allow-Origin":"*"});
        res.end(JSON.stringify(users));
    })

}).listen(8082);