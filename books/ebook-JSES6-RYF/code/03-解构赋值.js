
// 调换顺醋
let x = 1, y = 2;
[x, y] = [y, x];

// 函数的解构赋值
function fun() {
  return [1,2,3];
}
let [a, b, c] = fun();

function exam() {
  return {name: "Michael", age: 20};
}
let { name, age } = exam();

function test({x, y, z}) {
  console.log(x, y, z);
}
test({y: 1, z:0, x: 10});

// JSON 解构赋值
let jsonData = {
  id: 20,
  name: "Mike"
};

let { id, name } = jsonData;

const { SourceNode } = require("source-map");