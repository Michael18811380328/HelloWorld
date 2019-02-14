## curry函数

**一.为什么需要柯里化（curry函数）**

**1.先简单的介绍一下纯函数**

在函数式编程中纯函数是其最基本的思想，所谓纯函数就是一个相对不受外界影响（之所以说相对，是因为有的时候需要和外界沟通，函数没法保持所谓真正的纯，但后面会有方法来解决）.在高中数学中都学过，函数是一种映射关系，在y=f(x)这个函数式中，每一个x都有一个与之对应的y值与它唯一对应。

说了这么多好像还是不是很明白，那就来个简单的例子：

```js
//不纯的
var num=18
function foo1(enter) {
    if (enter>18) {
        console.log('wow')
    }
}

//纯的
function foo2(enter) {
    var num=18
    if (enter>18) {
        console.log('wow')
    }
}
```

两个函数实现的效果其实是一样的，但第一个函数不纯，第二个函数才是真的纯函数，它将num定义在函数体内，外界无法直接获取num，也无法改变它，相当于打雷天缩到了被窝，外面雷再大也跟我没关系了。

第一个函数之所以不纯是因为，它引用了函数体外的一个变量num，一旦你进行了外部引用，那这个函数的输出就不确定了。一旦num被改变了，那这个函数就不会按照你希望的执行下去了。不纯的函数充满的不确定性，在函数式编程中要尽量避免它。

纯函数中还有很多的好处，再此就不展开讨论了，以后有机会再详细的说说。

**2.纯函数的一个使用场景**

```js
var add=x=>(y=>x+y)//为了更贴切函数式编程，这里用了ES6的写法,等价于下面的函数
// var add=function (x) {
//     return function(y) {
//         return x+y
//     }
// }
var add2=add(2)
console.log(add2(1))
//3
```

这里使用闭包的方法，在add函数体内返回的匿名函数中有这样一句话：return x+y
它在匿名函数中保持着对x的引用，即使在垃圾回收中，x在执行上下文中已经被清理掉了，但还是能够凭借引用找到它，这就是闭包应用的简单的解释。

通过这样的写法，写函数变得更加灵活了。add2实际接受到是一个匿名参数，这个参数保留着第一次传入的参数。但你所需要的所有参数都传完（是的，可以有不止一个参数，但需要通过curry函数的帮助），再执行操作，也就是上述代码中x+y操作。

这样无论你想add10，还是add20，都很轻松了。

**问题来了**
这样写函数太挫了，而且太麻烦了，有没有什么好办法呢？答案是有，那就是今天的重头戏curry函数（通过curry函数处理一个函数的过程也叫柯里化）

先上代码：

```js
//柯里函数实质：传递给函数一部分参数来调用它，让它返回一个函数来处理剩余参数
function curry(fx) {
    //要进行柯里化的函数的形参数量
    var arity=fx.length
    return function f1() {
        //第一次传入的参数数量
        var args=[].slice.call(arguments,0)
        //若传入的参数数量大于等于形参数量,代表现在万事俱备（参数齐全了），可以直接执行函数了,直接将参数全部传入fx函数中，并执行它
        if (args.length>=arity) {
            return fx.apply(null,args)
        }else{
            var f2=function() {
                //如果只传入了一部分参数
                var args2 = [].slice.call(arguments, 0)
                //判断是否所有参数都传完了，如果没有，不断concat新传的参数，然后执行f1函数
                return f1.apply(null, args.concat(args2))
            }
            return f2
        }

    }
}
```

其实看书看到这部分的时候作者直接用lodash库中的curry，看的十分蛋疼，觉得没有详细的代码总归不能理解的透彻。结果点开github上的作业（这本书有习题，就在GitHub上），发现有curry函数的实现。看了一圈有些小的不太理解的地方修改了一下，成了现在看到的函数。

现在就可以用curry了，用起来也是十分舒服（偷懒直接上书上代码）：

```js
var match = curry(function(what, str) {
return str.match(what);
});
var replace = curry(function(what, replacement, str) {
return str.replace(what, replacement);
});
var filter = curry(function(f, ary) {
return ary.filter(f);
});
var map = curry(function(f, ary) {
return ary.map(f);
});

match(/\s+/g, "hello world");
// [ ' ' ]
match(/\s+/g)("hello world");
// [ ' ' ]
var hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }
hasSpaces("hello world");
// [ ' ' ]
hasSpaces("spaceless");
// null
filter(hasSpaces, ["tori_spelling", "tori amos"]);
// ["tori amos"]
var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(
/\s+/g) }) }
findSpaces(["tori_spelling", "tori amos"]);
// ["tori amos"]
```

这样是不是就能感受到curry的强大之处呢。在以后的函数式编程中还会不断的遇见它的。
（写在最后，关于curry函数实现的一点小问题，使用ES6的箭头函数更贴切函数式编程的思想，但是箭头函数无法识别arguments对象，所以还是老老实实写匿名函数把）
（本文属于读书笔记，看的书是js函数式编程，在gitbook上就能看到）