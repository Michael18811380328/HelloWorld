## webpack

### 1、菜鸟教程

#### 入门

http://www.runoob.com/w3cnote/webpack-tutorial.html

webpack 作用：将多个静态资源转化成一个静态文件。将多个less/css转化成一个css文件，减少页面的请求。

安装(可以全局安装)可以单文件安装

~~~bash
sudo npm install webpack -g
sudo npm install webpack-cli -g
~~~

注意：在webpack3 版本(3.8.1)中 webpack-cli 在 webpack 内部。在 webpack 4版本中，这两个包分开存放。

目前，在全局下安装4.29.0 版本的webpack and webpack-cli



#### 测试一 简单JS

~~~bash
mkdir folder
cd folder
touch index.html
# write index.html and use src="./dist/main.min.js"

touch index.js
vim index.js (document.write("hello");)

npm init
~~~

在 package.json 中配置输入输出文件

~~~json
{
  "name": "test-webpack",
  "version": "1.0.0",
  "description": "learn-webpack",
  "main": "main.min.js",
  "mode": "development",
  "author": "Michael An",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.8.1",
    "webpack-cli": "^3.2.1"
  }
}
~~~

现在改成全局只安装 webpack 3.8.1

~~~bash
webpack index.js ./dist/index.min.js
~~~

入口文件是 index.js 输出文件是 ./dist/index.min.js 即可编译

下面是成功的信息

~~~js
Hash: 51b7993012df7526eade
Version: webpack 3.8.1
Time: 41ms
       Asset    Size  Chunks             Chunk Names
index.min.js  2.5 kB       0  [emitted]  main
   [0] ./index.js 30 bytes {0} [built]
~~~

#### 测试二 复杂JS

~~~js
// sum.js
module.exports('IT work');

// index.js
document.write(require('./sum.js'));
~~~

~~~bash
webapck ./test-2/index.js ./test-2/index.min.js
~~~

webpack 根据每一个模块的关系进行静态分析，给每一个模块一个唯一的ID，并通过这个id索引和访问模块。首先启动index.js 然后其他模块会在运行 require 的时候运行。

#### 测试三 loader

loader 目的：webpack只能处理JS代码，loader进行转换，可以处理 css and jsx 文件。

css文件需要 css-loader 和 style-loader。css-loader 会遍历css文件，然后找到URL() 表达式然后处理。style-loader 会把原来的CSS代码插入到页面中的 style 标签中。

~~~bash
npm install css-loader style-loader
~~~

~~~css
/* style.css */
body {
  background: skyblue;
}
~~~

~~~js
// index.js
require("!style-loader!css-loader!./style.css");
document.write('./sum.js');
~~~

~~~js
// sum.js
module.exports = "hello skyblue";
~~~

~~~bash
webpack index.js index.min.js
~~~

信息

~~~bash
Hash: e729b0347abc5817557e
Version: webpack 3.8.1
Time: 342ms
       Asset     Size  Chunks             Chunk Names
index.min.js  19.8 kB       0  [emitted]  main
   [0] ./test-3/index.js 78 bytes {0} [built]
   [1] ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./test-3/style.css 1.08 kB {0} [built]
   [2] ./node_modules/css-loader/dist/cjs.js!./test-3/style.css 174 bytes {0} [built]
    + 3 hidden modules
~~~

#### 测试4 配置文件

我们可以将编译的选项放在设置文件中，直接运行 webpack 即可编译。

~~~js
// webpack.config.js
module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "index.min.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader:"style-loader!css-loader" }
    ]
  }
};
~~~

#### 测试5 插件

配置 plugins 用于完成其他功能（文件头部输出一些注释信息）

使用内置插件需要

~~~bash
npm install webpack --save-dev
~~~

~~~js
// webpack.config.js

var webpack = require('webpack');

module.exports = {
  entry: '',
  output: {},
  module: {},
  plugins: [
    new webpack.BannerPlugin("hello test")
  ]
}
~~~



#### 测试6 开发环境

~~~bash
webpack --progress --colors --watch
~~~

编译输出内容具有进度和颜色（大项目）

watch表示监听模式。没有变化的模块会缓存到内存中，不需要每次重新编译。

Webpack-dev-server 开发服务，可以通过 localhost:8080 启动一个静态资源 express web 服务器，会以监听模式自动运行 webpack。可以打开浏览器中的 8080查看。并且通过一个 socker.io 服务实时监听项目变化，并自动刷新界面。

~~~bash
npm install webpack-dev-server -g
webpack-dev-server --progress --colors
~~~

现在提示 webpack-cli 没有安装



### 2、官方教程

https://www.webpackjs.com/concepts/

4.0.0 版本后可能不需要配置文件



