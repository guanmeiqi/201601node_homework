var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');


//定义一个用户数据
var userdata= [];

//读取静态文件
app.use(express.static(__dirname+'/views'));

app.use(bodyParser.urlencoded({extended:true}));


//配置模板引擎
app.set('view engine','ejs');

//指定模板存放的目录
app.set('views',path.resolve('views'));

app.get('/',function(req,res){
    res.render('index.ejs',{title:'首页',books:{
        name:'node.js'
    }});
});

app.get('/index.html',function(req,res){
    res.render('index.ejs',{title:'首页',books:{
        name:'node.js'
    }});
});

app.post('/reg.html',function(req,res){
    userdata.push(req.body)
    res.end('{"msg":"注册成功，请登录！"}');

});

app.post('/login.html',function(req,res){
    console.log(req.body)
    console.log(userdata)
    if(userdata.length > 0){
        for(var i=0;i<userdata.length;i++){
            console.log(userdata[i].name);
            console.log(req.body.name);
            console.log(userdata[i].password);
            console.log(req.body.password);
            if((userdata[i].name == req.body.name) && (userdata[i].password == req.body.password)){
                res.end('{"msg":"恭喜你，登录成功"}');
            }else{
                res.end('{"msg":"登录失败，请重新登录！"}');
            }
        }
    }else{
        res.end('{"msg":"登录失败，请重新登录！"}');
    }

});

app.listen(8080);
