var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
app.use(cookieParser('tangyumeng'));
var session = require('express-session')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//db
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'userdb'); //创建一个数据库连接
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var UserSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        password: String
    },
    {collection: "accounts"}
);

var User = db.model('User', UserSchema);
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {

});

//express-session
app.use(session({
    secret: 'tangyumeng',
    resave: false,
    saveUninitialized: true
}));
app.use(function (req, res, next) {
    var users = req.session.users

    if (!users) {
        req.session.users = {}
    }
    next();
});

//view
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.get('/', function (req, res) {
    if (req.signedCookies.username){
        res.render('logged.ejs',{'content':'已经登录,使用cookie判断'});
    }else{
        res.render('reg.ejs');
    }
});

app.get('/login', function (req, res) {
    res.render('login.ejs',{'content':'','username':req.signedCookies.username});
});

app.post('/login',urlencodedParser,function(req,res){
    if (req.body.username && req.body.password){
        User.find({"username":req.body.username},function(err,results){
            console.log(results);
            if (results.length > 0){
                if (req.body.username === results[0].username &&
                    req.body.password === results[0].password){
                    res.render('logged.ejs',{'content':'登录成功'});
                }else{
                    res.render('login.ejs',{'content':'请输入正确的用户名,密码','username':''});
                }
            }else{
                res.render('login.ejs',{'content':'请输入正确的用户名,密码','username':''});
            }
        });
    }else{
        res.render('login.ejs',{'content':'请输入用户名,密码','username':''});
    }
});

app.get('/logout',function(req,res){
    res.clearCookie('username');
    res.redirect('/');
});

app.post('/reg',urlencodedParser, function(req, res) {
    if (req.body.username && req.body.password){
        User.find({"username":req.body.username},function(err,results){
            if (results.length > 0){
                //数据库存在 不能注册
                res.render('login.ejs',{'content':'对不起,该用户名已被注册...','username':''});
            }else{
                //数据库存在 可以注册
                var userentity = new User({username:req.body.username,
                                    password:req.body.password});
                userentity.save();

                //记录用户cookie
                res.cookie('username',req.body.username,{signed:true});
                res.redirect('/login')
            }
        });
    }
});

app.get('/view', function (req, res) {
    res.render('view.ejs', {title: 'hello,world'});
});
app.listen(3000);