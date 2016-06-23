'use strict';
const fs = require('fs');

/*
* 词法分析器
* */
function Lex(filename) {
    const keywordTable = ['program', 'var', 'integer', 'char', 'procedure', 'begin', 'end',
        'end', 'if', 'then', 'fi', 'while', 'do', 'endwh', 'read', 'write',
        'array', 'of', 'return', 'record'];
    let nbTable = [];
    let idTable = [];
    let token = [];
    let string = '';
    let i = 0;
    let word = '';

    function action() {
        readSource();
    }

    /*
     * 读取源代码
     * */
    function readSource() {
        fs.readFile(filename, (err, data) => {
            string = data.toString();
            doLex();
            writeToken();
        });
    }

    /*
    * 词法分析
    * */
    function doLex() {
        let length = string.length;
        while(i < length) {
            if ((string[i] >= 'a' && string[i] <= 'z') || (string[i] >= 'A' && string[i] <= 'Z')) {
                word += string[i];
                ++i;
                LS1();
            } else if (string[i] >= '0' && string[i] <= '9') {
                word += string[i];
                ++i;
                LS2();
            } else if (string[i] == '+') {
                ++i;
                output(23)
            } else if (string[i] == '-') {
                ++i;
                output(24);
            } else if (string[i] == '*') {
                ++i;
                output(25);
            } else if (string[i] == '/') {
                ++i;
                output(26);
            } else if (string[i] == '=') {
                ++i;
                output(27);
            } else if (string[i] == ':') {
                word += string[i];
                ++i;
                LS3();
            } else if (string[i] == '(') {
                ++i;
                output(29);
            } else if (string[i] == ')') {
                ++i;
                output(30);
            } else if (string[i] == '[') {
                ++i;
                output(31);
            } else if (string[i] == ']') {
                ++i;
                output(32);
            } else if (string[i] == ';') {
                ++i;
                output(33);
            } else if (string[i] == ' ') {
                ++i;
                LS4();
            } else if (string[i] == '\r' && string[i + 1] == '\n') {
                i += 2;
                output(34);//34是换行
            } else if (string[i] == '.') {
                ++i;
                output(35);
            } else if (string[i] == ',') {
                ++i;
                output(36);
            } else {
                ++i;
                output(404);
            }
        }
    }

    /*
    * 关键字指针
    * */
    function keyword(word) {
        let r = keywordTable.indexOf(word);
        return r === -1 ? null : r;
    }

    /*
    * 无符号整数指针
    * */
    function number(word) {
        let r = nbTable.indexOf(word);
        if (r === -1) {
            nbTable.push(word);
            return nbTable.length - 1;
        } else {
            return r;
        }
    }

    /*
    * 标识符指针
    * */
    function id(word) {
        let r = idTable.indexOf(word);
        if (r === -1) {
            idTable.push(word);
            return idTable.length - 1;
        } else {
            return r;
        }
    }

    /*
    * 存储Token序列
    * */
    function output(key, value) {
        if (value === undefined) {
            value = ' ';
        }
        let item = key + ',' + value;
        token.push(item);
        word = '';
    }

    function LS1() {
        if((string[i] >= 'a' && string[i] <= 'z') ||
            (string[i] >= 'A' && string[i] <= 'Z') ||
            (string[i] >= '0' && string[i] <= '9')) {
            word += string[i];
            ++i;
            LS1();
        } else {
            let p = keyword(word);
            if (p !== null) {
                output(p);
            } else {
                let d = id(word);
                output(21, d); //21是标识符
            }
        }
    }

    function LS2() {
        if(string[i] >= '0' && string[i] <= '9') {
            word += string[i];
            ++i;
            LS2();
        } else {
            let p = number(word);
            output(22, p); //22是无符号整数
        }
    }

    function LS3() {
        if (string[i] == '=') {
            word += string[i];
            ++i;
            output(28);
        } else {
            output(404);
        }
    }

    function LS4() {
        if (string[i] == ' ') {
            ++i;
            LS4();
        }
    }

    /*
    * Token序列写到Token文件
    * */
    function writeToken() {
        let s = '';
        for (let i in token) {
            console.log('(' + token[i] + ')');
            s += token[i] + '\n';
        }
        fs.writeFileSync(filename + 'Token', s);
    }

    return {
        getToken:action
    };
}

(function(){
    new Lex('C:/Users/songzhj/Code/WebStorm/SNL/test').getToken();
})();