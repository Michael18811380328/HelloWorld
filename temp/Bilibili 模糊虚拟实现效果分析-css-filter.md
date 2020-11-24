# Bilibili 模糊虚拟实现效果分析

最近看到 B 站上面首页更新的效果，随着鼠标的移动，界面顶部的 banner 会虚拟化变化，感觉效果很好，增加了用户的交互。具体的效果如下：

可以使用 CSS 实现 PS 中复杂的效果；然后使用JS获取当前鼠标的位置，动态改变界面效果，达到和用户交互。

~~~css
.blur {
  -webkit-filter: blur(4px);
  filter: blur(4px);
}

.brightness {
  -webkit-filter: brightness(0.30);
  filter: brightness(0.30);
}

.contrast {
  -webkit-filter: contrast(180%);
  filter: contrast(180%);
}

.grayscale {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.huerotate {
  -webkit-filter: hue-rotate(180deg);
  filter: hue-rotate(180deg);
}

.invert {
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

.opacity {
  -webkit-filter: opacity(50%);
  filter: opacity(50%);
}

.saturate {
  -webkit-filter: saturate(7);
  filter: saturate(7);
}

.sepia {
  -webkit-filter: sepia(100%);
  filter: sepia(100%);
}

.shadow {
  -webkit-filter: drop-shadow(8px 8px 10px green);
  filter: drop-shadow(8px 8px 10px green);
}
~~~

详细可以参考官方文档

参考文档：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter

https://www.runoob.com/cssref/css3-pr-filter.html

