var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var mime = require('mime');
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer();

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

var server = http.createServer(function(req, res) {
	// You can define here your custom logic to handle the request
	// and then proxy the request.
	// proxy.web(req, res, { target: 'http://127.0.0.1:8000' });

	var url = req.url;
	//如果访问收藏图标的话，直接返回404记得加return
	if (url == '/favicon.ico') {
		return res.end('404');
	}
	// 如果访问/,重定向到index.html，也就是默认首页
	if (url == '/') {
		url = '/index.html';
	}
	console.log(url);
	res.setHeader('Content-Type', mime.lookup(url) + ';charset=utf-8'); //设置响应头
	//判断文件是否存在，如果存在则读取并返回给客户端
	//如果不存在，则报404 Not Found
	fs.exists('.' + url, function(exists) {
		if (exists) {
			fs.readFile('.' + url, function(err, data) {
				console.error(url, err, data);
				//如果读取文件出错了，则也报404错误
				if (err) {
					res.statusCode = 404;
					res.end();
				} else {
					res.statusCode = 200;
					res.write(data);
					res.end();
				}

			})
		} else {

			proxy.web(req, res, {
				target: 'http://127.0.0.1:3000'
			});
			// res.statusCode = 404;
			// res.end();
		}

	})


});

console.log("listening on port 9000")
server.listen(9000);


