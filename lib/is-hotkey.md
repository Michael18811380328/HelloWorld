# JS-is-hotkey

轻量级捕获键盘事件，支持MAC或者传统键盘事件。可以根据不同的事件触发不同的函数(保存或者提交)。

~~~js
// 直接使用
import isHotkey from 'is-hotkey';

handleKeyDown = (event) => {
  if (isHotkey('mod+s', e)) {
    this.autoSave();
  }
  else if (isHotkey('esc', e)) {
    this.quit();
  }
}

// 批量使用
import isHotkey from 'is-hotkey'

const isSaveHotkey = isHotkey('mod+s');
const isEnterHotkey = isHotkey('enter');

function onKeyDown(e) {
  if (isSaveHotkey(e)) {
    ...
  }
}
~~~

现在更新到 0.1.4 版本

链接：[http://npm.taobao.org/package/is-hotkey](http://npm.taobao.org/package/is-hotkey)
