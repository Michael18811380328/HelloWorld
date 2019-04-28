/**
 * [palindrome 判断回文字符串 可以转换大小写，可以去除标点符号]
 * @author Michael An
 * @DateTime 2019-02-23T16:30:06+0800
 * @param    {string}
 * @return   {boolean}
 */
function palindrome(str) {
    var string = str.toLowerCase().replace(/[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,'');
    for (let i = 0, length = string.length; i < length / 2 - 1; i++) {
        // console.log(string[i], string[length - i - 1]);
        if (string[i] !== string[length - i - 1]) {
            return false;
        }
    }
    return true;
}

// window.onload = function() {
//   console.log(palindrome("HellEh,./&"));
// }

// 实际上，是否需要大小写转换，或者正则去掉符号，可以从函数外部传入变量控制。