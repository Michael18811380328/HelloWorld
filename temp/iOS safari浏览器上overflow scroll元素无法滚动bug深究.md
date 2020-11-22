# iOS Safari上overflow: scroll无法滑动解决

## 问题描述

此bug出现需要条件：父元素需使用绝对定位absolute或固定定位fixed，使用overflow: scroll / auto（或overflow-y: scroll / auto)，内部子元素是动态大小（例如较大的svg document，近似为内嵌iframe，等等）。

bug出现原因：没有相关官方文档描述该bug。在查阅文档及自己测试的时候总结：**iOS safari 会将overflow：scroll的元素识别为一个单独的 ScrollView，并予以一个 -webkit-overflow-scrolling 属性为auto。而safari中的网页本身就是一个大的ScrollView，在脱离文档流的定位时，子元素的高度如果没有在ScrollView建立之前确定，就不会触发内部滑动，而会触发外部滑动。**

关于 -webkit-overflow-scrolling：Safari CSS Reference官方是这样描述的：

> Specifies whether to use native-style scrolling in an overflow:scroll element.

即该属性会让overflow：scroll的元素拥有像iOS原生一样顺滑的滑动效果。为了实现此目标，safari将所有overflow：scroll的元素用原生创建一个ScrollView，当-webkit-overflow-scrolling属性为touch时，启用硬件加速，出现顺滑效果。

## 分析

1. 父元素不脱离文档流时，无此bug。
2. 父元素在不指定 -webkit-overflow-scrolling：touch时必定出现无法滑动的问题。
3. 当内部元素为正常的html元素时，无此bug。
4. 当为父元素重新设置overflow属性时，可能会导致safari重建ScrollView而bug消失。（之前版本的实验室用这种方法解决的，但新海外版不能用这种方法fix，所以是可能）

## 解决方法

据以上分析以及大量测试得出完美解决方法为：

1. 必须为所有在移动端的overflow: scroll元素增加属性 -webkit-overflow-scrolling: touch。
2. 当父元素可不脱离文档流时不要脱离文档流。
3. 在子元素iframe加载完成后可异步将父元素的overflow: scroll属性重写（此方法可能不成功）。
4. 如以上没有解决，则给予子元素一个min-height，大小不限（略大于效果最好），帮助safari建立ScrollView（亲测最有效）。

## 前情提要

当iOS safari浏览器上出现大于父容器的svg元素，想给父容器加上`overflow: scroll`实现内部滚动效果而失败的总结。但当时并没有意识到这个问题的实际原理，**只是知道了safari给scroll元素加入了原生的scrollView块**。

## bug原理

最近在做一个项目的时候，在safari上遇到了一个其他的bug，却让我意识到了这个问题的终极原因。

项目bug是这样的：我在用Nuxt做一个展示站点，需要使用锚链接在页面刚进入的时候跳转到某个位置。这里我本来使用的是router api提供的`scrollBehavior`方法，但这个方法在Nuxt上有局限性。我就把实现方式改为：**进入页面后，动态计算不同锚点位置的scroll top再设置父元素的scroll位置。**

在其他浏览器上都是ok的，但在safari上就出了问题：在页面刚进入时无法正确获取到元素的scroll top，小很多，只有页面加载完成之后才可以。

究其原因，是因为我在页面上**放了很多张图片让其自行占位**，而在页面刚加载时，其他浏览器会**预先获取到图片的大小而给其一个占位**，无论图片是否加载完成页面总高度固定的。而safari就不一样，**图片没加载成功时高度是0**。

**图片没加载成功时高度是0**。哇长见识了。

这时回想到之前在safari上的那个scroll bug，在查阅相关资料后就可以得出结论了：

safari浏览器在渲染页面元素的时候，会预先走webkit浏览器的渲染流程：

1. 构建DOM tree
2. 构建CSS rule tree
3. 根据DOM和CSS tree来构建render tree
4. 根据render tree计算页面的layout
5. render页面

注意在第三步和第四步的时候，safari浏览器在构建render tree的时候，会预先找到相应的`overflow: scroll`元素，在计算页面layout的时候，会计算父元素的高度与子元素的高度，若子元素高于父元素，则在**render页面时为其建立一个原生的scrollView。**

这个scrollView有什么用的？其实就是为了给其一个弹弹乐的效果（但确实用户体验不错）。

当子元素是某个媒体格式时，比如img、object（svg）等，safari在加载完成之前是不会在计算在layout之内的，也就是高度为0，**则子元素的高度就一定小于父元素的高度，safari不会给父元素一个原生的scrollView。**

## 解决方法

反其道而行之。当出现这种问题的时候，给子元素一个包裹元素，包裹元素设置一个min-height大于父元素的高度，让父元素有scrollView。当子元素加载完成时，将包裹元素撑开，父元素便可以自由滚动了。



## Table项目中实际处理的情况

当界面滚动，我们需要滚动的是外部的DIV，但是内部的 DIV 滚动了，所以滚动的效果不正确。

也设置了中间层，并设置中间层的最小宽度是屏幕的宽度（页面的宽度），内部DIV的尺寸是JS计算出来的。

解决：设置外部DIV的层级较高，然后此时就不会触发到内部的DIV的滚动。但是这样不确定是否有其他副作用产生。



另一篇博文的角度

### 在IOS系统不能实时触发onscroll事件

项目需求：当页面滚动一定距离后，顶导航栏变为固定定位，定在页面顶部。可是我发现在苹果手机上，页面滑动时。不能实时触发onscroll事件，或者手指按住屏幕，它就不会变为固定定位，手指松开后，才会变为固定定位。安卓上就不会。

百度了一下，说是苹果手机在滑动中不能实时触发onscroll事件。那么京东的移动端的顶部导航栏随着页面滚动，背景色实时改变是怎么做到的？哪位大神有好的解决方法，这个需求解决不了了。

除了使用 `scroll` 事件之外, 再用上 `touchmove` 事件. 比如:

```js
var topnode = document.querySelector('#top')
function change() {
    var y = document.scrollingElement.scrollTop
    // or
    // var y = window.pageYOffset
    var ratio = Math.min(0.8, y / 100)
    topnode.style.opacity = ratio
}
document.addEventListener('touchmove', change)
document.addEventListener('scroll', change)
```



参考：

https://segmentfault.com/a/1190000012761272

https://segmentfault.com/a/1190000016408566