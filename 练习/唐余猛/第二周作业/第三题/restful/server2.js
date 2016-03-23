var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());






app.set('view engine','html');
app.set('views',__dirname);
app.engine('html',require('ejs').__express);


//db
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'usersdb'); //创建一个数据库连接
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var UserSchema = new mongoose.Schema({
        username: {type: String, unique: true},
        age: String
    },
    {collection: "users"}
);

var User = db.model('User', UserSchema);
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {

});


app.get('/', function (req,res) {
    res.render('index');
});


app.post('/reg', function(req, res) {
    console.log('test');
    console.log(req.body);
    console.log('test');
    if (req.body.username && req.body.age){
        User.find({"username":req.body.username},function(err,results){
            if (results.length > 0){
                //数据库存在 不能注册
                res.render('login.ejs',{'content':'对不起,该用户名已被注册...','username':''});
            }else{
                //数据库存在 可以注册
                var userentity = new User({username:req.body.username,
                    age:req.body.age});
                userentity.save();
                res.redirect('/login')
            }
        });
    }
});




app.listen(8080,function(){
   console.log('app started at http://localhost:8080');
});



