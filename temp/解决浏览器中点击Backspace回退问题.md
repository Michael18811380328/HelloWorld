# 解决浏览器中点击Backspace回退问题

### 问题描述

工作中遇到在浏览器空白处，或者不可编辑的input框上，点击【Backspace】按键，出现浏览器页面回退的问题，经过测试，发现谷歌浏览器默认屏蔽了这个回退的功能，但IE、360浏览器、火狐浏览器都没有，这个功能会导致，特别是后台系统，session丢失，退回到登录页面，严重影响用户体验。
比如，用户在进行表单的信息填写，不经意在浏览器空白处点击了【Backspace】按键，退到了登录界面，想想这是个什么样的体验。

### 解决方法

通过js监听backspace按键的按下事件：

1、如果标签不是input或者textarea则阻止Backspace
2、input标签除了（TEXT、TEXTAREA、PASSWORD）这些类型，全部阻止Backspace
3、input或者textarea输入框如果不可编辑，则阻止Backspace

### 实现代码

~~~js
function banBackSpace(e) {
  var ev = e || window.event;
  //各种浏览器下获取事件对象
  var obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
  //按下Backspace键
  if (ev.keyCode == 8) {
    var tagName = obj.nodeName //标签名称
    //如果标签不是input或者textarea则阻止Backspace
    if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
      return stopIt(ev);
    }
    var tagType = obj.type.toUpperCase();//标签类型
    //input标签除了下面几种类型，全部阻止Backspace
    if (tagName == 'INPUT' && (tagType != 'TEXT' && tagType != 'TEXTAREA' && tagType != 'PASSWORD')) {
      return stopIt(ev);
    }
    //input或者textarea输入框如果不可编辑则阻止Backspace
    if ((tagName == 'INPUT' || tagName == 'TEXTAREA') && (obj.readOnly == true || obj.disabled == true)) {
      return stopIt(ev);
    }
  }
}
function stopIt(ev) {
  if (ev.preventDefault) {
    //preventDefault()方法阻止元素发生默认的行为
    ev.preventDefault();
  }
  if (ev.returnValue) {
    //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
    ev.returnValue = false;
  }
  return false;
}

$(function() {
  //实现对字符码的截获，keypress中屏蔽了这些功能按键
  document.onkeypress = banBackSpace;
  //对功能按键的获取
  document.onkeydown = banBackSpace;
})
~~~

上述代码可以放到公共的js中，此处的代码参照此篇博客：
http://www.cnblogs.com/lujiulong/p/6019638.html



### 浏览器兼容性

1、  IE：有window.event对象
Firefox：没有window.event对象。可以通过给函数的参数传递event对象。如οnmοusemοve=doMouseMove(event)
统一的解决方法：var event = event || window.event;

2、  IE：even对象有srcElement属性，但是没有target属性
Firefox：even对象有target属性，但是没有srcElement属性
解决方法：var obj = event.relatedTarget || event.srcElement || event.target || event.currentTarget;