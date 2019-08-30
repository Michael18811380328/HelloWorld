# Generator 函数

### generator函数

#### 作用

- 实现函数的异步编程
- 是一个状态机（保存并输出了一些状态 yield）
- 返回一个遍历器对象（可以遍历输出的状态）
- 特点：fucntion 加 *, 使用 yield 输出状态（通常function后直接加星号，如果有空格不会报错）

#### 使用

~~~js
function* hello() {
  yield 'hello';
  yield 'world';
  return 'end';
  // 函数内部保存三个状态
}
let test = hello();
// 调用函数后，函数不执行，返回的不是运行结果，而是返回一个遍历器对象（指向内部状态的指针对象）

test.next(); {value: "hello", done: false} // 调用generator的next方法，依次获取生成函数的每一个状态(第一次返回第一个yield对应的状态，done: false 表示还没有执行完) 返回值是yield的状态，函数暂停执行
test.next(); {value: "world", done: false}
test.next(); {value: "end", done: true} //执行第三次，没有yield，就执行到return或者函数语句 done:true 表示执行结束
test.next(); {value: undefined, done: true} // 如果继续执行，获取的值是undefined
~~~

函数返回一个内部状态的指针：每调用一次next方法，会返回一个对象 {value: yield, done:false} 获取当前的状态和是否遍历结束。yield 后面的代码，当next执行后，指针移动到这里，才会执行并求值。实际上，yield 类似于 pause，表示暂停执行并返回一个值。

#### 暂缓执行函数

~~~js
function* sleep() {
  console.log('test');
}

let genarator = sleep();
setTimeout(() => {
  genarator.next();
}, 1000)
~~~

如果不使用yield，直接放在定时器函数中，可以设置暂缓执行函数；如果设置多个定时器，那么可以执行多个步骤（例如简单动画）。yield语句只能用在生成器函数中。

~~~js
let flat = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (typeof item !== 'number') {
      yield* flat(item); // 递归处理嵌套的数组
    } else {
      yield item;
    }
  }
};
let arr = [1, 2, [3, 4]];
let genarator = flat(arr);
for (let item of genarator) {
  console.log(item);
}
~~~

### next

next 默认不带参数，直接返回下一个yield后面的返回值；如果带参数，那么参数就是上一个 yield 表达式的返回值。

~~~js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false} 第二次运行时，y = 2 * yield = 2 * undefined = undefined 
a.next() // Object{value:NaN, done:true} 第三次运行时，z = yield = undefined, return NaN

var b = foo(5); // 参数是5
b.next() // { value:6, done:false } 5 + 1 = 6 返回6 
b.next(12) // { value:8, done:false } y = 2 * 12 = 24, yield (y/3) = 8, 返回8
b.next(13) // { value:42, done:true } z = 13, return 5 + 24 + 13 = 42, 返回42
~~~

### for...of 

使用 for...of 可以直接遍历返回值（返回的遍历器），依次获取yield的状态，但是不会获取return的状态。

~~~js
function* fibonacci() {
  let [pre, current] = [0, 1];
  for (;;) {
    yield current;
    [pre, current] = [current, pre + current];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
~~~

### 解构赋值

~~~js
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
~~~

### return

Generator 函数返回的遍历器对象，return，可以返回给定的值，并且终结遍历 Generator 函数。

~~~js
g.return('foo') // { value: "foo", done: true }
g.next() {value: undefined, done: true}

// 如果return没有参数，那么返回的value是undefined
~~~



### 高级应用

Generator 可以暂停函数执行，返回任意表达式的值。

#### （1）异步操作的同步化表达

Generator 函数的暂停执行的效果，意味着可以把异步操作写在`yield`表达式里面，等到调用`next`方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在`yield`表达式下面，反正要等到调用`next`方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```javascript
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()
// 卸载UI
loader.next()
```

上面代码中，第一次调用`loadUI`函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用`next`方法，则会显示`Loading`界面（`showLoadingScreen`），并且异步加载数据（`loadUIDataAsynchronously`）。等到数据加载完成，再一次使用`next`方法，则会隐藏`Loading`界面。可以看到，这种写法的好处是所有`Loading`界面的逻辑，都被封装在一个函数，按部就班非常清晰。

Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

```javascript
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response); // 这里的response作为上一次yield的值（result = yield）
  });
}

var it = main();
it.next();
```

上面代码的`main`函数，就是通过 Ajax 操作获取数据。可以看到，除了多了一个`yield`，它几乎与同步操作的写法完全一样。注意，`makeAjaxCall`函数中的`next`方法，必须加上`response`参数，因为`yield`表达式，本身是没有值的，总是等于`undefined`。

下面是另一个例子，通过 Generator 函数逐行读取文本文件。

```javascript
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
```

上面代码打开文本文件，使用`yield`表达式可以手动逐行读取文件。

#### （2）控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

```javascript
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```

采用 Promise 改写上面的代码。

```javascript
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
```

上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。

```javascript
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```

然后，使用一个函数，按次序自动执行所有步骤。

```javascript
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```

注意，上面这种做法，只适合同步操作，即所有的`task`都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。

下面，利用`for...of`循环会自动依次执行`yield`命令的特性，提供一种更一般的控制流管理的方法。

```javascript
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}
```

上面代码中，数组`steps`封装了一个任务的多个步骤，Generator 函数`iterateSteps`则是依次为这些步骤加上`yield`命令。

将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。

```javascript
let jobs = [job1, job2, job3];

function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}
```

上面代码中，数组`jobs`封装了一个项目的多个任务，Generator 函数`iterateJobs`则是依次为这些任务加上`yield*`命令。

最后，就可以用`for...of`循环一次性依次执行所有任务的所有步骤。

```javascript
for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
```

再次提醒，上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。如果想要依次执行异步的步骤，必须使用后面的《异步操作》一章介绍的方法。

`for...of`的本质是一个`while`循环，所以上面的代码实质上执行的是下面的逻辑。

```javascript
var it = iterateJobs(jobs);
var res = it.next();

while (!res.done){
  var result = res.value;
  // ...
  res = it.next();
}
```

#### （3）部署 Iterator 接口

利用 Generator 函数，可以在任意对象上部署 Iterator 接口。

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

上述代码中，`myObj`是一个普通对象，通过`iterEntries`函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署`next`方法。

下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。

```javascript
function* makeSimpleGenerator(array){
  var nextIndex = 0;

  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(['yo', 'ya']);

gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true
```

#### （4）作为数据结构

Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。

```javascript
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
```

上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。

```javascript
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```

实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。

```javascript
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
```

上面的函数，可以用一模一样的`for...of`循环处理！两相一比较，就不难看出 Generator 使得数据或者操作，具备了类似数组的接口。

