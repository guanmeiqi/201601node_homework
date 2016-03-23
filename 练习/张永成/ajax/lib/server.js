var http = require("http");
var url = require("url");
var fs = require("fs");
console.log(__dirname);
http.createServer(function(request, response){
    var url_obj = url.parse(request.url);
    console.log(url_obj.pathname);
    if(url_obj.pathname == '/'){
        fs.readFile('../ajax.html',"utf8",function(err,data){
            response.end(data);
        });
    }else if(url_obj.pathname == "/getData"){

    }
}).listen(3000,"127.0.0.1");