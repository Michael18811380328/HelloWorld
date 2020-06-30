# 传智播客 React 入门 三天课程

## 第一天 理论和配置

### 虚拟DOM和DIFF算法

React 的核心是虚拟DOM和DIFF算法。DIFF 算法确保虚拟DOM高效运行（从上到下分别是 tree-diff、componentDiff elementDiff）。如果虚拟树前后对比相同，那么保留这个节点；如果不同，那么使用新的节点取代旧的节点。（内部具体使用深度优先还是广度优先不确定）。虚拟DOM不是HTML，而是使用JS模拟出来的一个 DOM 结构关系（是JS）。

虚拟DOM的目的：实现界面中真实DOM的高效更新

### webpack 配置

- 运行 npm init -y 初始化项目
- mkdir src && mkdir dist && cd src && touch index.html && cd ../
- npm install webpack webpack-cli -D
- 默认的打包入口是 ./src/index.js 出口是 ./dist/main.js

webpack.config.js : 因为 webpack 在 Node 环境中运行，所以可以使用 Node 的API

所以 `export default {}` 这个语法现在不支持 `module.exports = {}` 这个语法支持

~~~js
module.exports = {
  mode: 'development', // production
  // 在 webpack 4.x 版本中，默认的入口文件是 ./src/index.js
};
~~~

webpack 3.X 版本中，这一个包提供了命令行工具

webpack 4.X 版本中，webpack 提供核心打包功能， webpack-cli 提供命令行工具，所以需要装这两个包

npm run dev 实际上使用 webpack 命令和对应的配置进行打包

在 dtable 项目中，webpack 不能直接打包

首先需要使用 babel 将 JSX 转换成 JS，然后再进行 webpack 打包

~~~json
"scripts": {
  "start": "export DEBUG=dtable* && node scripts/start.js",
  "build": "node scripts/build.js",
  "pub:esm": "npm run clean:esm && export BABEL_ENV=production && ./node_modules/.bin/babel src --out-dir es --copy-files",
  "pub:lib": "npm run clean:lib && export BABEL_ENV=node && ./node_modules/.bin/babel src --out-dir lib --copy-files",
  "pub:umd": "npm run clean:dist && export BABEL_ENV=production && webpack --config ./config/webpack.config.pub.js",
  "prepublishOnly": "npm run pub:lib && npm run pub:esm && npm run pub:umd"
}
~~~

### 10 Node 和 Chrome 的关系

mode: 开发环境还是生产环境（去掉空格注释，压缩代码，减小体积），必选项

export import 是 ES6 的，在 node 环境中不能支持。所以 export default { } 不能执行。Node 是浏览器中拿出来的（V8引擎），所以谷歌浏览器支持的代码，Node 就能执行。

### 11 webpack-dev-server

webpack 内置的服务器，会把JS代码更改过后，自动打包并运行在内置服务上

'dev': 'webpack-dev-server'

Project is runnint at http://localhost:8080 项目运行在对应的域名和端口

webpack output is served from / 说明输出文件在根目录中（main.js），打包好的 main.js 托管到内存中，所以在项目目录中看不到这个文件。

Webpack-dev-server --open --port 3000 --hot --progress --compress

### 12 html-webpack-plugin

webpack 打包 HTML 的工具，作为一个插件放在 webpack 配置文件中

~~~js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置源文件的路径，和生成首页的名称和路径
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
});

module.exports = {
  mode: 'development',
  plugins: [
    htmlPlugin,
  ]
};
~~~

### 13 ReactDOM

npm install react react-dom --save

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
~~~

ReactDOM的作用是操作DOM（并把render后的节点渲染到界面上）


### 15 JSX语法和Babel配置

Babel 不是必须配置的；因为 react 中使用了JSX，浏览器不能直接识别，所以需要使用 babel 进行转换。

如果不使用JSX，比如下面的例子，也可以直接运行

~~~js
import React from 'react';
import ReactDOM from 'react-dom';

const mydom = React.createElement('div', {id: 'wrapper', title: 'layer'}, 'test');
ReactDOM.render(mydom, document.getElementById('app'));
~~~

JSX =  JS + XML 所以语法规则比 HTML 严格

使用 JSX 可以后可以简化代码，首先需要安装依赖

~~~bash
npm install babel-core babel-loader babel-plugin-transform-runtime -D
npm install babel-preset-env babel-preset-stage-0 babel-preset-react -D
~~~

增加配置文件（preset 预处理，plugin 插件）对应上面的安装依赖


~~~.babelrc
{
	"presets": ["env", "stage-0", "react"],
	"plugins": ["transform-runtime"]
}
~~~

之后在 webpack 中设置规则，对 JS 代码使用 babel 处理

~~~js
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
});

module.exports = {
  mode: 'development', //production
  plugins: [
    htmlPlugin
  ],
  // 要打包的第三方模块（不同类型的文件使用不同的loader处理）
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
~~~

## 第二天 基本使用

可以使用函数的形式创建组件

- 循环渲染中增加 key
- JSX 语法注意：注释 for class Fragment 
- 创建组件 props 传递数据 state 状态 属性
- 扩展运算符处理多个数据
- 组件可以单独抽离成一个 jsx 文件。注意，如果不做配置，不能在 import 时省略 jsx 的文件后缀名

~~~html
<div id="app">
  <input v-modal="uname" />
  <button @click="add"></button>
  <ul>
    <li v-for="item in list" :key="item.id">
      {(item.id)} + {(item.name)}
    </li>
  </ul>
</div>

<script>
  const vm = new Vue({
    el: '#app',
    data: {
      list: [
        {id: 0, name: 'Mike'},
        {id: 1, name: 'Amy'},
        {id: 2, name: 'Tony'}
      ]
    },
    methods: {
      add() {
        var newuser = {
          id: this.list.length,
          name: this.uname
        };
        this.list.push(newuser);
      }
    }
  })
</script>
~~~

- 如何设置导入文件省略后缀名？设置 webpack.config.js 中并在输出配置中增加（JSON 和 JS 默认支持省略文件后缀，JSX 需要增加；注意，这几个是有顺序的，首先匹配第一个JS）

  ~~~js
  module.exports = {
    ..
    resolve: {
  		extensions: ['js', 'jsx', 'json'],
    }
  };
  ~~~

- 配置 webpack 设置项目根目录：我们引入一个包时，可以使用相对路径。当相对路径很复杂时，或者某个组件的路径更改时，那么相对路径都需要更改。所以我们可以增加一个根路径，这样改变组件的位置，不会影响内部的引用。需要在 webpack.config.js 中增加下面配置，这样 @ 就表示 src 下面的根目录

  ~~~js
  import path from 'path;'
  
  module.exports = {
    ..
    resolve: {
    	extensions: ['js', 'jsx', 'json'],	
      alias: {
        "@": path.join(__dirname, './src')
      }
    }
  };
  ~~~

  ~~~js
  import Utils from '@/utils';
  ~~~

可以使用 class 创建组件：设置实例属性，设置 static 静态属性；

实例属性需要访问类的实例；静态属性直接通过类即可访问。同时有实例方法和静态方法，使用方法和上面类似.

~~~js
class Animal {
  constructor(name, age) {
    this.name = name; 
    this.age = age;
  }
  
  static gender = 'male';

	say() {
    // 
  }

	static tall() {
    // 
  }
}
~~~

class 实际上和构造函数创建实例的原理是一样的，是一个语法糖，并不是完全颠覆性的推翻了ES5的方法。

class 不同的地方：继承: class Child extends Father {}

子类继承自父类，那么子类可以访问父类上面的方法；super() 是父类的构造器，子类在构造器中必须调用父类的构造器，这样才能实际上属性。

使用构造函数创建的组件成为无状态组件，不含有state，不含有生命周期函数；使用class创建的组件是有状态组件。根据实际需求使用这两个组件（现在优先使用有状态组件）；React官网说，无状态组件没有state和生命周期函数，所以运行的状态比有状态组件效率稍微高一点。如果确定这个组件是叶节点单向数据流，那么可以确定使用无状态组件。如果不确定，后期可能变成有状态，那么就使用有状态组件。

## 第三天 生命周期函数

### 1 行内样式

React的行内样式需要注意：是一个map，使用驼峰命名法设置样式属性；

### 2 外部样式

webpack 无法直接打包样式，所以需要使用对应的 loader 处理外部样式（loader 从右向左加载）

~~~bash
npm install style-loader css-loader -D
~~~

webpack.config.js

~~~js
module.exports = {
  mode,
  plugins,
  module: {
    rules: [
      {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader']},
    ]
  },
  resolve,
};
~~~

### 3 外部样式表作用域问题

对于 JS 文件，具有作用域，可以通过模块 export import 进行导入导出；CSS 没有模块的定义，所以无法通过 import 执行导入，通过 webpack 打包后的 css 会影响全局的样式；在 Vue 中，如果样式表冲突，那么使用 `<style scoped></style>` 指令加上对应的前缀；但是在 react 中，没有指令这个概念。

### 4 css 模块化处理样式冲突

针对 3 的问题，react 可以使用 CSS 模块化，类似 JS 的导入导出，把CSS文件作为一个对象导入到指定的文件中，不会产生全局影响。

首先设置 webpack，在 loader 上面加上参数（其他loader不支持），普通的样式表启用模块化

~~~js
{test: /\.css$/, use: ['style-loader', 'css-loader?modules']}
~~~

然后写 CSS 文件（支持类名选择器和ID选择器，不支持标签选择器）

~~~css
.title {
  color: red;
}
.article {
  margin: 10px;
}
#wrapper {
  margin: 0px;
}
~~~

然后在特定的模块中引入并使用样式

~~~jsx
import React from 'react';
import cssObj from '../css/test.css';

export default function Comment(props) {
  return (
    <div id={cssObj.wraopper}>
      <h1 className={cssObj.title}></h1>
      <p className={cssObj.article}></p>
    </div>
  );
}
~~~

这样单独的CSS文件可以模块化，并作用在指定的模块上面。原理就是：把原来的CSS类名，转换成webpack加工后的类名，然后不会造成类名冲突。

### 5 modules 配置的扩展

在 css-loader 中已经配置 modules 的情况下，可以增加 localIndentName 自定义生成类名的名称和格式，示例如下

~~~js
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader?modules&localIndentName=[path][name]-[local]-[hash:5]']
}
~~~

这样生成的类名，就是 文件路径+文件名+原始类名+哈希值（5表示哈希值长度）

### 6 全局类名和局部类名

使用 :local(className)  :global(className) 可以把当前类名转换成全局类名。默认是 local (所以这个实际中不使用， className={cssObj.类名} 可以使用)；全局类名会使用后面的写法。

~~~css
.title {
  color: red;
}
:local(.title) {
  color: red;
}
/* 前两种写法等价 */
:global(.wrapper) {
  color: #fff;
}
/* 最后的类名是全局生效的 */
~~~

### 7 scss less 处理

如果引用某个包的时候，这个包已经安装到了 node_modules 目录中，那么不需要写 node?modules 路径，项目会自动搜索这个目录，直接写项目名称即可。

如果使用第三方库或者插入图片，对于字体图标文件或者图片文件，需要配置 webpack

~~~js
{ test: /\.ttf|woff|woff2|eot|svg$/, use: ['url-loader'] },
{ test: /\.jpg|png|jpeg|gif$/, use: ['url-loader'] },
{ test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
~~~

对于第三方样式表，我们可以不使用 modules 模块化导入对象，直接使用类名即可。第三方样式表通常是css文件（ant-mobile 是 less 按需加载，这个需要注意）。在较简单的项目中，第三方库css文件使用 modules 模块化处理，自己的样式使用 less or sass 语法，然后模块化导入处理。

需要安装对应的 loader 

npm install sass-loader node-sass file-loader -D

### 8 事件处理

使用最多的事件处理：在JSX中写一个箭头函数，对应的函数也是箭头函数

~~~jsx
<button onClick={(e) => this.onClick(e)} ></button>

onClick = (e) => {
  console.log(e);
}
~~~

### 09 setState

设置状态，只更改一部分值，不会全部更改状态，这是异步操作

小提示：在 VSCODE 中，两个代码间增加 //#region //#endregion 这两个部分之间的代码可以被直接折叠。（默认函数可以折叠）这个可以折叠任何想要折叠的部分。

获取文本框的值，然后改变状态，然后改变文本框的值。

生命周期函数：注意 React 和 VUE 的对比；不同生命周期函数需要处理的内容不同