

// 服务端
var http = require('http');
http.createServer(function(req,res){
    var reslut = '';
    res.setHeader('Content-Type','text/html;charset=utf-8');
    req.on('data',function(data){
        reslut +=data;
    });
    req.on('end',function(){
        res.end('8080服务端数据:'+reslut);
    });
}).listen(8080);