# 关于H5拖拽firefox浏览器兼容问题

H5拖拽在firefox浏览器的兼容问题。

 第一，火狐浏览器中拖拽后会弹出新的窗口，这里需要在body中为drop事件添加阻止冒泡和默认事件。如：


```jsx
<template>
  <div class="imgBox" ref="imgBox">拖拽</div>
</template>

this.$refs.imgBox.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
}
```

第二，Firefox浏览器拖拽无效或不灵敏，需要在@dragstart事件中添加  e.dataTransfer.setData("imgInfo", item);
```js
//@dragstart = handleDragStart($event, imgItem)

handleDragStart(e, item) {
  //判断当前浏览器是否为火狐浏览器
  let userAgent = navigator.userAgent;
  let ifFirefox = userAgent.indexOf("Firefox");
  if(ifFirefox){
    e.dataTransfer.setData("imgInfo", item);
  }
  //......其他业务逻辑
},
```