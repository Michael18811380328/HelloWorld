// proxy 代理器，默认的函数改成自定义的函数

let obj = new Proxy({}, {
  get: function(target, key, receiver) {
    console.log(key);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(key);
    return Reflect.set(target, key, value, receiver);
  }
});
// 这里对空对象进行拦截：用自定义的方法定义了点语法

let proxy = new Proxy(target, handler);
let proxy = new Proxy({}, {
  get: function(target, property) {
    return 'test';
  }
});
// 这样获取对象的任何一个属性，都返回的是test。
// 如果在handler中不设置（传入一个空对象）那么不会改变原始对象的操作
// 可以拦截多个操作（对象上面常见的13种操作）

let handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return name;
  },
  apply: function(target, thisBinding, args) {
    return args[0];
  },
  construct: function(target, args) {
    return { value: args[1] };
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);


// examples
let person = { name: "Mike" };
let proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError('Property does not exist.');
    }
  }
});
proxy.name // 'Mike'
proxy.age // RefernceError

let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age is invalid');
      }
    }
    obj[prop] = value;
  }
};
let person = new Proxy({}, validator);
person.age = 300; // RangeError



