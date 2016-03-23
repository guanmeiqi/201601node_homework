var http = require('http');
var fs = require('fs');
var url = require('url');
var num ='';
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if(pathname =='/'){
        pathname ='/index.html';
    }
    if(pathname == '/index.html'){
        fs.readFile('./index.html',function(err,data){
            if(err){
                console.error('not found')
            } else {
                res.end(data);
            }
        })
    }
    if(pathname =='/reg'){
        http.get('http://localhost:70/reg1',function(response){
            response.on('data',function(chunk){
                num+=chunk;
            })
            response.on('end',function(){
                  console.log(num);
                res.end(num);
            })
        })
    }
});
server.listen(60,function(){
    console.log('client server');
})