// JS 语言精粹 蝴蝶书

// page 18
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}

// 在JS中使用注释最好使用//。不使用/**/的形式。因为正则表达式和注释可能发生冲突造成语法错误。

// 在JS中number就是64位的浮点数，没有int的概念。所以在JS中1.0 === 1

// 指数：100 === 1e2 === 1 * 10 * 10

// 字符串是不可变的：如果使用+进行连接，那么是创建一个新的字符串（并不是在原来的基础上加一个字符）。
// 'cat'.length === 3

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}
// 判断属性名来自于对象的成员还是原型链

// try-catch-throw 还是不熟练

// typeof(null) => 'Object'

// 在JS中%表示取余数。当两个运算数都是正数和求模运算一致，但是存在负数，就出现不一致的情况。

// page 37

// 原型：公用的函数的方法可以放在对象的原型中（在es6中react中，直接放在组件的类中，作为组件的方法实现复用效果）。私有的方法单独作为对象的方法直接添加即可。

// hasOwnproperty 会检查对象的属性，不会检查对象原型链上的属性
