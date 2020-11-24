# Synchronous XMLHttpRequest on the main thread is deprecated

## stackOverflow

Why has this message suddenly started to appear in the Firefox console?

I'm using JQuery 1.7.1.

What in my app could I be doing that has caused this message to start appearing?

### Answer

Using jQuery to append a script tag to the document will cause it to load the script with async:false and trigger this warning.

As in:

```js
var script = $("<script></script>");
script.attr("src", player.basepath + "whatever.js");
$(document.body).append(script);
```

You have code performing synchronous XHR/Ajax, i.e. Ajax requests that block until they are completed.

When using jQuery, you'd do so by specifying `async: false` in the settings object of `jQuery.ajax()`.

The solution is to refactor any of your code doing synchronous requests, i.e. kill all instances of `jQuery.ajax({async: false})` and helper functions, as well as `xhr.open(..., false)`, include code in third-party libraries you may use. Also, since jQuery 1.7.1 is rather old by standards of the web, I'm not sure if that jQuery version still does internal sync requests in certain cases, you'll have to check for that as well and upgrade jQuery if so.

## 其他参考

有时html文件会报这样的错误:

`Synchronous XMLHttpRequest on the main thread is deprecated`

原因是你的ajax执行了同步操作，即async设置为False，当然它并不影响程序的运行，但是右边有一道黄杠确实令人不爽，建议还是改成True为好(不设置默认为True)。

## 其他参考

chrome控制台 提示禁告：Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check http://xhr.spec.whatwg.org/. 

解释： 这个警告并不是错误，不是逻辑和代码错误；而是浏览器检测出来的一种不建议写法和用法的一种警示，完全不影响程序的执行和正常运行！

结论和现象： 我发现有不少同学，也遇到过这个问题和疑惑，并且根据网络其他大神的总结和分析，完全解决不掉！那是因为他们总结的：只知其一，不知其二；

翻译结果：大体意思是  XMLHttpRequest  【ajax】发送请求，是在浏览器js的主线程上，ajax同步发送请求引起的，这样会引起很不好的用户体验，可能导致浏览器卡死等等！

1.AJAX 请求

2.主线程-单线程

3.同步请求引起的阻塞，卡死

总结：一个是Ajax请求分异步和同步2种模式。如果请求是同步的，在请求返回之前线程会一直阻塞，如果请求是在主线程中发起的，那就会造成整个浏览器阻塞。
另外一个就是主线程。这段话应该是针对HTML5说的，因为在HTML5以前，JavaScript是完全的单线程方式，主线程之外不存在其他线程。但在HTML5中增加了Worker对象，每个Worker运行在一个独立的线程中，Worker线程被阻塞一般是不会影响主线程和浏览器的。因此，如果非要使用同步的Ajax（这种情况应该很少见），那就放到Worker线程中吧，千万千万不要放到主线程里。

web worker 是运行在后台的 JavaScript，不会影响页面的性能。

什么是 Web Worker？web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

真实情况：我们根本无需增加思想负担。了解什么work、新的api、和多线程消息机制等！我们解决它，只需要遵循以下2点一般就可以解决

1.AJAX 请求 变为异步：这也是ajax默认方式，不然用ajax也失去了本质意义，同步很少

async: false   // 轻轻方式-异步

2.接受的请求，返回一个html代码段，里面包含了`<script src="/scripts/script.js"></script>`这样脚本文件引用！ 才会出现这种警告！

<div> 
 SOME CONTENT HERE
</div>
<script src="/scripts/script.js"></script> 


备注：这样的情况很多，比如你要请求一段html 用于局部刷新显示到页面，或者请求后台模版，而这段html里 还有`<script scr="xx.js"></script>` 引用，就会出险上述警告

解决办法：依据第二点

1.请将 `<script src="/scripts/script.js"></script>` 提前写入前台页面，从发送过来的HTML 代码段剥离出去，亲测有效！国外网友也是这样总结！

2.将引用的外部js脚本文件，写到dom里面，以

~~~html
<script type="text/javascript">
console.log('我是外部js内容，现在通过script 标签写到到html里');
</script>
~~~

总之：如果请求HTML代码段或者HTML模版，不要直接引入外部js的方式就可以，有很多技巧，大家自行发挥，还要2种方式可以解决；想好了给我留言 哈哈哈！

提示你：此法可完美hold住，又不耽误继续引用外部js脚本，吼吼吼！

~~~js
$.getScript('jsUrl', function() {
  // console.log(jsUrl[i] + " loaded...");
});  
~~~



## 参考链接

https://stackoverflow.com/questions/24740773/synchronous-xmlhttprequest-on-the-main-thread-is-deprecated

https://blog.csdn.net/xllily_11/article/details/51879420

https://blog.csdn.net/xllily_11/article/details/51879420

