## JS 语言精粹

### 第六章 数组

P47 

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

正则表达式

P91







