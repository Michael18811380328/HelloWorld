# Javascript 基础教程 阮一峰

阮一峰推荐的入门教程，重在查漏补缺 https://wangdoc.com/javascript/index.html

## 第一章 入门

这里以 ES5 为标准。JS 是一个脚本语言，必须依托于一个环境(浏览器或者服务器) JS 自己可以实现简单的语法和自身的对象，更重要的调用宿主的API(DOM文档、BOM浏览器、Ajax网络请求)。这里只讨论浏览器，不涉及服务器的Node环境API。

## 第二章 数据类型

### 2.1 基本类型

~~~js
typeof null === 'object'
undefined == null
~~~

### 2.2 数值

isNan 可以判断是否是 NaN，但是实际可能出现问题：如果传入的参数不是数值，需要首先转化成数值，之后进行判断NaN，这样可能造成不准确。

~~~js
isNaN(NaN) => true
isNaN('test') == isNaN(Number('test')) => true
isNaN('') => false
isNaN([]) => false
isNaN([1,2]) => true
~~~

所以实际判断时，首先需要判断是否是数值

~~~js
function isNumber(para) {
  return typeof(para) === 'number' && isNaN(para);
}
~~~

更好的办法：利用NaN不等于自己进行判断

~~~js
function isNumber(para) {
  return para !== para;
}
~~~

isFinite() 判断一个数值是否是正常的数值，如果传入的是undefined NaN Infinity -Infinity 就返回false，传入数值或者null返回的是true。当然，如果传入的不是数值，首先转化成数值再判断。例如字符串123和字符串test分别对应真假。

### 2.3 字符串

字符串可以使用单引号或者双引号包裹，如果一个字符串内部有单引号和双引号，需要使用反斜杠进行转义。

由于HTML使用双引号，大部分JS使用单引号表示字符串，避免混淆（双引号也可以）。

字符串和数组的关系

字符串可以视为字符数组，可以直接通过下标获取具体位置的字符。如果传入的下标大于字符串的长度，或者下标不是数字，那么返回的就是 undefined。

使用下标可以获取字符串某个位置的字符，但是无法改变字符串（只读属性）。字符串不具有数组的其他属性方法。字符串可以获取长度 string.length 也是只读属性。

字符串有多个编码形式，不同编码的转换

### 2.4 对象

对象由键值对组成。默认的键是字符串，如果是数值，会转化成字符串。在ES6中，symbol 也可以做键。

值可以使一个函数，那么这个键就是对象的方法；值可以使一个对象，那么就是对象的链式引用（注意对象的深复制和浅复制）。

~~~js
let obj = {
  b: function(para) {
    return para * 2;
  }
};
~~~

对象的属性可以动态创建；

如果不同的变量指向相同的对象，那么这些变量都是这些对象的引用。如果改变一个引用数值，其他引用也会改变。获取对象的属性时，如果属性是数字，不能使用点语法获取(会当做小数点报错)，可以通过方括号获取对象的属性。

查看对象的属性：使用 Object.keys(obj) 可以查看一个对象的所有属性。

~~~js
console.log(Object.keys(document)); // [location]
~~~

实际上，通常使用 for in 遍历对象中的属性，这样可以获取设置不同的属性。

https://wangdoc.com/javascript/types/object.html

避免使用 with 语句获取对象内部的属性

~~~js
var obj = { name: "Mike", age: 18 };
with (obj) {
  name = "Harry";
  age = 15;
}
// equal with 
obj.name = "Harry";
obj.name = 15;
~~~

这样的好处是可以直接使用或者改变对象的某个属性

注意：如果对象没有这个属性，大括号内赋值会形成当前作用域内部的全局变量，对象并不会新增属性。

~~~js
var obj = {};
with (obj) {
  name = "Mike";
}
console.log(obj.name); // undefined
console.log(name); // "Mike"
~~~

所以不要使用 with 改变对象的变量

可以使用临时变量代替 with.

~~~js
let _obj = obj.obj1.obj2;
_obj.name = "Mike";
~~~

### 2.5 函数

函数的重复声明：函数名的提升会造成后面的函数永远覆盖前面的函数。如果同时使用function命令和变量赋值声明一个函数，那么变量提升后，会保留赋值声明的函数。

~~~js
var f = function() {
  console.log('test');
}
function f() {
  console.log('test-bug');
}
f(); // test
~~~

普通运算>for循环>函数递归recursion

函数递归调用可能存在边界错误造成内存泄漏

函数如果没有返回语句return，那么返回值是undefined

函数是一等公民：函数和其他变量一样：可以把函数看做一个变量赋值给另一个值，那么函数类似于变量可以传入另一个函数，或者作为函数的结果返回。

#### 属性和方法

函数是一个特殊的对象，所以具有对象的属性

Function.name 可以获取函数的名字(不会这样做)

Function.length 获取函数默认传入参数的个数(可以判断函数定义时和调用时的参数的差异)

Function.toString 返回一个字符串，就是函数的源码

#### 作用域

在ES5中，只有函数作用域和全局作用域，在ES6中增加了块级作用域；函数内部内变量会提升到函数头部。函数如果引用外部的参数，那么需要根据函数定义时的环境判断外部的变量。这样，如果在函数嵌套中出现，在一个函数外部可以访问函数内部的变量，那么构成了闭包结构。

~~~js
function foo() {
  var str = 'test';
  function bar() {
    console.log(str);
  }
  return bar;
}
var f = foo();
f();
// 可以获取函数内部的变量
~~~

闭包可以让变量始终在内存中，可以保存上一次调用的参数等，闭包是内部函数作用域的一个对外接口。可以封装对象的私有方法。外层函数运行时，都会生成一个闭包，这个闭包会持续保存外部函数的内部变量，所以内存消耗较大。

#### 函数的立即调用

~~~js
(function(){/* codes */}()); // 函数定义后立即执行
~~~

好处：减少全局变量(对于只运行一次的函数)，函数名就是一个全局变量；同时可以形成一个单独的作用域，可以封装外部函数无法读取的私有变量。

### 2.6 数组

清空数组的一个方法就是，array.length = 0; 数组的本质是一个对象，如果人为添加数组的属性，那么不会影响到数组的长度（当然，不建议直接改变数组的属性，获取属性和数组的项就会不方便）。如果设置数组的下标不合法(负数或者字符串作为数组的某个下标)那么这个下标就会转化成数组的属性。

~~~js
let arr = [];
arr[-1] = '0';
arr['name'] = "Mike";
console.log(arr.length); //0
console.log(arr[-1]); // '0' 因为-1首先转化成字符串，然后获取的数组的属性
~~~

使用for…in 可以遍历数组的属性，包括数字下标和数组的属性

使用 delete 会删除数组的某一个数组成员，形成一个空位，返回undefined， 但是数组的长度不会受到影响

~~~js
let arr = [1, 2, 3];
delete arr[2];
console.log(arr); // [1, 2, empty];
console.log(arr[2]); // undefined
~~~

所以如果删除最后一个元素，最好直接设置长度，array.length = arr.length - 1;

如果数组用 delete 删除了一个元素造成空位，然后使用 for 和 length 会遍历到这个 undefined 值，可能造成错误；使用 for…in… 或者 forEach 遍历时，会跳过空位输出结果。所以，尽量避免使用 delete 方法，优先使用 forEach 遍历数组的值。

#### 伪数组

伪数组向数组的转化

~~~js
let arr = Array.prototype.slice.call(arrayLike);
~~~

## 第三章 运算符

### 3.1 算术运算符

加法运算符存在重载，可能出现数据类型的转化，所以使用字符串和数值需要小心。对象相加，首先返回对象自身[Object Object], 然后转化成字符串相加。

余数运算：运算结果的符号取决于被除数，如果被除数是负数，那么余数就是负数(和除数无关)。如果被除数可能是负数，最好先对被除数取绝对值之后进行计算。

~~~js
function isOdd(num) {
  return Math.abs(num) % 2 === 1;
}
isOdd(-5); // true
~~~

由于JS小数(浮点数计算不准确，所以余数结果也不一定准确)

指数运算符(**)

~~~
console.log(2 ** 10); // 1024
~~~

### 3.2 比较运算符

字符串进行比较，根据Unicode编码进行比较(通常排序会这样比较)；汉字也可以这样比较(但是有什么意义呢？)

~~~js
console.log('c' < 'C'); // true
console.log('大' < '小'); // false
~~~

任何值与NaN比较，返回的都是false

对象和对象的比较，首先调用 valueOf，然后调用 toSting 进行比较(通常不会这样做)

~~~js
[2] > [1] // true
[2] > [11] //true
// 首先转化成字符串后，然后才能进行比较
~~~

全等比较(= = = )，如果是复杂数据类型进行比较，那么会比较内存地址。两个空数组不全等，两个指向相同数组的指针(引用)是全等的。对象的大于小于比较的是值，全等比较的是内存地址。undefined 和 null 自身全等，NaN 自身不全等。两个未赋值的变量都是undefined，所以全等。

二进制位运算符：这个使用的不多，可能造成混淆，可能在计算颜色RGB时需要，计算速度很快，操作底层数据，只整数起作用，浮点数不能使用。目前从没有在实际开发中见到这个方法。

### 3.3 其他运算符

void 返回一个空，用于界面中a标签超链接阻止默认的事件

~~~html
<a href="javascript: void(f())">文字</a>
~~~

## 第四章 语法专题

### 4.1 数据类型转换

JS 中的变量的数据类型可以自由转换，当变量运算比较时，会发生数据类型的转换（通常转化成布尔值或者字符串），这里可能出现很多问题。

强制数据类型转化：Number(), String(), Boolean() 转换的规则较复杂，转换规则很严格，很少用。如果传入的对象是复杂数据类型，规则更复杂。

~~~js
Number('42test') // NaN
~~~

把一个数据类型转换成布尔值，两种办法都可以

~~~js
expression ? true : false
!!expression
~~~

null 转化成数值是0，undefined转化成数值是 NaN（如果在计算中某个参数是上面两个值可能出错）

### 4.2 错误处理机制

#### Error 实例对象

可以手动创建一个实例对象，err.message 是其属性。程序运行中如果抛出 Error 实例对象后，整个程序会中断在发生错误的地方。

~~~js
var err = new Error('code bug');
err.message; //错误信息
err.name; //错误名称(非标准属性)
err.stack; // 错误的堆栈(非标准属性),整个属性具体代表什么呢？

function throwErr() {
  throw new Error('');
}

function catchErr() {
  try {
    throwErr();
  } catch (error) {
    console.log(error);
    console.log(error.stack);
  }
}

catchErr();
~~~

#### 6种原生错误类型

SyntaxError 语法错误：括号缺失、变量名不正确

Reference 引用错误：直接使用未定义的变量，赋值号（=）左侧不能赋值，this不能手动赋值，invalid left-hand side in assignment

RangeError 范围错误：数组的长度是负数，Number方法的参数超出范围，函数堆栈超过最大值

TypeError 类型错误：对原始数据类型（字符串、布尔值、数值）创建类（构造函数）、函数的方法是 undefined

URIError：URL错误 encode decode escape 函数传入参数不正确（没有遇到过）

EvalError eval 函数没有正确执行（现在已经舍弃，这里兼容旧代码）

上面的6个原生错误，和统一的Error类，都可以手动生成错误的实例，然后通过Error.message 设置错误的提示类型。用户可以自定义一个UserError错误对象，这种情况很少用到。

#### throw

手动终止程序的运行，可以抛出一个错误（上面的7种错误或者自定义错误）或者一个变量

#### try-catch

在 try 部分运行的代码如果出现错误（抛出异常），try部分的代码终止运行，程序会进入catch部分处理错误情况。如果不确定代码是否出现问题，就使用这个结构（尽量减少不确定的代码）。在catch部分可以根据错误的类型分别进行处理（TypeError，EvalError）

~~~js
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e);
  } else if (e instanceof RangeError) {
    console.log(e);
  } else {
    console.log(e);
  }
}
~~~

#### finally

不管代码是否出错，代码会执行这部分代码；通常用于代码运行结束后，清理环境或者保存代码

~~~js
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
~~~

### 4.3 编程风格

容易产生歧义的地方，使用明确的写法。圆括号的两个用法：函数调用方法；或者运算优先级；函数调用方法中不能加空格，运算过程中前后最好加上空格。代码行末尾需要加上分号，不要让代码自己加入分号，可能出错。

由于JS中没有块级作用域，存在变量提升，所以最好把变量的声明放在代码前面，避免块内部变量提升到全局变量。如果需要加全局变量，最好使用大写或者特殊标记。

不要使用 with 语句；尽量使用全等于，不全等于会进行数据类型转换，可能存在问题。

自增和自减运算符放在前面或者后面效果不一样，如果使用+=或者-=，可读性更好（如果在for循环中，使用++—运算符更简洁）

### 4.4 控制台

#### console API

console 对象是JS中的原生对象，command+option+I 即可打开控制栏，用于调试程序。

console 对象的静态方法

~~~js
console.log('test'); // 直接输出字符串
console.log('%s + %s', 1,2) // 输出占位符，类似于python输出 %s %d %i %f %c(CSS)
console.log('%cThis text is styled!', 'color: red; background: yellow; font-size: 24px;');

Console.info warnings error debug 
// 可以在 default levels 中设置，如果代码中很多 warnings 那么浏览器不会显示这部分问题。

console.table(); //可以把复杂数据类型以表格形式呈现
console.count(var); //可以输出代码执行的次数，如果加入变量会分类输出代码执行的次数
Console.dir(DOM);  
console.dirxml(DOM); //把DOM节点树状显示

console.assert(true, 'bug');// 条件显示：如果满足第一个条件，那么显示第二个参数

console.time();
console.timeEnd(); // 测试代码执行的时间
console.trace(); // 显示当前代码在堆栈中调用路径
console.clear(); // 清除控制台的当前输出
~~~

#### 控制台 API

控制台定义了一个$函数，可以直接使用，如果使用了jquery，就会覆盖原始函数的功能。

~~~js
$_ // 返回上一个表达式的值
$0 ~ $4 // 返回之前选中的DOM元素
$(selector) // === document.querySelector()
$$(selector) // === document.querySelectorAll()
inspect(DOM) // 在界面中选中这个元素
clear(); // clear console
copy(dom); // copy DOM nodes into clipboard
~~~

#### debugger

代码运行到这里时，如果浏览器有断点功能，就会暂停代码执行（Chrome浏览器常用）

## 第五章 标准库

11 部分



## 第六章 面向对象编程

5部分



## 第七章 异步操作

3部分



## 第八章 DOM

10部分



## 第九章 事件

11部分



## 第十章 BOM

15部分



## 附录 网页元素接口

7部分