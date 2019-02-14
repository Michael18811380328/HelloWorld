PC端事件系统

在浏览器渲染界面过程中，不同阶段会触发一系列的事件。浏览器对于事件兼容性不同。通常情况下事件监听分为两种情况：onClick 位于元素标签内部，element.addeventlistener 位于JS代码中。两种事件绑定机制中，第一种简单，第二种适应范围更广（不会冲突，同一个元素可以绑定不同的事件）。

~~~js
element.addEventListener('click',function(){
  callback();
});
element.dispatchEvent(event);

// 在IE中需要注意兼容性
element.attachEvent('on'+type, callback);
element.detachEvent('on'+type, callback);

//通常情况下，w3c是基础语法。
~~~

onClick 事件的局限性：

1、针对新的事件DOM3，部分不能使用；

2、onClick只能绑定一次回调函数，如果重复绑定，后面的事件会覆盖前面的事件。

3、在IE下没有回调函数

4、只能在事件冒泡阶段触发



attachEvent 在IE下使用，对于其他DOM3的事件不兼容。



addEventListener 事件对象不稳定，新DOM3事件不稳定，浏览器兼容不稳定。

Safari下面 event.target 返回的可能是文本节点。

