# Uncaught TypeError: Cannot set property 'next' of undefined 报错解决

```
TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
    at validateString (internal/validators.js:120:11)
    at Object.join (path.js:1039:7)
    at noopServiceWorkerMiddleware (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/react-dev-utils/noopServiceWorkerMiddleware.js:14:26)
    at Layer.handle [as handle_request] (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/index.js:317:13)
    at /Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/index.js:335:12)
    at next (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/index.js:275:10)
    at launchEditorMiddleware (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/react-dev-utils/errorOverlayMiddleware.js:20:7)
    at Layer.handle [as handle_request] (/Users/seafile/Desktop/code-seafile/seatable-plugin-timeline/node_modules/express/lib/router/layer.js:95:5)
```

**直接翻译是：**

未捕获的TypeError：无法设置未定义的属性“ next”

**大部分网友反馈的问题是：**

noopServiceWorkerMiddleware 这个库和其他第三方库不兼容

目前遇到下面三个依赖早期版本和 noopServiceWorkerMiddleware 不兼容，那么升级即可

*"react-scripts"*: "^3.4.0"

"node-sass": "^4.11.1"

"sass-loader": "^7.3.0"

~~~bash
npm install react-scripts@3.4.0 node-sass@4.11.1 sass-loader@7.3.0
~~~

或者和本地安装的 node 版本不兼容，那么可以参考这个博客（https://blog.csdn.net/guzhao593/article/details/81712016）更新一下本地的 node 到新版。

~~~bash
# 安装 node 版本管理工具
sudo npm i -g n --force 

# 安装稳定版本 node
n --stable
~~~



## 参考链接

https://stackoverflow.com/questions/61354145/the-path-argument-must-be-of-type-string-received-undefined-not-sure-why

https://blog.csdn.net/guzhao593/article/details/81712016