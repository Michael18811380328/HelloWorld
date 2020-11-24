# z-index 和 fixed 在苹果手机ios不生效

## 问题描述

今天开发遇到一个问题：

当一个元素固定定位时（fixed），同层级节点如果不想被固定定位的元素覆盖，那么需要设置 z-index，这样就不会被覆盖了。

举个例子：A是固定定位的元素，B不能被A覆盖，所以需要设置 B z-index（同时需要设置 position: relative，因为Z-index 必须在定位的元素上才能生效）。

~~~css
.a {
  position: fixed;
  top: 100px;
  left: 100px;
}

.b {
  position: relative;
  z-index: 1;
}
~~~

这样写，在 PC 上正常，在安卓设备上也是正常的，但是在 ios (苹果手机) 的各种浏览器都不生效。

## 问题解决

查了资料，这里应该是 iOS 兼容性问题。iOS设备中，z-index 和 fixed 不能生效。解决方法就是增加 transform: translateZ(1px)

> z-index is not reliable with position:fixed, as shown in this fiddle: http://jsfiddle.net/mZMkE/2/ use translateZ transformation instead.

那么我们的代码可以改成这样的，这样可以在苹果手机上显示。

~~~css
.a {
  position: fixed;
  top: 100px;
  left: 100px;
}

.b {
  position: relative;
  z-index: 1;
  -webkit-transform:translateZ(1px);
  -moz-transform:translateZ(1px);
  -o-transform:translateZ(1px);
  transform:translateZ(1px);
}
~~~

## 参考链接

https://www.jianshu.com/p/61f30eb93024

https://www.jianshu.com/p/61f30eb93024

https://stackoverflow.com/questions/20832531/mobile-safari-positionfixed-z-index-glitch-when-scrolling