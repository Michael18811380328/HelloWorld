# FileReader

FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

其中File对象可以是来自用户在一个[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象,也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象,还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果。

重要提示： FileReader仅用于以安全的方式从用户（远程）系统读取文件内容，它不能用于从文件系统中按路径名简单地读取文件。 要在JavaScript中按路径名读取文件，应使用标准Ajax解决方案进行服务器端文件读取，如果读取跨域，则使用CORS权限。

**Note:** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用。

## 构造函数

- [`FileReader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/FileReader)

  返回一个新构造的`FileReader`。

## 属性

- [`FileReader.error`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/error) 只读

  一个[`DOMException`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)，表示在读取文件时发生的错误 。

- [`FileReader.readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 只读

  表示`FileReader`状态的数字。取值如下：常量名值描述`EMPTY``0`还没有加载任何数据.`LOADING``1`数据正在被加载.`DONE``2`已完成全部的读取请求.

- [`FileReader.result`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result) 只读

  文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。

### 事件处理

- [`FileReader.onabort`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onabort)

  处理`abort`事件。该事件在读取操作被中断时触发。

- `FileReader.onerror`

  处理`error`事件。该事件在读取操作发生错误时触发。

- [`FileReader.onload`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload)

  处理`load`事件。该事件在读取操作完成时触发。

- `FileReader.onloadstart`

  处理`loadstart`事件。该事件在读取操作开始时触发。

- `FileReader.onloadend`

  处理`loadend`事件。该事件在读取操作结束时（要么成功，要么失败）触发。

- `FileReader.onprogress`

  处理`progress`事件。该事件在读取[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)时触发。

因为 `FileReader` 继承自[`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)，所以所有这些事件也可以通过[`addEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)方法使用。

## 方法

- [`FileReader.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/abort)

  中止读取操作。在返回时，`readyState`属性为`DONE`。

- [`FileReader.readAsArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)

  开始读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容, 一旦完成, result 属性中保存的将是被读取文件的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer) 数据对象.

- [`FileReader.readAsBinaryString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsBinaryString) 

  开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。

- [`FileReader.readAsDataURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)

  开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL格式的Base64字符串以表示所读取文件的内容。

- [`FileReader.readAsText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText)

  开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。