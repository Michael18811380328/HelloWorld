# 项目打包说明文档

## 项目简要说明

项目是公司内部的表格组件库，主要供hub项目中前端模块及server项目使用。作为组件，其能够向相关项目提供接口，供相关项目进行导入使用。

## 打包需求

| 项目           | 标准      | 说明                                                         |
| -------------- | --------- | ------------------------------------------------------------ |
| seahub前端模块 | ES Module | 前端react项目使用的模块需要符合ES Module规范，可以以import的方式导入 |
| -server        | CommonJs  | node后端使用的模块需要符合CommonJS规范，可以以require 的方式导入 |

## 打包实现

1. 打包技术Babel7.\*
2. 打包脚本编写.babelrc

   ```bash
   {
     "env": {
       "production": {
         "presets": [["react-app", {"absoluteRuntime" : false, "BABEL_ENV" : "production"}]],
       },
       "node": {
         "presets": [
           [
             "@babel/env",
             {
               "loose": true,
               "shippedProposals": true,
               "modules": "commonjs",
             }
           ],
           "@babel/react"
         ],
         "plugins": [
           "@babel/plugin-proposal-export-default-from", 
           "@babel/plugin-proposal-export-namespace-from", 
           "@babel/plugin-proposal-class-properties",
           "@babel/plugin-proposal-object-rest-spread",
           "@babel/plugin-transform-runtime",
         ]
       }
     }
   }

   ```

   注：production部分用来打包ES Module, common-dir部分用来打包为CommonJS。

3. 打包命令
   ES Module:
   `export BABEL_ENV=production && ./node_modules/.bin/babel src --out-dir es --copy-files`
   CommonJS:
   `export BABEL_ENV=node && ./node_modules/.bin/babel src --out-dir lib --copy-files`

 注：项目中umd打包代码存在bug，暂不可用

### 模块化实现规范

1. AMD（异步模块定义）&& require.js
   * 一个单独的文件就是一个模块
   * 模块和模块的依赖可以被异步加载
   * 主要运行于浏览器端，这和浏览器的异步加载模块的环境刚好适应
   * AMD的运行逻辑是：提前加载，提前执行
2. CMD（通用模块定义）&& Sea.js
   * 一个文件就是一个模块
   * 主要在浏览器中运行
   * CMD的运行逻辑是：依赖就近，延迟执行
3. ES6 Module && ES6
   * 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
   * 模块脚本自动采用严格模式，不管有没有声明use strict。
   * 模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
   * 同一个模块如果加载多次，将只执行一次。
4. CommonJS && node
   * 一个单独的文件就是一个模块
   * 主要运行于服务器端，同步加载模块，只有加载完成，才能执行后面的操作
5. UMD && webpack
   * 该模式主要用来解决CommonJS模式和AMD模式代码不能通用的问题


