### JS 语言精粹 蝴蝶书

```js
// page 18
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}
```
在JS中使用注释最好使用//。不使用/**/的形式。因为正则表达式和注释可能发生冲突造成语法错误。

在JS中number就是64位的浮点数，没有int的概念。所以在JS中1.0 === 1

指数：100 === 1e2 === 1 * 10 * 10

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

page 37

原型：公用的函数的方法可以放在对象的原型中（在es6中react中，直接放在组件的类中，作为组件的方法实现复用效果）。私有的方法单独作为对象的方法直接添加即可。

~~~js
if (typeof Object.beget !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

var another = Object.create(stooge);
another.nickname = "Moe";
~~~

原型连接在更新时是不起作用的。当我们对于对象作出改变，不会触及该对象的原型；

hasOwnproperty 会检查对象的属性，不会检查对象原型链上的属性



10.20 笔记

#### 第三章 对象

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

~~~js
for (let name in object) {
  if(typeof object[name] !== 'function') {
    console.log(name + ':' + object[name]);
  }
}
~~~
2.已知函数的属性名：使用一个数组存放函数的属性名；获取数组的长度i，使用for遍历对象的属性值。
~~~js
let properties = ['name', 'age', 'sex'];
for (let i = 0; i < properties.length; i++) {
  console.log(properties[i] + ":" + object[properties[i]]);
}
~~~
可以获取正确顺序的属性（不需要考虑原型链的属性）

##### 删除属性 delete

删除对象的属性：如果对象具有某个属性，会删除这个属性。删除操作不会触及原型链中的任何对象及属性；删除这个对象的属性，如果原型链中还有这个属性，那么还可以获取这个属性（原型链上的属性）；

减小全局变量的污染：使用let 创建局部变量在函数中。使用闭包形式向外暴露有限的接口。将全局性的资源加载到一个容器中，这样一个程序和其他程序的冲突就会降低。



#### 第四章 函数

函数是功能实现的基本单元；一个函数的功能应当简单；编程就是把一组需求分解成一组函数和数据结构的技能。避免在一个函数内部实现多个功能。

使用字面量创建的函数链接到一个 Object.prototype ，使用函数表达式创建的函数，链接到一个Function.prototype，最终通过原型链链接到 Object.prototype.

函数在创建后，会具有一个prototype属性，它的值具有一个constructor属性就是该函数的对象。

函数可以被其他部分调用。

##### 定义函数

函数的四部分：Function、函数名（匿名函数）、函数参数（parameters，形参，可选）、函数体。函数可以作为另一个函数的参数或者返回值。子函数可以访问内部的变量和参数，也可以访问外部父函数的变量和参数。函数的闭包。

##### 调用函数

函数在调用过程中，除了传入的参数（括号中的参数），还默认传入this（this的值取决于函数的四种调用模式）和arguments（实参）。当实参大于形参，arguments会存储当前的函数全部实参。

arguments在函数参数不确定的时候可以使用（或者较多参数）arguments是一个伪数组，不具有数组的方法，这就是局限性。

~~~js
let sum = function() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i ++) {
    sum += arguemnts[i];
  }
  return sum;
};
~~~

##### 函数的四种调用模式

1、方法调用模式

函数作为对象的方法。this指向这个对象。通过this，可以使得内部函数访问对象中的公共方法和属性。

~~~js
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
~~~

2、函数调用模式

一个函数不是作为对象的方法被调用，而是作为函数的形式被调用，此时 this 指向全局变量。

~~~js
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
~~~

3、构造器调用模式

使用new构造器创建函数，函数中的this绑定到新创建的对象上。（使用构造函数创建新对象是早期的方法，现在使用class关键字创建js中的class）。这种方法在最新的代码中不使用。

~~~js
let Quo = function (string) {
  this.status = sy=tring;
}
Quo.prototype.getStatus = function() {
  return this.status;
}
let myQuo = new Quo("test");
myQue.getStatue();
~~~

4、Apply调用模式：this指向apply中的第一个参数；第二个参数是参数数组；(对比call方法的使用)。

~~~js
let array = [3, 4];
let sum = add.apply(null, array);
console.log(sum === 7);

let statusObject = {
  status: "OK"
};
let status = Quo.prototype.getStatus.apply(statusObject);
console.log(status === 'OK');
~~~

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















