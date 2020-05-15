## 移动端兼容

主要处理css在不同设备上的显示

1、设置移动端兼容：增加 meta 标签

~~~html
<meta name='viewport' contant="width=device-width">
~~~

2、常见单位对比：rem em px % 的对比和使用情况。rem 更灵活，因为某个文字大小可能变化，界面上元素的大小不能因此变化。

3、媒体查询：根据屏幕宽度显示不同的CSS。react-router 中可以定义标签

面试题中：body { font-size: 62.5%; } 浏览器默认的文字大小是16px， 那么这里设置body 中的文字大小是 10px， 后面使用 em 就可以统一使用。一个元素的高度和内容有关（例如span内部嵌套的文字，那么这个span的尺寸最好设置成响应式）

浏览器的默认文字大小是 16px 谷歌浏览器最小显示的文字大小是12px。

~~~html
<link rel="stylesheet" href="./css/test.css" media="only screen and (max-width: 760px)">
~~~

~~~css
@media only screen and (max-width: 760px) {
  margin: 20px;
}
/* 通常省略 only screen, print */
@ media and (max-width:768px) {
  margin: 10px;
}
~~~

上面两种都可以；如果比较少，直接用第二种实现。

4、CSS 预编译：less 在本地编译后引入界面 

对于 less, 可以本地 npm install less -g 在本地进行编译，可以插入一个less.js 文件进行编译。对于 SASS ，可以安装一个koala软件进行编译（避免中文路径）。

注意此时的 link 属性中 rel

~~~html
<link rel="stylesheet/less" href="./css/test.less">
<script src="./js/less.js"></script>
~~~

需要在服务器环境下运行，才能正确编译。编译的实质：通过JS获取界面的DOM， 然后通过正则表达式替换内部的变量，然后删除就页面中的标签，再创建一个新的css标签插入界面中。document.createElement(); 这种方法适合于开发环境，实际生产环境中直接插入一个真实的编译后的CSS文件，因为编辑过程需要时间。

从设计图到界面实现：一个元素在UI图片上的宽度高度比例，和实际上在屏幕上的宽度高度比例相同。屏幕的物理像素可能是750ppi, 转换成界面像素可能是 375px（屏幕像素比，对应于高清屏幕）。计算比例后（5%），根据不同屏幕像素实际大小，使用 rem 单位 （360屏幕，1rem = 16px 进行转换）。

~~~css
@media only screen and (width: 320px) {
  html {
    font-size: 16px;
  }
}

@media only screen and (width: 360px) {
  html {
    font-size: 18px;
  }
}

@media only screen and (width: 375px) {
  html {
    font-size: 18.75px;
  }
}
/* 414px  font-size: 20.75*/
~~~

下午的内容实际移动端界面操作

1、分析产品原型图：界面数量，点击后用户交互等

2、分析产品需要怎样的技术实现。百分比有局限性（例如边距2px），最好使用rem（精确设计）。