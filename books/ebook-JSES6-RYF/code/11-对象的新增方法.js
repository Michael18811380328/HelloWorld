Object.is('abc', 'abc');
Object.is({}, {});
Object.is(NaN, NaN);
Object.is(-0, +0);

// 判断相等和全等。 NaN 和 NaN相等，-0 +0 不等。
const target = {};
const source1 = { a: 1 };
const source2 = { b: 2 };

Object.assign(target, source1, source2);

// 将源对象的属性和方法合并到目标对象。目标对象不能为undefined，这个方法会改变目标对象，目标对象的引用是浅复制。所以通常用下面的改进方案。

Object.assign({}, source1, source2);

// 拷贝对象的属性必须是自身的（继承的属性不能拷贝）不可枚举属性不能拷贝
// 如果是同名属性，后面的属性会覆盖前面的属性
// 如果想实现深拷贝，使用lodash改进版
// https://www.npmjs.com/package/lodash.defaultsdeep

import _ from 'lodash';

_.defaultsDeep(target, source1, source2);

// eg1 给一个类添加属性

class Point {
  constructor(x, y) {
    Object.assign(this, x, y);
  }
}

// ie. 给类的原型上添加方法

const method1 = function(arg1, arg2) {
  console.log('method1');
}

const method2 = function() {
  console.log('method2')
}

Object.assign(Point.prototype, method1, method2);

let point = new Point({'name': 'Tom'});
console.log(point);


// getOwnPropertyDescriptors

const obj = {
  foo: 123,
  get bar() {
    return 'abc'
  }
}
Object.getOwnPropertyDescriptors(obj);

function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}

//  原型对象的扩展

const obj = {
  method: function() {
    //
  }
}
obj.__proto__ = otherObj;

// 直接使用create创建对象，不需要改变——proto——
let obj = Object.create(otherObj);
obj.method = function() {
  //
}


// 对象的键值对操作

let obj = { foo: 'bar', baz: 42 };
Object.keys(obj);
Object.values(obj);

for (let [key, value] of Object.entries(obj)) {
  console.log([key, value]);
}

const entries = new Map([
  ['foo', 'bar']
]);

let transferObj = Object.fromEntries(entries);