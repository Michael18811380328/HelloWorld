## 第八章 DOM

### 8.1 概念

DOM（文档对象模型）作用是把网页转换成JS可以处理的对象（树状结构）。浏览器标签HTML脚本，转换成Node节点树 JS才能操作。

DOM 树最小的单位是 node 节点。浏览器提供了原生的对象 Node。实际的DOM树节点有7类，都继承自Node节点。最大的根节点是 Document， 浏览器中各种标签（span）是 Element， 每个节点具有属性 Attribute，标签内部的文本是 Text，注释是 Comment 节点。文档片段是 DocumentFragment，最后是 DocumentType 表示 doctype 标签（说明HTML的规范）

全部节点按照树状结构排列就是 Document DOM 树。可以使用 parentNode, firstChild, lastChild, nextSibling, previousSibling 获取任意节点。

对于原生 JS 操作node是很重要的，对于React不需要直接操作node，直接使用状态驱动UI界面即可（操作界面，界面滚动动画等也需要DOM）。

### 8.2 Node API

所有的节点都继承自 Node 节点，所以所有的节点都可以继承 Node 节点的 APIs。下面是常用原型上的API。

属性

~~~js
Node.prototype.nodeType // 返回一个数值，表示节点的类型(节点属性文本对应123)
Node.prototuype.nodeName // 返回字符串，表示节点的名称(div #text)
Node.prototype.nodeValue // 返回一个字符串，表示节点的值(文本节点、属性节点、注释节点具有这个属性)，如果内部是空，返回null,这个值可以改变
textContent // 返回当前节点和所有子节点的文本内容
document.textContent === null 
document.documentElement.textContent //可以获取整个文档的内容（实际上获取不全）

baseURL // 返回一个绝对路径(由window.location决定),属性只读，浏览器根据这个属性计算相对路径
ownerDocument // 返回当前节点的根节点document，document.ownerDocument === null
nextSibling, previousSibling 
//返回相邻节点(如果没有相邻节点返回null, 可能一个元素节点的相邻节点是文本节点或者注释节点)
parentNode // 只有三种情况 Element, Document, DocumentFraggment
parentElement // 父元素 element
firstChild lastChild // 返回子元素中的第一个或者最后一个(可能是文本注释或者空)
childNodes // 返回所有子节点的集合
isConnected // 当前节点是否在文档中(可能没有插入文档中)
~~~

方法

~~~js
1
document.body.appendChild(p) // 如果p是新建的DOM，直接在body后面插入。如果p是已有的DOM节点，就是把这个节点移动到body后面。返回值是插入文档的子节点。如果传入的参数是 DocumentFragment，那么插入的是全部的文档片段，返回值是空的DocumentFragment片段。

2
hasChildNodes //判断当前节点是否有子节点(包括所有类型的节点，不仅仅是文档节点)
// 判断一个节点是否具有子节点的三种方法
node.hasChildNodes()
node.firstChild !== null
node.childNodes && node.childNodes.length === 0

3/
node.cloneNode() 克隆一个节点(参数是true、false，表示克隆自身或者克隆全部子节点)，可以克隆全部属性，但是会失去事件监听(回调函数)。克隆后的节点没有父节点，需要手动append到节点树中。如果克隆后有两个name或者ID需要改变其中的一个。

4、
parentNode.insertBefore(newNode, referNode); 新节点会插入到父节点中，插入到referNode之前。返回值是插入的节点。如果第二个参数是null，就插入到最后的位置。

5、
parentNode.removeChild(childNode)
while(element.firstChild) {
  element.removeChild(element.firstChild)
}
//可以移除一个节点的全部子节点

6、replaceChild(newNode, oldNode)

7 node.contains(childNode); 是否是当前节点、子节点、后代节点

node.compareDocumentPosition(another node) 判断两个节点的相对位置(返回一个数值)

isEqualNode 判断两个节点的类型属性子节点是否一致
isSameNode 判断两个节点是否完全一致

normalize 清理节点内部的文本节点(会去掉空文本节点，将相邻的文本节点合并)
getRootNode 获取文档的根节点(类似于属性ownerDocument,方法可以使用在document自身上面)
~~~

### 8.3 节点集合 API

Node 是单个节点，多个节点集合可以分为 NodeList 和 HTMLCollection，前者包括各种类型节点，后者包括HTML元素节点。

#### NodeList API

类似于数组，Node.childNodes document.querySelectorAll() 可以获取；结果是一个伪数组，具有 length 和 forEach， for循环，但是不具有数组的其他属性方法，可以使用call，apply 方法将其转化成数组。

`let children = document.body.childNodes; Array.prototype.slice.call(children);`

注意：结果可能是一个动态实例：获取后，如果DOM发生变化，那么属性也会发生变化。

~~~js
children.forEach((item, index, children) => {
  console.log(item);
});
children.length
chilfren.item(0) 返回索引位置的子节点

values，keys, entries 返回的是ES6的遍历器
for (let entry of children.entries()) {
  console.log(entry);
  // Array [ 1, <script> ]
}
~~~

#### HTMLCollection API

不能使用forEach 遍历 document.links document.forms document.images

如果某个元素具有id或者name属性，那么可以通过点语法获取这个节点

`document.getElementById('pic') === document.iamges.pic`

~~~js
HTMLCollection.length
HTMLCollection.item(1)
HTMLCollection.nameItem('pic') 
// <img id="pic" src="http://example.com/foo.jpg">
~~~

### 8.4 parentNode childNode

拥有子节点的Node才能继承 parentNode 的属性（Element，document， DocumentFragment）

~~~
parentNode.children
parentNode.firstElementNode
parentNode.lastElementNode
parentNode.childElementCount === 10
parentNode.append(div, 'hello'); //加到最后一个节点后面
parentNode.prepend(); // 加到最前面节点
~~~

子节点

~~~js
node.remove()
node.before(div);
node.after(div);
node.replaceWith(newNode);
~~~

### 8.5 Document Node

document 表示整个文档，可以使用 window.document 或者 document 获取对象。document 继承了 Node ParentNode EventTarget 的属性和方法。下面是常用的属性和方法

#### 属性

常见属性

~~~js
document.default === window //返回window对象(如果不是window的document就返回null，例如 Ajax 或者 iframe 创建的document，很少用到)
document.doctype === "<!DOCTYPE html>"
document.doctype.name === 'html' // 返回文档类型
document.documentElement => 返回HTML节点
document.body
document.head
document.scrollingElement =>返回当前滚动的元素
document.activeElement =>返回当前活动的元素(获取焦点的input表单等)
document.fullscreenElement.nodeName === 'VIDEO' 当前全屏的元素(如果是video，证明用户在全屏观看视频等)
~~~

节点集合属性

下面的属性返回文档的节点组合动态集合（如果内部节点变化，返回值也会随时更新）

~~~js
document.links
documents.forms
document.images
document.plugins
document.embeds
// 上面都返回一个 HTMLCollection
document.styleSheets
~~~

文档静态信息属性

~~~js
document.URL
document.documentURL
// 如果anchor变化，那么这两个属性都会发生变化
document.domain 返回当前文档的域名，不包括协议和端口
document.location 很常用
document.lastModified 最近更改的时间
document.title
document.characteret
document.referrer
document.dir 
document.compatMode // 兼容模式或者严格模式
~~~

文档状态属性

~~~js
document.hidden // 当前界面是否最小化(或者其他tab活动)
document.visibilityState // 文档可见状态(在渲染的哪个阶段)？结果是可见、不可见、正在渲染、已经卸载
document.readyState // loading(加载HTML) interactive(HTML加载完毕，加载外部的图片CSS) complete(加载完毕)，状态改变会触发 readystatechange 事件，在首屏优化功能会用到这部分。
document.cookie
document.designMode //文档的编辑模式(如果'on'，界面中可编辑HTML)，这样对于调试界面截屏很常用
document.implemention //返回一个DOMImplemention对象，可以创建新的XML
~~~

#### 方法

~~~js
document.open(); 清除文档当前内容(界面会空白)，文档成为可写状态
document.close(); 关闭 open 方法打开的文档。
document.write('hello'); 在界面中写入HTML(如果界面中已有内容，首先执行open方法清空界面)
document.writeln('hello'); 类似上面的方法

document.querySelector();
document.querySelectorAll(); 加入CSS选择器，选择符合标准的第一个或者全部DOM对象(不支持伪元素和伪类选择器)返回的结果是静态的节点，不会随着界面变化而变化
document.querySelectorAll('DIV:not(.ignore)'); // 选中div元素，那些 class 含 ignore 的除外
document.getElementsByTagName('p')
document.getElementsByClassName('foo bar');
注意：HTML标签对于大小写不敏感，但是CSS类名对于大小写敏感(类名选择器更重要)
getElementsByName('x') 获取HTML中name是x的元素组合  <form name="x"></form>
getElementById('wrap'); 这个效率比 querySelectorAll('#wrap')效率高很多

document.elementFromPoint(50, 50) 获取界面中坐标位置的最上层元素
document.elementsFromPoint(50, 50) 获取界面中坐标位置的全部元素
document.caretPositionFromPoint() 返回一个CaretPosition对象，包含了指定坐标点在节点对象内部的位置信息
document.createElement('div') 这里可以使自定义的标签名，不能包含尖括号
document.createTextNode('Hello') 创建一个文本节点，返回的节点是文本节点(不是HTML)所以可以很好的处理XSS，展示用户的输入，会对特殊符号进行转义，即使含有恶意代码也不会出现XSS攻击。不能对双引号转义
createAttribute('name') 创建属性名
setAttribute('name', "Mike") 设置属性名

let a = document.createAttribute('name');
a.value = 'Michael';
等价于
document.setAttribute('name', "Michael");
createComment 返回一个注释节点，传入的是字符串
var documentFragment = document.createDocumentFragment(); 这部分DOM存在于内存中，不属于当前的文档，可以生成一个复杂的DOM，然后一次性插入到文档中，对这个文档片段的改动不会引发网页的重新渲染（比直接修改DOM要好）。

var event = document.createEvent(); 创建一个事件对象
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  console.log(e.type); // "build"
}, false);
触发这个事件
document.dispatchEvent(event);

var e = document.createEvent('Event');
e.initEvent('click', true, true);
document.addEventListener('click', function() {
  console.log(e.type); 'build'
}, falsse);
document.dispatchEvent(e);

// 增加移除事件监听
document.addEventListener('click', listener, false);
document.removeEventListener('click', listener, false);
var e = new Event('click');
document.dispatchEvent(e); // 触发事件


// 后面这些API基本没有听过用过，现在了解一下
document.hasFocus() 当前文档是否有元素激活或者获取焦点
document.adpotNode() 
// adpotNode 将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点。document.adoptNode方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所以，还要再用appendChild方法或insertBefore方法，将新节点插入当前文档树。
document.importNode()
// 从原来所在的文档或DocumentFragment里面，拷贝某个节点及其子节点，让它们归属当前document对象。同理需要将新节点插入当前的文档树

document.createNodeIterator() 返回一个子节点的遍历器。第一个参数是需要遍历的根节点，第二个参数是遍历的节点类型，例如下面返回的就是元素节点的遍历
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

document.createTreeWalker() 返回一个 DOM 的子树遍历器
~~~

在设计模式开启或者可编辑状态时，可以使用下面的几种方法执行指令.

~~~js
if (document.designMode === 'on' || node.contenteditable === true) {
  document.execCommand(command, showDefaultUI, input);
}
第一个参数是改变的命令(createLink)，第二个参数表示是否使用默认用户界面(default：false)，第三个参数是命令的具体值（url）。具体的命令很多，包括加粗、全选、删除等。这个API具有兼容性，所以可以通过后面两个API监测某个命令是否可以使用，返回值都是布尔值。
if (document.queryCommandEnabled('SelectAll')) {
  // 监测浏览器是否兼容，then use this API
}
if (document.queryCommandSupported('SelectAll')) {
  // 监测当前是否可以使用摸个命令(例如必须选中文本后才能给文本加粗)，没选中就不能使用Blod命令
}
~~~

document.getSelection() 指向 window.getSelection()

### 8.6 Element Node

元素节点：HTML标签渲染成Node树节点就是元素节点，nodeType == 1。元素节点是多种节点的一个集合，继承了Node节点的属性和方法。

#### 属性

1、元素特性属性

~~~js
Element.id  获取元素节点的ID，对于大小写敏感，可读写 // id='wrap'
Element.tagName === node.nodeName === 'SPAN' 返回节点的大写名称
Element.dir 'ltr' 'rtl' 获取文本排列的方向
ELement.accessKey = 'h' 设置当前元素的快捷键(Alt+h)
element.dragment 元素节点可拖拽(属性可读写)
element.lang 返回当前HTML的语言
element.tabIndex 当前元素在按下Tab键遍历的顺序，如果是-1，Tab键不会遍历到这个元素
element.title 当前元素的标题(鼠标经过时系统提示文本)
~~~

2、元素UI状态属性

~~~js
element.hidden  权重小于CSS的设置，如果CSS已经设置hidden或者none，这里无效
element.contentEditable 用户是否可以编写HTML(通常是default),这个属性可读写
element.isContentEditable 读写的状态，不可写
~~~

3、元素HTML属性

~~~js
element.attributes 返回一个属性的伪数组
element.className 返回类名的字符串，使用空格分开
element.classList 返回类名的伪数组，具有下面API
	add
  remove
  contains
  toggle('sf-color', true) 这个很常用，可以切换元素节点的样式和行为；第二个参数可选，true表示增加属性
  toString
  item(0) 返回某个索引位置的类名

foo.className += 'sf-color';
foo.className.replace(/^sf-color$/, '');
foo.classList.add('sf-color'); // 不是数组不能直接使用push
foo.classList.remove('sf-color');

element.dataset 获取元素节点的 data- 属性，结果是一个对象，对象可读写。使用 getAttribute setAttribute 同样可以读写 data 属性。这里可以存放时间戳等属性(如果ID已经存放其他值，这里可以存放一部分信息)

element.innerHTML 返回节点内部的HTML 可读写(这里返回的字符串会把特殊符号转化，如果只获取完整文本，可以使用textContent 属性)。当设置一个节点的 innerHTML 时，如果参数字符串包含HTML标签，就会渲染，存在风险；包含的Script标签不会执行(如果传入img标签，然后指向不安全网站)

element.outerHTML 返回节点内部的HTML和当前节点的HTML，如果当前节点没有父节点(新创建的节点)，会报错
~~~

4、元素尺寸

~~~js
element.clientHeight element.clientWidth 返回元素的高度和宽度(如果元素是行内元素，返回的是0，如果CSS中给定元素的尺寸，返回的就是固定值，否则返回界面中实际渲染的值)包括padding ,不包括border和滚动条。
document.body.clientHeight 网页总高度；document.documentElement.clientHeight 视口高度

clientLeft clientTop 返回元素左边框和顶部边框的宽度(不包括内外边距)，返回的是整数

scrollHeight scrollWidth 返回元素的总高度和总宽度(溢出隐藏的部分也会计算，包括内部的伪元素伪类的尺寸)

scrollLeft scrollTop 元素滚动的距离(没有滚动条的元素始终返回0)

offsetParent 获取当前元素外部的一个父元素(这个元素position不是继承的static)，所以父元素一定要相对定位(position relative，如果是继承的话，高度就计算错误了)如果元素是不可见的，或者固定定位，那么父元素是null。

offsetWidth offsetHeight 表示元素的高度和宽度(包括边界和滚动条)，只读
offsetLeft offsetTop 表示元素距离左侧和顶部元素的距离

element.style 设置行内样式(可读写)
~~~

5、子元素属性

~~~js
element.children 获取子节点(只有元素类型子节点，不包括注释节点文本节点)
element.childElementCount === element.children.length
element.firstElementChild element.lastElementChild
element.nextElementSibling element.previousSibling
~~~

#### 方法:a:

~~~js
getAttribute('name');
getAttributeNames();
setAttribute('name', "Michale");
hasAttribute('name');
hasAttributes();
removeAttribute('name')

querySelector('#wrap, p')
querySelectorAll('p, div')
node.getElementsByClassName(''); 结果是动态的伪数组
node.getElementsByTagName('')
node.closest('div'); 返回距离当前节点的满足条件的最近的节点(包括自己)
node.match('div') return true or false

事件的API
node.addEventListener('click', function(){..});
node.removeEventListener('click', function(){});
let event = new Event('click');
node.dispatch(event);

element.scrollIntoView(true) 滚动当前元素到浏览器的可见区域，默认参数是true，表示元素的顶部和可见区域的顶部对齐，如果传入的是false，元素的底部和可见区域的底部对齐。

element.getBoundingClientRect() 返回当前元素对应的矩形的坐标对象，具有 x y height width left right top bottom 表示元素相对于视口的位置。这些属性包括内边距和边框。

element.getClientRects() 返回一个伪数组，就是元素对应矩形的参数的伪数组(上面对象属性构成的伪数组) height width left right top bottom 这个方法决定于行内元素是否换行，行内元素每一行的位置偏移。

element.insertAdjacentElement(position, element); 相对于当前元素的指定位置，插入一个新的节点。

element.insertAdjacentHTML();
element.insertAdjacentText();
将一段HTML或者文本插入临近的节点

element.remove() 将当前节点从父节点移除
element.focus()
element.blur()
element.click() 模拟了一次鼠标点击，相当于click事件
~~~

### 8.7 属性的操作

元素节点具有属性集合，attributes，其他节点都是null。属性集合对应HTML中的各种属性，是一个动态的伪数组。可以通过伪数组的下标或者键，获取对应的值，每一项是键值对。（id="wrap"）

标准属性：例如id，class，src；非标准属性可以是用户自定义的属性(data-*)。自定义属性需要使用data-开始，这样可以通过验证。一个元素节点创建出来后就会具有标准属性。注意，JSX 中使用 HtmlFor, className 代替。

API

~~~js
getAttribute('id')
getAttributeNames()
setAttribute('id', 'wrap')
hasAttribute('id')
hasAttributes()
removeAttribute('wrap')
~~~

### 8.8 text Node

text 节点是元素节点和属性节点的子节点，空格也是一个文本节点。

属性

~~~js
data 等于 value 返回当前文本节点的内容(字符串)
wholeText 返回当前文本节点和相邻文本节点对的全部文本(如果有)
length 返回文本节点的长度
nextElementSibling previousElementSibling 返回同级别节点(如果有)
~~~

方法

~~~js
appendData('test') 在结尾增加字符串
deleteData(startID, length)
insertData(startID, 'test')
replaceData(startID, length, 'test')
substringData(startId, length) 截取字符串
remove() 移除当前节点
splitText(position) 将一个文本节点切割成两部分，参数就是切割的位置
normalize(); 把内部两个相邻文本节点合并

let p = docuemnt.getElementById('test');
let textNode = p.firstChild();
let newTextNode = textNode.splitText(3);

p.chlidNodes.length === 2
p.normalize();
p.childNodes.length === 1
~~~

### 8.9 DocumentFragment Node

文本片段节点，没有parentNode，可以存放文本片段，在这里存放文本片段的速度比直接操作DOM快速，继承自Node和parentNode节点，所以具有继承的属性。children ,firstElementChildren, lastElementChilden, childElementCount 等属性。

### 8.10 CSS操作

https://wangdoc.com/javascript/dom/css.html

使用 JS 去操作 CSS 来更改界面样式

#### 1、使用DOM操作CSS

直接改变DOM中的属性节点 setAttribute('style', 'color: pink;')；改变行内样式 

#### 2、CSS 的 StyleDeclaration 对象

可以通过这个对象的实例 elementNode.style 来改变样式（这里的 style 对象是键值对，键需要驼峰命名，值全部是字符串，不能写数值）

~~~js
let cssStyle = documenty.getElementById('wrap').style;

// 下面是CSS对象的属性
cssStyle.cssText = ''; // 这个属性可以获取、清除全部行内属性
cssStyle.length // return inner line style number

// 实例方法
cssStyle.getPropertyPriority('color')
// if (color: #fff !important;) return 'important'; else return '';
cssStyle.getPropertyValue('color') === '#fff';
cssStyle.removeProperty('color')
cssStyle.setProperty('color', '#fff', 'important') // important is not necessary
cssStyle.item(0) === 'color'
~~~

#### 3、CSS 模块的侦测

监测浏览器兼容性，判断浏览器某个属性是否是字符串（如果支持这个属性，但是没有设置，就会返回一个空字符串，如果不支持就返回undefined）。

~~~js
typeof cssStyle['webkitAnimation'] === 'string';
~~~

那么可以创建一个函数判断是否支持这个属性

~~~js
function isPropertySupported(property) {
  // 处理兼容的属性
  if (property in document.body.style) {
    return true;
  }
  // 处理非兼容的属性(这里可以获取浏览器的名称，然后加上定向前缀，当然这样也是可以的)
  var prefixes = ['Moz', 'Webkit', 'o', 'ms', 'Khtml'];
  var prefProperty = property.charAt(0).toUpperCase + property.subStr(1);
  for (let i = 0; i < prefixes.length; i++) {
    if ((prefixes[i] + prefProperty) in document.body.style {
       return true;
    }
  }
  return false;
}
isPropertySupported('background-clip')
~~~

#### 4、CSS 对象的静态方法

CSS.escape('foo#foo') 使用 document.getElementById('wrap'), 如果内部字符串含有特殊字符，使用这个方法转换后可以进行茶轩；CSS.supports('width', '100px') CSS.supports('width: 100px') 可以监测当前环境是否支持这种类型的样式，第二种写法不能加入分号。

#### 5、window.getComputedStyle

前几种方法是获取静态的样式，实际上的样式是浏览器计算结果，这个API可以获取计算后的结果。

let cssStyle = window.getCOmputedStyle(div, ':after') 第二个参数是可选参数，获取的对象是动态变化的实际渲染对象（只读）；可以通过点语法获取具体的样式；获取的结果是绝对的计算结果（px rgb）需要通过单个属性（font-size）而不能直接获取font的属性。

界面上可以用这个方法获取伪元素的实际样式

#### 6、styleSheets API

document.stylesheets 网页全部的样式表（外部样式或者内联样式的伪数组）或者获取单一元素的样式表

elementNode.sheet 这个对象具有很多属性（title disabled media href...）

styleSheet.insertRule('#block { color: white }', 0) 给0条样式表增加一条规则

styleSheet.deleteRule(1) 删除1条样式表的规则

界面添加样式表的方法：添加style节点或者link节点

### 8.11 Mutation Observer

#### 1、观察器定义

Mutation observer API 观察器：可以监视DOM节点的变动。节点属性文本的增减可以通过这个API监测到。和Event的区别是，event是同步触发（DOM变动后就会触发事件）observer是异步触发，界面中的DOM操作全部做完后才触发这个API，而且可以避免频繁的事件触发（拖动事件可能几千次，最后在observer中只触发一次，但是event中会触发多次）总结一下具有三个特点：

- 异步触发
- 避免频繁触发（把所有的事件封装在一个数组中处理）
- 可以选择性记录DOM变动类型

#### 2、观察器构造函数

构造函数创建观察器实例

~~~js
let observer = new MutationObserver((mutations, observer) {
	// mutations 是事件构成的数组，observer 是返回的观察器实例，构造函数传入的参数是回调函数
  mutations.forEach((mutation) => {
		console.log(mutation);
  });
});
~~~

#### 3、实例方法

~~~js
let options = {'childList': true, 'Attributes': true, 'characterData': false};
observer.observe(div, options);
// 观察div上面的options变化情况  characterData 节点内容或者节点文本的变化

let insertedNodes = [];
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    for (let i = 0; i : mutation.addedNodes.length; i++) {
      insertedNodes.push(mutation.addNodes[i]);
    }
  });
  console.log(insertedNodes);
});
let options = { childList: true };
observer.observe(document, options);
// 注：教程上options的键不同，第一个案例是字符串，第二个是直接的 childList，应该第一个正确。

observer.disconnect(); // 停止监听DOM的变动
let changes = observer.takeRecords(); // 保存观察器没有处理的其他变动(处理到的部分在回调函数中实现)
~~~

#### 4、mutationRecord 对象

DOM 变化一次会产生一个 MutationRecord 对象的实例。具有很多属性

~~~js
type target addedNodes removedNodes previousSibling nextSibling oldValue
~~~

#### 5、使用案例

~~~js
// 监听子元素的变动
var callback = function (records){
  records.map(function(record){
    console.log('Mutation type: ' + record.type);
    console.log('Mutation target: ' + record.target);
  });
};

var mo = new MutationObserver(callback);

var option = {
  'childList': true,
  'subtree': true
};

mo.observe(document.body, option);

~~~

属性的变动

~~~js
var callback = function (records) {
  records.map(function (record) {
    console.log('Previous attribute value: ' + record.oldValue);
  });
};

var mo = new MutationObserver(callback);

var element = document.getElementById('#my_element');

var options = {
  'attributes': true,
  'attributeOldValue': true
}

mo.observe(element, options);
~~~

取代 DOMContentLoaded 事件

~~~js
(function(win){
  'use strict';

  var listeners = [];
  var doc = win.document;
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
  var observer;

  function ready(selector, fn){
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if(!observer){
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该节点是否已经在DOM中
    check();
  }

  function check(){
  // 检查是否匹配已储存的节点
    for(var i = 0; i < listeners.length; i++){
      var listener = listeners[i];
      // 检查指定节点是否有匹配
      var elements = doc.querySelectorAll(listener.selector);
      for(var j = 0; j < elements.length; j++){
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if(!element.ready){
          element.ready = true;
          // 对该节点调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready;

})(this);

// 使用方法
ready('.foo', function(element){
  // ...
});
~~~
