### curl命令学习

~~~curl

curl命令在linux系统中常用，支持文件上传下载等多种命令(在window的bash中能否执行？)
# curl [options] [url]

1.curl http://www.baidu.com 系统发送get请求获取页面的链接内容到标准输出

2.curl -I http://baidu.com 显示http请求头，不显示内部内容

curl -i [url] 显示请求头和页面内容(html)

3. curl [URL]>index.html 将页面保存到本地文件

4.curl -o [url] -o [url] 同时下载多个文件

5. curl -L url 获得重定向的网页(如果浏览器打开可以跳转，直接使用curl命令不会跳转)

6. curl -A "MOzilla/5.0(Android ;Monile; rv:35.0)" URL  伪装成安卓火狐浏览器自定义用户代理

**7. curl -H "Referer:www.baidu.com" -H "User-Agent:Custom-User-Agent" URL 传递请求头
curl -H "Cookie: 1234567890=dfghjkl" URL 的形式传递Cookies

8. curl -c "cookie-example" URL 保存cookies

9.curl -b "cookies" URL 自定义cookies(加入cookies字符串或者已经保存的cookies文件名)

** 10. curl -d "username=tom&password=1234567" -X POST url
使用post方法发送数据 -X后面是发送数据的方法

强制使用get方法 curl -d "somedata" -X GET URL

*****应用：带cookies登录*****

curl -c "cookie-login" -d "username=asd&password=1234" -X POST URL
curl -b "cookie-login" URL

第一次通过POST发送用户信息并进行验证，存储cookies，以后直接上传cookies即可免用户登录。

curl -v 显示请求详细信息

curl -f 向服务器post表单 curl -F "web=@index.html;type=text/html" url
~~~