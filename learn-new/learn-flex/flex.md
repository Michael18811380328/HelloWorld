### flex 补充学习

1、flex理解：弹性盒模型中，子元素如何分配空间。不考虑盒子的内容，按照比例自动分配盒子的长度。注意：必须是弹性盒模型对象的子元素（如果是固定尺寸的对象无效）。弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成。（使用display：flex 可以设置弹性盒子）

基本使用

~~~css
/* 父盒子中（默认主轴是横轴），每一个div的宽度都是1份 */
flex: flex-grow flex-shrink flex-basis
或者：|auto|initial|inherit;

.main {
  display: flex;
}
.main div {
  flex: 0 1 auto;(初始值)
}
~~~

http://www.runoob.com/cssref/css3-pr-flex.html

http://www.runoob.com/w3cnote/flex-grammar.html



~~~css
.main {
  display: flex;
  flex-direction: column;
  /* 内部盒子元素的排列次序（主轴的方向）：默认是 row 一行排列 */
  /* row row-reverse column column-reverse */	 
  /* 这个参数通常设置成column 表示元素在竖行上进行排列 */
  
  flex-wrap: wrap;
 	/* 默认子元素不会拆行显示，no-wrap。其他参数 wrap wrap-reverse。这个参数没有设置过*/ 
  
  jusfify-content: center;
  /* 子元素在主轴上的排列方式——默认是横轴 */
  center 居中
  flex-start 在主轴开始的位置
  flex-end 在主轴结束的位置
  space-between 开始和结束的两个元素贴到边缘，空隙在其中；
  space-around 在各个元素周边均匀分布空隙
  
  align-item: center；
  /* 子元素在交叉轴上的排列方式——默认是纵轴 */
  center
  flex-start
  flex-end
  stretch 子元素在纵向拉伸(长度是100%)
  baseline 子元素基线对齐(文本对齐)
}

.main div {
	flex-basis: 80px;
  /* 弹性盒子的初始长度是80px 这个参数通常不设置 */ 
}

.main div:nth-child(2) {
  flex-grow: 1;
  flex-shrink: 1;
  order: 3;
}
.main div:nth-child(3) {
  flex-grow: 3;
  flex-shrink: 2;
  order: 1;
}
/* 弹性盒子的伸缩比例：第二个盒子的伸长倍数是第一个的三倍，收缩倍数是第一个的2倍 */

order:表示项目的排列顺序：取整数，越小越靠前；
~~~

2、 flex设立的目的

问题一：解决垂直居中问题：传统的布局基于盒子模型，display-float-position 可以进行简单的布局；对于垂直居中，这个方式不是很好（margin-top 设置）此时使用 flex 更合适；

问题二：对于移动端适配问题：可以使用em或者rem单位进行适配，不过这些单位不是很灵活，对于文本可以使用这个单位，对于不同盒子，不同变化的比率，需要使用flex去进行灵活调节。



3、块级元素直接使用，行内块元素也可以使用

~~~css
span {
  display: inline-flex;
}
~~~



4 注意

flex布局后，float、clear、verticle-align 会失效；

所以，首先使用float解决，之后使用flex布局解决；特殊情况使用position：absolute解决；