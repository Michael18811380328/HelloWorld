var str = `<a href="https://blog.csdn.net/weixin_41697143/article/details/81049778" target="_blank">Web前端开发标准规范总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049809" target="_blank">最全面计算机英语单词列表（一）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88622936" target="_blank">CSS-界面滚动时不显示滚动条</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837145" target="_blank">React中loading界面处理</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81126291" target="_blank">Cannot read property innerHTML of null 报错信息</a>`;
var result = [];
var target = '\"';
// 思路：获取第一个和第二个双引号的位置，然后把这部分字符串拿出来放到数组中，原来的字符串递归处理

while (str.indexOf('\"') > -1) {
  var first = str.indexOf('\"');
  var last = str.indexOf('\"', first + 1);
  if (first > -1 && last === -1) {
    break;
  }
  var link = str.slice(first + 1, last);
  result.push(link);
  str = str.slice(last + 1);
}

console.log(result, str);