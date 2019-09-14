## 第九章 事件

### 9.1 事件对象

事件是组件间通信的方式之一，可以用来异步编程，有三个方法：

~~~js
function handleEvent() {
  // 事件触发函数执行
}
div.addEventListener('onclick', handleEvent, false);
// 增加事件监听；第一个参数是事假类型，对大小写很敏感，第二个是事件处理函数，可以使匿名函数或者外部函数，第三个可选参数是监听事件的阶段。默认是false，表示在事件冒泡阶段监听事件；true 表示在事件捕获阶段监听。无返回值。第二个参数可以使事件处理函数，还可以是 handleEvent 的方法对象 {handleEvent: function(e){...}}。第三个参数还可以配置{once: true} 表示函数只监听一次事件，之后自动移除。一个对象上绑定不同的监听函数，那么触发按照先后顺序进行；如果绑定多个相同的监听函数，那么只触发一次。

div.removeEventListener('onclick', handleEvent, false);
移除事件监听：这里的三个参数必须相同，才能移除事件监听。

let e = new Event('click');
div.dispatchEvent(e);
事件派发(触发)，创建一个事件并触发。如果不传参数会报错
~~~

### 9.2 事件模型

**监听函数**：事件发生后，浏览器监测到事件，触发监听函数，事件驱动编程模式（event-drived）绑定监听函数有三个方法：

- on 行内绑定： `<div onclick={(e) => {console.log(e);}></div>` 这个在事件冒泡阶段执行（子元素先触发事件，之后冒泡到父元素），一个事件对应一个执行语句。JS和HTML混合不好。

- on 节点绑定：效果和第一个相同，监听函数内容可以增多，适应于绑定事件很少代码。如果两次绑定会覆盖

  ~~~js
  window.onload = function () {...}
  div.onclick = function(e) {...}
  ~~~

- addEventListener 绑定事件。一个事件可以添加多个函数，适应于多个事件，可以解绑事件监听。

监听函数内部的this指向触发事件的DOM元素，通常使用 event.target.value 获取DOM元素的值。

**事件传播：**事件经历三个阶段：事件捕获阶段（上到下）事件目标阶段（底层触发）事件冒泡阶段（下到上）

**事件代理**：事件从下层向上层冒泡，所以可以在上层设置事件监听，统一监听下层的事件变化，如果下层的节点个数变化不会影响上层事件的监听。这样可以很方便的处理多事件，多子节点，子节点变化的情况。

**阻止事件冒泡**：stopPropogation，这个方法可以阻止事件传播（向上向下传播），但是不能阻止事件的触发（如果事件对应两个监听函数，第一个阻止事件冒泡，第二个函数仍然可以触发）。如果使用 stopImmediatePropogation 可以阻止后面函数的触发。

### 9.3 事件对象

Event 对象（由Event构造函数创建）是原生对象，Event实例继承自这个对象，所以可以创建一个新对象

~~~js
let e = new Event('look', {'bubbles': true, 'cancelable': false});
// 第一个参数是事件名称(可以自定义)
// 第二个参数是属性：可以向上冒泡，事件不可以被取消
~~~

属性

~~~js
e.bubbles 事件是否可以冒泡(默认不会冒泡，除非显示声明)
e.eventPhase 事件处于什么阶段(0-3) 对应没有触发、事件捕获、目标阶段、事件冒泡
e.cancelable 返回布尔值，判断事件可以被取消，如果是false，e.preventDefault() 是无效的，对于不确定的事情可以先判断，后确定是否阻止默认事件。
if (e.cancelable) {
  e.preventDefault();
}
e.cancleBubblt === true 时，类似于 e.cancleBubble() 方法，可以阻止事件冒泡。
e.defaultPrevented 判断事件是否执行过 e.preventDefault
e.target 事件原始触发的节点(input)
e.currentTarget 事件正在经过的节点(input触发后，事件冒泡到上层的div) 通常情况下，监听函数位于哪个层级的节点，只有事件经过这个节点时才会触发监听函数，所以 currentTarget 通常指向 this ,当前正在经过事件
e.type 事件类型(look)
e.timeStamp 事假时间戳，获取的是从网页加载到事件执行的时间间隔
e.isTrusted 事件是否由真实用户产生的(不是脚本产生的)
e.detail 返回具体的事件信息，例如click dbclick 中，e.detail 可以123，表示点击鼠标的次数；对于鼠标滚动事件，返回值是鼠标滚动的距离(这个可以出发界面缩放，图片缩放等)
~~~

实例方法

~~~js
e.preventDefault() 这个事件需要在 e.cancelable === true 下执行，可以过滤用户输入(只输入大写或者数字等)，如果用户输入数字，实际上有e的存在，可以过滤掉。
e.stopPropogation()
e.stopImmediatePropogation() 阻止当前事件和DOM节点绑定的其他事件冒泡
e.composePath() 返回一个数组，事件冒泡的上层节点
~~~

### 9.4 鼠标事件

下面的事件是 MouseEvent 的实例

~~~js
click: 用户完成 mousedown mouseup 最后触发 click
dbclick: mousedown mouseup click dbclick
mousedown
mouseup
mousemove 注意限流
mouseenter-mouseleave 进入子节点或者退出父节点不会触发事件
mouseover-mouseout 进入子节点或者退出父节点会触发事件, mouseover 会在子节点上多次触发
contextmenu 按下右键时(右键菜单出现前)触发
wheel 滚动鼠标
~~~

滚动事件和拖拽事件也是 MouseEvent 的实例，MouseEvent 事件继承了 Event 事件

用户可以使用构造函数自定义鼠标事件

~~~js
let e = new MouseEvent(type, options);

下面是构造函数的可选属性：
screenX, screenY, clientX, clientY,
ctrlKey, shiftKey, altKey, metaKey（command或者window键）, 
button(012 表示左键中键右键)
buttons(000 001 010 100 011 代表多个按键)
relatedTarget：节点对象，表示事件的相关节点，默认为null。mouseenter和mouseover事件时，表示鼠标刚刚离开的那个元素节点；mouseout和mouseleave事件时，表示鼠标正在进入的那个元素节点。
~~~

MouseEvent 实例对象的属性，除了上面的属性还具有

~~~js
movementX, movemoveY 当前位置与上一个mousemove 事件的位置的位移
offsetX offsetY 鼠标位置与目标节点的相对距离
pageX, pageY 鼠标位置与界面的相对距离
~~~

~~~js
鼠标事件的实例方法
e.getModifierState('CapsLock')
~~~

#### 滚轮事件

WheelEvent 

~~~js
类似于鼠标事件，也具有构造函数和对应的属性
deltaX deltaY deltaZ 表示滚轮在XYZ三个方向的位移
deltaMode 是上面位移的单位，012 表示像素，行，页
~~~

### 9.5 键盘事件

~~~js
keydown keypress keyup 事件
按下键后，keydown keypress (keydown keypress) 最后 keyup 功能键点击不会触发这三个事件

构造函数 let e = new KeyboardEvent('type', options);
key：字符串，当前按下的键，默认为空字符串。
code：字符串，表示当前按下的键的字符串形式，默认为空字符串。
location：整数，当前按下的键的位置，默认为0。
ctrlKey：布尔值，是否按下 Ctrl 键，默认为false。
shiftKey：布尔值，是否按下 Shift 键，默认为false。
altKey：布尔值，是否按下 Alt 键，默认为false。
metaKey：布尔值，是否按下 Meta 键，默认为false。
repeat：布尔值，是否重复按键，默认为false。
~~~

构造函数的属性同样适应于实例对象的属性

~~~js
e.altKey, e.ctrlKey, e.metaKey, e.shiftKey
e.code 返回当前按键的字符串形式(KeyA)
e.key 返回按下键的名称(如果是功能键，返回键值) 属性只读
e.location 返回键的位置(主键盘0，左右，小键盘)，这个属性是个鸡肋(不能返回具体的键)
e.repeat 判断是否重复点击某个键
~~~

实例对象的方法

~~~js
e.getModifierState('Alt') 判断是否按下功能键
if (e.getModifierState('Alt')+e.getModifierState('Control')+e.getModifierState('Meta')>1) {
  // do sth
}
~~~

### 9.6进度事件:a:

外部资源异步加载时，例如 image，link，video, audio 等资源加载时触发的事件，u或者文件上传（File upload），继承了 ProgressEvent 事件接口，主要包括下面几个事件：

~~~
abort (退出)：用户主动点击退出事件
error 网络错误等造成的中断
loadstart 
load
loadend 加载开始，加载成功，加载结束
progress 加载中(不断触发)
timeout 加载超时
~~~

注意：如果在脚本加载前，资源已经加载，那么监听img的load事件就没有必要了。可以在事件监听前判断一下脚本是否加载。onerror 事件需要在DOM节点内部监听。

~~~html
<img src='wrongURL' onerror="this.style.display='none';"/>
~~~

~~~js
let image = document.getElementById('#avatar');
if (!image.complete) {
  image.addEventListener('load', (e) => {
    image.classList.add('finished');
  });
}
~~~

注意2：loadend 事件会在 abort error load 事件后执行（不管加载成功失败loadend事件都会最后执行）所以可以在这个事件后面增加处理函数。

注意3：error 事件不会冒泡，子元素的error事件不会触发父元素的事件监听。

构造函数API：这个构造函数可以描述外部资源加载的进度，例如上面的多媒体加载

~~~js
let e = new ProgressEvent(type, options);
实例属性
lengthComputable 表示加载总量是否可以计算，默认是false
loaded 已加载的部分
total 总量
使用 e.loaded / e.total 可以计算加载的百分比
~~~

类似于其他事件，构造函数的options和实例属性相同（JS例子）。

### 9.7 表单事件

#### input

input select textarea 元素会触发 input 事件，继承自 Inputvent 构造函数。这个事件在用户触发时会频繁触发。input 事件相对于 change 事件，change 事件在输入框失去焦点后触发，但是input事件会始终触发。

#### select

选中文本事件：在 input textarea 中，如果选中文本，会触发这个事件，可以通过实例对象的属性获取文本信息

~~~jsx
<input id="test" type="text"></input>

let ele = document.getElementById('#test');
ele.addEventListener('select', (e) => {
  console.log(e.type === 'select');
}, false);
e.target.value (selectionirection selectionStart selectionEnd) 可以获取选中的文本
~~~

#### change

change 事件会在输入元素变化时触发，不会连续触发，input 事件必然伴随着 select 事件

- 激活单选框或者复选框 radio checkbox 会触发
- 用户提交：例如 select 或者日期组件（对于select元素，input事件和change事件基本相等）
- 当文本框 input type=text 或者 textarea 的值发生改变，并且失去焦点后触发

#### invalid

当表单是必填项，如果不填，点击提交时会触发这个事件(或者不满足输入框的条件)

~~~jsx
<form>
  <input type="text" required oninvalid="console.log('invalid input')" />
  <button type="submit">提交</button>
</form>
~~~

#### reset submit

这两个事件发生在表单对象  form 上面，并不是在表单成员 button 上面（提交的是表单不是按钮）。

#### 构造函数

InputEvent 实例属性是只读的

~~~js
let e = new InputEvent(type, options);
options = {
  data 字符串，表示变动后的内容
  inputType 字符串，表示变更的类型(insertText，insertFromPaste，输入文本或者粘贴文本)
  dataTransfer 返回 DataTransfer 实例。该属性只在文本框接受粘贴内容（insertFromPaste）或拖拽内容（insertFromDrop）时才有效
};
~~~

### 9.8 触摸事件

触摸事件 API Touch TouchList TouchEvent。多个Touch同时发生构成TouchList。触摸屏设备会触发这部分事件。通常情况，touch事件和鼠标事件同时发生（避免某些代码没有用到触摸事件），单纯使用Touch事件需要把鼠标事件 e.preventDefault() 处理。

#### Touch

Touch 构造函数可以创建Touch实例。与click事件不同的地方：Touch事件是一个椭圆形区域，压力参数（手指触摸或者笔尖触摸）。实例属性和构造函数参数相同。

~~~js
let touch = new Touch(options);
let options = {
  identifer: 10, // 唯一标识，触摸过程中不变
  target: div,
  clientX: 
  clientY:
  screenX:
  screenY:
  pageX:
  pageY:
  radiusX: 触摸区域影响X轴的长度(px) 乘以2就是实际的长度或者宽度
  radiusY: Y轴的长度
  rotationAngle: [0, 90] 旋转角度(触摸区域椭圆旋转角度)
  force: [0, 1] 压力(0-1)
}
~~~

#### TouchList

触摸事件的集合，API

~~~js
TouchList.length === 2
TouchList.item(1)
~~~

#### TouchEvent

构造函数继承自 Event 事件

~~~js
let e = new TouchEvent('type', options);
options = {
  crtlKey:
  altKey:
  metaKey:
  shiftKey:
  touches: [] 当前处于活动状态的触摸点
  targetTouches: [] 位于触摸目标DOM内部且处于活动状态的触摸点
  changedTouche: [] 本次触摸过程的相关触摸点
};
~~~

实例属性是只读属性，类似于上面的参数

#### TouchEvent 分类

touchstart

touchend 触摸结束或者触摸到屏幕边缘

touchmove

touchcancel 触摸时弹出菜单或者对话框，或者用户的触摸点很多，触摸事件取消

~~~js
var el = document.getElementsByTagName('canvas')[0];
el.addEventListener('touchstart', onStart, false);
el.addEventListener('touchmove', onMove, false);

function onStart = (e) => {
  e.preventDefault();
  let touches = e.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
    // 获取开始触摸点(多个)的页面坐标
  }
}

function onMove(e) {
  e.preventDefault();
  var touches = e.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
    // 触摸点移动时坐标的变化
  }
}
~~~

### 9.9 拖拽事件:a:

DragEvent 具有 ==dataTransfer== 的属性，这个属性很重要！dataTransfer 具有很多属性和方法

#### 1.拖拽对象

**拖拽对象**：被拖拽的对象（例如文件或者图片链接），拖拽对象经过的对象（div，拖拽对象可以放入div中）

**可拖拽属性**：网页中的图片、链接、选中的文本默认可以拖动，其他元素默认不可拖动。如果在 div 内部设置 draggable = 'true' 后，这个DIV就是可以拖动的。对于 img 和 a ，这个属性默认是 true。实际中，可以设置图片或者链接是不可以拖动的。如果某元素是可以拖动的，就无法用鼠标选中内部的文本。

~~~html
<div draggable="true"></div>
<img draggable="false"/>
~~~

#### 2.拖拽事件

**被拖拽对象的事件**

~~~js
dragstart: 开始拖拽，在这个事件的监听函数上，指定拖拉的数据(image)
drag: 拖拽中，几百ms触发一次
dragend：拖拽结束(释放鼠标或者ESC) 与 dragstart 成对出现
~~~

**推拽对象经过元素的事件** 

~~~js
dragenter：被拖拽元素进入div后，div触发一次事件；在事件监听函数中处理div是否允许 drop 事件放下拖拽的数据(默认div不允许drop事件)；
dragover：DIV 元素持续触发这个事件(只要没有离开这个DIV)
dragleave：img 离开DIV范围后触发
drop：在目标节点DIV上释放鼠标触发，监听函数可以取出数据并处理(目标节点DIV需要预设允许drop)
~~~

**注意**

- 拖拽事件中，鼠标移动但是不会触发鼠标事件

- 把文件从桌面拖进浏览器，不会触发 dragstart dragend 事件

- dragenter dragover 的监听函数用于处理拖拽数据，但是大部分DIV默认设置不能drop事件，所以必须阻止默认事件

  ~~~html
  <div ondragover="event.preventDefault()"></div>
  ~~~

#### 3.拖拽实例

~~~html
 <div class="dropzone">
   <div id="draggable" draggable="true">
     该节点可拖拉
   </div>
 </div>
 <div class="dropzone"></div>
~~~

拖拽事件

~~~js
var dragged;

// for dragged image
document.addEventListener('dragstart', (e) => {
  dragged = e.target;
  dragged.style.opacity = 0.5;
}, false);
document.addEventListener('dragend', (e) => {
  e.target.style.opacity = '';
}, false);

document.addEventListenrt('dragover', (e) => {
  e.preventDefault();
  // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
}, false);
document.addEventListerer('dragenter', (e) => {
  if (e.target.className === 'dropzone') {
    // 由于该事件会冒泡，所以要过滤节点
    e.target.style.background = 'red';
  }
}, false);
document.addEventListerer('dragleave', (e) => {
  e.target.style.background = '';
}, false);

document.addEventListerer('drop', (e) => {
  e.preventDefault(); // 防止事件默认行为（比如某些元素节点上可以打开链接）
  if (e.target.className === 'dropzone') {
    e.target.style.background = '';
    dragged.parentNode.removeChild(dragged);
    e.target.appendChilde(dragged);
  }
}, false);
~~~

拖拽事件继承于构造函数  dragEvent

~~~js
let e = new dragEvent(type, options);
type 是拖拽事件的类型
options 是null或者是 dataTranster 的实例对象
~~~

#### 4、数据传输器 dataTransfer

dragEvent 具有一个 dataTransfer 属性，用来读写需要传递的属性。这个属性继承 dataTranster 构造函数

~~~js
let dataTransfer = new dataTransfer(); // 构造函数无参数
~~~

数据传递器包含：数据的类型（文件格式，text/plain image/png）和数据的值。

拖拽事件中，dragenter dragover 事件的监听函数可以判断当前的数据类型，确定当前的 div 能否接受这个数据类型（是否支持drop事件）。发生 drop 事件时，监听函数从dataTransfer 中取出数据的值。

#### 5、数据传输器的属性

5.1 dataTransfer.dropEffect

~~~js
dataTransfer.dropEffect = 'copy' 'move' 'link' 'none';
设置放下被拖拽节点的效果(鼠标形状改变)其他值是无效的。这个属性在 dragenter dragover 事件中监听，这个属性对于被拖拽节点是无效的，只对DIV有效果（鼠标变化）。
~~~

5.2 dataTransfer.effectAllowed

~~~js
dataTransfer.effectAllowed = 'copy' 'move' 'link' 'all' ...
设置本次拖拉中允许的效果:这个属性与dropEffect属性是同一件事的两个方面。前者设置被拖拉的节点允许的效果，后者设置接受拖拉的区域的效果，它们往往配合使用。 这个属性在 dragstart 事件处理函数中设置。
~~~

5.3 dataTransfer.files

dataTransfer.files 是一个 fileList 对象，可以用来拖拽文件。可以使用 FileReader 读取文件的内容

fileList and FileReader example

~~~html
<div id="output" style="min-height: 200px;border: 1px solid black;">文件拖拉到这里</div>
~~~

~~~js
var div = document.getElementById('output');

div.addEventListener("dragenter", function(event) {
  div.textContent = '';
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener("dragover", function(event) {
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener('drop', (e) => {
  e.stopPropagation();
  e.preventDefault();
  let files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    // get files names and info(size)
    div.textContent += files[i].name + files[i].size;
  }
  
  if (files.length === 0) return;
  let file = files[0];
  let reader = new FileReader();
  // set reader loadend fucntion
  reader.onloadend = (e) => {
    if (e.target.readyState === FileReader.DONE) {
      let content = reader.result;
      div.innerHTML = file.name + content;
    }
  }
  // start to read file
  reader.readAsBinaryString(file);
}, false);
~~~

5.4 dataTransfer.types

这个属性是只读的数组，每一项是拖拉数据的文件类型。可以在 dragover 事件处理函数中判断文件类型，确定是否可以 drop 文件

~~~js
function containsFile(filelist, value) {
  if (filelist.length === 0) {
    return false;
  }
  for (let i = 0; i < filelist.length; i++) {
    if (list[i] === value) {
      return true;
    }
  }
  return false;
}

let isLink = containsFile(e.target.dataTransfer.types, 'text/uri-list');
if (isLink) {
  e.preventDefault();
}
~~~

5.5 dataTransfer.items

属性返回一个伪数组（伪数组是 DataTransferItemList 的实例），其中每一项是本次拖拽的一个对象（对象是DataTransferItem 的实例）。如果拖拽不包含对象，那么返回一个空对象。

~~~js
// DataTransferItemList 实例的API
length：返回成员的数量
add(data, type)：增加一个指定内容和类型（比如text/html和text/plain）的字符串作为成员
add(file)：add方法的另一种用法，增加一个文件作为成员
remove(index)：移除指定位置的成员
clear()：移除所有的成员

// DataTransferItem 实例的API
kind：返回成员的种类（string还是file）。
type：返回成员的类型（通常是 MIME 值）。
getAsFile()：如果被拖拉是文件，返回该文件，否则返回null。
getAsString(callback)：如果被拖拉的是字符串，将该字符传入指定的回调函数处理。该方法是异步的，所以需要传入回调函数。
~~~

example

~~~js
div.addEventListener('drop', function (e) {
  e.preventDefault();
  if (e.dataTransfer.items != null) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      console.log(e.dataTransfer.items[i].kind + ': ' + e.dataTransfer.items[i].type);
    }
  }
});
~~~

#### 6、数据传输器的方法

##### 1、setdata 用来设置拖拉事件所带有的数据

~~~js
e.dataTransfer.setData('text/plain', 'this is Andy');
~~~

该方法接受两个参数，都是字符串。第一个参数表示数据类型（比如`text/plain`），第二个参数是具体数据。如果指定类型的数据在`dataTransfer`属性不存在，那么这些数据将被加入，否则原有的数据将被新数据替换。

如果是拖拉文本框或者拖拉选中的文本，会默认将对应的文本数据，添加到`dataTransfer`属性，不用手动指定。

```html
<div draggable="true">
  aaa
</div>
```

上面代码中，拖拉这个`<div>`元素会自动带上文本数据`aaa`。

使用`setData`方法，可以替换到原有数据。

```html
<div
  draggable="true"
  ondragstart="event.dataTransfer.setData('text/plain', 'bbb')"
>
  aaa
</div>
```

上面代码中，拖拉数据实际上是`bbb`，而不是`aaa`。

下面是添加其他类型的数据。由于`text/plain`是最普遍支持的格式，为了保证兼容性，建议最后总是保存一份纯文本格式的数据。

```js
var dt = event.dataTransfer;

// 添加链接
dt.setData('text/uri-list', 'http://www.example.com');
dt.setData('text/plain', 'http://www.example.com');

// 添加 HTML 代码
dt.setData('text/html', 'Hello there, <strong>stranger</strong>');
dt.setData('text/plain', 'Hello there, <strong>stranger</strong>');

// 添加图像的 URL
dt.setData('text/uri-list', imageurl);
dt.setData('text/plain', imageurl);
```

可以一次提供多种格式的数据。

```js
var dt = event.dataTransfer;
dt.setData('application/x-bookmark', bookmarkString);
dt.setData('text/uri-list', 'http://www.example.com');
dt.setData('text/plain', 'http://www.example.com');
```

上面代码中，通过在同一个事件上面，存放三种类型的数据，使得拖拉事件可以在不同的对象上面，`drop`不同的值。注意，第一种格式是一个自定义格式，浏览器默认无法读取，这意味着，只有某个部署了特定代码的节点，才可能`drop`（读取到）这个数据。

##### 2、DataTransfer.getData()

`DataTransfer.getData()`方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用`setData`方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有`drop`事件触发后，才能取出数据。

下面是一个`drop`事件的监听函数，用来取出指定类型的数据。

```js
function onDrop(event) {
  var data = event.dataTransfer.getData('text/plain');
  event.target.textContent = data;
  event.preventDefault();
}
```

上面代码取出拖拉事件的文本数据，将其替换成当前节点的文本内容。注意，这时还必须取消浏览器的默认行为，因为假如用户拖拉的是一个链接，浏览器默认会在当前窗口打开这个链接。

`getData`方法返回的是一个字符串，如果其中包含多项数据，就必须手动解析。

```
function doDrop(event) {
  var lines = event.dataTransfer.getData('text/uri-list').split('\n');
  for (let line of lines) {
    let link = document.createElement('a');
    link.href = line;
    link.textContent = line;
    event.target.appendChild(link);
  }
  event.preventDefault();
}
```

上面代码中，`getData`方法返回的是一组链接，就必须自行解析。

类型值指定为`URL`，可以取出第一个有效链接。

```
var link = event.dataTransfer.getData('URL');
```

下面的例子是从多种类型的数据里面取出数据。

```
function doDrop(event) {
  var types = event.dataTransfer.types;
  var supportedTypes = ['text/uri-list', 'text/plain'];
  types = supportedTypes.filter(function (value) { types.includes(value) });
  if (types.length) {
    var data = event.dataTransfer.getData(types[0]);
  }
  event.preventDefault();
}
```

##### 3、DataTransfer.clearData()

`DataTransfer.clearData()`方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。

```
event.dataTransfer.clearData('text/uri-list');
```

上面代码清除事件所带的`text/uri-list`类型的数据。

该方法不会移除拖拉的文件，因此调用该方法后，`DataTransfer.types`属性可能依然会返回`Files`类型（前提是存在文件拖拉）。

注意，该方法只能在`dragstart`事件的监听函数之中使用，因为这是拖拉操作的数据唯一可写的时机。

##### 4、DataTransfer.setDragImage()

拖动过程中（`dragstart`事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。

`DataTransfer.setDragImage()`方法可以自定义这张图片。它接受三个参数。第一个是`<img>`节点或者`<canvas>`节点，如果省略或为`null`，则使用被拖动的节点的外观；第二个和第三个参数为鼠标相对于该图片左上角的横坐标和右坐标。

下面是一个例子。

```
/* HTML 代码如下
 <div id="drag-with-image" class="dragdemo" draggable="true">
   drag me
 </div>
*/

var div = document.getElementById('drag-with-image');
div.addEventListener('dragstart', function (e) {
  var img = document.createElement('img');
  img.src = 'http://path/to/img';
  e.dataTransfer.setDragImage(img, 0, 0);
}, false);
```



### 9.10 其他事件

#### 1、beforeUnload

窗口、文档、各种资源卸载前触发事件，主要避免用户未提交保存表单，误操作关闭网页。

~~~js
window.addEventListener('beforeunload', (e) => {
  var confirmationMessage = '确认关闭窗口？';
  e.returnValue = confirmationMessage;
  return confirmationMessage;
});
// 使用 e.returnValue 和 return 可以保证兼容性。对于IE浏览器可以显示提示文本，谷歌浏览器会显示默认文本
~~~

#### 2、unload

在窗口关闭或者DOM被卸载前执行这个事件，发生在 beforeUnload 之后。这个事件如果抛出异常，界面DOM依然会卸载，文档不可见，UI交互失效，所以基本不用。

~~~js
window.addEventListener('unload', (e) => {
  console.log('never use this event')
});
~~~

#### 3、load error abort

资源加载完毕，资源出错，用户取消资源加载触发事件， window，DOM， AJax 请求都会触发这个事件。注意：网页从本地缓存中加载不会触发这个事件。

~~~js
window.addEventListener('load', (e) => {
  ...
});
~~~

#### 4、pageshow pagehide

网页加载的两种方式：从服务器端获取资源加载，或者从缓存中加载（点击前进或者后退按钮）。

load 事件会在首次加载触发，如果从缓存中加载就不会触发。

pageshow事件，在首次加载或者缓存加载都会触发（首次加载中，load先触发，pageshow后触发）。通过 pageshow 的 e.persisted 可以判断是否首次加载：如果是true就是从缓存中加载，false表示首次加载。

pagehide 事件会在界面关闭前触发，如果 e.persisted 是 true, 页面会保存在缓存中；false 表示不保存在缓存中。

Pageshow pagehide 在 history 对象变化时触发，和网页是否可见无关。

#### 5、popstate

这个事件在 history 对象显示切换时触发（鼠标点击前进后退，history.back(), history.forward(), history.go() 触发）。隐式切换不会触发(history.pushState(), history.replaceState())。

FF界面首次加载不会触发 popstate 事件，其他会触发。

~~~js
window.onpopstate = function (event) {
  console.log('state: ' + event.state);
  // 获取当前事件的状态
};
history.pushState({page: 1}, 'title 1', '?page=1'); // 隐式增加一条记录，不会触发事件
history.pushState({page: 2}, 'title 2', '?page=2'); // 隐式增加一条记录
history.replaceState({page: 3}, 'title 3', '?page=3'); // 改变当前的记录，不会触发
history.back(); // state: {"page":1} 页面后退一次
history.back(); // state: null	页面再后退一次
history.go(2);  // state: {"page":3} 页面向前两次
~~~

#### 6、hashchange

hash 变化是触发这个事件，通过属性可以获取前后的完整 URL。

~~~js
window.addEventListener('hashchange', (e) => {
  console.log(e.oldURL)
  console.log(e.newURL)
});
~~~

#### 7、DOMContentLoaded

这个事件是 DOM 加载完成，但是其他资源（image）还没有加载触发的事件，比load 事件更早。

#### 8、readystatechange

网页加载状态变化触发事件（loading -> interactive -> complete -> load）

#### 9、scroll

界面滚动触发，使用很多。

这个事件在界面滚动时会持续触发，需要考虑性能问题。

方法1：可以使用requestAnimationFrame优化。界面每次重绘(每秒60次)，只会触发一次scroll事件

~~~js
(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) { return; }
      running = true;
      // 界面每次重绘(每秒60次)，只会触发一次scroll事件
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = scroll
      });
    };
    obj.addEventListener(type, func);
  };
  // 将 scroll 事件重定义为 optimizedScroll 事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log('Resource conscious scroll callback!');
});
~~~

方法2：可以使用 setTimeout 增加间隔时间（0.1 秒执行一次）

~~~js
(function() {
  window.addEventListener('scroll', scrollThrottler, false);
  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        actualScrollHandler();
      }, 100);
    }
  }
  function actualScrollHandler() {
    // ...
  }
}());
~~~

方法3： 1秒一次

~~~js
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
~~~

方法4：lodash库函数

~~~js
window.addEventListener('scroll', _.throttle(callback, 1000));
~~~

节流和防抖的区别：

debounce 是防抖，throttle 是节流。节流表示界面滚动每隔一段时间函数执行一次，防抖是界面滚动停止后，执行一次。

#### 10、resize

改变界面大小触发（会频繁触发，需要节流阀），主要发生在window上面。这里可以处理PC端界面向移动端界面切换时触发的函数。

~~~js
window.addEventListener('resize', (e) => {
  if (document.body.clientWidth < 768) {
    // mobile
  }
}, true);
~~~

#### 11、fullscreenchange fullscreenerror

Fullscreenchange 在开启或者退出全屏触发，fullscreenerror 会在全屏出错时触发。

#### 12、剪切板事件

cut copy paste 是 clipboardevent 的实例事件，具有一个属性 dataTransfer，可以存放剪切的数据。

~~~js
document.addEventListener('copy', function (e) {
  e.clipboardData.setData('text/plain', '版权所有，不得复制');
  e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  e.preventDefault();
});
// 这里可以使复制进去剪切板的是开发者固定的内容，不是界面的内容。
~~~

#### 13、焦点事件

focusin -> focus -> focusout -> blur

这几个事件不会冒泡，所以需要在事件捕获阶段（addEventListener true）处理

#### 14、CustomEvent

生成自定义的事件实例

~~~js
let e = new CustomEvent(type, options);

options = {
  detail: 'tell me info'
};

e.detail === 'tell me info'
~~~

eg2

~~~js
var myEvent = new CustomEvent('myevent', {
  detail: { foo: 'bar'},
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
~~~



### 9.11 全局事件处理API

事件的回调函数有两种写法，addEventListener(type, function, true) 或者 onClick = function() {}

第二种方法简单使用方便，不能上设置捕获或者冒泡。由 GlobalEventHandlers 提供。下面是这个事件的属性

1、onabort 事件停止发生触发

~~~jsx
<img src="example.jpg" id="img"/>

var img = document.getElementById('img');
img.onabort = function () {
  console.log('image load aborted.');
}
~~~

2、onerror 错误时触发事件

当JS错误时，会传到 window.onerror

~~~js
window.onerror = function(message, source, lineno, colno, error) {
  message：错误信息字符串
  source：报错脚本的 URL
  lineno：报错的行号，是一个整数
  colno：报错的列号，是一个整数
  error： 错误对象
}
~~~

资源加载错误（图片或者脚本错误）error会在当前元素触发，通常不会触发window.onerror

3、onload  onloadstart

window img 会在加载完毕后触发 onload

img video 在加载开始时，还会触发 onloadstart 事件

4、onfocsu onblur

获得或者失去焦点

5、onscroll

页面或者元素滚动（注意节流）

6、oncontextmenu onshow

元素上点击右键，会触发 oncontextmenu，如果返回true就显示右键菜单，如果返回false就不显示右键菜单。

显示右键菜单时，会触发 onshow 事件。

7、其他

~~~js
鼠标的事件属性。
onclick
ondblclick
onmousedown
onmouseenter
onmouseleave
onmousemove
onmouseout
onmouseover
onmouseup
onwheel

键盘的事件属性。
onkeydown
onkeypress
onkeyup

焦点的事件属性。
onblur
onfocus

表单的事件属性。
oninput
onchange
onsubmit
onreset
oninvalid
onselect

触摸的事件属性。
ontouchcancel
ontouchend
ontouchmove
ontouchstart

- 拖动的事件属性分成两类：一类与被拖动元素相关，另一类与接收被拖动元素的容器元素相关。

被拖动元素的事件属性。
ondragstart：拖动开始
ondrag：拖动过程中，每隔几百毫秒触发一次
ondragend：拖动结束

接收被拖动元素的容器元素的事件属性。
ondragenter：被拖动元素进入容器元素。
ondragleave：被拖动元素离开容器元素。
ondragover：被拖动元素在容器元素上方，每隔几百毫秒触发一次。
ondrop：松开鼠标后，被拖动元素放入容器元素。

<dialog>对话框元素的事件属性。
oncancel
onclose
~~~