/**
 * Created by lijl on 2016/3/18.
 */
var users = [];
var fs=require('fs');
var express = require('express');
//获取配置对象
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/users',function(req,res) {
    var user=req.body;
    fs.readFile('./user.json', function (err, data) {
        if (data.toString() != '') {
            users = JSON.parse(data);
        }

        if (users.length == 0) {
            user.id = 1;
        } else {
            user.id = users[users.length - 1].id + 1;
        }
        users.push(user);
        console.log(user);

        fs.writeFile('./user.json', JSON.stringify(users), {encoding: 'utf8',flag: 'w'}, function (err) {
            if (err) {
                res.send('{"status":"error"}');
            } else {
                res.end('{"status":"success", "value":' + JSON.stringify(user) + '}');
            }
        })
    })

});

app.get('/users', function(req,res){
    fs.readFile('./user.json','utf8', function (err, data) {
        if (!err) {
            var result = data.toString() == '' ? '[]' : data.toString();
            res.end('{"status":"success", "value":' + result + '}');
        } else {
            res.end('Query failed!')
        }
    });
})

app.put('/users',function(req,res){
    var user = req.body;
    console.log(user);
        fs.readFile('./user.json', function (err, data) {
            if (!err) {
                user.id = parseInt(user.id);
                if (data.toString() != '') {
                    users = JSON.parse(data);
                }
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == user.id) {
                        users[i] = user;
                    }
                }

            }
            fs.writeFile('./user.json', JSON.stringify(users), 'utf8', function (err) {
                if (err) {
                    res.end('{"status":"error"}');
                } else {
                    res.end('{"status":"success", "value":' + JSON.stringify(users) + '}');
                }
            })
        })
    });
app.delete('/users/:id', function(req,res){
    var param= req.params;
    var id=parseInt(param.id);
    console.log(id);
    fs.readFile('./user.json', function (err, data) {
        if (!err) {
            fs.readFile('./user.json', function (err, data) {
                if (!err) {
                    if (data.toString() != '') {
                        users = JSON.parse(data);
                    }
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].id == id) {
                            users.splice(i, 1);
                        }
                    }

                }
                fs.writeFile('./user.json', JSON.stringify(users), 'utf8', function (err) {
                    if (err) {
                        res.end('{"status":"error"}');
                    } else {
                        res.end('{"status":"success"}');
                    }
                })

            })

        }
    })

})
app.listen(3000);