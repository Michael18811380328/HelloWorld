# debug.js
debug.js is an embeddable JavaScript debugger for web development.

It allows you to debug easily without the F12 Tools.
The library has useful features such as logging, DOM element inspector, screen measure, file viewer, command-line, original script interpreter for automated testing, etc.

debug.js 是用于Web开发的嵌入式 JavaScript 调试器。它使您无需F12工具即可轻松调试。该库具有有用的功能，例如日志记录，DOM元素检查器，屏幕尺寸，文件查看器，命令行，用于自动测试的原始脚本解释器等。

## Quick Start
### CDN

```html
<!DOCTYPE html>
<html>
<head>
  <script src="debug.js"></script>
  <script>
    function foo() {
      log('button was clicked');
    }
  </script>
</head>
<body>
  <button onclick="foo();">BUTTON</button>
</body>
</html>
```

### Node

~~~bash
npm install debug --save-dev
~~~

~~~js
import Debug from 'debug';
const debug = Debug('Michale:helloWorld');

debug('helloWorld');
~~~

## Documents & Demos

For more information on how to use, see: https://debugjs.net/
