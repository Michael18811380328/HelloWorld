# Chrome DevTools 之 Profiles，深度性能优化必备

虽然一直在用Chrome DevTools，但大多停留在常用的功能和调试上，比如`Elements/Network/Sources/Console`等主要功能，而对于性能分析/优化相关的`Timeline/Profiles`一直敬而远之，深感其门槛高，于是潜心阅读文档，以望窥得一二，以解决实际问题。

不同版本的Chrome DevTools差别很大，这篇文章基于最新版的Mac Chrome完成，主要介绍`Network/Timeline/Profiles`三个方面的内容。

![img](https://upload-images.jianshu.io/upload_images/1158202-724857975d1e91ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/597/format/webp)

系统版本 & Chrome版本



之前写过一篇关于[渲染性能](https://www.jianshu.com/p/a32b890c29b1)的长文章，有兴趣的可以先阅读阅读。

## Profiles 有哪些功能？

Profiles用来更深入的分析性能问题、内存问题。之前介绍的Timeline可以直观的发现问题所在，但是要深入分析，定位问题原因，还得靠Profiles。



![img](https://upload-images.jianshu.io/upload_images/1158202-881ed60aff79c364.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Profiles 功能

如截图所示，Profiles提供了三个主要功能：
`Collect Javascript CPU Profile`：用于找出耗时较长的JS函数。
`Take Heap Snapshot`：用于分析JS对象及其关联的DOM节点的内存分布。
`Record Heap Allocations`：记录内存分配信息，用于分析内存泄露的情况。

## Profiles 下 `Collect Javascript CPU Profile`，可以做什么？

如果你在Timeline中发现JS代码存在jank，jank在[渲染性能](https://www.jianshu.com/p/a32b890c29b1)提到过，主要指运行时间过长而丢帧的问题。使用Profiles可以找出耗时较长的JS函数，Profiles的使用步骤如下：
1、勾选`Profiles > Collect Javascript CPU Profile`。
2、点击Start，开始录制。
3、结合具体要分析的场景，做一些操作，比如：刷新页面，点击某个按钮，滑动某个图片，甚至不操作。
4、点击Stop，结束录制。

选中函数，点击`X`符号，可以移除该函数，通过这种方式可以避免一些无用函数或者插件代码对结果分析造成干扰。也可以点击`刷新`符号，恢复移除的函数。

![img](https://upload-images.jianshu.io/upload_images/1158202-fb8c366acf4dbffc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png



###### 查看录制结果

录制结束之后，我们来查看录制的结果，`Chrome DevTools`提供了三种不同的查看方式：
`Chart 图表`：按时间顺序展示的火焰图。
`Heavy(Bottom Up) 从下至上`：按对性能的影响列出函数，也可以查看函数的调用路径，默认视图。
`Tree(Top Down) 从上至下`：从调用栈的顶端开始，展示调用结构的树状图。

###### `Chart 图表`视图

`Chart`：按时间顺序展示的火焰图。包含两部分：`Overview 总览`和`Call Stacks调用栈`。

![img](https://upload-images.jianshu.io/upload_images/1158202-45b21c5d9a3a5d40.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png



`Overview 总览`：录制结果的概览，该图中的条形高度表示调用堆栈的深度。
`Call Stacks调用栈`：录制结果的调用堆栈，横向表示时间，垂直方向表示调用栈，从上往下表示函数调用。
通常来说，垂直方向并没有太大的意义，仅仅表示函数嵌套比较深而已，但是横向表示调用时间，如果调用时间太长，那么就需要优化优化了。

把鼠标放到调用`Call Stacks调用栈`的某个函数上面，会出现带有更多详情的浮窗：

![img](https://upload-images.jianshu.io/upload_images/1158202-7891b75261d123dd.png?imageMogr2/auto-orient/strip|imageView2/2/w/1144/format/webp)

函数详情



`Name`：函数名称。
`Self time`：本次该函数调用运行的时间，不包含子函数的时间。
`Total time`：本次该函数调用运行的总时间，包括子函数的时间。
`URL`：函数定义在文件中的位置，比如file.js:100，表示函数在file.js文件的第100行定义。
`Aggregated self time`：汇总所有该函数调用运行的时间，不包含子函数的时间。
`Aggregated total time`：汇总所有该函数调用运行的时间，包含子函数的时间。
`Not optimized`：优化器检查到该函数有可优化的空间。

###### `Heavy(Bottom Up)`视窗

按对性能的影响列出函数，也可以查看函数的调用路径，默认视图。



![img](https://upload-images.jianshu.io/upload_images/1158202-b36ffba3d9bc657c.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Heavy查看方式

###### `Tree(Top Down)`视窗

从最初调用的位置开始，展示调用结构的树状图。



![img](https://upload-images.jianshu.io/upload_images/1158202-04b0fa66fa56493f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Tree查看方式

## Profiles 下 `Take Heap Snapshot`，可以做什么？

通过`Profiles > Take Heap Snapshot`可以查看堆快照，进而发现内存泄露问题。

`Chorme DevTools`的堆分析器可展示出JS对象及其关联的DOM节点的内存分布情况，可以利用该工具来录制堆快照、分析内存图、对比堆快照、定位内存泄漏。

###### 录制快照

选中`Take Heap Snapshot`，点击开始即可获取快照（它会自动停止），每次获取快照之前都会自动执行垃圾回收操作。
快照最初是存储在渲染进程的内存中的，当我们录制的时候才会传输到`Chrome DevTools`，快照加载进来并解析，我们可以看到其具体信息，每个快照底部的数字就是可达的JS对象的大小。

![img](https://upload-images.jianshu.io/upload_images/1158202-888726a444ce655a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

录制快照



点击清除按钮可以清除快照，如果直接关闭`Chrome DevTools`窗口是不会清除快照的，重新打开`Chrome DevTools`窗口，之前的快照都还保留着。

不同类型的任务可以使用不同的方式来查看，堆快照有三种查看方式。

![img](https://upload-images.jianshu.io/upload_images/1158202-b5f9c5f23bc577c9.png?imageMogr2/auto-orient/strip|imageView2/2/w/861/format/webp)

Paste_Image.png

`Summary 总览视图`：按构造函数分组。用于捕捉对象及其使用的内存。对于定位DOM内存泄露特别有用。
`Comparison 对比视图`：对比两个快照。用于对比不同操作之后的堆快照，查看内存的释放及引用计数，来分析内存是否泄露及其原因。
`Containment 内容视图`：查看堆内容。更适合查看对象结构，有助于分析对象的引用情况。适用于分析闭包以及深入分析对象。
`Statistics 统计视图`：总览堆的统计信息。

###### 查看快照`Sumary view 总览视图`

默认视图，按对象统计，点击某个对象，展开查看更多的实例信息。

![img](https://upload-images.jianshu.io/upload_images/1158202-1ad523016624309b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

`Constructor`：构造函数，节点下的对象都是由改构造函数创建而来。
`Distance`：与根节点的距离。
`Objects Count`：对象个数及百分占比。
`Shallow size`：对象的直接内存总数，直接内存是指对象自身占用的内存大小。
`Retained size`：对象的最大保留内存，保留内存是指对象被删除后可以释放的那部分内存。

点击展开构造函数，可以看到所有构造函数相关的对象实例，@后面的数字是该对象实例的唯一标识符。
记住，黄色的对象实例表示它被JS代码引用，红色的对象实例表示被黄色节点引用的游离节点。

那么，常见的顶层构造函数分别代表什么呢？
`(global property)`：全局对象和普通对象的中间对象，和常规思路不同。比如在Window上定义了一个Person对象，那么他们之间的关系就是`[global] => (global property) => Person`。之所以使用中间对象，是出于性能的考虑。
`(closure)`：使用函数闭包的对象。
`(array, string, number, regexp)`：一系列对象类型，其属性指向`Array/String/Number/Regexp`。
`HTMLDivElement/HTMLAnchorElement/DocumentFragment`：元素的引用或者代码引用的指定文档对象。

![img](https://upload-images.jianshu.io/upload_images/1158202-c1a86f3fd58a2f93.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

###### 查看快照`Comparison view 对比视图`

对比两个快照的不同，找出内存泄露的对象。



![img](https://upload-images.jianshu.io/upload_images/1158202-19cb49d4e92ca6a6.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Comparison view 对照视图

为了验证特定操作会不会引起内存泄露，对比快照的步骤如下：
1、无任何操作，拍第一个堆快照
2、执行一个操作，通常是你觉得可能造成内存泄露的操作
3、执行相反的操作，比如打开文档，然后关闭它
4、拍第二个堆快照，切换到对照视图，并且指定与第一个堆快照进行对比

###### 查看快照`Containment view 内容视图`

内容视图其实就是应用对象结构的鸟瞰图。它能让你深入分析函数闭包，观察VM内部对象，查看应用底层的内存使用情况。

![img](https://upload-images.jianshu.io/upload_images/1158202-e1d7c983db8f50d1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

该视图提供了几个常见入口：
`DOMWindow objects`：JavaScript代码的全局对象
`Native objects`：浏览器的原生对象，整合到JS虚拟机中便于操作，比如DOM节点，CSS规则。

关于闭包的一个小建议：命名函数的闭包相对匿名函数的闭包更易于分析调试。



```jsx
// 匿名闭包
function createLargeClosure() {
    var largeStr = new Array(1000000).join('x');

    var lC = function() {
        return largeStr;
    };

    return lC;
}


// 命名闭包
function createLargeClosure() {
    var largeStr = new Array(1000000).join('x');

    var lC = function lC() {
        return largeStr;
    };

    return lC;
}
```

![img](https://upload-images.jianshu.io/upload_images/1158202-751012243312ad93.png?imageMogr2/auto-orient/strip|imageView2/2/w/686/format/webp)

Paste_Image.png

###### 查看快照`Statistics 统计视图`

总览堆栈的统计信息。可以清楚的看出堆快照的分布情况。



![img](https://upload-images.jianshu.io/upload_images/1158202-8e07f50d363e9366.png?imageMogr2/auto-orient/strip|imageView2/2/w/504/format/webp)

Statistics 统计

###### 搜索指定对象

当然，chrome提供了`command + F`，可以让你搜索指定的对象。

###### 举个内存泄露的栗子



```csharp
var select = document.querySelector;
var treeRef = select("#tree");
var leafRef = select("#leaf");
var body = select("body");

body.removeChild(treeRef);
//由于treeRef，#tree不能被释放

treeRef = null;
//由于leafRef，#tree仍然不能被释放

leafRef = null;
//完全没有被引用，#tree终于可以被释放
```

![img](https://upload-images.jianshu.io/upload_images/1158202-d56ceaa1ff4b95c1.png?imageMogr2/auto-orient/strip|imageView2/2/w/387/format/webp)

Paste_Image.png

\#leaf节点递归引用了#tree节点，所以，只有当leafRef被设置成null后，#tree代表的整个树节点才会被垃圾回收器回收。

## Profiles 下 `Record Heap Allocations` ，可以做什么？

通过`Profiles > Record Heap Allocations`可以持续的记录堆分配的情况，显示了对象在什么时候被创建、什么时候存在内存泄漏等。

![img](https://upload-images.jianshu.io/upload_images/1158202-da6f11b27c08a988.png?imageMogr2/auto-orient/strip|imageView2/2/w/909/format/webp)

Paste_Image.png



###### 堆分配分析器

要想了解对象的堆分配情况，和其他工具类似：选中`Record Heap Allocations`=>点击Start开始录制=>做一系列操作=>停止录制=>分析。

![img](https://upload-images.jianshu.io/upload_images/1158202-90d5338502557fc5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

堆分配

![img](https://upload-images.jianshu.io/upload_images/1158202-4b0ab1bd57f7300a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

上面的柱条表示堆中生成的新对象。高度表示这个对象的大小，颜色表示这个对象的内存释放情况：蓝色柱表示这个对象在timeline中生成，结束前仍然存在；灰色柱表示这个对象在timeline中生成，但结束前已经被回收了。
我们可以重复执行某个动作，如果最后有不少蓝色柱被保留，这些蓝色柱就是潜在的内存泄露问题。
如果左边的意料之外的蓝条，那么极有可能存在内存泄露。

上面总共录制了6次堆分配行为，我们可以聚焦到某一次堆分配，查看具体对象的保留路径信息。



![img](https://upload-images.jianshu.io/upload_images/1158202-5ef99c9b28b4d0ec.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Paste_Image.png

通过检查对象的保留路径可以弄清楚为什么对象没有被回收，从而移除一些没必要的引用，释放内存。

## 又要总结了？

该系列主要介绍了`Chrome DevTools`中的几个硬骨头`Network`/`Timeline`/`Profiles`，详细的介绍了他们的功能及一些使用技巧。希望大家读了这个系列后会对Chrome DevTools有一个大致的了解，并且能够亲身使用。当然，网站性能优化的话题还没有结束，后面还要结合实战讲讲：
怎么去发现jank并解决？
怎么发现强制同步布局并解决？
怎么发现内存泄露并解决？
怎么分析网页加载并优化加载速度？
等等...
