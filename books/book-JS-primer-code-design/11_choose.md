## 十一章 选择

### 11.1 选择符

document.querySelector() 查找符合标准的的第一个元素

document.querySelectorAll() 查找符合标准的全部元素的集合

括号中填写 css 选择器，比 getElementBy 更广泛。

### 11.2 元素遍历

获取当前元素的父亲、儿子、兄弟元素。

对于元素间的空格，IE9及之前的版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样就导致了使用childNodes与firstChild等属性时的行为不一致。为了弥补这一差异，而同时又保证DOM规范不变，Element Traversal 规范新定义了一组属性。

```js
childElementCount //返回子元素(不包括文本节点和注释)的个数
firstElementChild //指向第一个子元素
lastElementChild  //指向最后一个元素
previousElementChild //指向前一个同辈元素
nextElementSibling  //指向后一个同辈元素
```

### 11.3 HTML5 新特性

新增 getElementsByClassName('class') 

接收一个参数，即一个包含一或多个类名的字符串， 返回带有指定类的所以样元素的NodeList。传入多个类名时，类名的先后顺序不重要。



#### 11.3.1 classList

新增 classList 获取某一个元素的类名列表(数组)

```js
var div = document.getElementById('div'); //获取元素
var classNames = div.className.split(/\s+/);  //将元素的class属性划分为数组
for (var i = 0, var len=classNames.length; i < len; i++) {
  if (classNames[i] == "user") {  //遍历比对，找到位置
    break;
  }
}
classNames.splice(i,1);  //删除类名
div.className = classNames.join(" "); //将剩下的类名拼接成字符串并重新设置
```

以往删除一个类名需要如上述代码所示。 

现在使用下面的简化代码

```js
document.getElementById('#wrap').classList.add("main-panel", "mx-1");
```

属性

classList.length 获取当前类名的个数

方法 

- add('main-panel') 增加n个类名。如果类名已经存在，则不会继续添加(不报错) 
- contains(value) 判断元素是否具有这个类名，返回布尔值 
- remove(value) 删除一个类名，如果类名不存在，不会报错
- toggle(value) 切换一个类名(增减类名)
- item(1) 获取某一个类名(通常直接获取全部类的数组)



#### 11.3.2 焦点管理

元素获得焦点的方式有页面加载，用户输入、在代码中使用focus()方法。 

1. document.activeElement 
   这个属性会始终引用DOM中当前获得了焦点的元素。默认情况下，文档刚刚加载完成，指向的是body元素，加载期间为null。 
2. document.hasFocus() 
   用于确定文档是否获得了焦点。

插入标记
innerHTML属性 outerHTML属性 insertAdjacentHTML方法

### 11.4 专有扩展

children属性
由于IE9之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此出现了children属性。这个属性是HTMLCollection的实例，只包含元素中同样还是元素的子节点。除此之外与childNodes没有什么区别。

contains()方法
出发点：在实际开发中，经常需要知道某个节点是不是另外一个节点的后代。 
调用contains()方法的应该是祖先节点，这个方法接收一个参数，也就是要检测的后代节点。返回布尔值。

插入文本
innerText 属性
textContent属性
outerText属性

表单的基础知识
获取表单的方式： 

1. 通过id等方式找到 
2. 通过document.forms获取文档对象上所有的表单。

提交表单
用户点击提交按钮或者图像按钮的时候，就会提交表单。 
`<input type="image" src="./ionic.png">`
只要表单上存在提交按钮或者图像按钮，那么在相应表单拥有焦点的时候，按下回车键就可以提交表单。（textarea是例外，会换行） 

以上述方式提交时，会首先出发submit事件。我们可以通过阻止这个事件的默认行为就可以取消表单提交。

```js
var testForm = document.getElementsByClassName('test-form')[0];
testForm.addEventListener('submit', function(e) {
  e.preventDefault();
  //验证部分的代码,验证通过
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
`<input type="text" name="first-name" autofocus>`

注：在组件 Input 中，这个属性不能直接更改，需要获取内部的ref，然后设置focus。

在早期，没有readonly方法，因此可以调用blur()方法来创建只读字段。



事件
blur
focus
change 失去焦点且value的值改变时触发 

注意：blur与change事件在不同浏览器中触发顺序不同。

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
document.styleSheets包含通过<link>与<style>定义的样式表

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

```js
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
```



**客户区大小** client dimension 
元素的客户区大小指的是元素内容及其内边距所占据的空间大小。

clientWidth
clientHeight
滚动大小 scroll dimension

scrollHeight //在没有滚动调到情况下，元素内容的总高度
scrollWidth
scrollLeft
scrollTop

元素大小 getBoundingClientRect



**遍历**
document.NodeIterator 
document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT,filter,false) 

这两个方法现在使用不多

另外还有两个方法：nextNode() previousNode()

TreeWalker
TreeWalker是NodeIterator的高级版本。并额外提供了5种方法。

parentNode()
firstChild()
lastChild()
nextSibling()
previousSibling()

**范围**

document.createRange()

在创建范围的时候，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档的片段之中。







