# Rxjs

RxJS是使用Observables 的响应式编程的库，它使编写异步或基于回调的代码更容易。它采用了订阅者模式，带有纯函数式编程的思想。

## 简介

Rxjs的内容可以概括为**一个核心三个重点**，核心就是**Observable**和**Operators**，三个重点分别是：

- observer 观察者
- Subject
- schedulers 调度器

其中众多的operator一直是我门学习Rxjs路上的拦路虎。

### 例子

```js
var observable = Observable.create(function(observer) {
  observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
  observer.next('Anna');
})

// 订阅 observable    
observable.subscribe(function(value) {
  console.log(value);
})
```

通过Observable身上的**create**方法可以创建一个Observable，参数中的回调函数设置这个Observable将会如何传递值，然后通过subscribe订阅这个Observable。

> 这里值得一提的是rxjs的subscribe是**同步**执行的，例如下边这段代码:

```javascript
var observable = Observable.create(function(observer) {
  observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
  observer.next('Anna');
})

console.log('start');
observable.subscribe(function(value) {
  console.log(value);
});
console.log('end');
```

最终结果为：

```ruby
start
Jerry
Anna
end
```

通过subscribe订阅启动的代码在第二个log之后才在控制台打印，由此可以看出subscribe是同步执行的。

## Rxjs的operators

学好Rxjs的 operarors 是学会Rxjs的关键。本人按照自己的理解将Operators分为8类

### 创造类observable

#### create

```javascript
const observable = Observable.create((observe) => {
  observe.next('value')
});

observable.subscribe({
  next:() => {
  },
  complete: () => {
  },
  error: () => {
  }
}
```

#### of

感觉of类似于一个迭代器，将参数迭代然后发出。

```javascript
var source = of('Jerry', 'Anna');

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(error)
  }
});
```

#### from

from的参数必须是一个**类数组**（set,iterator等），其他和of一样

```javascript
var arr = ['Jerry', 'Anna', 2016, 2017, '30 days'] 
var source = from(arr);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(error)
  }
});

// Jerry
// Anna
// 2016
// 2017
// 30 days
// complete!
```

#### fromPromise

遍历promise，其他和前两个一样

```javascript
var source = fromPromise(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello RxJS!');
  },3000)
}))

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(error)
  }
});
```

#### fromEvent

```javascript
var source = fromEvent(document.body, 'click');

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(error)
  }
});
```

#### Empty,never和throw

`empty` 會給我們一個**空**的 observable，如果我們订阅这个 observable ， 它会立即响应**complete** 函数。

```javascript
var source = empty();

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log(error)
  }
});
// complete!
```

`throw`，它也只做一件事就是拋出错误。

```javascript
var source = throw('Oop!');

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// Throw Error: Oop!
```

數學上還有一個跟零(0)很像的數，那就是 **無窮(∞)**，在 Observable 的世界裡我們用 `never` 來建立無窮的 observablenever 會給我們一個無窮的 observable，如果我們訂閱它又會發生什麼事呢？...什麼事都不會發生，它就是一個一直存在但卻什麼都不做的 observable。

#### Interval和timer

interval和setInterval一样，几秒钟发送一个值，如下边代码所示：

```javascript
var source = interval(1000);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// 1
// 2
// ...
```

参数为设定多少毫秒钟发送一个值。

**timer**有两个参数，第一个参数表示到发送第一个值的间隔时间，第二个参数表示从发送第二个参数开始，没发送一个值的间隔时间，如果第二个参数为空则发送第一个参数后，终止，执行complete函数。

```javascript
var source = Rx.Observable.timer(1000, 5000);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// 1
// 2 ...
```

### 选择器类

##### take

有的时候我门希望获取Observable前几个数然后结束（执行complete方法）

```javascript
var source = interval(1000);
var example = source.pipe(take(3));

example.subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
});
// 0
// 1
// 2
// complete
```

#### first

取第一个数然后结束，和take(1)效果一样

```javascript
var source = interval(1000);
var example = source.pipe(first());

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});

// 0
// complete
```

#### takeLast，last

takeLast和take用法一样，区别是该方法是取后边几个值，例子如下：

```javascript
var source = interval(1000).pipe(take(6), takeLast(2));

source.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 4
// 5
// complete
```

last是take Last（1）的简写，目的是取最后一个值。

```javascript
var source = interval(1000).pipe(take(6), last());

source.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 5
// complete
```

### 控制数据流额类

#### takeUntil

参数为一个Observable,当参数Observable订阅发生，终止takeUntil绑定的observable。

下边这个案例，当点击body时就会终止订阅。

```javascript
const click = fromEvent(document.body, "click");
const source = interval(1000).pipe(takeUntil(click));

source.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 0
// 1
// 2
// 3
// complete 当点击body
```

#### skip

使用方式类似take，take是取前几个，skip的意思是跳过前几个，取后边几个。

```javascript
const source = interval(1000).pipe(skip(3));

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 3
// 4
// 5...
```

上边的例子中就跳过了前三个值，**但是要注意的是获取前三个值的时间还是要等待的**

#### startWith

塞一个初始值给Observable

```javascript
const source = interval(1000).pipe(startWith('start'));

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// start
// 0
// 1
// 2
// 3...
```

#### concat

**concat**和**concatAll**效果是一样的，区别在于 concat要传递参数，参数必须是Observable类型。

concat 将多个observable串接起来前一个完成好了，再执行下一个。



```javascript
const source1 = interval(1000).pipe(take(3));
const source2 = of(3);
const source3 = of (4,5);
const example = source1.pipe(concat(source2,source3))
example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 0
// 1
// 2
// 3
// 4
// 5
// complete
```

#### merge

merge使用方式和concat一样，区别就是merge处理的Observable是异步执行的，没有先后顺序。



```javascript
const source1 = interval(1000).pipe(take(3));
const source2 = of(3);
const source3 = of (4,5);
const example = source1.pipe(merge(source2,source3))
example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});

// 3
// 4
// 5
// 0
// 1
// 2
// complete
```

#### delay和delayWhen

delay会将observable第一次发出订阅的时间延迟，如下：



```javascript
const example = interval(300).pipe(take(5),delay(500));
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 0
// 1
// 2
// 3
// 4
```

delayWhen和delay不同，他的延迟时间由参数函数决定，并且会将主订阅对象发出的值作为 参数：



```javascript
var example = interval(300).pipe(
  take(5),
  delayWhen(
    x => Rx.Observable.empty().delay(100 * x *x));
);

example.subscribe({
  next: (value) => { console.log(value); },
  error: (err) => { console.log('Error: ' + err); },
  complete: () => { console.log('complete'); }
});
```

上边的例子会将第一次source发出的值作为参数传给delayWhen的函数作为参数,只有在参数对象中的Observable发出订阅的值，主订阅对象才会继续发出订阅的值。

#### debounceTime

debounce 在每次收到元素，他会先把元素 cache 住并等待一段时间，如果這段時間內已經沒有收到任何元素，則把元素送出；如果這段時間內又收到新的元素，則會把原本 cache 住的元素釋放掉並重新計時，不斷反覆。

```javascript
var example = interval(300).pipe(take(5),debounceTime(1000));

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 4
// complete
```

#### throttleTime

跟 debounce 的不同是 throttle 會先開放送出元素，等到有元素被送出就會沈默一段時間，等到時間過了又會继续发送元素,防止某个事件频繁触发，影响效率。

```javascript
var example = interval(300).pipe(take(5),
                                throttleTime(1000);
                               );
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 0
// 4
// complete
```

#### distinct和distinctUntilChanged

distinct会和已经拿到的数据比较过滤掉 重复的元素如下：

```javascript
var example = from(['a', 'b', 'c', 'a', 'b']).pipe(
zip(interval(300), (x, y) => x),
    distinct()
)
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// a
// b
// c
// complete
```

distinct第一个参数是个函数，函数返回值就是distinct比较的值：



```javascript
var source = from([{ value: 'a'}, { value: 'b' }, { value: 'c' }, { value: 'a' }, { value: 'c' }]).pipe(
zip(Rx.Observable.interval(300), (x, y) => x)
)
            .
var example = source.pipe(
distinct((x) => {
    return x.value
})
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// {value: "a"}
// {value: "b"}
// {value: "c"}
// complete
```

但是distinct底层是创建一个set来辅助去重，如果数据很大，可能导致set过大，这个时候就需要设置distinct第二个参数来刷新set，第二个 参数是个observable到发起订阅的时候就会清空set



```javascript
var flushes = interval(1300);

var example = from(['a', 'b', 'c', 'a', 'c']).pipe(
zip(interval(300), (x, y) => x),
    distinct(
    null,flushes
    )
)
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});

// a
// b
// c
// c
// complete
```

distinctUntilChanged与distinct不同之处就是，distinctUntilChanged只会比较相邻两次输入，例子如下：



```javascript
var example = from(['a', 'b', 'c', 'c', 'b']).pipe(
            .zip(interval(300), (x, y) => x),
    distinctUntilChanged()
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// a
// b
// c
// b
// complete     
```

### 协调多个Observable类

#### combineLatest

协调过个observable，参数Observable中有一个发生变化都会发起订阅（**前提是每个observable都有值**）。



```javascript
// RxJS v6+
import { timer, combineLatest } from 'rxjs';

// timerOne 在1秒时发出第一个值，然后每4秒发送一次
const timerOne = timer(1000, 4000);
// timerTwo 在2秒时发出第一个值，然后每4秒发送一次
const timerTwo = timer(2000, 4000);
// timerThree 在3秒时发出第一个值，然后每4秒发送一次
const timerThree = timer(3000, 4000);

// 当一个 timer 发出值时，将每个 timer 的最新值作为一个数组发出
const combined = combineLatest(timerOne, timerTwo, timerThree);

const subscribe = combined.subscribe(latestValues => {
  // 从 timerValOne、timerValTwo 和 timerValThree 中获取最新发出的值
    const [timerValOne, timerValTwo, timerValThree] = latestValues;
  /*
      示例:
    timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
    timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
    timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
  */
    console.log(
      `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
    );
  }
);
```

当conbineLatest没有传入第二个参数，返回的订阅值是个数组，但是conbineLatest可以传入第二个参数，在发给Observabler进行数据处理。



```javascript
const source1 = interval(1000).pipe();
const source2 = interval(3000);
const source3 = of(4, 5);
const example = source1.pipe(combineLatest(source2, (x, y) => {
  console.log(x,y)
  return  x + y
}));
example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 2
// 3
// 4
// 5
// ........
```

#### zip

和combineLatest用法基本一样，主要作用也是协调几个observable，zip的特点是只会取几个observable对应的index的值进行计算，例子如下：



```javascript
const source1 = interval(1000).pipe(take(3));
const source2 = interval(3000).pipe(takee(3));
const example = source1.pipe(zip(source2, (x, y) => {
  return  x + y
}));
example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// 0
// 2
// 4
// complete
```

#### withLatestFrom

withLatestFrom和combineLatest用法很类似，withLatestFrom主要特点是只有在，主Observable发起值的时候才会发动订阅，不过如果副Observable没有发送过值，也不会发起订阅，例子如下：



```javascript
var main = from('hello').pipe(
  zip(interval(500), (x, y) => x)
)
var some = from([0,1,0,0,0,1]).pipe(
  zip(interval(300), (x, y) => x)
)

var example = main.pipe(
withLatestFrom(some, (x, y) => {
    return y === 1 ? x.toUpperCase() : x;
})
)

example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
```

#### concatMap

concatMap就是map加上concatAll



```javascript
var source = fromEvent(document.body, 'click');

var example = source.pipe(
                .map(e => interval(1000).pipe(take(3))),
                .concatAll();
)

                
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

转化成concatMap就是如下这样：



```javascript
var source = fromEvent(document.body, 'click');

var example = source.pipe(
    .concatMap(
        e => interval(100).pipe(take(3))
    )
)

                
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

#### mergeMap

mergeMap同样是mergeAll加上map



```javascript
var source = fromEvent(document.body, 'click');

var example = source.pipe(
                .map(e => interval(1000).pipe(take(3))),
                .mergeAll();
)

                
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

使用mergeMap的写法就是如下这样：



```javascript
var source = fromEvent(document.body, 'click');

var example = source.pipe(
    mergeMap(
        e => interval(100).take(3)
    )
)

                
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

#### switchMap

switch在rxjs6中只有switchMap

switch对比merge和concat有个特点就是附属observable发起订阅后会立刻解绑主observable。



```javascript
var source = fromEvent(document.body, 'click');

var example = source.pipe(
                    .switchMap(
                    e => interval(100).pipe(take(3))
                )
)

                
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

三个map都有第二个参数，一个回调函数，函数用来处理每个observable发起订阅后的回调操作，函数的参数有四个，分别是：

- 外部 observable 送出的元素

- 內部 observable 送出的元素

- 外部 observable 送出元素的 index

- 內部 observable 送出元素的 index

  拿concatMap举例，在附属observable发起订阅后可以通过回调函数拿到observable的发送值进行操作，类似的应用场景在平常有很多。

  

  ```javascript
  function getPostData() {
      return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
  }
  var source = fromEvent(document.body, 'click');
  
  var example = source.pipe(
      concatMap(
                  e => from(getPostData()), 
                  (e, res, eIndex, resIndex) => res.title);
  )
  
  example.subscribe({
      next: (value) => { console.log(value); },
      error: (err) => { console.log('Error: ' + err); },
      complete: () => { console.log('complete'); }
  });
  ```

##### 

### 改变数据流结构类

#### concatAll

将传递过来的Observable进行处理，一个个进行订阅，前边的处理完再处理后边的Observable，这样原本类似为二维数组的结构就变成一维数组了。



```javascript
const {Observable, interval, of} = rxjs;
const { map, throttleTime, takeUntil, tap, take, concatAll, switchMap } = rxjs.operators

var obs1 = interval(1000).pipe(take(5))
var obs2 = interval(500).pipe(take(2));
var obs3 = interval(2000).pipe(take(1));

var source = of(obs1, obs2, obs3);

var example = source.pipe(concatAll());

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

上边的例子中会一个个按照顺序执行obs1、obs2、obs3

concatAll没有参数，将多个observable串行处理，前一个处理完再处理后边的observable



```javascript
var click = fromEvent(document.body, 'click');
var example = click.pipe(
    map(e => interval(1000)),
    concatAll()
)
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// (點擊後)
// 0
// 1
// 2
// 3
// 4
// 5 ...
```

#### mergeAll

mergeAll和concatAll用法基本一致，区别在于mergeAll是并行处理Observable，实例如下：



```javascript
var click = fromEvent(document.body, 'click');
var source = click.pipe(
    map(e => interval(1000))
);

var example = source.mergeAll();
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

mergeAll使用特殊的一点就是mergeAll可以传递一个参数，这个参数表示最大并行处理数量，当处理的observable数量大于这个数字的时候，就需要等待在处理的observable有完成的才会分配资源处理。mergeAll(1)的效果就和concatAll效果一样。

#### 数据操作类

#### map

和JavaScript中的map一样

##### filter

执行函数返回值为false就过滤掉

#### mapTo

将参数转换为一个固定值



```javascript
var source = interval(1000);
var newest = source.pipe(mapTo(2)); 

newest.subscribe(console.log);
// 2
// 2
// 2
// 2..
```

#### scan

数据累加计算



```javascript
var main = from('hello').pipe(
  zip(interval(500), (x, y) => x)
)
const example = main.pipe(
  scan(
  (origin,next)=> origin + next
  )
)
example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
// h
// he
// hel
// hell
// hello
// complete
```

scan第二个参数为初始值

下边综合几个operator实现一个例子



```javascript
const addButton = document.getElementById('addButton');
const minusButton = document.getElementById('minusButton');
const state = document.getElementById('state');

const addClick = fromEvent(addButton, 'click').mapTo(1);
const minusClick = fromEvent(minusButton, 'click').mapTo(-1);

const numberState = empty().pipe(
  .startWith(0)
  .merge(addClick, minusClick)
  .scan((origin, next) => origin + next, 0)
)

  
numberState
  .subscribe({
    next: (value) => { state.innerHTML = value;},
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
  });
```

#### repeat

很多时候如果Observable没有发生错误，我门也希望可以重复发起订阅，这个时候就要用到repeat方法了，repeat用法和retry基本一样



```javascript
var example = from(['a','b','c']).pipe(
    zip(interval(500), (x,y) => x),
    repeat()
)
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

最后提供一个错误handle案例



```javascript
const title = document.getElementById('title');

var example = from(['a','b','c','d',2]).pipe(
            .zip(Rx.Observable.interval(500), (x,y) => x)
            .map(x => x.toUpperCase()), 
            // 通常 source 會是建立即時同步的連線，像是 web socket
                catch(
                (error, obs) => empty().pipe(
                    .startWith('連線發生錯誤： 5秒後重連')
                    .concat(obs.pipe(delay(5000)))
                    )           
                 )
)
example.subscribe({
    next: (value) => { title.innerText = value },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

#### groupBy

groupBy类似数据库中的group命令一样



```javascript
var people = [
  { name: "Anna", score: 100, subject: "English" },
  { name: "Anna", score: 90, subject: "Math" },
  { name: "Anna", score: 96, subject: "Chinese" },
  { name: "Jerry", score: 80, subject: "English" },
  { name: "Jerry", score: 100, subject: "Math" },
  { name: "Jerry", score: 90, subject: "Chinese" }
];

var example = from(people).pipe(
  groupBy(item => item.name),
  map(group =>
    group.pipe(
      reduce((acc, cur) => ({
        name: cur.name,
        score: acc.score + cur.score
      }))
    )
  ),
  mergeAll()
);

example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
```

### 缓存类

##### buffer、bufferTime和bufferCount

buffer是将主observable发出的值先缓存起来，在依赖的observable发起订阅的时候在将值发出。



```javascript
var source = interval(300);
var source2 = interval(1000);
var example = source.pipe(
    buffer(source2)
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// [0,1,2]
// [3,4,5]
// [6,7,8]...
```

使用bufferTime更简单,设定时间，在规定时间内缓存值，到时间发出去



```javascript
var source = interval(300);
var example = source.pipe(
bufferTime(1000)
)


example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// [0,1,2]
// [3,4,5]
// [6,7,8]...
```

用简单的多的方式就可以表达和上边例子一样的效果

除了时间控制缓存以外我们还可以用个数控制，这就用到了**bufferCount**



```javascript
var source = Rx.Observable.interval(300);
var example = source.pipe(
    bufferCount(3)
);

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// [0,1,2]
// [3,4,5]
// [6,7,8]...
```

上边的例子就每次直到三个才会发送数值的效果。

我门可以利用buffer特性实现一些特殊效果，例如下边这种:



```javascript
const button = document.getElementById('demo');
const click = fromEvent(button, 'click');
const example = click.pipe(
    bufferTime(500),
    filter(arr => arr.length >= 2)
);
                

example.subscribe({
    next: (value) => { console.log('success'); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

我门通过buffer就实现了只有双击鼠标才会触发的效果

#### window和windowToggle

> window一开始就会触发订阅

和buffer一样都是现缓存数据等到一定条件然后发送数据，不同的是window会缓存数据到observable中，下边来个例子：



```javascript
var click = fromEvent(document.body, "click");
var source = interval(1000);

const example = source.pipe(
  rxjs.operators.window(click
                       ),
  map((o)=> o.pipe(take(3))),
  mergeAll()
)

example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  }
});
```

每次点击页面就会将interval最近输入两个值打印出来, **window初始会发送一个请求**

windowToggle相对于widnow多了一个参数为回调函数，用来标志结束条件，例子如下：



```javascript
var source = Rx.Observable.interval(1000);
var mouseDown = Rx.Observable.fromEvent(document, 'mousedown');
var mouseUp = Rx.Observable.fromEvent(document, 'mouseup');

var example = source
  .windowToggle(mouseDown, () => mouseUp)
  .switch();
  
example.subscribe(console.log);
```

### 错误处理类

#### catch

catch当在订阅过程中发现错误后就会调用，然后结果就会发送给订阅者的方法，例子如下：



```javascript
var example = from(['a','b','c','d',2]).pipe(
    .zip(interval(500), (x,y) => x),
    map(x => x.toUpperCase()),
    catch(error => of('h'))
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
}); 
```

catch方法结果不一定只能回传observable，还可以回传Promise或者是类数组（迭代器）等

同时catch第二个参数可以传入当前的主Observable，我门可以直接用参数进行操作，完成一些功能，例如重新发起订阅：



```javascript
var example = from(['a','b','c','d',2]).pipe(
    .zip(interval(500), (x,y) => x),
    map(x => x.toUpperCase()),
    catch((error,obs) => obs)
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
}); 
```

#### retry和retryWhen

retry控制Observable发生错误的时候可以重复发起订阅。



```javascript
var example = from(['a','b','c','d',2]).pipe(
    .zip(interval(500), (x,y) => x),
    map(x => x.toUpperCase()),
    retry()
)

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
}); 
```

当retry传入参数的时候就表示Observable最多重复发起几次，如果还不成功就执行Observable的error方法。

retryWhen会将发生的错误封装成一个Observable发送给retryWhen的函数，可以在其中进行很多操作，例如发送错误信息给技术人员，判断哪地方发生错误。下边的例子中为发生错误后延迟一秒在重复订阅



```javascript
var example = from(['a','b','c','d',2]).pipe(
    .zip(interval(500), (x,y) => x),
    map(x => x.toUpperCase()),
  retryWhen(errorObs => errorObs.pipe(delay(1000)))
)
      
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
```

## subject

上边经过很长的篇幅介绍了Rxjs的operators，下边将介绍Rxjs另一重要的部分内容**Subject**，介绍Subject之前先介绍一个知识点：**Observable是可以被多次订阅的**，了解这个知识点可以帮助我们理解Subject是用来解决哪些问题，以及Subject的一些特性。

### Observable是可以被多次订阅

例如下边这个例子,sourcebe被订阅了两次。



```javascript
var source = interval(1000).pipe(take(3));

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

source.subscribe(observerA);
setTimeout(() => {
    source.subscribe(observerB);
}, 1000);

// "A next: 0"
// "A next: 1"
// "B next: 0"
// "A next: 2"
// "A complete!"
// "B next: 1"
// "B next: 2"
// "B complete!"
```

但是这种重复订阅又个问题就是，各个订阅都是独立的，有些时候我门希望新的订阅是接在上个订阅之后的，这个时候这种方式就不能满足需求了，使用subject就可以完成这种需要：



```javascript
var source = interval(1000).pipe(take(3));

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

var subject = new Subject()

subject.subscribe(observerA)

source.subscribe(subject);

setTimeout(() => {
    subject.subscribe(observerB);
}, 1000);

// "A next: 0"
// "A next: 1"
// "B next: 1"
// "A next: 2"
// "B next: 2"
// "A complete!"
// "B complete!"
```

上边这种效果就是利用了subject的组播特性，这也是在开发中经常利用Subject解决的问题。

### 几个特殊subject

Rxjs还提供了几个特殊的Subject来满足一些特殊需要

#### AsyncSubject

只有在订阅complete时候调用，在结束的时候会传送一下最后的一个值



```javascript
var subject = new AsyncSubject();
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();
// "A next: 3"
// "A complete!"

setTimeout(() => {
    subject.subscribe(observerB);
    // "B next: 3"
    // "B complete!"
},3000)
```

#### ReplaySubject

在新订阅的时候会发送最后几个值



```javascript
var subject = new ReplaySubject(2); // 重複發送最後 2 個元素
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

subject.subscribe(observerA);
subject.next(1);
// "A next: 1"
subject.next(2);
// "A next: 2"
subject.next(3);
// "A next: 3"

setTimeout(() => {
    subject.subscribe(observerB);
    // "B next: 2"
    // "B next: 3"
},3000)
```

#### BehaviorSubject

每次有新订阅的时候都会发送给它当前的最新值



```javascript
var subject = new BehaviorSubject(0); // 0 為起始值
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

subject.subscribe(observerA);
// "A next: 0"
subject.next(1);
// "A next: 1"
subject.next(2);
// "A next: 2"
subject.next(3);
// "A next: 3"

setTimeout(() => {
    subject.subscribe(observerB); 
    // "B next: 3"
},3000)
```

### subject广播简化



```javascript
var source = interval(1000).pipe(take(3));

var observerA = {
  next: value => console.log("A next: " + value),
  error: error => console.log("A error: " + error),
  complete: () => console.log("A complete!")
};

var observerB = {
  next: value => console.log("B next: " + value),
  error: error => console.log("B error: " + error),
  complete: () => console.log("B complete!")
};

var subject = new Subject();

subject.subscribe(observerA);

source.subscribe(subject);

setTimeout(() => {
  subject.subscribe(observerB);
}, 1000);
```

上边这段代码虽然可以实现suject的广播，但是太过繁琐，rxjs提供了简化的方式。

#### multicast

利用multicast这个operator方法直接就可以利用subject的广播特性，需要注意的是使用multicast，只有配合connect方法，才会发起订阅



```javascript
var source = interval(1000).pipe(take(3),multicast(new Subject()));

var observerA = {
  next: value => console.log("A next: " + value),
  error: error => console.log("A error: " + error),
  complete: () => console.log("A complete!")
};

var observerB = {
  next: value => console.log("B next: " + value),
  error: error => console.log("B error: " + error),
  complete: () => console.log("B complete!")
};

source.subscribe(observerA);

source.connect()
setTimeout(() => {
  source.subscribe(observerB);
}, 1000);
```

#### refount

使用multicast方法后**只有取消订阅multicast产生的observable才会终止订阅。



```javascript
var source = interval(1000).pipe(
  multicast(new Subject()); // 無限的 observable 
)


var observerA = {
  next: value => console.log('A next: ' + value),
  error: error => console.log('A error: ' + error),
  complete: () => console.log('A complete!')
}

var observerB = {
  next: value => console.log('B next: ' + value),
  error: error => console.log('B error: ' + error),
  complete: () => console.log('B complete!')
}

var subscriptionA = source.subscribe(observerA);

var realSubscription = source.connect();

var subscriptionB;
setTimeout(() => {
  subscriptionB = source.subscribe(observerB);
}, 1000);

setTimeout(() => {
  subscriptionA.unsubscribe();
  subscriptionB.unsubscribe(); 
  // 這裡雖然 A 跟 B 都退訂了，但 source 還會繼續送元素
}, 5000);

setTimeout(() => {
  realSubscription.unsubscribe();
  // 這裡 source 才會真正停止送元素
}, 7000);
```

但是这样太繁琐了，rxjs提供了refcount方法。



```javascript
var source = interval(1000).pipe(
    multicast(new Rx.Subject()),
             refCount();
)
             

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}

var subscriptionA = source.subscribe(observerA);
// 订阅数 0 => 1

var subscriptionB;
setTimeout(() => {
    subscriptionB = source.subscribe(observerB);
    // 订阅数 0 => 2
}, 1000);
```

使用refcount后的observable当上边有订阅后会自动打开广播功能，当没有订阅后，会自动关闭。这样就不需要特意关闭广播Observable，也不需要刻意使用connect。

#### publish

multicast(new Rx.Subject())在rxjs中有个方法**punish**。

```javascript
var source = interval(1000).pipe(
    publish(),
    refCount();
)
// var source = Rx.Observable.interval(1000)
//             .multicast(new Rx.Subject()) 
//             .refCount();
```

publish也可以配合subject三种变形，rxjs分别封装了对应的方法：publishReplay、publishBehavior、publishLast

#### share

另外 publish + refCount 可以在簡寫成 share

```javascript
var source = interval(1000).pipe(
     share();
)
```
