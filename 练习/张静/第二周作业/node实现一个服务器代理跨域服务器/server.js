var http=require('http');
var users=[];
var querystring=require('querystring');
http.createServer(function(req,res){
    req.setEncoding('utf8');//设置编码
    var contentType=req.headers['content-type'];
    var result="";
    if(req.url=='/post'){
        req.on('data',function(data){
            result+=data;
        });
        req.on('end',function(){
            var user='';
            if(contentType=='application/json'){
                user=JSON.parse(result);
                users.push(user);
                res.end(JSON.stringify(users));
            }
        });
    }
}).listen(8081);
