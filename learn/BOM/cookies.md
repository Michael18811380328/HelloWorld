# JavaScript Cookie

Cookie 用于存储 web 页面的用户信息。



## 什么是 Cookie？

Cookie 是一些数据, 存储于你电脑上的文本文件中。

当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。

Cookie 的作用就是用于解决 "如何记录客户端的用户信息":

- 当用户访问 web 页面时，他的名字可以记录在 cookie 中。
- 在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录。

Cookie 以名/值对形式存储，如下所示:

username=John Doe

当浏览器从服务器上请求 web 页面时， 属于该页面的 cookie 会被添加到该请求中。服务端通过这种方式来获取用户的信息。



## 使用 JavaScript 创建Cookie

JavaScript 可以使用 **document.cookie** 属性来创建 、读取、及删除 cookie。

JavaScript 中，创建 cookie 如下所示：

document.cookie="username=John Doe";

您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：

document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT";

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";



## 使用 JavaScript 读取 Cookie

在 JavaScript 中, 可以使用以下代码来读取 cookie：

var x = document.cookie;

document.cookie 将以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;

 

## 使用 JavaScript 修改 Cookie

在 JavaScript 中，修改 cookie 类似于创建 cookie，如下所示：

document.cookie="username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";

旧的 cookie 将被覆盖。

------

## 使用 JavaScript 删除 Cookie

删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可，如下所示，设置为 Thu, 01 Jan 1970 00:00:00 GMT:

document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

注意，当您删除时不必指定 cookie 的值。

------

## Cookie 字符串

document.cookie 属性看起来像一个普通的文本字符串，其实它不是。

即使您在 document.cookie 中写入一个完整的 cookie 字符串, 当您重新读取该 cookie 信息时，cookie 信息是以名/值对的形式展示的。

如果您设置了新的 cookie，旧的 cookie 不会被覆盖。 新 cookie 将添加到 document.cookie 中，所以如果您重新读取document.cookie，您将获得如下所示的数据：

cookie1=value; cookie2=value;

如果您需要查找一个指定 cookie 值，您必须创建一个JavaScript 函数在 cookie 字符串中查找 cookie 值。



## JavaScript Cookie 实例

在以下实例中，我们将创建 cookie 来存储访问者名称。

首先，访问者访问 web 页面, 他将被要求填写自己的名字。该名字会存储在 cookie 中。

访问者下一次访问页面时，他会看到一个欢迎的消息。

在这个实例中我们会创建 3 个 JavaScript 函数:

1. 设置 cookie 值的函数
2. 获取 cookie 值的函数
3. 检测 cookie 值的函数

```js
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
```

```js
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
```

```js
function checkCookie() {
  var username=getCookie("username");
  if (username!="") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:","");
    if (username!="" && username!=null)
    {
      setCookie("username",username,365);
    }
  }
}
```

 

## 实例

~~~js
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays2460601000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("欢迎 " + user + " 再次访问");
  } else { user = prompt("请输入你的名字:", "");
  if (user != "" && user != null) {
    setCookie("username", user, 30);
  }
}
}
~~~



## 案例2

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