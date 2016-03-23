/**
 * Created by Administrator on 2016/3/6.
 */
var fs=require('fs');
var http=require('http');
var url=require('url');
var users=[];


http.createServer(function(req,res){
    //帮助解析请求中的url
    var objurl=url.parse(req.url,true);
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'})
    console.log(objurl.pathname);
    if(objurl.pathname=='/'){
        fs.readFile('./reg.html',function(err,data){
            if(err)
            consolelog(1);
                //console.log(err);
            else{
                res.end(data);
            }
        });
    }else if(objurl.pathname=='/users'){
        console.log(req.method.toLowerCase());
        switch (req.method.toLowerCase()){
            case 'post':
                post();
                break;
            case 'get':
                get();
                break;
            case 'delete':
               remove();
                break;
            case 'put':
                put();
                break;
        }
    }

    function post(){
        //每当服务器接收到客户端发送过来的数据的时候就会触发data事件
        var str="";
        req.on('data',function(message){
            str+=message.toString();
        })
        req.on("end",function(){
            users.push(JSON.parse(str));
            //当全部的数据全部获取到，触发end事件的时候，这时候让请求体的数据返回到用户列表中
            //每次添加完之后返回添加的数据
            res.end(str);
        });
    };
    function put(){
        var resstr='';
        req.on('data',function(json){
            resstr+=json;
        });
        req.on('end',function(){
            var user=JSON.parse(resstr);
            var index=user.index;
            delete user.index;
            users[index]=user;
            res.end(JSON.stringify(users));
        });
    };
    function remove(){
        var result="";
        req.on('data',function(message){
            result+=message;
        });
        req.on('end',function(){
            users.splice(parseInt(result),1);
            res.end(JSON.stringify(users));
        });
    };
    function get(){
        res.end(JSON.stringify(users));
    };

}).listen(8080,'127.0.0.1');