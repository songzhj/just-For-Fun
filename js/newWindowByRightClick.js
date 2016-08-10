/*
 * 鼠标右击超链接，在新窗口打开
 */
 function newWindowByRightClick() {
 	document.addEventListener('contextmenu', function (e) {
 		e.preventDefault();
 		e.returnValue = false;
 		if (e.target.nodeName.toLowerCase() === 'a') {
 			var href = e.target.href;
 			window.open(href);
 		}
 	});
 }