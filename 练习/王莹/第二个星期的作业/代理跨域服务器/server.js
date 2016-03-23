/**
 * Created by Administrator on 2016/3/15.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');
http.createServer(function(req,res){
    var urlobj=url.parse(req.url);
    if(urlobj.pathname='/reg'){

        var result="";
        req.on('data',function(data){
            result+=data;
        })
        req.on('end',function(){
            //读取保存的JSON文件
            var users=JSON.parse(fs.readFileSync('./text.json','utf8'));
            users.push(JSON.parse(result));
            returnStr=JSON.stringify(users);
            fs.writeFileSync('./text.json',returnStr,'utf8');
            res.end(returnStr);
        })

    }else
        res.end();

}).listen(8080,'127.0.0.1',function(err){
    if(err)
        console.log(err);
    else
        console.log('service is running');
})