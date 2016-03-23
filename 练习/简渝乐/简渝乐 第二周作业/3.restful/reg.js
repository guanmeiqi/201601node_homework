/**
 * Created by ll on 2016/3/11.
 */
var fs= require('fs');
var http= require('http');
var url = require('url');
var first = true;
//var user=[];
var server= http.createServer(function(req,res){
    var urlObj= url.parse(req.url,true);
    res.setHeader('Content-Type','text/html;charset=utf8');
    if(urlObj.path == "/"){
        fs.readFile('./reg.html',function(err,data){
            res.end(data);
        })
    }else if(urlObj.path == '/reg'){
        var method = req.method.toLowerCase();
        //console.log(method);
        if(method == "post"){
            var str="";
            req.on('data',function(data){
                str+=data.toString();
            });
            req.on('end',function(data){
                //user.push(JSON.parse(str));
                fs.readFile('shuju.txt',function(err,data){
                    if(err){
                        console.log('读取失败');
                    }else{
                        var user=[];
                        if(data == ""){
                            //console.log(data);
                            var arr = user.push(JSON.parse(str));
                            fs.writeFile('shuju.txt',JSON.stringify(arr),function(err){
                                if(err){
                                    console.log('写入失败');
                                }
                            })
                        }else{
                            var yuanyoushuju =JSON.parse(data.toString());
                            user.push(yuanyoushuju);
                            user.push(JSON.parse(str));
                            console.log(user);
                            fs.writeFile('shuju.txt',JSON.stringify(user),function(err) {
                                if (err) {
                                    console.log('写入失败');
                                }
                            })
                         }
                     }
                });
                //console.log(userFromShuJu);

                if(JSON.parse(str).name=="" && JSON.parse(str).age==""){
                    res.end("0");
                }else{
                    first = false;
                    res.end("1");

                }
            });
        }else if(method == "get"){
            fs.readFile('shuju.txt',function(err,data){
                if(err){
                    console.log('读取失败');
                }else{
                    //console.log(data.toString())
                    res.end(data.toString());
                }
            })
        }


    }
});
server.listen(8088,'localhost');