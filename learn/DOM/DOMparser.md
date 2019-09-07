## DOMParser 对象

作用：解析 XML 标记来创建一个文档，（把xml转化成一个DOM树结构）

### 使用

构造函数创建 DOMparser实例，然后调用API parseFromString 解析字符串，结果是DOM 

DOMParser 对象解析 XML 文本并返回一个 [XML Document 对象](http://www.w3school.com.cn/xmldom/dom_document.asp)。要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法：

```js
let parser = new DOMParser()
var doc = parser.parseFromString(text)
```

### API

解析 XML 标记: parseFromString(text, contentType)

text 参数是要解析的 XML 标记。

contentType 是文本的内容类型。可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。**注意，不支持 "text/html"。**

~~~jsx
let parser = new DOMParser();
let input =`<div><span>test DOM</span><br/><span>c</span><br/><div><img src="https://box.bdimg.com/static/fisp_static/common/img/searchbox/logo_news_276_88_1f9876a.png" alt="" title="test"/></div></div>`;

let app = parser.parseFromString(input, "text/xml");
let container = document.getElementById('container');
container.appendChild(app.firstChild);
~~~

