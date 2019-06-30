# package

webpack babel package.json 配置

## package.json

### 1、创建 package.json

~~~bash 
npm init
~~~

### 2、设置包

Name: 包名称（和文件名命名规则相同）

version：版本号

script: 运行 npm 命令的缩写

~~~json
"script": {
  "dev": "",
  "dist": "",
  "pub": "npm run dist",
  "start": "cross-env NODE_ENV=development node ./tools/script.js",
  "test": "node ./test",
  "test": "jest --env=node --colors --coverage"
}
~~~

在一个字段中可以运行另一个字段

bin: 用于存放内部命令对应的可执行文件的位置。如果一部分包是全局设置，那么需要找到全局的文件位置。

~~~json
"bin": {
  "myCommand": "./bin/index.js"
}
~~~

myCommand 对应着可执行文件是./bin/index.js。

安装包时，会在node_modules/.bin 下面建立链接。

bin字段在当前seafile项目中使用不是很多



Main: 指定入口文件，默认是根目录下的index.js

~~~bash
  "main": "dist/editor/seafile-editor.js"
~~~

入口文件设置成 seafile-editor



config 设置环境变量

~~~json
"config": {
  "port": "8080"
}
~~~

~~~js
// index.js
http.createServer(...).listen(process.env.npm_package_config_port)
~~~

dependencies 项目运行依赖的包（run）

devDependencies 项目开发依赖的包（build）



### 3、其他信息

keywords

homepage

Bugs: report bugs emails

license

author

constributors

repositors

Type "git"

"private": true,

常见的package.json内容就是这些



## webpack

常见的webpack配置

~~~json
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.join(__dirname, './src/pages/Main/index'),
        article: path.join(__dirname, './src/pages/Article/index')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './index.html'),
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'article.html',
            template: path.join(__dirname, './index.html'),
            chunks: ['article']
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
    }
}

~~~

webpack 配置较复杂

#### 入口函数 entry

webpack 应该使用什么模块；进入入口起点后，webpack 会找出依赖的模块或者库。通常使用对象写法配置 entry。

~~~json
entry: {
  main: path.join(_dirname, './src/pages/main/index'),
  article: path.join(_dirname, './src/pages/hello/index')
} 
~~~

#### 出口函数 output

告诉 webpack 输出包的位置（bundles）以及输出文件的命名；默认路径是 ./dist 。这里表示在 ./dist 下生成 main.min.js.

~~~js
output: {
  path: path.join(_dirname, './dist'),
  filename: '[name].min.js'
}
~~~

#### 模块 module

webpack 通过loader支持各种语言和预处理器的编写模块。配置loader来支持其他文件（例如css/image，支持 jsx或者 vue文件）。

使用 react jsx babel less 等需要配置不同的插件。

例如 ES6 babel 

Babel-preset-react 对应react中的ES6

babel 在不同浏览器支持不同，需要转义， babel-preset-react

~~~bash
npm install babel-preset-env babel-preset-react --save-dev
~~~

~~~json
{
  "presents": ['env', 'react']
}
~~~

#### 插件 plugins

插件是webpack的核心功能，可以设置各种高级配置。

Html-webpack-plugin 插件：在 webpack构建中，在对应的目录下生成 html 文件，可以正确的引入 webpack 生成的文件。

#### 外部扩展 externals 

React  react-dom 这部分内容不需要包含在项目中。
