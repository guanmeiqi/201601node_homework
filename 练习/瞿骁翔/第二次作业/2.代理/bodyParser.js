//取得请求的数据。
module.exports = function(req,callback){
    var result = '';
    req.on('data',function(data){
        result+=data;
    });
    req.on('end',function(){
        callback(result);
    });
}