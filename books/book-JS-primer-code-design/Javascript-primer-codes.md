#  Javascript高程



11.1 选择符
querySelector()
querySelectorAll()
11.2 元素遍历
对于元素间的空格，IE9及之前的版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样就导致了使用childNodes与firstChild等属性时的行为不一致。为了弥补这一差异，而同时又保证DOM规范不变，Element Traversal 规范新定义了一组属性。

```js
childElementCount //返回子元素(不包括文本节点和注释)的个数
firstElementChild //指向第一个子元素
lastElementChild  //指向最后一个元素
previousElementChild //指向前一个同辈元素
nextElementSibling  //指向后一个同辈元素
```
11.3 HTML5
与类相关的扩充
新增getElementsByClassName('class') 
接收一个参数，即一个包含一或多个类名的字符串， 
返回带有指定类的所以样元素的NodeList。传入多个类名时，类名的先后顺序不重要。
新增classList
```js
var div = document.getElementById('div'); //获取元素
var classNames = div.className.split(/\s+/);  //将元素的class属性划分为数组
for (var i=0, var len=classNames.length; i < len; i++) {
    if (classNames[i] == "user") {  //遍历比对，找到位置
        break;
    }
}
classNames.splice(i,1);  //删除类名
div.className = classNames.join(" "); 将剩下的类名拼接成字符串并重新设置
```
以往删除一个类名需要如上述代码所示。 
classList还定义了4种方法 
- add(value) 
- containers(value) 
- remove(value) 
- toggle(value)

焦点管理
元素获得焦点的方式有页面加载，用户输入和在代码中使用focus()方法。 
1. document.activeElement 
    这个属性会始终引用DOM中当前获得了焦点的元素。默认情况下，文档刚刚加载完成，指向的是body元素，加载期间为null。 
2. document.hasFocus() 
    用于确定文档是否获得了焦点。

插入标记
innerHTML属性
outerHTML属性
insertAdjacentHTML方法
11.4 专有扩展
children属性
由于IE9之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此出现了children属性。这个属性是HTMLCollection的实例，只包含元素中同样还是元素的子节点。除此之外与childNodes没有什么区别。

contains()方法
出发点：在实际开发中，经常需要知道某个节点是不是另外一个节点的后代。 
调用contains()方法的应该是祖先节点，这个方法接收一个参数，也就是要检测的后代节点。返回布尔值。

插入文本
innerText 属性
textContent属性
outerText属性
--------------------- 
表单的基础知识
获取表单的方式： 

1. 通过id等方式找到 
2. 通过document.forms获取文档对象上所有的表单。

提交表单
用户点击提交按钮或者图像按钮的时候，就会提交表单。 
<input type="image" src="./ionic.png">
只要表单上存在提交按钮或者图像按钮，那么在相应表单拥有焦点的时候，按下回车键就可以提交表单。（textarea是例外，会换行） 
以上述方式提交时，会首先出发submit事件。我们可以通过阻止这个事件的默认行为就可以取消表单提交。
```js
var testForm = document.getElementsByClassName('test-form')[0];
testForm.addEventListener('submit', function(e) {
  e.preventDefault();
  //验证部分的代码
  //验证通过
  testForm.submit()//以编程的方式调用subimt()方法也可以提交表单，不会触发submit事件

});
```
重置表单
使用type为reset的input或者button可以创建重置按钮，点击会触发reset事件。 
一样可以阻止也可以以编程方式触发。与submit不同，reset会触发reset事件。

表单字段
使用原生的DOM方法访问表单元素，每个表单都有elements属性，该属性是表单中所有表单元素的集合。 
这个elements集合是一个有序列表。另外如果给表单元素添加了name属性，则该元素也会以name暴露给elements集合。 
所以可以同时以位置和name特性访问。 
注：如果多个表单元素name相同，则返回一个NodeList。

方法
每个表单元元素都有focus()与blur()这两个方法。html5为表单字段新增了一个autofocus属性。 
<input type="text" name="first-name" autofocus>

在早期，没有readonly方法，因此可以调用blur()方法来创建只读字段。

事件
blur
focus
change 失去焦点且value的值改变时触发 
注意：blur与change事件在不同浏览器中触发顺序不同。
--------------------- 


DOM2的模块划分
DOM2级核心
DOM2级视图
DOM2级事件
DOM2级样式
DOM2级遍历和范围
DOM2级HTML
样式
HTML中定义样式的方式有3种：<link>引入外部样式表文件，使用<style>元素定义嵌入式样式,以及使用style特性定义针对特定元素的样式。

访问元素的样式
style属性 任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性。包含着通过HTML的style特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。
计算的样式 getComputedStyle 
可以获取来自3者的所有计算后得到的样式,但是只读，不可写。 
getComputedStyle(div).color 
document.defaultView.getComputedStyle(div).color 
getComputedStyle即是window的方法，也是document.defaultView的方法。接收2个参数，第一个为目标元素，第二个为伪类。
操作样式表 
document.styleSheets包含通过<link>与<style>定义的样式表。
元素大小
偏移量offset dimension 
包括元素在屏幕上占用的所有可见的空间，元素的可见大小由其高度和宽度决定，包括所有的内边距，滚动条和边框大小(不包括外边距)。 
offsetHeight
offsetWidth
offsetLeft
offsetTop 
其中，offsetTop与offsetLeft与包含元素有关，包含元素的引用保存在offsetParent属性中。 
offsetParent属性不一定与parentNode的值相等。例如，元素的offsetParent是作为其祖先元素的元素，因为
是在DOM层次中距
最近的一个具有大小的元素。
//想要获取某个元素在页面上的偏移量，需要将这个元素的偏移量与其offsetParent的偏移量相加，循环到根元素
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;

    }
    return actualLeft;
}
1
2
3
4
5
6
7
8
9
10
11
客户区大小 client dimension 
元素的客户区大小指的是元素内容及其内边距所占据的空间大小。

clientWidth
clientHeight
滚动大小 scroll dimension

scrollHeight //在没有滚动调到情况下，元素内容的总高度
scrollWidth
scrollLeft
scrollTop
元素大小 getBoundingClientRect
遍历
NodeIterator 
document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,filter,false) 
另外还有两个方法：

nextNode()
previousNode()
TreeWalker 
TreeWalker是NodeIterator的高级版本。并额外提供了5种方法。

parentNode()
firstChild()
lastChild()
nextSibling()
previousSibling()
范围 document.createRange()
在创建范围的时候，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档的片段之中。
--------------------- 


10.1 结点层次
10.1.1 Node类型
文档结点document是每个文档的根节点，document只有唯一子节点元素。 
每个结点都有一个nodeType属性，用于表明节点的类型。

例：document.getElementsByTagName('html')[0].nodeType

节点的有12个类型，分别由1-12这12个数字表示。 
例：Node.ELEMENT_NODE这个值为1。(IE中无效，因为IE没有公开Node类型的构造函数，所以为了跨浏览器兼容，还是将nodeType于相应的数值进行比较)

childNodes
每个结点都有一个childNodes属性，其中保存着一个Nodelist对象，Nodelist是一个类数组对象，用于保存一组有序的结点，可以通过位置来访问这些结点。(并非Array实例，他是基于DOM结构动态执行查询的结果)

注意 
在DOM中childNodes共5个节点类型：Element，Text，Attr，Comment，CDATASection。可用childNodes[i].nodeType == ELEMENT 对childNodes进行过滤.

document.getElementsByTagName('html')[0].childNodes;  //类数组对象，保存一组有序的节点
document.getElementsByTagName('html')[0].childNodes[0]; //  
document.getElementsByTagName('html')[0].childNodes.item(0);
document.getElementsByTagName('html')[0].childNodes.length;
document.getElementsByTagName('html')[0].childNodes[0].nextSibling;  //查找第一个子节点的下一个兄弟结点
document.getElementsByTagName('html')[0].childNodes[1].previousSibling;
//查找第二个子节点的上一个兄弟结点
1
2
3
4
5
6
7
function convertToArray(nodes){  //将childNodes转化为数组
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes,0);
    }catch(ex){
        array = new Array();
        for (var i = 0,len = nodes.length; i < len; i++) {
            array.push(nodes[i]);
        }
    }
    return array;
}
1
2
3
4
5
6
7
8
9
10
11
12
操作结点
someNode.appendChild(newNode) 
注意：如果传入的结点已经是该文档的一部分，那结果就是将该结点从原来的位置转移到新的位置，DOM树可以看成是由一系列指针连接起来的，但任何DOM结点也不能同时出现在文档的多个位置
someNode.insertBefore(newNode,someNodeChildNode)
someNode.replaceChild(newNode,someNodeChildNode)
someNode.removeChild(someNodeChildNode) 
在使用replaceChild的时候，该结点的所有关系指针都会从被他替换的结点复制过来，尽管从技术上讲，被替换的结点还在文档中，但是他在文档中已经没有自己的位置(removeChild也如此)
someNode.cloneNode(true/false)
normalize()
1-4操作的都是某个结点的子节点(使用parentNode属性).但是并不是所有结点都有子节点，如果在不支持子节点的节点上调用上述方法会报错。

10.1.2 Document类型
在浏览器中document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个html页面 
- document.getElementById('id') 
- document.getElementsByTagName("tag") 
- document.getElementsByName('name')

后两个返回的是HMTLCollection对象和childNodes一样会跟随当前文档内容的更新而更新.

document.write() 在页面加载过程中则与writeln一致，如果加载完成后使用则会重写页面
document.writeln()
10.1.3 Element类型
getAttribute
setAttribute
removeAttribute
前2个多在自定义属性中使用。 
element.attributes 
包含一个NamedNodeMap,与childNodes一样，也是一个动态的集合。 
element.attributes往往在遍历元素的特性时使用，如下，遍历元素特性，并将其构造成 
name="value",name="value"的形式.

function outputAttributes(element){
    var pairs = new Array(),
        attrName,
        attrValue,
        i,
        len;
    for (i = 0,len=element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        pairs.push(attrName + "=\"" + attrValue + "\"");
    }
    return pairs.join(",");
}
1
2
3
4
5
6
7
8
9
10
11
12
13
10.1.4 Text类型
document.createTextNode()

10.1.8 DocumentFragment 类型
DOM规定文档片段 documentfragment是一种“轻量级”的文档，虽然不能把它直接添加到文档中，但是可以把它当成仓库使用。

10.2 DOM操作技术
var divs = document.getElementsByTagName('div');,
    i,
    div;
for (var i = 0; i < divs.length; i++) {
    div = document.createElement("div");
    document.body.appendChild(div);
}
1
2
3
4
5
6
7
以上代码，i永远也不会等于divs.length,因为每次比较时，都将会对现有的div元素进行查询，因此每次div.length会随着i一起递增，永不相等。 
因此要想迭代Nodelist及其近亲NamedNodeMap和HTMLCollection,则必须考虑到这三者都是动态的集合，会实时更新。所以，我们因该尽量减少对这三者的访问，而是将其值用变量缓存起来。

结语
本章主要是JavaScript对DOM1级的实现。 
几个常用的选择器注释：

document.getElementById('id'); //只可以通过document调用
document.getElementsByTagName('tag');//只可以通过document调用
getElementsByName('name')  //可以通过document与所有的html元素调用
getElementsByClassName('class');//可以通过document与所有的html元素调用
--------------------- 
8.1 window 对象
全局作用域
全局变量不能通过delete删除，而直接在window上定义的的属性可以

var age =29;
window.color ="red";
console.log(delete window.age); //在IE<9时抛出错误，在其他浏览器中返回false
console.log(delete window.color); //在IE>9时抛出错误，在其他浏览器中返回true
1
2
3
4
使用var 语句添加的window属性有一个名为[[Configurable]]的特性，这个特性的值被设置为 
false，所以无法通过delete删除。

另外，尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

var newValue = oldValue; //这里会报错，因为oldValue未定义
var newValue = window.oldValue;  //不会报错，因为这是一次属性查询，值为undefined
1
2
iframe与frame的区别
iframe与frame的区别

间歇调用和超时调用
var timeoutId =setTimeout("console.log('hello')",1000)  //返回一个数值id，这是唯一标识符，用他来取消调用
var intervalId = setInterval(function(){
    console.log("hello")
    },1000)
1
2
3
4
在开发环境下，很少真正的使用间歇调用setInterval，因为后一个间歇调用可能会在前一个间歇调用结束之前启动。

系统对话框
alert(),confirm(),prompt() 
这三个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行。

location对象
location.replace()这个方法只接受一个参数，即要导航到的URL,结果会导致浏览器位置的改变，但是不会生成浏览记录。 
location.reload()如果不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载。需要输入参数true。

navigator对象
screen对象
history对象
history.go(-1)//后退一页
history.go(+1)//前进一页
history.go("baidu.com")//返回到历史记录中包含该字符串的第一个位置
--------------------- 
最佳实践
24.1 可维护性
24.1.1 什么是可维护性
可理解性
直观性
可适应性
可扩展性
可调试性
24.1.2 代码约定
可读性 
注释，合理的缩进
有意义的变量和函数命名 
一般命名规则：变量名应该为名词；函数名应该动词开始；
24.1.3 松散耦合
解耦html与JavaScript
解耦css与JavaScript
解耦应用逻辑与事件处理程序
24.1.4 编程实践
尊重对象所有权（如果你不负责创建或者维护某个对象，那么就别对他们进行修改）
避免全局变量
避免与null进行比较
使用常量（将数据从应用逻辑中分离出来，以方便修改与国际化）
24.2 性能
24.2.1 注意作用域
避免全局查找 
访问全局变量总是要比访问局部变量慢，因为需要遍历作用域链，所以将多次使用的全局变量存储于局部变量总是没错的。
避免with语句
24.2.2 选择正确的方法
避免不必要的属性查找 
使用变量和数组要比访问对象的属性更有效率，后者是一个O(n)的操作
优化循环 
减值迭代
简化终止条件
简化循环体
使用后测试循环
展开循环 
目标对象，大数据集–Duff装置。
避免双重解释–避免出现需要按照JavaScript来解释的字符串
24.2.4 最小化语句数
多个变量声明 
var count = 5; 
var color = red; 
var value = [1,2,3]; 
改为： 
var count = 5, 
color = red, 
value = [1,2,3];
插入迭代值 
var name = values[i]; 
i++; 
改为： 
var name = values[i++];
使用数组和对象字面量创建
24.2.4 优化DOM交互
最小化现场更新，使用文档碎片
使用innerHTML 
当把innerHTML设置为某个值时，后台会创建一个html解析器，然后使用内部的DOM调用来创建DOM结构；而非基于JavaScript的DOM调用。
使用事件代理
注意HTMLCollection 
任何时候要访问HTMLCollection，都会在文档上进行一次查询，最小化访问HTMLCollection可以极大的改进性能。 
发生以下情况时，会返回HTMLCollection; 
进行了对getElementsByTagName()的调用
获取了元素的childNodes属性
获取的元素的attributes属性

访问了特殊的集合，如document.forms,document.images
--------------------- 
事件流
事件流描述的是从页面中接收事件的顺序。IE的事件流是事件冒泡流，Netscape的事件流是事件捕获流。 
事件冒泡流：嵌套最深的结点最先接收事件。 
事件捕获流：document对象最先接收事件。

var test = function (el){
    el.addEventListener('click', function() {
        console.log(el.id);
    },false);
    el.addEventListener('click', function() {
        console.log(el.id);
    },true);
}

var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var ip = document.getElementById('input');
test(one);
test(two);
test(three);
test(ip);

输出：
one
two
three
input
input
three
two
one
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
HTML事件处理程序
在HTML中，某个元素支持每种事件，都可以使用一个与之相应事件的处理程序同名的HTML特性来指定。 
独到之处 
首先，这样会创建一个封装着元素属性值的函数。这个函数中有一个局部变量event也就是事件对象。在这个函数内部，this值等于事件的目标元素。 
两个缺点 
首先存在一个时差问题，因为用户可能会在HTML元素一出现在页面上就触发相应的事件，但当时事件的处理程序有可能尚不具备执行条件。为此，很多html事件都会用try{}catch(ex){}来封装。 
第二，HTML与JavaScript紧密耦合。

书中提到使用with,来扩展作用域，而《JavaScript精萃》里说

with的本意是减少键盘输入。比如 
　　obj.a = obj.b; 
　　obj.c = obj.d; 
可以简写成 
　　with(obj) { 
　　　　a = b; 
　　　　c = d; 
　　} 
但是，在实际运行时，解释器会首先判断obj.b和obj.d是否存在，如果不存在的话，再判断全局变量b和d是否存在。这样就导致了低效率，而且可能会导致意外，因此最好不要使用with语句。

DOM0级事件处理程序
将一个函数赋值给一个事件处理程序属性。以这种方式添加的事件处理程序会在冒泡阶段被处理。

document.getElementById('myButton').onclick = function(){
    console.log(this.id);
};
document.getElementById('myButton').onclick = null;  //删除事件处理程序
1
2
3
4
注意，在这些代码运行以前不会指定事件处理程序，因此如果这些代码在页面中位于按钮后面，就有可能在一段时间内怎么单击都没有反应。 
使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行，换句话说，程序中的this引用当前元素。

DOM2级事件处理程序
addEventListener与removeEventListener 
使用DOM2级方法的好处在于可以为同一个事件添加多个事件处理程序。 
使用addEventListener添加的事件处理程序，只能用removeEventListener删除，且匿名函数无法删除。

IE事件处理程序
IE实现了与DOM中类似的两个方法：attachEvent()与detachEvent()只接受2个参数，IE只提供冒泡流。 
与DOM0级方法的主要区别在于事件处理程序的作用域。在使用attachEvent()方法的情况下，事件处理程序会在全局作用域中运行，此时this等于window。

document.getElementById('myButton').attachEvent("onclick",function(){
    alert("first");
})
document.getElementById('myButton').attachEvent("onclick",function(){
    alert("two")
})
1
2
3
4
5
6
同时，IE的事件处理程序不是以添加他们的顺序执行，而是以相反的顺序被触发。 
dc 
在以上中使用addEventListener与attachEvent,最好不要使用匿名函数，因为去除时，任然需要将函数输入，匿名函数无法成功去除。

《JavaScript精粹》中也有相关建议如下： 
在Javascript中定义一个函数，有两种写法： 
　　function foo() { } 
和 
　　var foo = function () { } 
两种写法完全等价。但是在解析的时候，前一种写法会被解析器自动提升到代码的头部，因此违背了函数应该先定义后使用的要求，所以建议定义函数时，全部采用后一种写法。

内存与性能
在每个对象上绑定事件，即会增加dom的访问次数，而且也会大大增加event对象，造成内存占用。所以想要提高性能，就会用到委托事件。 
建立在冒泡机制之上的事件委托技术，可以有效的减少事件处理程序的数量，能够大大的提高性能，减少内存消耗。 
在两种情况下，需要注意移除事件处理程序，第一种就是从文档中移除带有事件处理程序的元素时，第二种情况是卸载页面的时候。

利用事件委托实现事件在HTML页面中的可配置
    var list = document.getElementById("mylinks");
    list.addEventListener("click", function (event) {
        switch(event.target.id){
            case "github":
                location.href="https://github.com/";
            case "baidu":
                location.href="https://baidu.com/";
            case "google":
                location.href="https://google.com/";
        }

    });
1
2
3
4
5
6
7
8
9
10
11
12
事件模拟
事件模拟分为： 
- UIEvents 
- MouseEvents 
- MutationEvents 
- HTMLEvents

    var btn = document.getElementById("myButton");
    var event = document.createEvent("MouseEvents");
    event.initEvent('click');
    btn.dispatchEvent(event);  //模拟在btn上触发event事件
---------------------
作者：WilsonLiu95 
来源：CSDN 
原文：https://blog.csdn.net/liusheng95/article/details/51263279 
版权声明：本文为博主原创文章，转载请附上博文链接！



22.1 高级函数
22.1.1 安全的类型检测
typeof，instanceof并非完全可靠。解决办法，利用 Object.prototype.toString.call(value)

22.1.2 作用域安全的构造函数
function Person(name,age,job){
    "use strict";
    if(this instanceof Person){ //防止绑定到错误的作用域中
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name,age,job);
    }
}
1
2
3
4
5
6
7
8
9
10
22.1.3 惰性载入函数
问题
因为浏览器之间行为的差异，多数JavaScript代码包含了大量的if语句，将执行引导到正确的代码中。 每次调用时，都要多浏览器所支持的能力仔细检查，但是如果支持则一直支持，没必要每次都进行能力检查。

解决方案：惰性载入

第一种：在第一次调用的过程中，将函数覆盖为另外一个合适的方式执行的函数，这样任何对原函数的调用都不要再进过执行的分支了。
function createXHR(){
  if(typeof XMLhttpRequest != "undefined"){
    createXHR = function(){  
      //codeblocks
    }
  }else if(typeof ActiveXObject != "undefined"){
    createXHR = function(){
      //codeblocks
    }
  }else{
    createXHR = function(){
      throw new Error("no XHR object avaliable.");
    }
  }
  return createXHR();
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
第二种：在声明函数时就指定适当的函数，但是在代码首次加载时会损失一点性能。
var createXHR = (function(){
  if(typeof XMLhttpRequest != "undefined"){
    return function(){  
      //codeblocks
    }
  }else if(typeof ActiveXObject != "undefined"){
    return function(){
      //codeblocks
    }
  }else{
    return function(){
      throw new Error("no XHR object avaliable.");
    }
  }
  })()
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
22.1.4 函数绑定
var handler = {
    message: "Event handled",
    handleClick: function(event){
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
btn.addEventListener("click",handler.handleClick,false);
1
2
3
4
5
6
7
8
输出 undefined

var handler = {
    message: "Event handled",
    handleClick: function(event){
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
btn.addEventListener("click",bind(handler.handleClick,handler),false);
function bind(fn,context){  //bind函数绑定作用域
    return function () {
        return fn.apply(context,arguments);
    }
}
1
2
3
4
5
6
7
8
9
10
11
12
13
22.1.5 函数柯里化
用于创建已经设置好了一个或者多个参数的函数。

function curry(fn){
    "use strict";
    var args = Array.prototype.slice.call(arguments,1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null,finalArgs);
    };
}
1
2
3
4
5
6
7
8
9
22.2 防篡改对象
22.2.1 不可扩展对象
Object.preventExtensions(person);  // person这个对象禁止扩展
Object.isExtensible(person); //判断person这个对象是否可以扩展
1
2
22.2.2 密封的对象
Object.seal(person); //密封对象，不可扩展且不能删除已有属性和方法
Object.isSealed(person);
1
2
22.2.3 冻结的对象
Object.freeze();//最为严格，[[writable]]特性为false
Object.isFrozen();
1
2
22.3 高级定时器
除了主JavaScript线程外，还有一个需要在进程下一次空闲时执行的代码队列。在JavaScript中没有任何代码是立刻执行的， 当进程一旦空闲则尽快执行。

22.3.1 重复的定时器
setInterval()的问题在于，定时器代码可能在代码再次添加到队列之前还没有完成执行，结果导致定时器代码运行好几次，而且之间没有停顿。 幸好，JavaScript引擎足够聪明，能够避免这个问题。当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。 这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

因此这样的重复定时器有两个问题：

某些间隔会被跳过
多个定时器的代码执行之间的间隔可能会比预期小。
为了解决以上问题，可以采用链式setTimeout()调用

setTimeout(function () {
  //codeblocks
        setTimeout(arguments.callee,interval);
    }, interval)
1
2
3
4
以上方式的好处在于，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何 缺失的间隔。而且，可以保证在下一次定时器代码执行之前，至少等待指定的间隔，避免了连续的运行。

22.3.2 yieldng processes
长时间运行脚本的限制，如果代码运行超过特定的时间或者特定的语句数量就不让它继续执行。 主要产生原因有：过长的，过深嵌套的函数调用或者是进行大量处理的循环。

数组分块

function chunk(array,process,context){ //如果想原array不被修改，可以使用array.concat()
    setTimeout(function () {
        var item = array.shift();
        process.call(context,item);
        if(array.length > 0){
            setTimeout(arguments.callee,100)
        }
    })
}
1
2
3
4
5
6
7
8
9
22.3.3 函数节流
浅谈javascript的函数节流 基本思想：某些代码不可以在没有间断的情况连续重复执行。

function throttle(method,context){
    "use strict";
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
        method.call(context);
    },100);
}

22.4 自定义事件
事件是一种叫做观察者的设计模式。观察者模式主要由两类对象组成：主体和观察者。 主体负责发布事件，同时观察者通过订阅这些事件来观察主体。 自定义事件背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。

function EventTarget(){
    "use strict";
    this.handlers = {};
}
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function(type,handler){
        "use strict";
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function(event){
        "use strict";
        if (!event.target){
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for (var i= 0,len=handlers.length;i < len; i++){
                handlers[i](event);
            }
        }
    },
    removeHandler: function(type, handler){
        "use strict";
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i= 0,len=handlers.length;i<len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
};

22.5 拖放
var DragDrop = function () {
    "use strict";
    var dragging = null,
        diffX = 0,
        diffY = 0;
    function handleEvent(event){
        var target = event.target;
        switch(event.type){
            case "mousedown":
                if (target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                }
                break;
            case "mousemove":
                if (dragging != null){
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                }
                break;
            case "mouseup":
                dragging = null;
                break;
        }
    }
    return {
        enable: function(){
            document.addEventListener("mousedown",handleEvent);
            document.addEventListener("mousemove",handleEvent);
            document.addEventListener("mouseup",handleEvent);
        },
        diable: function () {
            document.addEventListener("mousedown",handleEvent);
            document.addEventListener("mousemove",handleEvent);
            document.addEventListener("mouseup",handleEvent);
        }
    }
}();

DragDrop.enable();