const http = require('http');
const url = require("url");
const fs = require("fs");


function post(req, res){
	let str = '';
	req.on('data', function(chunk){str += chunk;});
	req.on('end', function(){   
		let prams=JSON.parse(str);
		fs.rename(prams.odlpath,prams.newpath,(err)=>{
			if(err)res.end(JSON.stringify({code:500,data:err}))
			else  res.end(JSON.stringify({code:200,data:'成功'}))
		})
	});
}
function get(req, res){
	let params = url.parse(req.url, true).query;// 解析 url 参数
	res.end(JSON.stringify(params));
}
http.createServer(function(req, res){
	res.writeHead(200, {
		'Content-Type': 'text/plain; charset=utf-8',
		//设置允许跨域的域名，*代表允许任意域名跨域
		"Access-Control-Allow-Origin":"*",
		//允许的header类型
		"Access-Control-Allow-Headers":"content-type",
		//跨域允许的请求方式 
		"Access-Control-Allow-Methods":"DELETE,PUT,POST,GET,OPTIONS"
	});
	switch(req.method.toLowerCase()){
		case 'post':
			post(req, res);
			break;
		case 'get':
			get(req, res);
			break;
		default:
			res.end('不支持的请求方式');
	}
}).listen(8888,()=>{
	console.log('启动服务8888')
});