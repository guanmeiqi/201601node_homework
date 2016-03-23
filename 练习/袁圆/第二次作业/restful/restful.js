/**
 * Created by Yuan on 2016/3/15.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
    }
}

app.get('/listUsers',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        res.end(data);
    });
});

app.get('/addUsers',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        data = JSON.parse(data);
        data['user4'] = user['user4'];
        fs.writeFile(__dirname +'/'+'user.json',JSON.stringify(data),function(err,data){
            if (err) throw err;
            console.log('It\'s saved!'); //文件被保存
        });
        res.end( JSON.stringify(data));
    });
});

app.get('/user/:id',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        user = JSON.parse(data);
        var userinfo = user['user'+req.params.id];
        console.log(req.params.id);
        res.end( JSON.stringify(userinfo));
    });
});

app.get('/delete/:id',function(req,res){
    fs.readFile(__dirname +'/'+'user.json',function(err,data){
        user = JSON.parse(data);
        delete user['user'+req.params.id];
        res.end( JSON.stringify(user));
    });
});


app.listen(8080);

