## DOM-parser

MDN

`DOMParser` 可以将存储在字符串中的XML或HTML源代码解析为一个 DOM[文档](https://developer.mozilla.org/zh-CN/zh-cn/DOM/document).

 `DOMParser`是在 [DOM解析和序列化](http://html5.org/specs/dom-parsing.html) 中指定的。

请注意, [XMLHttpRequest](https://developer.mozilla.org/zh-CN/zh-CN/docs/DOM/XMLHttpRequest)  支持从URL可寻址资源解析XML和HTML。



## 创建一个DOMParser[Section](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AADOMParser)

要创建一个DOMParser对象，只需使用 `new DOMParser()`。



## 解析 XML[Section](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser#%E8%A7%A3%E6%9E%90_XML)

一旦建立了一个解析对象以后,你就可以使用它的`parseFromString`方法来解析一个XML字符串:

```js
let parser = new DOMParser(),
let doc = parser.parseFromString(stringContainingXMLSource, "application/xml");
```



### 错误处理[Section](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)

如果解析失败, `DOMParser` 目前不会抛出任何异常, 只会返回一个给定的错误文档(查看 [bug 45566](https://bugzilla.mozilla.org/show_bug.cgi?id=45566)):

```
<parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
	(error description)
	<sourcetext>(a snippet of the source XML)</sourcetext>
</parsererror>
```

解析错误会显示在[错误控制台](https://developer.mozilla.org/zh-CN/zh-cn/Error_Console),包括文档的地址和错误的源代码.



## 解析SVG或者HTML文档[Section](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser#%E8%A7%A3%E6%9E%90SVG%E6%88%96%E8%80%85HTML%E6%96%87%E6%A1%A3)

`DOMParser`也可以用来解析一个SVG文档(Firefox 10.0 / Thunderbird 10.0 / SeaMonkey 2.7)

或者HTML文档 (Firefox 12.0 / Thunderbird 12.0 / SeaMonkey 2.9). 

根据给定的MIME类型不同,parseFromString方法可能返回三种不同类型的文档.

如果MIME类型是 `text/xml`, 则返回一个`XMLDocument`, 

如果MIME类型是 `text/svg+xml`,则返回一个 `SVGDocument,` 

如果MIME类型是 `text/html`, 则返回一个`HTMLDocument`.

```js
let parser = new DOMParser();
let doc = parser.parseFromString(stringContainingXMLSource, "application/xml");
// 返回一个Document对象,但不是SVGDocument也不是HTMLDocument对象

let parser = new DOMParser();
let doc = parser.parseFromString(stringContainingXMLSource, "image/svg+xml");
// 返回一个SVGDocument对象,同时也是一个Document对象.

let parser = new DOMParser();
let doc = parser.parseFromString(stringContainingHTMLSource, "text/html")
// 返回一个HTMLDocument对象,同时也是一个Document对象.
```



### 兼容性：对其他浏览器的DOMParser HTML扩展[Section](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser#%E5%AF%B9%E5%85%B6%E4%BB%96%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84DOMParser_HTML%E6%89%A9%E5%B1%95)

```js
/*
 * DOMParser HTML extension
 * 2012-09-04
 * 
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

(function(DOMParser) {
	"use strict";

	var proto = DOMParser.prototype, 
        nativeParse = proto.parseFromString;

	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser()).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}

	proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var
			  doc = document.implementation.createHTMLDocument("")
			;
	      		if (markup.toLowerCase().indexOf('<!doctype') > -1) {
        			doc.documentElement.innerHTML = markup;
      			}
      			else {
        			doc.body.innerHTML = markup;
      			}
			return doc;
		} else {
			return nativeParse.apply(this, arguments);
		}
	};
}(DOMParser));
```

 



W3C

# XML DOM - DOMParser 对象

- [DOM Implementation](http://www.w3school.com.cn/xmldom/dom_domimplementation.asp)
- [DOM Element](http://www.w3school.com.cn/xmldom/dom_element.asp)

**解析 XML 标记来创建一个文档。**（把xml转化成一个DOM树结构）

### 构造函数

```
new DOMParser()
```

### 说明

DOMParser 对象解析 XML 文本并返回一个 [XML Document 对象](http://www.w3school.com.cn/xmldom/dom_document.asp)。要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法：

```js
var doc = (new DOMParser()).parseFromString(text)
```

注意，XMLHttpRequest 对象也可以解析 XML 文档。参阅 XMLHttpRequest 的 [responseXML](http://www.w3school.com.cn/xmldom/dom_http.asp#responseXML) 属性。



## DOMParser.parseFromString()

解析 XML 标记

### 语法

```
parseFromString(text, contentType)
```

text 参数是要解析的 XML 标记。

contentType 是文本的内容类型。可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。**注意，不支持 "text/html"。**

### 返回值

保存 *text* 解析后表示的一个 [Document 对象](http://www.w3school.com.cn/xmldom/dom_document.asp)。参阅 [Document.loadXML()](http://www.w3school.com.cn/xmldom/met_document_loadxml.asp)，了解这个方法的一个特定于 IE 的替代。

~~~js
// 练习
let parser = new DOMParser();
    let input =
    `<div>
        <span>test DOM</span>
        <br/>
        <span>c</span>
        <br/>
        <div><img src="https://box.bdimg.com/static/fisp_static/common/img/searchbox/logo_news_276_88_1f9876a.png" alt="" title="test"/></div>
      </div>
    `;
let result = parser.parseFromString(input, "text/html");
let app = parser.parseFromString(input, "text/xml");
console.log(result);
console.log(result.firstChild);
console.log(app.firstChild);
// but result != application
let container = document.getElementById('container');
container.appendChild(app.firstChild);
//DOM 结构中有img元素，路径也没问题，但是img却显示不到页面上面？？
~~~

