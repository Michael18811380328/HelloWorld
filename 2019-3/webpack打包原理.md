# webpack打包原理

![96](https://upload.jianshu.io/users/upload_avatars/5779996/f4c9fa0b-aece-41ce-a9e0-5fe30c624d2c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96)

 

[lawpachi](https://www.jianshu.com/u/209bd3bc6844)

 

关注

 1.1 2018.02.05 10:26 字数 919 阅读 28831评论 0喜欢 29

webpack只是一个打包模块的机制，只是把依赖的模块转化成可以代表这些包的静态文件。并不是什么commonjs或者amd之类的模块化规范。webpack就是识别你的 入口文件。识别你的模块依赖，来打包你的代码。至于你的代码使用的是commonjs还是amd或者es6的import。webpack都会对其进行分析。来获取代码的依赖。webpack做的就是分析代码。转换代码，编译代码，输出代码。webpack本身是一个node的模块，所以webpack.config.js是以commonjs形式书写的(node中的模块化是commonjs规范的)

webpack中每个模块有一个唯一的id，是从0开始递增的。整个打包后的bundle.js是一个匿名函数自执行。参数则为一个数组。数组的每一项都为个function。function的内容则为每个模块的内容，并按照require的顺序排列。

```
// webpack.config.js
module.exports = {
  entry:'./a.js',
  output:{
    filename:'bundle.js'
  }
};
```

```
// a.js
var b = require('./b.js');

console.log('a');

b.b1();
```

```
// b.js
exports.b1 = function () {
  console.log('b1')
};

exports.b2 = function () {
  console.log('b2')
};
```

以上代码我们打包处理的js为

```
// bundle.js
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    var b = __webpack_require__(1);

    console.log('a');

    b.b1();


/***/ },
/* 1 */
/***/ function(module, exports) {

    exports.b1 = function () {
      console.log('b1')
    };

    exports.b2 = function () {
      console.log('b2')
    };

/***/ }
/******/ ]);
```

我们看到_*webpack_require*是模块加载函数，接收模块id（对，webpack中每个模块都会有一个独一无二的id，其实也就是在IIFE传参数组中的索引值（0，1，2.....）
a依赖b，所以在a中调用webpack加载模块的函数

```
// 1是模块b的id
var b = __webpack_require__(1);
```

上面是使用的commonjs规范书写的
[webpack2是如何对实现es6 modules的](https://www.jianshu.com/p/e8ec61954748)
[webpack模块化原理-ES module](https://link.jianshu.com/?t=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000010955254)

无论什么模块规范书写。我们的webpack进行识别后打包的内容不会相差很多，webpack有优秀的语法分析能力，支持 CommonJs AMD 等规范。
webpack为什么能把任何形式的资源都视作模块呢？因为[loader机制](https://link.jianshu.com/?t=http%3A%2F%2Fwebpack.github.io%2Fdocs%2Fshimming-modules.html)。不同的资源采用不同的loader进行转换。CMD、AMD 、import、css 、等都有相应的loader去进行转换。那为什么我们平时写的es6的模块机制，不用增加import的loader呢。因为我们使用了babel把import转换成了require。并且**Webpack 2 将增加对 ES6 模块的原生支持并且混用 ES6、AMD 和 CommonJS 模块**。这意味着 Webpack 现在可以识别 import 和 export 了，不需要先把它们转换成 CommonJS 模块的格式：[Webpack 2 有哪些新东西](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fcssmagic%2Fblog%2Fissues%2F58)webpack对于es模块的实现，也是基于自己实现的**webpack_require** 和**webpack_exports** ，装换成类似于commonjs的形式。es6 module是静态的依赖,所以在运行前进行代码转换,这里的实现是将所有导出项作为一个对象的属性,在入口文件执行时,去递归的加载模块。

#### 如何实现一个简单的webpack

1. 读取文件分析模块依赖
2. 对模块进行解析执行(深度遍历)
3. 针对不同的模块使用相应的loader
4. 编译模块，生成抽象语法树AST。
5. 循环遍历AST树，拼接输出js。
   [webpack 源码解析](https://link.jianshu.com/?t=https%3A%2F%2Flihuanghe.github.io%2F2016%2F05%2F30%2Fwebpack-source-analyse.html)
   [细说 webpack 之流程篇](https://link.jianshu.com/?t=http%3A%2F%2Ftaobaofed.org%2Fblog%2F2016%2F09%2F09%2Fwebpack-flow%2F)
   [如何实现一个简单的webpack](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fyoungwind%2Fblog%2Fissues%2F99)

#### loader原理

在解析对于文件，会自动去调用响应的loader**loader 本质上是一个函数，输入参数是一个字符串，输出参数也是一个字符串。当然，输出的参数会被当成是 JS 代码，从而被 esprima 解析成 AST，触发进一步的依赖解析。**webpack会按照从右到左的顺序执行loader。
[Webpack——令人困惑的地方](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fchemdemo%2Fchemdemo.github.io%2Fissues%2F13)