# 中文输入法输入事件composition的使用

最近遇到一个问题：如果一个 INPUT 中，用户使用中文输入法，那么原生的键盘事件就会发生变化，无法获取正确的 keycode 及对应的输入内容。前端只能操作浏览器相关的 API，不能获取中文输入法的内置 API。查阅资料后，可以使用 composition 事件来监听相关的时间。

不同中文输入法的情况可能大同小异（例如搜狗输入法，中文输入时，keycode 就是225，这样无法检测到点击的键）

composition 事件组合分成三个事件：compositionstart、compositionupdate、compositionend，分别对应中文输入法下，开始输入、更新输入、结束输入的事件。具体的细节如下。

文本合成系统如 [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/input_method_editor)（即输入法编辑器）开始新的输入合成时会触发 **`compositionstart`** 事件。

例如，当用户使用拼音输入法开始输入汉字时，这个事件就会被触发。

## 示例

```js
// 首先获取INPUT元素，或者全局document元素
const inputElement = document.querySelector('input[type="text"]');

// 当输入区域获取焦点后，点击键盘，会触发 composition 事件组合，通过 event.data 可以获取输入的字符
inputElement.addEventListener('compositionstart', (event) => {
  console.log(`generated characters were: ${event.data}`);
});
```

下面可以显示三个不同事件的触发顺序

点击Input获取焦点，切换到中文输入法，点击键盘，然后触发下面事件：

首先触发一次 compositionstart 开始输入

然后触发一次 compositionupdate，如果继续点击键盘，那么继续触发这个事件

最后，点击空格键输入中文时，触发 compositionend 事件

```js
const inputElement = document.querySelector('input[type="text"]');
const log = document.querySelector('.event-log-contents');
const clearLog = document.querySelector('.clear-log');

clearLog.addEventListener('click', () => {
    log.textContent = '';
});

function handleEvent(event) {
    log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
}

inputElement.addEventListener('compositionstart', handleEvent);
inputElement.addEventListener('compositionupdate', handleEvent);
inputElement.addEventListener('compositionend', handleEvent);
```

## 参考文献

https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent

https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event

https://www.jianshu.com/p/e9c837eba083

http://shenyujie.cc/2017/08/24/indirectInput/

https://blog.csdn.net/nosuchobjecterror/article/details/93193229