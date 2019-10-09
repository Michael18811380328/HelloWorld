// JS 代码的简单重构优化案例

function test() {
  // 直接返回表达式，不需要新加一个布尔值变量
  return age > 20;
}

for (let i = 0, len = array.length; i < len; i++) {
  // 将数组的长度储存，循环时不需要每次读取数组的长度
}

if (value) {
  // 直接判断变量，不是判断布尔值
}
// value 非空字符、非零数字


// bad 
if (id === 10) {
  if (name !== "") {
    if (email === "email") {
      // do sth 多层条件嵌套进行拆分
    }
  }
}

// good
if (id === 10 && name !== "" && email === "email" ) {
  // do sth
}

// good 
function test() {
  if (id !== 10) return;
  if (name === "") return;
  if (email !== 'email') return;
  // do sth
}

let a = 'aa', b = "bb", c = "cc", d;
// 同时定义多个变量；声明变量放在后面

// bad 循环体内部操作DOM
for (let i = 0; i < 100; i++) {
  str += str;
  document.getElementById("box").innerHTML = str;
}

// good 将DOM操作放在循环体外部。减少DOM的操作。
let str;
for (let i = 0; i < 100; i++) {
  str += str;
}
document.getElementById("box").innerHTML = str;

// bad 
function test3() {
  let a = b = 1;
  // 此时 b 是全局变量；避免使用连等号声明赋值变量
}

// typeof 可以检测简单数据类型。对于复杂数据类型返回object(array => object)
if (typeof str === 'string') {
  // do sth
}
// 所以，引用数据类型需要使用 instanceof 精确测试
let arr = [];
if (arr instanceof Array) {
  // do sth
}

let a = function() {
  console.log(1);
};
// test a
// typeof(a) => function
// a instanceof Function => true
// a instanceof Object => true

// 字符串操作优先使用正则表达式（不是循环遍历）
// 格式化字符串 fontSize => font-size
function stringFormat(str) {
  return (str.replace(/([A-Z])/g), "-$1").toLowerCase();
}

// 当一个方法接收多个参数时，可以封装成一个json对象
function regust(name, password, email, phone) {
  // deal with ...
}

// 如果数据类型确定，优先使用全等（===）比较。

let value = age > 20 ? "old" : "young";