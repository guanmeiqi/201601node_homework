var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function(request, response){
    var url_obj = url.parse(request.url);
    console.log(url_obj.pathname);
    if(url_obj.pathname == '/'){
        fs.readFile('ajax.html',"utf8",function(err,data){
            response.end(data);
        });
    } else if(url_obj.pathname == "/jquery.js"){
        fs.readFile('./lib/jquery.js',function(err,data){
           response.end(data);
        });
    }else if(url_obj.pathname == "/getData"){
        fs.readFile("./lib/users.json",function(err,data){
            console.log(data);
            response.end(data);
        });
    } else if(url_obj.pathname == '/abc.css'){
        fs.readFile('./abc.css',function(err,data){
            response.end(data);
        });
    }else if(url_obj.pathname == "/reg"){
        var str ="",obj = {};
        request.on("data",function(data){
            str += data.toString();
            console.log(str);
            var strs = str.split("&");
            for(var i=0;i < strs.length;i++){
                var keys = strs[i].split("=");
                obj[keys[0]] = keys[1];
            }
        });
        request.on("end",function(data){
            fs.readFile("./lib/users.json",function(err,data){
                var users = JSON.parse(data.toString());
                users.push(obj);
                fs.writeFile('./lib/users.json',JSON.stringify(users),function(err){
                    if(err){
                        response.end("failed");
                    } else {
                        response.end("success");
                    }
                })
            });
        })
    } else if(url_obj.pathname == "/delete"){
        var delusers = [];
        request.on("data",function(data){
            var str = "";
            str += data.toString();
            console.log(str);
            delusers = str.split("&");
        });
        request.on("end", function(data){
            fs.readFile("./lib/users.json",function(err,data){

                var users = JSON.parse(data.toString());
                //users.push(obj);
                for(var i=0;i < delusers.length;i++) {
                    for (var j = 0; j < users.length; j++) {
                        console.log(j);
                        console.log(users[j].username, delusers[i]);
                        if (users[j].username == delusers[i]) {
                            users.splice(j, 1);
                            j--;
                        }
                    }
                }

                fs.writeFile('./lib/users.json',JSON.stringify(users),function(err){
                    if(err){
                        response.end("failed");
                    } else {
                        response.end("success");
                    }
                })
            });
        });
    } else if(url_obj.pathname == "/modify"){
        var str = "",modifys = [];
        request.on("data",function(){
            str += data;
        });
        request.on("end",function(){
            modifys = JSON.parse(str);
        });

        fs.readFile('./lib/users.json',function(err, data){
            var users = JSON.parse(data.toString());
            for(var i=0;i < users.length;i++){
                for(var j=0; j <modifys.length;j++){


                }
            }
        })
    }
}).listen(3000,"127.0.0.1");