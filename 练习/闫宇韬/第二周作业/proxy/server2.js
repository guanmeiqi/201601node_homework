var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
    console.log(req.url)
    if(req.url == "/"){
        fs.createReadStream('./server2.txt').pipe(res);
    }else if(req.url == '/index.html'){
        res.end('a')
    }
}).listen(8081);