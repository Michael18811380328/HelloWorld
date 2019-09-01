var regex = new RegExp('xyz','i');
var regex = /xyz/i

let regex = new RegExp(/abc/ig, 'i');


function codePointLength(text) {
  let result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';
s.length // 4
codePointLength(s) // 2
