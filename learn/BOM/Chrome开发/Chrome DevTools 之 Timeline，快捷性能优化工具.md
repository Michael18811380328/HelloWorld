# Chrome DevTools 之 Timeline，快捷性能优化工具

虽然一直在用Chrome DevTools，但大多停留在常用的功能和调试上，比如`Elements/Network/Sources/Console`等主要功能，而对于性能分析/优化相关的`Timeline/Profiles`一直敬而远之，深感其门槛高，于是潜心阅读文档，以望窥得一二，以解决实际问题。

不同版本的Chrome DevTools差别很大，该系列文章基于最新版的Mac Chrome完成，主要介绍`Network/Timeline/Profiles`三个方面的内容。

![img](https://upload-images.jianshu.io/upload_images/1158202-724857975d1e91ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/597/format/webp)

系统版本 & Chrome版本



之前写过一篇关于[渲染性能](https://www.jianshu.com/p/a32b890c29b1)的长文章，有兴趣的可以先阅读阅读。

## Timeline有哪些功能？

Timeline主要有4个视窗，分别有不同的功能：
`Controls 工具栏`：提供了录制，清除记录，配置录制过程中需要捕捉哪些数据的功能。
`Overview 概览`：页面性能的概览图，通过此图可以大致的分析页面。
`Flame Chart 火焰图`：展示了JavaScript的调用堆栈信息。上图中还可以看到三条垂直的虚线，其中蓝线表示`DOMConentLoaded事件`，绿线表示`第一次绘制`，红线表示`load事件`，由此也可以看出`DOMContentLoaded事件`比`load事件`要早不少。
`Details 详情`：选中某个事件，会显示该事件的信息，如果没有选中任何事件，就会显示选中时间区段的帧信息。

![img](https://upload-images.jianshu.io/upload_images/1158202-035432ab1cd5a8fd.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Timline功能分布图



接下来会详细介绍Timeline的详细功能。

## `Overview 概览`视窗

在`Overview 概览`这个小视窗里包含了三部分图形：
`FPS`：每秒的帧数，绿色条约稿，表示FPS值越高，通常上面附带红色块的帧表示该帧时间过长(jank)，可能需要优化。
`CPU`：CPU资源，面积图表示不同事件对CPU资源的消耗。
`NET`：每种颜色条代表不同的资源，条越长表示加载资源耗时越长，每根条上颜色浅的部分表示请求等待时间，颜色深的部分表示资源传输时间。此外，HTML文件是蓝色条，脚本文件是黄色条，样式文件是紫色条，媒体文件是绿色条，其他的是灰色条，网络请求部分更详细的信息建议查看Network。

![img](https://upload-images.jianshu.io/upload_images/1158202-a5626b79c17f969d.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Overview视窗



## 录制

点击小黑点开始录制，再次点击停止录制，`Chrome DevTools`还人性化的提供了一些小彩蛋：在Timeline直接刷新页面，会自动开始录制页面加载过程；录制结束，会自动定位到可能需要优化的部分。
当然，录制还是有一些小技巧：
`录制时间尽可能短`：便于分析
`操作要简单`：每次录制尽量保证简单的操作
`禁止浏览器缓存`：通过`Chrome DevTools > Network > Disable cache`禁止缓存
`禁掉插件`：去除插件对录制过程的影响，禁掉插件觉得很费事儿？用**隐私模式**呀

## JS Profile选项

勾选`Chrome DevTools > Timeline > JS Profile`，然后录制，可以捕捉JavaScript堆栈调用信息。

![img](https://upload-images.jianshu.io/upload_images/1158202-16804ea87df3e2e8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

JavaScript堆栈调用信息



## Paint选项

打开`Chrome DevTools > Timeline > JS Profile`，然后录制，可以捕捉绘制信息。选中某个Paint事件，就可以查看其绘制详情。

![img](https://upload-images.jianshu.io/upload_images/1158202-818865b4b2c91fec.png?imageMogr2/auto-orient/strip|imageView2/2/w/760/format/webp)

绘制信息



别忘了前文提到过的`Chrome DevTools > ESC > Rendering > Enable paint flashing`的功能，能提供很直观的Paint感受，但凡发生Paint的区域，都会闪烁一下。

![img](https://upload-images.jianshu.io/upload_images/1158202-ca3438f49daeac9e.png?imageMogr2/auto-orient/strip|imageView2/2/w/819/format/webp)

Paint闪烁功能



## `Details 详情`视窗

选中`Flame Chart 火焰图`中的事件，就可以在详情视窗中查看该事件的明细；有些tab是特定事件专有的，只会在特定事件选中后才会出现。

![img](https://upload-images.jianshu.io/upload_images/1158202-ae402fd5e927ebe7.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

事件明细



## Timeline事件搜索

`Command + F`可以搜索Timeline事件，很人性化的功能，既可以很直观的看出指定时间区间内的事件数目，同时还可以很方便的过滤掉不关注的事件。

![img](https://upload-images.jianshu.io/upload_images/1158202-c768e82423f5839f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

`Flame Chart 火焰图`事件搜索功能



## Timeline事件

Timeline录制过程中包含很多事件，大致分为：加载事件、脚本事件、渲染事件、绘制事件，其中每个类别的事件都包含数个小事件，并且还拥有不同的事件属性，具体可以查看[Timeline事件文档](https://link.jianshu.com/?t=https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/performance-reference?hl=en)

