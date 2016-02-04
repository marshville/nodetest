var debug = require('debug')('hello');
var http = require('http');
var port = process.env.PORT || 3000;
debug("This should never appear unless DEBUG=hello");
http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/plain' });
	res.end('Hello World from Mikes\n');
}).listen(port);
