/*
 * 使用流实现的Comet客户端。（不支持IE）
 * @param(要连接的url，服务器每次推送时执行的方法，连接结束时执行的方法)
 */
function createCometStreamClient(url, progress, finished) {
	var xhr = new XMLHttpRequest(),
		received = 0;

	xhr.open("get", url, true);
	xhr.onreadystatechange = function() {
		var result;
		if (xhr.readyState == 3) {
			result = xhr.responseText.substring(received);
			received += result.length;
			progress(result);
		} else if (xhr.readyState == 4) {
			finished(xhr.responseText);
		}
	};
	xhr.send(null);
	return xhr;
}