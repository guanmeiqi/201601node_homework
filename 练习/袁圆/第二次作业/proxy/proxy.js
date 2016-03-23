/**
 * Created by yuan on 2016/3/14.
 */
var http = require('http');
var fs = require('fs');
var bodyParse = require('./bodyParser');
var url = require('url');
var proxy = require('./request');


var server = http.createServer(function(req,res){
    var urlObject = url.parse(req.url,true);
    var pathname = urlObject.pathname;
    if(pathname == '/'){
        fs.readFile('./index.html',function(err,data){
            fs.createReadStream('./index.html').pipe(res);
        });
    }else if(pathname == '/reg'){
        bodyParse(req,function(result){
            proxy({
                host:'localhost',
                port:8082,
                path:'/post',
                method:'POST',
                headers:{'Content-Type':'application/json'}
            },result,function(response){
                res.end(response);
            });
        });
    }
}).listen(9090);