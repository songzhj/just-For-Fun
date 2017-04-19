/**
 * An ajax plugin by Promise and original XMLHttpRequest
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-02-24
 */

function get(url, data) {
    var ajaxPromise = new Promise(function(resolve, reject) {
        ajax("GET", url, data, resolve, reject);
    });
    return ajaxPromise;
}
function post (url, data) {
    var ajaxPromise = new Promise(function(resolve, reject) {
        ajax("POST", url, data, resolve, reject);
    });
    return ajaxPromise;
}
function ajax(type, url, data, success, failed){
    // 创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();
 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}
module.exports = {
    "get": get,
    "post": post
};