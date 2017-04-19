const http = require('http');
const fs = require('fs');
const url = require('url');

let i = 1;
function saveImg(request, response) {
	let info = "";
	request.setEncoding("utf8");
	request.on("data", (chunk) => info += chunk);
	console.log('in');
	request.on("end", () => {
		let base64Data = info.replace(/^data:image\/\w+;base64,/, "");
		let dataBuffer = new Buffer(base64Data, 'base64');
		fs.writeFile('./files/' + i + '.png', dataBuffer, "utf8", (err) => {
		    if (err) {
		        console.error(err);
		    }
		    ++i;
		});
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end('{"data": "ok"}');
	});
}

let server = http.createServer(function(request, response) {
	let path = url.parse(request.url).pathname;
	console.log(path);
	switch(path) {
	    case "/saveImg":
	        saveImg(request, response);
	        break;
	}
});
server.listen(3000);