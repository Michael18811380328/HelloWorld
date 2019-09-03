## Cookies

复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。因为 Cookie 是由 Web 服务器保存在用户浏览器上的小文本文件，它包含有关用户的信息。

~~~js
// 获取当前的cookies
function getCookie(key) {
  if (document.cookie.length > 0) {
    // 如果cookie的长度大于0
    c_start = document.cookie.indexOf(key + "=")
    if (c_start != -1) {
      // 如果username=首次出现的位置大于-1
      c_start = c_start + key.length + 1
      // 开始的位置就是当前位置+key的长度+1（等号长度是1）
      c_end = document.cookie.indexOf(";", c_start)
      // indexOf(searchValue, [fromIndex]) 从fromIndex位置开始检索searchValue。fromIndex参数可选，默认从字符串开始位置开始检索。
      if (c_end == -1) {
        c_end = document.cookie.length
        // 如果结尾的位置是-1（没有找到;那么设置结尾的位置就是cookie的长度-最后的;省略）
      }
      return unescape(document.cookie.substring(c_start, c_end));
      // unescape() 函数可对通过 escape() 编码的字符串进行解码
      // substring(start,[end]) 提取介于两个下标之间的字符
    }
  }
  return ""
  // 如果cookie的长度小于零，那么直接返回空字符串
}

function setCookie(key, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  // setDate(day) 设置一个月的某一天 getDate() 返回月份的某一天（1-31的整数）
  document.cookie = key + "=" + escape(value) +
    ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString())
    // escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。（符号空格转化）
    // Visit W3School! 编码后 Visit%20W3School%21
}

// 页面加载后首先判断是否存在cookies
function checkCookie() {
  username = getCookie('username')
  if (username != null && username != "") {
    alert('Welcome again ' + username + '!');
    // 如果不是null或者空数组，返回用户名
  } else {
      username = prompt('Please enter your name:', "")
      if (username != null && username != "") {
        // 否则设置用户名（传入三个参数，有效期365天）
        setCookie('username', username, 365);
    }
  }
}
~~~

