# 深入 js 深拷贝对象


## 前言


对象是 JS 中基本类型之一，而且和原型链、数组等知识息息相关。不管是面试中，还是实际开发中我们都会碰见深拷贝对象的问题。

顾名思义，深拷贝就是完完整整的将一个对象从内存中拷贝一份出来。所以无论用什么办法，必然绕不开开辟一块新的内存空间。

通常有下面两种方法实现深拷贝：

1. 迭代递归法
2. 序列化反序列化法

我们会基于一个测试用例对常用的实现方法进行测试并对比优劣：

```js
let test = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: {
    name: '我是一个对象',
    id: 1
  },
  arr: [0, 1, 2],
  func: function() {
    console.log('我是一个函数')
  },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  err: new Error('我是一个错误')
}

let result = deepClone(test)

console.log(result)
for (let key in result) {
  if (isObject(result[key]))
    console.log(`${key}相同吗？ `, result[key] === test[key])
}

// 判断是否为对象
function isObject(o) {
  return (typeof o === 'object' || typeof o === 'function') && o !== null
}
```

### 迭代递归法

这是最常规的方法，思想很简单：就是对对象进行迭代操作，对它的每个值进行递归深拷贝。

#### [for...in](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...in) 法

```js
// 迭代递归法：深拷贝对象与数组
function deepClone(obj) {
  if (!isObject(obj)) {
    throw new Error('obj 不是一个对象！')
  }

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  for (let key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }

  return cloneObj
}
```

结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-a5776d2e7541f42f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/509/format/webp)

迭代递归法结果.png

我们发现，arr 和 obj 都深拷贝成功了，它们的内存引用已经不同了，但 func、date、reg 和 err 并没有复制成功，因为它们有特殊的构造函数。

#### Reflect 法

```js
// 代理法
function deepClone(obj) {
  if (!isObject(obj)) {
    throw new Error('obj 不是一个对象！')
  }

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(cloneObj).forEach(key => {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return cloneObj
}
```

结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-33be5b72f8aeb202.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/551/format/webp)

代理法结果

我们发现，结果和使用 for...in 一样。那么它有什么优点呢？读者可以先猜一猜，答案我们会在下文揭晓。

#### lodash中的深拷贝实现

著名的 lodash 中的 cloneDeep 方法同样是使用这种方法实现的，只不过它支持的对象种类更多，具体的实现过程读者可以参考[ lodash 的 baseClone 方法](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Flodash%2Flodash%2Fblob%2Fmaster%2F.internal%2FbaseClone.js)。

我们把测试用例用到的深拷贝函数换成lodash的：

```
let result = _.cloneDeep(test)
```

结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-796176050394be23.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/547/format/webp)

lodash深拷贝结果.png

我们发现，arr、obj、date、reg深拷贝成功了，但 func 和 err 内存引用仍然不变。

为什么不变呢？这个问题留给读者自己去探寻，嘿嘿~不过可以提示下，这跟 lodash 中的 cloneableTags 有关。

由于前端中的对象种类太多了，所以 lodash 也给用户准备了自定义深拷贝的方法 [cloneDeepWith](https://link.jianshu.com/?t=https%3A%2F%2Flodash.com%2Fdocs%2F4.17.5%23cloneDeepWith)，比如自定义深拷贝 DOM 对象：

```
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(true);
  }
}
 
var el = _.cloneDeepWith(document.body, customizer);
 
console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 20
```

### 序列化反序列化法

这个方法非常有趣，它先把代码序列化成数据，再反序列化回对象：

```
// 序列化反序列化法
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
```

结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-fcb057ffd720e8d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/425/format/webp)

序列化反序列化法结果.png

我们发现，它也只能深拷贝对象和数组，对于其他种类的对象，会失真。这种方法比较适合平常开发中使用，因为通常不需要考虑对象和数组之外的类型。

### 进阶

1. 对象成环怎么办？
   我们给 test 加一个 loopObj 键，值指向自身：

```
test.loopObj = test
```

这时我们使用第一种方法中的 for..in 实现和 Reflect 实现都会栈溢出：



![img](https://upload-images.jianshu.io/upload_images/4762028-6e7a0a4ef4e3aee3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/828/format/webp)

环对象深拷贝报错

而使用第二种方法也会报错：



![img](https://upload-images.jianshu.io/upload_images/4762028-87629c794d602cd0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/432/format/webp)

但 lodash 却可以得到正确结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-9492d678cd3121ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/535/format/webp)

lodash 深拷贝环对象.png

为什么呢？我们去 lodash 源码看看：



![img](https://upload-images.jianshu.io/upload_images/4762028-cf971d9b5f7492b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/497/format/webp)

lodash 应对环对象办法.png

因为 lodash 使用的是栈把对象存储起来了，如果有环对象，就会从栈里检测到，从而直接返回结果，悬崖勒马。这种算法思想来源于 HTML5 规范定义的[结构化克隆算法](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FGuide%2FAPI%2FDOM%2FThe_structured_clone_algorithm%23%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5)，它同时也解释了为什么 lodash 不对 Error 和 Function 类型进行拷贝。

当然，设置一个哈希表存储已拷贝过的对象同样可以达到同样的目的：

```js
function deepClone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) {
    return obj
  }
  // 查表
  if (hash.has(obj)) return hash.get(obj)

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  // 哈希表设值
  hash.set(obj, cloneObj)

  let result = Object.keys(obj).map(key => {
    return {
      [key]: deepClone(obj[key], hash)
    }
  })
  return Object.assign(cloneObj, ...result)
}
```

这里我们使用 WeakMap 作为哈希表，因为它的键是弱引用的，而我们这个场景里键恰好是对象，需要弱引用。

1. 键值不是字符串而是 Symbol

我们修改一下测试用例：

```
var test = {}
let sym = Symbol('我是一个Symbol')
test[sym] = 'symbol'

let result = deepClone(test)
console.log(result)
console.log(result[sym] === test[sym])
```

运行 for...in 实现的深拷贝我们会发现：



![img](https://upload-images.jianshu.io/upload_images/4762028-4fa1b3db02294dc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/227/format/webp)

拷贝失败了，为什么？

因为 [Symbol](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2FSymbol) 是一种特殊的数据类型，它最大的特点便是独一无二，所以它的深拷贝就是浅拷贝。

但如果这时我们使用 Reflect 实现的版本：



![img](https://upload-images.jianshu.io/upload_images/4762028-9b02462182d782e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/289/format/webp)

成功了，因为 for...in 无法获得 Symbol 类型的键，而 [Reflect](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FReflect%2FownKeys) 是可以获取的。

当然，我们改造一下 for...in 实现也可以：

```
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    let symKeys = Object.getOwnPropertySymbols(obj)
    // console.log(symKey)
    if (symKeys.length > 0) {
        symKeys.forEach(symKey => {
            cloneObj[symKey] =  isObject(obj[symKey]) ? deepClone(obj[symKey]) : obj[symKey]
        })
    }
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}
```

1. 拷贝原型上的属性

众所周知，JS 对象是基于原型链设计的，所以当一个对象的属性查找不到时会沿着它的原型链向上查找，也就是一个非构造函数对象的 [__proto__](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fproto) 属性。

我们创建一个 childTest 变量，让 result 为它的深拷贝结果，其他不变：

```
let childTest = Object.create(test)
let result = deepClone(childTest)
```

这时，我们最初提供的四种实现只有 for...in 的实现能正确拷贝，为什么呢？原因还是在[结构化克隆算法](https://link.jianshu.com/?t=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FGuide%2FAPI%2FDOM%2FThe_structured_clone_algorithm%23%E7%9B%B8%E5%85%B3%E9%93%BE%E6%8E%A5)里：原形链上的属性也不会被追踪以及复制。

落在具体实现上就是：for...in 会追踪原型链上的属性，而其它三种方法(Object.keys、Reflect.ownKeys 和 JSON 方法)都不会追踪原型链上的属性：



![img](https://upload-images.jianshu.io/upload_images/4762028-ed8132f2adfd5612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/305/format/webp)

1. 需要拷贝不可枚举的属性
   第四种情况，就是我们需要拷贝类似属性描述符，setters 以及 getters 这样不可枚举的属性，一般来说，这就需要一个额外的不可枚举的属性集合来存储它们。类似在第二种情况使用 for...in 拷贝 Symbol 类型键时：
   我们给 test 变量里的 obj 和 arr 属性定义一下属性描述符：

```
Object.defineProperties(test, {
    'obj': {
        writable: false,
        enumerable: false,
        configurable: false
    },
    'arr': {
        get() {
            console.log('调用了get')
            return [1,2,3]
        },
        set(val) {
            console.log('调用了set')
        }
    }
})
```

然后实现我们的拷贝不可枚举属性的版本：

```
function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) {
        return obj
    }
    // 查表，防止循环拷贝
    if (hash.has(obj)) return hash.get(obj)

    let isArray = Array.isArray(obj)
    // 初始化拷贝对象
    let cloneObj = isArray ? [] : {}
    // 哈希表设值
    hash.set(obj, cloneObj)
    // 获取源对象所有属性描述符
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    // 获取源对象所有的 Symbol 类型键
    let symKeys = Object.getOwnPropertySymbols(obj)
    // 拷贝 Symbol 类型键对应的属性
    if (symKeys.length > 0) {
        symKeys.forEach(symKey => {
            cloneObj[symKey] = isObject(obj[symKey]) ? deepClone(obj[symKey], hash) : obj[symKey]
        })
    }

    // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
    cloneObj = Object.create(
        Object.getPrototypeOf(cloneObj),
        allDesc
    )
    // 拷贝可枚举属性（包括原型链上的）
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key];
    }

    return cloneObj
}
```

结果：



![img](https://upload-images.jianshu.io/upload_images/4762028-fe598dedb9b65316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/905/format/webp)

### 结语

1. 日常深拷贝，建议序列化反序列化方法。
2. 面试时遇见面试官搞事情，写一个能拷贝自身可枚举、自身不可枚举、自身 Symbol 类型键、原型上可枚举、原型上不可枚举、原型上的 Symol 类型键，循环引用也可以拷的深拷贝函数：

```
// 将之前写的 deepClone 函数封装一下
function cloneDeep(obj) {
    let family = {}
    let parent = Object.getPrototypeOf(obj)

    while (parent != null) {
        family = completeAssign(deepClone(family), parent)
        parent = Object.getPrototypeOf(parent)
    }

    // 下面这个函数会拷贝所有自有属性的属性描述符,来自于 MDN
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    function completeAssign(target, ...sources) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
                return descriptors
            }, {})

            // Object.assign 默认也会拷贝可枚举的Symbols
            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym)
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor
                }
            })
            Object.defineProperties(target, descriptors)
        })
        return target
    }

    return completeAssign(deepClone(obj), family)
}
```

1. 有特殊需求的深拷贝，建议使用 lodash 的 copyDeep 或 copyDeepWith 方法。

最后感谢一下[知乎上关于这个问题的提问](https://link.jianshu.com/?t=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F47746441)的启发，无论做什么，尽量不要把简单的事情复杂化，深拷贝能不用就不用，它面对的问题往往可以用更优雅的方式解决，当然面试的时候装个逼是可以的。

