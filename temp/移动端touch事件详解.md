# 移动端touch事件详解

### 事件对象

- touches: 当前屏幕上所有触摸点的列表;
- targetTouches: 当前对象上所有触摸点的列表;
- changedTouches: 涉及当前(引发)事件的触摸点的列表

通过一个例子来区分一下触摸事件中的这三个属性：

1. 用一个手指接触屏幕，触发事件，此时这三个属性有相同的值。
2. 用第二个手指接触屏幕，此时，touches有两个元素，每个手指触摸点为一个值。当两个手指触摸相同元素时，targetTouches和touches的值相同，否则targetTouches 只有一个值。changedTouches此时只有一个值，为第二个手指的触摸点，因为第二个手指是引发事件的原因
3. 用两个手指同时接触屏幕，此时changedTouches有两个值，每一个手指的触摸点都有一个值
4. 手指滑动时，三个值都会发生变化
5. 一个手指离开屏幕，touches和targetTouches中对应的元素会同时移除，而changedTouches仍然会存在元素。
6. 手指都离开屏幕之后，touches和targetTouches中将不会再有值，changedTouches还会有一个值，
   此值为最后一个离开屏幕的手指的接触点。
7. 触点坐标选取

### 事件过程

touchstart、touchmove使用、touchend使用

想要在touchmove:function(e,参数一)加一个参数，结果直接使用e.preventDefault()就会 e 报错，处理方法为使用arguments[0]获取event参数

~~~js
e.targetTouches[0].pageX 或 (jquery)e.originalEvent.targetTouches[0].pageX

e.changedTouches[0].pageX 或 (jquery)e.originalEvent.changedTouches[0].pageX

touchmove:function(e,参数一){
　　var e=arguments[0]
　　e.preventDefault()
}
~~~

