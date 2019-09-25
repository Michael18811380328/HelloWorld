# 如何学习React

## 如何踏入 React 生态圈

你应该按照以下的顺序进行学习, **而不是跳着学或者同时学习**:

- [React](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-react-%E6%9C%AC%E8%BA%AB)
- [`npm`](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-npm)
- [JavaScript “打包工具” ](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-javascript-%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7) webpack
- [ES6](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-es6)
- [Routing](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%94%B1-routing)
- [Flux](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-flux)

**你不需要把这些都学完才去使用 React.** 只需要在你遇到问题需要解决的时候, 才进入下一步的学习.

另外, 在 React 社区中, 有一些前沿主题是经常被提及到的, 以下的这些主题很有意思, 但也很难弄懂, 所以它们远没有上面的主题流行, **大多数应用也不需要用到这些.**

- [内联样式](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F)
- [服务器端渲染](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93)
- [Immutable.js](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-immutablejs)
- [Relay, Falcor 等](https://github.com/petehunt/react-howto/blob/master/README-zh.md#user-content-%E5%AD%A6%E4%B9%A0-relay-falcor-%E7%AD%89)



## 学习 React 本身

有一种常见的误解是: 你需要花费大量时间在配置工具上, 然后才开始学习 React. 在官方文档里, 你可以找到 [copy-paste HTML template](https://facebook.github.io/react/docs/getting-started.html#quick-start-without-npm). 只需要保存为 `.html` 文件, 你就可以马上开始学习了. **这个步骤不需要任何工具, 你也无需额外学习工具使用, 直到你能熟练掌握 React 基础.**

我依然觉得, 学习 React 最简单的方法是通过官方教程 [the official tutorial](https://facebook.github.io/react/docs/tutorial.html).

## 学习 `npm`

`npm` 是 Node.js 包管理工具, 也是前端工程师和设计师分享 JavaScript 代码最流行的方式. 它包含了名为 `CommonJS` 的模块系统, 让你可以安装 JavaScript 写的命令行工具. 作为背景知识, 可以阅读 [这篇文章](http://0fps.net/2013/01/22/commonjs-why-and-how/) 了解 `CommonJS` 对于浏览器的重要性, 阅读[CommonJS Spec Wiki](http://wiki.commonjs.org/wiki/Introduction) 了解关于 `CommonJS` API 的更多内容

在 React 生态圈中, 大部分可重用的组件、库和工具遵循 `CommonJS` 模块规范, 可通过 `npm` 来安装.

## 学习 JavaScript 打包工具

出于若干技术原因, `CommonJS` 模块 (也就是 `npm` 里的所有内容) 不能直接用到浏览器. 你需要一个 JavaScript “打包工具(bundler)” 来把这些模块打包成 `.js` 文件, 使你可以在网页中通过 `<script>` 标签引入它们.

JavaScript 打包工具包括 `webpack` 和 `browserify`. 它们都是好的选择, 但我个人更喜欢 `webpack` , 因为它有许多功能简化大型应用开发. 鉴于 webpack 文档可能令人感到困惑, 我也写了两篇文章: [plug-and-play template for getting started](https://github.com/petehunt/react-webpack-template) 和针对更复杂用例的 [how-to guide for webpack](https://github.com/petehunt/webpack-howto).

要记住的一点: `CommonJS` 使用了 `require()` 函数来引入模块, 因此许多人对此感到疑惑, 并认为需要导入 `require.js` 到工程里. 出于若干技术原因, 我建议你避免使用 `require.js`. 它在 React 生态圈并不流行.

## 学习 ES6

在 JSX (你会在 React tutorial 中学习到) 以外, 你可能会注意到 React 例子中一些有趣的语法. 这被称为 ECMAScript6, 是 JavaScript 的最新版本. 由于 ES6 很新, 你可能还没学习到, 浏览器也可能尚未兼容, 但别担心, 通过合适的配置, 你的打包工具会为你自动转换成兼容代码.

如果你只想要使用 React 来把事情做完, **你可以跳过 ES6 的学习,** 或者留到以后再学习.

你可能会看到一些讨论说更适合用 ES6 的 class 来创建 React 组件. 这并不是真的, 大多数人 (包括 Facebook) 用的还是 `React.createClass()`.

## 学习路由 (routing)

“单页面应用” 是时下的技术热点. 当网页加载完成, 用户点击链接或者按钮的时候, JavaScript 会更新页面和改变地址栏, 但网页不会刷新. 地址栏的管理就是通过 **路由(router)** 来完成的.

目前 React 生态圈最受欢迎的路由解决方案是 [react-router](https://github.com/rackt/react-router). 如果你正在创建一个单页面应用, 有什么理由不去使用它呢?

**如果你创建的并非单页面应用, 请不要使用路由.** 无论如何, 大部分项目都是从大型应用中的小组件开始的.