### 待学习

##### 1、细节知识点

```js
对于跨域，目前不管是 jsonp 还是其他方式，需要服务器端进行设置操作。浏览器单独操作无法直接跨域访问。个人的浏览器设置允许跨域可能造成安全问题。跨域，就是浏览器和服务器共同绕过同源策略的解决方案。

父组件获取子组件的信息需要回调函数（onClick）这样可以把子组件传过去。当子组件变化后，将自组件传过去，获取子组件的属性等，更符合 react。

由于 immutable 中的数据转换时是哈希，List 对象的size = 1;(实际内存中应该是undefined 和 Text)。这里需要serialize就会出现错误。解决方案：转化成JSON对象，再进行serialize即可避免这个问题。

哈希表：实际底层语言设计数据存储时，会分配较多内存进行存储。如果数据进行扩容，内存可以直接增加。所以底层的内存分配是。对于List等数据结构，可能实际的size和显示的size不是一样的。

对于三个栏目，中间宽度固定，两侧宽度变化；
```

##### 2、编程思维

```txt
1. 自己日常敲代码，多写一点注释比较好。时间长了便于复习。注释多了可以删，但是少了就看不懂了。可以单独弄一个分支设置自己的代码（加注释的代码）；
2. 函数逻辑：先处理异常的情况，将原始数据的异常情况处理掉，后面进行处理大量的情况。
3. 如果出现问题（bug），首先分析算法是否合理（根据算法文档），之后看算法文档和算法的代码是否一致，最后进行修改。自己的代码和逻辑别人不一定清楚，所以需要写好文档。
4. 关键在于JS和css的精通，以及现在打包工具等的常见使用，使用py进行HTML批量操作。
```

##### 5.代码格式规范🦌

```txt
写代码就注意到格式问题，避免后期检查浪费时间
JSON中键值对冒号后面有空格；
if后面有空格，括号和大括号之间有空格，函数不同参数之间有空格。
import最后一行需要加空行
英文首个单词需要大写，后面的不需要大写(名词也不需要大写)
```



##### 8.网络协议

一个完整HTTP具体过程（TCP协议，不讨论websockets协议）

域名解析——发起TCP三次握手——建立TCP连接后发起http请求——服务器响应http请求并给浏览器发送数据——浏览器得到解析html，继续请求html中的其他资源——浏览器渲染页面并呈现给用户。继续了解websockets的具体过程。

WebSockets：一个在TCP连接上进行的全双工通信渠道的协议。TCP情况下浏览器发起请求，WebSockets情况下服务器主动性更强（专业术语不会表达，可以主动请求？）

HTTP协议、HTTPS协议、websocket协议都是在TCP/IP协议基础上进行。

HTTPS:SSL+HTTP



##### 9.JS插件模板

chart.js 制作图表的JS插件

react-select 制作下拉菜单

```js
lodash.js
lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。
现在用于比较两个数组或者对象是否相等。
https://www.lodashjs.com/docs/4.17.5.html
https://blog.csdn.net/qq_35414779/article/details/79077618
```

```js
Immutable.JS
JavaScript中的不可变集合
Immutable.js提供了很多持久化不可变数据结构，包括： List, Stack, Map, OrderedMap, Set, OrderedSet以及Record。
```

```js
https://github.com/gatsbyjs/gatsby
这是一个 React 中在JS中编写CSS的仓库；
```



##### 10.常见ES6名词

docker 容器 ——类似于虚拟机

```js
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout
    })
}
```

脚手架 webpack

数据结构 树结构 

```js
bug: ajax 发出 get 请求出现跨域问题：
解决一：使用jquery 进行发送请求，使用 dataType:"jsonp",可以解决跨域的问题。请求返回的结果是json。出现语法错误。需要服务器端设置返回的结果。使用 jsonp 可以解决同源策略，但是服务器返回的结果仍然是json。需要使用函数类型包起来——前提是服务器和浏览器互相信任（不会发出错误的代码）。

var props = { foo: x, bar: y };
var component = <Component { ...props } />;

解构赋值：使用...语法，将一个对象以键值对的形式，传入到一个组件中作为属性。等价于下面的表达方式。
var component = <Component foo={x} bar={y} />

在react中，如果针对一部分标签的属性是单属性(disabled checked)不能直接改变state从而设置属性变化，直接可以通过state控制整个 input 的变化。使用{ this.state.isDisabled ? <> : <> } 这样的方式控制组件变化。

React 或者 Vue 中都需要注意：不需要在父组件和子组件中同时维护一个数据。如果多个组件可以对某一个属性进行修改，放到多个组件的公共父组件中，使用回调函数的形式进行修改（节省性能）。
```

##### 11、待学习

```
前端常用工具 grunt fis 搭建工具
https://www.cnblogs.com/chyingp/category/560724.html

LCS 算法说明
https://blog.csdn.net/so_geili/article/details/53737001

移动端适配
https://segmentfault.com/a/1190000011586301

Promise实现原理(https://www.w3cschool.cn/ecmascript/3uge1q5v.html)
ES6 https://www.w3cschool.cn/ecmascript/1myl1q5e.html

Mina 框架：自己的小程序一定要上线，就算做一个计算器出来也需要上线

XHR CSRF/XSRF

Promise对象——https://www.w3cschool.cn/ecmascript/3uge1q5v.html

浏览器和移动设备兼容性

熟练使用各种调试、抓包工具

熟悉nodejs或者其他后端语言Python

前端工程化、前后端分离，组件化开发

前端自动化构建工具（如webpack）fis3

https://www.webpackjs.com/concepts/

在JS中使用session Storage 和 cookies 保存 token值？

Hybrid App 微信小程序

bind(this)
在ES5中不需要写 bind, 在 ES6 中需要加入bind；ES6中也可以使用箭头函数绑定this。
```

```js
常用工具库

chroma.js 工具库
JavaScript library for all kinds of color manipulations
http://gka.github.io/chroma.js
https://github.com/gka/chroma.js
比较复杂的色温，色调，随机色彩对比等都可以实现；

mdx-deck
MDX-based presentation decks https://jxnblk.com/mdx-deck
支持使用markdown语法输入处理网页界面；

算法(深度学习笔记)
https://github.com/imhuay/Algorithm_Interview_Notes-Chinese

Awesome macOS open source applications
MAC 系统开源软件
https://github.com/serhii-londar/open-source-mac-os-apps/blob/master/README.md
```

