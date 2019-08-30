function Point(x = 0, y = 0, z = "hello") {
  this.x = x;
  this.y = y;
}
const point = new Point();
console.log(point);

function foo({x, y = 5}) {
  console.log(x, y);
}
foo({x: 1, y :2});

function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
  // 这里第一个参数不能省略（请求的地址），第二个参数具有默认值，但是至少需要传入一个空对象，这样可以把请求体、请求方法，请求头的信息自动补充。
}

(function (a,b,c = 10){}).length === 2
(function (...args) {}).length === 0
(function (a, b = "GET", c) {}).length === 1
// 函数的length属性表示函数形参的长度（不包括已经默认值的参数）（如果默认值的参数不是为参数，那么也不包括默认值后面的参数）
// 默认值参数具有一个作用域，不是全局变量。

let foo = 'out';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func);
}
bar(); // out，这里的func是参数，默认值是一个匿名函数。调用函数没有传入参数，所以这里使用默认值匿名函数，匿名函数执行居偶遇定义域，不是函数内部的定义域，所以返回的foo就是函数外部的foo变量。

// eg
function throwMissing() {
  throw new Error("Missing parameter");
}
function foo(fun = throwMissing()) {
  console.log(fun);
}
foo(); // 如果不传参，默认的参数是 throwMissing，然后会抛出错误

// 函数的尾参数...
function add(...value) {
  let sum = 0;
  for (var val of value) {
    sum += val;
  }
  return sum;
}

const sortNumber = (...numbers) => numbers.sort();
const sortNumbers = (...numbers) => numbers.sort((a, b) => return (b - a));

function push(array, ...items) {
  items.forEach((item) => {
    array.push(item);
  });
}

const numbers = (...nums) => nums;
numbers(1,2,3,4,5); // return [1,2,3,4,5]

function foo() {
  setTimeout(() => {
    console.log(this.id);
  }, 100);
}

// 函数的尾调用和尾递归优化
// 尾调用：一个函数的返回值（或者最后一步操作）是另一个函数，这个函数的参数是第一个函数的形参，这样调用第二个函数时，第一个函数内部的变量占用的内存可以释放；如果函数递归调用，尾递归可以大大减少内存占用，避免堆栈溢出；
function f(x) {
  // code 
  return g(x);
}

// bad O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// good O(1)
function factorial(n, total) {
  if (n === 1) return total * 1;
  return factorial(n - 1, n * total);
}

// bad
function Fibonacci(n) {
  if (n > 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// good
function Fibonacci(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return Fibonacci(n - 1, ac2, ac1 + ac2);
}


// 函数currying：将多参数转化成单参数的形式
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}







