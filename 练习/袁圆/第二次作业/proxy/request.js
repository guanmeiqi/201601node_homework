/**
 * Created by yuan on 2016/3/14.
 */
var http = require('http');
var bodyParser = require('./bodyParser');

module.exports = function(options,data,callback){
    var request = http.request(options,function(res){
        bodyParser(res,function(result){
            callback(result);
        });
    });

    request.write(data);
    request.end();
//request也是一个流，是一个可写流
//request.write('name=zfpx&age=6');
//request.write('name@zfpx|age@6');
    //当调用end方法的时候请求才会真正发出
}