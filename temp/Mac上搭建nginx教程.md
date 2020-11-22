# 前端安装配置nginx服务器

### 1.安装Homebrew

这个工具类似于 npm，就是第三方包安装工具。我使用的 Mac 系统，在终端输入

~~~bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
~~~

安装时间根据网络情况确定，我需要大约20分钟。其间提示输入密码,输入Mac密码,安装成功后进行下一步操作。

### 2.安装nginx

我们选择依赖 Homebrew 安装nginx可以减少很多麻烦,细心的你会发现nginx安装过程中下了很多东西.

只需要在终端输入

~~~bash
brew install nginx
~~~

### 3.开启nginx服务器

安装好了,就可以启动nginx了,终端输入 `brew services start nginx`

可以直接转到浏览器输入:

> http://localhost:8080

如果出现上图所示,表面nginx安装并开启成功.

### 4.关闭重启nginx
nginx 其他命令（关闭重启），把 start 替换即可

~~~txt
brew services stop nginx
brew services restart nginx
~~~




###  5.nginx配置简单说明

nginx默认安装到 /usr/local/ 目录下


> /usr/local/Cellar/nginx 


具体的配置文件如下，我们可以复制一份

cp /usr/local/etc/nginx/nginx.conf

~~~python
user root owner; 注意设置访问权限( user root owner; )，不然等会访问网站会出现403错误

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
    #access_log  logs/access.log  main;
    
    sendfile        on;
    #tcp_nopush     on;
    
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    #gzip  on;
    
    server {
        listen       8080;
        server_name  localhost;
    
        #charset koi8-r;
    
        #access_log  logs/host.access.log  main;
    
        location / {
            root   html;
            index  index.html index.htm;
        }
    
        #error_page  404              /404.html;
    
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}
    
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}
    
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    # 这里可以自定义端口
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    
    #    location / {
    #        root   html; 本地网站文件夹的路径
    #        index  index.html index.htm; 设置默认的网页
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
~~~