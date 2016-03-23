/**
 * Created by asus on 2016/3/17.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function(request, response){
    console.log(request.url);
    if(request.url == '/'){
        response.writeHead(200,{"content-type":"text/html"})
        fs.createReadStream('cross_domain.html').pipe(response);
    } else if(request.url == '/proxy'){
        response.writeHead(200,{"content-type":"text/plain;charset=utf8"})
        var options = {
            host:'localhost',
            port:8080,
            path:'/getUsers',
            method:'POST'
        };
        http.request(options,function(res){
            res.pipe(response);
        }).end();
    }
}).listen(3000,"localhost");