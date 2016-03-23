var express = require('express');
var fs = require('fs');
var app = express();
var arr=[];
app.all('/',function(req,res){
      fs.readFile('./welcome.html',function(err,data){
          res.end(data);
      })
});
app.get('/index.css',function(req,res){
    res.setHeader('Content-Type','text/css;charset=utf-8');
    fs.readFile('./index.css',function(err,data){
        res.end(data);
    })
});
app.get('/register',function(req,res){
    fs.readFile('./register.html',function(err,data){
        res.end(data);
    })
});
app.get('/login',function(req,res){
    fs.readFile('./login.html',function(err,data){
        res.end(data);
    })
});
app.post('/log',function(req,res){
    var str1="";
    req.on('data',function(data){
        str1+=data.toString();
    })
    req.on('end',function(){
        var logUser = JSON.parse(str1);
        fs.exists('./data.txt',function(exists){
            if(exists){
                fs.readFile('./data.txt',function(err,data){
                    if(err){
                        throw "not written";
                    } else {
                       console.log(logUser);
                        console.log(arr);
                        console.log(toString.call(logUser));
                        console.log(toString.call(arr));
                       for(var i= 0,r=arr.length;i<r;i++){
                           var Obj = JSON.parse(arr[i]);
                           if(Obj.username == logUser.username){
                               if(Obj.password == logUser.password){
                                   fs.readFile('./welcome.html',function(err,data){
                                       res.end(data);
                                   })

                               }
                           }
                       }
                    }
                })
            }
        })
    })
});
app.post('/reg',function(req,res){
    var str="";
    req.on('data',function(data){
        str+=data.toString();
    });
    req.on('end',function(){
        console.log(str);
        arr.push(str);
        fs.exists('./data.txt',function(exists){
            if(exists){
                fs.writeFile('./data.txt',arr,function(err){
                    if(err){
                        throw "not written";
                    } else {
                        res.redirect('/')
                    }
                })
            }
        })
    })
});
app.listen(3000,function(){
    console.log('ok');
});