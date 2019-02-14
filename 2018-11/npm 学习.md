# npm 学习

NPM（node package manager），通常称为node包管理器。顾名思义，它的主要功能就是管理node包。

包括：安装、卸载、更新、查看、搜索、发布等。

## 1、常规使用

### 安装

node包的安装分两种：本地安装、全局安装。两者的区别如下，后面会通过简单例子说明

- 本地安装：package会被下载到当前所在目录，也只能在当前目录下使用。
- 全局安装：package会被下载到到特定的系统目录下，安装的package能够在所有目录下使用。

 npm install -g grunt-cli 全局安装 grunt-cli

对于单独作用的包，安装在对应的文件夹下，对于全局的指令（cnpm, grunt-cli 等全局工具需要全局安装）

~~~bash
# 安装最新版本的grunt-cli
npm install grunt-cli
# 安装0.1.9版本的grunt-cli
npm install grunt-cli@"0.1.9"
# 通过package.json进行安装(已有package.json)
npm instapackage.jsonl
~~~

### 卸载

卸载：将 install => uninstall 即可

### 更新

以 react 为例

~~~bash
npm update react

npm update react@"1.1.2"
~~~

### 查看

~~~bash
npm ls 
# 查看当前的依赖目录

npm ls -g 
# 查看全局下安装的node package

npm ls react-dom 
# 查看当前react-dom的详情(安装目录+版本号)

npm info react 
# 查看当前react 的详细信息

editor
└── react@16.2.0 

react@16.6.3 | MIT | deps: 4 | versions: 171
React is a JavaScript library for building user interfaces.
https://reactjs.org/

keywords: react

dist
.tarball: https://registry.npmjs.org/react/-/react-16.6.3.tgz
.shasum: 25d77c91911d6bbdd23db41e70fb094cc1e0871c
.integrity: sha512-zCvmH2vbEolgKxtqXL2wmGCUxUyNheYn/C+PD1YAjfxHC54+MhdruyhO7QieQrYsYeTxrn93PM2y0jRH1zEExw==
.unpackedSize: 194.7 kB

dependencies:
loose-envify: ^1.1.0  prop-types: ^15.6.2   
object-assign: ^4.1.1 scheduler: ^0.11.2    

maintainers:
- acdlite <npm@andrewclark.io>
- brianvaughn <briandavidvaughn@gmail.com>
- fb <opensource+npm@fb.com>
- flarnie <flarnie.npm@gmail.com>
- gaearon <dan.abramov@gmail.com>
- sebmarkbage <sebastian@calyptus.eu>
- sophiebits <npm@sophiebits.com>
- trueadm <dg@domgan.com>

dist-tags:
canary: 0.0.0-ed4c4a51c          next: 16.7.0-alpha.2             
latest: 16.6.3                   unstable: 0.0.0-0c756fb-f7f79fd  

published a week ago by acdlite <npm@andrewclark.io>
~~~

### 搜索

~~~bash
npm search react
# 搜索包含 react 字段的包，返回的结果如下
~~~

~~~bash
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
react                     | React is a…          | =acdlite…       | 2018-11-13 | 16.6.3   | react   
babel-preset-react        | Babel preset for…    | =hzoo…          | 2017-04-07 | 6.24.1   | 
react-router-dom          | DOM bindings for…    | =mjackson…      | 2018-06-06 | 4.3.1    | react router route routing history link
react-router              | Declarative routing… | =mjackson…      | 2018-06-06 | 4.3.1    | react router route routing history link
react-dev-utils           | Webpack utilities…   | =fb =gaearon…   | 2018-11-01 | 6.1.1    | 
react-redux               | Official React…      | =gaearon…       | 2018-11-10 | 5.1.1    | react reactjs hot reload hmr live edit flux redu
react-error-overlay       | An overlay for…      | =fb =gaearon…   | 2018-11-01 | 5.1.0    | overlay syntax error red box redbox crash warnin 
~~~

### 发布

~~~bash
npm publish
# 将当前仓库发布到官网上去(需要在package.json 中改进版本号到下一个)
~~~



## 2、NPM配置

npm 在内网中的配置：npm config 主要是增删改查，下面以代理服务器 proxy 进行分析。这部分功能目前使用不多。

### 设置proxy

内网使用npm很头痛的一个问题就是代理，假设我们的代理是 [http://proxy.example.com:8080](http://proxy.example.com:8080%EF%BC%8C%E9%82%A3%E4%B9%88%E5%91%BD%E4%BB%A4%E5%A6%82%E4%B8%8B%EF%BC%9A/)，那么命令如下：

```bash
npm config set proxy http://proxy.example.com:8080
```

由于`npm config set`命令比较常用，于是可以如下简写

```bash
npm set proxy http://proxy.example.com:8080    
```

### 查看proxy

设置完，我们查看下当前代理设置

```
npm config get proxy
```

输出如下：

```
http://proxy.example.com:8080/
```

同样可如下简写：

```
npm get proxy
```

### 删除proxy

代理不需要用到了，那删了吧

```
npm delete proxy
```

### 查看所有配置

```
npm config list
```

### 直接修改配置文件

有时候觉得一条配置一条配置地修改有些麻烦，就直接进配置文件修改了

```
npm config edit
```

## 3、package.json字段简介

1. name: package的名字（由于他会成为url的一部分，所以 non-url-safe 的字母不会通过，也不允许出现"."、"_"），最好先在[http://registry.npmjs.org/上搜下你取的名字是否已经存在](http://registry.npmjs.org/%E4%B8%8A%E6%90%9C%E4%B8%8B%E4%BD%A0%E5%8F%96%E7%9A%84%E5%90%8D%E5%AD%97%E6%98%AF%E5%90%A6%E5%B7%B2%E7%BB%8F%E5%AD%98%E5%9C%A8)
2. version: package的版本，当package发生变化时，version也应该跟着一起变化，同时，你声明的版本需要通过semver的校验（semver可自行谷歌）
3. dependencies: package的应用依赖模块，即别人要使用这个package，至少需要安装哪些东东。应用依赖模块会安装到当前模块的node_modules目录下。例如运行时需要的 react vue bootstrap.
4. devDependencies：package的开发依赖模块，即别人要在这个package上进行开发。例如 webpack

## 4、版本号

a、"~1.2.3" 

```
"~1.2.3" = ">=1.2.3 <1.3.0"
```

```
"~1.2" = ">=1.2.0 <1.3.0"
```

```
"~1" = ">=1.0.0 <1.1.0"
```

b、"1.x.x"

```
"1.2.x" = ">=1.2.0 <1.3.0"
```

```
"1.x.x" = ">=1.0.0 <2.0.0"
```

```
"1.2" = "1.2.x"
"1.x" = "1.x.x"
"1" = "1.x.x"
```
## 5、npm 升级

~~~bash
npm install npm@latest -g
~~~

通常情况下 npm 会和 nodeJS 同时安装。默认的安装版本是5。有些情况需要手动更新 npm 版本。

> Since npm and node.js products are managed by different entities, updates and maintenance can become complex. Also, the Node.js installation process installs npm in a directory that only has local permissions. This can cause permissions errors when you attempt to run packages globally.

> To solve both these issues, many developers opt to use a node version manager, or nvm, to install npm. The version manager will avoid permissions errors, and will solve the complexities of updating Node.js and npm.

> In addition, developers can use an nvm to test their applications on multiple versions of npm. The nvm enables you to easily switch npm as well as node versions. This makes it easier to ensure that your applications work for most users, even if they are using other versions of npm. If you decide to install a version manager, use the instructions for the version manager you select to learn how to switch versions, and to learn how to keep up-to-date with the latest version of npm.

参考自 npm 官方文档：npm的出现，不需要考虑版本问题，让