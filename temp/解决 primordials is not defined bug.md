# ReferenceError: primordials is not defined

## 错误经过

使用蚂蚁金服的某个第三方组件时，本地需要测试编译，执行 `npm start` 出现这个错误 ReferenceError: primordials is not defined。翻译后：类型错误：primordials 这个没有定义。

这个组件是蚂蚁金服的，我看了 package.json 中的 start，蚂蚁金服前端很厉害，直接封装了自己的 rc-tools 工程化工具。 我这个项目目前使用 rc-tools 如果直接查看并更改 rc-tools 不现实。

~~~js
"start": "rc-tools run server",
~~~

## 解决过程

网上搜索，发现是 node 版本和 gulp 版本不兼容的问题。我看了一下 rc-tools 的源代码，这个库没有使用 webpack打包，使用了 gulp 工程工具。我本地 node 的版本是 v12.16.2，所以不兼容。

stackoverflow给出的方法是回退node版本或升级gulp版本。可以使用 nvm 管理本地的 node 版本。我的开发环境是 Mac，由于未知原因，使用 wget or curl 始终无法下载安装 nvm 工具（显示 443 请求出现问题）。

最后使用 n 这个管理工具，下载了早期的node版本（8） `v8.16.0` 现在执行 npm start 就可以打开开发环境服务器了

下面是 stackoverflow 的原文

### How to fix ReferenceError: primordials is not defined in node

I have installed node modules by npm install, then I tried to do gulp sass-watch in command prompt. After that I got the below response.

```js
[18:18:32] Requiring external module babel-register
fs.js:27
const { Math, Object, Reflect } = primordials;
ReferenceError: primordials is not defined
```

Have tried this before gulp sass-watch

```bash
npm -g install gulp-cli
```

I hit the same error. I suspect you're using node 12 and gulp 3. That combination does not work: https://github.com/gulpjs/gulp/issues/2324

A previous workaround from Jan. does not work either: https://github.com/gulpjs/gulp/issues/2246

Solution: Either upgrade to gulp 4 or downgrade to an earlier node.



## 参考资料

https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node
https://stackoverflow.com/q/55921442/6304805
https://blog.csdn.net/zxxzxx23/article/details/103000393
https://www.jianshu.com/p/020c734e282b
https://www.jianshu.com/p/c641dcc47b48