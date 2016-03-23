var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views',path.resolve('views'));

var user = ["admin"];
app.get('/',function(req,res){
    res.render('index');
});
app.get('/register',function(req,res){
    res.render('register');
});
app.get('/welcome',function(req,res){
    res.render('welcome',{currentUser:currentUser});
});
var userP = [{username:"admin",password:"admin"}];
var currentUser = "";
function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
app.post('/reg',function(req,res){
    var str = '';
    req .on('data',function(data){
        str+=data.toString();
    });

    req .on('end',function(data){
        str = JSON.parse(str);
        if(in_array(str.username,user)){
            console.log("已经注册过");
            res.end("no");
        }else{
            console.log("ok");
            user.push(str.username);
            userP.push(str);
            console.log(JSON.stringify(userP));
            res.end("yes");
        }

    });
});


app.post('/login',function(req,res){
    console.log("login");
    var str = '';
    req .on('data',function(data){
        str+=data.toString();
    });
    req .on('end',function(data){
        str = JSON.parse(str);
        console.log(str);
        for(i=0;i<userP.length;i++){
            if(str.username == userP[i].username && str.password == userP[i].password){
                currentUser = str.username;
                console.log(currentUser);
                res.end("yes");
            }else{
                res.end("no");
            }
        }

    });
});