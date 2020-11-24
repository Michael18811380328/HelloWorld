# Python SimpleHTTPServer

　　搭建FTP，或者是搭建网络文件系统，这些方法都能够实现Linux的目录共享。但是FTP和网络文件系统的功能都过于强大，因此它们都有一些不够方便的地方。比如你想快速共享Linux系统的某个目录给整个项目团队，还想在一分钟内做到，怎么办？

很简单，使用SimpleHTTPServer。

　　各种Linux发行版通常都内置了Python，故使用此方法非常方便。在其它OS（比如Windows）此方法也有效，但是要麻烦一些，必须先搭建Python环境。

　　SimpleHTTPServer是Python 2自带的一个模块，是Python的Web服务器。它在Python 3已经合并到http.server模块中。SimpleHTTPServer在Python 3的用法与在Python 2的用法相似(python3 -m http.server 6789), 本文以Python 2为例。

　　SimpleHTTPServer有一个特性，如果待共享的目录下有index.html，那么index.html文件会被视为默认主页；如果不存在index.html文件，那么就会显示整个目录列表。

SimpleHTTPServer使用方法

　　1）进入待分享的目录
　　2）执行命令python -m SimpleHTTPServer 端口号
　　　　注意：不填端口号则默认使用8000端口。
　　3）浏览器访问该主机的地址：[http://IP](http://ip/):端口号/

示例：执行命令

```bash
cd /home/abc
python -m SimpleHTTPServer 8000 
Serving HTTP on 0.0.0.0 port 8000 ... 192.168.20.33 - - [09/Jan/2016 15:13:28] 
"GET / HTTP/1.1" 200 - 192.168.20.33 - - [09/Jan/2016 15:13:33] code 404, message File not found 192.168.20.33 - - [09/Jan/2016 15:13:38] 
"GET /favicon.ico HTTP/1.1" 404 - 192.168.20.33 - - [09/Jan/2016 15:13:54] 
"GET /jdk-7u79-linux-x64.tar.gz HTTP/1.1" 200 -
```

浏览器打开，可以看到如下内容：
![这里写图片描述](http://www.linuxidc.com/upload/2016_10/161026150172671.jpg)

使用时还要注意Linux的防火墙因素。