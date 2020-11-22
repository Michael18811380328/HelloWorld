# window.onbeforeunload 的使用

### 官方定义

onbeforeunload 事件在即将离开当前页面（刷新或关闭）时触发。该事件可用于弹出对话框，提示用户是继续浏览页面还是离开当前页面。

### 使用场合

当我们界面中有未提交的表单，或者有未保存的文本内容，用户点击关闭按钮，需要浏览器弹出提示框，就需要使用这个事件 `onbeforeunload`

### 调用方式

~~~js
window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '自定义文本';
});

// 当然，也可以通过以下方式调用：
window.onbeforeunload = function(event) { 
  ...
};
~~~

或者在body标签上绑定onbeforeunload，但更推荐使用addEventListener的方式调用。

HTML规范建议作者使用 Event.preventDefault() 而非 Event.returnValue 的方式来提示用户。但是，该种方法还没有得到全部浏览器的支持，所以需要配合使用。

### React 中使用

在 React 中，需要在 DidMount 阶段监听这个事件，在 willunmount 阶段释放这个事件的回调函数。

~~~jsx
componentDidMount() {
  window.onbeforeunload = this.onbeforeunload;
}

componentWillUnmount() {
  window.onbeforeunload = null;
}

onbeforeunload = () => {
  // handle unsaved file
  return '';
}
~~~

### 界面提示文本

当事件返回值不是null或者undefined时，用户将会被提醒是否离开页面。（但测试后发现即便返回null或者undefined，弹出框也会被展示）。
如果不需要展示弹窗，不使用 Event.preventDefault()，Event.returnValue即可。


returnValue自定义文本无效原因：在旧版本浏览器中，事件的返回值会被展示在对话框中。但从Firefox 44，Chrome 51，Opera 38，和Safari 9.1以后，返回文本将不会被展示，换言之，无法自定义弹窗提示文本。

默认的提示文本如下：

Firefox（66.0.3）“此页面想询问您是否要离开 - 您输入的数据可能不会被保存”

Safari（10.1.2）“您确定要离开此页面吗？”

Chrome（74.0.3729.131）“重新加载此网站？”“系统可能不会保存您所做的更改。”


alert，confirm，prompt不执行

在一些浏览器中，在onbeforeunload中调用alert，confirm，prompt等方法会被忽略。

### onbeforeunload无效

之前遇到的情况是，在chrome中onbeforeunload事件时而执行时而失效，以为是浏览器的兼容问题，百思不得其解，但后来发现如下解释：As of Chrome 60, the confirmation will be skipped if the user has not performed a gesture in the frame or page since it was loaded.在Chrome和Firefox中，页面加载完成后，如果用户未对页面进行操作，比如“点击”、“输入”等等，onbeforeunload将不会被执行。而在Safari中onbeforeunload总是会被执行。需要指出的是，许多浏览器会忽略该事件并自动关闭页面无需用户的确认。火狐浏览器在配置页面about:config设有一个dom.disable_beforeunload的开关变量用于开启这个功能。

### 参考文档

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload

https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload

https://www.runoob.com/jsref/event-onbeforeunload.html

https://blog.csdn.net/u014259536/article/details/89888573