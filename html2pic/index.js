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
		let filename = getQueryString(info, 'name').replace(/\+/g, '');
		let preBase64Data = getQueryString(info, 'imgUri');
		let base64Data = preBase64Data.replace(/^data:image\/\w+;base64,/, "");
		let dataBuffer = new Buffer(base64Data, 'base64');
		fs.writeFile('./files/' + filename + '.png', dataBuffer, "utf8", (err) => {
		    if (err) {
		        console.error(err);
		    }
		    ++i;
		});
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end('{"data": "ok"}');
	});
}

function getQueryString(t, name) { 
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	let r = t.match(reg); 
	if (r != null) return decodeURIComponent(r[2]); return null; 
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