/**
 * Created by Yuan on 2016/3/15.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine','ejs');
app.set('views',path.resolve('views'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));//此中间件会把请求体提取出来放到req.body上



var user4 = {
    "name" : "mohit",
    "password" : "password4",
    "profession" : "teacher",
}

app.get('/',function(req,res){
    res.render('index',{
        title:'后台登录'
    });
});

//app.use(express.static(__dirname + '/public'));
app.get('/reg',function(req,res){
    res.render('reg',{
        title:'后台注册'
    });
});

app.get('/list',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        var data = JSON.parse(data);
        res.render('extend',{
            users:data
        });
    });
});

app.get('/listUsers',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        res.end(data);
    });
});

app.get('/addUsers',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        data = JSON.parse(data);
        var newId = Math.ceil( Math.random()*100)+ Math.floor(Date.now() / 1000);
        user4.id = newId;
        data.push(user4);
        fs.writeFile(__dirname +'/'+'user.json',JSON.stringify(data),function(err,data){
            if (err) throw err;
            console.log('It\'s saved!'); //文件被保存
        });
        res.end(JSON.stringify(data));
    });
});

/*添加user*/
app.post('/addUsers',function(req,res){
    var newData = req.body;
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        data = JSON.parse(data);
        var newId = Math.ceil( Math.random()*100)+ Math.floor(Date.now() / 1000);
        newData.id = newId;
        data.push(newData);
        console.log(data);
        fs.writeFile(__dirname +'/'+'user.json',JSON.stringify(data),{encoding: 'utf8',flag: 'w'},function(err){
            if (err) {
                res.end('{"status":"error"}');
            } else {
                console.log('It\'s saved!'); //文件被保存
                res.end('{"status":"success"}');
            }
        });
    });
});

/*查询user*/
app.get('/user/:name',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        var user = JSON.parse(data);var flag = false;
        console.log(req.params.id);
        for (var i = 0; i < user.length; i++) {
            if (user[i].name == req.params.name) {
                flag = true;
            }
        }
        if (flag) {
            res.end('{"status":"success"}');
        } else {
            res.end('{"status":"error"}');
        }
    });
});


app.get('/delete/:id',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        var user = JSON.parse(data);
        for (var i = 0; i < user.length; i++) {
            if (user[i].id == req.params.id) {
                user.splice(i, 1);
            }
        }
        fs.writeFile('./user.json', JSON.stringify(user), 'utf8', function (err) {
            if (err) {
                res.end('{"status":"error"}');
            } else {
                res.end('{"status":"success"}');
            }
        })
    });
});



app.listen(8080);

