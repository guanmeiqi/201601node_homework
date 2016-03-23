var http = require('http');
//指定请求的参数
var options = {
    host:'localhost',
    port:8081,
    path:'/',
    method:'POST',
    //headers:{'Content-Type':'application/json'}
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
    //headers:{'Content-Type':'application/zfpx'}
}

var result = '';
//向服务器发送请求
var request = http.request(options,function(res){
    console.log(res.statusCode);//读取响应
    console.log(res.headers);//读取响应头

    res.on('data',function(data){
        result+=data;
    })
    res.on('end',function(){
        var users = result.toString();
        console.log(users);
    });
})

request.end();//当调用end方法的时候请求才会真正发出