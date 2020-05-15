# immutability-helper 插件的基本使用（附源码）

 

关注

2019.01.07 12:38 字数 803 阅读 187评论 0喜欢 0

**本文介绍了 immutability-helper 插件的基本使用，详细介绍了相关 API 的用法及注意事项。**

------

## 概念

先理解一下 Immutable 的概念，Immutable数据就是一旦创建，就不能更改的数据。每当对Immutable对象进行修改的时候，就会返回一个新的Immutable对象，以此来保证数据的不可变。但是由于 Immutable 的 API 和用法学习起来比较困难，所以可以使用 immutability-helper 这个工具来对原生JS对象进行操作。本文主要是对 immutability-helper 的用法做一个讲解。

------

## 源码

**源码位置**

欢迎 Star！欢迎 Watch！

------

## 注意事项总结

- immutability-helper 不会对原有对象进行修改，只是会返回一个新的对象
- `$`push、`$`unshift、`$`splice 的使用目标必须是数组，否则会报错
- `$`add、`$`remove 的使用目标必须是 Set 或 Map
- 其余 API 的使用目标可以是任意数据
- `$`splice 的参数是一个操作数组，可以对目标数组一次进行多次操作，但是参数 arrays 中的项是按顺序执行的，所以使用时需要注意顺序
- 任意 API 均可在多层结构内使用。可查看[扩展用法示例](https://www.jianshu.com/p/220e0271d2e4#扩展用法)
- 可以同时执行多个 API 操作，但是请注意：**多个 API 在一个语句中执行时，只会执行最后一个！！！**。可查看[注意用法示例](https://www.jianshu.com/p/220e0271d2e4#注意用法)

------

## 常用 API

- {$push: array} 同数组的 push 方法，将参数 array 中的所有项 push 到目标数组中

- {$unshift: array} 同数组的 unshift 方法，将参数 array 中的所有项 unshift 到目标数组中

- {$splice: array of arrays} 同数组的 splice 方法，对于参数 arrays 中的每一项，使用该项提供的参数对目标数组调用 splice()

  > PS: 参数 arrays 中的项是按顺序应用的，所以顺序很重要。在操作过程中，目标的指针可能会发生变化

- {$set: any} 使用 any 值替换目标

- {$toggle: array of strings} 将参数 array 中提供的下标或者属性的值切换成相反的布尔值

- {$unset: array of strings} 从目标对象中移除参数 array 中的键列表

- {$merge: object} 将参数 object 的键与目标合并

- {$apply: function} 将当前值传递给函数并用新的返回值更新它

- {$add: array of objects} 向 Set 或 Map 中添加值。添加到 Set 时，参数 array 为要添加的对象数组，添加到 Map 时，参数 array 为 [key, value] 数组

- {$remove: array of strings} 从 Set 或 Map 中移除参数 array 中的键列表

------

## API 用法及示例

### 初始化四个变量，之后的各种 API 操作都是基于这四个变量

```
const initialObject = {
    name: 'Jack',
    age: 22,
    gender: 'Man'
};
const initialArray = ['a', 'b', 'c', 'd', 'e'];
const initialSet = new Set(['2', '0', '1', '9', '猪', '年', '快', '乐']);
const initialMap = new Map([['id', '1'], ['color', 'blue'], ['alias', 'map']]);
```

### {$push: array}

```
/**
 * API: {$push: array}
 * 同数组的 push 方法，将数组 array 中包含的所有元素添加到 initialArray 的后面，作为一个新数组返回
 */
const pushArray = update(initialArray, { $push: ['f'] });
console.log('pushArray：', pushArray);  // => [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

### {$unshift: array}

```
/**
 * API: {$unshift: array}
 * 同数组的 unshift 方法，将数组 ['f'] 中包含的所有元素添加到 initialArray 的前面，作为一个新数组返回
 */
const unshiftArray = update(initialArray, { $unshift: ['f'] });
console.log('unshiftArray：', unshiftArray);   // => [ 'f', 'a', 'b', 'c', 'd', 'e' ]
```

### {$splice: array of arrays}

```
/**
 * API: {$splice: array of arrays}
 * 同数组的 splice 方法
 *      数组 arrays 中包含的是所有需要执行的操作集合
 *      元素 array 中第一个元素代表下标，第二个元素代表需要删除的个数，第三个元素代表需要插入到 initialArray 中的的元素
 * 
 * PS:  1、可以在 arrays 中执行多个集合；
 *      2、两个操作不是同时执行，而是按顺序执行，后面的操作会在前面一个操作的执行结果上执行
 */
const spliceArray = update(initialArray, { $splice: [[1, 2], [2, 0, 'f', 'g']] });
console.log('spliceArray：', spliceArray);  // => [ 'a', 'd', 'f', 'g', 'e' ]
```

### {$set: any}

```
/**
 * API: {$set: any}
 * 可以将数组或者对象中某一下标或者属性的值进行替换
 */
// 将 initialArray 数组中下标为 1 的元素修改为 'f'
const setArray = update(initialArray, { 1: { $set: 'f' } });
console.log('setArray', setArray);  // => [ 'a', 'f', 'c', 'd', 'e' ]

// 将 initialObject 对象中 age 属性值修改为 26
const setObject = update(initialObject, { age: { $set: 26 } });
console.log('setObject', setObject);    // => { name: 'Jack', age: 26, gender: 'Man' }
```

### {$toggle: array of strings}

```
/**
 * API: {$toggle: array of strings}
 * 可以将数组或者对象中下标集合或者属性集合的值进行切换：任何 Truthy 都会切换成 false，任何 Falsy 值都会切换成 true
 */
// 将 initialArray 中下标为 1、2 的元素值进行切换
const toggleArray = update(initialArray, { $toggle: [ 1, 2 ] });
console.log('toggleArray：', toggleArray);    // => [ 'a', false, false, 'd', 'e' ]

const toggleObject = update(initialObject, { $toggle: [ 'name', 'gender' ] });
console.log('toggleObject：', toggleObject);  // => { name: false, age: 22, gender: false }
```

### {$unset: array of strings}

```
/**
 * API: {$unset: array of strings}
 * 从目标数组或者对象中移除 array 中的下标或者属性列表
 */
// 删除数组 initialArray 中下标为 1 和 2 的两个元素，但是保留占位
const unsetArray = update(initialArray, { $unset: [1, 2] });
console.log('unsetArray：', unsetArray.length, unsetArray); // 5    [ 'a', <2 empty items>, 'd', 'e' ]

// 删除对象 initialObject 中 name 和 gender 属性
const unsetObject = update(initialObject, { $unset: ['name', 'gender'] });
console.log('unsetObject', unsetObject);    // unsetObject { age: 22 }
```

### {$merge: object}

```
/**
 * API: {$merge: object}
 * 从目标数组或者对象中合并 object 中下标或者属性相同的元素，下标或属性相同时 object 中的元素会替换掉目标中的元素
 */
// 将 initialArray 数组中的 'a', 'b', 'c' 替换为 1, 2, 3
const mergeArray = update(initialArray, { $merge: [1, 2, 3] });
console.log('mergeArray：', mergeArray);    // => [ 1, 2, 3, 'd', 'e' ]

// 将 initialObject 和 { name: 'Rose', gender: 'Woman', hobby: 'Swimming' } } 对象进行合并
const mergeObject = update(initialObject, { $merge: { name: 'Rose', gender: 'Woman', hobby: 'Swimming' } });
console.log('mergeObject', mergeObject);    // => { name: 'Rose', age: 22, gender: 'Woman', hobby: 'Swimming' }
```

### {$apply: function}

```
/**
 * API: {$apply: function}
 * 为目标数组或者对象中某个下标或者属性应用 function
 */
const apply = (val) => val + '--apply'
// 为 initialArray 数组中下标为 1 的元素执行 apply 函数
const applyArray = update(initialArray, { 1: { $apply: apply } });
console.log('applyArray：', applyArray);    // => [ 'a', 'b--apply', 'c', 'd', 'e' ]

// 为 initialObject 对象中 name 属性执行 apply 函数
const applyObject = update(initialObject, { name: { $apply: apply } });
console.log('applyObject：', applyObject);  // => { name: 'Jack--apply', age: 22, gender: 'Man' }
```

### {$add: array of objects}

```
/**
 * API: {$add: array of objects}
 * 向 Set 中添加元素时，array 是一个对象的数组，向 Map 中添加元素时， array 是一个 [key, value] 的数组
 */
// 将 ['Hello', 'World'] 中的元素添加到 initialSet 后，并返回一个新的 Set
const addSet = update(initialSet, { $add: ['Hello', 'World'] });
console.log('addSet：', addSet);    // => Set { '2', '0', '1', '9', '猪', '年', '快', '乐', 'Hello', 'World' }

// 将 [[3, 'Hello'], ['width', '20px']] 中的元素添加到 initialMap 中，并返回一个新的 Map
const addMap = update(initialMap, { $add: [[3, 'Hello'], ['width', '20px']] });
console.log('addMap', addMap);  // => Map { 'id' => '1', 'color' => 'blue', 3 => 'Hello', 'width' => '20px' }
```

### {$remove: array of strings}

```
/**
 * API: {$remove: array of strings}
 * 从 Set 或者 Map 中移除 array 中的键列表
 */
// 删除 initialSet 中的 '猪' 和 '年' 这两个元素
const removeSet = update(initialSet, { $remove: ['猪', '年'] });
console.log('removeSet：', removeSet);  // => removeSet： Set { '2', '0', '1', '9', '快', '乐' }

// 删除 initialMap 中的 'color'和 'alias' 对应的两个键值对
const removeMap = update(initialMap, { $remove: ['color', 'alias'] });
console.log('removeMap：', removeMap);  // => Map { 'id' => '1' }
```

------

## 扩展用法

- 可多层结构内使用

```
/**
 * 扩展用法：可多层结构内使用
 */
const initialConfig = {
    width: 100,
    height: 100,
    options: [
        { color: 'red', shape: 'Square' },
        { color: 'blue', shape: 'Circular' }
    ]
}
// 多层结构内使用
const multiConfig1 = update(initialConfig, { options: { color: { $set: 'pink' } } });
console.log('multiConfig1：', multiConfig1);
/* => 
{ width: 100,
  height: 100,
  options:
   [ { color: 'red', shape: 'Square' },
     { color: 'blue', shape: 'Circular' },
     color: 'pink' ] }
*/
```

------

## 注意用法

- 多种操作不要一起使用，否则只会执行最后的一个操作

```
/**
 * 注意用法：多种操作不要一起使用，否则只会执行最后的一个操作
 */

const initialConfig = {
    width: 100,
    height: 100,
    options: [
        { color: 'red', shape: 'Square' },
        { color: 'blue', shape: 'Circular' }
    ]
}

// 例子：只会执行最后的设置 color 属性的操作
const multiConfig2 = update(initialConfig, { options: { $push: [ { color: 'deepPink', shape: 'Triangle' } ] }, options: { color: { $set: 'pink' } } });
console.log('multiConfig2：', multiConfig2);    
/* => 
{ width: 100,
  height: 100,
  options:
   [ { color: 'red', shape: 'Square' },
     { color: 'blue', shape: 'Circular' },
     color: 'pink' ] }
*/
```
