/**
 * Created by asus on 2016/3/17.
 */
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
//console.log(bodyParser);
app.set("views",path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/login",function(request, response){
    console.log(request.body);
    fs.exists("users.json",function(flag){
        console.log(__dirname);
        if(flag){
            var file = fs.createReadStream('users.json');
            var str = "",users = [];
            file.on("data",function(data){
                str += data.toString();
            });
            file.on("end",function(){
                users = JSON.parse(str);
                users.forEach(function(e,i){
                    if(e.username == request.body.username){
                        if(e.password == request.body.password){
                            //response.sendFile(path.join(__dirname,"pages/success.html"));
                            //response.redirect("http://localhost:4000/pages/success.html");
                            response.send("success");
                           // response.render('success',{username:request.body.username});
                        } else {
                            response.send("password_wrong");
                        }
                    }
                });
            });
        }else {
            response.send("failed");
        }
    })


});

app.post("/reg",function(request,response){
    fs.exists("users.json",function(flag){
        if(flag){
            console.log(1);
            var file = fs.createReadStream('users.json');
            var str = "",users = [];
            file.on("data",function(data){
                str += data.toString();
            });
            file.on("end",function(){
                users = JSON.parse(str);
                users.push(request.body);
                var writefile = fs.createWriteStream('users.json');
                writefile.write(JSON.stringify(users),'utf8');
                writefile.end();
                response.send("success");
            });
        }else {
            var user_arr = "["+JSON.stringify(request.body)+"]";
            var file = fs.createWriteStream('users.json');
            file.write(user_arr,"utf8");
            file.end();
            //request.pipe(fs.createWriteStream('users.json'));
        }
    })
})

app.listen(4000);