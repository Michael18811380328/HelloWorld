# immutable日常操作之深入API

#### 写在前面

本文只是个人在熟悉`Immutable.js`的一些个人笔记，因此我只根据我自己的情况来熟悉`API`，所以很多`API`并没有被列举到，比如常规的`push/map/filter/reduce`等等操作，这些`API`我认为只要你自己稍微看一下[官网](http://facebook.github.io/immutable-js/docs/#/)的介绍都可以知道怎么用。本文所有的代码请参看本人的`github`地址https://github.com/Rynxiao/immutable-learn。

#### 一、什么是Immutable collections

> [Immutable](http://en.wikipedia.org/wiki/Immutable_object) data cannot be changed once created . [Persistent](http://en.wikipedia.org/wiki/Persistent_data_structure) data presents a mutative API which does not update the data in-place, but instead always yields new updated data.
>
> Immutable.js provides many Persistent Immutable data structures including: `List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet` and `Record`.
>
> These data structures are highly efficient on modern JavaScript VMs .

Keywords：**cannot be changed**，**yields new updated data**，**efficient**

Immutable数据结构一旦被创建就不会被修改，每次API的操作都会在此数据之上另外返回一个新的数据。同时他自身的API中提供了很多我们平时在工作中可能用到的数据结构，例如：List，Stack，Map…。

#### 二、基本使用

##### 2.1 npm方式

```javascript
npm install immutable
```

调用：

```javascript
const { Map } = require('immutable');
const map = Map({ a: 1, b: 2, c: 3 });
map.get('a');       // 1123
```

##### 2.2 浏览器方式

下载[immutable.min.js](https://github.com/facebook/immutable-js/blob/master/dist/immutable.min.js)，放在自己项目库文件中，然后引用：

```Html
<script src="immutable.min.js"></script>
<script>
    var map = Immutable.Map({ a: 1, b: 2, c: 3 });
    map.get('a');       // 1
</script>12345
```

#### 三、API

##### 3.1 Collection

Immutable中的Collection是一个基类，放在后端语言Java中来说就是一个抽象类，其中定义了很多方法，提供给子类来实现。因此Collection不能直接使用其构造函数。其中它又分成了几个子类，分别是 `Collection.Keyed`,`Collection.Indexed`, or `Collection.Set`，`List`/`Map`/`Set`/`Stack`分别都是继承他们而来。

提供的基本操作 (例如：get/set/update/map/filter之类的) 这里将不会被讲到，想要了解的可以具体去官网看API。

这里讲下`equals`和`hashCode`方法，这在javascript的几种数据中都不存在，是Immutable数据中特有的两个方法，用来判断两个数据的**值**是否相等。这里强调了”值”的概念。在Immutable中，所有的数据都是以`values`（值）的方式体现的。如果一个数据结构中，`equals`与`hashCode`方法返回的值相同，那么Immutable即认为它们值相等。这也是在Immutable中的`is`方法中有体现。

> Also, an important relationship between these methods must be upheld: if two values are equal, they *must*return the same hashCode. If the values are not equal, they might have the same hashCode; this is called a hash collision,

看到下面几行：

```javascript
// src/is.js
export function is(valueA, valueB) {
  //...
  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
}

// src/Predicates.js
export function isValueObject(maybeValue) {
  return !!(maybeValue && 
            typeof maybeValue.equals === 'function' && 
            typeof maybeVaule.hashCode === 'function');
}

// src/CollectionImpl.js 315行
equals(other) {
  return deepEqual(this, other);
}

// src/utils/deepEqual.js
export default function deepEqual(a, b) {
  // 这里的算法略，如果感兴趣看是如何比较的可以自己去看
  // 这里主要看一个关键词
  // ...
  if (
    !isCollection(b) ||
    (a.size !== undefined && b.size !== undefined && a.size !== b.size) ||
    (a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash) 
    // ...
  ) {
    return false;
  }
  // 这里看到 __hash 这个属性从哪来，因此我们这回去看
}

// src/CollectionImpl.js 532行
hashCode() {
  return this.__hash || (this.__hash = hashCollection(this));
}1234567891011121314151617181920212223242526272829303132333435363738
```

所以，这里暴露了一些信息：使用`is`函数，需要比较hash值是否相等，那么用到hash值就必须调用`hashCode`函数，然后再进行具体值得比较，就会调用`equals`方法。

下面，我们来看几个`is`方法的例子：

```javascript
const Immutable = require('./lib/immutable.js');

let a = 1;
let b = '1';
let c = 1;
let d = { a: 1 };
let e = { a: 1 };
let f = NaN;
let g = NaN;
let h = function() { console.log('h'); }
let i = function() { console.log('h'); }
let j = 0;
let k = -0;
let l = Immutable.Map({ a: 1 });
let m = Immutable.Map({ a: 1 });
let n = {
  a: 1, 
  hashCode: function() {
    return Immutable.hash('immutable');
  },
  equals: function() {
    return true;
  }
};
let o = {
  a: 1, 
  hashCode: function() {
    return Immutable.hash('immutable');
  },
  equals: function() {
    return true;
  }
};

console.log(Immutable.is(a, b));  // false
console.log(Immutable.is(a, c));  // true
console.log(Immutable.is(d, e));  // false
console.log(Immutable.is(f, g));  // true
console.log(Immutable.is(h, i));  // false
console.log(Immutable.is(j, k));  // true
console.log(Immutable.is(l, m));  // true
console.log(Immutable.is(n, o));  // true

console.log(Immutable.isValueObject(n));  // true
console.log(Immutable.isImmutable(n));    // false
console.log(Immutable.isCollection(n));   // false12345678910111213141516171819202122232425262728293031323334353637383940414243444546
```

总结：

1.对于`javascript`中原始值的比较类似于 `Object.is`

需要注意的是：`NaN`在`Immutable.js`中认为是与自身相等的；+0和-0在`Immutable.js`中认为相等

2.对于`Immutable`中的集合类型，统一作为值比较。即当两个集合的值相等的时候即为相等

3.对于原始值对象，如果提供了`hashCode`以及`equals`方法，并且返回值相等，也会认为他们是相等的

##### 3.2 Hash

主要作用是自己要写一个`Immutable`值对象的时候可能会用到，需要在`hashCode`方法中返回一个哈希值。

```javascript
/**
 * hash(val)
 * hash接受一个参数，这个值是任意的，返回一个31位的整数
 * 作用：当使用is()函数比较时，通过返回相同的hash值来判断两个值是否相等
 * 技巧：equals函数返回true, hashCode函数返回相同的hash值来设计两个值是否相等
 */

const Immutable = require('./lib/immutable.js');

let seed1 = 'seed';
let seed2 = { a: 1, b: 2 };
let seed3 = [1, 2, 3, 4];
let seed4 = [1, 2, 3];
let seed5 = Immutable.List([435, 235, 1]);

console.log(Immutable.hash(seed1));     // 3526257
console.log(Immutable.hash(seed1));     // 3526257
console.log(Immutable.hash(seed2));     // 1
console.log(Immutable.hash(seed3));     // 2
console.log(Immutable.hash(seed4));     // 3
console.log(Immutable.hash(seed5));     // -53036292123456789101112131415161718192021
```

##### 3.3 List

`List`继承自`Collection.Indexed`，同时实现了`Deque`，能够高效地从首部或者尾部添加或者删除数据。基本操作与javascript Array类似。更多操作请参看[List API](http://facebook.github.io/immutable-js/docs/#/List)

```javascript
// javascript 数组
const plainArray = [1, 2, 3, 4];
const listFormPlainArray = Immutable.List(plainArray);

// iterator
const listFromIterator = Immutable.List(plainArray[Symbol.iterator]());

console.log(listFormPlainArray.toJS());     // [1, 2, 3, 4]
console.log(listFromIterator.toJS());       // [1, 2, 3, 4]123456789
```

当`index`值为负数时，表示从尾部进行操作。

```javascript
const oList = Immutable.List([0, 1, 2]);
const addFormLast = oList.set(-1, -1);
console.log(addFormLast.toJS());            // [0, 1, -1]

const deleteList1 = oList.delete(0);
console.log(deleteList1.toJS());            // [1, 2]

const deleteList2 = oList.delete(-1);
console.log(deleteList2.toJS());            // [0, 1]123456789
```

List没有明显的’unset’(未被设置值)或者’undefined’(值设置为undefined)数据的概念。在List#forEach中可以体现。

```javascript
// unset & undefined
const originList = [1, 2, , 4];
const collectionList = Immutable.List(originList);

collectionList.forEach(function(v, i) {
    console.log(`${i} ${v}`);
    // 0 1
    // 1 2
    // 2 undefined
    // 3 4
});

originList.forEach(function(v, i) {
    console.log(`${i} ${v}`);
    // 0 1
    // 1 2
    // 3 4
});123456789101112131415161718
```

##### 3.4 Map

`Map` 继承自 `Collection.keyed`。`Map`是无序的，如果需要有序`Map` 请使用`OrderedMap`。更多操作请参看官网API [Map API](http://facebook.github.io/immutable-js/docs/#/Map)

`Map`的`key`是任意的，甚至可以是`NaN`，注意`key`值的类型都是`string`，可以看以下例子。

```javascript
const anyKeyMap = Immutable.Map();
console.log(anyKeyMap.set(key1, 'hello1').get(key1));   // hello1
console.log(anyKeyMap.set(key2, 'hello2').get(key2));   // hello2
console.log(anyKeyMap.set(key3, 'hello3').get(key3));   // hello3
console.log(anyKeyMap.set(key4, 'hello4').get(key4));   // hello4
console.log(anyKeyMap.set(key5, 'hello5').get(key5));   // hello5

// don't initial with a obj like this
// { NaN: 'hello' }
// Map<V>(obj: {[key: string]: V}): Map<string, V>
let key = NaN;
const initMap = Immutable.Map({ key: 'hello' });
console.log(initMap.get(key));      // undefined12345678910111213
```

如果需要在初始化`Map`的时候传入初始值，那么`key`值必须为`string`类型，否则取到的值是`undefined`。看下面一个证明`key`值都是`string`的例子。

```javascript
let obj = { 1: 'hello' };
console.log(Object.keys(obj));  // ['1']
console.log(obj['1']);          // hello
console.log(obj[1]);            // hello

const mapObj = Immutable.Map(obj);
console.log(mapObj.get("1"));   // hello
console.log(mapObj.get(1));     // undefined12345678
```

下面主要讲三个方法：

```javascript
// update
// update([key, newVal,] callback)
// 1.传入key值与回调改变值
// 2.传入回调函数可以返回当前值
// 3.传入key值与新设置的值以及回调函数，注意，如果新值与原来的值不相等，会返回当前值
const originMap = Immutable.Map({ 'key': 'value' });
const newMap1 = originMap.update('key', function(value) {
    return value + value;
});
const newMap2 = originMap.update(function(value) {
    return value;
});
const newMap3 = originMap.update('key1', 'one', function(value) {
    return value + value;
});
const newMap4 = originMap.update('key1', 'one', function(value) {
    return value;
});
console.log(newMap1.toJS());        // { key: 'valuevalue' }
console.log(newMap2.toJS());        // { key: 'value' }
console.log(newMap3.toJS());        // { key: 'value', key1: 'oneone' }
console.log(newMap4.toJS());        // { key: 'value' }

// merge
// 后面的值覆盖前面的值
const one = Immutable.Map({ a: 10, b: 20, c: 30 });
const two = Immutable.Map({ a: 40, b: 60, c: 90, d: 100 });
const mergeMap1 = one.merge(two);
const mergeMap2 = two.merge(one);
console.log(mergeMap1.toJS());      // { a: 40, b: 60, c: 90, d: 100 }
console.log(mergeMap2.toJS());      // { a: 10, b: 20, c: 30, d: 100 } 

// mergeWith
const mergeWithMap = one.mergeWith(function(oldVal, newVal) {
    return oldVal / newVal;
}, two);
console.log(mergeWithMap.toJS());   // { a: 0.25, b: 0.3333333333333333, c: 0.3333333333333333, d: 100 }12345678910111213141516171819202122232425262728293031323334353637
```

##### 3.5 Set

`Set`继承自`Collection.Set`，`Set`主要的一个特性就是值唯一。因此我们可以利用此特性去除重复值。看下面的例子：

```javascript
const set = Immutable.Set([1, 2, 1, 4]);
console.log(set.toJS());        // [1, 2, 4]

// 去除list中的相同值
const list = Immutable.List([1, 2, 3, 4, 5, 3, 2, 9, 0]);
const setList = Immutable.Set(list);
console.log(list);          // List [ 1, 2, 3, 4, 5, 3, 2, 9, 0 ]
console.log(setList);       // Set { 1, 2, 3, 4, 5, 9, 0 }12345678
```

既然继承自`Collection`，那么就会存在`Collection`中的一些方法。具体操作方法参看官网[Set API](http://facebook.github.io/immutable-js/docs/#/Set)

```javascript
// fromKeys 
const originObj = { a: 1, b: 2, c: 3, d: 4, a: 5 };
const mapIterator = Immutable.Map(originObj)[Symbol.iterator]();
const iterator2 = [ ['key', 'value'], ['key1', 'value2'], ['key', 'value3'] ];
console.log(Immutable.Set.fromKeys(mapIterator));   // Set { "a", "b", "c", "d" }
console.log(Immutable.Set.fromKeys(iterator2));     // Set { "key", "key1" }
console.log(Immutable.Set.fromKeys(originObj));     // Set { "a", "b", "c", "d" }

// 交集
// intersect
const set1 = Immutable.Set(['a', 'b', 'c']);
const set2 = Immutable.Set(['a', 'c', 'd']);    
const intersected = Immutable.Set.intersect([set1, set2]);
console.log(intersected);   // Set { "a", "c" }

// 并集
// union
const unioned = Immutable.Set.union([set1, set2]);
console.log(unioned);       // Set { "a", "c", "d", "b" }

// add
const addSet = Immutable.Set([1, 2, 3, 4]);
const newSet = addSet.add(5);
console.log(newSet.toJS());     // [ 1, 2, 3, 4, 5 ]123456789101112131415161718192021222324
```

##### 3.6 Stack

`Stack` 继承自 `Collection.Indexed`。在添加和删除数据上有非常高的效率。操作总是从栈顶开始，提供的push/pop/peek方法只是因为我们熟悉了这些`API`。不建议使用`reverse()` 效率不高。具体操作方法参看官网[Stack API](http://facebook.github.io/immutable-js/docs/#/Stack)

```javascript
const Immutable = require('./lib/immutable.js');

// peek
// similar to first
const stack = Immutable.Stack([1, 2, 3, 4]);
console.log(stack.peek());          // 1
console.log(stack.first());         // 1

// has
console.log(stack.has(2));          // true

// includes
// similar to contains
console.log(stack.includes(3));     // true

// last
console.log(stack.last());1234567891011121314151617
```

##### 3.7 Seq

`Seq` 继承自 `Collection`，`Seq`是不可变的，一旦被创建就不可修改，由一些函数引起的变化将会返回一个新的`Seq`。`Seq`的一个重要特性就是**懒计算**。只有当被调用时才会开始计算。具体看以下例子：

```javascript
const Immutable = require('./lib/immutable.js');

// 在未调用时并不会执行
// 不信可以将Seq换成List试试，会全部执行
const oddSquares = Immutable.Seq([1, 2, 3, 4, 5, 6, 7, 8]).filter(function(x) {
    console.log('filter', x);
    return x % 2 !== 0;
}).map(function(x) {
    console.log('map', x);
    return x * x;
});

// filter 1
// map 1
// 1

console.log(oddSquares.get(0));     // 调用发现，filter中只执行一次，map中也执行了一次1234567891011121314151617
```

##### 3.8 其他

###### 3.8.1 fromJS

```
fromJS(val[, callback(key, value, path)])
fromJS`有两个参数，其中回调函数可选，作用是将原始值类型转换为`Immutable`的集合。如果不提供回调，默认的转换行为是：`Array -> Lists, Object -> Maps
const Immutable = require('./lib/immutable.js');

let obj = { a: { b: [10, 20, 30] }, c: 40 };

let iObj = Immutable.fromJS(obj, function(key, value, path) {
    let isIdxed = Immutable.isIndexed(value);
    console.log(key, value, path, isIdxed);
    return isIdxed ? value.toList() : value.toOrderedMap();
});

/**
 * b Seq [ 10, 20, 30 ] [ 'a', 'b' ] true
 * a Seq { "b": List [ 10, 20, 30 ] } [ 'a' ] false
 * b Seq [ 10, 20, 30 ] [ 'a', 'b' ] true
 *   Seq { "a": OrderedMap { "b": List [ 10, 20, 30 ] }, "c": 40 } [] false
 * b Seq [ 10, 20, 30 ] [ 'a', 'b' ] true
 * a Seq { "b": List [ 10, 20, 30 ] } [ 'a' ] false
 * b Seq [ 10, 20, 30 ] [ 'a', 'b' ] true
 */

console.log(Immutable.isCollection(iObj));  // true
console.log(Immutable.isCollection(obj));   // false12345678910111213141516171819202122
```

###### 3.8.2 Range 区间选择器

```
Range([start, end, step])
```

返回一个区间的`List`，若`step`有值，则在此区间上按照`step`来划分值，默认值：`start=1, end=infinity, step=1，if start === end returns []`

```javascript
const Immutable = require('./lib/immutable.js');

console.log(Immutable.Range());             // Range [ 0...Infinity ]
console.log(Immutable.Range(10));           // Range [ 10...Infinity ]
console.log(Immutable.Range(10, 30, 5));    // Range [ 10...30 by 5 ]
console.log(Immutable.Range(10, 10));       // Range []

console.log(Immutable.isImmutable(Immutable.Range()));  // true12345678
```

###### 3.8.3 Record 记录时光机

```
Record(defaultVal[, description])
```

- `Record`必须要有默认值，如果不传直接报错，如果传值为空对象，后续任何操作将会无效
- `isRecord`方法用来判断当前对象是否是`Record`的一个实例
- 多次`remove`掉的记录会变为初始值，之后删除多次将会变得无效
- `Record`可以添加描述
- `Record`可以被继承，可以添加自己的方法赋予更多功能

```javascript
const Immutable = require('./lib/immutable.js');

const DefaultRecord = Immutable.Record({ a: 1, b: 2 }); 
const RewriteRecord = new DefaultRecord({ b: 3 });

console.log(Immutable.Record.isRecord(DefaultRecord));      // false
console.log(Immutable.Record.isRecord(RewriteRecord));      // true

const ReRewriteRecord = new DefaultRecord({ b: 4 });

console.log(ReRewriteRecord.get('a'));                  // 1
console.log(ReRewriteRecord.get('b'));                  // 4

const removeRecord = ReRewriteRecord.remove('b');

console.log(removeRecord.get('b'));                     // 2

const reRemoveRecord = removeRecord.remove('b');

console.log(reRemoveRecord.get('b'));                   // 2

// getDescriptiveName()

const Person = Immutable.Record({ name: null }, 'Person');
const me = Person({ name: 'Ryn' });
console.log(me.toString());                             // Person { name: "Ryn" }
console.log(Immutable.Record.getDescriptiveName(me));   // Person

// no-default

const NoDefaultRecord = Immutable.Record({});
const writeRecord = new NoDefaultRecord({ a: 1 });
console.log(writeRecord.get('a'));                      // undefined

// extends

class ClassRecord extends Immutable.Record({ a: 1, b: 2 }) {
    getSum() {
        return this.a + this.b;
    }
}

const myClassRecord = new ClassRecord({ b: 3 });
console.log(myClassRecord.getSum());1234567891011121314151617181920212223242526272829303132333435363738394041424344
```

###### 3.8.4 Repeat

```
Repeat(val[, times])
const Immutable = require('./lib/immutable.js');

console.log(Immutable.Repeat('hello'));         // Repeat [ hello Infinity times ]
console.log(Immutable.Repeat('hello', 4));      // Repeat [ hello 4 times ] 1234
```

#### 四、总结

`Javascript`中对象都是参考类型，也就是`a = { a: 1 }; b = a; b.a = 10;`你发现`a.a`也变成10了。可变的好处是节省内存或是利用可变性做一些事情，但是，在复杂的开发中它的副作用远比好处大的多。于是才有了浅`copy`和深`copy`，就是为了解决这个问题。`Immutable.js`的应用主要是在其不变性上，这对于层次比较深的值比较、拷贝上面将会变得十分有用处。

