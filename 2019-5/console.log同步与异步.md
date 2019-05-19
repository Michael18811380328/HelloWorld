最近帮助一个后端同事调试时，`console.log()`他说结果不正确，因为会出现同步或者异步输出的情况。查阅资料自己整理后，发现确实存在这个问题。

#### 问题现象



#### 异常出现原因分析

在分析之前，我们得知道一点，JS中对象是引用类型，每次使用对象时，都只是使用了对象在堆中的引用。

`console.log`打印的是对象当时的快照，展开对象时，它其实是重新去内存中读取对象的属性值，。

#### 浏览器或者可以说是开发者工具为什么会有这样的表现？

《你不知道的javascript中卷》第二部分异步和性能1.1节异步控制台部分有提及：

> There is no specification or set of requirements around how the console.* methods work -- they are not officially part of JavaScript, but are instead added to JS by the hosting environment (see the Types & Grammar title of this book series).
> So, different browsers and JS environments do as they please, which can sometimes lead to confusing behavior.
> In particular, there are some browsers and some conditions that console.log(..) does not actually immediately output what it's given. The main reason this may happen is because I/O is a very slow and blocking part of many programs (not just JS). So, it may perform better (from the page/UI perspective) for a browser to handle console I/O asynchronously in the background, without you perhaps even knowing that occurred.

翻译：

> 并没有什么规范或一组需求指定console.* 方法族如何工作——它们并不是JavaScript 正式的一部分，而是由宿主环境（请参考本书的“类型和语法”部分）添加到JavaScript 中的。因此，不同的浏览器和JavaScript 环境可以按照自己的意愿来实现，有时候这会引起混淆。
> 尤其要提出的是，在某些条件下，某些浏览器的console.log(..) 并不会把传入的内容立即输出。出现这种情况的主要原因是，在许多程序（不只是JavaScript）中，I/O 是非常低速的阻塞部分。所以，（从页面/UI 的角度来说）浏览器在后台异步处理控制台I/O 能够提高性能，这时用户甚至可能根本意识不到其发生。

书中还了个例子：

```js
var a = {
    index: 1
};
// 然后
console.log( a ); // ??
// 再然后
a.index++;
```

我们通常认为恰好在执行到`console.log(..)` 语句的时候会看到a 对象的快照，打印出类似于`{ index: 1 } `这样的内容，然后在下一条语句`a.index++ `执行时将其修改，这句的执行会严格在a 的输出之后。

大部分情况下代码在开发者工具的控制台中输出的对象表示与期望是一致的。但是，这段代码运行的时候，浏览器可能会认为需要把控制台I/O 延迟到后台，在这种情况下，等到浏览器控制台输出对象内容时，`a.index++` 可能已经执行，因此会显示{ index: 2 }。

到底什么时候控制台I/O 会延迟，甚至是否能够被观察到，这都是游移不定的。

所以如果在调试的过程中遇到对象在console.log(..) 语句之后被修改，可你却看到了意料之外的结果，要意识到这可能是这种I/O 的异步化造成的。

> 如果遇到这种少见的情况，最好的选择是在JavaScript 调试器中使用断点，而不要依赖控制台输出。次优的方案是把对象序列化到一个字符串中，以强制执行一次“快照”，比如通过JSON.stringify(..)。

#### 结论

结论：console.log打印出来的内容不一定正确。一般对于普通类型`number、string、boolean、null、undefined`的输出是可信的。但对于`Object`等引用类型来说，则就会出现上述异常打印输出。

所以对于一般基本类型的调试，调试时使用console.log来输出内容时，不会存在坑。但调试对象时，最好还是使用打断点(`debugger`)这样的方式来调试更好。