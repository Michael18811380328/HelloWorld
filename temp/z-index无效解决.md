# z-index 无效解决方法

如果界面中同一个位置有多个元素层叠，可以设置 z-index 设置不同元素的层级。

有时候遇到设置 z-index 后无效的原因，下面简单分析：

## 父级元素溢出隐藏或者不显示

如果父元素设置了 overflow:hidden /display:none/ 等，那么子元素如果在父元素外部绝对定位，那么调节子元素 z-index 可能不会显示。

~~~css
.father {
  display: none;
  opacity: 0;
  overflow: hidden; (auto)
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
~~~

解决方案：取消父元素的上述属性。

## 父级元素层级低

~~~html
<div style="z-index: 1">
  <div style="z-index: 10">son</div>
</div>
<div style="z-index: 2"></div>
~~~

例如上面的情况，第一个父级DIV的层级是1，第二个父级DIV的层级是2，第一个父级内部的子级DIV是10。由于父级的差距，所以内部子级 z-index设置很大，不会提升到第二个父级上层，就造成了 z-index 无效的假象。

解决方法：查看父元素的 z-index 并修改

## 没有设置定位

使用 z-index 的前提是，需要设置 div 的 定位（eg: position: absolute;）如果元素是标准流，没有定位，那么设置z-index不会使当前元素在另一个元素上方。

~~~html
<div style="position:'absolute'; z-index: 10"></div>
~~~

解决方法：设置当前元素和父级元素的定位

## IE 浏览器不兼容

z-index 有一个属性 inherit，表示子元素继承父元素的 z-index。这个参数在 IE 浏览器上不兼容。

目前没有很好的直接解决方案，可以使用其他的 CSS 代替 z-index（float等）。