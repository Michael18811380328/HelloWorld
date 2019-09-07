// JS 常用的四种循环
for (var index = 0; index < arr.length; index++) {
  console.log(arr[index]);
}

arr.forEach((item) => {
  console.log(item);
});

for (let index in arr) {
  console.log(arr[index]);
}

for (let value of arr) {
  console.log(value);
}
for (let n of fibonacci) {
  if (n > 1000) break;
  console.log(n);
}

// 遍历器的循环
function makeIterator(arr) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < arr.length ?
      {value:array[nextIndex++]} : {done: true};
    }
  };
}

let set = new Set();
set.add('a').add('b').add('c');
let [x, y] = set;
// x => a, y => b
let [first, ...rest] = set;
// fisrt => a rest => [b, c]

let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};
let iterator = generator();
iterator.next(); // value: 1, done: false
// 234 数组每一项会展开输出，也就是next方法可以执行5次