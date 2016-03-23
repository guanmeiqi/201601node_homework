var fs=require("fs");
var http=require("http");
var url=require("url");
var parseBody=require("./parseBody");
var mime=require("mime");
var querystring=require("querystring");
var users = [];

http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    var method=req.method;
    if(pathname=="/users"){
        parseBody(req, function (result) {
            users.push(JSON.parse(result));
            res.end(JSON.stringify(users));
        })
    }else if(pathname=="/"){
        isFileExist("/3index.html",res);
    }else if(pathname=="/regData"){
        if(method=="GET"){
            isFileExist("/regData.json",res);
        }else if(method=="POST"){
            parseBody(req, function (result) {
                var user=querystring.parse(result);
                fs.readFile("./regData.json", function (err,data) {
                    var userData=JSON.parse(data.toString());
                    user.num=userData.register.length+1;
                    userData.register.push(user);
                    fs.writeFile('./regData.json',JSON.stringify(userData),function(err){
                        res.end("true");
                    })
                })
            })
        }else if(method=="DELETE"){
            parseBody(req, function (result) {
                var userId=querystring.parse(result);
                fs.readFile("./regData.json", function (err, data) {
                    var userData = JSON.parse(data.toString());
                    for(var i=0;i<userData.register.length;i++){
                        if(userData.register[i]){
                            if(userData.register[i].num==userId.id){
                                delete userData.register[i];
                                fs.writeFile('./regData.json',JSON.stringify(userData),function(err){
                                    res.end("true");
                                })
                                return;
                            }
                        }
                    }

                })
            })
        }else if(method=="PUT"){
            parseBody(req, function (result) {
                var user=querystring.parse(result);
                fs.readFile("./regData.json", function (err,data) {
                    var userData=JSON.parse(data.toString());
                    for(var i=0;i<userData.register.length;i++){
                        if(userData.register[i]){
                            if(userData.register[i].num==user.num){
                                userData.register[i]=user;
                                fs.writeFile('./regData.json',JSON.stringify(userData),function(err){
                                    res.end("true");
                                })
                                return;
                            }
                        }
                    }
                })
            })
        }
    }else{
        isFileExist(pathname,res);
    }

}).listen(3000);


/*
 **判读文件是否存在并读取
 */

function isFileExist(url,response){
    fs.exists("."+url, function (exists){
        if(exists){
            response.setHeader("Content-Type",mime.lookup(url)+",charset=utf8");
            fs.readFile("."+url, function (err,data) {
                if(err){
                    response.statusCode = 404;
                    response.end();
                }else{
                    response.statusCode = 200;
                    response.write(data);
                    response.end();
                }

            })
        }else{
            response.statusCode=404;
            response.end();
        }
    })
}