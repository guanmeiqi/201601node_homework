var http = require('http');
var fs = require('fs');
var proxy = require('./proxy.js');
var server = http.createServer(function(req,resp){
    console.log(req.url)
    if(req.url == "/"){
        fs.createReadStream('./ad.txt').pipe(resp);
    }else if(req.url == '/reg.html'){
        var enddata = ''
        var http = require('http');
        var options = {
            host:'localhost',
            port:8081,
            path:'/',
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        };
        var request = http.request(options,function(res){
            var result = '';
            res.on('data',function(data){
                result+=data;
            })
            res.on('end',function(){
                enddata = result.toString();
                console.log(enddata);
                resp.write(enddata.toString())
                resp.end(enddata);

            });
        })
        request.end();
    }
}).listen(8080);


