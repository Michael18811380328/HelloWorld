# Chrome DevTools 之 Network，网络加载分析利器

虽然一直在用Chrome DevTools，但大多停留在常用的功能和调试上，比如`Elements/Network/Sources/Console`等主要功能，而对于性能分析/优化相关的`Timeline/Profiles`一直敬而远之，深感其门槛高，于是潜心阅读文档，以望窥得一二，以解决实际问题。

不同版本的Chrome DevTools差别很大，这篇文章基于最新版的Mac Chrome完成，主要介绍`Network/Timeline/Profiles`三个方面的内容，为后续的加载优化，性能优化做准备。

![img](https://upload-images.jianshu.io/upload_images/1158202-724857975d1e91ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/597/format/webp)

系统版本 & Chrome版本



之前写过一篇关于[渲染性能](https://www.jianshu.com/p/a32b890c29b1)的长文章，有兴趣的可以先阅读阅读。

## Network有哪些功能？

Network主要有5个视窗，分别有不同的功能：
`Controls 工具栏`：用来控制Network的功能及外观。
`Filters 筛选栏`：根据筛选条件筛选请求列表，按住`command/ctrl`键可多选。
`Overviews 概览`：资源被加载过来的时间线，如果多条时间线垂直堆叠，表示多个资源被并行加载。
`Request Table 请求列表`：该视窗列出了所有的资源请求，默认按时间顺序排序，点击某个资源，可以查看更详细的信息。
`Summary 总览`：汇总了请求数量，传输数据大小，加载时间等信息。

![img](https://upload-images.jianshu.io/upload_images/1158202-a0acdb55ed801dd3.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Network视窗



默认情况下，`Request Table 请求列表`展示如下信息，当然，在请求列表的表头右键可以配置请求列表显示的内容。
`Name`：资源的名称。
`Status`：HTTP的状态码。
`Type`：资源的MIME类型。
`Initiator`：表示请求的上游，即发起者。`Parser`表示是HTML解析器发起的请求；`Redirect`表示是HTTP跳转发起的请求；`Script`表示是由脚本发起的请求；`Other`表示是由其他动作发起的请求，比如用户跳转或者在导航栏输入地址等。
`Size`：请求的大小，包括响应头和响应体的内容。
`Time`：请求的时间，从请求开始到请求完全结束。
`Timeline`：请求的时间线。

![img](https://upload-images.jianshu.io/upload_images/1158202-77f7bed246b26c0f.png?imageMogr2/auto-orient/strip|imageView2/2/w/920/format/webp)

右键配置请求列表



## 怎么录制页面快照？

选中工具栏的快照图标，可以录制页面快照。



![img](https://upload-images.jianshu.io/upload_images/1158202-221af961b60fae9c.png?imageMogr2/auto-orient/strip|imageView2/2/w/1106/format/webp)

录制快照

选中某一个快照，在概览/请求列表出现的黄色竖线，就是该快照被捕捉的真实时间，双击快照可以放大。



![img](https://upload-images.jianshu.io/upload_images/1158202-1a17bea9bbbfa890.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

快照捕获时间

## DOMContentLoaded事件/Load事件的区别？

`DOMContentLoaded事件` 页面文档完全加载并解析完毕之后，会触发`DOMContentLoaded事件`，它在两个地方都有体现：概览视窗的蓝色竖线，总览视窗的触发时间。
`Load事件` 当所有资源加载完成后触发的，它在三个地方有体现：概览视窗的红色竖线，请求列表视窗的红色竖线，总览视窗的触发时间。

![img](https://upload-images.jianshu.io/upload_images/1158202-30bb537a98528721.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

DOMContentLoaded/Load事件



结合DOM文档加载的加载步骤，`DOMContentLoaded事件/Load事件`触发时机如下：

1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。// 部分脚本会阻塞页面的加载
4. DOM树构建完成。//`DOMContentLoaded 事件`
5. 加载图片等外部文件。
6. 页面加载完毕。//`load 事件`

## 资源请求明细包含了哪些信息？

点击请求列表某个请求的名称，可以查看该请求的详细信息。详细信息主要有4个方面：
`Headers`：资源的HTTP头
`Preview`：预览JSON/image/text资源
`Response`：资源的HTTP响应头
`Timing`：资源的请求生命周期
`Cookies`：查看HTTP请求头和响应头附带的cookie信息

查看HTTP头：包含了资源的请求URL，HTTP方法，响应的状态码。此外，还列出了HTTP请求头和响应头及其值，以及请求参数。



![img](https://upload-images.jianshu.io/upload_images/1158202-c45e34c8f075fc23.png?imageMogr2/auto-orient/strip|imageView2/2/w/951/format/webp)

HTTP头

查看HTTP响应内容：可以清楚的看到HTTP请求的返回结果。



![img](https://upload-images.jianshu.io/upload_images/1158202-5357d204393b09ad.png?imageMogr2/auto-orient/strip|imageView2/2/w/373/format/webp)

HTTP响应

资源预览：没什么好讲的，可以查看JSON/image/text等资源。



![img](https://upload-images.jianshu.io/upload_images/1158202-8df16a776acfabaf.png?imageMogr2/auto-orient/strip|imageView2/2/w/879/format/webp)

资源预览

Cookies：该域名下存储的cookie信息，其中包含了cookie的特性。



![img](https://upload-images.jianshu.io/upload_images/1158202-fc61c1aab20b2b3f.png?imageMogr2/auto-orient/strip|imageView2/2/w/931/format/webp)

Cookies

`Name`：cookie的名称。
`Value`：cookie的值。
`Domain`：cookie所属域名。
`Path`：cookie所属URL。
`Expire/Max-Age`：cookie的存活时间。
`Size`：cookie的字节大小。
`HTTP`：表示cookie只能被浏览器设置，而且JS不能修改。
`Secure`：表示cookie只能在安全连接上传输。

Timing：查看资源请求的生命周期，包含`Queing`/`Stalled`/`Request/Response`/`Request sent`/`Waiting`/`Content Download`各个阶段。

![img](https://upload-images.jianshu.io/upload_images/1158202-ca8ecc55a513c254.png?imageMogr2/auto-orient/strip|imageView2/2/w/952/format/webp)

Timeing



## 如何查看资源请求的上游和下游？

按时shift键，鼠标hover在请求上，可以查看请求的上游和下游，如下图所示，hover在`common.js`上，可以看到有一个绿色请求、一个红色请求。其中绿色请求表示`common.js`的上游请求，即谁触发了`common.js`请求，红色请求表示`common.js`的下游请求，即`common.js`又触发了什么请求。

![img](https://upload-images.jianshu.io/upload_images/1158202-038dbaa07c55b3d8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

查看上下游请求

## 想对请求列表排序？

请求列表的资源默认是按照起始时间排序，最上面的请求最先发起。点击表头的`Timeline`可以重新排序，主要有如下几个维度。
`Timline - Start Time`：按请求的发起时间排序。
`Timline - Response Time`：按请求的响应时间排序。
`Timline - End Time`：按请求的结束时间排序。
`Timline - Total Duration`：按请求的总耗时排序，可以快捷的找出耗时最多的资源。
`Timline - Latency`：按请求的延迟排序，延迟是指请求发起的时间到响应开始的时间，可以快捷的找出请求等待时间最长（TTFB）的资源。

![img](https://upload-images.jianshu.io/upload_images/1158202-ae3718b8e228ed25.png?imageMogr2/auto-orient/strip|imageView2/2/w/1181/format/webp)

按Timeline排序



## 想对请求进行筛选？

通过筛选视窗可以对请求进行多维度的筛选，按住`Command/Ctrl`键可以同时选择多个筛选条件。

![img](https://upload-images.jianshu.io/upload_images/1158202-b8baae92a64a4bfe.png?imageMogr2/auto-orient/strip|imageView2/2/w/771/format/webp)

多个筛选条件



此外，筛选框可以实现很多定制化的筛选，比如字符串匹配，关键词筛选等，其中关键词筛选主要有如下几种：
`domain`：筛选出指定域名的请求，不仅支持自动补全，还支持*匹配。
`has-response-header`：筛选出包含指定响应头的请求。
`is`：通过is:running找出WebSocket请求。
`larger-than`：筛选出请求大于指定字节大小的请求，其中1000表示1k。
`method`：筛选出指定HTTP方法的请求，比如GET请求、POST请求等。
`mime-type`：筛选出指定文件类型的请求。
`mixed-content`：筛选出混合内容的请求（不懂啥意思）。
`scheme`：筛选出指定协议的请求，比如scheme:http、scheme:https。
`set-cookie-domain`：筛选出指定cookie域名属性的包含Set-Cookie的请求。
`set-cookie-name`：筛选出指定cookie名称属性的包含Set-Cookie的请求。
`set-cookie-value`：筛选出指定cookie值属性的包含Set-Cookie的请求。
`status-code`：筛选出指定HTTP状态码的请求。

主流的几个筛选截图如下：



![img](https://upload-images.jianshu.io/upload_images/1158202-80c7a7bf1cee9218.png?imageMogr2/auto-orient/strip|imageView2/2/w/765/format/webp)

domain筛选

![img](https://upload-images.jianshu.io/upload_images/1158202-a8c1d4fd42b89935.png?imageMogr2/auto-orient/strip|imageView2/2/w/749/format/webp)

has-response-header筛选

![img](https://upload-images.jianshu.io/upload_images/1158202-1eb084e3a1b7d102.png?imageMogr2/auto-orient/strip|imageView2/2/w/765/format/webp)

larger-than筛选

![img](https://upload-images.jianshu.io/upload_images/1158202-854e7909eb1f7f62.png?imageMogr2/auto-orient/strip|imageView2/2/w/871/format/webp)

method筛选

![img](https://upload-images.jianshu.io/upload_images/1158202-7de1e7a50b283371.png?imageMogr2/auto-orient/strip|imageView2/2/w/916/format/webp)

Mime-type筛选

![img](https://upload-images.jianshu.io/upload_images/1158202-a3c301b1960ecd26.png?imageMogr2/auto-orient/strip|imageView2/2/w/853/format/webp)

set-cookie-name筛选

## 如何模拟不同的网络环境？

`Network > Filters 筛选栏`下有可以模拟不同网络环境下的选项，对于模拟测试低网速环境，以及针对低网速环境做加载优化很有帮助。

![img](https://upload-images.jianshu.io/upload_images/1158202-1d537366a436ec2d.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

模拟网络环境



## 如何清除缓存和Cookie？

在Network的请求列表视窗中，右键也提供了清除Cookie和缓存的选项。



![img](https://upload-images.jianshu.io/upload_images/1158202-f9d28e2ef41f452d.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

另外，调试模式下，强烈建议勾选`Disable cache`选项，以避免缓存引起的一些诡异问题。