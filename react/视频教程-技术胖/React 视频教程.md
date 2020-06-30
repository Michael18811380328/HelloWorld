# React 16入门教程

技术胖，讲的一般， React16.8版本

[https://jspang.com/posts/2019/05/04/new-react-base.html#%E7%AC%AC01%E8%8A%82%EF%BC%9Areact%E8%AF%BE%E7%A8%8B%E5%89%8D%E8%A8%80](https://jspang.com/posts/2019/05/04/new-react-base.html#第01节：react课程前言)

## 基础

### React介绍

函数式编程（组件化）

React官方文档

VScode

React 适合大型团队开发（组件化很多人参与）Vue插件框架丰富，简单快速；

### 搭建环境

这里的构建工具使用React的官方构建工具（其他的构建工具也可以）使用淘宝源更快

常用的构建工具是webpack gulp 

~~~bash
mkdir demo
cd demo
npm install create-react-app -g
create-react-app demo01
# 这里始终装不上（显示网络原因）
cd demo01
npm start
~~~

注意

~~~txt
create-react-app 执行慢的解决方法：
在使用 create-react-app my-app 来创建一个新的React应用，在拉取各种资源时,往往会非常慢,一直卡在那：

fetchMetadata: sill mapToRegistry uri http://registry.npmjs.org/whatwg-fetch
可以看到资源还是使用了 npmjs.org，解决方法是换成淘宝的资源：

$ npm config set registry https://registry.npm.taobao.org
https://registry.npmjs.org/
-- 配置后可通过下面方式来验证是否成功
$ npm config get registry
-- 或 npm info express

默认的是
npm config set registry https://registry.npmjs.org/
~~~

注意二

这样安装后，npm start 可以直接看到界面，不需要手动安装 webpack. 

如果手动安装 webpack 后，执行 npm start 就会报错(create-react-app 和 webpack 冲突)



### 文件路径介绍

Package-lock.json 第三方包版本控制（确保不同人编辑代码，安装同样的第三方依赖）

index.html

noscript 容错代码：如果界面没有成功运行（nodeJS）显示下面的代码；wrapper 下面是插入的节点(dtable)

~~~html
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
<div id="wrapper"></div>
<div id="modal-wrapper"></div>
~~~

移动端网页配置 manifest.json 这里保持默认即可

~~~json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
~~~

PWA 移动端网页：首次加载可以显示界面，然后第二次如果没有网络也可以显示网页（类似于缓冲文件，离线浏览的功能）。

### 组件管理

入口文件 index.js

~~~jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('wrapper'));
~~~

App.js

~~~jsx
import React, { Component, Fragment } from 'react';
class App extends Component{
  render() {
    return (<span></span>);
  }
}
export default APP;
~~~

### JSX

~~~jsx
import React, { Component, Fragment } from 'react';
return (
  <div className="top-bar">
    <div>test123</div>
  </div>
);

// 相当于下面的
let child1 = React.createElement('div', null, 'test123');
let parent = React.createElement('div', { className: 'top-bar' }, child1);
// 第一个表示创建的标签，第二个是类名，第三个是内部的节点
// 直接使用JSX就可以代替上面的写法(这是JSX的本质，使用JS创建HTML)
~~~

JSX 中

注释 {/*  */}

className htmlFor

DangersoulySetInnerHTML 可以直接把属性当做内部代码显示。但是这样用户输入可能造成攻击。

dangerouslySetInnerHTML:{{ --html--: value}}

label for="id" 然后设置内部input ID 属性，点击外部的label，内部输入框就被激活（focus）

### 创建实例

创建一个简单的组件：一个表单和列表组件，Fragment 可以减少不必要的DIV，同时便于flex布局

state 数据驱动 事件绑定（bind(this)）setState()

使用扩展用算符操作数据

数组进行渲染时，key 最好不要直接使用 index，最好加一个其他变量。界面中可能很多key，为了避免重复，所以使用加一个字符的方法。

~~~js
this.setState({
  list: [...this.state.list, mewList]
});
~~~

不能直接改变this.state.value，React 官网明确不允许（直接改变state可以实现界面效果，后期优化会产生性能问题）；可以先声明变量，然后把state赋值，操作变量。



### VScode插件

Simple React Snippets

介绍插件：快捷键

Imr import React from 'react';

cc class XX extends Component

### 测试工具

React developer tools chrome扩展程序

可以直接看到组件的数据流，不需要console

### shouldComponentUpdate

这时候你在浏览器的文本框中输入一下内容，你可以清楚的看到子组件也发生了重新`render`的情况。

有很多程序员会忽略这样的性能损耗，认为没有什么大不了的，但是软件的卡顿是一点点产生的，所以必须要减少性能损耗。

shouldComponentUpdate有两个参数：

- nextProps:变化后的属性;
- nextState:变化后的状态;

这里主要优化性能，避免频繁渲染

组件优化（项目经验丰富）；

### axios

数据请求

ajax 是原生的写法；react 中使用 axios（ajax封装后的库）

~~~bash
npm install axios --save

# --save --save-dev 的区别
- 不加save不加dev，这样不会改变package.json内容，一般不用
-dev 开发环境使用（例如jest测试，react开发）
--save 生产环境使用（用户不需要使用jest测试，用户不需要react开发，用户需要axios, react-strap 组件库）
~~~

### EasyMock

模拟接口：使用抓包；或者网络模拟（后端没写好，所以模拟）

easy-mock.com在线模拟，可能网站会挂掉

### 动画

react-transition-group

react 推荐的第三方动画库

可以实现基本的显示隐藏效果，不需要直接操作CSS
