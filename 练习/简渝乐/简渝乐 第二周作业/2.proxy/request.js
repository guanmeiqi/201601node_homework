var bodyParser = require('./bodyParser');
var http = require('http');
module.exports = function(options,data,callback){
    var request = http.request(options,function(res){
        bodyParser(res,function(result){
            callback(result);
        });
    });
    request.end(data);
}