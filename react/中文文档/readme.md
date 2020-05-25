# 目录

注意：官方文档在不断更新，所以依照最新的英文官网文档为准，中文不准确。目标：把主要知识点背过，最好默写；每天默写学到的知识；把高级掌握。==这是自己看家的本领==

https://zh-hans.reactjs.org/docs/getting-started.html

## 开始

React 需要 JS 基础，可以在这个链接查看JS基础：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript 

### 在网站中添加 React

单独的 HTML：react + react-dom + babel 然后把组件挂在到一个DOM节点上

ReactDOM.render(element, domContainer);

生产环境下可以使用压缩后的代码

~~~html
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script type="text/babel"></script>
~~~

可以使用原生的 React.createComponent 创建组件，或者使用JSX创建组件

在项目中使用 React NPM 创建 babel 编译环境 

~~~bash
npm install babel-cli@6 babel-preset-react-app@3
npx babel --watch src --out-dir . --presets react-app/prod
~~~

### 创建新的 React 应用

CLI选择：SPA选择 create-react-app，服务端使用 Next.js，静态网站 Gatsby

[Create React App](https://github.com/facebookincubator/create-react-app) 是一个用于**学习 React** 的舒适环境，也是用 React 创建**新的[单页](https://zh-hans.reactjs.org/docs/glossary.html#single-page-application)应用**的最佳方式。

~~~bash
npx create-react-app my-app
cd my-app
npm start
npm run build
~~~

[Next.js](https://nextjs.org/) 是一个流行的、轻量级的框架，用于配合 React 打造**静态化和服务端渲染应用**。它包括开箱即用的**样式和路由方案**，并且假定你使用 [Node.js](https://nodejs.org/) 作为服务器环境。

[Gatsby](https://www.gatsbyjs.org/) 是用 React 创建**静态网站**的最佳方式。它让你能使用 React 组件，但输出预渲染的 HTML 和 CSS 以保证最快的加载速度。

目前只用到第一种工程化工具

注意配置文件

### CDN 链接

~~~html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
~~~

### 发布渠道

这里主要介绍不同的版本，与React框架开发人员相关，与使用React的人无关。

## 核心概念

1. Hello World：`ReactDOM.render(<span>hello</span>, document.getElementbById('#root'))`
2. JSX 简介: js+HTML JSX包裹一个括号，避免JS代码末尾自动加分号造成错误
3. 元素渲染：React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。尽管每一秒我们都会新建一个描述整个 UI 树的元素，React DOM 只会更新实际改变了的内容。
4. 组件 & Props
5. State & 生命周期
6. 事件处理
7. 条件渲染
8. 列表 & Key：列表渲染需要加入不同的Key，便于React渲染；不要使用index排序筛选
9. 表单：多个表单使用一个处理函数
10. 状态提升：把公共state提取到父组件中
11. 组合 vs 继承
12. React 哲学



### 高级指导

无障碍
代码分割
Context
错误边界
Refs 转发
Fragments
高阶组件
与第三方库协同
深入 JSX
10、性能优化

Portals
Profiler
不使用 ES6
不使用 JSX
协调
Refs & DOM
Render Props
静态类型检查
严格模式
使用 PropTypes 类型检查
非受控组件
Web Components



### API

React
React.Component
ReactDOM
ReactDOMServer
DOM 元素
合成事件
Test Utilities
Test Renderer
JavaScript 环境要求
术语表



### Hook

1. Hook 简介
2. Hook 概览
3. 使用 State Hook
4. 使用 Effect Hook
5. Hook 规则
6. 自定义 Hook
7. Hook API 索引
8. Hooks FAQ

### 测试

- [测试概览](https://zh-hans.reactjs.org/docs/testing.html)
- [测试技巧](https://zh-hans.reactjs.org/docs/testing-recipes.html)
- [测试环境](https://zh-hans.reactjs.org/docs/testing-environments.html)

### CONCURRENT 模式（实验阶段）

- [1. 介绍 Concurrent 模式](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)
- [2. Suspense 用于数据获取](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)
- [3. Concurrent UI 模式](https://zh-hans.reactjs.org/docs/concurrent-mode-patterns.html)
- [4. 采用 Concurrent 模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html)
- [5. Concurrent 模式 API 参考](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html)

贡献

- [如何参与](https://zh-hans.reactjs.org/docs/how-to-contribute.html)
- [源码概述](https://zh-hans.reactjs.org/docs/codebase-overview.html)
- [实现说明](https://zh-hans.reactjs.org/docs/implementation-notes.html)
- [设计理念](https://zh-hans.reactjs.org/docs/design-principles.html)

FAQ

- [AJAX 及 APIs](https://zh-hans.reactjs.org/docs/faq-ajax.html)
- [Babel, JSX, 及构建过程](https://zh-hans.reactjs.org/docs/faq-build.html)
- [在组件中使用事件处理函数](https://zh-hans.reactjs.org/docs/faq-functions.html)
- [组件状态](https://zh-hans.reactjs.org/docs/faq-state.html)
- [样式及 CSS](https://zh-hans.reactjs.org/docs/faq-styling.html)
- [项目文件结构](https://zh-hans.reactjs.org/docs/faq-structure.html)
- [Virtual DOM 及内核](https://zh-hans.reactjs.org/docs/faq-internals.html)