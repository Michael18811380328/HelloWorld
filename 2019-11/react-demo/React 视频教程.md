## React 视频教程

[https://jspang.com/posts/2019/05/04/new-react-base.html#%E7%AC%AC01%E8%8A%82%EF%BC%9Areact%E8%AF%BE%E7%A8%8B%E5%89%8D%E8%A8%80](https://jspang.com/posts/2019/05/04/new-react-base.html#第01节：react课程前言)

最新的React16.8版本

重在查漏补缺

### 第一节 React补充介绍

最新的版本16.8 

函数式编程（组件化）

最好看React官方文档

VScode

### 第二节 和VUE对比

React 适合大型团队开发（组件化很多人参与）Vue插件框架丰富，简单快速；

### 第三节 搭建环境

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

这样安装后，npm start 可以直接看到界面，不需要手动安装 webpack. 如果手动安装后，执行 npm start 就会报错。



### 第四节 文件介绍

Package-lock.json 第三方包版本控制（确保不同人使用时，安装同样的第三方依赖）

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

Index.js

PWA 移动端网页：首次加载可以显示界面，然后第二次如果没有网络也可以显示网页（类似于缓冲文件，离线浏览的功能）。

### 第五节 组件管理

首先删除src全部文件

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

### 第六节 JSX

~~~jsx
import React, { Component, Fragment } from 'react';
return (
  <div className="top-bar">
    <div>test123</div>
  </div>
);
// 相当于下面的
let child1 = React.createElement('div', null, 'test123');
let parent = Reacr.createElement('div', { className: 'top-bar' }, child1);
// 第一个表示创建的标签，第二个是类名，第三个是内部的节点
// 直接使用JSX就可以代替上面的写法(这是JSX的本质，使用JS创建HTML)
~~~

### 第07节 React实例
