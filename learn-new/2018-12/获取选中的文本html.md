## 获取选中的文本/html

　　首先来谈一下Selection对象和Range对象。

　　Selection是window.getSelection()方法返回的一个对象，用于表示用户选中的文本区域。Selection对象表现为一组Range对象。而Range对象表示文档的连续范围区域，例如用户在浏览器窗口中用鼠标拖动选中的区域。通常情况下，Selection对象只有一个Range对象。selectionObj为Selection对象，rangeObj为Range对象。

　　var selectionObj = window.getSelection();　

　　var rangeObj = selectionObj.getRangeAt(0);



　　获取选中区域的文本：

　　var selectionObj = window.getSelection();

　　var selectedText = selectionObj.toString();

　　selectedText即为用户选中区域的文本。



　　如果想获取选中部分的html代码，就需要用到Range对象的cloneContents方法，cloneContents方法把Range对象的内容复制到一个DocumentFragment对象。

　　　　var selectionObj = window.getSelection();

　　　　var rangeObj = selectionObj.getRangeAt(0);

　　　　var docFragment = rangeObj.cloneContents();

　　然后将docFragment渲染出来，获取其innerHTML即可。

　　　　var testDiv = document.createElement("div");

　　　　testDiv.appendChild(docFragment);

　　　　var selectHtml = testDiv.innerHTML;

　　selectedHtml即为用户选中区域的html代码　



 	IE兼容性问题

　　IE中，通过document.selection创建Selection对象，通过createRange方法创建Range对象，如下：

　　　　var selectionObj = document.selection;

　　　　var rangeObj = selectionObj.createRange();

　　range对象的text属性即为用户选中区域的文本，htmlText属性即为用户选中区域的html代码。

　　　　var selectedText = rangeObj.text;

　　　　var selectedHtml = rangeObj.htmlText;

~~~js
var testDiv = document.getElementById("testDiv");

　　　testDiv.onmouseup = function(){

　　　　　var selectionObj = null, rangeObj = null, selectedText = "", selectedHtml = "";

　　　　　if(window.getSelection){
       		// chrome safari FF 

　　　　　　　selectionObj = window.getSelection();

　　　　　　　selectedText = selectionObj.toString();

　　　　　　　rangeObj = selectionObj.getRangeAt(0);

　　　　　　　var docFragment = rangeObj.cloneContents();

　　　　　　   var tempDiv = document.createElement("div");

　　　　　　　tempDiv.appendChild(docFragment);

　　　　　　　selectedHtml = tempDiv.innerHTML;

　　　　　}else if(document.selection){
       		// IE selection

　　　　　　　selectionObj = document.selection;

　　　　　　　rangeObj = selectionObj.createRange();

　　　　　　　selectedText = rangeObj.text;

　　　　　　　selectedHtml = rangeObj.htmlText;

　　　　　}

　　　　　alert(selectedText);

　　　　　alert(selectedHtml);

　　　}; 　　
~~~

