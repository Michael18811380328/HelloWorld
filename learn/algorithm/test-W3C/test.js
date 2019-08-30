// 算法1 倒转字符串
var a = "hello";
console.log(a.split("").reverse().join(""));

// console.log(Array.prototype.reverse);
// 使用原型继承的方式，将数组的reverse方法转换到字符串不可行

// 算法2 计算阶乘
function test(number) {
    if (number == 1 || number == 0) {
        return 1;
    } else {
        var result = 1;
        for (var i = 1; i < number + 1; i++) {
            result *= i;
        }
        return result;
    }
}
console.log(test(5));

// 算法3：计算回文字符串：palindrome(回文)是指一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样。
// var str = s.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,""); 

// var str="jfkldsjalk,.23@#!$$k~!  @#$%^&*()(_+-=|\{}[]';:,./<>??gg  g~```gf"; 
// str=str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,""); 

// str='<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>无标题文档</title></head><br/ >'; 
// str=str.replace(/<[^>]*>|/g,""); 
// 
// 正则表达式替换界面内部的标点符号（输出纯文本），去除界面的html标签，输出纯文本。
var string = "$%^&**<><?dwwhhwwD::";

function test2(str) {
    huiwen = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "").toLowerCase();
    huiwen = huiwen.split("");
    for (var i = 0; i < huiwen.length / 2; i++) {
        if (huiwen[i] !== huiwen[huiwen.length - i - 1]) {
            return false;
        }
    }
    return true;
}
console.log(test2(string));