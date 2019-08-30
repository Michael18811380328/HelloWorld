console.log([1, ...[2, 3, 4], 5]);
console.log([...document.querySelectorAll('div')]);

function add(x, y) {
  return x + y;
}
let numbers = [1,2,3,4,5];
let sum = add(...[numbers]);

const arr = [...(x > 0 ? arr1: []), ...arr2];

// 可以把一个数组直接换换成函数的参数传入，求数组的最值，合并两个数组
function fun(x,y,z) {
  //...
}
let args = [0, 1, 2];
fun.apply(null, args);

function fun (x,y,z) {
  console.log(x,y,z);
}
let arr = [1,2,3];
fun(...arr);

Math.max(...arr);
Math.max.apply(null, arr);

arr1.push(...arr2);

let date = new Data(...[2018, 1, 1]);

// 具体应用
const a1 = [1,2,3];
const a2 = [...a1];
const [...a3] = a1;
const a4 = [...a1, ...a2, ...a3]; // 这里是浅拷贝
[first, ...rest] = a4;

[...'hello'];


let map = new Map([
  [1, 'one'],
  [2, 'two']
]);
let arr = [...map.keys()];

const go = function*(){
  yield 1;
  yield 2;
}
[...go()] // 12

Array.from(arrayLike);

let ps = document.querySelectorAll('p');
Array.from(ps).filter((p) => {
  return p.textContent.length > 100;
});

Array.from('hello');
['h', 'e'];

let nameSet = new Set(['a', 'b']);
Array.from(nameSet); // ['a', 'b']
Array.from({length: 2}, () => 'jack');
// 第二个参数是把数组每一个参数进行处理的结果

Array.of(3).length === 1
Array(3,1,2) // [3, 1, 2]







