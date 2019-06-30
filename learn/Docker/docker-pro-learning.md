# 专业版docker开发环境

## 包含模块

seafile-pro, ccnet-pro, seahub, seahub-extra, seafevents, seafes(需要额外的es服务)

## 使用步骤

### 1、准备本地 docker 开发环境目录

这里使用 `/Users/plt/dev/seafile-dev` 为例(**请把这里的示例路径改成你本地的路径**)。创建出目录：

```
mkdir /Users/plt/dev/seafile-dev
cd /Users/plt/dev/seafile-dev
```

Bash

下载 `docker-compose.yml` 文件 (如果使用 master 版本，请把下方的 6.3 替换一下)

```
wget https://raw.githubusercontent.com/seafileltd/seafile-dev-docker/6.3/docker-compose.yml
```

Bash

创建要挂载的目录 `data`, 在其中创建`ssh_key`的文件夹，并将自己的公私钥移动进去；下载mysql初始脚本, 创建 mysql 数据目录

```
mkdir -p data/ssh_key
cp ~/.ssh/id_rsa* data/ssh_key/
mkdir -p data/docker-entrypoint-initdb.d
wget https://raw.githubusercontent.com/seafileltd/seafile-dev-docker/6.3/docker-entrypoint-initdb.d/init.sql -P data/docker-entrypoint-initdb.d
mkdir -p mysql-data
```

Bash

修改`docker-compose.yml`中的挂载配置

```
# mysql 相关的两处配置改动
------------------------------------------------------------
"/opt/mysql-data:/var/lib/mysql"
⬇️️️️
"/Users/plt/dev/seafile-dev/mysql-data:/var/lib/mysql"

------------------------------------------------------------
"/opt/seafile_dev/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d"
⬇️
"/Users/plt/dev/seafile-dev/data/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d"

------------------------------------------------------------
# seafile 相关的配置改动
"/root/data:/data"
⬇️
"/Users/plt/dev/seafile-dev/data:/data"

------------------------------------------------------------
# 修改 pro 的版本 (把下方的 6.3.1 改成 6.3 最新的版本，你可以登录 docker.seafile.top 查看最新的版本号，登录账号在下方)
pro:
  image: docker.seafile.top/seafile-dev-pro:6.3.1
```

Bash

### 2、启动 docker 镜像

登录我们国内内部用 docker 镜像站点

```
docker login docker.seafile.top
username: seafile
password: lee1eeYiuu6Eilae
```

Bash

启动镜像 (在 `seafile-dev-docker` 目录下):

```
docker-compose up
```

Bash

进入 docker

```
docker exec -it seafile-dev-pro bash  # 注意 master 分支叫做 seafile-pro-dev
```

下载源码和和编译 (源码在 `data/dev` ，编译后放在 `data/compiled`)

```
run.sh compile
```

创建seahub的数据库

```
run.sh python-env /data/dev/seahub/manage.py migrate
```

Bash

启动服务

```
run.sh
```

Bash

启动后需要等一分钟左右。

创建用户

```
run.sh python-env /data/dev/seahub/manage.py createsuperuser
```

Bash

**在浏览器中访问本机的 127.0.0.1:8000 就可以看到 Seahub 的登录页面，并用刚才创建的用户名和账号登录了 🙂**

### 3、配置 react 前端项目

npm seafile 用户登录 (seafile / HelloSeafile123$)

```
npm login
```

安装依赖 (如果 npm 安装失败，可以尝试在宿主机的目录下直接执行)

```
cd seahub/frontend
npm install
```

配置 webpack (master 版本跳过这一步骤)

```
cd frontend/config

cp webpack.config.dev.js.template webpack.config.dev.js
```

启动 webpack

```
cd frontend/
npm run dev
```

修改seahub配置：`seahub_settings.py`

```
import os
PROJECT_ROOT = os.path.join(os.path.dirname(__file__), os.pardir, "dev/seahub")
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'frontend/',
        'STATS_FILE': os.path.join(PROJECT_ROOT, 'frontend/webpack-stats.dev.json'),
    }
}
```

现在你可以访问 wiki 等一些用 react 技术写的前端页面了。

## 开发情景示例

#### seahub开发[不需要底层改变]

- 拷贝自己的公私钥到本地home目录下的.ssh文件夹下, 以及主机上需要安装git
- 进入本地源码目录的seahub目录下，比如挂载到了`/data`目录下，则进入`/data/dev/seahub`目录
- 直接使用git命令切换分支
- 因为seahub启动是用django的runserver方式启动，而且默认加了debug选项，所以不需要重启可以直接查看界面效果

#### seahub开发[需要seafile-pro-server和ccnet-pro-server的feature1分支]

切换分支

```
# 进入容器
docker exec -it seafile-dev-pro bash
# 将seafile-pro-server分支拉下来，并编译
cd /data/dev/seafile-pro-server
git fetch feature1:feature1
git checkout feature1
./configure --prefix=$COMPILE_PATH # 编译到持久层
make
make install
run.sh migrate # 拷贝到系统目录

# 将ccnet-pro-server分支拉下来，并编译
cd /data/dev/ccnet-pro-server
git fetch feature1:feature1
git checkout feature1
./configure --prefix=$COMPILE_PATH # 编译到持久层
make
make install
run.sh migrate # 拷贝到系统目录
```

Bash

修改seahub代码

重启服务

```
. /root/scripts/run.sh start # 会杀掉ccnet、 seafile、 seahub、 seafevents进程并重启
```

Bash

访问`127.0.0.1:8000`页面查看效果

#### seafile本地开发

- 代码修改

- 编译

  ```
  cd /data/dev/seafile-pro-server
  ./configure --prefix=$SOURCE_PATH # 编译到持久层
  make
  make install
  . /root/scripts/run.sh migrate # 拷贝到系统目录
  ```

  Bash

- 重启服务

  ```
  . /root/scripts/run.sh start # 会杀掉ccnet、 seafile、 seahub、 seafevents进程并重启
  ```

  Bash

- 打开开发环境python终端

  ```
  . /root/scripts/run.sh python-env
  ```

  Bash

- 在python终端环境下查看接口是否正确

  ```
  from seaserv import seafile_api
  .....
  ```

  Bash

## 开启文件搜索功能 (可选)

1、去掉 `docker-compose.yml` 中关于搜索部分的注释:

```
  #es:
  #  image: elasticsearch:2.4.5
  #  container_name: seafile-es
  #  volumes:
  #    - "/root/data/es-data:/usr/share/elasticsearch/data"
  #  ports:
  #    - 9200:9200
  #    - 9300:9300
  
```

以及

```
  pro:
    ...
    depends_on:
      - db
      - memcached
    # - es
```

2、修改 `seafevents.conf`

```
[INDEX FILES]
enabled=true   # 从 false 改成 true
index_office_pdf=true # 添加全文搜索支持
```

3、重启服务 (运行 run.sh)

注：index.log 在 dev/seafevents 下

## 说明

### 文件结构

- conf: 程序的配置文件
- logs: 程序产生的日志
- ssh_key: 预先放入的公私钥
- docker-entrypoint-initdb.d: 初始化mysql执行的sql语句
- dev: 包含各个项目的源代码
- compiled: 编译后产生的文件
  - bin: 编译产生的可执行文件
  - include: 编译产生的头文件
  - lib: 编译产生的库文件
  - share: 编译产生的共享数据

#### 公私钥

为了从github上拷项目以及上传代码的时候使用

### Seafile Docker 镜像

包含了 Seafile 运行所需要的依赖软件

### python环境操作

```
docker exec -it seafile-dev-pro /root/scripts/run.sh python-env xxx
# 这命令相当于python xxx
```

Bash

### 添加脚本

在 data/scripts 下添加脚本后可以直接在容器中运行。你也可以根据你的需要更改 run.sh 。

### 添加环境变量

修改 `docker-compose.yml` 即可

## 常见问题

- Q: office无法预览，而且日志报fetch错误

  A: 检查主机上防火墙上8082是否开启

- Q: mac上出现错误`ERROR: xxxxxx Mounts denied:`

  A: 请将你准备挂载的目录放到docker的file sharing中。步骤: Preference -> File Sharing -> 选择挂载路径并添加 -> 重启docker