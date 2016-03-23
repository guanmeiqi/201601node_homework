var http = require('http');
var fs = require('fs');
var url = require('url');
var arr=[];
var server = http.createServer(function(request,response){
    delete require.cache;
       var urlObj = url.parse(request.url),
           pathname = urlObj.pathname;
           if(pathname =='/'){
               pathname = '/index.html';
           }
           if(pathname == '/favicon.ico'){
               return 404;
           }
           if(pathname == '/index.html'){
               response.setHeader('Content-Type','text/html;charset=utf-8');
               fs.readFile('./index.html',function(err,data){
                   if(err){
                       throw err;
                   } else {
                       response.end(data);
                   }

               })
           } else if(pathname =='/index.css'){
               response.setHeader('Content-Type','text/css;charset=utf-8');
               fs.readFile('./index.css',function(err,data){
                   if(err){
                       throw err;
                   } else {
                       response.end(data);
                   }
                   response.end();
               })
           } else if(pathname == '/reg'){
               var str="";
              request.on('data',function(data){
                  str+=data.toString();

              })
              request.on('end',function(){
                  var method = request.method.toLowerCase();
                  switch(method){
                      case 'get':
                          fs.exists('./user.txt',function(exists){
                              if(exists){
                                  fs.readFile('./user.txt',function(err,data){
                                      if(err){
                                          throw "未读取到数据";
                                      }else {
                                          response.end(data);
                                      }
                                  })
                              }else {
                                  throw "未找到文件";
                              }
                          });
                          break;
                      case 'post':
                              arr.push(JSON.parse(str));
                              fs.writeFile('./user.txt',JSON.stringify(arr),function(err){
                                  if(err){
                                      throw "数据未写入文件";
                                  }else {
                                      fs.readFile('./user.txt',function(err,data){
                                          if(err){
                                              throw "未读取到数据";
                                          }else {
                                              response.end(data);
                                          }
                                      })
                                  }
                              })


                          break;
                      case 'put':
                          var user = JSON.parse(str);
                          var oldUser = user[0],newUser = user[1];
                          fs.exists('./user.txt',function(exists){
                              if(exists){
                                  fs.readFile('./user.txt',function(err,data){
                                      if(err){
                                          throw "未读取到数据";
                                      }else {
                                          if(data){
                                              var arr1 = JSON.parse(data);
                                              for(var i= 0,r=arr1.length;i<r;i++){
                                                  var person = arr1[i];
                                                  if(person.username === oldUser.username && person.age === oldUser.age){
                                                      arr1.splice(i,1,newUser);
                                                      arr.splice(i,1,newUser);
                                                      fs.writeFile('./user.txt',JSON.stringify(arr1),function(err){
                                                          if(err){
                                                              throw '没有删除';
                                                          } else {
                                                              fs.readFile('./user.txt',function(err,data){
                                                                  if(err){
                                                                      console.log(err);
                                                                  } else {
                                                                      var m = new Buffer(data).toString();
                                                                      response.end(m);
                                                                      arr=[];
                                                                  }
                                                              })
                                                          }
                                                      });
                                                  }
                                              }
                                          } else {
                                              throw '空文件'
                                          }
                                      }
                                  })
                              }else {
                                  throw "未找到文件";
                              }
                          });
                          break;
                      case 'delete':
                          var user2 = JSON.parse(str);
                          fs.exists('./user.txt',function(exists){
                              if(exists){
                                  fs.readFile('./user.txt',function(err,data){
                                      if(err){
                                          throw "未读取到数据";
                                      }else {
                                          var arr2 = JSON.parse(data);
                                          for(var i= 0,r=arr2.length;i<r;i++){
                                              if((arr2[i].username == user2.username) && (arr2[i].age == user2.age)){
                                                  arr2.splice(i,1);
                                                  arr.splice(i,1);
                                              }
                                          }
                                          fs.writeFile('./user.txt',JSON.stringify(arr2),function(err){
                                              if(err){
                                                  throw '没有删除';
                                              } else {
                                                  fs.readFile('./user.txt',function(err,data){
                                                      if(err){
                                                          throw "没有读取到";
                                                      } else {
                                                          var m = new Buffer(data).toString();
                                                          response.end(m);
                                                          arr=[];
                                                      }
                                                  })
                                              }
                                          });
                                      }
                                  })
                              }else {
                                  throw "未找到文件";
                              }
                          });
                          break;
                  }
              })
           }


});
server.listen(70,function(){
    console.log('ok');
})