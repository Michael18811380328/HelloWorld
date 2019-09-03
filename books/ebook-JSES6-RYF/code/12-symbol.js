// Symbol 表示独一无二的值
// 构造函数：不使用 new 命令创建 symbol

let s1 = Symbol('foo');
let s2 = Symbol('foo');

// 使用相同的字符串创建的symbol是不等的
console.log(s1, s2);
console.log(s1 !== s2);
Object.is(s1, s2) === false

// symbol 值不能和其他的值进行运算（字符串相加）；可以显式转化成字符串或者布尔值，不能转化成数值。由同一个字符串创建的symbol是不等的，转化后的字符串是全等的。


// API
// sym.description 'foo' 直接获取symbol的描述（不需要强制转化成字符串，截取后面的描述部分）

// 可以用来表示对象的属性，不会被同名属性把原始属性替代(不能用点语法)
let sym = Symbol();
let a = {
  [s1]: 'Hello',
  [s2]: function(arg) {
    console.log(arg)
  },
  [s3](arg) {
    console.log(arg);
  },
};

// 注意：如果使用symbol作为对象的属性名，那么普通遍历方法不会遍历到这个属性，就会出错。可以使用 getOwnPropertySymbols 遍历所有的Symbol属性名。

// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了

// 消除魔法字符串：当一个代码某个字符串经常使用，和代码形成强耦合（例如创建一个“Boy”字符串，然后判断某个参数是否等于这个字符串，switch等频繁使用，这就是一个魔法字符串）；可以把这个字符串放在公共对象的属性中。就转化成下面的形式；进一步可以用symbol替代这个魔法字符串。type.boy
const type = { boy: 'Boy' };
const type = { boy: Symbol() };

let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
console.log(s1 === s2); // true
// 使用symbol.for 创建的symbol，首先判断是否有相同的描述对应的symbol，所以这样创建的S2就和S1是完全相同的（如果调用n次也是返回同一个）。直接使用Symbol('foo')不会在全局环境中检索。
Symbol.for('foo') === Symbol.for('foo')
Symbol('foo') === Symbol('foo')

Symbol.keyFor(s1) === 'foo' // 返回一个已有symbol的key
