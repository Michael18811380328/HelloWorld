## immutable.js 在React、Redux中的实践以及常用API简介

### 简介

这个immutable Data 是什么鬼，有什么优点，好处等等，我就不赘述了，这篇[Immutable 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20295971?columnSlug=purerender)讲的很透彻。

### 一个说明不可变的例子

这个可变和不可变是相对于 JavaScript原生引用类型来说的。

```
// 原生对象
let a1 = {
    b: 1,
    c: {
        c1: 123
    }
};

let b1 = a1;
b1.b = 2;

console.log(a1.b, b1.b); // 2, 2
console.log(a1 === b1); // true
console.log(a1.c === b1.c); // true

// immutable.js 的Map
let a2 = Immutable.fromJS({
    b: 1,
    c: {
        c1: 123
    }
});

let b2 = a2.set('b', 2);

// 对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象
console.log(a2.get('b'), b2.get('b')); // 1, 2  对象 a2 的 b 值并没有变成2。
console.log(a2 === b2); //  false

//如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。
console.log(a2.get('c') === b2.get('c')); //true
```

### 有哪些数据类型？

`List`：有序索引集，类似于 JavaScript 中的 `Array`。
`Map`：类似于 JavaScript 中的 `Object`。
`OrderedMap`：有序 `Map`，排序依据是数据的 `set()` 操作。
`Set`：和 ES6 中的 `Set` 类似，都是没有重复值的集合。
`OrderedSet`：`Set` 的变体，可以保证遍历的顺序性。排序依据是数据的 add 操作。
`Stack`：有序集合，且使用 `unshift(v)` 和 `shift()` 进行添加和删除操作的复杂度为 O(1)
`Range()`：返回一个 `Seq.Indexed` 类型的数据集合，该方法接收三个参数 `(start = 1, end = infinity, step = 1)`，分别表示起始点、终止点和步长，如果 `start` 等于 `end`，则返回空的数据结合。
`Repeat()`：返回一个 `Seq.indexed` 类型的数据结合，该方法接收两个参数 `(value，times)`，`value` 表示重复生成的值，times 表示重复生成的次数，如果没有指定 `times`，则表示生成的 `Seq`包含无限个 `value`。
`Record`：在表现上类似于 ES6 中的 Class，但在某些细节上还有所不同。
`Seq`：序列（may not be backed by a concrete data structure）
`Iterable`：可以被迭代的 `(Key, Value)` 键值对集合，是 Immutable.js 中其他所有集合的基类，为其他所有集合提供了 基础的 `Iterable` 操作函数（比如 `map()` 和 `filter`）。
`Collection`：创建 Immutable 数据结构的最基础的抽象类，不能直接构造该类型。
`Iterable`：可以被迭代的 `(Key, Value)` 键值对集合，是 Immutable.js 中其他所有集合的基类，为其他所有集合提供了 基础的 `Iterable` 操作函数（比如 `map()` 和 `filter`）。

好吧，上面那么多乐行常用的也就是 `List`和`Map`，顶多再加个`Seq`。

### 几个重要的API

先来说说几个重要的API吧，也是最常用的。

#### fromJS()

`fromJS()` 是最最最常用的将原生JS数据转换为ImmutableJS数据的转换方法。使用方式类似于 `JSON.parse()`，接收两个参数：`json` 数据和 `reviver` 函数。
在不传递`reviver`函数的情况下，默认将原生JS的`Array`转为`List`，`Object`转为`Map`.

```
// 常见
const t1 = Immutable.fromJS({a: {b: [10, 20, 30]}, c: 40});
console.log(t1);

// 不常用
const t2 = Immutable.fromJS({a: {b: [10, 20, 30]}, c: 40}, function(key, value) {
    // 定制转换方式，下这种就是将Array转换为List，Object转换为Map
    const isIndexed = Immutable.Iterable.isIndexed(value);
    return isIndexed ? value.toList() : value.toOrderedMap();
    // true, "b", {b: [10, 20, 30]}
    // false, "a", {a: {b: [10, 20, 30]}, c: 40}
    // false, "", {"": {a: {b: [10, 20, 30]}, c: 40}}
});
console.log(t2);
```

`fromJS()`的源码:

```
function fromJS(json, converter) {
    return converter ?
        fromJSWith(converter, json, '', {'': json}) :
        fromJSDefault(json);
}

function fromJSDefault(json) {
    if (Array.isArray(json)) {
        return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
        return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
}
```

通过源码可以发现其默认只转换`Object`和`Array`，其他原生类型原封不动返回。

#### toJS()

先来看官网的一段话：

> immutable数据应该被当作值而不是对象，值是表示该事件在特定时刻的状态。这个原则对理解不可变数据的适当使用是最重要的。为了将Immutable.js数据视为值，就必须使用`Immutable.is()`函数或`.equals()`方法来确定值相等，而不是确定对象引用标识的 `===` 操作符。

所以`toJS()`就是用来对两个immutable对象进行值比较的。使用方式类似于 `Object.is(obj1, obj2)`，接收两个参数。

```
const map1 = Immutable.Map({a:1, b:1, c:1});
const map2 = Immutable.Map({a:1, b:1, c:1});

// 两个不同的对象
console.log(map1 === map2); // false
// 进行值比较
console.log(Immutable.is(map1, map2)); // true

// 不仅仅只能比较ImmutableJS的类型的数据
console.log(Immutable.is(undefined, undefined)); // true
console.log(Immutable.is(null, undefined)); // false
console.log(Immutable.is(null, null)); // true
console.log(Immutable.is(NaN, NaN)); // true

// 区别于 Object.is
console.log(Object.is(0, -0) ,Immutable.is(-0, 0)); // false , true
```

源码:

```
function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
    }
    if (!valueA || !valueB) {
        return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
        valueA = valueA.valueOf();
        valueB = valueB.valueOf();
        if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
            return true;
        }
        if (!valueA || !valueB) {
            return false;
        }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
        return true;
    }
    return false;
}
```

上面这段源码写的很精练优雅，值得学习和借鉴。

### Map

`Map` 数据类型，对应原生 `Object` 数组。最最常用的 数据结构之一，循环时无序(`orderedMap`有序)，对象的 `key` 可以是任意值。具体看下面的例子：

```
console.log(Map().set(List.of(1), 'list-of-one').get(List.of(1)));
console.log(Map().set(NaN, 'NaN').get(NaN));
console.log(Map().set(undefined, 'undefined').get(undefined));
console.log(Map().set(null, 'null').get(null));
```

#### 简单介绍 `OrderedMap`

`OrderedMap` 是 `Map` 的变体，它除了具有 `Map` 的特性外，还具有顺序性，当开发者遍历 `OrderedMap` 的实例时，遍历顺序为该实例中元素的声明、添加顺序。`OrderedMap`比`非有序Map`更昂贵，并且可能消耗更多的内存。如果真要求遍历有序，请使用`List`。

### List

List 数据类型，对应原生 Array 数组。和原生数组，最大区别不存在'空位'。`[, , , , ]`

```
console.log(List([,,,,]).toJS());// [undefined, undefined, undefined, undefined]
```

### API

我们主要介绍`Map` 和 `List`。

#### 创建

!@### 通过构造函数 `Map()`

构造函数不常用，一般都是通过`Immutable.fromJS()`将一个`JS原生对象`转换为一个`Immutable对象`。

!@#### Map()

```
/*
 Map<K, V>(): Map<K, V>
 Map<K, V>(iter: Iterable.Keyed<K, V>): Map<K, V>
 Map<K, V>(iter: Iterable<any, Array<any>>): Map<K, V>
 Map<K, V>(obj: Array<Array<any>>): Map<K, V>
 Map<V>(obj: {[key: string]: V}): Map<string, V>
 Map<K, V>(iterator: Iterator<Array<any>>): Map<K, V>
 Map<K, V>(iterable: Object): Map<K, V>
 */

console.log(Map().toJS()); // {}
console.log(Map({key: "value"}).toJS()); // {key: "value"}
```

同Key覆盖问题

```
//最后的{key: value2} 覆盖了前面的 {key: value}
console.log(Map([["key", "value"], ["key", "value2"], ["key1", "value1"]]).toJS());// {key: "value2", key1: "value1"}
```

!@#### List()

```
/*
 List<T>(): List<T>
 List<T>(iter: Iterable.Indexed<T>): List<T>
 List<T>(iter: Iterable.Set<T>): List<T>
 List<K, V>(iter: Iterable.Keyed<K, V>): List<any>
 List<T>(array: Array<T>): List<T>
 List<T>(iterator: Iterator<T>): List<T>
 List<T>(iterable: Object): List<T>
 */

console.log(List().toJS()); // []
console.log(List([1,2,3,4,{a:123}]).toJS()); // [ 1, 2, 3, 4, {a: 123}]
```

!@### 另一种方式

!@#### `Map.of()`

```
console.log(Map.of('key1','value1','key2','value2','key3','value3').toJS()); // {key1: "value1", key2: "value2", key3: "value3"}
```

!@#### `List.of()`

```
console.log(List.of({x:1}, 2, [3], 4).toJS()); // [{x:1}, 2, [3], 4]
```

#### 判断是否是一个`Map`或者`List`

!@#### Map判断

判断是否是一个Map , 对原生Object不生效

```
console.log(Map.isMap({})); // false
console.log(Map.isMap(Map({}))); // true
```

!@#### List判断

判断是否是一个List , 对原生Array不生效

```
console.log(List.isList([])); // false
console.log(List.isList(List([]))); // true
```

#### 获取大小

!@#### size

```
// list
console.log(List([1,2,3,4]).size);// 4
console.log(List.of(1, 2, 3, 4).size);// 4

// map
console.log(Map({key: "value2", key1: "value1"}).size);// 2
console.log(Map.of({x:1}, 2, [3], 4).size);// 2
```

!@#### count()

```
// map
console.log(Immutable.fromJS({key: "value2", key1: "value1"}).count());// 4
// 可以定制条件，来确定大小
console.log(Immutable.fromJS({key: 1, key1: 34}).count((value, key, obj) => {
    return value > 3;
}));// 1 value大于3的有两个

// list
console.log(Immutable.fromJS([1, 2, 5, 6]).count());// 4
// 可以制定条件，来确定 大小
console.log(Immutable.fromJS([1, 2, 5, 6]).count((value, index, array) => {
    return value > 3;
}));// 2 大于3的有两个
```

!@#### countBy()

`countBy()`和`count()`的区别就是它的返回值是一个对象。

```
// Map
console.log(Immutable.fromJS({key: 1, key1: 34}).countBy((value, key, obj) => {
    return value > 3;
}).toJS());// {false: 1, true: 1}

// list
console.log(Immutable.fromJS([1, 2, 5, 6]).countBy((value, index, array) => {
    return value > 3;
}).toJS());// {false: 2, true: 2}
```

ps: `count()` 兼容惰性计算 `countBy()` 不兼容，先不做深研究。

#### 添加元素

!@### Set

```
// Map
// 将 key 位置的元素替换为 value
const $obj1 = Map({a: {a1: 34}, b: 2, c: 3, d: 444});
console.log($obj1.set('a', 0).toJS()); // {a: 0, b: 2, c: 3, d: 444}
console.log($obj1.set('e', 99).toJS());  // {a: 1, b: 2, c: 3, d: 444, e: 99}

// List
// 将 index 位置的元素替换为 value，即使索引越界也是安全的, 空位 undefined
const $arr1 = List([1, 2, 3]);
console.log($arr1.set(-1, 0).toJS()); // [1, 2, 0]  注意-1 等效于 $arr1.set($arr1.size + -1, 0)
console.log($arr1.set(4, 0).toJS());  // [ 1, 2, 3, undefined, 0 ]  空位置为了undefined
```

!@### setIn

```
// Map
console.log(Immutable.fromJS([1, 2, 3, {a: 45, b: 64}]).setIn(['3', 'a'], 1000).toJS());//[1, 2, 3, {a: 1000, b: 64}]

// List
console.log(Immutable.fromJS([1, 2, 3, {a: 45, b: 64}]).setIn(['3', 'a'], 1000).toJS());//[1, 2, 3, {a: 1000, b: 64}]
```

#### List 特有的添加元素

!@### 插入元素

```
// insert(index: number, value: T)
// 向 index 位置插入 value
console.log(Immutable.fromJS([1, 2, 3]).insert(1, 1.5).toJS()); // [ 1, 1.5, 2, 3 ]
```

!@### 设置size

默认值`undefined`

```
console.log(List([]).setSize(2).toJS()); // [undefined, undefined]
```

!@### pop、push、shift、unshift

`List`数据类型也拥有`pop、push、shift、unshift`这四种操作方法，和原生`Array`的四种方法使用方式一致，但唯一区别就是返回新的`List`，并且不改变原来的数组本身，而原生则是会改变元素本身。

```
// ImmutableJS：返回新的List，并且不改变元素本身
const $test = List([1, 2, 3, 4]);
console.log($test.pop().toJS(), $test.toJS()); // [1, 2, 3] [1, 2, 3, 4]
// 原生：返回被改变的值，改变元素本身
const test = [1, 2, 3, 4];
console.log(test.pop(), test); // 4 [1, 2, 3]
```

!@### 花样插入

```
// interpose
// 插入xxx之间
console.log(Immutable.fromJS([1, 2, 5, 6]).interpose(5555).toJS()); // [1, 5555, 2, 5555, 5, 5555, 6]

// interleave
// 被操作的两个数组，每个的第一项、第二项、第三项... 组成新的数组。
console.log(Immutable.fromJS([1, 2, 5, 6]).interleave(Immutable.fromJS([555, 666])).toJS()); // [1, 555, 2, 666]

// zip
// 被操作的两个数组，抽离第一项和第二项组成新的子数组，放入到一个大数组中，形成二维数组。
console.log(Immutable.fromJS([1, 2, 5, 6]).zip(Immutable.fromJS([555, 666]).toJS())); // [ [1, 555], [2, 666]]

// 自定义插入规则。
// zipWith
console.log(Immutable.fromJS([1, 2, 5, 6]).zipWith((a, b) => {
    return a + b;
}, Immutable.fromJS([555, 666]).toJS())); // [ 556, 668]
```

#### 删除元素

!@### delete(key)

```
// List
// delete(index: number)
// 删除 index 位置的元素
console.log(Immutable.fromJS([1, 2, 3]).delete(1).toJS(), $arr1.toJS());// [ 1, 3 ] [ 1, 2, 3]
console.log(Immutable.fromJS([1, 2, 3]).delete(77).toJS(), $arr1.toJS(), '超过范围不会强制报错');// [ 1, 2, 3] [ 1, 2, 3] 超过范围不会强制报错

// Map
console.log(Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444}).delete('c').toJS(), $obj1.toJS());// {a: 1, b: 2, d: 444}  {a: 1, b: 2, c: 3, d: 444}
console.log(Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444}).delete('asdfasfd').toJS(), $obj1.toJS());// {a: 1, b: 2, c: 3, d: 444} {a: 1, b: 2, c: 3, d: 444}
```

!@### deleteIn

和 `setIn` 使用方式一致

!@### 清空元素 lear()

```
// List
console.log(Immutable.fromJS([1, 2, 3]).clear().toJS());// []

// Map
console.log(Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444}).clear().toJS());// {}
```

#### 修改元素

修改某一个元素

!@### set setIn

上面已经介绍过

!@### update

`update(key: K, notSetValue: V, updater: (value: V) => V): Map<K, V>`

```
// List
const $arr1 = Immutable.fromJS([1, 2, 3]);
console.log($arr1.update('2', (value)=> {
    return value * 2;
}).toJS(), $arr1.toJS());// [1, 2, 6] [1, 2, 3]

console.log($arr1.update('6', 1, (value)=> {
    return value * 2;
}).toJS(), $arr1.toJS());// [1, 2, 3, undefined, undefined, undefined, 2] [1, 2, 3]

console.log($arr1.update('6', 0, (value)=> { // 默认值必须大于0 感觉有BUG，所以还是不要用了。
    return value * 2;
}).toJS(), $arr1.toJS());// [1, 2, 3] [1, 2, 3]

// Map
const $obj1 = Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444});
console.log($obj1.update('a', (value)=> {
    return value * 2;
}).toJS(), $obj1.toJS());// {a: 2, b: 2, c: 3, d: 444} {a: 1, b: 2, c: 3, d: 444}

console.log($obj1.update('e', 1, (value)=> {
    return value * 2;
}).toJS(), $obj1.toJS());//   {a: 1, b: 2, c: 3, d: 444, e: 2} {a: 1, b: 2, c: 3, d: 444}

console.log($obj1.update('e', 0, (value)=> { // 默认值入手是number必须大于0 感觉有BUG，所以还是不要用了。
    return value * 2;
}).toJS(), $obj1.toJS());//  {a: 1, b: 2, c: 6, d: 444} {a: 1, b: 2, c: 3, d: 444}
```

!@### updateIn

使用方式和`setIn`一样。

#### 获取某个元素值

!@### get getIn

使用方式：`get(key: number, notSetValue?: T)`

```
// List
const $test = Immutable.fromJS([1111111, 22222, {a: 888123}]);
console.log($test.get(0)); // 1111111

// 只有数组可以用 number 类型 的key
console.log(Immutable.fromJS({1: 'abc'}).get(1), Immutable.fromJS({1: 'abc'}).get('1'));// undefined "abc" | 只有数组可以用 number 类型 的key

// notSetValue 默认值，了解
console.log($test.get(11, 'no have value')); // no have value

// getIn
console.log($test.getIn(['2', 'a'], 'child no have value')); // 888123
console.log($test.getIn(['2', 'b'], 'child no have value')); // child no have value

// Map
const $test = Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444});
console.log($test.get('a')); // 1111111

// notSetValue 默认值，了解
console.log($test.get('v', 'no have value')); // no have value

// getIn
console.log($test.getIn(['a', 'a1'], 'child no have value')); // 222
console.log($test.getIn(['d', 'b1'], 'child no have value')); // child no have value
```

!@### 获取头、尾元素:

```
// List
const $arr1 = Immutable.fromJS([1, 2, 3]);
console.log($arr1.first());// 1
console.log($arr1.last());// 3

// Map
Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444});
console.log($obj1.first());// {a1: 34}
console.log($obj1.last());// 444
```

#### 查找某个元素

!@### find() findLast()

`find()`、`findLast()` 返回 value。

```
// List
console.log(Immutable.fromJS([1, 2, 56, {a: {b: 111}}]).find((value, index, array) => {
    return index === 3;
}).toJS());// {a: {b: 111}}

// Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).find((value, key, obj) => {
    return value === 3;
}));// 3
```

!@### findKey() findLastKey()

`findKey()`、`findLastKey()` 返回 key

```
// List
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).findKey((value, index, array) => {
    return index === 3;
}));// 3

// Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).findKey((value, key, obj) => {
    return value === 3;
}));// c
```

!@### findEntry() findLastEntry()

`findEntry()`、`findLastEntry()` 返回 key:value。

```
// List
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).findEntry((value, index, array) => {
    return index === 3;
}));// [3, Map]

// Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).findEntry((value, key, obj) => {
    return Immutable.is(value, Immutable.fromJS({a1: 222}));
}));// ["a", Map]
```

!@### keyOf() lastKeyOf()

`keyOf()`、`lastKeyOf()` 根据 value 返回 key。

```
// List
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).keyOf(Immutable.fromJS({a: {b: 111}}))); // 3
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).keyOf(2)); // 1

// Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).keyOf(Immutable.fromJS({a1: 222}))); // a
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).keyOf(2)); // b
```

#### List 特有查找某个元素

!@### indexOf() lastIndexOf()

```
// 找不到 返回 -1
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).indexOf(Immutable.fromJS({a: {b: 111}}))); // 3
```

!@### findIndex() findLastIndex()

```
console.log(Immutable.fromJS([1, 2, 3, {a: {b: 111}}]).findIndex((value, index, array) => {
    return value/3 === 1;
})); // 2
```

#### 查找最大、最小元素

`max()`、`maxBy()`默认比较规则为`>`，`min()`、`minBy()`默认比较规则为`>`。

!@### max()

```
// List
console.log(Immutable.fromJS([1, 2, 301, 88]).max()); // 301

// 自定义比较规则
console.log(Immutable.fromJS([1, 2, 301, 88]).max((valueA, valueB) => {
    return valueA > valueB;
})); // 301

// Map
console.log(Immutable.fromJS({a: 8888, b: 2, c: 3, d: 444}).max()); // 8888

// 自定义比较规则
console.log(Immutable.fromJS({a: 8888, b: 2, c: 3, d: 444}).max((valueA, valueB) => {
    return valueA > valueB;
})); // 8888
```

!@### maxBy()

```
// List
// 自定义比较的元素
console.log(Immutable.fromJS([{a: 2}, {a: 1}, {a: 2301}, {a: 222}]).maxBy((value, index, array) => {
    return value.get('a');
}).toJS());// {a: 2301}

// 自定义比较的元素，和比较规则
console.log(Immutable.fromJS([{a: 2}, {a: 1}, {a: 2301}, {a: 222}]).maxBy((value, index, array) => {
    return value.get('a');
}, (valueA, valueB) => {
    return valueA > valueB;
}).toJS());// {a: 2301}

// Map
// 自定义比较的元素
console.log(Immutable.fromJS({a: {a1: 222}, b: {a1: 11}, c: {a1: 33}, d: {a1: 54654}}).maxBy((value, key, obj) => {
    return value.get('a1');
}).toJS());//  {a1: 54654}

// 自定义比较的元素，和比较规则
console.log(Immutable.fromJS({a: {a1: 222}, b: {a1: 11}, c: {a1: 33}, d: {a1: 54654}}).maxBy((value, key, obj) => {
    return value.get('a1');
}, (valueA, valueB) => {
    return valueA > valueB;
}).toJS());// {a1: 54654}
```

!@### min()

同`max()`

!@### minBy()

同`maxBy()`

!@### keys() values() entries()

获取ES6 `Iterable` 迭代器。

```
// List
const $test = List([11, 22, 33, 44]);

const keys = $test.keys();
for (let i of keys) {
    console.log(i);
}

const values = $test.values();
for (let i of values) {
    console.log(i);
}

const entries = $test.entries();
for (let i of entries) {
    console.log(i);
}
// Map
const $test = Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444});

const keys = $test.keys();
for (let i of keys) {
    console.log(i); // a b c d
}

const values = $test.values();
for (let i of values) {
    console.log(i); // {a1: 222} 2 3 444
}

const entries = $test.entries();
for (let i of entries) {
    console.log(i);// ["a", Map] ["b", 2] ["c", 3] ["d", 444]
}
```

#### 截取

!@### slice()

和原生Array `slice()`用法一致。

```
// List
console.log(Immutable.fromJS([1, 2, 3]).slice(0).toJS());// [1, 2, 3]

// Map
console.log(Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444}).slice(0).toJS());// {a: Object, b: 2, c: 3, d: 444}
console.log(Immutable.fromJS({a: {a1: 34}, b: 2, c: 3, d: 444}).slice(1).toJS());// {b: 2, c: 3, d: 444}
```

!@### rest() butLast()

```
// List
// rest() 返回删除第一个元素后的 List
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).rest().rest().toJS()); // [{a: 1}, 3, 4, 5, 6]
// butLast() 返回删除最后一个元素后的 List
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).butLast().toJS()); // [1, {a: 1}, 3, 4, 5]

// Map
// rest() 返回删除第一个元素后的 Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).rest().rest().toJS()); // {c: 3, d: 444}
// butLast() 返回删除最后一个元素后的 Map
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).butLast().toJS()); // {a: {a1: 222}, b: 2, c: 3}
```

!@### skip() skipLast() skipWhile() skipUntil()

```
// List

// skip(number)
// 从头按照条件抛出number个元素，对剩余元素进行截取
// 参数 数量
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).skip(2).toJS()); // [3, 4, 5, 6]

// skipLast(number)
// 从尾部按照条件抛出number个元素，对剩余元素进行截取
// 参数 数量
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).skipLast(2).toJS()); // [1, {a: 1}, 3, 4]

// skipWhile()
// 从头开始循环，抛出满足 return 条件===true 的元素。
console.log(Immutable.fromJS([111, 33 , 22, 44, 55, 66]).skipWhile((value, index, array) => {
    return value > 31;
}).toJS()); // [22, 44, 55, 66]

// skipUntil()
// 从头开始循环，抛出满足 return 条件===false 的元素。
console.log(Immutable.fromJS([32, 33 , 40, 44, 55, 66]).skipWhile((value, index, array) => {
    return value < 39;// 抛出直到小于39的元素。
}).toJS()); // [40, 44, 55, 66]

// Map
// skip(number)
// 从头开始循环，抛出满足 return 条件===true 的元素。
// 参数 数量
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).skip(2).toJS()); // {c: 3, d: 444}

// skipLast(number)
// 从尾部按照条件抛出number个元素，对剩余元素进行截取
// 参数 数量
console.log(Immutable.fromJS({a: {a1: 222}, b: 2, c: 3, d: 444}).skipLast(2).toJS()); // {a: {a1: 222}, b: 2}

// skipWhile()
// 从头开始循环，抛出满足 return 条件===true 的元素。
console.log(Immutable.fromJS({a: 1, b: 2, c: 3, d: 444}).skipWhile((value, key, obj) => {
    return value === 1;
}).toJS()); // {b: 2, c: 3, d: 444}

// skipUntil()
// 从头开始循环，抛出满足 return 条件===false 的元素。
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).skipWhile((value, key, obj) => {
    return value < 39;// 抛出直到小于39的元素。
}).toJS()); // {d: 444}
```

!@### take() takeLast() takeWhile() takeUntil()

```
// List
// take(number)
// 从头获取几个复合条件的元素
// 参数 数量
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).take(2).toJS()); // [1, {a: 1}]

// takeLast(number)
// 从尾部获取几个复合条件的元素
// 参数 数量
console.log(Immutable.fromJS([1, {a: 1}, 3, 4, 5, 6]).takeLast(2).toJS()); // [5, 6]

// takeWhile()
// 从头开始循环，获取满足 return 条件===true 的元素。
console.log(Immutable.fromJS([111, 33 , 22, 44, 55, 66]).takeWhile((value, index, array) => {
    return value > 31;
}).toJS()); //[111, 33]

// takeUntil()
// 从头开始循环，获取满足 return 条件===false 的元素。
console.log(Immutable.fromJS([32, 33 , 40, 44, 55, 66]).takeUntil((value, index, array) => {
    return value > 41;
}).toJS()); //[32, 33 , 40]

// Map
// take(number)
// 从头获取几个复合条件的元素
// 参数 数量
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).take(2).toJS()); // {a: 5, b: 2}

// takeLast(number)
// 从尾部获取几个复合条件的元素
// 参数 数量
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).takeLast(2).toJS()); // {c: 3, d: 444}

// takeWhile()
// 从头开始循环，获取满足 return 条件===true 的元素。
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).takeWhile((value, key, obj) => {
    return value > 2;
}).toJS()); //{a: 5}

// takeUntil()
// 从头开始循环，获取满足 return 条件===false 的元素。
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).takeUntil((value, key, obj) => {
    return value > 39;
}).toJS()); //{a: 5, b: 2, c: 3}
```

#### 循环遍历

`map()` `filter()` `every()` `some()` `forEach()` `reduce()` `reduceRight()`。

```
// List
//1. map()
console.log(Immutable.fromJS([1, 2, 3, 4, 5]).map((value, index, array)=>{
    return value * 2;
}).toJS()); // [2, 4, 6, 8, 10]

//2. filter()
console.log(Immutable.fromJS([1, 2, 3, 4, 5]).filter((value, index, array)=>{
    return value % 2 === 0;
}).toJS()); // [2, 4]
// filterNot() ...这个没有什么卵用

//3. every()
console.log(Immutable.fromJS([1, 2, 3, 4, 5]).every((value, index, array)=>{
    return value > 2;
})); // false

//4. some()
console.log(Immutable.fromJS([1, 2, 3, 4, 5]).some((value, index, array)=>{
    return value > 2;
})); // true

//5. forEach() 返回迭代的条目数（包括返回false的最后一个迭代）
// 与Array 的 forEach不同，如果sideEffect的任何调用返回false，迭代将停止。 返回迭代的条目数（包括返回false的最后一个迭代）。
console.log(Immutable.fromJS([1, 2, 3, 4, 5, {a: 123}]).forEach((value, index, array)=>{
    console.log(value, index, array.toJS(), 'forEach');
    return value < 5;
})); // 5

//6. reduce()
// 同原生用法
//7. reduceRight()
// 同原生用法

// Map
//1. map()
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).map((value, key, obj)=>{
    return value * 2;
}).toJS()); // {a: 10, b: 4, c: 6, d: 888}

//2. filter()
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).filter((value, key, obj)=>{
    return value % 2 === 0;
}).toJS()); // {b: 2, d: 444}
// filterNot() ...这个没有什么卵用

//3. every()
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).every((value, key, obj)=>{
    return value > 2;
})); // false

//4. some()
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).some((value, key, obj)=>{
    return value > 2;
})); // true

//5. forEach() 返回迭代的条目数（包括返回false的最后一个迭代）
// 与Array 的 forEach不同，如果sideEffect的任何调用返回false，迭代将停止。 返回迭代的条目数（包括返回false的最后一个迭代）。
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).forEach((value, key, obj)=>{
    return value < 444;
})); // 4

//6. reduce()
// 同原List用法
//7. reduceRight()
// 同List用法
```

#### Map 特有 mapKeys() mapEntries()

对`Map元素`进行处理，返回处理后的对象。

```
//mapKeys() 返回对象
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).mapKeys((key)=>{
    return key + 'hhh';
}).toJS());
// {ahhh: 5, bhhh: 2, chhh: 3, dhhh: 444}

//mapEntries() 返回对象
console.log(Immutable.fromJS({a: 5, b: 2, c: 3, d: 444}).mapEntries(([key, value])=>{
    return [key + 'aaa', value+'hhhh'];
}).toJS());//   {aaaa: "5hhhh", baaa: "2hhhh", caaa: "3hhhh", daaa: "444hhhh"}
```

#### merge

`merge()` `mergeDeep()` `mergeWith()` `mergeDeepWith()`

```
// List
const $test = Immutable.fromJS([1, 2, 3, 7, {a: {b: 55, c: 66}}]);
const $test1 = Immutable.fromJS([1, 2, 3, 6, {a: {b: 333, d: 67}}]);

// 浅merge
console.log($test.merge($test1).toJS(), $test.toJS());
// $test1 -> $test [1, 2, 3, 6, {b: 333, d: 67}] [1, 2, 3, 7, {a: {b: 55, c: 66}}]
// 深merge
console.log($test.mergeDeep($test1).toJS(), $test.toJS());
// $test1 -> $test [1, 2, 3, 6, {b: 333, c: 66, d: 67}] [1, 2, 3, 7, {a: {b: 55, c: 66}}]

// 浅merge自定义merge规则
console.log($test.mergeWith((prev, next)=> {
    // 自定义转换
    return prev;
}, $test1).toJS(), $test1.toJS());
// 深merge自定义merge规则
console.log($test.mergeDeepWith((prev, next)=> {
    // 自定义转换
    return prev;
}, $test1).toJS(), $test1.toJS());

// Map
const $test = Immutable.fromJS({a: {a1: 222, a3: 456}, b: 2, c: 3, d: 444});
const $test1 = Immutable.fromJS({a: {a1: 222, a2: 234}, b: 2, c: 3, d: 444});

// 浅merge
console.log($test.merge($test1).toJS(), $test.toJS());
// $test1 -> $test {a: {a1: 222, a2: 234}, b: 2, c: 3, d: 444} {a: {a1: 222, a3: 456}, b: 2, c: 3, d: 444}
// 深merge
console.log($test.mergeDeep($test1).toJS(), $test.toJS());
// $test1 -> $test {a: {a1: 222, a2: 234, a3: 456}, b: 2, c: 3, d: 444} {a: {a1: 222, a3: 456}, b: 2, c: 3, d: 444}

// 浅merge自定义merge规则
console.log($test.mergeWith((prev, next)=> {
    // 自定义转换
    return prev;
}, $test1).toJS(), $test1.toJS());
// 深merge自定义merge规则
console.log($test.mergeDeepWith((prev, next)=> {
    // 自定义转换
    return prev;
}, $test1).toJS(), $test1.toJS());
```

#### jonin() 转换为字符串

使用方式和原生Array的`joni()`一样。

```
// List
console.log(Immutable.fromJS([1, 2, 3, {a: 123, b: 321}]).join()); // 1,2,3,Map { "a": 123, "b": 321 }
// Map
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 444}).join()); // 2,Map { "a1": 222, "a3": 456 },3,444
```

#### isEmpty() 判空

```
// 判断空List
console.log(Immutable.fromJS([]).isEmpty()); // true
// 判断Map是否为空 比原生方便
console.log(Immutable.fromJS({}).isEmpty()); // true
```

#### has() hasIn() 检查是否有某个key

```
// List
console.log(Immutable.fromJS([1, 2, 3, {a: 123, b: 321}]).has('0')); // true
console.log(Immutable.fromJS([1, 2, 3, {a: 123, b: 321}]).hasIn([3, 'b'])); // true

// Map
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 444}).has('a')); // true
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 444}).hasIn(['a', 'a3'])); // true
```

#### includes() 是否包含某些元素

`includes()`、`contains()` 这俩等效。

```
// List
// 对象是否包含某个元素，对Immutable元素使用Immutable.is 进行比较
console.log(Immutable.fromJS([6, 5, 4, 3, 2, 1, 89]).includes('89'));// 数组没有字符89，所以返回 false
console.log(Immutable.fromJS([6, 5, 4, 3, 2, 1, '89']).contains('89'));// true
console.log(Immutable.fromJS([6, 5, 4, 3, 2, 1, Immutable.fromJS([6, 5, 4])]).contains(Immutable.fromJS([6, 5, 4])));// true

// Map
// 对象是否包含某个元素，对Immutable元素使用Immutable.is 进行比较
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 89}).includes('89'));// 数组没有字符89，所以返回 false
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: '89'}).contains('89'));// true
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: Immutable.fromJS([6, 5, 4])}).contains(Immutable.fromJS([6, 5, 4])));// true
```

#### isSubset() 子集判断

```
// List
// isSubset()
console.log(Immutable.fromJS([6, 5, 1, [6, 5, 4]]).isSubset(Immutable.fromJS([[6, 5, 4], 6, 5, 4, 3, 2, 1, '89'])));// true
// isSuperset 就是 isSubset 参数掉个个儿
console.log(Immutable.fromJS([[6, 5, 4], 6, 5, 4, 3, 2, 1, '89']).isSuperset(Immutable.fromJS([6, 5, 1, [6, 5, 4]])));// true

// Map
// isSubset()
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}}).isSubset(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 5})));// true
// isSuperset 就是 isSubset 参数掉个个儿
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 5}).isSuperset(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}})));// true
```

#### reverse() 反转

```
// List
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6]).reverse().toJS());
// [6, 5, 4, 3, 2, 1]
// Map
console.log(Immutable.fromJS({b: 2, a: {a1: 222, a3: 456}, c: 3, d: 5}).reverse().toJS());
// {d: 5, c: 3, a: {a1: 222, a3: 456}, b: 2}
```

#### 排序

`sort()`和`sortBy()`。

```
// List
// sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
console.log(Immutable.fromJS([6, 5, 4, 3, 2, 1]).sort().toJS());
// 传入比较函数
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6]).sort((a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
}).toJS());
// sortBy
/*
    sortBy<C>(
    comparatorValueMapper: (value: T, key: number, iter: Iterable<number, T>) => C,
    comparator?: (valueA: C, valueB: C) => number
    ): Iterable<number, T>
    */
console.log(Immutable.fromJS([{a: 1, b: {c: 22}}, {a: 2, b: {c: 22}}, {a: 1, b: {c: 22}},
    {a: 3, b: {c: 22}}, {a: 10, b: {c: 22}}, {a: 9, b: {c: 22}}]).sortBy((value, index, array)=> {
    return value.get('a')
},(a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
}).toJS());

// Map
console.log(Immutable.fromJS({b: 2, a: 88, c: 3, d: 5}).sort().toJS());// {b: 2, c: 3, d: 5, a: 88}
// 传入比较函数
console.log(Immutable.fromJS({b: 2, a: 88, c: 3, d: 5}).sort((a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
}).toJS());// {b: 2, c: 3, d: 5, a: 88}
// sortBy
/*
sortBy<C>(
comparatorValueMapper: (value: T, key: number, iter: Iterable<number, T>) => C,
comparator?: (valueA: C, valueB: C) => number
): Iterable<number, T>
*/
console.log(Immutable.fromJS({b: {a: 2}, a: {a: 88}, c: {a: 3}, d: {a: 5}}).sortBy((value, key, obj)=> {
    return value.get('a')
},(a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    if (a === b) {
        return 0;
    }
}).toJS());// {b: {a: 2}, c: {a: 3}, d: {a: 5}, a: {a: 88}}
```

#### flatten() 平铺

参数默认情况下，`false` 深度平铺，`true` 浅度平铺1层。

```
// List
console.log(Immutable.fromJS([1, 2, 3, 4, [1, 11, 111, 12344], {a: 1234, b: {bb: [777, 888]}}, 5, 6]).flatten().toJS());
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, 777, 888, 5, 6]
console.log(Immutable.fromJS([1, 2, 3, 4, [1, 11, 111, 12344], {a: 1234, b: {bb: [777, 888]}}, 5, 6]).flatten(true).toJS());
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, Object, 5, 6]

// Map
console.log(Immutable.fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5}).flatten().toJS());
// {0: 1, 1: 2, 2: 3, b: 2, a5: 333, c: 3, d: 5}
console.log(Immutable.fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5}).flatten(true).toJS());
// {b: 2, a1: Object, a3: Array[3], c: 3, d: 5}
```

另外还有一个`flatMap()`方法，它就等同于`List([1,2,3,4,5,6]).map(...).flatten(true)`。

#### groupBy() 分组

返回值是`OrderedMap`。

```
// List
console.log(Immutable.fromJS([{v: 0, a: 111}, {v: 1, a: {b: [1, 2, 3]}}, {v: 1, a: 333}, {v: 0, a: {b: [1, 2, 3]}}, {v: 1, a: 333}]).groupBy((value) => {
    return value.get('a')
}).toJS());
// OrderedMap {111: Array[1], 333: Array[2], Map { "b": List [ 1, 2, 3 ] }: Array[2]}

// Map
console.log(Immutable.fromJS({b: {a5: 333}, a: {a5: 333}, c: {a5: 334}, d: {a5: 334}}).groupBy((value) => {
    return value.get('a5')
}).toJS());
// OrderedMap  {333: {b: {a5: 333}, a: {a5: 333}}, 334: {c: {a5: 334}, d: {a5: 334}}}
```

#### flip() Map 特有翻转

```
console.log(Immutable.fromJS({b: 'b1', a: 'a1', c: 'c1', d: 'd1'}).flip().toJS()); // {b1: "b", a1: "a", c1: "c", d1: "d"}
```

#### 连接 concat()

```
// List
const $test1 = Immutable.fromJS([1, 2, 3, 4, 5, 6]);
const $test2 = Immutable.fromJS([111, 222, 333, 444, 555, 666]);
console.log($test1.concat($test2).toJS()); //[1, 2, 3, 4, 5, 6, 111, 222, 333, 444, 555, 666]
console.log($test1.toJS(), $test2.toJS()); //[1, 2, 3, 4, 5, 6] [111, 222, 333, 444, 555, 666]

// Map
const $test1 = Immutable.fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5});
const $test2 = Immutable.fromJS({b1: 22, b: 34});
console.log($test1.concat($test2).toJS()); //{b: 34, a: Object, c: 3, d: 5, b1: 22} 属性 b 被覆盖
console.log($test1.toJS(), $test2.toJS()); //{b: 2, a: {a1: {a5: 333}, c: 3, d: 5} b1: 22, b: 34}
```

#### 类型转换

!@### 转换为原生类型

```
// List
// 浅层
// toArray
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6, {a: {b: [1234, 22]}}]).toArray());// [1, 2, 3, 4, 5, 6, Map]
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6, [1234, 22]]).toArray());// [1, 2, 3, 4, 5, 6, List]
// toObject
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6, {a: {b: [1234, 22]}}]).toObject());// {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: Map}
console.log(Immutable.fromJS([1, 2, 3, 4, 5, 6, [1234, 22]]).toObject());// {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: List}
//深层
// 就是一直在用的 toJS(); 不到万不得已，尽量不用。

// Map
// 浅层
// toArray
console.log(Immutable.fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5}).toArray());// [2, Map, 3, 5]
console.log(Immutable.fromJS({b: 2, a: [1, 2, 2], c: 3, d: 5}).toArray());// [2, List, 3, 5]
// toObject
console.log(Immutable.fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5}).toObject());// {b: 2, a: Map, c: 3, d: 5}
console.log(Immutable.fromJS({b: 2, a: [1, 2, 2]}).toObject());// {b: 2, a: List}
//深层
// 就是一直在用的 toJS(); 不到万不得已，尽量不用。
```

!@### 转换为其他ImmutableJS数据类型

暂时不做详细介绍。

```
// toMap()
// toOrderedMap()
// toSet()
// toOrderedSet()
// toList()
// toStack()
```

#### 性能调优，批处理

```
const $list1 = Immutable.List.of(1,2,3);
$list.push(4).push(5).push(6);
console.log($list1.toJS());// [1, 2, 3, 4, 5, 6]
```

在上面的代码中，进行三次`push()`操作，会分别产生三个`List`，其中头两次中间`List`明显是冗余的，我们其实只关心最后一次产生的`List`，这种情况就产生了冗余操作，为了消除这种冗余的操作，减少其中的性能损耗，我们可以先暂时把`$list1`变成非immutable的，这样我们进行`push`操作时就不会产生冗余的中间`List`。

这里面有性能比较：[stack overflow 中的一个问题](http://stackoverflow.com/questions/28510753/when-should-i-use-withmutations-on-a-map-in-immutable-js)
。
在把Immutable类型的数据，转为可变的之后，只有部分操作方法会返回可变的数据，其他操作方法仍然会返回immutable数据，但是这些方法应该就够用了。

```
// Map: set(), merge()
// List: push(), pop(), shift(), unshift()
```

!@### withMutations()

为此 `withMutations()` 函数把`list`临时变为可变的数据。

```
// List
// 将传入的对象变成可变的对象，为了提高性能
const $list1 = Immutable.List.of(1,2,3);
const $list2 = $list1.withMutations(function ($list) {
    $list.push(4).push(5).push(6);
    // 为此 withMutations 函数把list临时变为可变的数据，这三次push实质上只产生了一个中间态list
});
console.log($list1.size);// 3
console.log($list2.size);// 6
```

```
// Map
const $obj1 = Immutable.fromJS({b: 2, a: [1, 2, 2]});
const $obj2 = $obj1.withMutations(function ($obj) {
    $obj.set('c', 4444).set('d', 4444).set('e', 4444);
});
console.log($obj1.size);// 2
console.log($obj2.size);// 5
```

!@### asMutable() asImmutable()

这两个一定要配对使用.

```
// List demo：
const $test1 = Immutable.List.of(1,2,3);

const $test2 = $test1.asMutable(); // 变成可变对象
console.log($test1 === $test2, Immutable.is($test1, $test2)); // false true

const $test3 = $test2.set(0, 123); // 这里没有产生新的对象
console.log($test3.toJS(), $test2.toJS(), $test3 === $test2, Immutable.is($test3, $test2));// [123, 2, 3] [123, 2, 3] true true

// 变成不可变对象
const $test4 = $test3.asImmutable();
const $test5 = $test4.set(0, 234);
console.log($test4 === $test3, Immutable.is($test4, $test3));// true true
console.log($test4.toJS(), $test5.toJS(), $test4 === $test5, Immutable.is($test4, $test5));// [123, 2, 3] [234, 2, 3] false false
```

```
// Map demo：
const $test1 = Immutable.fromJS({b: 2, a: [1, 2, 2]});

const $test2 = $test1.asMutable(); // 变成可变对象
console.log($test1 === $test2, Immutable.is($test1, $test2)); // false true

const $test3 = $test2.set('b', 123); // 这里没有产生新的对象
console.log($test3.toJS(), $test2.toJS(), $test3 === $test2, Immutable.is($test3, $test2));// {b: 123, a: Array[3]} {b: 123, a: Array[3]} true true

// const $test3 = $test2.slice(1); // 这里没有产生新的对象
// console.log($test3.toJS(), $test2.toJS(), $test3 === $test2, Immutable.is($test3, $test2));// {a: Array[3]} {b: 2, a: Array[3]}  false false

// 变成不可变对象
const $test4 = $test3.asImmutable();
const $test5 = $test4.set('b', 234);
console.log($test4 === $test3, Immutable.is($test4, $test3));// true true
console.log($test4.toJS(), $test5.toJS(), $test4 === $test5, Immutable.is($test4, $test5));// {b: 234, a: Array[3]} {b: 123, a: Array[3]} [234, 2, 3] false false
```

### 和React Redux 架构的结合

利用 immutable.js 不可变的特性，可以极大的优化React render的冗余执行。React 官方提供的`PureRenderMixin`是浅比较，具体的不用细说，网上一查一堆。

#### immutable-pure-render-decorator

专门针对immutable的`PureRenderMixin`，用来装饰React组件。

```
import {React} from 'base';

import pureRenderDecorator from '../../../widgets/libs/immutable-pure-render-decorator';

@pureRenderDecorator
export default class PartA extends React.Component {
    constructor(props) {
        super(props);
        // 舍弃React.addons.PureRenderMixin
        // this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        console.log('组件PartA，render执行了');
        const data = this.props.data;
        return (
            <section>
                <div>
                    <p>我是组件PartA</p>
                    <p>{data.toJSON ? JSON.stringify(data.toJSON()) : data}</p>
                </div>
            </section>
        )
    }
}
```

#### 优化shouldComponentUpdate()

我们都知道官方提供的`React.addons.PureRenderMixin`提供的`shouldComponentUpdate()`，只能进行浅比较，对于引用类型`Object`、`Array`比较无力，而如果使用Immutable的`Map`和`List`替换`Object`、`Array`，则可以使用`Immutable.is()`来比较两个引用类型，从而补充了`React.addons.PureRenderMixin`的漏洞。

!@### immutable-pure-render-decorator 源码

源码见附件

#### 高阶组件封装

对于使用immutable.js的项目，在应用公共组件的时候，由于公共组件的内部实现一定是原生JS数据，所以我们只能传递原生JS数据到公共组件，但是如果转换成了原生JS数据，就又会出现"`React.addons.PureRenderMixin`提供的`shouldComponentUpdate()`是浅比较"问题，对此可以使用下面的高阶组件进行封装。

```
/**
 * Created by 百竿<shengdong.ysd@alibaba-inc.com> on 2017-2-6.
 */
import {React} from 'base';
// 通过Immutable.is 封装过的 shouldComponentUpdate
import {shouldComponentUpdate} from '../immutable-pure-render-decorator';

export default ComposedComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        }
        render() {
            const props = this.props.toJS ? this.props.toJS() : this.props;
            return <ComposedComponent {...this.props} {...props} />;
        }
    }
};
```

demo：

```
import {React} from 'base';
import { connect } from 'react-redux';
import highComponent from '../../../../widgets/libs/utils/highComponent';
import actions from '../../actions';

// 公共组件
import Dialog from '@alife/dialog';

// import Immutable from 'immutable';
function mapStateToProps(state) {
    return {
        open: state.getIn(['dialog', 'open']),
        title: state.getIn(['dialog', 'title'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPrimaryTouchTap: ()=> {
            dispatch(actions.toggleDialog(false));
        },
        onSecondaryTouchTap: ()=> {
            dispatch(actions.toggleDialog(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(highComponent(Dialog))//通过高阶组件封装
```
