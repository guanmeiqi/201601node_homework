/**
 * 服务不能放在express.static(__dirname+'/all')同一个文件夹下
 */
var http=require('http');
var url=require('url');
var express=require('express');
var fs=require('fs');
var bodyParser=require('body-parser');
var reguster=[];//保存所有信息的
var app=express();
console.log(__dirname)
app.use(express.static(__dirname+'/all'));//找到能直接读取的文件夹所在地址
app.use(bodyParser.json());//请求体是json的话 会把json的请求体保存在 request.body上
app.get('/',function(request,response){
    reguster=[];
    fs.readFile('./all/login.html','utf-8',function(err,data){
        response.send(data)
    });
    console.log(reguster)
});
app.post('/login',function(req,res){//接受前台返过来的数据
    var a=req.body;
    var flag=false;
        for(var i=0;i<reguster.length;i++){
            if(reguster[i].username==a.username){
                flag=true
                break;
            }else{
                flag=false
            }
        }
    if(flag){
        res.send('登录成功');
    }else{
        res.send('你还没有注册过');
    }

})
app.post('/register',function(req,res){
    var flag=true;
    var a=req.body;

    console.log(a)
    console.log(reguster);
    console.log('-------------');
    if(reguster.length==0){
        reguster.push(a);
        res.send('注册成功');
        return
    }else {
        for (var i = 0; i < reguster.length; i++) {
            if (reguster[i].username == a.username) {
                flag = false;
                break;
            } else {
                flag = true;
            }
        }
    }
    if(flag){
        reguster.push(a);
        console.log(reguster);
        res.send('注册成功');
    }else{
        console.log('有重复的');
        res.send('注册失败');
    }
})
app.listen(8080)

