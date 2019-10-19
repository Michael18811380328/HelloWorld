// 方法一：
// 双层循环， 外层循环元素， 内层循环时比较值
// 如果有相同的值则跳过， 不相同则push进数组

Array.prototype.distinct = function() {
  var arr = this,
    result = [],
    i,
    j,
    len = arr.length;
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i;
      }
    }
    result.push(arr[i]);
  }
  return result;
}
var arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
arra.distinct(); //返回[3,4,2,1]

// 方法二： 利用splice直接在原数组进行操作
// 双层循环， 外层循环元素， 内层循环时比较值，值相同时， 则删去这个值
// 注意点: 删除元素之后， 需要将数组的长度也减1.
Array.prototype.distinct = function() {
  var arr = this,
    i,
    j,
    len = arr.length;
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
};
var a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1, ];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56
// 优点： 简单易懂

// 缺点： 占用内存高， 速度慢

// 方法三： 利用对象的属性不能相同的特点进行去重
Array.prototype.distinct = function() {
  var arr = this,
    i,
    obj = {},
    result = [],
    len = arr.length;
  for (i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) { //如果能查找到，证明数组元素重复了
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};
var a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1, ];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56

// 方法四： 数组递归去重
// 运用递归的思想， 先排序， 然后从最后开始比较， 遇到相同， 则删除
Array.prototype.distinct = function() {
  var arr = this,
    len = arr.length;
  arr.sort(function(a, b) { //对数组进行排序才能方便比较
    return a - b;
  })

  function loop(index) {
    if (index >= 1) {
      if (arr[index] === arr[index - 1]) {
        arr.splice(index, 1);
      }
      loop(index - 1); //递归loop函数进行去重
    }
  }
  loop(len - 1);
  return arr;
};
var a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1, 56, 45, 56];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,45,56

// 方法五： 利用indexOf以及forEach
Array.prototype.distinct = function() {
  var arr = this,
    result = [],
    len = arr.length;
  arr.forEach(function(v, i, arr) { //这里利用map，filter方法也可以实现
    var bool = arr.indexOf(v, i + 1); //从传入参数的下一个索引值开始寻找是否存在重复
    if (bool === -1) {
      result.push(v);
    }
  })
  return result;
};
var a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 1, 23, 1, 23, 2, 3, 2, 3, 2, 3];
var b = a.distinct();
// console.log(b.toString()); //1,23,2,3
// 方法六： 利用ES6的set

// Set数据结构， 它类似于数组， 其成员的值都是唯一的。

// 利用Array.from将Set结构转换成数组

function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) //[1,2,3]
拓展运算符(...) 内部使用for...of循环

let arr = [1, 2, 3, 3];
let resultarr = [...new Set(arr)];
console.log(resultarr); //[1,2,3]

// 下面给大家补充介绍合并数组并去重的方法

// 一、 concat() 方法

// 思路： concat() 方法将传入的数组或非数组值与原数组合并, 组成一个新的数组并返回。 该方法会产生一个新的数组。

function concatArr(arr1, arr2) {
  var arr = arr1.concat(arr2);
  arr = unique1(arr); //再引用上面的任意一个去重方法
  return arr;
}
// 二、 Array.prototype.push.apply()
// 思路： 该方法优点是不会产生一个新的数组。

var a = [1, 2, 3];
var b = [4, 5, 6];
Array.prototype.push.apply(a, b); //a=[1,2,3,4,5,6]
//等效于:a.push.apply(a, b);
//也等效于[].push.apply(a, b); 
function concatArray(arr1, arr2) {
  Array.prototype.push.apply(arr1, arr2);
  arr1 = unique1(arr1);
  return arr1;
}