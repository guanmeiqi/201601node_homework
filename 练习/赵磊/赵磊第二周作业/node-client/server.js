var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if(pathname =='/reg1'){
        var rs = fs.createReadStream('./data.txt');
        var str="";
        rs.on('data',function(data){
            str+=data;
        });
        rs.on('end',function(){
            console.log(str);
            res.end(str);
        })
    }
});
server.listen(70,function(){
    console.log('real server');
})