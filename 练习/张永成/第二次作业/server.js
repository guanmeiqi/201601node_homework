/**
 * Created by asus on 2016/3/14.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var server = http.createServer(function(request, response){
    var method = request.method.toLowerCase();
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;
    //console.log(path.cwd());
    if(pathname == '/'){
        console.log(request.headers);
        fs.createReadStream('pages/userlist.html').pipe(response);
        //fs.readFile('pages/userlist.html',function(err,data){
        //   // response.setHeader("content-type","text/html");
        //    if(err){
        //        console.log(err);
        //        response.status = 404;
        //    } else {
        //        response.write(data);
        //        response.end();
        //    }
        //});
    } else if(pathname == '/favicon.ico'){
        response.status = '404';
        response.end("not found");
    } else if(pathname == '/images/bg.jpg'){
        fs.readFile('pages/images/bg.jpg',function(err,data){
            response.end(data);
        });
    } else if(pathname == '/lib/crud.js'){
        fs.readFile("lib/crud.js",function(err,data){
            response.end(data);
        });
    } else if(pathname == '/users'){
        switch (method){
            case 'get':
                fs.readFile('pages/users.json','utf8',function(err,data){
                    response.end(data);
                });
                break;
            case 'post':
                var str = "",users = [];
                request.on("data",function(data){
                    str += data.toString();
                });
                request.on("end",function(){
                    fs.readFile('pages/users.json','utf8',function(err,data){
                        users = JSON.parse(data);
                        users.push(querystring.parse(str));
                        fs.writeFile('pages/users.json',JSON.stringify(users),function(err){
                            if(err){
                                response.end("failed");
                            } else {
                                response.end("success");
                            }
                        })
                    })
                    ;

                });
                break;
            case 'put':
                var modify_users = "";
                request.on("data",function(data){
                    modify_users += data;
                });
                request.on("end", function(data){
                    fs.readFile("pages/users.json",'utf8',function(err, data){
                        var users = JSON.parse(data);
                        modify_users = JSON.parse(modify_users);
                        console.log("modify_users:"+modify_users)
                        for(var i=0; i< users.length; i++){
                            for(var j=0; j < modify_users.length; j++){
                                if(users[i].username == modify_users[j].username){
                                    users[i].password = modify_users[j].password;
                                }
                            }
                        }
                        console.log("users:"+JSON.stringify(users));
                        fs.writeFile("pages/users.json",JSON.stringify(users),function(err){
                            if(err){
                                response.end("failed");
                            } else {
                                response.end("success");
                            }
                        })
                    })
                });
                break;
            case 'delete':
                var delusers = ""
                request.on("data",function(data){
                    delusers += data.toString();
                });
                request.on("end",function(data){
                    console.log("delusers:"+delusers);
                    fs.readFile("pages/users.json",'utf8',function(error,data){
                        var users = JSON.parse(data);
                        delusers = JSON.parse(delusers);
                        console.log("delusers:"+delusers)
                        for(var i=0; i< users.length; i++){
                            for(var j=0; j < delusers.length; j++){
                                if(users[i].username == delusers[j]){
                                    users.splice(i,1);
                                    i--;
                                }
                            }
                        }
                        console.log("users:"+JSON.stringify(users));
                        fs.writeFile("pages/users.json",JSON.stringify(users),function(err){
                            if(err){
                                response.end("failed");
                            } else {
                                response.end("success");
                            }
                        })
                    })
                });
        }
    }

});
server.listen(3000,'localhost');