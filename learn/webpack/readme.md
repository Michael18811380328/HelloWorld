### webpack.config.js配置文件

**1、基本配置**

webpack在执行时，除在命令行传入参数，还可以通过指定的配置文件来执行。

默认会搜索当前目录下webpack.config.js。

这个文件是一个node.js模块，返回一个json格式的配置对象，或者通过--config选项来指定配置文件。

 ~~~js
//创建webpack.config.js

var webpack = require('webpack');

module.exports = {
  entry:'./entry.js', //入口文件
  output:{
    //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径 
    path:__dirname, //输出位置
    filename:'build.js' //输入文件
  },
  module:{
    loaders:[
      {
        test:/\.css$/,//支持正则
        loader:'style-loader!css-loader' 
      }
    ]
  },
  //其他解决方案配置
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.scss']//添加在此的后缀所对应的文件可以省略后缀
  },
  //插件
  plugins:[
    new webpack.BannerPlugin('This file is created by ly')
  ]
}

 ~~~

~~~html
//entry.js中引入css模块：
require('./style.css');
~~~


运行
~~~bash
webpack
~~~


**2、plugins 插件**

可以通过npm安装第三方插件，如：BannerPlugin的作用是给输出的文件头部添加注释信息。

 

**3、开发环境**

~~~bash
::编译输出内容带进度和颜色

webpack --progress --colors

 

::启动监听模式（没有变化的模块会在编译后缓存大内存中，不会每次都被重新编译）

webpack --watch

webpack -w

 

::使用开发服务（它将在localhost:8080启动一个express静态资源web服务器。并启动监听模式自动webpack，在浏览器打开http://localhost:8080/，就可以浏览项目页面，并通过一个socket.io服务实时监听变化并自动刷新页面）

npm install webpack-dev-server -g
~~~


**4、启动webpack-dev-server**

注意：在启动了webpack-dev-server后，编译后的文件并没有输出到webpack.config.js中配置的output输出目标文件夹中，而是将实时编译后的文件保存在内存中。

**例子：**


~~~js
//目录结构

myapp

    |__dist

    |   |__styles

    |   |__js

    |       |__bundle.js

    |   |__index.html

    |__src

    |   |__component

    |   |__index.js

    |__node_modules

    |__package.json

    |__webpack.config.js

 

//webpack.config.js

var webpack = require('webpack');

var path = require('path');

module.exports = {

    entry:'./src/index.js',

    output:{

        path:path.resolve(__dirname, './dist/'),

        filename:'build.js'

    },

    //设置开发者工具的端口号,不设置则默认为8080端口

    devServer: {

        inline: true,

        port: 8181

    },

    module:{

        loaders:[

            {

                test:/\.js?$/,

                exclude:/node_modules/,

                loader:'babel-loader',

                query:{

                    presets:['es2015','react']

                }

            },

            {

                test:/\.css$/,

                loader:'style-loader!css-loader'

            }

        ]

    }

};

 

//package.json

{

  "name": "myapp",

  "version": "1.0.0",

  "description": "",

  "main": "build.js",

  "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",

    "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist",

    "build": "webpack --progress --colors"

  },

  "author": "",

  "license": "ISC",

  "devDependencies": {

    "babel-core": "^6.23.1",

    "babel-loader": "^6.4.0",

    "babel-preset-es2015": "^6.22.0",

    "jsx-loader": "^0.13.2",

    "react": "^15.4.2",

    "react-dom": "^15.4.2",

    "webpack": "^2.2.1",

    "webpack-dev-server": "^2.4.1"

  },

  "dependencies": {

    "jquery": "^3.1.1"

  }

}
~~~

~~~html
<!--index.html-->

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>首页</title>

</head>

<body>

<div id="app"></div>

<script src="build.js"></script>

</body>

</html>
~~~

~~~bash
::安装所有依赖

npm install

::运行

npm run dev
~~~


最后在浏览器中打开：http://localhost:8181/index.html

 

**详解package.json中命令：**


~~~bash
webpack-dev-server   //启动webpack-dev-server

--progress --colors    //打包进行显示颜色

--hot  //开启模块热修复功能

--content-base ./dist   //设置webpack-dev-server运行的根目录是 ./dist

--inline  //使用inline的方式进行页面自动刷新

--quiet  //控制台中不输出打包信息

--compress  //开启gzip压缩
~~~


**webpack-dev-server支持两种自动刷新的方式：**

①Iframe mode

在网页中嵌套一个iframe，将自己的应用注入都这个iframe中，每次文件修改后都是这个iframe进行了reload

②inline mode

也是自动便也打包刷新

 

参考文献：
<http://www.tuicool.com/articles/BZrQ3mv>
<https://segmentfault.com/a/1190000006964335>