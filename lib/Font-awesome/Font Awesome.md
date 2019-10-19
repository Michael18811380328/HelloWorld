# Font Awesome

## 使用

行内样式或者CDN

~~~html
<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
~~~

## 大图标

fa-lg (增加33％)，fa-2x，fa-3x， fa-4x，或 fa-5x 类用于增加相对于其容器的图标大小

或者使用字体 font-size 设置图标的尺寸；如果图标显示不完整，可能行高较小，可以增加行高。

## 动态图标

~~~html
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
~~~

这里的图标主要是loading图标；如果没有自定义loading图标，那么直接使用这里的loading图标是很好的选择。

## 旋转图标

~~~html
<i class="fa fa-shield"></i>
<i class="fa fa-shield fa-rotate-90"></i>
<i class="fa fa-shield fa-rotate-180"></i>
<i class="fa fa-shield fa-rotate-270"></i>
<i class="fa fa-shield fa-flip-horizontal"></i>
<i class="fa fa-shield fa-flip-vertical"></i>
~~~

加上这个类直接旋转图标，不需要单独使用CSS旋转图标

## 图标覆盖

~~~html
<span class="fa-stack fa-lg">
  <i class="fa fa-circle-thin fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
 
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
</span>
 
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger" style="color:red;"></i>
</span>
~~~

如果两个图标需要覆盖（例如禁止吸烟 = 吸烟 + 禁止）那么在外部的盒子中使用 fa-stack 类名。禁止的圆圈使用大的 fa-stack-2X 内部的吸烟（拍照）使用 fa-stack-1x 表示。这样图标可以嵌套或者覆盖。

fa-inverse 类可以用作替代图标颜色。可以向父级添加更大的图标类（fa-lg），以进一步控制尺寸。

## 固定尺寸

fa-fw 类用于设置固定宽度的图标。不同的图标通常高度相同，宽度从12-16不同，如果视觉效果需要等宽，那么可以加入这个样式（给需要设置宽度的若干图标加上这个类名）。

## 图标分类

- 常用品牌图标（github chrome apple android）
- 图表图标（chart）饼图 折线图 堆积图
- 货币图标、支付图标
- 方向图标（箭头图标）
- 文件类型图标（jpg, png, word, zip）
- 表单图标
- 性别、医疗、生活、交通、音乐、视频
- 手势图标
- 文本图标（居中、加粗、保存）
- 移动端APP图标





