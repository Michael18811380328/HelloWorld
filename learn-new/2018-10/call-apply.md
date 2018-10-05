### 详解 JavaScript的 call() 和 apply()

#### 定义

ECMAScript规范为所有函数都包含两个方法(这两个方法非继承而来), `call` 和 `apply` 。这两个函数都是在特定的作用域中调用函数,能改变函数的作用域，实际上是改变函数体内 `this` 的值 。

call 和 apply

| 语法                       | 定义                                               | 说明                                                         |
| -------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| call(thisObj，Object)      | 调用一个对象的一个方法，以另一个对象替换当前对象。 | call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象.如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj |
| apply(thisObj，[argArray]) | 应用某一对象的一个方法，用另一个对象替换当前对象。 | 如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数 |

#### 用法

###### 调用函数，传递参数

```
    //定义一个add 方法
    function add(x, y) {
        return x + y;
    }

    //用call 来调用 add 方法
    function myAddCall(x, y) {
        //调用 add 方法 的 call 方法
        return add.call(this, x, y);
    }

    //apply 来调用 add 方法
    function myAddApply(x, y) {
        //调用 add 方法 的 applly 方法
        return add.apply(this, [x, y]);
    }

    console.log(myAddCall(10, 20));    //输出结果30
  
    console.log(myAddApply(20, 20));  //输出结果40
```

我们看到通过方法本身的`call` 和 `apply` 执行了该函数。

###### 改变函数作用域

```
    var name = '小白';

    var obj = {name:'小红'};

    function sayName() {
        return this.name;
    }

    console.log(sayName.call(this));    //输出小白

    console.log(sayName. call(obj));    //输入小红
```

我们改变了函数运行的作用域， 通过绑定不同的对象，函数内部 `this` 也不同。最终输入结果才会这样。

#### 高级用法，实现 js 继承

```
    //父类 Person
    function Person() {
        this.sayName = function() {
            return this.name;
        }
    }

    //子类 Chinese
    function Chinese(name) {
        //借助 call 实现继承
        Person.call(this);
        this.name = name;

        this.ch = function() {
            alert('我是中国人');
        }
    }

    //子类 America
    function America(name) {
        //借助 call 实现继承
        Person.call(this);
        this.name = name;

        this.am = function() {
            alert('我是美国人');
        }
    }


    //测试
    var chinese = new Chinese('成龙');
    //调用 父类方法
    console.log(chinese.sayName());   //输出 成龙

    var america = new America('America');
    //调用 父类方法
    console.log(america.sayName());   //输出 America
```

#### 区别

- 参数不同, apply 传入的是一个参数数组，也就是将多个参数组合成一个参数数组， call 从第二个参数开始依次传入.
- apply 可以直接将当前函数的arguments对象作为apply的第二个参数传入

#### 结束语

`call` 和 `apply` 最大的好处:方便我们解耦，对象不需要和方法有任何的耦合性，能使我们写出更好的面相对象程序。
大家如果看一些 js 框架底层的话会看到好多地方都有大量用到。