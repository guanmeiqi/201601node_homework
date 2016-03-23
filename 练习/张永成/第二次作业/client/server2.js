/**
 * Created by asus on 2016/3/16.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function(request, response){
    var urlObj = url.parse(request.url,true);
    if(urlObj.pathname == '/getData'){
        console.log(urlObj.query.callback);
        response.writeHead(200,{"content-type":"application/javascript"});
        var file = fs.createReadStream('users.json');
        var str = "",text="";
        file.on("data",function(data){
            str += data;
        });
        file.on("end",function(){
            text = urlObj.query.callback +"('" +str +"')";
            response.end(text);
        })

        //fs.createReadStream('users.json').pipe(response);
    } else if(urlObj.pathname == '/getUsers'){
        console.log("this is server2");
        //response.end("server2");
        fs.createReadStream('users.json').pipe(response);
    }
}).listen(8080,"localhost");