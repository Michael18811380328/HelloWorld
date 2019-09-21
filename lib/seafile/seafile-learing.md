### Seafile 安装维护脚本

这里的安装脚本可以帮助您快速的安装好Seafile 服务器，并配置好 MariaDB, Memcached, WebDAV, Ngnix 和开机自动启动脚本。

(注：MariaDB数据库，是mysql的一个分支开源，兼容mysql的API和命令行；)

Memcached 是一个高性能的分布式内存对象缓存系统，用于web应用以减轻数据库负载，通过使用内存中的缓存对象和数据，减少对数据库的使用，从而提高动态，数据库驱动网站的速度。

WebDAV：一种基于HTTP1.1协议的通信协议，包含get-post-head标准方法，可支持对web server直接读写，支持文件锁定和解锁，支持文件版本控制。

Nginx：engineX 高性能的HTTP和反向代理服务器，轻量级的web服务器



#### 使用步骤

安装干净的 Ubuntu16.04 或 CentOS 7 系统（是linux下的两个系统），并做好镜像 (如果安装失败需要还原到镜像)。

在linux中切换到命令行工具bash：切换成 root 账号(sudo -i)

（直接cd /root 可能报错：没有权限，可以首先使用sudo su命令获取权限）

获取安装脚本

Ubuntu 16.04（适用于6.0.0 及以上版本）:

wget https://raw.githubusercontent.com/haiwen/seafile-server-installer-cn/master/seafile-server-ubuntu-16-04-amd64-http

如果通过其他软件下载到本地临时文件夹，需要移动到专门的文件夹

~~~git
sudo su

cd /root

cd /tmp

ls  获取传入的文件

mv 文件名 新的文件路径 /opt/

bash 文件名 版本号

wget [“URL”] 获取资源
~~~

运行安装脚本并指定要安装的版本 (6.0.13)

bash seafile-server-ubuntu-16-04-amd64-http 6.0.13

脚本会让你选择要安装的版本, 按照提示进行选择即可:

- 如果要安装专业版, 需要先将下载好的专业版的包 seafile-pro-server_6.0.13_x86-64.tar.gz 放到 /opt/ 目录下
- 如果是安装开源版，安装脚本在执行过程中会检查/opt目录下是否有指定版本号的安装包，如果存在则会安装此包，否则会从 Seafile 网站下载。所以，为了避免因下载失败而导致安装中断，您可以提前下载好安装包放到/opt/目录下。

该脚本运行完后会在命令行中打印配置信息和管理员账号密码，请仔细阅读。(你也可以查看安装日志/opt/seafile/aio_seafile-server.log)，MySQL 密码在 /root/.my.cnf 中。



#### 通过Web UI 对服务器进行配置

安装完成后，您需要通过 Web UI 服务器进行基本的配置，以便能正常的从网页端进行文件的上传和下载：

1. 首先在浏览器中输入服务器的地址，并用管理员账号和初始密码登录
2. 点击界面的右上角的头像按钮进入管理员界面
3. 进入设置页面填写正确的服务器对外的 SERVICE_URL 和 FILE_SERVER_ROOT，比如
4. SERVICE_URL:http://www.myseafile.com
5. FILE_SERVER_ROOT:'http://www.myseafile.com/seafhttp'

现在您可以退出管理员界面，并进行基本的测试。关于服务器的配置选项介绍和日常运维可以参考 <http://manual-cn.seafile.com/config/index.html>



#### 启动关闭服务

自动安装脚本会在系统中安装开机自动启动脚本。您也可以使用该脚本来关闭/启动 Seafile 服务，命令如下：

service seafile-server stop

service seafile-server start

http://192.168.0.101:8080

http://127.0.0.1:88

localhost:88 和上面的一样

#### 其他高级配置

备份mysql

- 拷贝 db-backup 目录到 /opt/seafile
- 修改 db-backup/db_backup.sh 中的 USER PASSWD
- 执行 crontab -e 并添加内容 0 1 * * *     /opt/seafile/db-backup/db_backup.sh (每天凌晨1：00进行备份)

配置邮件发送

参考 <http://manual-cn.seafile.com/config/sending_email.html>

升级和其他问题

版本升级

- 切换为 root 用户
- 关闭 seafile-server 相关服务
- 下载高版本的安装包到 /opt/seafile 目录，并解压
- 进入安装包下的 upgrade 目录，执行相关的升级脚本，具体可参考 <http://manual.seafile.com/deploy/upgrade.html>
- 启动 seafile-server 相关服务

迁移社区版到专业版

- 切换为 root 用户
- 关闭 seafile-server 相关服务
- 下载专业版安装包到 /opt/seafile 目录，并解压
- 进入解压好的安装包目录，执行 ./pro/pro.py setup --migrate，具体可参考 <http://manual.seafile.com/deploy_pro/migrate_from_seafile_community_server.html>
- 启动 seafile-server 相关服务