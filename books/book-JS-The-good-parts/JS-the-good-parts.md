## JS 语言精粹 蝴蝶书

### 第一张 精华

JS 语言的特殊性造成了精华和糟粕并存

### 第二章 语法

```js
// page 18
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
```

#### 注释

在JS中使用注释最好使用//。不使用/**/的形式。因为正则表达式和注释可能发生冲突造成语法错误。

在JS中number就是64位的浮点数，没有int的概念。所以在JS中1.0 === 1

指数：100 = = = 1e2 = = = 1 * 10 * 10

字符串是不可变的：如果使用+进行连接，那么是创建一个新的字符串（并不是在原来的基础上加一个字符）。

```js
'cat'.length === 3

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

判断属性名来自于对象的成员还是原型链

try-catch-throw 还是不熟练

typeof(null) => 'Object'

在JS中%表示取余数。当两个运算数都是正数和求模运算一致，但是存在负数，就出现不一致的情况。



#### 原型

公用的函数的方法可以放在对象的原型中（在es6中react中，直接放在组件的类中，作为组件的方法实现复用效果）。私有的方法单独作为对象的方法直接添加即可。

```js
if (typeof Object.beget !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

var another = Object.create(stooge);
another.nickname = "Moe";
```

原型连接在更新时是不起作用的。当我们对于对象作出改变，不会触及该对象的原型；

hasOwnproperty 会检查对象的属性，不会检查对象原型链上的属性



### 第三章 对象

##### 属性委托（原型链）

如果尝试获取某个对象的属性值，但是这个对象没有对应的属性名，那么就会去原型链中逐层寻找这个属性。如果到达终点的Object.prototype没有，返回一个undefined值。

原型关系是动态的关系：如果我们给一个对象添加新的属性到原型中，那么该属性会对所有基于该原型创建的对象可见；

##### 反射reflection

检查一个对象具有某个属性是很容易的事情；使用typeof可以获取对象的属性的数据类型。

存在一个问题：typeof对于原型中的任何属性都会产生值（例如construction 产生 function）
解决方案：1.让程序检查并丢掉函数的属性；2.使用hasOwnProperty方法，将对象中独有的属性返回，原型链中方法不会检查。

##### 枚举 enumeration 循环遍历对象中的属性

遍历对象中的属性分为两种情况

1.未知对象的属性名：使用for-in遍历对象的属性，使用typeof过滤函数，使用hasOwnProperty过滤原型链的部分。

```js
for (let name in object) {
  if(typeof object[name] !== 'function') {
    console.log(name + ':' + object[name]);
  }
}
```

2.已知函数的属性名：使用一个数组存放函数的属性名；获取数组的长度i，使用for遍历对象的属性值。

```js
let properties = ['name', 'age', 'sex'];
for (let i = 0; i < properties.length; i++) {
  console.log(properties[i] + ":" + object[properties[i]]);
}
```

可以获取正确顺序的属性（不需要考虑原型链的属性）

##### 删除属性 delete

删除对象的属性：如果对象具有某个属性，会删除这个属性。删除操作不会触及原型链中的任何对象及属性；删除这个对象的属性，如果原型链中还有这个属性，那么还可以获取这个属性（原型链上的属性）；

减小全局变量的污染：使用let 创建局部变量在函数中。使用闭包形式向外暴露有限的接口。将全局性的资源加载到一个容器中，这样一个程序和其他程序的冲突就会降低。



### 第四章 函数

函数是功能实现的基本单元；一个函数的功能应当简单；编程就是把一组需求分解成一组函数和数据结构的技能。避免在一个函数内部实现多个功能。

使用字面量创建的函数链接到一个 Object.prototype ，使用函数表达式创建的函数，链接到一个Function.prototype，最终通过原型链链接到 Object.prototype.

函数在创建后，会具有一个prototype属性，它的值具有一个constructor属性就是该函数的对象。

函数可以被其他部分调用。

##### 定义函数

函数的四部分：Function、函数名（匿名函数）、函数参数（parameters，形参，可选）、函数体。函数可以作为另一个函数的参数或者返回值。子函数可以访问内部的变量和参数，也可以访问外部父函数的变量和参数。函数的闭包。

##### 调用函数

函数在调用过程中，除了传入的参数（括号中的参数），还默认传入this（this的值取决于函数的四种调用模式）和arguments（实参）。当实参大于形参，arguments会存储当前的函数全部实参。

arguments在函数参数不确定的时候可以使用（或者较多参数）arguments是一个伪数组，不具有数组的方法，这就是局限性。

```js
let sum = function() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i ++) {
    sum += arguemnts[i];
  }
  return sum;
};
```

##### 函数的四种调用模式

1、方法调用模式

函数作为对象的方法。this指向这个对象。通过this，可以使得内部函数访问对象中的公共方法和属性。

```js
let myObject = {
  value: 0,
  increase = (inc) => {
  	this.value += typeof inc === 'number' ? inc : 1;
	} 
};
// 如果传入的参数是数值，函数的value属性叠加，不是数值就 + 1；
myObject.increase('test');
myObject.increase(2);
console.log(myObject.value === 3);
```

2、函数调用模式

一个函数不是作为对象的方法被调用，而是作为函数的形式被调用，此时 this 指向全局变量。

```js
let myObject = {
  value = 3;
}
myObject.double = function () {
  let that = this;
  let helper = function () {
    that.value = add(that.value, that.value);
    console.log(this); //全局变量
  };
  helper(); //以函数的形式调用函数 helper
}
myObject.double();
console.log(myObject.value);
```

3、构造器调用模式

使用new构造器创建函数，函数中的this绑定到新创建的对象上。（使用构造函数创建新对象是早期的方法，现在使用class关键字创建js中的class）。这种方法在最新的代码中不使用。

```js
let Quo = function (string) {
  this.status = sy=tring;
}
Quo.prototype.getStatus = function() {
  return this.status;
}
let myQuo = new Quo("test");
myQue.getStatue();
```

4、Apply调用模式：this指向apply中的第一个参数；第二个参数是参数数组；(对比call方法的使用)。

```js
let array = [3, 4];
let sum = add.apply(null, array);
console.log(sum === 7);

let statusObject = {
  status: "OK"
};
let status = Quo.prototype.getStatus.apply(statusObject);
console.log(status === 'OK');
```

函数中遇到return就不会继续执行后面的代码了。



##### 异常处理

异常：干扰函数正常执行过程中的事故（函数需要传入数值型参数，实际上传入字符串参数），当发现这样的事故，程序需要抛出一个异常。

throw语句会中断函数的执行；会抛出一个exception对象：具有异常的name属性和描述异常的message属性。

异常可以被try-catch捕获。产生异常的代码被try语句捕获，函数会跳转到catch语句执行。一个try语句只会有一个捕获所有异常的catch（一个try中只有一个catch）

如果解决异常的手段取决于异常的类型，异常检查器需要检查异常对宪法的name属性来确定异常的类型。

```js
function add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add function needs number'
    };
  }
  return a + b;
}
function tryIt = function() {
  try {
    add("ten", 20);
  }
  catch (e) {
    console.log(e);
  }
}
```



##### 递归

递归在dom树结构中使用较多；

```js
let walk_the_dom = fucntion walk (node,func) {
  // 把节点和处理的函数传入，对当前节点进行处理；
  func(node);
  node = node.firstChild;
  while (node) {
    // 遍历每一个子节点，并递归处理
    walk(node, func);
    node = node.nextSibling;
  }
};

let getElementsByAttribute = function (att, value) {
  let results = [];

  walk_the_dom(document.body, fucntion(node) {
    let actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });
  return results;
}

```

##### 作用域

es6中已经有块级作用域；

##### 闭包

需要巩固





### 第五章 继承

需要巩固





### 第六章 数组

在JS中数组和对象实质都是对象，数组的属性是连续的整数。typeof(Array) = 'object'

~~~js
// 判断数组的方法
var is_array = function(value) {
  return value && typeof value === 'object' && value.constructor === Array;
};
// 不足：识别不同的window或者frame失败

//改进方法
var is_array = function(value) {
  return Object.prototype.toString.apply(value) === '[object Array]';
}
~~~

数组中的方法存放在 Array.prototype 中，对象 Object.prototype 可以被扩充，数组的原型方法也可以被扩充。

~~~js
Array.method('reduce', fucntion(f, value){
  for (let i = 0; i < this.length; i ++){
    value = f(this[i], value);
  }
  return value;
});
// 给数组扩展方法：传入一个函数和初始值，对数组的每一项运行函数。下面是实际案例。
let data = [1, 2, 3, 4];
var add = function(a, b) {
  retunr a + b;
}
var mult = function(a, b) {
  retunr a * b;
}
var sum = data.reduce(add, 0);
// 将数组执行add方法，初始值是0
var prodect = data.reduce(mult, 1);
// 将数组执行mult方法，初始值是1
~~~

一个数组可以通过下标设置属性，同时可以直接使用点语法设置属性。可以说，array.length 就是类似的对象的点语法。

JS 数组没有多维数组，支持元素为数组的数组，这里我们构造一个矩阵。

~~~js
Array.matrix = function(m, n, init) {
  var mat = [];
  for (var i = 0; i < m; i++) {
    a = [];
    for (var j = 0; j < n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
}

var myMatrix = Array.matrix(4, 4, 0);
document.writeLn(myMatrix);
// 生成一个0填充的 4*4 的矩阵。

// 单位矩阵
Array.identity = function(n) {
  let mat = Array.matrix(n, n, 0);
  for (let i = 0; i < n; i++) {
    mat[i][i] = 1;
  }
  return mat;
};
myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3]);
~~~



### 第七章 正则表达式

正则表达式书写很复杂，后期维护相对复杂。写的时候最好是短小精悍。

~~~js
var parse = /^(?:[A-Za-z]+)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

// 划分网址
~~~



### 第九章 方法

#### Array

Array.concat 将多个数组，变量组合成一个新的数组。这个数组会浅复制一个数组，并将其他元素或者数组插入到新数组后面。

Array.join(seperator) 将数组的不同元素连接成字符串，原理是将每一项转化成一个字符串，将这些字符串连接。

Array.pop() 移出数组中的最后一个元素并返回（类似于堆栈stack），如果是空数组，那么返回undefined。

Array.push(item1, item2)在数组最后添加一个元素，原始数组改变，返回值是新数组的长度。

Array.reverse() 数组前后翻转，原始数组变成新数组，返回值就是新数组。

Array.shift() 移出数组的第一个元素（空数组返回undefined）shift 比 pop 速度慢很多。

array.unshift 在第一位增加元素，返回值是新数组的长度

array.slice(a, b) 浅复制数组的一部分，前面试闭区间后面是开区间；如果只有一个参数，表示从这个参数复制到数组的末尾。=>复制旧数组中的一部分

Array.sort() 字符串排序：可以给字符串进行排序，不能直接给数组排序（首先将数组转化成字符串，对字符串进行比较，通常会出错）；当然，可以在此基础上，增加一个数组排序或者对象排序的方法。

Array.splice(a, b, c) 删除数组的一部分：将数组的a位置，删除b个元素，加入c元素。（c可选参数）

```js
var a = [1, 2, 3];
var b = [4, 5, 6];
var c = a.concat(b, true);
a.push(6,7); // 这里改变数组a, 不会影响新的数组c。因为已经产生了新的数组c。
console.log(c);
// [1,2,3,4,5,6,true]
```

#### Function

~~~js
// function.apply 传递一个绑定到 this 上的对象和一个可选的数组作为参数。
Function.method('bind', function(that) {
  // 返回一个函数。调用这个函数就是调用这个对象的一个方法
  var method = this;
  var slice = Array.prototype.slice;
  var args = slice.apply(arguments, [1]);
  return function() {
    return method.apply(that,
      args.concat(slice.apply(arguments, [0])));
  };
});

let x = function() {
  return this.value;
}.bind({ value: 666 });

alert(x());
~~~

数组的 call 和 apply ：将一个对象的方法放在另一个对象上面，另一个对象可以使用这些方法。

Obj1.method1.call(Obj2, para1, para2); object 具有method1 方法，但是 object2 没有method1方法。所以这里Object2 借用object1 的method 方法，然后传入的参数是两个，进行继承。

Obj1.method2.apply(Obj2, [para1, para2]) apply 传入的参数是一个数组，其他的功能和效果类似。

详见 call.js 代码

##### Number

数值转化成不同字符串的几种方法

~~~js
// toExponential() 转换成一个指数形式的字符串；
Math.PI.toExponential(2); // 3.14e+0

// toFixed 转化成一个十进制数的字符串，参数是小数点后的位数
Math.PI.toFixed(5); // 3.14159

// toPrecision 转化成一个十进制的字符串，参数是数字的精度
Math.PI.toPrecision(3); // 3.14

// toString(16) 转化成一个字符串，参数是转换的进制，默认是10
Math.PI.toSting();
~~~

##### Object

object.hasOwnProperty 这个方法可以监测对象的属性，但是原型链中的同名属性不会检查；

~~~js
var a = {isLoading: true};
a.hasOwnProperty('isLoading') => true

var b = Object.create(a);
// 创建一个新对象b，其中的__proto__ 就是a, b对象可以访问a对象原型链上的方法和属性
b.hasOwnProperty('isLoading') => false
console.log(b.isLoading) => true
~~~

##### RegExp 正则表达式

**exec**

匹配字符串的最强大最慢的方法。如果匹配正则表达式，就返回一个数组，数组不同的项就是分组捕获的文本。如果匹配失败，就会返回 null。如果全局检索g，查找不会从这个字符串的开始位置，而是从regexp.lastIndex 开始。如果进行另一次查询，需要将 regexp.lastIndex 重置为0。

~~~js
// 将HTML文本分解成标签和文本
var text = '<html><body bgcolor=linen><p>' + '</p></body></html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>*])>/g;
var a, i ;

while ((a = tags.exec(text))) {
  for (i = 0; i < a.length; i++) {
    console.log((i + a[i]).entityify());
  }
}
~~~

**test**

匹配正则表达式最简答的方法，如果正则表达式匹配字符串，返回的是布尔值，不能使用全局的g标识。

~~~js
var b = /&.+/.test('Tom &amp; beans');
RegExp.method('test', function(string) {
  return this.exec(string) !== null;
});
~~~

##### string

字符串的方法是最常用的方法

~~~js
string.charAt(position); // 返回字符串中某个位置的字符，如果位置超过长度或者是负数，那么返回一个空字符串
string.charCodeAt(pos); // return 字符码位 if(pos > string.length) return NaN
string.concat('a', 'b'); //通常直接加号链接字符串即可
string.indexOf('test', 10); // 从位置10开始检错，查询test字符串，返回第一个匹配字符的位置，找不到返回-1
string.lastIndexOF('test', 3); // 从末尾开始查找
string.match(regexp) //让字符串和一个正则表达式进行匹配，依据g标识来决定怎样进行分配。如果没有g, string.match(regexp) 和 regexp.exec(string) 结果相同。如果regexp具有g标识，那么返回一个匹配的数组。
string.replace('search', 'replace'); // 如果标明g，就是替换第一个匹配的字符。
string.search(regexp); // 类似于indexOf 传入的参数是正则表达式，返回第一个匹配字符的首字符位置(没有position参数)
var text = 'hello world "anynone" tall';
var position = text.search(/["']/);

string.slice(start, end); // 复制string的一部分构造一个新的字符串。如果是负数，就从后面开始；默认end是string.length.
string.split(seperator, limit); // 将字符串按照分隔符分割成片段，并创建一个字符串数组。limit表示分割片段的数量。分隔符可以使字符串或者是正则表达式。如果分隔符是空字符，返回单字符的数组。

var ip = '192.168.0.1';
var b = ip.slice('.'); // ['192', '168', '0', '1']

string.toLowerCase();
string.toUpperCase();
string.fromCharCode(char...); //根据数字编码创建一个字符串 

截取一个字符串的方法：最好使用slice, 不要使用substring 因为后者无法使用负数；
~~~

### 第九章 代码风格

JS 对代码格式要求不要，容错性很高，这样可能造成bug。多写一个大括号可能避免if的作用范围。写合适的注释并及时更新注释(代码会更新，注释也需要更新)。详细的代码风格可以参考《代码整洁之道》这本书。

### 第十章 优美的特性

**函数是顶级对象**

函数具有词法作用域的闭包(lambda)

**基于原型继承的动态对象**

对象是无类别的。一个对象可以通过普通的赋值增加一个新成员属性；一个对象可以从另一个对象继承成员属性。

**对象字面量和数组字面量**

便捷的创建对象和数组(来源于JSON)



### 附录A 毒瘤

##### 全局变量

全局变量可能造成内存泄漏；大型程序中可能和另一个变量名冲突；可以被程序的任何部分在任何时间修改(降低了程序的可靠性)

定义全局变量的三种方法：在函数外部使用 var foo = value; 给全局对象window增加一个属性 window.foo = value; 使用未声明的变量(隐式全局变量，会造成很大的麻烦)

##### 作用域

JS具有代码块，但是没有块级作用域。其他语言中，声明变量在第一次使用是，在JS中可以在每个函数开头部分声明变量。

##### 自动插入分号

如果return后没有加分号，就会自动增加分号 return; 返回一个undefined

##### typeof

typeof(null) => Object 所以不能用这种方法检测null

可以使用 null === null (true) 检测null

对于正则表达式，大部分浏览器返回 object

##### parseInt

parseInt 会把字符串转化成整数，如果遇到非字符就会停止解析。parseInt('16 tons') => 16.

s如果遇到的字符串第一个是0，parseInt 会按照八进制转换，这可能造成错误。

parseInt('089') => 0

解决 parseInt('089', 10) => 89 按照十进制进行转化。

##### 加法

确保加法的两个数都是整数。如果计算货币需要圆角分，需要先转化成分进行计算(之后再还原成元)。

##### NaN

计算错误会产生NaN。如果一个计算结果是NaN，那么可能输入项或者计算过程中产生了NaN。可以使用 isNaN 判断。

~~~js
isNaN('oop'); //true
isNaN('0'); //false
~~~

##### 伪数组

JS 中的数组实际上是对象。不需要考虑越界的问题，但是性能比C语言中的数组差很多。判断数据不能使用 typeof，需要判断 constructor.

~~~js
if (my_value && typeof(my_value) === 'object' && my_value.constructor === Array) {
  console.log('parameter is an array');
}
~~~

函数参数构成伪数组 arguments 不是一个数据，是一个对象，具有 length 属性。

hasOwnProperty 是对象的一个方法，可以判断对象内部是否有一个键；但是这个方法可以被更改(object.hasOwnProperty = null;)，此时就会出错。



### 附录B 糟粕

避免使用 ==

两个等号比较时，如果变量类型不同会强制转换，这些规则很复杂。所以尽量避免使用两个等号，最好使用三个等号。

~~~js
'' == '0' //false
0 == '' // true
0 == '0' // true
~~~

避免使用 with 语句

避免使用 eval 语句

避免在函数参数中传递字符串

减少使用 continue

减少使用 switch_case 穿越(两种情况对应一个结果，不写 return 语句。)这样在 JSLint监测效果不好

尽量使用代码块(if while) 避免因为换行程序错误。因为JS中空格不严格限制。



### 附录C JSlint

使用 JSLint 可以减少错误发生(代码行末加入分号等，避免语句错误)

使用 ++ — 避免在前面写空格，因为可能造成 + + 这样的错误

在选择结构中，JSLint不希望出现赋值语句。因为可能是比较语句(a == b) 少写了一个等号造成的赋值语句。

可以避免很多语法问题造成的潜在的bug。

这一点对于自己很有用。在自己的项目中最好可以这个库。



### 附录 JSON

JSON 主要用于不同语言数据交换。

JSON 对象可以被插入任何数据类型的值，对象可以无限层次的嵌套。但是最好的办法是扁平的数据。其他语言具有映射成JSON对象的数据类型。

可以使用 eval 函数把文本字符串转化成一个有用的数据结构，但是这种方法存在风险。

替代的方法是 JSON.parse 如果内部包含一个危险的数据，就会跑出一个错误。

本书完