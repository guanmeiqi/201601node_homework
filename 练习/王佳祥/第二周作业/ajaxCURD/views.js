var http = require('http');
var fs = require('fs');
var mime = require('mime');
var url = require('url');
var queryString = require('querystring');
var userData = [{id: '1', name: 'wang', sex: '男', age: '23'}];
var maxId = 0;
var server = http.createServer(function (request, response) {
    var objUrl = url.parse(request.url);
    var query = queryString.parse(objUrl.query);
    var requestUrl = objUrl.pathname;
    if (requestUrl == '/favicon.ico') {
        return response.end('404');
    }
    if (requestUrl == '/') {
        requestUrl = '/index.html';
    }
    if (requestUrl === '/users') {
        var method = request.method.toLowerCase();
        switch (method) {
            case 'post':
                var str = '';
                request.on('data', function (data) {
                    str += data.toString();
                });

                request.on('end', function () {
                    var query = queryString.parse(str);
                    query['id'] = maxId.toString();
                    maxId++;
                    userData.push(query);
                    response.end(JSON.stringify([query]));
                });
                break;
            case 'put':
                var str = '';
                request.on('data', function (data) {
                    str += data.toString();
                });

                request.on('end', function () {
                    var query = queryString.parse(str);
                    for (var cur = 0, len = userData.length; cur < len; cur++) {
                        if (userData[cur]['id'] === query['id']) {
                            userData[cur]['name'] = query['name'];
                            userData[cur]['sex'] = query['sex'];
                            userData[cur]['age'] = query['age'];
                            break;
                        }
                    }
                    /*query['id'] = maxId.toString();
                     maxId++;
                     userData.push(query);*/
                    response.end(JSON.stringify([query]));
                });
                break;
            case 'delete':
                var str = '';
                request.on('data', function (data) {
                    str += data.toString();
                });

                request.on('end', function () {
                    var query = queryString.parse(str);
                    userData.forEach(function (cur, index) {
                        if (cur['id'] === query['id']) {
                            userData.splice(index, 1);
                        }
                    });
                    response.end(JSON.stringify([query]));
                });
                break;
            case 'get':
                var queryArr = [];
                var reg = new RegExp(query.searchText);
                userData.forEach(function (cur) {
                    if (reg.test(cur['name'])) {
                        queryArr.push(cur);
                    }
                });
                response.end(JSON.stringify(queryArr));
                break;
            default:
                return response.end('404');
        }
    } else {
        response.setHeader('Content-Type', mime.lookup(requestUrl) + ';charset=utf-8');//设置响应头
        fs.exists('.' + requestUrl, function (exists) {
            if (exists) {
                fs.readFile('.' + requestUrl, function (err, data) {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.write(data);
                        response.end();
                    }
                })
            } else {
                response.statusCode = 404;
                response.end();
            }
        })
    }
});
server.listen(8062);