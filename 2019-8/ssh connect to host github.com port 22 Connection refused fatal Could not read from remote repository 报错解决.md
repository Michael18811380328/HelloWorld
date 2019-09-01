# ssh: connect to host github.com port 22: Connection refused fatal: Could not read from remote repository 报错解决

今天 github 提交代码时，git pull 出现错误：ssh: connect to host github.com port 22: Connection refused fatal: Could not read from remote repository。 可以使用 git push 把自己的代码提交到远程，但是不能 pull。这个情况之前没有遇到过。

这个报错信息翻译时：ssh：连接到主机github.com端口22：连接拒绝：无法从远程存储库读取。

查询资料后，在栈溢出中找到解决方案：因为我在公共的WiFi环境中（我在肯德基敲代码），这个公共WIFI可能拒绝了SSH端口， 所以pull代码失效。

解决方案：在SSH配置文件中，设置github的主机名为 ssh.github.com 设置443端口

~~~bash
vim ~/.ssh/config
~~~

~~~m&#39;d
Host github.com
  Hostname ssh.github.com
  Port 443
~~~

这样就可以 git pull 了。

原始链接

https://stackoverflow.com/questions/7953806/github-ssh-via-public-wifi-port-22-blocked