/**
 * Created by Administrator on 2016/3/15.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function(req,res){
    var urlobj=url.parse(req.url);
    if(urlobj.pathname=='/'){
        fs.readFile('./index.html','utf8',function(err,data){
            if(err)
                console.log(err);
            else{
                res.end(data);
            }
        })
    }else if(urlobj.pathname=='/reg'){
        var options={
            host:'127.0.0.1',
            port:'8080',
            path:'/reg',
            method:'POST'
        }

        var request= http.request(options,function(reponse){
            reponse.pipe(res);
        })
        req.pipe(request);
    }


}).listen(8090,'127.0.0.1',function(err){
    if(err)
        console.log(err);
    else
        console.log('service is running');
})


