### JS 设计模式

#### 1、工厂模式

~~~js
var lev=function(){
       return  "嘿哈"; 
};
function Parent(){
    var Child = new object();
    Child.name = "李小龙";
    Child.age = "30";
    Child.lev = lev;
    return Child;
        
};
var x=Parent();
 alert(x.name);
 alert(x.lev());
~~~

说明：

1. 在函数中定义对象，并定义对象的各种属性，虽然属性可以为方法，但是建议将属性为方法的属性定义到函数之外，这样可以避免重复创建该方法。
2. 引用该对象的时候，这里使用的是 var x = Parent()而不是 var x = new object(); 因为后者可能会出现很多问题（前者也成为工厂经典方式，后者称之为混合工厂方式），不推荐使用new的方式使用该对象。
3. 在函数的最后返回该对象。
4. 不推荐使用这种方式创建对象，但应该了解。  



#### 2、构造函数模式

~~~js
var lev=function(){
       return  "嘿哈"; 
};
function Parent(){
    this.name = "李小龙";
    this.age = "30";
    this.lev = lev;     
};
var x=Parent();
 alert(x.name);
 alert(x.lev());
~~~

1. 与工厂方式相比，使用构造函数方式创建对象无需在函数内部创建对象，而使用this指代，并而函数无需明确return。
2. 同工厂模式一样，虽然属性的值可以为方法，仍建议将该方法定义在函数之外。
3. 同样的，不推荐使用这种方式创建对象，但仍需了解。



#### 3、原型模式

~~~js
var lev=function(){
       return  "嘿哈"; 
};
function Parent(){
    Parent.prototype.name = "李小龙";
    Parent.prototype.age = "30";
    Parent.prototype.lev = lev;     
};
var x=Parent();
 alert(x.name);
 alert(x.lev());
~~~

说明：

1. 函数中不对属性进行定义。
2. 利用prototype属性对属性进行定义。
3. 同样的额，不推荐使用这样的方式创建对象。



#### 4、构造函数+原型的js混合模式（推荐）

~~~js
function Parent(){
    this.name = "李小龙";
    this.age = "30";     
};
Parent.prototype.lev=function(){
return this.name;
}
var x=Parent();
 alert(x.name);
 alert(x.lev());
~~~

1. 该模式是指混合搭配使用构造函数和原型方式。
2. 将所有的属性，不是方法的定义在函数中（构造函数的方式），将所有属性值为方法的利用prototype在函数之外定义（原型方式）。
3. 推荐使用这样的方式创建对象，这样有好处。



#### 5、构造函数+原型的动态原型模式（推荐）

~~~js
function Parent(){
    this.name = "李小龙";
    this.age = "30"; 
    if(typeof Parent.lev == "undefined"){
        Parent.prototype.lev = function(){
            return this.name;
        }
        Parent.lev = true;
    }    
};

var x=Parent();
 alert(x.lev());
~~~

1. 动态原型方式可以理解为混合构造函数，原型方式的一个特例。
2. 该模式中，属性为方法的属性直接在函数中进行了定义，但是因为从而保证创建该对象的实例时，属性的方法不会被重复的创建。

~~~js
if(typeof Parent.lev == "undefined"){
  Parent.prototype.lev = function(){
    return this.name;
  }
  Parent.lev = true;
} 
~~~
