/**
 * [setCookie 设置 cookie]
 * @author Michael An
 * @DateTime 2019-02-28T10:58:07+0800
 * @param    {[type]}                 name   [变量名，必选]
 * @param    {[type]}                 value  [变量值，必选]
 * @param    {[type]}                 exdays [过期日期，可选]
 */
function setCookie(name, value, exdays) {
  let cookie = name + "=" + value + ";";
  if (exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    cookie = cookie + ' ' + expires;
  }
  document.cookie = cookie;
}

/**
 * [getCookie 获取 cookie]
 * @author Michael An
 * @DateTime 2019-02-28T10:58:12+0800
 * @param    {[type]}                 cname [变量名，必选]
 * @return   {[type]}                 [返回值：变量值（字符串）]
 */
function getCookie(cname) {
  let name = cname + "=";
  let cookie = document.cookie.split(';');
  for(let i = 0, len = cookie.length; i < len; i++) {
    let c = cookie[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * [checkCookie 查询 cookie]
 * @author Michael An
 * @DateTime 2019-02-28T10:58:16+0800
 * @return   {[type]}       [如果有cookie就显示欢迎界面，没有cookie就设置当前用户的信息]
 */
function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
    alert("Welcome again " + username);
  }
  else {
    username = prompt("Please enter your name:","");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

// 说明：cookie 用于在本地存储浏览器的信息。当浏览器发送请求时，将cookie共同发送到请求中。服务器可以获取当前用户信息。
// document.cookie 即可获取界面中的 cookies。cookie 数据类型是字符串，需要将字符串转化成对象的形式获取对应的属性。