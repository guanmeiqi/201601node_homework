


var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    if(req.url=='/'){
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(req.url == '/reg'){
        var result = '';
        req.on('data',function(data){
            result += data;
        });
        req.on('end',function(){
            // 请求数据
            var options ={
                host: 'localhost',
                port: 8080,
                path: '/',
                method: 'POST'
            };
            var result2 = '';
            var request = http.request(options,function(res2){
                res2.on('data',function(data2){
                    result2 +=data2;
                });
                res2.on('end',function(){
                    res.end('后台服务返回：'+result2);
                });
            });
            request.end(result);
        });
    }
}).listen(9090);