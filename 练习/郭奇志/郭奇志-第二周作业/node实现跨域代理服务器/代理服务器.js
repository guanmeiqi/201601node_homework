//问题：代理服务器和真正服务器的端口肯定得一样对吗？
var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');

var options={};
var users1=[];
var users2=[];
var server=http.createServer(function(req,res) {
    var urlObj = url.parse(req.url,true);
    options.host=urlObj.hostname;
    options.port=urlObj.port;
    options.path=urlObj.pathname;
    options.header={};
    var str='';
    req.on('data',function(data){
        str+=data.toString();
    });
    req.on('end',function(){
        //获得请求体
        users1.push(JSON.parse(str))});

//以下是作为客户端向真正的服务器发送请求、接受响应，并将响应保存在全局变量users中
    var request2=http.request(options,function(res){
        var result='';
        res.on('data',function(data){
            result+=data;
        })
        res.on('end',function(){
            users2=JSON.parse(result);
        });
    })
    //发送请求体到真正的服务器
    request2.end(JSON.stringify(user1));

//将真正的服务器返回的结果返回给客户端
    res.end(JSON.stringify(users2));
}).listen(8080)