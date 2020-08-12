# React 框架学习笔记

## 知识结构

~~~txt
React
	1.特点: 状态驱动；虚拟DOM；DIFF算法，是react native的基础
	2.开发环境
		单文件引入：react.js、reactDOM.js、babel.js（处理JSX，不属于HTML<script type="text/babel"></script>）不同文件作用
		npm 环境：npm install react react-dom babel 或者grunt build grunt fasttest --filter=ReactIdentity
	3.渲染
		ReactDOM.render（模板，位置，回调函数）：位置：将模板渲染到文档规定位置；模板：HTML标签+{ 参数 }
	4.组件
		定义组件：createClass/JSX
		设置样式:选择器样式className="pStyle"/内联样式style={{width:20 }}/对象样式style={h1Style}
			与css的差别:1.JSX语法，逗号分割;2.不使用-，使用驼峰 backgroundColor;3.数字不带单位
		组件嵌套
			根组件和子组件:一个项目中只能有一个根组件,根组件内部嵌套多个子组件
		组件传值-props
			父传子
				语法糖...this.props 表示所有组件
				不能修改props的值
				子组件的props与父组件的属性一一对应（除去children）
				children:特殊：不是和组件的属性对应表示组件所有子节点，进行列表渲染.定义一个列表组件，列表的数量和外界传入的数据有关
			propTypes: 规定属性的默认数据类型
			getDefaultProps: 规定属性默认值,如果根组件不赋值，那么子组件按照默认的属性进行渲染
	5. 事件处理
		事件处理
			自定义函数 changeName = function(){}
			事件驱动 onClick= { this.changeName }
		state
			state是组件的属性，当state发生变化，会重新render/this.setState
		直接获取DOM：ref 操作数据变化
	6.生命周期
		Mounting:组件挂载:componentWillMount;componentDidMount
		Updating:组件更新
componentWillReceiveProps(object nextProps)
shouldComponentUpdate
componentWillUpdate 
componentDidUpdate
		Unmounting:组件移除:componentWillUnmount
			事件：ReactDOM.unmountComponentAtNode
~~~



## 项目结构

~~~txt
├── react-data-grid 网格数据
├── react-dnd 拖拽组件
│   ├── react-dnd-DragLayer 拖拽层
│   ├── react-dnd-DragSource 拖拽源
│   ├── react-dnd-DropTarget 拖拽目标
├── react-mentions @提醒
├── react-motion 动画效果
├── react-other-lib
│   ├── Create-React-App React CLI
│   ├── React Image Lightbox 预览图片
│   ├── React使用axios进行ajax操作 axios发出请求
│   ├── React快捷输入
│   ├── React点击事件改变DOM方法
│   ├── TS-React-Webpack
│   ├── gojs-react
│   ├── jsx语法
│   ├── react+graphql实现github dashboard
│   ├── react-axios
│   ├── react-lazy-load 懒加载
│   └── react-redux redux实现状态转换
├── react-response 响应式屏幕
├── react-router 路由
├── react-select 选择器组件
├── react-transition-group 动画过渡效果
├── reactstrap UI 组件库
├── res
├── slate-react Slate 富文本库
├── tic-tac-toe 官网案例
├── 中文文档
│   ├── 2-10 状态提升：把公共状态提升到父组件，状态驱动组件更新
│   ├── 2-11 组合 vs 继承：不同组件组合形成大组件，基本不会使用到继承（直接继承React.Component即可）
│   ├── 2-4 组件 & Props：父子组件传值的方式（减少不必要的性能）
│   ├── 2-5 State & 生命周期：生命周期函数内部处理不同的事件；不同state
│   ├── 2-6 事件处理：事件回调函数；事件监听；eventBus全局响应
│   ├── 2-7 条件渲染：三目运算符渲染部分组件
│   ├── 2-8 列表 & Keys：列表渲染需要加上key，提升性能
│   ├── 2-9 表单：label + Input Submit 如果是复杂的表单，需要对应多个状态，或者使用REF获取内容
├── 英文文档（没有看）
├── 高级文档
│   ├── React FAQ
│   ├── React PureComponent 使用指南：纯组件，内部已经实现了shouldComponentUpdate函数，注意简单数据和复杂对象的识别，主要使用在叶组件中，优化性能。
│   ├── React 的 PureComponent 与 Component（优化性能）
│   ├── React 各种bug 会实时更新
│   ├── React 高阶组件（一个组件中，参数是一个组件，返回值是一个组件，对原始组件进行封装处理）
│   ├── React 中的事件处理
│   ├── React-Design Principles：设计原理
│   ├── React-Hooks：useState useEffect：在函数组件中使用CLASS的方法和state
│   ├── React-Suspense的实现与探讨
│   ├── React-advanced-guides
│   ├── React-高阶API
│   ├── React.Component
│   ├── ReactChildren：父组件传递到子组件的部分，可以遍历渲染，可以判断个数等
│   ├── React事件：把原生事件封装后显示
│   ├── React数据流：自顶向下的数据流
│   ├── React获取尺寸：通过REF获取DOM元素，然后获取尺寸（注意是否能获取到REF元素）
│   ├── React新生命周期--getDerivedStateFromProps（componentWillReceiveProps的替代静态方法）
│   ├── Refs & DOM（获取DOM节点）
│   ├── getDerivedStateFromProps的使用
│   ├── react 中通过ref获取高阶（HOC）子组件实例的解决方案
│   ├── react 项目结构及编码规范
│   ├── reactjs源码分析-上篇（首次渲染实现原理）
│   └── reactjs源码分析-下篇（更新机制实现原理）：DIFF算法
└── 中文文档（关键）
  ├── 0 目录
  ├── 3-1 无障碍辅助功能：色彩搭配，盲人阅读器
  ├── 3-2 代码打包分割：webpack 设置多个入口文件，不同文件解析压缩不同
  ├── 3-3 Context
  ├── 3-4 错误边界：Error boundary 监测内部组件的报错信息，并显示错误提示界面
  ├── 3-5 Refs 转发：父组件获取子组件的DOM节点
  ├── 3-6 Fragments
  ├── 3-7 高阶组件：组件的参数是组件，返回值是封装好的另一个组件
  ├── 3-8 与第三方库协同：jquery
  ├── 3-9 深入 JSX：语法，展开符号
  ├── 3-10 Optimizing Performance：性能优化
  ├── 3-11 Portals
  ├── 3-12 Profiler API
  ├── 3-13 不使用 ES6
  ├── 3-14 不使用 JSX 的 React
  ├── 3-15 协调：DIFF 算法
  ├── 3-16 Refs and the DOM
  ├── 3-17 Render Props
  ├── 3-18 静态类型检查
  ├── 3-19 严格模式
  ├── 3-20 使用 PropTypes 进行类型检查
  ├── 3-21 非受控组件
  ├── 3-22 Web Components
  ├── 4-1 React 顶层 API
  ├── 4-2 React.Component
  ├── 4-3 ReactDOM
  ├── 4-4 ReactDOMServer
  ├── 4-5 DOM 元素
  ├── 4-6 合成事件
  ├── 4-7 Test Utilities
  ├── 4-8 Test Renderer
  ├── 4-9 JavaScript 环境要求
  ├── 4-10 React 术语词汇表
  ├── 5-1 Hook 简介
  ├── 5-2 Hook 概览
  ├── 5-3 使用 State Hook
  ├── 5-4 使用 Effect Hook
  ├── 5-5 Hook 规则
  ├── 5-6 自定义 Hook
  ├── 5-7 Hook API 索引
  ├── 5-8 Hooks FAQ
  ├── 6-1 测试概览
  ├── 6-2 测试技巧
  ├── 6-3 测试环境
  ├── 7-1 AJAX and APIs
  ├── 7-2 Babel，JSX 及构建过程
  ├── 7-3 传递函数给组件
  ├── 7-4 组件状态
  ├── 7-5 样式与 CSS
  ├── 7-6 项目文件结构
  ├── 7-7 Virtual DOM 及内核
~~~

## 博客文档

[React ref is null 错误解决](https://blog.csdn.net/weixin_41697143/article/details/107618019)
React ref.current is null
React 中通常使用 state 状态驱动，对于 DOM 尺寸和界面动画等，通常使用 Ref 获取对应的节点并操作。
最近遇到一个问题，REF 已经绑定，但是是 NULL，获取不到对应的 DOM 元素，查了资料，具体如下。
问题描述
国外的网友也遇到类似的问题：
I’m working on an agenda/calendar app with a variable time range. To display a line for the curre


[Ant design mobile Actionsheet 组件的思考和改进](https://blog.csdn.net/weixin_41697143/article/details/104669017)
使用蚂蚁金服的 ant-design UI 组件库的移动端组件时，最近遇到一个问题。具体需要怎样解决呢？

[React 的 PureComponent 与 Component 区别](https://blog.csdn.net/weixin_41697143/article/details/104551377)
1、官方文档解释
在 React 中，Component 和 PureComponent 有一些区别，官方的解释如下：

React.Component is the base class for React components when they are defined using ES6 classes:

[Vue和React中生命周期和钩子函数](https://blog.csdn.net/weixin_41697143/article/details/80978695)
在Vue中，生命周期和钩子函数是两个重要的概念。

通常在开发过程中，不了解这两个概念也可以完成基本的开发任务。

学习生命周期有两个目的：解决问题bug，对其他功能的完善和分析（时间节点）。
在Vue实例对象创建并完成Dom渲染过程中，不同时期会生成不同的事件，对应着不同的方法和回调函数。

以下是八个具体的过程：beforeCreate/created/beforeMount/mounted/...

[package.json scripts 脚本使用指南](https://blog.csdn.net/weixin_41697143/article/details/104029573)
package.json scripts 脚本使用指南
Node 开发离不开 npm，而脚本功能是 npm 最强大、最常用的功能之一。本文介绍如何使用 npm 脚本（npm scripts）。
一、package.json scripts 脚本是什么
npm 允许在package.json文件里面，使用scripts字段定义脚本命令。



[JS 判断元素父子关系](https://blog.csdn.net/weixin_41697143/article/details/103631213)

在工作中遇到一个问题：如果界面元素很多，如何判断当前点击的元素，和某个元素是否有父子关系？

下面这个截图中，可以看到有20个DIV在嵌套。如果界面发生一个点击事件，在document 监听到这个点击事件，怎样判断点击位于哪个父元素下面（PS 这个HTML代码写的语义不明确，层级很复杂）
查找资料后，有下面几个解决方案
原生 JS
原生JS中可以使用 dom.contains(dom) 来判断是否...

[Create React App 自动创建 SPA 项目](https://blog.csdn.net/weixin_41697143/article/details/103215620)

Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.
Create React App 是官方推荐的创建SPA的库。不需要任何的配置，直接完成创建打包。项目中直接把s...

[fetchMetadata: sill mapToRegistry 报错 create-react-app 执行慢的解决方法](https://blog.csdn.net/weixin_41697143/article/details/102885261)

使用 create-react-app 库进行 React 项目初始化时，有时候会显示网络问题造成无法安装。

更换网络，关闭代理后，执行create-react-app + 项目名称，仍然无效。

问题原因：执行 create-react-app 会安装相关依赖（react react-dom react-scripts 等）。如果是默认的配置，那么使用国外的 npm 源进行安装。

解决方案...

[React 与 VUE 数据传输对比](https://blog.csdn.net/weixin_41697143/article/details/102806849)

我们熟悉的 VUE 可以方便的实现父子组件的传值。刚开始接触 React，传值有一定疑惑，需要注意父子组件的传值，关键是理解 React 的状态驱动，以及子组件向父组件传值的三种方式。
父组件传递给子组件
概述：React中主要使用组件进行数据传输，组件的数据存储在props和state中，进行自上而下单向数据传递。
props
React核心思想：组件化，页面被切成一个个可以复用的独立的组件。每...

[React data grid](https://blog.csdn.net/weixin_41697143/article/details/89556630)

React data grid
主要功能：界面显示 Excel 预览，可以将一个对象或者 json 格式化成为界面。
安装
npm install react-data-grid --save

基本使用
import React from 'react';
import ReactDataGrid from 'react-data-grid';

[Warning: A component is changing an uncontrolled input of type text to be controlled 报错分析](https://blog.csdn.net/weixin_41697143/article/details/89374791)

Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa).

在 React 框架中会报这样的错误，界面效果如下：

[Slate 框架更新-删除文本节点的 leaves 属性](https://blog.csdn.net/weixin_41697143/article/details/89785596)

近期 slate 框架更新了，新版本中文本节点的属性发生变化，其他方法等也有调整。编辑器中设置文字加粗、斜体等字体类型或者链接等会变化。下面简要整理总结一下。
text 节点属性改变
With the pull request, text nodes no longer have a .leaves property. Instead, each text node has a unique se...

[报错 Preset files are not allowed to export objects 处理](https://blog.csdn.net/weixin_41697143/article/details/91491250)

在使用 webpack 和 babel 编译 react项目时，会报 Preset files are not allowed to export objects 错误。查阅资料，主要是不同版本的 babel 不能兼容使用(版本6和版本7不兼容)。

在高级版本中(&gt;7)这样配置

package.json

"@babel/core": "^7.0.0-beta.40",
"@babel...

[超级实用前端知识点和面试题](https://blog.csdn.net/weixin_41697143/article/details/93978991)

这是搜集网上的多个前端经典知识点，不断更细中。虽然忙着每天的工作，但是基础知识要熟练掌握不断温习。
CSS

CSS 常见布局方式
【整理】CSS布局方案
CSS查漏补缺
[布局概念] 关于CSS-BFC深入理解
[译]这些 CSS 命名规范将省下你大把调试时间
CSS知识总结
前端开发规范：命名规范、html规范、css规范、js规范

HTTP

HTTP状态码（HTTP Status Cod...

[React-mentions 基本使用](https://blog.csdn.net/weixin_41697143/article/details/96875130)

最近需要做一个类似微博评论功能@用户的功能，手写JS的效率很低，所以使用 React-mentions 库实现这个功能。看了一下网上没中文介绍，所以自己看完英文介绍简单总结一个中文介绍。

使用
1、安装
npm 安装
npm install react-mentions --save

yarn 安装
yarn add react-mentions

2、导入
The package expor...

[React中使用LocalStorage用户登录](https://blog.csdn.net/weixin_41697143/article/details/98479748)

localStorage 通常用来存储服务器发送的一些数据或者用户自定义数据。localStorage 中的键值对总是以字符串的形式存储。 (意味着数值类型会自动转化为字符串类型)。
与 cookie 相比，localStorage 的存储量较大（cookie只有2k，只能存放字符串），下面介绍如何使用 localStorage 存储、获取、使用数据。与 sessionStorage 相比，存储在...

[7月前端知识点总结](https://blog.csdn.net/weixin_41697143/article/details/97965772)

今天已经7月31号，简单总结这个月的知识点和个人想法：

1、前端架构设计 view-model 分离思想：现在前端使用 React 框架。React 框架通过状态驱动，父子组件之间通过 props 进行数据传递，组件内部使用 state 控制行为。如果是组件自身的行为，控制行为的状态（state）需要存放在当前组件。如果是多个并行组件的行为，控制行为的状态需要放在公共的父组件中。界面状态（sta...

[React-Router 学习](https://blog.csdn.net/weixin_41697143/article/details/89027067)

React-Router
React-router 解决问题：UI与URL解耦
问题：原始同一个界面内部使用 a 进行跳转，不同界面中使用 # hash 跳转。如果在React框架下，对于SPA，需要获取界面的 hash 再判断界面中加载什么部分（setState），这样效率低下，UI 与 URL 不分离。
解决：首先使用 &lt;Link to={path}&gt; 作为超链接，点击后界面URL...

[Can't call setState (or forceUpdate) on an unmounted component ——React 内存泄漏问题处理](https://blog.csdn.net/weixin_41697143/article/details/88687133)

在开发过程中，最近遇到一个错误

大致意思：不能对于一个已经卸载的组件上使用setState改变状态，这将会造成应用的内存泄漏。

解决方法：在componentWillUNmount 阶段中取消所有的异步任务（例如：SetState操作）。

如果在react组件中设置了定制器或者在dom上绑定了事件，卸载组件时未清除定时器或未清除事件，或者在已经卸载的组件中设置setState，都会导致内...

[GG-Editor介绍-在线绘图软件](https://blog.csdn.net/weixin_41697143/article/details/88181212)

在浏览器中预览编辑复杂图形时，推荐一个 GG-editor 插件。

这个插件基于 React 框架，使用方便，可以创建编辑思维导图、流程图、拓扑图等图形。

使用 npm 安装

安装 node.js 或者全局安装 npm 

选择合适的工作目录

git clone https://github.com/gaoli/GGEditor.git
cd gg-editor
npm instal...

[Warning: setState(...): Can only update a mounted or mounting component 报错分析](https://blog.csdn.net/weixin_41697143/article/details/81839869)

在react中，前端通常需要向服务器发起异步请求，而在使用react的时候，如果这个组件最初加载的时候就发起这个异步请求，然后在返回结果中进行setState({})，这时候有可能会遇到这个警告：

问题内容：Warning: setState(...): Can only update a mounted or mounting component

问题分析：通常是因为组件并没有装载上便开始执...

[react框架如何优化代码(性能)？](https://blog.csdn.net/weixin_41697143/article/details/81840818)

1.减少setstate：setstate会增加render的次数，从而影响性能。如果涉及到与视图层无关的属性，直接当做class实例的属性，而不是state的状态。这样改变这个属性不会造成页面重新的渲染。

小结：render需要用到的属性放在state和props中。

2.浏览器的repaint和reflow会影响到性能。回流一定是重绘，重绘不一定是回流 重绘（repaint）：对元素的背景...



[React中获取元素位置](https://blog.csdn.net/weixin_41697143/article/details/82810451)

React框架使用虚拟DOM代替真实的DOM来优化性能，使用props和state进行属性传递。所以说在react中直接获取DOM元素的位置是不合理的（不利于性能）。那么我们可以使用下面的API：

document.documentElement.getBoundingClientRect

Syntax

oRect = object.getBoundingClientRect()

[React Event 事件系统](https://blog.csdn.net/weixin_41697143/article/details/82810571)

React事件


React 标准化了事件对象，因此在不同的浏览器中都会有相同的属性。


组件createClass后创建的是许多方法组成的对象。组件中使用的方法分为React自有的方法与用户定义的方法。其中React自有方法是组件生命周期中的方法，如：render、componentWillUpdate、componentDidMount等。用户自定义的方法可以起符合JS命名规范的方法就可以...



[propTypes 数据类型检验](https://blog.csdn.net/weixin_41697143/article/details/83589965)

propTypes 数据类型检验
为什么使用propTypes？
在 react 中，不同组件通过props进行单向传值；不同值类型可能造成不必要的麻烦。
在 JS 中，不同的数据类型可能存在强制数据类型转换。（string =&amp;amp;amp;amp;gt; number）
这些问题在写代码的时候不容易发现，如果界面中出现了数据类型的问题，不好找到问题的原因。
所以，引入propTypes，对于引入的props数据类型...



[propTypes 在 react 中数据类型检验](https://blog.csdn.net/weixin_41697143/article/details/84196395)

为什么使用propTypes？

在 react 中，不同组件通过props进行单向传值；不同值类型可能造成不必要的麻烦。

在 JS 中，不同的数据类型可能存在强制数据类型转换。（string =&amp;gt; number）

这些问题在写代码的时候不容易发现，如果界面中出现了数据类型的问题，不好找到问题的原因。

所以，引入propTypes，对于引入的props数据类型进行检验，避免潜在的问题（...



[React 受控组件](https://blog.csdn.net/weixin_41697143/article/details/84447925)

React 受控组件
1.受控组件：在原生的HTML中，input（type=‘text’） textarea select 三个元素的内部的属性可以随着用户的输入变化。
2.react 中使用 state 控制属性的变化，将原生的受控组件和 react 中 state 结合。
class Text extends React.Component {

constructor(props)...

[React 状态提升](https://blog.csdn.net/weixin_41697143/article/details/84447991)

React 状态提升
需求：react是一个数据单向传值的框架，如果子组件不能直接给父组件传值。
如果内部多个子组件共同使用相同的数据，并且互相影响。那么可以将这部分共有的数据存放在父组件的属性中，将handleChange作为props传递给子组件。不同子组件会更改福钻进的某个参数，这部分参数会影响其他子组件的行为。确保父组件内部的数据改变会改变子组件的属性。
案例：公里和英里进行转换，总数是固...

[React 理念与开发流程](https://blog.csdn.net/weixin_41697143/article/details/84448049)

React 理念


静态界面：使用props进行单向数据传递，从顶向下进行数据传递，不需要使用state。


动态界面：使用props进行从上到下传递（repoID），state进行组件内部的数据产生和传递（comment）。简单界面使用从上到下的开发过程，复杂界面使用从下到上的开发流程。尽量减少state使用：确定state的使用位置，确定使用state的组件。


组件化会增...

[React 避免重新渲染-性能优化](https://blog.csdn.net/weixin_41697143/article/details/84847655)

React 避免重新渲染 性能优化

React框架运行的原理：界面受到数据驱动，state 和 props 的改动会造成界面的改动。其中，state 是自身的属性，props 是父组件提供的参数。如果界面内容很多，很小的数据变化会造成界面的重绘，那么造成性能的浪费。下面从几个方面总结一下如何避免重新渲染。

State

state是一个组件内部的属性。如果state变化，那么组件必然会 ...

[如何学习React框架](https://blog.csdn.net/weixin_41697143/article/details/85211109)

2019-1-23 复习：现在关键在于打包工具

React 作为2018年市场占有率很高的框架使我们必须懂得的。
学习react前需要有基本的 html+css+js 的 基础。
如何踏入 React
你应该按照以下的顺序进行学习, 而不是跳着学或者同时学习:

[React 高阶 API 学习](https://blog.csdn.net/weixin_41697143/article/details/85212664)

React 高阶 API

使用方法：react 是React库的入口点。如果你通过 &amp;lt;script&amp;gt; 标签加载React，这些高阶API可用于 React 全局。如果你使用ES6，你可以使用 import React from 'react' 。如果你使用ES5，你可以使用 var React = require('react') 。

概览

Components



[CodeMirror安装及使用](https://blog.csdn.net/weixin_41697143/article/details/86693542)

Code mirror
code mirror 是一个代码编辑插件，最终效果如下
在常规HTML界面使用



[React-select 基本功能学习](https://blog.csdn.net/weixin_41697143/article/details/87632085)

React-Select

在 React 中的选择框主要使用 React-select，下面是React-select 使用说明。点击下面的链接可以查看详细的demo和文档。

See react-select.com for live demos and comprehensive docs.

Version 2 介绍

当前更新到 2.4.1 版本

Improvements includ...



[前端设置 cookie 用户信息](https://blog.csdn.net/weixin_41697143/article/details/88019260)

说明：cookie 用于在本地存储浏览器的信息。当浏览器发送请求时，将cookie共同发送到请求中。服务器可以获取当前用户信息。
document.cookie 即可获取界面中的 cookies。cookie 数据类型是字符串，需要将字符串转化成对象的形式获取对应的属性。

[Tooltip API 说明](https://blog.csdn.net/weixin_41697143/article/details/88052575)

Tooltip（提示框）是 Bootstrap 常见的组件之一，通常显示按钮的说明文本或者文件名等信息。
选项名称
类型/默认值
Data 属性名称
描述
animation
boolean 默认值：true
data-animation
提示工具使用 CSS 渐变滤镜效果。
html
boolean 默认值：false
data-html
向提示工具插入 HTML。如果为 ...

[React中loading界面处理](https://blog.csdn.net/weixin_41697143/article/details/81837145)

前几周，boss给出一个任务：在网站页面加载前设置一个loading界面。

设置loading界面，如果用户网络状况一般，或者用户执行请求操作频繁，可以让用户减少等待时间，有利于提升用户体验。那么具体怎样实现loading界面呢？查询资料进行实践，得出下面几个方案：

方案一：在react框架中，根据组件的生命周期，在componentdidmount进行判断。在render中进行判断：当用...

