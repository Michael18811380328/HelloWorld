### [JS中的call()和apply()方法](http://uule.iteye.com/blog/1158829)

**1、方法定义**

**call方法:** 
语法：call([thisObj[,arg1[, arg2[,   [,.argN]]]]]) 
定义：调用一个对象的一个方法，以另一个对象替换当前对象。 
说明： 
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。 
**apply方法：** 
语法：apply([thisObj[,argArray]]) 
定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
说明： 
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。



 

**2、常用实例**

a、

Java代码 [![收藏代码](http://uule.iteye.com/images/icon_star.png)

~~~js
function add(a,b)  
{  
    alert(a+b);  
}  
function sub(a,b)  
{  
    alert(a-b);  
}  
  
add.call(sub,3,1); 
~~~

这个例子中的意思就是用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4); // 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。

 

b、

Java代码  [![收藏代码](http://uule.iteye.com/images/icon_star.png)](javascript:void())

~~~js
function Animal(){    
    this.name = "Animal";    
    this.showName = function(){    
        alert(this.name);    
    }    
}    
  
function Cat(){    
    this.name = "Cat";    
}    
   
var animal = new Animal();    
var cat = new Cat();    
    
//通过call或apply方法，将原本属于Animal对象的showName()方法交给对象cat来使用了。    
//输入结果为"Cat"    
animal.showName.call(cat,",");    
//animal.showName.apply(cat,[]);  
~~~

 call 的意思是把 animal 的方法放到cat上执行，原来cat是没有showName() 方法，现在是把animal 的showName()方法放到 cat上来执行，所以this.name 应该是 Cat

 

c、实现继承

Java代码

~~~js
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        alert(this.name);      
    }
}
    
function Cat(name){    
    Animal.call(this, name);    
}      
    
var cat = new Cat("Black Cat");     

~~~

Animal.call(this) 的意思就是使用 Animal对象代替this对象，那么 Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了.

 

d、多重继承

Java代码  [![收藏代码](http://uule.iteye.com/images/icon_star.png)](javascript:void())

~~~js
function Class10()  
{  
    this.showSub = function(a,b)  
    {  
        alert(a-b);  
    }  
}  
  
function Class11()  
{  
    this.showAdd = function(a,b)  
    {  
        alert(a+b);  
    }  
}  
  
function Class2()  
{  
    Class10.call(this);  
    Class11.call(this);  
}  
~~~



 很简单，使用两个 call 就实现多重继承了
当然，js的继承还有其他方法，例如使用原型链，这个不属于本文的范畴，只是在此说明call 的用法。说了call ，当然还有 apply，这两个方法基本上是一个意思，区别在于 call 的第二个参数可以是任意类型，而apply的第二个参数必须是数组，也可以是arguments
还有 callee，caller..



`call()` 方法调用一个函数, 其具有一个指定的`this`值和分别地提供的参数(参数的列表)。

注意：该方法的作用和 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是`call()`方法接受的是若干个参数的列表，而`apply()`方法接受的是一个包含多个参数的数组。

语法

```
fun.call(thisArg, arg1, arg2, ...)
```

### 参数

- `thisArg`

  在`fun`函数运行时指定的`this`值。需要注意的是，指定的`this`值并不一定是该函数执行时真正的`this`值，如果这个函数处于[非严格模式下](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode)，则指定为`null`和`undefined`的`this`值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的`this`会指向该原始值的自动包装对象。

- `arg1, arg2, ...`

指定的参数列表。

### 返回值

返回值是你调用的方法的返回值，若该方法没有返回值，则返回`undefined`。

描述

可以让call()中的对象调用当前对象所拥有的function。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

示例

### 使用`call`方法调用父构造函数

在一个子构造函数中，你可以通过调用父构造函数的`call`方法来实现继承，类似于`Java`中的写法。下例中，使用`Food`和`Toy`构造函数创建的对象实例都会拥有在`Product`构造函数中添加的`name`属性和`price`属性,但`category`属性是在各自的构造函数中定义的。

```
function Product(name, price) {  this.name = name;  this.price = price;   if (price < 0) {    throw RangeError(      'Cannot create product ' + this.name + ' with a negative price'    );  }} function Food(name, price) {  Product.call(this, name, price);  this.category = 'food';} //等同于function Food(name, price) {  this.name = name;  this.price = price;  if (price < 0) {    throw RangeError(      'Cannot create product ' + this.name + ' with a negative price'    );  }   this.category = 'food';} //function Toy 同上function Toy(name, price) {  Product.call(this, name, price);  this.category = 'toy';} var cheese = new Food('feta', 5);var fun = new Toy('robot', 40); 
```

### 使用`call`方法调用匿名函数

在下例中的`for`循环体内，我们创建了一个匿名函数，然后通过调用该函数的`call`方法，将每个数组元素作为指定的`this`值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个`print`方法，这个`print`方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为`this`值传入那个匿名函数（普通参数就可以），目的是为了演示`call`的用法。

```
var animals = [  {species: 'Lion', name: 'King'},  {species: 'Whale', name: 'Fail'}]; for (var i = 0; i < animals.length; i++) {  (function (i) {     this.print = function () {       console.log('#' + i  + ' ' + this.species + ': ' + this.name);     }     this.print();  }).call(animals[i], i);}
```

### 使用`call`方法调用函数并且指定上下文的'this'

在下面的例子中，当调用`greet`方法的时候，该方法的`this`值会绑定到`i`对象。

```
function greet() {  var reply = [this.person, 'Is An Awesome', this.role].join(' ');  console.log(reply);} var i = {  person: 'Douglas Crockford', role: 'Javascript Developer'}; greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer
```