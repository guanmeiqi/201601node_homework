var http=require('http');
var options={
    host:'localhost',
    port:8081,
    path:'/post',
    method:'POST',
    headers:{'Content-Type':'application/json'}
}
var fs=require('fs');
var server=http.createServer(function(req,res){
   if(req.url=='/'){
       fs.createReadStream('./index.html').pipe(res);
   }else if(req.url=='/reg'){
       var result="";
       req.on('data',function(data){
            result+=data;
       });
       req.on('end',function(){
           var request=http.request(options,function(res1){
               var result1="";
               res1.on('data',function(data){
                   result1+=data;
               });
               res1.on('end',function(){
                   res.end(result1);
               });
            });
           request.write(result);
           request.end();
       });
   }
}).listen(9090);
