# Lodash


## `“Array” 方法`

### `_.chunk(array, [size=1])`



将数组（array）拆分成多个 `size` 长度的区块，并将这些区块组成一个新数组。 如果`array` 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 需要处理的数组
2. `[size=1]` *(number)*: 每个数组区块的长度

#### 返回

*(Array)*: 返回一个包含拆分区块的新数组（相当于一个二维数组）。

#### 例子

```
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

Try in REPL

### `_.compact(array)`



创建一个新数组，包含原数组中所有的非假值元素。例如`false`, `null`, `0`, `""`, `undefined`, 和 `NaN` 都是被认为是“假值”。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 待处理的数组

#### 返回值

*(Array)*: 返回过滤掉假值的新数组。

#### 例子

```
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

Try in REPL

### `_.concat(array, [values])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6742) [Ⓝ](https://www.npmjs.com/package/lodash.concat)

创建一个新数组，将`array`与任何数组 或 值连接在一起。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 被连接的数组。
2. `[values]` *(...\*)*: 连接的值。

#### 返回值

*(Array)*: 返回连接后的新数组。

#### 例子

```
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```

Try in REPL

### `_.difference(array, [values])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6778) [Ⓝ](https://www.npmjs.com/package/lodash.difference)

创建一个具有唯一`array`值的数组，每个值不包含在其他给定的数组中。（即创建一个新数组，这个数组中的值，为第一个数字（`array` 参数）排除了给定数组中的值。）该方法使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做相等比较。结果值的顺序是由第一个数组中的顺序确定。

**注意:** 不像 [`_.pullAll`](https://www.lodashjs.com/docs/latest#pullAll)，这个方法会返回一个新数组。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[values]` *(...Array)*: 排除的值。

#### 返回值

*(Array)*: 返回一个过滤值后的新数组。

#### 例子

```
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```

Try in REPL

### `_.differenceBy(array, [values], [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6810) [Ⓝ](https://www.npmjs.com/package/lodash.differenceby)

这个方法类似 [`_.difference`](https://www.lodashjs.com/docs/latest#difference) ，除了它接受一个 `iteratee` （迭代器）， 调用`array` 和 `values` 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee 会调用一个参数：*(value)*。（首先使用迭代器分别迭代`array` 和 `values`中的每个元素，返回的值作为比较值）。

**Note:** 不像 [`_.pullAllBy`](https://www.lodashjs.com/docs/latest#pullAllBy)，这个方法会返回一个新数组。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[values]` *(...Array)*: 排除的值。
3. `[iteratee=_.identity]` *(Array|Function|Object|string)*: iteratee 调用每个元素。

#### 返回值

*(Array)*: 返回一个过滤值后的新数组。

#### 例子

```
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
 
// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```

Try in REPL

### `_.differenceWith(array, [values], [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6843) [Ⓝ](https://www.npmjs.com/package/lodash.differencewith)

这个方法类似 [`_.difference`](https://www.lodashjs.com/docs/latest#difference) ，除了它接受一个 `comparator` （比较器），它调用比较`array`，`values`中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：*(arrVal, othVal)*。

**Note:** 不像 [`_.pullAllWith`](https://www.lodashjs.com/docs/latest#pullAllWith), 这个方法会返回一个新数组。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[values]` *(...Array)*: 排除的值。
3. `[comparator]` *(Function)*: comparator 调用每个元素。

#### 返回值

*(Array)*: 返回一个过滤值后的新数组。

#### 例子

```
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```

Try in REPL

### `_.drop(array, [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6878) [Ⓝ](https://www.npmjs.com/package/lodash.drop)

创建一个切片数组，去除`array`前面的`n`个元素。（`n`默认值为1。）

#### 引入版本

0.5.0

#### 参数

1. `array` *(Array)*: 要查询的数组。
2. `[n=1]` *(number)*: 要去除的元素个数。

#### 返回值

*(Array)*: 返回`array`剩余切片。

#### 例子

```
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

Try in REPL

### `_.dropRight(array, [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6912) [Ⓝ](https://www.npmjs.com/package/lodash.dropright)

创建一个切片数组，去除`array`尾部的`n`个元素。（`n`默认值为1。）

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 要查询的数组。
2. `[n=1]` *(number)*: 要去除的元素个数。

#### 返回值

*(Array)*: 返回`array`剩余切片。

#### 例子

```
_.dropRight([1, 2, 3]);
// => [1, 2]
 
_.dropRight([1, 2, 3], 2);
// => [1]
 
_.dropRight([1, 2, 3], 5);
// => []
 
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```

Try in REPL

### `_.dropRightWhile(array, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6957) [Ⓝ](https://www.npmjs.com/package/lodash.droprightwhile)

创建一个切片数组，去除`array`中从 `predicate` 返回假值开始到尾部的部分。predicate 会传入3个参数： *(value, index, array)*。

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 要查询的数组。
2. `[predicate=_.identity]` *(Function)*: 这个函数会在每一次迭代调用。

#### 返回值

*(Array)*: 返回`array`剩余切片。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']
 
// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']
 
// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```

Try in REPL

### `_.dropWhile(array, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L6999) [Ⓝ](https://www.npmjs.com/package/lodash.dropwhile)

创建一个切片数组，去除`array`中从起点开始到 `predicate` 返回假值结束部分。predicate 会传入3个参数： *(value, index, array)*。

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 要查询的数组。
2. `[predicate=_.identity]` *(Function)*: 这个函数会在每一次迭代调用。

#### 返回值

*(Array)*: 返回`array`剩余切片。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']
 
// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']
 
// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```

Try in REPL

### `_.fill(array, value, [start=0], [end=array.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7034) [Ⓝ](https://www.npmjs.com/package/lodash.fill)

使用 `value` 值来填充（替换） `array`，从`start`位置开始, 到`end`位置结束（但不包含`end`位置）。

**Note:** 这个方法会改变 `array`（不是创建新数组）。

#### 引入版本

3.2.0

#### 参数

1. `array` *(Array)*: 要填充改变的数组。
2. `value` *(\*)*: 填充给 `array` 的值。
3. `[start=0]` *(number)*: 开始位置（默认0）。
4. `[end=array.length]` *(number)*:结束位置（默认array.length）。

#### 返回值

*(Array)*: 返回 `array`。

#### 例子

```
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
 
_.fill(Array(3), 2);
// => [2, 2, 2]
 
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```

Try in REPL

### `_.findIndex(array, [predicate=_.identity], [fromIndex=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7082) [Ⓝ](https://www.npmjs.com/package/lodash.findindex)

该方法类似 [`_.find`](https://www.lodashjs.com/docs/latest#find)，区别是该方法返回第一个通过 `predicate` 判断为真值的元素的索引值（index），而不是元素本身。

#### 引入版本

1.1.0

#### 参数

1. `array` *(Array)*: 要搜索的数组。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 这个函数会在每一次迭代调用。
3. `[fromIndex=0]` *(number)*: The index to search from.

#### 返回值

*(number)*: 返回找到元素的 索引值（index），否则返回 `-1`。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

Try in REPL

### `_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7130) [Ⓝ](https://www.npmjs.com/package/lodash.findlastindex)

这个方式类似 [`_.findIndex`](https://www.lodashjs.com/docs/latest#findIndex)， 区别是它是从右到左的迭代集合`array`中的元素。

#### 引入版本

2.0.0

#### 参数

1. `array` *(Array)*: 要搜索的数组。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 这个函数会在每一次迭代调用。
3. `[fromIndex=array.length-1]` *(number)*: The index to search from.

#### 返回值

*(number)*: 返回找到元素的 索引值（index），否则返回 `-1`。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
 
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2
 
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```

Try in REPL

### `_.flatten(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7159) [Ⓝ](https://www.npmjs.com/package/lodash.flatten)

减少一级`array`嵌套深度。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 需要减少嵌套层级的数组。

#### 返回值

*(Array)*: 返回减少嵌套层级后的新数组。

#### 例子

```
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

Try in REPL

### `_.flattenDeep(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7178) [Ⓝ](https://www.npmjs.com/package/lodash.flattendeep)

将`array`递归为一维数组。

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 需要处理的数组。

#### 返回值

*(Array)*: 返回一个的新一维数组。

#### 例子

```
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```

Try in REPL

### `_.flattenDepth(array, [depth=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7203) [Ⓝ](https://www.npmjs.com/package/lodash.flattendepth)

根据 `depth` 递归减少 `array` 的嵌套层级

#### 引入版本

4.4.0

#### 参数

1. `array` *(Array)*: 需要减少嵌套层级的数组。
2. `[depth=1]` *(number)*:最多减少的嵌套层级数。

#### 返回值

*(Array)*: 返回减少嵌套层级后的新数组。

#### 例子

```
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

Try in REPL

### `_.fromPairs(pairs)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7227) [Ⓝ](https://www.npmjs.com/package/lodash.frompairs)

与 [`_.toPairs`](https://www.lodashjs.com/docs/latest#toPairs)正好相反；这个方法返回一个由键值对`pairs`构成的对象。

#### 引入版本

4.0.0

#### 参数

1. `pairs` *(Array)*: 键值对`pairs`。

#### 返回值

*(Object)*: 返回一个新对象。

#### 例子

```
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
```

Try in REPL

### `_.head(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7257) [Ⓝ](https://www.npmjs.com/package/lodash.head)

获取数组 `array` 的第一个元素。

#### 引入版本

0.1.0

#### 别名

*_.first*

#### 参数

1. `array` *(Array)*: 要查询的数组。

#### 返回值

*(\*)*: 返回数组 `array`的第一个元素。

#### 例子

```
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined
```

Try in REPL

### `_.indexOf(array, value, [fromIndex=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7284) [Ⓝ](https://www.npmjs.com/package/lodash.indexof)

使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较，返回首次 `value` 在数组`array`中被找到的 索引值， 如果 `fromIndex` 为负值，将从数组`array`尾端索引进行匹配。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 需要查找的数组。
2. `value` *(\*)*: 需要查找的值。
3. `[fromIndex=0]` *(number)*: 开始查询的位置。

#### 返回值

*(number)*: 返回 值`value`在数组中的索引位置, 没有找到为返回`-1`。

#### 例子

```
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```

Try in REPL

### `_.initial(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7310) [Ⓝ](https://www.npmjs.com/package/lodash.initial)

获取数组`array`中除了最后一个元素之外的所有元素（去除数组`array`中的最后一个元素）。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 要查询的数组。

#### 返回值

*(Array)*: 返回截取后的数组`array`。

#### 例子

```
_.initial([1, 2, 3]);
// => [1, 2]
```

Try in REPL

### `_.intersection([arrays])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7332) [Ⓝ](https://www.npmjs.com/package/lodash.intersection)

创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)进行相等性比较。（可以理解为给定数组的交集）

#### 引入版本

0.1.0

#### 参数

1. `[arrays]` *(...Array)*: 待检查的数组。

#### 返回值

*(Array)*: 返回一个包含所有传入数组交集元素的新数组。

#### 例子

```
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```

Try in REPL

### `_.intersectionBy([arrays], [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7362) [Ⓝ](https://www.npmjs.com/package/lodash.intersectionby)

这个方法类似 [`_.intersection`](https://www.lodashjs.com/docs/latest#intersection)，区别是它接受一个 `iteratee` 调用每一个`arrays`的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：*(value)*。

#### 引入版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 待检查的数组。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: iteratee（迭代器）调用每个元素。

#### 返回值

*(Array)*: 返回一个包含所有传入数组交集元素的新数组。

#### 例子

```
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```

Try in REPL

### `_.intersectionWith([arrays], [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7397) [Ⓝ](https://www.npmjs.com/package/lodash.intersectionwith)

这个方法类似 [`_.intersection`](https://www.lodashjs.com/docs/latest#intersection)，区别是它接受一个 `comparator` 调用比较`arrays`中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：*(arrVal, othVal)*。

#### 引入版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 待检查的数组。
2. `[comparator]` *(Function)*: comparator（比较器）调用每个元素。

#### 返回值

*(Array)*: 返回一个包含所有传入数组交集元素的新数组。

#### 例子

```
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```

Try in REPL

### `_.join(array, [separator=','])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7426) [Ⓝ](https://www.npmjs.com/package/lodash.join)

将 `array` 中的所有元素转换为由 `separator` 分隔的字符串。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 要转换的数组。
2. `[separator=',']` *(string)*: 分隔元素。

#### 返回值

*(string)*: 返回连接字符串。

#### 例子

```
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```

Try in REPL

### `_.last(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7444) [Ⓝ](https://www.npmjs.com/package/lodash.last)

获取`array`中的最后一个元素。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检索的数组。

2. #### 返回值

*(\*)*: 返回`array`中的最后一个元素

#### 例子

```
_.last([1, 2, 3]);
// => 3
```

Try in REPL

### `_.lastIndexOf(array, value, [fromIndex=array.length-1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7470) [Ⓝ](https://www.npmjs.com/package/lodash.lastindexof)

这个方法类似 [`_.indexOf`](https://www.lodashjs.com/docs/latest#indexOf) ，区别是它是从右到左遍历`array`的元素。

#### 引入版本

0.1.0

#### 参数

1. `array` *(Array)*: 要搜索的数组。
2. `value` *(\*)*: 要搜索的值。
3. `[fromIndex=array.length-1]` *(number)*: 开始搜索的索引值。

#### 返回值

*(number)*: 返回匹配值的索引值，否则返回 `-1`。

#### 例子

```
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
 
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```

Try in REPL

### `_.nth(array, [n=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7506) [Ⓝ](https://www.npmjs.com/package/lodash.nth)

获取`array`数组的第n个元素。如果`n`为负数，则返回从数组结尾开始的第n个元素。

#### 引入版本

4.11.0

#### 参数

1. `array` *(Array)*: 要查询的数组。
2. `[n=0]` *(number)*: 要返回元素的索引值。

#### 返回值

*(\*)*: 获取`array`数组的第n个元素。

#### 例子

```
var array = ['a', 'b', 'c', 'd'];
 
_.nth(array, 1);
// => 'b'
 
_.nth(array, -2);
// => 'c';
```

Try in REPL

### `_.pull(array, [values])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7533) [Ⓝ](https://www.npmjs.com/package/lodash.pull)

移除数组`array`中所有和给定值相等的元素，使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 进行全等比较。

**注意：** 和 [`_.without`](https://www.lodashjs.com/docs/latest#without) 方法不同，这个方法会改变数组。使用 [`_.remove`](https://www.lodashjs.com/docs/latest#remove) 从一个数组中移除元素。

#### 引入版本

2.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `[values]` *(...\*)*: 要删除的值。

#### 返回值

*(Array)*: 返回 `array`.

#### 例子

```
var array = [1, 2, 3, 1, 2, 3];
 
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```

Try in REPL

### `_.pullAll(array, values)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7555) [Ⓝ](https://www.npmjs.com/package/lodash.pullall)

这个方法类似 [`_.pull`](https://www.lodashjs.com/docs/latest#pull)，区别是这个方法接收一个要移除值的数组。

**Note:** 不同于 [`_.difference`](https://www.lodashjs.com/docs/latest#difference), 这个方法会改变数组 `array`。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `values` *(Array)*: 要移除值的数组。

#### 返回值

*(Array)*: 返回 `array`。

#### 例子

```
var array = [1, 2, 3, 1, 2, 3];
 
_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```

Try in REPL

### `_.pullAllBy(array, values, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7585) [Ⓝ](https://www.npmjs.com/package/lodash.pullallby)

这个方法类似于 [`_.pullAll`](https://www.lodashjs.com/docs/latest#pullAll) ，区别是这个方法接受一个 `iteratee`（迭代函数） 调用 `array` 和 `values`的每个值以产生一个值，通过产生的值进行了比较。iteratee 会传入一个参数： *(value)*。

**Note:** 不同于 [`_.differenceBy`](https://www.lodashjs.com/docs/latest#differenceBy), 这个方法会改变数组 `array`。

#### 引入版本

4.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `values` *(Array)*: 要移除值的数组。
3. `[iteratee=_.identity]` *(Array|Function|Object|string)*: iteratee（迭代器）调用每个元素。

#### 返回值

*(Array)*: 返回 `array`.

#### 例子

```
var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]
```

Try in REPL

### `_.pullAllWith(array, values, [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7614) [Ⓝ](https://www.npmjs.com/package/lodash.pullallwith)

这个方法类似于 [`_.pullAll`](https://www.lodashjs.com/docs/latest#pullAll)，区别是这个方法接受 `comparator` 调用`array`中的元素和`values`比较。comparator 会传入两个参数：*(arrVal, othVal)*。

**注意:** 和 [`_.differenceWith`](https://www.lodashjs.com/docs/latest#differenceWith) 不同, 这个方法会改变数组 `array`。

#### 引入版本

4.6.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `values` *(Array)*: 要移除值的数组。
3. `[comparator]` *(Function)*: comparator（比较器）调用每个元素。

#### 返回值

*(Array)*: 返回 `array`。

#### 例子

```
var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

Try in REPL

### `_.pullAt(array, [indexes])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7644) [Ⓝ](https://www.npmjs.com/package/lodash.pullat)

根据索引 `indexes`，移除`array`中对应的元素，并返回被移除元素的数组。

**Note:** 和 [`_.at`](https://www.lodashjs.com/docs/latest#at)不同, 这个方法会改变数组 `array`。

#### 引入版本

3.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `[indexes]` *(...(number|number[]))*: 要移除元素的索引。

#### 返回值

*(Array)*: 返回移除元素组成的新数组。

#### 例子

```
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
 
console.log(array);
// => [5, 15]
 
console.log(evens);
// => [10, 20]
```

Try in REPL

### `_.remove(array, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7684) [Ⓝ](https://www.npmjs.com/package/lodash.remove)

移除数组中`predicate`（断言）返回为真值的所有元素，并返回移除元素组成的数组。`predicate`（断言） 会传入3个参数： *(value, index, array)*。

**Note:** 和 [`_.filter`](https://www.lodashjs.com/docs/latest#filter)不同, 这个方法会改变数组 `array`。使用 [`_.pull`](https://www.lodashjs.com/docs/latest#pull)来根据提供的`value`值从数组中移除元素。

#### 添加版本

2.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回移除元素组成的新数组。

#### 例子

```
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});
 
console.log(array);
// => [1, 3]
 
console.log(evens);
// => [2, 4]
```

Try in REPL

### `_.reverse(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7728) [Ⓝ](https://www.npmjs.com/package/lodash.reverse)

反转`array`，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。

**Note:** 这个方法会改变原数组 `array`，基于 [`Array#reverse`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要修改的数组。

#### 返回

*(Array)*: 返回 `array`.

#### 例子

```
var array = [1, 2, 3];
 
_.reverse(array);
// => [3, 2, 1]
 
console.log(array);
// => [3, 2, 1]
```

Try in REPL

### `_.slice(array, [start=0], [end=array.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7748) [Ⓝ](https://www.npmjs.com/package/lodash.slice)

裁剪数组`array`，从 `start` 位置开始到`end`结束，但不包括 `end` 本身的位置。

**Note:** 这个方法用于代替 [`Array#slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 来确保数组正确返回。

#### 添加版本

3.0.0

#### 参数

1. `array` *(Array)*: 要裁剪数组。
2. `[start=0]` *(number)*: 开始位置。
3. `[end=array.length]` *(number)*: 结束位置。

#### 返回

*(Array)*: 返回 数组`array` 裁剪部分的新数组。

### `_.sortedIndex(array, value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7781) [Ⓝ](https://www.npmjs.com/package/lodash.sortedindex)

使用二进制的方式检索来决定 `value`值 应该插入到数组中 尽可能小的索引位置，以保证`array`的排序。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检查的排序数组。
2. `value` *(\*)*: 要评估的值。

#### 返回

*(number)*: 返回 `value`值 应该在数组`array`中插入的索引位置 index。

#### 例子

```
_.sortedIndex([30, 50], 40);
// => 1
```

Try in REPL

### `_.sortedIndexBy(array, value, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7811) [Ⓝ](https://www.npmjs.com/package/lodash.sortedindexby)

这个方法类似 [`_.sortedIndex`](https://www.lodashjs.com/docs/latest#sortedIndex) ，除了它接受一个 `iteratee` （迭代函数），调用每一个数组（`array`）元素，返回结果和`value` 值比较来计算排序。iteratee 会传入一个参数：*(value)*。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的排序数组。
2. `value` *(\*)*: 要评估的值。
3. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 迭代函数，调用每个元素。

#### 返回

*(number)*: 返回 `value`值 应该在数组`array`中插入的索引位置 index。

#### 例子

```
var objects = [{ 'x': 4 }, { 'x': 5 }];
 
_.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 0
 
// The `_.property` iteratee shorthand.
_.sortedIndexBy(objects, { 'x': 4 }, 'x');
// => 0
```

Try in REPL

### `_.sortedIndexOf(array, value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7831) [Ⓝ](https://www.npmjs.com/package/lodash.sortedindexof)

这个方法类似 [`_.indexOf`](https://www.lodashjs.com/docs/latest#indexOf)，除了它是在已经排序的数组`array`上执行二进制检索。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要搜索的数组。
2. `value` *(\*)*: 搜索的值。

#### 返回

*(number)*: 返回匹配值的索引位置，否则返回 `-1`。

#### 例子

```
_.sortedIndexOf([4, 5, 5, 5, 6], 5);
// => 1
```

Try in REPL

### `_.sortedLastIndex(array, value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7860) [Ⓝ](https://www.npmjs.com/package/lodash.sortedlastindex)

此方法类似于 [`_.sortedIndex`](https://www.lodashjs.com/docs/latest#sortedIndex)，除了 它返回 `value`值 在 `array` 中尽可能大的索引位置（index）。

#### 添加版本

3.0.0

#### 参数

1. `array` *(Array)*: 要检查的排序数组。
2. `value` *(\*)*: 要评估的值。

#### 返回

*(number)*: 返回 `value`值 应该在数组`array`中插入的索引位置 index。

#### 例子

```
_.sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```

Try in REPL

### `_.sortedLastIndexBy(array, value, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7890) [Ⓝ](https://www.npmjs.com/package/lodash.sortedlastindexby)

这个方法类似 [`_.sortedLastIndex`](https://www.lodashjs.com/docs/latest#sortedLastIndex) ，除了它接受一个 `iteratee` （迭代函数），调用每一个数组（`array`）元素，返回结果和`value` 值比较来计算排序。iteratee 会传入一个参数：*(value)*。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的排序数组。
2. `value` *(\*)*: 要评估的值。
3. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 迭代函数，调用每个元素。

#### 返回

*(number)*: 返回 `value`值 应该在数组`array`中插入的索引位置 index。

#### 例子

```
var objects = [{ 'x': 4 }, { 'x': 5 }];
 
_.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 1
 
// The `_.property` iteratee shorthand.
_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
// => 1
```

Try in REPL

### `_.sortedLastIndexOf(array, value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7910) [Ⓝ](https://www.npmjs.com/package/lodash.sortedlastindexof)

这个方法类似 [`_.lastIndexOf`](https://www.lodashjs.com/docs/latest#lastIndexOf)，除了它是在已经排序的数组`array`上执行二进制检索。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要搜索的数组。
2. `value` *(\*)*: 搜索的值。

#### 返回

*(number)*: 返回匹配值的索引位置，否则返回 `-1`。

#### 例子

```
_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3
```

Try in REPL

### `_.sortedUniq(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7936) [Ⓝ](https://www.npmjs.com/package/lodash.sorteduniq)

这个方法类似 [`_.uniq`](https://www.lodashjs.com/docs/latest#uniq)，除了它会优化排序数组。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。

#### 返回

*(Array)*: 返回一个新的不重复的数组。

#### 例子

```
_.sortedUniq([1, 1, 2]);
// => [1, 2]
```

Try in REPL

### `_.sortedUniqBy(array, [iteratee])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7958) [Ⓝ](https://www.npmjs.com/package/lodash.sorteduniqby)

这个方法类似 [`_.uniqBy`](https://www.lodashjs.com/docs/latest#uniqBy)，除了它会优化排序数组。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[iteratee]` *(Function)*: 迭代函数，调用每个元素。

#### 返回

*(Array)*: 返回一个新的不重复的数组。

#### 例子

```
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]
```

Try in REPL

### `_.tail(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L7978) [Ⓝ](https://www.npmjs.com/package/lodash.tail)

获取除了`array`数组第一个元素以外的全部元素。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检索的数组。

#### 返回

*(Array)*: 返回 `array` 数组的切片（除了`array`数组第一个元素以外的全部元素）。

#### 例子

```
_.tail([1, 2, 3]);
// => [2, 3]
```

Try in REPL

### `_.take(array, [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8008) [Ⓝ](https://www.npmjs.com/package/lodash.take)

创建一个数组切片，从`array`数组的起始元素开始提取`n`个元素。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检索的数组。
2. `[n=1]` *(number)*: 要提取的元素个数。

#### 返回

*(Array)*: 返回 `array` 数组的切片（从起始元素开始`n`个元素）。

#### 例子

```
_.take([1, 2, 3]);
// => [1]
 
_.take([1, 2, 3], 2);
// => [1, 2]
 
_.take([1, 2, 3], 5);
// => [1, 2, 3]
 
_.take([1, 2, 3], 0);
// => []
```

Try in REPL

### `_.takeRight(array, [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8041) [Ⓝ](https://www.npmjs.com/package/lodash.takeright)

创建一个数组切片，从`array`数组的最后一个元素开始提取`n`个元素。

#### 添加版本

3.0.0

#### 参数

1. `array` *(Array)*: 要检索的数组。
2. `[n=1]` *(number)*: 要提取的元素个数。

#### 返回

*(Array)*: 返回 `array` 数组的切片（从结尾元素开始`n`个元素）。

#### 例子

```
_.takeRight([1, 2, 3]);
// => [3]
 
_.takeRight([1, 2, 3], 2);
// => [2, 3]
 
_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]
 
_.takeRight([1, 2, 3], 0);
// => []
```

Try in REPL

### `_.takeRightWhile(array, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8087) [Ⓝ](https://www.npmjs.com/package/lodash.takerightwhile)

从`array`数组的最后一个元素开始提取元素，直到 `predicate` 返回假值。`predicate` 会传入三个参数： *(value, index, array)*。

#### 添加版本

3.0.0

#### 参数

1. `array` *(Array)*: 要检索的数组。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回 `array` 数组的切片。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.takeRightWhile(users, function(o) { return !o.active; });
// => objects for ['fred', 'pebbles']
 
// The `_.matches` iteratee shorthand.
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeRightWhile(users, ['active', false]);
// => objects for ['fred', 'pebbles']
 
// The `_.property` iteratee shorthand.
_.takeRightWhile(users, 'active');
// => []
```

Try in REPL

### `_.takeWhile(array, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8129) [Ⓝ](https://www.npmjs.com/package/lodash.takewhile)

从`array`数组的起始元素开始提取元素，，直到 `predicate` 返回假值。`predicate` 会传入三个参数： *(value, index, array)*。

#### 添加版本

3.0.0

#### 参数

1. `array` *(Array)*: 需要处理的数组
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回 `array` 数组的切片。

#### 例子

```
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];
 
_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']
 
// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']
 
// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []
```

Try in REPL

### `_.union([arrays])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8151) [Ⓝ](https://www.npmjs.com/package/lodash.union)

创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做等值比较。（ `arrays`（数组）的并集，按顺序返回，返回数组的元素是唯一的）

#### 添加版本

0.1.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。

#### 返回

*(Array)*: 返回一个新的联合数组。

#### 例子

```
_.union([2], [1, 2]);
// => [2, 1]
```

Try in REPL

### `_.unionBy([arrays], [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8179) [Ⓝ](https://www.npmjs.com/package/lodash.unionby)

这个方法类似 [`_.union`](https://www.lodashjs.com/docs/latest#union) ，除了它接受一个 `iteratee` （迭代函数），调用每一个数组（`array`）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：*(value)*。

#### 添加版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 迭代函数，调用每个元素。

#### 返回

*(Array)*: 返回一个新的联合数组。

#### 例子

```
_.unionBy([2.1], [1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

Try in REPL

### `_.unionWith([arrays], [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8208) [Ⓝ](https://www.npmjs.com/package/lodash.unionwith)

这个方法类似 [`_.union`](https://www.lodashjs.com/docs/latest#union)， 除了它接受一个 `comparator` 调用比较`arrays`数组的每一个元素。 comparator 调用时会传入2个参数： *(arrVal, othVal)*。

#### 添加版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。
2. `[comparator]` *(Function)*: 比较函数，调用每个元素。

#### 返回

*(Array)*: 返回一个新的联合数组。

#### 例子

```
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```

Try in REPL

### `_.uniq(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8234) [Ⓝ](https://www.npmjs.com/package/lodash.uniq)

创建一个去重后的`array`数组副本。使用了 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 做等值比较。只有第一次出现的元素才会被保留。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检查的数组。

#### 返回

*(Array)*: 返回新的去重后的数组。

#### 例子

```
_.uniq([2, 1, 2]);
// => [2, 1]
```

Try in REPL

### `_.uniqBy(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8264) [Ⓝ](https://www.npmjs.com/package/lodash.uniqby)

这个方法类似 [`_.uniq`](https://www.lodashjs.com/docs/latest#uniq) ，除了它接受一个 `iteratee` （迭代函数），调用每一个数组（`array`）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：*(value)*。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 迭代函数，调用每个元素。

#### 返回

*(Array)*: 返回新的去重后的数组。

#### 例子

```
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

Try in REPL

### `_.uniqWith(array, [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8290) [Ⓝ](https://www.npmjs.com/package/lodash.uniqwith)

这个方法类似 [`_.uniq`](https://www.lodashjs.com/docs/latest#uniq)， 除了它接受一个 `comparator` 调用比较`arrays`数组的每一个元素。 comparator 调用时会传入2个参数： *(arrVal, othVal)*。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[comparator]` *(Function)*: 比较函数，调用每个元素。

#### 返回

*(Array)*: 返回新的去重后的数组。

#### 例子

```
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```

Try in REPL

### `_.unzip(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8315) [Ⓝ](https://www.npmjs.com/package/lodash.unzip)

这个方法类似于 [`_.zip`](https://www.lodashjs.com/docs/latest#zip)，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）

#### 添加版本

1.2.0

#### 参数

1. `array` *(Array)*: 要处理的分组元素数组。

#### 返回

*(Array)*: 返回重组元素的新数组。

#### 例子

```
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
 
_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```

Try in REPL

### `_.unzipWith(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8352) [Ⓝ](https://www.npmjs.com/package/lodash.unzipwith)

此方法类似于 [`_.unzip`](https://www.lodashjs.com/docs/latest#unzip)，除了它接受一个`iteratee`指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： *(...group)*。

#### 添加版本

3.8.0

#### 参数

1. `array` *(Array)*: 要处理的分组元素数组。
2. `[iteratee=_.identity]` *(Function)*: 这个函数用来组合重组的值。

#### 返回

*(Array)*: 返回重组元素的新数组。

#### 例子

```
var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]
 
_.unzipWith(zipped, _.add);
// => [3, 30, 300]
```

Try in REPL

### `_.without(array, [values])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8385) [Ⓝ](https://www.npmjs.com/package/lodash.without)

创建一个剔除所有给定值的新数组，剔除值的时候，使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做相等比较。

**注意:** 不像 [`_.pull`](https://www.lodashjs.com/docs/latest#pull), 这个方法会返回一个新数组。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要检查的数组。
2. `[values]` *(...\*)*: 要剔除的值。

#### 返回

*(Array)*: 返回过滤值后的新数组。

#### 例子

```
_.without([2, 1, 2, 3], 1, 2);
// => [3]
```

Try in REPL

### `_.xor([arrays])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8409) [Ⓝ](https://www.npmjs.com/package/lodash.xor)

创建一个给定数组唯一值的数组，使用 [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)做等值比较。返回值的顺序取决于他们数组的出现顺序。

#### 添加版本

2.4.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。

#### 返回

*(Array)*: 返回过滤值后的新数组。

#### 例子

```
_.xor([2, 1], [2, 3]);
// => [1, 3]
```

Try in REPL

### `_.xorBy([arrays], [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8437) [Ⓝ](https://www.npmjs.com/package/lodash.xorby)

这个方法类似 [`_.xor`](https://www.lodashjs.com/docs/latest#xor) ，除了它接受 `iteratee`（迭代器），这个迭代器 调用每一个 `arrays`（数组）的每一个值，以生成比较的新值。iteratee 调用一个参数： *(value)*.

#### 添加版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 调用每一个元素的迭代函数。

#### 返回

*(Array)*: 返回过滤值后的新数组。

#### 例子

```
_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]
 
// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```

Try in REPL

### `_.xorWith([arrays], [comparator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8466) [Ⓝ](https://www.npmjs.com/package/lodash.xorwith)

该方法是像 [`_.xor`](https://www.lodashjs.com/docs/latest#xor)，除了它接受一个 `comparator` ，以调用比较数组的元素。 comparator 调用2个参数：*(arrVal, othVal)*.

#### 添加版本

4.0.0

#### 参数

1. `[arrays]` *(...Array)*: 要检查的数组。
2. `[comparator]` *(Function)*: 调用每一个元素的比较函数。

#### 返回

*(Array)*: 返回过滤值后的新数组。

#### 例子

```
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```

Try in REPL

### `_.zip([arrays])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8490) [Ⓝ](https://www.npmjs.com/package/lodash.zip)

创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。

#### 添加版本

0.1.0

#### 参数

1. `[arrays]` *(...Array)*: 要处理的数组。

#### 返回

*(Array)*: 返回分组元素的新数组。

#### 例子

```
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```

Try in REPL

### `_.zipObject([props=[]], [values=[]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8508) [Ⓝ](https://www.npmjs.com/package/lodash.zipobject)

这个方法类似 [`_.fromPairs`](https://www.lodashjs.com/docs/latest#fromPairs)，除了它接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。

#### 添加版本

0.4.0

#### 参数

1. `[props=[]]` *(Array)*: The property identifiers.
2. `[values=[]]` *(Array)*: The property values.

#### 返回

*(Object)*: Returns the new object.

#### 例子

```
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```

Try in REPL

### `_.zipObjectDeep([props=[]], [values=[]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8527) [Ⓝ](https://www.npmjs.com/package/lodash.zipobjectdeep)

这个方法类似 [`_.zipObject`](https://www.lodashjs.com/docs/latest#zipObject)，除了它支持属性路径。

#### 添加版本

4.1.0

#### 参数

1. `[props=[]]` *(Array)*: 属性标识符（属性名）。
2. `[values=[]]` *(Array)*: 属性值。

#### 返回

*(Object)*: 返回新对象。

#### 例子

```
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```

Try in REPL

### `_.zipWith([arrays], [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8550) [Ⓝ](https://www.npmjs.com/package/lodash.zipwith)

这个方法类似于 [`_.zip`](https://www.lodashjs.com/docs/latest#zip)，不同之处在于它接受一个 `iteratee`（迭代函数），来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： *(...group)*.

#### 添加版本

3.8.0

#### 参数

1. `[arrays]` *(...Array)*: 要处理的数组。
2. `[iteratee=_.identity]` *(Function)*: 函数用来组合分组的值。

#### 返回

*(Array)*: 返回分组元素的新数组。

#### 例子

```
_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]
```

Try in REPL

## `“集合” 方法(“Collection” Methods)`

### `_.countBy(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8930) [Ⓝ](https://www.npmjs.com/package/lodash.countby)

创建一个组成对象，key（键）是经过 `iteratee`（迭代函数） 执行处理`collection`中每个元素后返回的结果，每个key（键）对应的值是 `iteratee`（迭代函数）返回该key（键）的次数（迭代次数）。 iteratee 调用一个参数：*(value)*。

#### 添加版本

0.5.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 一个迭代函数，用来转换key（键）。

#### 返回

*(Object)*: 返回一个组成集合对象。

#### 例子

```
_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }
 
// The `_.property` iteratee shorthand.
_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

Try in REPL

### `_.every(collection, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8980) [Ⓝ](https://www.npmjs.com/package/lodash.every)

通过 `predicate`（断言函数） 检查 `collection`（集合）中的 **所有** 元素是否都返回真值。一旦 `predicate`（断言函数） 返回假值，迭代就马上停止。`predicate`（断言函数）调用三个参数： *(value, index|key, collection)*。

**注意:** 这个方法对于对于 [空集合](https://en.wikipedia.org/wiki/Empty_set)返回 `true`，因为空集合的 [任何元素都是 true](https://en.wikipedia.org/wiki/Vacuous_truth) 。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(boolean)*: 如果所有元素经 predicate（断言函数） 检查后都都返回真值，那么就返回`true`，否则返回 `false` 。

#### 例子

```
_.every([true, 1, null, 'yes'], Boolean);
// => false
 
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```

Try in REPL

### `_.filter(collection, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9026) [Ⓝ](https://www.npmjs.com/package/lodash.filter)

遍历 `collection`（集合）元素，返回 `predicate`（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：*(value, index|key, collection)*。

**Note:** Unlike [`_.remove`](https://www.lodashjs.com/docs/latest#remove), this method returns a new array.

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回一个新的过滤后的数组。

#### 例子

```
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```

Try in REPL

### `_.find(collection, [predicate=_.identity], [fromIndex=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9068) [Ⓝ](https://www.npmjs.com/package/lodash.find)

遍历 `collection`（集合）元素，返回 `predicate`（断言函数）第一个返回真值的第一个元素。predicate（断言函数）调用3个参数： *(value, index|key, collection)*。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。
3. `[fromIndex=0]` *(number)*: 开始搜索的索引位置。

#### 返回

*(\*)*: 返回匹配元素，否则返回 `undefined`。

#### 例子

```
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
 
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'
 
// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```

Try in REPL

### `_.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9090) [Ⓝ](https://www.npmjs.com/package/lodash.findlast)

这个方法类似 [`_.find`](https://www.lodashjs.com/docs/latest#find) ，不同之处在于， [`_.findLast`](https://www.lodashjs.com/docs/latest#findLast)是从右至左遍历`collection` （集合）元素的。

#### 添加版本

2.0.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。
3. `[fromIndex=collection.length-1]` *(number)*: 开始搜索的索引位置。

#### 返回

*(\*)*: 返回匹配元素，否则返回 `undefined`。

#### 例子

```
_.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
```

Try in REPL

### `_.flatMap(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9114) [Ⓝ](https://www.npmjs.com/package/lodash.flatmap)

创建一个扁平化（同阶数组）的数组，这个数组的值来自`collection`（集合）中的每一个值经过 `iteratee`（迭代函数） 处理后返回的结果，并且扁平化合并。 iteratee 调用三个参数： *(value, index|key, collection)*。

#### 添加版本

4.0.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代遍历的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回新扁平化数组。

#### 例子

```
function duplicate(n) {
  return [n, n];
}
 
_.flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```

Try in REPL

### `_.flatMapDeep(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9139) [Ⓝ](https://www.npmjs.com/package/lodash.flatmapdeep)

这个方法类似 [`_.flatMap`](https://www.lodashjs.com/docs/latest#flatMap) 不同之处在于， [`_.flatMapDeep`](https://www.lodashjs.com/docs/latest#flatMapDeep) 会继续扁平化递归映射的结果。

#### 添加版本

4.7.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回新扁平化数组。

#### 例子

```
function duplicate(n) {
  return [[[n, n]]];
}
 
_.flatMapDeep([1, 2], duplicate);
// => [1, 1, 2, 2]
```

Try in REPL

### `_.flatMapDepth(collection, [iteratee=_.identity], [depth=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9165) [Ⓝ](https://www.npmjs.com/package/lodash.flatmapdepth)

该方法类似 [`_.flatMap`](https://www.lodashjs.com/docs/latest#flatMap)，不同之处在于， [`_.flatMapDepth`](https://www.lodashjs.com/docs/latest#flatMapDepth) 会根据指定的 `depth`（递归深度）继续扁平化递归映射结果。

#### 添加版本

4.7.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。
3. `[depth=1]` *(number)*: 最大递归深度。

#### 返回

*(Array)*: 返回新扁平化数组。

#### 例子

```
function duplicate(n) {
  return [[[n, n]]];
}
 
_.flatMapDepth([1, 2], duplicate, 2);
// => [[1, 1], [2, 2]]
```

Try in REPL

### `_.forEach(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9200) [Ⓝ](https://www.npmjs.com/package/lodash.foreach)

调用 `iteratee` 遍历 `collection`(集合) 中的每个元素， iteratee 调用3个参数： *(value, index|key, collection)*。 如果迭代函数（iteratee）显式的返回 `false` ，迭代会提前退出。

**注意:** 与其他"集合"方法一样，类似于数组，对象的 "length" 属性也会被遍历。想避免这种情况，可以用 [`_.forIn`](https://www.lodashjs.com/docs/latest#forIn) 或者 [`_.forOwn`](https://www.lodashjs.com/docs/latest#forOwn) 代替。

#### 添加版本

0.1.0

#### 别名

*_.each*

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。

#### 返回

*(\*)*: 返回集合 `collection`。

#### 例子

```
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => Logs `1` then `2`.
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```

Try in REPL

### `_.forEachRight(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9225) [Ⓝ](https://www.npmjs.com/package/lodash.foreachright)

这个方法类似 [`_.forEach`](https://www.lodashjs.com/docs/latest#forEach)，不同之处在于， [`_.forEachRight`](https://www.lodashjs.com/docs/latest#forEachRight) 是从右到左遍历集合中每一个元素的。

#### 添加版本

2.0.0

#### 别名

*_.eachRight*

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。

#### 返回

*(\*)*: 返回集合 `collection`。

#### 例子

```
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => Logs `2` then `1`.
```

Try in REPL

### `_.groupBy(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9254) [Ⓝ](https://www.npmjs.com/package/lodash.groupby)

创建一个对象，key 是 `iteratee` 遍历 `collection`(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 `collection`(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： *(value)*。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 一个用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 这个迭代函数用来转换key。

#### 返回

*(Object)*: 返回一个组成聚合的对象。

#### 例子

```
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

Try in REPL

### `_.includes(collection, value, [fromIndex=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9292) [Ⓝ](https://www.npmjs.com/package/lodash.includes)

检查 `value`(值) 是否在 `collection`(集合) 中。如果 `collection`(集合)是一个字符串，那么检查 `value`（值，子字符串） 是否在字符串中， 否则使用 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 做等值比较。 如果指定 `fromIndex` 是负数，那么从 `collection`(集合) 的结尾开始检索。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object|string)*: 要检索的集合。
2. `value` *(\*)*: 要检索的值。
3. `[fromIndex=0]` *(number)*: 要检索的 索引位置。

#### 返回

*(boolean)*: 如果找到 `value` 返回 `true`， 否则返回 `false`。

#### 例子

```
_.includes([1, 2, 3], 1);
// => true
 
_.includes([1, 2, 3], 1, 2);
// => false
 
_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// => true
 
_.includes('pebbles', 'eb');
// => true
```

Try in REPL

### `_.invokeMap(collection, path, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9328) [Ⓝ](https://www.npmjs.com/package/lodash.invokemap)

调用`path`（路径）上的方法处理 `collection`(集合)中的每个元素，返回一个数组，包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。如果`methodName`（方法名）是一个函数，每次调用函数时，内部的 `this` 指向集合中的每个元素。

#### 添加版本

4.0.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `path` *(Array|Function|string)*: 用来调用方法的路径 或 者每次迭代调用的函数。
3. `[args]` *(...\*)*: 调用每个方法的参数。

#### 返回

*(Array)*: 返回的结果数组。

#### 例子

```
_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
 
_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```

Try in REPL

### `_.keyBy(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9370) [Ⓝ](https://www.npmjs.com/package/lodash.keyby)

创建一个对象组成， key（键） 是 `collection`（集合）中的每个元素经过 `iteratee`（迭代函数） 处理后返回的结果。 每个 key（键）对应的值是生成key（键）的最后一个元素。`iteratee`（迭代函数）调用1个参数：*(value)*。

#### 添加版本

4.0.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 这个迭代函数用来转换key。

#### 返回

*(Object)*: 返回一个组成聚合的对象。

#### 例子

```
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
 
_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 
_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```

Try in REPL

### `_.map(collection, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9416) [Ⓝ](https://www.npmjs.com/package/lodash.map)

创建一个数组， value（值） 是 `iteratee`（迭代函数）遍历 `collection`（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数：
*(value, index|key, collection)*.

lodash 中有许多方法是防止作为其他方法的迭代函数（即不能作为iteratee参数传递给其他方法），例如： [`_.every`](https://www.lodashjs.com/docs/latest#every), [`_.filter`](https://www.lodashjs.com/docs/latest#filter), [`_.map`](https://www.lodashjs.com/docs/latest#map), [`_.mapValues`](https://www.lodashjs.com/docs/latest#mapValues), [`_.reject`](https://www.lodashjs.com/docs/latest#reject), 和 [`_.some`](https://www.lodashjs.com/docs/latest#some)。

受保护的方法有（即这些方法不能使用 [`_.every`](https://www.lodashjs.com/docs/latest#every), [`_.filter`](https://www.lodashjs.com/docs/latest#filter), [`_.map`](https://www.lodashjs.com/docs/latest#map), [`_.mapValues`](https://www.lodashjs.com/docs/latest#mapValues), [`_.reject`](https://www.lodashjs.com/docs/latest#reject), 和 [`_.some`](https://www.lodashjs.com/docs/latest#some)作为 iteratee 迭代函数参数） ：
`ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`, `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`, and `words`

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回新的映射后数组。

#### 例子

```
function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
```

Try in REPL

### `_.orderBy(collection, [iteratees=[_.identity]], [orders])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9450) [Ⓝ](https://www.npmjs.com/package/lodash.orderby)

此方法类似于 [`_.sortBy`](https://www.lodashjs.com/docs/latest#sortBy)，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 `orders`（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。

#### 添加版本

4.0.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratees=[_.identity]]` *(Array[]|Function[]|Object[]|string[])*: 排序的迭代函数。
3. `[orders]` *(string[])*: `iteratees`迭代函数的排序顺序。

#### 返回

*(Array)*: 排序排序后的新数组。

#### 例子

```
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

Try in REPL

### `_.partition(collection, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9500) [Ⓝ](https://www.npmjs.com/package/lodash.partition)

创建一个分成两组的元素数组，第一组包含`predicate`（断言函数）返回为 truthy（真值）的元素，第二组包含`predicate`（断言函数）返回为 falsey（假值）的元素。predicate 调用1个参数：*(value)*。

#### 添加版本

3.0.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回元素分组后的数组。

#### 例子

```
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];
 
_.partition(users, function(o) { return o.active; });
// => objects for [['fred'], ['barney', 'pebbles']]
 
// The `_.matches` iteratee shorthand.
_.partition(users, { 'age': 1, 'active': false });
// => objects for [['pebbles'], ['barney', 'fred']]
 
// The `_.matchesProperty` iteratee shorthand.
_.partition(users, ['active', false]);
// => objects for [['barney', 'pebbles'], ['fred']]
 
// The `_.property` iteratee shorthand.
_.partition(users, 'active');
// => objects for [['fred'], ['barney', 'pebbles']]
```

Try in REPL

### `_.reduce(collection, [iteratee=_.identity], [accumulator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9541) [Ⓝ](https://www.npmjs.com/package/lodash.reduce)

压缩 `collection`（集合）为一个值，通过 `iteratee`（迭代函数）遍历 `collection`（集合）中的每个元素，每次返回的值会作为下一次迭代使用(作为`iteratee`（迭代函数）的第一个参数使用)。 如果没有提供 `accumulator`，则 `collection`（集合）中的第一个元素作为初始值。(`accumulator`参数在第一次迭代的时候作为`iteratee`（迭代函数）第一个参数使用。) iteratee 调用4个参数：
*(accumulator, value, index|key, collection)*.

lodash 中有许多方法是防止作为其他方法的迭代函数（即不能作为iteratee参数传递给其他方法），例如： [`_.reduce`](https://www.lodashjs.com/docs/latest#reduce), [`_.reduceRight`](https://www.lodashjs.com/docs/latest#reduceRight), 和 [`_.transform`](https://www.lodashjs.com/docs/latest#transform)。

受保护的方法有（即这些方法不能使用 [`_.reduce`](https://www.lodashjs.com/docs/latest#reduce), [`_.reduceRight`](https://www.lodashjs.com/docs/latest#reduceRight), 和 [`_.transform`](https://www.lodashjs.com/docs/latest#transform)作为 iteratee 迭代函数参数）：

```
assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`, 和 `sortBy
```

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。
3. `[accumulator]` *(\*)*: 初始值。

#### 返回

*(\*)*: 返回累加后的值。

#### 例子

```
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3
 
_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
```

Try in REPL

### `_.reduceRight(collection, [iteratee=_.identity], [accumulator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9570) [Ⓝ](https://www.npmjs.com/package/lodash.reduceright)

这个方法类似 [`_.reduce`](https://www.lodashjs.com/docs/latest#reduce) ，除了它是从右到左遍历`collection`（集合）中的元素的。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。
3. `[accumulator]` *(\*)*: 初始值。

#### 返回

*(\*)*: 返回累加后的值。

#### 例子

```
var array = [[0, 1], [2, 3], [4, 5]];
 
_.reduceRight(array, function(flattened, other) {
  return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
```

Try in REPL

### `_.reject(collection, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9611) [Ⓝ](https://www.npmjs.com/package/lodash.reject)

[`_.filter`](https://www.lodashjs.com/docs/latest#filter)的反向方法;此方法 返回 `predicate`（断言函数） **不** 返回 truthy（真值）的`collection`（集合）元素（注：非真）。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回过滤后的新数组

#### 例子

```
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
 
_.reject(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// `_.matches` 迭代简写
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']
 
// `_.matchesProperty` 迭代简写
_.reject(users, ['active', false]);
// => objects for ['fred']
 
// `_.property` 迭代简写
_.reject(users, 'active');
// => objects for ['barney']
```

Try in REPL

### `_.sample(collection)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9630) [Ⓝ](https://www.npmjs.com/package/lodash.sample)

从`collection`（集合）中获得一个随机元素。

#### 添加版本

2.0.0

#### 参数

1. `collection` *(Array|Object)*: 要取样的集合。

#### 返回

*(\*)*: 返回随机元素。

#### 例子

```
_.sample([1, 2, 3, 4]);
// => 2
```

Try in REPL

### `_.sampleSize(collection, [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9654) [Ⓝ](https://www.npmjs.com/package/lodash.samplesize)

从`collection`（集合）中获得 `n` 个随机元素。

#### 添加版本

4.0.0

#### 参数

1. `collection` *(Array|Object)*: 要取样的集合。
2. `[n=1]` *(number)*: 取样的元素个数。

#### 返回

*(Array)*: 返回随机元素。

#### 例子

```
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
 
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```

Try in REPL

### `_.shuffle(collection)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9678) [Ⓝ](https://www.npmjs.com/package/lodash.shuffle)

创建一个被打乱值的集合。 使用 [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle) 版本。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 要打乱的集合。

#### 返回

*(Array)*: 返回打乱的新数组。

#### 例子

```
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

Try in REPL

### `_.size(collection)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9706) [Ⓝ](https://www.npmjs.com/package/lodash.size)

返回`collection`（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 要检查的集合

#### 返回

*(number)*: 返回集合的长度。

#### 例子

```
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
```

Try in REPL

### `_.some(collection, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9756) [Ⓝ](https://www.npmjs.com/package/lodash.some)

通过 `predicate`（断言函数） 检查`collection`（集合）中的元素是否存在 **任意** truthy（真值）的元素，一旦 `predicate`（断言函数） 返回 truthy（真值），遍历就停止。 predicate 调用3个参数：*(value, index|key, collection)*。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[predicate=_.identity]` *(Array|Function|Object|string)*: 每次迭代调用的函数。

#### 返回

*(boolean)*: 如果任意元素经 predicate 检查都为 truthy（真值），返回 `true` ，否则返回 `false` 。

#### 例子

```
_.some([null, 0, 'yes', false], Boolean);
// => true
 
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
```

Try in REPL

### `_.sortBy(collection, [iteratees=[_.identity]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9793) [Ⓝ](https://www.npmjs.com/package/lodash.sortby)

创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： *(value)*。

#### 添加版本

0.1.0

#### 参数

1. `collection` *(Array|Object)*: 用来迭代的集合。
2. `[iteratees=[_.identity]]` *(...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[]))*: 这个函数决定排序。

#### 返回

*(Array)*: 返回排序后的数组。

#### 例子

```
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, function(o) { return o.user; });
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 
_.sortBy(users, 'user', function(o) {
  return Math.floor(o.age / 10);
});
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

Try in REPL

## `“Date” Methods（“日期”方法）`

### `_.now()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9824) [Ⓝ](https://www.npmjs.com/package/lodash.now)

获得 Unix 纪元 *(1 January 1970 00:00:00 UTC)* 直到现在的毫秒数。

#### 添加版本

2.4.0

#### 返回

*(number)*: 返回时间戳。

#### 例子

```
_.defer(function(stamp) {
  console.log(_.now() - stamp);
}, _.now());
// => 记录延迟函数调用的毫秒数
```

Try in REPL

## `“Function” Methods（“函数”方法）`

### `_.after(n, func)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9854) [Ⓝ](https://www.npmjs.com/package/lodash.after)

[`_.before`](https://www.lodashjs.com/docs/latest#before)的反向函数;此方法创建一个函数，当他被调用`n`或更多次之后将马上触发`func` 。

#### 添加版本

0.1.0

#### 参数

1. `n` *(number)*: `func` 方法应该在调用多少次后才执行。
2. `func` *(Function)*: 用来限定的函数。

#### 返回

*(Function)*: 返回新的限定函数。

#### 例子

```
var saves = ['profile', 'settings'];
 
var done = _.after(saves.length, function() {
  console.log('done saving!');
});
 
_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => Logs 'done saving!' after the two async saves have completed.
```

Try in REPL

### `_.ary(func, [n=func.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9883) [Ⓝ](https://www.npmjs.com/package/lodash.ary)

创建一个调用`func`的函数。调用`func`时最多接受 `n`个参数，忽略多出的参数。

#### 添加版本

3.0.0

#### 参数

1. `func` *(Function)*: 需要被限制参数个数的函数。
2. `[n=func.length]` *(number)*: 限制的参数数量。

#### 返回

*(Function)*: 返回新的覆盖函数。

#### 例子

```
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
```

Try in REPL

### `_.before(n, func)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9906) [Ⓝ](https://www.npmjs.com/package/lodash.before)

创建一个调用`func`的函数，通过`this`绑定和创建函数的参数调用`func`，调用次数不超过 `n` 次。 之后再调用这个函数，将返回一次最后调用`func`的结果。

#### 添加版本

3.0.0

#### 参数

1. `n` *(number)*: 超过多少次不再调用`func`（限制调用`func` 的次数）。
2. `func` *(Function)*: 限制执行的函数。

#### 返回

*(Function)*: 返回新的限定函数。

#### 例子

```
jQuery(element).on('click', _.before(5, addContactToList));
// => allows adding up to 4 contacts to the list
```

Try in REPL

### `_.bind(func, thisArg, [partials])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L9958) [Ⓝ](https://www.npmjs.com/package/lodash.bind)

创建一个调用`func`的函数，`thisArg`绑定`func`函数中的 `this` (`this`的上下文为`thisArg`) ，并且`func`函数会接收`partials`附加参数。

`_.bind.placeholder`值，默认是以 `_` 作为附加部分参数的占位符。

**注意:** 不同于原生的 `Function#bind`，这个方法不会设置绑定函数的 "length" 属性。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 绑定的函数。
2. `thisArg` *(\*)*: `func` 绑定的`this`对象。
3. `[partials]` *(...\*)*: 附加的部分参数。

#### 返回

*(Function)*: 返回新的绑定函数。

#### 例子

```
var greet = function(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
};
 
var object = { 'user': 'fred' };
 
var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'
 
// Bound with placeholders.
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'
```

Try in REPL

### `_.bindKey(object, key, [partials])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10012) [Ⓝ](https://www.npmjs.com/package/lodash.bindkey)

创建一个函数,在`object[key]`上通过接收`partials`附加参数，调用这个方法。

这个方法与 [`_.bind`](https://www.lodashjs.com/docs/latest#bind) 的不同之处在于允许重新定义绑定函数即使它还不存在。 浏览 [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern) 了解更多详情。

`_.bind.placeholder`值，默认是以 `_` 作为附加部分参数的占位符。

#### 添加版本

0.10.0

#### 参数

1. `object` *(Object)*: 需要绑定函数的对象。
2. `key` *(string)*: 需要绑定函数对象的键。
3. `[partials]` *(...\*)*: 附加的部分参数。

#### 返回

*(Function)*: 返回新的绑定函数。

#### 例子

```
var object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
 
var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'
 
object.greet = function(greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};
 
bound('!');
// => 'hiya fred!'
 
// Bound with placeholders.
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
```

Try in REPL

### `_.curry(func, [arity=func.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10062) [Ⓝ](https://www.npmjs.com/package/lodash.curry)

创建一个函数，该函数接收 `func` 的参数，要么调用`func`返回的结果，如果 `func` 所需参数已经提供，则直接返回 `func` 所执行的结果。或返回一个函数，接受余下的`func` 参数的函数，可以使用 `func.length` 强制需要累积的参数个数。

`_.curry.placeholder`值，默认是以 `_` 作为附加部分参数的占位符。

**Note:** 这个方法不会设置 curried 函数的 "length" 属性。

#### 添加版本

2.0.0

#### 参数

1. `func` *(Function)*: 用来柯里化（curry）的函数。
2. `[arity=func.length]` *(number)*: 需要提供给 `func` 的参数数量。

#### 返回

*(Function)*: 返回新的柯里化（curry）函数。

#### 例子

```
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

Try in REPL

### `_.curryRight(func, [arity=func.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10107) [Ⓝ](https://www.npmjs.com/package/lodash.curryright)

这个方法类似 [`_.curry`](https://www.lodashjs.com/docs/latest#curry)。 除了它接受参数的方式用 [`_.partialRight`](https://www.lodashjs.com/docs/latest#partialRight) 代替了 [`_.partial`](https://www.lodashjs.com/docs/latest#partial)。

`_.curryRight.placeholder`值，默认是以 `_` 作为附加部分参数的占位符。

**Note:** 这个方法不会设置 curried 函数的 "length" 属性。

#### 添加版本

3.0.0

#### 参数

1. `func` *(Function)*: 用来柯里化（curry）的函数。
2. `[arity=func.length]` *(number)*: 需要提供给 `func` 的参数数量。

#### 返回

*(Function)*: 返回新的柯里化（curry）函数。

#### 例子

```
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curryRight(abc);
 
curried(3)(2)(1);
// => [1, 2, 3]
 
curried(2, 3)(1);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(3)(1, _)(2);
// => [1, 2, 3]
```

Try in REPL

### `_.debounce(func, [wait=0], [options={}])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10168) [Ⓝ](https://www.npmjs.com/package/lodash.debounce)

创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `func` 方法。 debounced（防抖动）函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 options（选项） 对象决定如何调用 `func` 方法，`options.leading` 与|或 `options.trailing` 决定延迟前后如何触发（是 先调用后等待 还是 先等待后调用）。 `func` 调用时会传入最后一次提供给 debounced（防抖动）函数 的参数。 后续调用的 debounced（防抖动）函数返回是最后一次 `func` 调用的结果。

**注意:** 如果 `leading` 和 `trailing` 选项为 `true`, 则 `func` 允许 trailing 方式调用的条件为: 在 `wait` 期间多次调用防抖方法。

如果 `wait` 为 `0` 并且 `leading` 为 `false`, `func`调用将被推迟到下一个点，类似`setTimeout`为`0`的超时。

See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) for details over the differences between [`_.debounce`](https://www.lodashjs.com/docs/latest#debounce) and [`_.throttle`](https://www.lodashjs.com/docs/latest#throttle).

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 要防抖动的函数。
2. `[wait=0]` *(number)*: 需要延迟的毫秒数。
3. `[options={}]` *(Object)*: 选项对象。
4. `[options.leading=false]` *(boolean)*: 指定在延迟开始前调用。
5. `[options.maxWait]` *(number)*: 设置 `func` 允许被延迟的最大值。
6. `[options.trailing=true]` *(boolean)*: 指定在延迟结束后调用。

#### 返回

*(Function)*: 返回新的 debounced（防抖动）函数。

#### 例子

```
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```

Try in REPL

### `_.defer(func, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10308) [Ⓝ](https://www.npmjs.com/package/lodash.defer)

推迟调用`func`，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给`func`。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 要延迟的函数。
2. `[args]` *(...\*)*: 会在调用时传给 `func` 的参数。

#### 返回

*(number)*:返回计时器 id。

#### 例子

```
_.defer(function(text) {
  console.log(text);
}, 'deferred');
// => 一毫秒或更久一些输出 'deferred'。
```

Try in REPL

### `_.delay(func, wait, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10331) [Ⓝ](https://www.npmjs.com/package/lodash.delay)

延迟 `wait` 毫秒后调用 `func`。 调用时，任何附加的参数会传给`func`。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 要延迟的函数。
2. `wait` *(number)*: 要延迟的毫秒数。
3. `[args]` *(...\*)*: 会在调用时传入到 `func` 的参数。

#### 返回

*(number)*: 返回计时器 id

#### 例子

```
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
// => 一秒后输出 'later'。
```

Try in REPL

### `_.flip(func)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10353) [Ⓝ](https://www.npmjs.com/package/lodash.flip)

创建一个函数，调用`func`时候接收翻转的参数。

#### 添加版本

4.0.0

#### 参数

1. `func` *(Function)*: 要翻转参数的函数。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var flipped = _.flip(function() {
  return _.toArray(arguments);
});
 
flipped('a', 'b', 'c', 'd');
// => ['d', 'c', 'b', 'a']
```

Try in REPL

### `_.memoize(func, [resolver])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10401) [Ⓝ](https://www.npmjs.com/package/lodash.memoize)

创建一个会缓存 `func` 结果的函数。 如果提供了 `resolver` ，就用 resolver 的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。 `func` 在调用时 `this` 会绑定在缓存函数上。

**注意**: 缓存会暴露在缓存函数的 `cache` 上。 它是可以定制的，只要替换了 `_.memoize.Cache` 构造函数，或实现了 [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object) 的 `delete`, `get`, `has`, 和 `set`方法。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 需要缓存化的函数.
2. `[resolver]` *(Function)*: 这个函数的返回值作为缓存的 key。

#### 返回

*(Function)*: 返回缓存化后的函数。

#### 例子

```
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// 修改结果缓存。
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// 替换 `_.memoize.Cache`。
_.memoize.Cache = WeakMap;
```

Try in REPL

### `_.negate(predicate)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10444) [Ⓝ](https://www.npmjs.com/package/lodash.negate)

创建一个针对断言函数 `func` 结果取反的函数。 `func` 断言函数被调用的时候，`this` 绑定到创建的函数，并传入对应参数。

#### 添加版本

3.0.0

#### 参数

1. `predicate` *(Function)*: 需要对结果取反的函数。

#### 返回

*(Function)*: 返回一个新的取反函数。

#### 例子

```
function isEven(n) {
  return n % 2 == 0;
}
 
_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
```

Try in REPL

### `_.once(func)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10478) [Ⓝ](https://www.npmjs.com/package/lodash.once)

创建一个只能调用 `func` 一次的函数。 重复调用返回第一次调用的结果。 `func` 调用时， `this` 绑定到创建的函数，并传入对应参数。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 指定的触发的函数。

#### 返回

*(Function)*: 返回新的受限函数。

#### 例子

```
var initialize = _.once(createApplication);
initialize();
initialize();
// `initialize` 只能调用 `createApplication` 一次。
```

Try in REPL

### `_.overArgs(func, [transforms=[_.identity]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10513) [Ⓝ](https://www.npmjs.com/package/lodash.overargs)

创建一个函数，调用`func`时参数为相对应的`transforms`的返回值。

#### 添加版本

4.0.0

#### 参数

1. `func` *(Function)*:要包裹的函数。

#### 返回

*(Function)*: 返回新函数。

#### 例子

```
function doubled(n) {
  return n * 2;
}
 
function square(n) {
  return n * n;
}
 
var func = _.overArgs(function(x, y) {
  return [x, y];
}, [square, doubled]);
 
func(9, 3);
// => [81, 6]
 
func(10, 5);
// => [100, 10]
```

Try in REPL

### `_.partial(func, [partials])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10563) [Ⓝ](https://www.npmjs.com/package/lodash.partial)

创建一个函数。 该函数调用 `func`，并传入预设的 `partials` 参数。 这个方法类似 [`_.bind`](https://www.lodashjs.com/docs/latest#bind)，除了它**不**会绑定 `this`。

这个 `_.partial.placeholder` 的值，默认是以 `_` 作为附加部分参数的占位符。

**注意:** 这个方法不会设置 "length" 到函数上。

#### 添加版本

0.2.0

#### 参数

1. `func` *(Function)*: 需要预设的函数
2. `[partials]` *(...\*)*: 预设的参数

#### 返回

*(Function)*: 返回预设参数的函数。

#### 例子

```
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};
 
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// 使用了占位符。
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```

Try in REPL

### `_.partialRight(func, [partials])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10600) [Ⓝ](https://www.npmjs.com/package/lodash.partialright)

这个函数类似 [`_.partial`](https://www.lodashjs.com/docs/latest#partial)，除了预设参数被附加到接受参数的后面。

这个 `_.partialRight.placeholder` 的值，默认是以 `_` 作为附加部分参数的占位符。

**注意:** 这个方法不会设置 "length" 到函数上。

#### 添加版本

1.0.0

#### 参数

1. `func` *(Function)*: 需要预设的函数。
2. `[partials]` *(...\*)*: 预设的参数。

#### 返回

*(Function)*:返回预设参数的函数。

#### 例子

```
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};
 
var greetFred = _.partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'
 
// 使用了占位符。
var sayHelloTo = _.partialRight(greet, 'hello', _);
sayHelloTo('fred');
// => 'hello fred'
```

Try in REPL

### `_.rearg(func, indexes)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10627) [Ⓝ](https://www.npmjs.com/package/lodash.rearg)

创建一个函数,调用`func`时，根据指定的 `indexes` 调整对应位置参数。其中第一个索引值是对应第一个参数，第二个索引值是作为第二个参数，依此类推。

#### 添加版本

3.0.0

#### 参数

1. `func` *(Function)*: 待调用的函数。
2. `indexes` *(...(number|number[]))*: 排列参数的位置。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var rearged = _.rearg(function(a, b, c) {
  return [a, b, c];
}, [2, 0, 1]);
 
rearged('b', 'c', 'a')
// => ['a', 'b', 'c']
```

Try in REPL

### `_.rest(func, [start=func.length-1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10656) [Ⓝ](https://www.npmjs.com/package/lodash.rest)

创建一个函数，调用`func`时，`this`绑定到创建的新函数，并且`start`之后的参数作为数组传入。

**Note:** 这个方法基于 [rest parameter](https://mdn.io/rest_parameters)。

#### 添加版本

4.0.0

#### 参数

1. `func` *(Function)*: 要应用的函数。
2. `[start=func.length-1]` *(number)*: rest 参数的开始位置。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var say = _.rest(function(what, names) {
  return what + ' ' + _.initial(names).join(', ') +
    (_.size(names) > 1 ? ', & ' : '') + _.last(names);
});
 
say('hello', 'fred', 'barney', 'pebbles');
// => 'hello fred, barney, & pebbles'
```

Try in REPL

### `_.spread(func, [start=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10698) [Ⓝ](https://www.npmjs.com/package/lodash.spread)

创建一个函数，调用`func`时，`this`绑定到创建的新函数，把参数作为数组传入，类似于 [`Function#apply`](http://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply).

**Note:** 这个方法基于 [spread operator](https://mdn.io/spread_operator).

#### 添加版本

3.2.0

#### 参数

1. `func` *(Function)*: 要应用传播参数的函数。
2. `[start=0]` *(number)*: spread 参数的开始位置.

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var say = _.spread(function(who, what) {
  return who + ' says ' + what;
});
 
say(['fred', 'hello']);
// => 'fred says hello'
 
var numbers = Promise.all([
  Promise.resolve(40),
  Promise.resolve(36)
]);
 
numbers.then(_.spread(function(x, y) {
  return x + y;
}));
// => a Promise of 76
```

Try in REPL

### `_.throttle(func, [wait=0], [options={}])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10758) [Ⓝ](https://www.npmjs.com/package/lodash.throttle)

创建一个节流函数，在 wait 秒内最多执行 `func` 一次的函数。 该函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 options 对象决定如何调用 `func` 方法， options.leading 与|或 options.trailing 决定 wait 前后如何触发。 `func` 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 `func` 调用的结果。

**注意:** 如果 `leading` 和 `trailing` 都设定为 `true` 则 `func` 允许 trailing 方式调用的条件为: 在 `wait` 期间多次调用。

如果 `wait` 为 `0` 并且 `leading` 为 `false`, `func`调用将被推迟到下一个点，类似`setTimeout`为`0`的超时。

查看 [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) 了解 [`_.throttle`](https://www.lodashjs.com/docs/latest#throttle) 与 [`_.debounce`](https://www.lodashjs.com/docs/latest#debounce) 的区别。

#### 添加版本

0.1.0

#### 参数

1. `func` *(Function)*: 要节流的函数。
2. `[wait=0]` *(number)*: 需要节流的毫秒。
3. `[options={}]` *(Object)*: 选项对象。
4. `[options.leading=true]` *(boolean)*: 指定调用在节流开始前。
5. `[options.trailing=true]` *(boolean)*: 指定调用在节流结束后。

#### 返回

*(Function)*: 返回节流的函数。

#### 例子

```
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

Try in REPL

### `_.unary(func)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10791) [Ⓝ](https://www.npmjs.com/package/lodash.unary)

创建一个最多接受一个参数的函数，忽略多余的参数。

#### 添加版本

4.0.0

#### 参数

1. `func` *(Function)*: 要处理的函数。

#### 返回

*(Function)*: 返回新函数。

#### 例子

```
_.map(['6', '8', '10'], _.unary(parseInt));
// => [6, 8, 10]
```

Try in REPL

### `_.wrap(value, [wrapper=identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10817) [Ⓝ](https://www.npmjs.com/package/lodash.wrap)

创建一个函数。提供的 `value` 包装在 wrapper 函数的第一个参数里。 任何附加的参数都提供给 wrapper 函数。 被调用时 `this` 绑定在创建的函数上。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要包装的值。
2. `[wrapper=identity]` *(Function)*: 包装函数。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var p = _.wrap(_.escape, function(func, text) {
  return '<p>' + func(text) + '</p>';
});
 
p('fred, barney, & pebbles');
// => '<p>fred, barney, &amp; pebbles</p>'
```

Try in REPL

## `“Lang” Methods`

### `_.castArray(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10857) [Ⓝ](https://www.npmjs.com/package/lodash.castarray)

如果 `value` 不是数组, 那么强制转为数组。

#### 添加版本

4.4.0

#### 参数

1. `value` *(\*)*: 要处理的值。

#### 返回

*(Array)*: 返回转换后的数组。

#### 例子

```
_.castArray(1);
// => [1]
 
_.castArray({ 'a': 1 });
// => [{ 'a': 1 }]
 
_.castArray('abc');
// => ['abc']
 
_.castArray(null);
// => [null]
 
_.castArray(undefined);
// => [undefined]
 
_.castArray();
// => []
 
var array = [1, 2, 3];
console.log(_.castArray(array) === array);
// => true
```

Try in REPL

### `_.clone(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10891) [Ⓝ](https://www.npmjs.com/package/lodash.clone)

创建一个 `value` 的浅拷贝。

**注意**: 这个方法参考自 [structured clone algorithm](https://mdn.io/Structured_clone_algorithm) 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， `Object` 对象, regexes, sets, strings, symbols, 以及 typed arrays。 `arguments`对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要拷贝的值

#### 返回

*(\*)*: 返回拷贝后的值。

#### 例子

```
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
```

Try in REPL

### `_.cloneDeep(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10948) [Ⓝ](https://www.npmjs.com/package/lodash.clonedeep)

这个方法类似 [`_.clone`](https://www.lodashjs.com/docs/latest#clone)，除了它会递归拷贝 `value`。（也叫深拷贝）。

#### 添加版本

1.0.0

#### 参数

1. `value` *(\*)*: 要深拷贝的值。

#### 返回

*(\*)*: 返回拷贝后的值。

#### 例子

```
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

Try in REPL

### `_.cloneDeepWith(value, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10980) [Ⓝ](https://www.npmjs.com/package/lodash.clonedeepwith)

这个方法类似 [`_.cloneWith`](https://www.lodashjs.com/docs/latest#cloneWith)，除了它会递归克隆 `value`。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 用来递归克隆的值。
2. `[customizer]` *(Function)*: 用来自定义克隆的函数。

#### 返回

*(\*)*: 返回深度克隆后的值。

#### 例子

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

Try in REPL

### `_.cloneWith(value, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L10926) [Ⓝ](https://www.npmjs.com/package/lodash.clonewith)

这个方法类似 [`_.clone`](https://www.lodashjs.com/docs/latest#clone)，除了它接受一个 `customizer` 定制返回的克隆值。 如果 `customizer` 返回 `undefined` 将会使用拷贝方法代替处理。 customizer 调用4个参数： *(value [, index|key, object, stack])*。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要克隆的值。
2. `[customizer]` *(Function)*: 用来自定义克隆的函数。

#### 返回

*(\*)*: 返回克隆值。

#### 例子

```
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(false);
  }
}
 
var el = _.cloneWith(document.body, customizer);
 
console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 0
```

Try in REPL

### `_.conformsTo(object, source)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11008) [Ⓝ](https://www.npmjs.com/package/lodash.conformsto)

通过调用断言`source`的属性与 `object` 的相应属性值，检查 `object`是否符合 `source`。当`source`偏应用时，这种方法和 [`_.conforms`](https://www.lodashjs.com/docs/latest#conforms)函数是等价的。

**注意:** 当`source`为偏应用时，这种方法等价于 [`_.conforms`](https://www.lodashjs.com/docs/latest#conforms)。（关于偏应用大家可以自己到google上搜索一下）。

#### 添加版本

4.14.0

#### 参数

1. `object` *(Object)*: 要检查的对象。
2. `source` *(Object)*: 要断言属性是否符合的对象。

#### 返回

*(boolean)*: 如果 `object` 符合，返回 `true`，否则 `false`。

#### 例子

```
var object = { 'a': 1, 'b': 2 };
 
_.conformsTo(object, { 'b': function(n) { return n > 1; } });
// => true
 
_.conformsTo(object, { 'b': function(n) { return n > 2; } });
// => false
```

Try in REPL

### `_.eq(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11044) [Ⓝ](https://www.npmjs.com/package/lodash.eq)

执行 [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 比较两者的值，来确定它们是否相等。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要比较的值。
2. `other` *(\*)*: 另一个要比较的值。

#### 返回

*(boolean)*: 如果两个值相等返回 `true` ，否则返回 `false` 。

#### 例子

```
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.eq(object, object);
// => true
 
_.eq(object, other);
// => false
 
_.eq('a', 'a');
// => true
 
_.eq('a', Object('a'));
// => false
 
_.eq(NaN, NaN);
// => true
```

Try in REPL

### `_.gt(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11071) [Ⓝ](https://www.npmjs.com/package/lodash.gt)

检查 `value`是否大于 `other`。

#### 添加版本

3.9.0

#### 参数

1. `value` *(\*)*: 要比较的值。
2. `other` *(\*)*: 另一个要比较的值。

#### 返回

*(boolean)*: 如果`value` 大于 `other` 返回 `true`，否则返回 `false`。

#### 例子

```
_.gt(3, 1);
// => true
 
_.gt(3, 3);
// => false
 
_.gt(1, 3);
// => false
```

Try in REPL

### `_.gte(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11096) [Ⓝ](https://www.npmjs.com/package/lodash.gte)

检查 `value`是否大于或者等于 `other`。

#### 添加版本

3.9.0

#### 参数

1. `value` *(\*)*: 要比较的值。
2. `other` *(\*)*: 另一个要比较的值。

#### 返回

*(boolean)*: 如果`value` 大于或者等于 `other` 返回 `true`，否则返回 `false`。

#### 例子

```
_.gte(3, 1);
// => true
 
_.gte(3, 3);
// => true
 
_.gte(1, 3);
// => false
```

Try in REPL

### `_.isArguments(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11118) [Ⓝ](https://www.npmjs.com/package/lodash.isarguments)

检查 `value` 是否是一个类 `arguments` 对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果`value`是一个 `arguments` 对象 返回 `true`，否则返回 `false`。

#### 例子

```
_.isArguments(function() { return arguments; }());
// => true
 
_.isArguments([1, 2, 3]);
// => false
```

Try in REPL

### `_.isArray(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11147) [Ⓝ](https://www.npmjs.com/package/lodash.isarray)

检查 `value` 是否是 `Array` 类对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果`value`是一个数组返回 `true`，否则返回 `false`。

#### 例子

```
_.isArray([1, 2, 3]);
// => true
 
_.isArray(document.body.children);
// => false
 
_.isArray('abc');
// => false
 
_.isArray(_.noop);
// => false
```

Try in REPL

### `_.isArrayBuffer(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11166) [Ⓝ](https://www.npmjs.com/package/lodash.isarraybuffer)

检查 `value` 是否是 `ArrayBuffer` 对象。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果`value`是一个数组 buffer 返回 `true`，否则返回 `false`。

#### 例子

```
_.isArrayBuffer(new ArrayBuffer(2));
// => true
 
_.isArrayBuffer(new Array(2));
// => false
```

Try in REPL

### `_.isArrayLike(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11193) [Ⓝ](https://www.npmjs.com/package/lodash.isarraylike)

检查 `value` 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，并且`value.length`是个整数，大于等于 `0`，小于或等于 `Number.MAX_SAFE_INTEGER`。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果`value`是一个类数组，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isArrayLike([1, 2, 3]);
// => true
 
_.isArrayLike(document.body.children);
// => true
 
_.isArrayLike('abc');
// => true
 
_.isArrayLike(_.noop);
// => false
```

Try in REPL

### `_.isArrayLikeObject(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11222) [Ⓝ](https://www.npmjs.com/package/lodash.isarraylikeobject)

这个方法类似 [`_.isArrayLike`](https://www.lodashjs.com/docs/latest#isArrayLike)。除了它还检查`value`是否是个对象。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个类数组对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isArrayLikeObject([1, 2, 3]);
// => true
 
_.isArrayLikeObject(document.body.children);
// => true
 
_.isArrayLikeObject('abc');
// => false
 
_.isArrayLikeObject(_.noop);
// => false
```

Try in REPL

### `_.isBoolean(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11243) [Ⓝ](https://www.npmjs.com/package/lodash.isboolean)

检查 `value` 是否是原始 boolean 类型或者对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个布尔值，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isBoolean(false);
// => true
 
_.isBoolean(null);
// => false
```

Try in REPL

### `_.isBuffer(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11265) [Ⓝ](https://www.npmjs.com/package/lodash.isbuffer)

检查 `value` 是否是个 buffer。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个buffer，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isBuffer(new Buffer(2));
// => true
 
_.isBuffer(new Uint8Array(2));
// => false
```

Try in REPL

### `_.isDate(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11284) [Ⓝ](https://www.npmjs.com/package/lodash.isdate)

检查 `value` 是否是 `Date` 对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个日期对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isDate(new Date); 
// => true
 
_.isDate('Mon April 23 2012');
// => false
```

Try in REPL

### `_.isElement(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11303) [Ⓝ](https://www.npmjs.com/package/lodash.iselement)

检查 `value` 是否是可能是 DOM 元素。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个DOM元素，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isElement(document.body);
// => true
 
_.isElement('<body>');
// => false
```

Try in REPL

### `_.isEmpty(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11340) [Ⓝ](https://www.npmjs.com/package/lodash.isempty)

检查 `value` 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。

对象如果被认为为空，那么他们没有自己的可枚举属性的对象。

类数组值，比如 `arguments`对象，array，buffer，string或者类jQuery集合的`length` 为 `0`，被认为是空。类似的，map（映射）和set 的`size` 为 `0`，被认为是空。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为空，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isEmpty(null);
// => true
 
_.isEmpty(true);
// => true
 
_.isEmpty(1);
// => true
 
_.isEmpty([1, 2, 3]);
// => false
 
_.isEmpty({ 'a': 1 });
// => false
```

Try in REPL

### `_.isEqual(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11389) [Ⓝ](https://www.npmjs.com/package/lodash.isequal)

执行深比较来确定两者的值是否相等。

**注意: **这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, `Object` objects, regexes, sets, strings, symbols, 以及 typed arrays. `Object` 对象值比较自身的属性，不包括继承的和可枚举的属性。 **不**支持函数和DOM节点比较。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 用来比较的值。
2. `other` *(\*)*: 另一个用来比较的值。

#### 返回

*(boolean)*: 如果 两个值完全相同，那么返回 `true`，否则返回 `false`。

#### 例子

```
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.isEqual(object, other);
// => true
 
object === other;
// => false
```

Try in REPL

### `_.isEqualWith(value, other, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11425) [Ⓝ](https://www.npmjs.com/package/lodash.isequalwith)

这个方法类似 [`_.isEqual`](https://www.lodashjs.com/docs/latest#isEqual)。 除了它接受一个 `customizer` 用来定制比较值。 如果 `customizer` 返回 `undefined` 将会比较处理方法代替。 `customizer` 会传入6个参数：*(objValue, othValue [, index|key, object, other, stack])*

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 用来比较的值。
2. `other` *(\*)*: 另一个用来比较的值。
3. `[customizer]` *(Function)*: 用来定制比较值的函数。

#### 返回

*(boolean)*: 如果 两个值完全相同，那么返回 `true`，否则返回 `false`。

#### 例子

```
function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}
 
function customizer(objValue, othValue) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true;
  }
}
 
var array = ['hello', 'goodbye'];
var other = ['hi', 'goodbye'];
 
_.isEqualWith(array, other, customizer);
// => true
```

Try in REPL

### `_.isError(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11449) [Ⓝ](https://www.npmjs.com/package/lodash.iserror)

检查 `value` 是否是 `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, 或者 `URIError`对象。

#### 添加版本

3.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个错误（Error）对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isError(new Error);
// => true
 
_.isError(Error);
// => false
```

Try in REPL

### `_.isFinite(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11483) [Ⓝ](https://www.npmjs.com/package/lodash.isfinite)

检查 `value` 是否是原始有限数值。

** 注意:** 这个方法基于 [`Number.isFinite`](https://mdn.io/Number/isFinite).

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个有限数值，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isFinite(3);
// => true
 
_.isFinite(Number.MIN_VALUE);
// => true
 
_.isFinite(Infinity);
// => false
 
_.isFinite('3');
// => false
```

Try in REPL

### `_.isFunction(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11504) [Ⓝ](https://www.npmjs.com/package/lodash.isfunction)

检查 `value` 是否是 `Function` 对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值

#### 返回

*(boolean)*: 如果 `value` 是一个函数，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isFunction(_);
// => true
 
_.isFunction(/abc/);
// => false
```

Try in REPL

### `_.isInteger(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11537) [Ⓝ](https://www.npmjs.com/package/lodash.isinteger)

检查 `value` 是否为一个整数。

**注意:** 这个方法基于 [`Number.isInteger`](https://mdn.io/Number/isInteger).

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个整数，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isInteger(3);
// => true
 
_.isInteger(Number.MIN_VALUE);
// => false
 
_.isInteger(Infinity);
// => false
 
_.isInteger('3');
// => false
```

Try in REPL

### `_.isLength(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11567) [Ⓝ](https://www.npmjs.com/package/lodash.islength)

检查 `value` 是否为有效的类数组长度。

**注意:** 这个函数基于 [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个有效长度，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isLength(3);
// => true
 
_.isLength(Number.MIN_VALUE);
// => false
 
_.isLength(Infinity);
// => false
 
_.isLength('3');
// => false
```

Try in REPL

### `_.isMap(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11647) [Ⓝ](https://www.npmjs.com/package/lodash.ismap)

检查 `value` 是否为一个 `Map` 对象。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个 `Map` 对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isMap(new Map);
// => true
 
_.isMap(new WeakMap);
// => false
```

Try in REPL

### `_.isMatch(object, source)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11677) [Ⓝ](https://www.npmjs.com/package/lodash.ismatch)

执行一个深度比较，来确定 `object` 是否含有和 `source` 完全相等的属性值。

**注意:** 当`source`为偏应用时，这种方法等价于 [`_.matches`](https://www.lodashjs.com/docs/latest#matches)。（关于偏应用大家可以自己到google上搜索一下）。

偏应用比较匹配空数组和空对象 `source`值分别针对任何数组或对象的价值。在 [`_.isEqual`](https://www.lodashjs.com/docs/latest#isEqual)中查看支持的值比较列表。

#### 添加版本

3.0.0

#### 参数

1. `object` *(Object)*: 要检查的对象。
2. `source` *(Object)*: 属性值相匹配的对象。

#### 返回

*(boolean)*: 如果`object`匹配，那么返回 `true`，否则返回 `false`。

#### 例子

```
var object = { 'a': 1, 'b': 2 };
 
_.isMatch(object, { 'b': 2 });
// => true
 
_.isMatch(object, { 'b': 1 });
// => false
```

Try in REPL

### `_.isMatchWith(object, source, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11713) [Ⓝ](https://www.npmjs.com/package/lodash.ismatchwith)

这个方法类似 [`_.isMatch`](https://www.lodashjs.com/docs/latest#isMatch)。 除了它接受一个 `customizer` 定制比较的值。 如果 `customizer` 返回 `undefined` 将会比较处理方法代替。 `customizer` 会传入5个参数：*(objValue, srcValue, index|key, object, source)*。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要检查的对象。
2. `source` *(Object)*: 属性值相匹配的对象。
3. `[customizer]` *(Function)*: 这个函数用来定制比较。

#### 返回

*(boolean)*: 如果`object`匹配，那么返回 `true`，否则返回 `false`。

#### 例子

```
function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}
 
function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}
 
var object = { 'greeting': 'hello' };
var source = { 'greeting': 'hi' };
 
_.isMatchWith(object, source, customizer);
// => true
```

Try in REPL

### `_.isNaN(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11746) [Ⓝ](https://www.npmjs.com/package/lodash.isnan)

检查 `value` 是否是 `NaN`。

**注意:** 这个方法基于 [`Number.isNaN`](https://mdn.io/Number/isNaN)，和全局的 [`isNaN`](https://mdn.io/isNaN) 不同之处在于，全局的 [`isNaN`](https://mdn.io/isNaN)对 于 `undefined` 和其他非数字的值返回 `true`。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个 `NaN`，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isNaN(NaN);
// => true
 
_.isNaN(new Number(NaN));
// => true
 
isNaN(undefined);
// => true
 
_.isNaN(undefined);
// => false
```

Try in REPL

### `_.isNative(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11779) [Ⓝ](https://www.npmjs.com/package/lodash.isnative)

检查 `value` 是否是一个原生函数。

**注意：** 这种方法不能可靠地检测在core-js包中存在的本地函数，因为 core-js 规避这种检测。尽管有多个请求，core-js 维护者已经明确表态：任何试图修复检测将受阻。这样一来，我们别无选择，只能抛出一个错误。不幸的是，这也影响其他的包，比如依赖于 core-js的 [babel-polyfill](https://www.npmjs.com/package/babel-polyfill)。

#### 添加版本

3.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是一个 原生函数，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isNative(Array.prototype.push);
// => true
 
_.isNative(_);
// => false
```

Try in REPL

### `_.isNil(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11827) [Ⓝ](https://www.npmjs.com/package/lodash.isnil)

检查 `value` 是否是 `null` 或者 `undefined`。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为`null` 或 `undefined`，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isNil(null);
// => true
 
_.isNil(void 0);
// => true
 
_.isNil(NaN);
// => false
```

Try in REPL

### `_.isNull(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11803) [Ⓝ](https://www.npmjs.com/package/lodash.isnull)

检查 `value`alue 是否是 `null`。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为`null`，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isNull(null);
// => true
 
_.isNull(void 0);
// => false
```

Try in REPL

### `_.isNumber(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11857) [Ⓝ](https://www.npmjs.com/package/lodash.isnumber)

检查 `value` 是否是原始`Number`数值型 或者 对象。

**注意:** 要排除 `Infinity`, `-Infinity`, 以及 `NaN` 数值类型，用 [`_.isFinite`](https://www.lodashjs.com/docs/latest#isFinite) 方法。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个数值，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isNumber(3);
// => true
 
_.isNumber(Number.MIN_VALUE);
// => true
 
_.isNumber(Infinity);
// => true
 
_.isNumber('3');
// => false
```

Try in REPL

### `_.isObject(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11597) [Ⓝ](https://www.npmjs.com/package/lodash.isobject)

检查 `value` 是否为 `Object` 的 [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)。 *(例如： arrays, functions, objects, regexes,new Number(0), 以及 new String(''))*

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isObject({});
// => true
 
_.isObject([1, 2, 3]);
// => true
 
_.isObject(_.noop);
// => true
 
_.isObject(null);
// => false
```

Try in REPL

### `_.isObjectLike(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11626) [Ⓝ](https://www.npmjs.com/package/lodash.isobjectlike)

检查 `value` 是否是 类对象。 如果一个值是类对象，那么它不应该是 `null`，而且 `typeof` 后的结果是 "object"。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个类对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isObjectLike({});
// => true
 
_.isObjectLike([1, 2, 3]);
// => true
 
_.isObjectLike(_.noop);
// => false
 
_.isObjectLike(null);
// => false
```

Try in REPL

### `_.isPlainObject(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11890) [Ⓝ](https://www.npmjs.com/package/lodash.isplainobject)

检查 `value` 是否是普通对象。 也就是说该对象由 `Object` 构造函数创建，或者 `[[Prototype]]` 为 `null` 。

#### 添加版本

0.8.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个普通对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
function Foo() {
  this.a = 1;
}
 
_.isPlainObject(new Foo);
// => false
 
_.isPlainObject([1, 2, 3]);
// => false
 
_.isPlainObject({ 'x': 0, 'y': 0 });
// => true
 
_.isPlainObject(Object.create(null));
// => true
```

Try in REPL

### `_.isRegExp(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11920) [Ⓝ](https://www.npmjs.com/package/lodash.isregexp)

检查 `value` 是否为`RegExp`对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个正则表达式，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isRegExp(/abc/);
// => true
 
_.isRegExp('/abc/');
// => false
```

Try in REPL

### `_.isSafeInteger(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11949) [Ⓝ](https://www.npmjs.com/package/lodash.issafeinteger)

检查 `value` 是否是一个安全整数。 一个安全整数应该是符合 IEEE-754 标准的非双精度浮点数。

**注意:** 这个方法基于 [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个安全整数，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isSafeInteger(3);
// => true
 
_.isSafeInteger(Number.MIN_VALUE);
// => false
 
_.isSafeInteger(Infinity);
// => false
 
_.isSafeInteger('3');
// => false
```

Try in REPL

### `_.isSet(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11970) [Ⓝ](https://www.npmjs.com/package/lodash.isset)

检查 `value` 是否是一个`Set`对象。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个 set 对象，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isSet(new Set);
// => true
 
_.isSet(new WeakSet);
// => false
```

Try in REPL

### `_.isString(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L11989) [Ⓝ](https://www.npmjs.com/package/lodash.isstring)

检查 `value` 是否是原始字符串`String`或者对象。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个字符串，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isString('abc');
// => true
 
_.isString(1);
// => false
```

Try in REPL

### `_.isSymbol(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12011) [Ⓝ](https://www.npmjs.com/package/lodash.issymbol)

检查 `value` 是否是原始 `Symbol` 或者对象。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个symbol，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isSymbol(Symbol.iterator);
// => true
 
_.isSymbol('abc');
// => false
```

Try in REPL

### `_.isTypedArray(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12033) [Ⓝ](https://www.npmjs.com/package/lodash.istypedarray)

检查 `value` 是否是TypedArray。

#### 添加版本

3.0.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个typed array，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isTypedArray(new Uint8Array);
// => true
 
_.isTypedArray([]);
// => false
```

Try in REPL

### `_.isUndefined(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12052) [Ⓝ](https://www.npmjs.com/package/lodash.isundefined)

检查 `value` 是否是 `undefined`.

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 是 `undefined` ，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isUndefined(void 0);
// => true
 
_.isUndefined(null);
// => false
```

Try in REPL

### `_.isWeakMap(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12073) [Ⓝ](https://www.npmjs.com/package/lodash.isweakmap)

检查 `value` 是否是 `WeakMap` 对象。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个 `WeakMap` 对象 ，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isWeakMap(new WeakMap);
// => true
 
_.isWeakMap(new Map);
// => false
```

Try in REPL

### `_.isWeakSet(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12094) [Ⓝ](https://www.npmjs.com/package/lodash.isweakset)

检查 `value` 是否是 `WeakSet` 对象。

#### 添加版本

4.3.0

#### 参数

1. `value` *(\*)*: 要检查的值。

#### 返回

*(boolean)*: 如果 `value` 为一个 `WeakSet` 对象 ，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.isWeakSet(new WeakSet);
// => true
 
_.isWeakSet(new Set);
// => false
```

Try in REPL

### `_.lt(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12121) [Ⓝ](https://www.npmjs.com/package/lodash.lt)

检查 `value` 是否小于 `other`。

#### 添加版本

3.9.0

#### 参数

1. `value` *(\*)*: 用来比较的值。
2. `other` *(\*)*: 另一个用来比较的值。

#### 返回

*(boolean)*: 如果`value` 小于 `other` 返回 `true`，否则返回 `false`。

#### 例子

```
_.lt(1, 3);
// => true
 
_.lt(3, 3);
// => false
 
_.lt(3, 1);
// => false
```

Try in REPL

### `_.lte(value, other)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12146) [Ⓝ](https://www.npmjs.com/package/lodash.lte)

检查 `value` 是否小于等于 `other`。

#### 添加版本

3.9.0

#### 参数

1. `value` *(\*)*: 用来比较的值。
2. `other` *(\*)*: 另一个用来比较的值。

#### 返回

*(boolean)*: 如果`value` 小于等于 `other` 返回 `true`，否则返回 `false`。

#### 例子

```
_.lte(1, 3);
// => true
 
_.lte(3, 3);
// => true
 
_.lte(3, 1);
// => false
```

Try in REPL

### `_.toArray(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12173) [Ⓝ](https://www.npmjs.com/package/lodash.toarray)

转换 `value` 为一个数组。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(Array)*: 返回转换后的数组。

#### 例子

```
_.toArray({ 'a': 1, 'b': 2 });
// => [1, 2]
 
_.toArray('abc');
// => ['a', 'b', 'c']
 
_.toArray(1);
// => []
 
_.toArray(null);
// => []
```

Try in REPL

### `_.toFinite(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12212) [Ⓝ](https://www.npmjs.com/package/lodash.tofinite)

转换 `value` 为一个有限数字。

#### 添加版本

4.12.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(number)*: 返回转换后的数字。

#### 例子

```
_.toFinite(3.2);
// => 3.2
 
_.toFinite(Number.MIN_VALUE);
// => 5e-324
 
_.toFinite(Infinity);
// => 1.7976931348623157e+308
 
_.toFinite('3.2');
// => 3.2
```

Try in REPL

### `_.toInteger(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12250) [Ⓝ](https://www.npmjs.com/package/lodash.tointeger)

转换 `value` 为一个整数。

**注意:** 这个方法基于 [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(number)*: 返回转换后的整数。

#### 例子

```
_.toInteger(3.2);
// => 3
 
_.toInteger(Number.MIN_VALUE);
// => 0
 
_.toInteger(Infinity);
// => 1.7976931348623157e+308
 
_.toInteger('3.2');
// => 3
```

Try in REPL

### `_.toLength(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12284) [Ⓝ](https://www.npmjs.com/package/lodash.tolength)

转换 `value` 为用作类数组对象的长度整数。

**注意:** 这个方法基于 [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(number)*: 返回转换后的整数。

#### 例子

```
_.toLength(3.2);
// => 3
 
_.toLength(Number.MIN_VALUE);
// => 0
 
_.toLength(Infinity);
// => 4294967295
 
_.toLength('3.2');
// => 3
```

Try in REPL

### `_.toNumber(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12311) [Ⓝ](https://www.npmjs.com/package/lodash.tonumber)

转换 `value` 为一个数字。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要处理的值。

#### 返回

*(number)*: 返回数字。

#### 例子

```
_.toNumber(3.2);
// => 3.2
 
_.toNumber(Number.MIN_VALUE);
// => 5e-324
 
_.toNumber(Infinity);
// => Infinity
 
_.toNumber('3.2');
// => 3.2
```

Try in REPL

### `_.toPlainObject(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12356) [Ⓝ](https://www.npmjs.com/package/lodash.toplainobject)

转换 `value` 为普通对象。 包括继承的可枚举属性。

#### 添加版本

3.0.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(Object)*: 返回转换后的普通对象。

#### 例子

```
function Foo() {
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.assign({ 'a': 1 }, new Foo);
// => { 'a': 1, 'b': 2 }
 
_.assign({ 'a': 1 }, _.toPlainObject(new Foo));
// => { 'a': 1, 'b': 2, 'c': 3 }
```

Try in REPL

### `_.toSafeInteger(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12384) [Ⓝ](https://www.npmjs.com/package/lodash.tosafeinteger)

转换 `value` 为安全整数。 安全整数可以用于比较和准确的表示。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要转换的值。

#### 返回

*(number)*: 返回转换后的整数。

#### 例子

```
_.toSafeInteger(3.2);
// => 3
 
_.toSafeInteger(Number.MIN_VALUE);
// => 0
 
_.toSafeInteger(Infinity);
// => 9007199254740991
 
_.toSafeInteger('3.2');
// => 3
```

Try in REPL

### `_.toString(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12409) [Ⓝ](https://www.npmjs.com/package/lodash.tostring)

转换 `value` 为字符串。 `null` 和 `undefined` 将返回空字符串。`-0` 将被转换为字符串`"-0"`。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要处理的值。

#### 返回

*(string)*: 返回字符串。

#### 例子

```
_.toString(null);
// => ''
 
_.toString(-0);
// => '-0'
 
_.toString([1, 2, 3]);
// => '1,2,3'
```

Try in REPL

## `“Math” Methods`(`“数学” 方法`)

### `_.add(augend, addend)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15975) [Ⓝ](https://www.npmjs.com/package/lodash.add)

两个数相加。

#### 添加版本

3.4.0

#### 参数

1. `augend` *(number)*: 相加的第一个数。
2. `addend` *(number)*: 相加的第二个数。

#### 返回

*(number)*: 返回总和。

#### 例子

```
_.add(6, 4);
// => 10
```

Try in REPL

### `_.ceil(number, [precision=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16000) [Ⓝ](https://www.npmjs.com/package/lodash.ceil)

根据 `precision`（精度） 向上舍入 `number`。（ `precision`（精度）可以理解为保留几位小数。）

#### 添加版本

3.10.0

#### 参数

1. `number` *(number)*: 要向上舍入的值。
2. `[precision=0]` *(number)*: 向上舍入的的精度。

#### 返回

*(number)*: 返回向上舍入的值。

#### 例子

```
_.ceil(4.006);
// => 5
 
_.ceil(6.004, 2);
// => 6.01
 
_.ceil(6040, -2);
// => 6100
```

Try in REPL

### `_.divide(dividend, divisor)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16017) [Ⓝ](https://www.npmjs.com/package/lodash.divide)

两个数相除。

#### 添加版本

4.7.0

#### 参数

1. `dividend` *(number)*: 相除的第一个数。
2. `divisor` *(number)*: 相除的第二个数。

#### 返回

*(number)*: 返回商数。

#### 例子

```
_.divide(6, 4);
// => 1.5
```

Try in REPL

### `_.floor(number, [precision=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16042) [Ⓝ](https://www.npmjs.com/package/lodash.floor)

根据 `precision`（精度） 向下舍入 `number`。（ `precision`（精度）可以理解为保留几位小数。）

#### 添加版本

3.10.0

#### 参数

1. `number` *(number)*: 要向下舍入的值。
2. `[precision=0]` *(number)*: 向下舍入的精度。

#### 返回

*(number)*: 返回向下舍入的值。

#### 例子

```
_.floor(4.006);
// => 4
 
_.floor(0.046, 2);
// => 0.04
 
_.floor(4060, -2);
// => 4000
```

Try in REPL

### `_.max(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16062) [Ⓝ](https://www.npmjs.com/package/lodash.max)

计算 `array` 中的最大值。 如果 `array` 是 空的或者假值将会返回 `undefined`。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。

#### 返回

*(\*)*: 返回最大的值。

#### 例子

```
_.max([4, 2, 8, 6]);
// => 8
 
_.max([]);
// => undefined
```

Try in REPL

### `_.maxBy(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16091) [Ⓝ](https://www.npmjs.com/package/lodash.maxby)

这个方法类似 [`_.max`](https://www.lodashjs.com/docs/latest#max) 除了它接受 `iteratee` 来调用 `array`中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: *(value)* 。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。
2. `[iteratee=_.identity]` *(Function)*: 调用每个元素的迭代函数。

#### 返回

*(\*)*: 返回最大的值。

#### 例子

```
var objects = [{ 'n': 1 }, { 'n': 2 }];
 
_.maxBy(objects, function(o) { return o.n; });
// => { 'n': 2 }
 
// The `_.property` iteratee shorthand.
_.maxBy(objects, 'n');
// => { 'n': 2 }
```

Try in REPL

### `_.mean(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16111) [Ⓝ](https://www.npmjs.com/package/lodash.mean)

计算 `array` 的平均值。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。

#### 返回

*(number)*: 返回平均值。

#### 例子

```
_.mean([4, 2, 8, 6]);
// => 5
```

Try in REPL

### `_.meanBy(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16138) [Ⓝ](https://www.npmjs.com/package/lodash.meanby)

这个方法类似 [`_.mean`](https://www.lodashjs.com/docs/latest#mean)， 除了它接受 `iteratee` 来调用 `array`中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: *(value)* 。

#### 添加版本

4.7.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。
2. `[iteratee=_.identity]` *(Function)*: 调用每个元素的迭代函数。

#### 返回

*(number)*: 返回平均值。

#### 例子

```
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 
_.meanBy(objects, function(o) { return o.n; });
// => 5
 
// The `_.property` iteratee shorthand.
_.meanBy(objects, 'n');
// => 5
```

Try in REPL

### `_.min(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16160) [Ⓝ](https://www.npmjs.com/package/lodash.min)

计算 `array` 中的最小值。 如果 `array` 是 空的或者假值将会返回 `undefined`。

#### 添加版本

0.1.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。

#### 返回

*(\*)*: 返回最小的值。

#### 例子

```
_.min([4, 2, 8, 6]);
// => 2
 
_.min([]);
// => undefined
```

Try in REPL

### `_.minBy(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16189) [Ⓝ](https://www.npmjs.com/package/lodash.minby)

这个方法类似 [`_.min`](https://www.lodashjs.com/docs/latest#min) 除了它接受 `iteratee` 来调用 `array`中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: *(value)* 。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。
2. `[iteratee=_.identity]` *(Function)*: 调用每个元素的迭代函数。

#### 返回

*(\*)*: 返回最小的值。

#### 例子

```
var objects = [{ 'n': 1 }, { 'n': 2 }];
 
_.minBy(objects, function(o) { return o.n; });
// => { 'n': 1 }
 
// The `_.property` iteratee shorthand.
_.minBy(objects, 'n');
// => { 'n': 1 }
```

Try in REPL

### `_.multiply(multiplier, multiplicand)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16210) [Ⓝ](https://www.npmjs.com/package/lodash.multiply)

两个数相乘。

#### 添加版本

4.7.0

#### 参数

1. `augend` *(number)*: 相乘的第一个数。
2. `addend` *(number)*: 相乘的第二个数。

#### 返回

*(number)*: 返回乘积。

#### 例子

```
_.multiply(6, 4);
// => 24
```

Try in REPL

### `_.round(number, [precision=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16235) [Ⓝ](https://www.npmjs.com/package/lodash.round)

根据 `precision`（精度） 四舍五入 `number`。

#### 添加版本

3.10.0

#### 参数

1. `number` *(number)*: 要四舍五入的数字。
2. `[precision=0]` *(number)*: 四舍五入的精度。

#### 返回

*(number)*: 返回四舍五入的数字。

#### 例子

```
_.round(4.006);
// => 4
 
_.round(4.006, 2);
// => 4.01
 
_.round(4060, -2);
// => 4100
```

Try in REPL

### `_.subtract(minuend, subtrahend)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16252) [Ⓝ](https://www.npmjs.com/package/lodash.subtract)

亮数相减。

#### 添加版本

4.0.0

#### 参数

1. `minuend` *(number)*: 相减的第一个数。
2. `subtrahend` *(number)*: 相减的第二个数。

#### 返回

*(number)*: 返回差。

#### 例子

```
_.subtract(6, 4);
// => 2
```

Try in REPL

### `_.sum(array)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16270) [Ⓝ](https://www.npmjs.com/package/lodash.sum)

计算 `array` 中值的总和

#### 添加版本

3.4.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。

#### 返回

*(number)*: 返回总和。

#### 例子

```
_.sum([4, 2, 8, 6]);
// => 20
```

Try in REPL

### `_.sumBy(array, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16299) [Ⓝ](https://www.npmjs.com/package/lodash.sumby)

这个方法类似 [`_.summin`](https://www.lodashjs.com/docs/latest#summin) 除了它接受 `iteratee` 来调用 `array`中的每一个元素，来生成其值排序的标准。 iteratee 会调用1个参数: *(value)* 。

#### 添加版本

4.0.0

#### 参数

1. `array` *(Array)*: 要迭代的数组。
2. `[iteratee=_.identity]` *(Function)*: 调用每个元素的迭代函数。

#### 返回

*(number)*: 返回总和。

#### 例子

```
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 
_.sumBy(objects, function(o) { return o.n; });
// => 20
 
// The `_.property` iteratee shorthand.
_.sumBy(objects, 'n');
// => 20
```

Try in REPL

## `“Number” Methods`

### `_.clamp(number, [lower], upper)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13772) [Ⓝ](https://www.npmjs.com/package/lodash.clamp)

返回限制在 `lower` 和 `upper` 之间的值。

#### 添加版本

4.0.0

#### 参数

1. `number` *(number)*: 被限制的值。
2. `[lower]` *(number)*: 下限。
3. `upper` *(number)*: 上限。

#### 返回

*(number)*: 返回被限制的值。

#### 例子

```
_.clamp(-10, -5, 5);
// => -5
 
_.clamp(10, -5, 5);
// => 5
```

Try in REPL

### `_.inRange(number, [start=0], end)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13826) [Ⓝ](https://www.npmjs.com/package/lodash.inrange)

检查 `n` 是否在 `start` 与 `end` 之间，但不包括 `end`。 如果 `end` 没有指定，那么 `start` 设置为`0`。 如果 `start` 大于 `end`，那么参数会交换以便支持负范围。

#### 添加版本

3.3.0

#### 参数

1. `number` *(number)*: 要检查的值。
2. `[start=0]` *(number)*: 开始范围。
3. `end` *(number)*: 结束范围。

#### 返回

*(boolean)*: 如果`number`在范围内 ，那么返回`true`，否则返回 `false`。

#### 例子

```
_.inRange(3, 2, 4);
// => true
 
_.inRange(4, 8);
// => true
 
_.inRange(4, 2);
// => false
 
_.inRange(2, 2);
// => false
 
_.inRange(1.2, 2);
// => true
 
_.inRange(5.2, 4);
// => false
 
_.inRange(-3, -2, -6);
// => true
```

Try in REPL

### `_.random([lower=0], [upper=1], [floating])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13869) [Ⓝ](https://www.npmjs.com/package/lodash.random)

产生一个包括 `lower` 与 `upper` 之间的数。 如果只提供一个参数返回一个`0`到提供数之间的数。 如果 `floating` 设为 `true`，或者 `lower` 或 `upper` 是浮点数，结果返回浮点数。

**注意:** JavaScript 遵循 IEEE-754 标准处理无法预料的浮点数结果。

#### 添加版本

0.7.0

#### 参数

1. `[lower=0]` *(number)*: 下限。
2. `[upper=1]` *(number)*: 上限。
3. `[floating]` *(boolean)*: 指定是否返回浮点数。

#### 返回

*(number)*: 返回随机数。

#### 例子

```
_.random(0, 5);
// => an integer between 0 and 5
 
_.random(5);
// => also an integer between 0 and 5
 
_.random(5, true);
// => a floating-point number between 0 and 5
 
_.random(1.2, 5.2);
// => a floating-point number between 1.2 and 5.2
```

Try in REPL

## `“Object” Methods`

### `_.assign(object, [sources])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12447) [Ⓝ](https://www.npmjs.com/package/lodash.assign)

分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。

**注意:** 这方法会改变 `object`，参考自 [`Object.assign`](https://mdn.io/Object/assign).

#### 添加版本

0.10.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。

#### 返回

*(Object)*: 返回 `object`.

#### 例子

```
function Foo() {
  this.a = 1;
}
 
function Bar() {
  this.c = 3;
}
 
Foo.prototype.b = 2;
Bar.prototype.d = 4;
 
_.assign({ 'a': 0 }, new Foo, new Bar);
// => { 'a': 1, 'c': 3 }
```

Try in REPL

### `_.assignIn(object, [sources])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12490) [Ⓝ](https://www.npmjs.com/package/lodash.assignin)

这个方法类似 [`_.assign`](https://www.lodashjs.com/docs/latest#assign)， 除了它会遍历并继承来源对象的属性。

**Note:** 这方法会改变 `object`。

#### 添加版本

4.0.0

#### Aliases

*_.extend*

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function Foo() {
  this.a = 1;
}
 
function Bar() {
  this.c = 3;
}
 
Foo.prototype.b = 2;
Bar.prototype.d = 4;
 
_.assignIn({ 'a': 0 }, new Foo, new Bar);
// => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
```

Try in REPL

### `_.assignInWith(object, sources, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12523) [Ⓝ](https://www.npmjs.com/package/lodash.assigninwith)

这个方法类似 [`_.assignIn`](https://www.lodashjs.com/docs/latest#assignIn)， 除了它接受一个 `customizer` ，被调用以产生所分配的值。 如果 `customizer` 返回 `undefined` 将会由分配处理方法代替。 `customizer` 会传入5个参数： *(objValue, srcValue, key, object, source)*。

**Note:** 这方法会改变 `object`。

#### 添加版本

4.0.0

#### Aliases

*_.extendWith*

#### 参数

1. `object` *(Object)*: 目标对象。
2. `sources` *(...Object)*: 来源对象。
3. `[customizer]` *(Function)*: 这个函数用来自定义分配的值。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function customizer(objValue, srcValue) {
  return _.isUndefined(objValue) ? srcValue : objValue;
}
 
var defaults = _.partialRight(_.assignInWith, customizer);
 
defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```

Try in REPL

### `_.assignWith(object, sources, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12555) [Ⓝ](https://www.npmjs.com/package/lodash.assignwith)

这个方法类似 [`_.assign`](https://www.lodashjs.com/docs/latest#assign) ， 除了它接受一个 `customizer` 决定如何分配值。 如果`customizer`返回 `undefined` 将会由分配处理方法代替。`customizer` 会传入5个参数： *(objValue, srcValue, key, object, source)*。

**Note:** 这方法会改变 `object`.

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `sources` *(...Object)*: 来源对象。
3. `[customizer]` *(Function)*: 这个函数用来自定义分配的值。

#### 返回

*(Object)*: 返回 `object`.

#### 例子

```
function customizer(objValue, srcValue) {
  return _.isUndefined(objValue) ? srcValue : objValue;
}
 
var defaults = _.partialRight(_.assignWith, customizer);
 
defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```

Try in REPL

### `_.at(object, [paths])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12576) [Ⓝ](https://www.npmjs.com/package/lodash.at)

创建一个数组，值来自 `object` 的`paths`路径相应的值。

#### 添加版本

1.0.0

#### 参数

1. `object` *(Object)*: 要迭代的对象。
2. `[paths]` *(...(string|string[]))*: 要获取的对象的元素路径，单独指定或者指定在数组中。

#### 返回

*(Array)*: 返回选中值的数组。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 
_.at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```

Try in REPL

### `_.create(prototype, [properties])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12612) [Ⓝ](https://www.npmjs.com/package/lodash.create)

创建一个继承 `prototype` 的对象。 如果提供了 `prototype`，它的可枚举属性会被分配到创建的对象上。

#### 添加版本

2.3.0

#### 参数

1. `prototype` *(Object)*: 要继承的对象。
2. `[properties]` *(Object)*: 待分配的属性。

#### 返回

*(Object)*: 返回新对象。

#### Example

```
function Shape() {
  this.x = 0;
  this.y = 0;
}
 
function Circle() {
  Shape.call(this);
}
 
Circle.prototype = _.create(Shape.prototype, {
  'constructor': Circle
});
 
var circle = new Circle;
circle instanceof Circle;
// => true
 
circle instanceof Shape;
// => true
```

Try in REPL

### `_.defaults(object, [sources])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12638) [Ⓝ](https://www.npmjs.com/package/lodash.defaults)

分配来源对象的可枚举属性到目标对象所有解析为 `undefined` 的属性上。 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。

**注意:** 这方法会改变 `object`.

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
_.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```

Try in REPL

### `_.defaultsDeep(object, [sources])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12662) [Ⓝ](https://www.npmjs.com/package/lodash.defaultsdeep)

这个方法类似 [`_.defaults`](https://www.lodashjs.com/docs/latest#defaults)，除了它会递归分配默认属性。

**注意:** 这方法会改变 `object`.

#### 添加版本

3.10.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
_.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
// => { 'a': { 'b': 2, 'c': 3 } }
```

Try in REPL

### `_.findKey(object, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12702) [Ⓝ](https://www.npmjs.com/package/lodash.findkey)

这个方法类似 [`_.find`](https://www.lodashjs.com/docs/latest#find) 。 除了它返回最先被 `predicate` 判断为真值的元素 key，而不是元素本身。

#### 添加版本

1.1.0

#### 参数

1. `object` *(Object)*: 需要检索的对象。
2. `[predicate=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(\*)*: 返回匹配的 key，否则返回 `undefined`。

#### 例子

```
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
 
_.findKey(users, function(o) { return o.age < 40; });
// => 'barney' (iteration order is not guaranteed)
 
// The `_.matches` iteratee shorthand.
_.findKey(users, { 'age': 1, 'active': true });
// => 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.findKey(users, ['active', false]);
// => 'fred'
 
// The `_.property` iteratee shorthand.
_.findKey(users, 'active');
// => 'barney'
```

Try in REPL

### `_.findLastKey(object, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12741) [Ⓝ](https://www.npmjs.com/package/lodash.findlastkey)

这个方法类似 [`_.findKey`](https://www.lodashjs.com/docs/latest#findKey)。 不过它是反方向开始遍历的。

#### 添加版本

2.0.0

#### 参数

1. `object` *(Object)*: 需要检索的对象。
2. `[predicate=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(\*)*: 返回匹配的 key，否则返回 `undefined`.

#### 例子

```
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
 
_.findLastKey(users, function(o) { return o.age < 40; });
// => returns 'pebbles' assuming `_.findKey` returns 'barney'
 
// The `_.matches` iteratee shorthand.
_.findLastKey(users, { 'age': 36, 'active': true });
// => 'barney'
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastKey(users, ['active', false]);
// => 'fred'
 
// The `_.property` iteratee shorthand.
_.findLastKey(users, 'active');
// => 'pebbles'
```

Try in REPL

### `_.forIn(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12773) [Ⓝ](https://www.npmjs.com/package/lodash.forin)

使用 `iteratee` 遍历对象的自身和继承的可枚举属性。 `iteratee` 会传入3个参数：*(value, key, object)*。 如果返回 `false`，`iteratee` 会提前退出遍历。

#### 添加版本

0.3.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.forIn(new Foo, function(value, key) {
  console.log(key);
});
// => Logs 'a', 'b', then 'c' (无法保证遍历的顺序)。
```

Try in REPL

### `_.forInRight(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12805) [Ⓝ](https://www.npmjs.com/package/lodash.forinright)

这个方法类似 [`_.forIn`](https://www.lodashjs.com/docs/latest#forIn)。 除了它是反方向开始遍历`object`的。

#### 添加版本

2.0.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.forInRight(new Foo, function(value, key) {
  console.log(key);
});
// => 输出 'c', 'b', 然后 'a'， `_.forIn` 会输出 'a', 'b', 然后 'c'。
```

Try in REPL

### `_.forOwn(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12839) [Ⓝ](https://www.npmjs.com/package/lodash.forown)

使用 `iteratee` 遍历自身的可枚举属性。 `iteratee` 会传入3个参数：*(value, key, object)*。 如果返回 `false`，`iteratee` 会提前退出遍历。

#### 添加版本

0.3.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.forOwn(new Foo, function(value, key) {
  console.log(key);
});
// => 输出 'a' 然后 'b' (无法保证遍历的顺序)。
```

Try in REPL

### `_.forOwnRight(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12869) [Ⓝ](https://www.npmjs.com/package/lodash.forownright)

这个方法类似 [`_.forOwn`](https://www.lodashjs.com/docs/latest#forOwn)。 除了它是反方向开始遍历`object`的。

#### 添加版本

2.0.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.forOwnRight(new Foo, function(value, key) {
  console.log(key);
});
// =>  输出 'b' 然后 'a'， `_.forOwn` 会输出 'a' 然后 'b'
```

Try in REPL

### `_.functions(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12896) [Ⓝ](https://www.npmjs.com/package/lodash.functions)

创建一个函数属性名称的数组，函数属性名称来自`object`对象自身可枚举属性。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 要检查的对象。

#### 返回

*(Array)*: 返回函数名。

#### 例子

```
function Foo() {
  this.a = _.constant('a');
  this.b = _.constant('b');
}
 
Foo.prototype.c = _.constant('c');
 
_.functions(new Foo);
// => ['a', 'b']
```

Try in REPL

### `_.functionsIn(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12923) [Ⓝ](https://www.npmjs.com/package/lodash.functionsin)

创建一个函数属性名称的数组，函数属性名称来自`object`对象自身和继承的可枚举属性。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要检查的对象。

#### 返回

*(Array)*: 返回函数名。

#### 例子

```
function Foo() {
  this.a = _.constant('a');
  this.b = _.constant('b');
}
 
Foo.prototype.c = _.constant('c');
 
_.functionsIn(new Foo);
// => ['a', 'b', 'c']
```

Try in REPL

### `_.get(object, path, [defaultValue])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12952) [Ⓝ](https://www.npmjs.com/package/lodash.get)

根据 `object`对象的`path`路径获取值。 如果解析 value 是 `undefined` 会以 `defaultValue` 取代。

#### 添加版本

3.7.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `path` *(Array|string)*: 要获取属性的路径。
3. `[defaultValue]` *(\*)*: 如果解析值是 `undefined` ，这值会被返回。

#### 返回

*(\*)*: 返回解析的值。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

Try in REPL

### `_.has(object, path)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L12984) [Ⓝ](https://www.npmjs.com/package/lodash.has)

检查 `path` 是否是`object`对象的直接属性。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `path` *(Array|string)*: 要检查的路径`path`。

#### 返回

*(boolean)*: 如果`path`存在，那么返回 `true` ，否则返回 `false`。

#### 例子

```
var object = { 'a': { 'b': 2 } };
var other = _.create({ 'a': _.create({ 'b': 2 }) });
 
_.has(object, 'a');
// => true
 
_.has(object, 'a.b');
// => true
 
_.has(object, ['a', 'b']);
// => true
 
_.has(other, 'a');
// => false
```

Try in REPL

### `_.hasIn(object, path)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13014) [Ⓝ](https://www.npmjs.com/package/lodash.hasin)

检查 `path` 是否是`object`对象的直接或继承属性。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `path` *(Array|string)*: 要检查的路径`path`。

#### 返回

*(boolean)*: 如果`path`存在，那么返回 `true` ，否则返回 `false`。

#### 例子

```
var object = _.create({ 'a': _.create({ 'b': 2 }) });
 
_.hasIn(object, 'a');
// => true
 
_.hasIn(object, 'a.b');
// => true
 
_.hasIn(object, ['a', 'b']);
// => true
 
_.hasIn(object, 'b');
// => false
```

Try in REPL

### `_.invert(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13036) [Ⓝ](https://www.npmjs.com/package/lodash.invert)

创建一个`object`键值倒置后的对象。 如果 `object` 有重复的值，后面的值会覆盖前面的值。

#### 添加版本

0.7.0

#### 参数

1. `object` *(Object)*: 要键值倒置对象。

#### 返回

*(Object)*: 返回新的键值倒置后的对象。

#### 例子

```
var object = { 'a': 1, 'b': 2, 'c': 1 };
 
_.invert(object);
// => { '1': 'c', '2': 'b' }
```

Try in REPL

### `_.invertBy(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13066) [Ⓝ](https://www.npmjs.com/package/lodash.invertby)

这个方法类似 [`_.invert`](https://www.lodashjs.com/docs/latest#invert)，除了倒置对象 是 `collection`（集合）中的每个元素经过 `iteratee`（迭代函数） 处理后返回的结果。每个反转键相应反转的值是一个负责生成反转值key的数组。`iteratee` 会传入3个参数：*(value)* 。

#### 添加版本

4.1.0

#### 参数

1. `object` *(Object)*: 要键值倒置对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回新的键值倒置后的对象。

#### 例子

```
var object = { 'a': 1, 'b': 2, 'c': 1 };
 
_.invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }
 
_.invertBy(object, function(value) {
  return 'group' + value;
});
// => { 'group1': ['a', 'c'], 'group2': ['b'] }
```

Try in REPL

### `_.invoke(object, path, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13092) [Ⓝ](https://www.npmjs.com/package/lodash.invoke)

调用`object`对象`path`上的方法。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `path` *(Array|string)*: 用来调用的方法路径。
3. `[args]` *(...\*)*: 调用的方法的参数。

#### 返回

*(\*)*: 返回调用方法的结果。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
 
_.invoke(object, 'a[0].b.c.slice', 1, 3);
// => [2, 3]
```

Try in REPL

### `_.keys(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13122) [Ⓝ](https://www.npmjs.com/package/lodash.keys)

创建一个 `object` 的自身可枚举属性名为数组。

**Note:** 非对象的值会被强制转换为对象，查看 [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys) 了解详情。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回包含属性名的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.keys(new Foo);
// => ['a', 'b'] (iteration order is not guaranteed)
 
_.keys('hi');
// => ['0', '1']
```

Try in REPL

### `_.keysIn(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13149) [Ⓝ](https://www.npmjs.com/package/lodash.keysin)

创建一个 `object` 自身 和 继承的可枚举属性名为数组。

**注意:** 非对象的值会被强制转换为对象。

#### 添加版本

3.0.0

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回包含属性名的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.keysIn(new Foo);
// => ['a', 'b', 'c'] (iteration order is not guaranteed)
```

Try in REPL

### `_.mapKeys(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13174) [Ⓝ](https://www.npmjs.com/package/lodash.mapkeys)

反向版 [`_.mapValues`](https://www.lodashjs.com/docs/latest#mapValues)。 这个方法创建一个对象，对象的值与`object`相同，并且 key 是通过 `iteratee` 运行 `object` 中每个自身可枚举属性名字符串 产生的。`iteratee`调用三个参数： *(value, key, object)*。

#### 添加版本

3.8.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回映射后的新对象。

#### 例子

```
_.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
  return key + value;
});
// => { 'a1': 1, 'b2': 2 }
```

Try in REPL

### `_.mapValues(object, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13212) [Ⓝ](https://www.npmjs.com/package/lodash.mapvalues)

创建一个对象，这个对象的key与`object`对象相同，值是通过 `iteratee` 运行 `object` 中每个自身可枚举属性名字符串产生的。 `iteratee`调用三个参数： *(value, key, object)*。

#### 添加版本

2.4.0

#### 参数

1. `object` *(Object)*: 要遍历的对象。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。

#### 返回

*(Object)*: 返回映射后的新对象。

#### 例子

```
var users = {
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};
 
_.mapValues(users, function(o) { return o.age; });
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 
// The `_.property` iteratee shorthand.
_.mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
```

Try in REPL

### `_.merge(object, [sources])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13253) [Ⓝ](https://www.npmjs.com/package/lodash.merge)

该方法类似 [`_.assign`](https://www.lodashjs.com/docs/latest#assign)， 除了它递归合并 `sources` 来源对象自身和继承的可枚举属性到 `object` 目标对象。如果目标值存在，被解析为`undefined`的`sources` 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。

**Note:** 这方法会改变对象 `object`.

#### 添加版本

0.5.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。

#### 返回

*(Object)*: 返回 `object`.

#### 例子

```
var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};
 
var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};
 
_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```

Try in REPL

### `_.mergeWith(object, sources, customizer)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13288) [Ⓝ](https://www.npmjs.com/package/lodash.mergewith)

该方法类似 [`_.merge`](https://www.lodashjs.com/docs/latest#merge)，除了它接受一个 `customizer`，调用以产生目标对象和来源对象属性的合并值。如果`customizer` 返回 `undefined`，将会由合并处理方法代替。 `customizer`调用与7个参数：*(objValue, srcValue, key, object, source, stack)*。

**Note:** 这方法会改变对象 `object`.

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 目标对象。
2. `[sources]` *(...Object)*: 来源对象。
3. `customizer` *(Function)*: 这个函数定制合并值。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
 
var object = { 'a': [1], 'b': [2] };
var other = { 'a': [3], 'b': [4] };
 
_.mergeWith(object, other, customizer);
// => { 'a': [1, 3], 'b': [2, 4] }
```

Try in REPL

### `_.omit(object, [props])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13311) [Ⓝ](https://www.npmjs.com/package/lodash.omit)

反向版 [`_.pick`](https://www.lodashjs.com/docs/latest#pick); 这个方法一个对象，这个对象由忽略属性之外的`object`自身和继承的可枚举属性组成。（可以理解为删除`object`对象的属性）。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 来源对象。
2. `[props]` *(...(string|string[]))*: 要被忽略的属性。（单独指定或指定在数组中。）

#### 返回

*(Object)*: 返回新对象。

#### 例子

```
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```

Try in REPL

### `_.omitBy(object, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13339) [Ⓝ](https://www.npmjs.com/package/lodash.omitby)

反向版 [`_.pickBy`](https://www.lodashjs.com/docs/latest#pickBy)；这个方法一个对象，这个对象忽略 `predicate`（断言函数）判断不是真值的属性后，`object`自身和继承的可枚举属性组成。`predicate`调用与2个参数：*(value, key)*。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 来源对象。
2. `[predicate=_.identity]` *(Function)*: 调用每一个属性的函数。

#### 返回

*(Object)*: 返回新对象。

#### 例子

```
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omitBy(object, _.isNumber);
// => { 'b': '2' }
```

Try in REPL

### `_.pick(object, [props])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13360) [Ⓝ](https://www.npmjs.com/package/lodash.pick)

创建一个从 `object` 中选中的属性的对象。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 来源对象。
2. `[props]` *(...(string|string[]))*: 要被忽略的属性。（单独指定或指定在数组中。）

#### 返回

*(Object)*: 返回新对象。

#### 例子

```
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

Try in REPL

### `_.pickBy(object, [predicate=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13382) [Ⓝ](https://www.npmjs.com/package/lodash.pickby)

创建一个对象，这个对象组成为从 `object` 中经 `predicate` 判断为真值的属性。 `predicate`调用2个参数：*(value, key)*。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 来源对象。
2. `[predicate=_.identity]` *(Function)*: 调用每一个属性的函数。

#### 返回

*(Object)*: 返回新对象。

#### 例子

```
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pickBy(object, _.isNumber);
// => { 'a': 1, 'c': 3 }
```

Try in REPL

### `_.result(object, path, [defaultValue])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13415) [Ⓝ](https://www.npmjs.com/package/lodash.result)

这个方法类似 [`_.get`](https://www.lodashjs.com/docs/latest#get)， 除了如果解析到的值是一个函数的话，就绑定 `this` 到这个函数并返回执行后的结果。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `path` *(Array|string)*: 要解析的属性路径。
3. `[defaultValue]` *(\*)*: 如果值解析为 `undefined`，返回这个值。

#### 返回

*(\*)*: 返回解析后的值。

#### 例子

```
var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
 
_.result(object, 'a[0].b.c1');
// => 3
 
_.result(object, 'a[0].b.c2');
// => 4
 
_.result(object, 'a[0].b.c3', 'default');
// => 'default'
 
_.result(object, 'a[0].b.c3', _.constant('default'));
// => 'default'
```

Try in REPL

### `_.set(object, path, value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13465) [Ⓝ](https://www.npmjs.com/package/lodash.set)

设置 `object`对象中对应 `path` 属性路径上的值，如果`path`不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 使用 [`_.setWith`](https://www.lodashjs.com/docs/latest#setWith) 定制`path`创建。

**Note:** 这个方法会改变 `object`。

#### 添加版本

3.7.0

#### 参数

1. `object` *(Object)*: 要修改的对象。
2. `path` *(Array|string)*: 要设置的对象路径。
3. `value` *(\*)*: 要设置的值。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4
 
_.set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5
```

Try in REPL

### `_.setWith(object, path, value, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13493) [Ⓝ](https://www.npmjs.com/package/lodash.setwith)

这个方法类似 [`_.set`](https://www.lodashjs.com/docs/latest#set)，除了它接受一个 `customizer`，调用生成对象的 `path`。 如果 `customizer` 返回 `undefined` 将会有它的处理方法代替。 `customizer` 调用3个参数： *(nsValue, key, nsObject)*。

**注意:** 这个方法会改变 `object`.

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要修改的对象。
2. `path` *(Array|string)*: 要设置的对象路径。
3. `value` *(\*)*: 要设置的值。
4. `[customizer]` *(Function)*: 这个函数用来定制分配的值。

#### 返回

*(Object)*: 返回 `object`。

#### 例子

```
var object = {};
 
_.setWith(object, '[0][1]', 'a', Object);
// => { '0': { '1': 'a' } }
```

Try in REPL

### `_.toPairs(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13522) [Ⓝ](https://www.npmjs.com/package/lodash.topairs)

创建一个`object`对象自身可枚举属性的键值对数组。这个数组可以通过 [`_.fromPairs`](https://www.lodashjs.com/docs/latest#fromPairs)撤回。如果`object` 是 map 或 set，返回其条目。

#### 添加版本

4.0.0

#### Aliases

*_.entries*

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回键值对的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.toPairs(new Foo);
// => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
```

Try in REPL

### `_.toPairsIn(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13548) [Ⓝ](https://www.npmjs.com/package/lodash.topairsin)

创建一个`object`对象自身和继承的可枚举属性的键值对数组。这个数组可以通过 [`_.fromPairs`](https://www.lodashjs.com/docs/latest#fromPairs)撤回。如果`object` 是 map 或 set，返回其条目。

#### 添加版本

4.0.0

#### Aliases

*_.entriesIn*

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回键值对的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.toPairsIn(new Foo);
// => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
```

Try in REPL

### `_.transform(object, [iteratee=_.identity], [accumulator])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13580) [Ⓝ](https://www.npmjs.com/package/lodash.transform)

[`_.reduce`](https://www.lodashjs.com/docs/latest#reduce)的替代方法;此方法将转换`object`对象为一个新的`accumulator`对象，结果来自`iteratee`处理自身可枚举的属性。 每次调用可能会改变 `accumulator` 对象。如果不提供`accumulator`，将使用与`[[Prototype]]`相同的新对象。`iteratee`调用4个参数：*(accumulator, value, key, object)*。如果返回 `false`，`iteratee` 会提前退出。

#### 添加版本

1.3.0

#### 参数

1. `object` *(Object)*: 要遍历的对象
2. `[iteratee=_.identity]` *(Function)*: 每次迭代时调用的函数。
3. `[accumulator]` *(\*)*: 定制叠加的值。

#### 返回

*(\*)*: 返回叠加后的值。

#### 例子

```
_.transform([2, 3, 4], function(result, n) {
  result.push(n *= n);
  return n % 2 == 0;
}, []);
// => [4, 9]
 
_.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
}, {});
// => { '1': ['a', 'c'], '2': ['b'] }
```

Try in REPL

### `_.unset(object, path)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13629) [Ⓝ](https://www.npmjs.com/package/lodash.unset)

移除`object`对象 `path` 路径上的属性。

**注意:** 这个方法会改变源对象 `object`。

#### 添加版本

4.0.0

#### 参数

1. `object` *(Object)*: 要修改的对象。
2. `path` *(Array|string)*: 要移除的对象路径。

#### 返回

*(boolean)*: 如果移除成功，那么返回 `true` ，否则返回 `false`。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 7 } }] };
_.unset(object, 'a[0].b.c');
// => true
 
console.log(object);
// => { 'a': [{ 'b': {} }] };
 
_.unset(object, ['a', '0', 'b', 'c']);
// => true
 
console.log(object);
// => { 'a': [{ 'b': {} }] };
```

Try in REPL

### `_.update(object, path, updater)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13660) [Ⓝ](https://www.npmjs.com/package/lodash.update)

该方法类似 [`_.set`](https://www.lodashjs.com/docs/latest#set)，除了接受`updater`以生成要设置的值。使用 [`_.updateWith`](https://www.lodashjs.com/docs/latest#updateWith)来自定义生成的新`path`。`updater`调用1个参数：*(value)*。

**Note:** 这个方法会改变 `object`。

#### 添加版本

4.6.0

#### 参数

1. `object` *(Object)*: 要修改的对象。
2. `path` *(Array|string)*: 要设置属性的路径。
3. `updater` *(Function)*: 用来生成设置值的函数。

#### 返回

*(Object)*: 返回 `object` 。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.update(object, 'a[0].b.c', function(n) { return n * n; });
console.log(object.a[0].b.c);
// => 9
 
_.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
console.log(object.x[0].y.z);
// => 0
```

Try in REPL

### `_.updateWith(object, path, updater, [customizer])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13688) [Ⓝ](https://www.npmjs.com/package/lodash.updatewith)

该方法类似 [`_.update`](https://www.lodashjs.com/docs/latest#update)，不同之处在于它接受`customizer`，调用来生成新的对象的`path`。如果`customizer`返回`undefined`，路径创建由该方法代替。`customizer`调用有三个参数：*(nsValue, key, nsObject)* 。

**Note:** 这个方法会改变 `object`.

#### 添加版本

4.6.0

#### 参数

1. `object` *(Object)*: 要修改的对象。
2. `path` *(Array|string)*: 要设置属性的路径。
3. `updater` *(Function)*: 用来生成设置值的函数。
4. `[customizer]` *(Function)*: 用来自定义分配值的函数。

#### 返回

*(Object)*: 返回 `object`.

#### 例子

```
var object = {};
 
_.updateWith(object, '[0][1]', _.constant('a'), Object);
// => { '0': { '1': 'a' } }
```

Try in REPL

### `_.values(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13719) [Ⓝ](https://www.npmjs.com/package/lodash.values)

创建 `object` 自身可枚举属性的值为数组。

**注意:** 注意: 非对象的值会强制转换为对象。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回对象属性的值的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.values(new Foo);
// => [1, 2] (无法保证遍历的顺序)
 
_.values('hi');
// => ['h', 'i']
```

Try in REPL

### `_.valuesIn(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13747) [Ⓝ](https://www.npmjs.com/package/lodash.valuesin)

创建 `object` 自身和继承的可枚举属性的值为数组

**注意:** 注意: 非对象的值会强制转换为对象。

#### 添加版本

3.0.0

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Array)*: 返回对象属性的值的数组。

#### 例子

```
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.valuesIn(new Foo);
// => [1, 2, 3] (无法保证遍历的顺序)
```

Try in REPL

## `“Seq” Methods`

### `_(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1644)

创建一个`lodash`对象，包装`value`后的对象启用隐式方法链。返回的数组、集合、方法相互之间能够链式调用。检索唯一值或返回原始值会自动解除链条并返回计算后的值，否则需要调用 `_#value` 方法解除链(即获得计算结果)。

显式链式调用，在任何情况下需要先用 `_#value` 解除链后，才能使用 [`_.chain`](https://www.lodashjs.com/docs/latest#chain) 开启。

链式方法是惰性计算的，直到隐式或者显式调用了 `_#value` 才会执行计算。

惰性计算接受几种支持 shortcut fusion 的方法， shortcut fusion 是一种通过合并链式 iteratee 调用从而大大降低迭代的次数以提高执行性能的方式。 部分链有资格 shortcut fusion，如果它至少有超过`200`个元素的数组和任何只接受一个参数的 iteratees。 触发的方式是任何一个 shortcut fusion 有了变化。

链式方法支持定制版本，只要 `_#value` 包含或者间接包含在版本中。

除了 lodash 的自身方法，包装后的对象还支持 `Array` 和 `String` 的方法。

支持 `Array` 的方法: `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, 和 `unshift`

支持 `String` 的方法: `replace` 和 `split`

支持 shortcut fusion 的方法: `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`, `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`, `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, 和 `toArray`

支持 链式调用 的方法: `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`, `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`, `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`, `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`, `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`, `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`, `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`, `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`, `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`, `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`, `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`, `zipObjectDeep`, and `zipWith`

默认 **不** 支持 链式调用 的方法: `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`, `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`, `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`, `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`, `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`, `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`, `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`, `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`, `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`, `upperFirst`, `value`, and `words`

#### 参数

1. `value` *(\*)*: 需要被包装为 `lodash` 实例的值。

#### 返回

*(Object)*: 返回 `lodash` 包装后的实例。

#### 例子

```
function square(n) {
  return n * n;
}
 
var wrapped = _([1, 2, 3]);
 
// 返回未包装的值
wrapped.reduce(_.add);
// => 6
 
// 返回链式包装的值
var squares = wrapped.map(square);
 
_.isArray(squares);
// => false
 
_.isArray(squares.value());
// => true
```

Try in REPL

### `_.chain(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8589)

创建一个`lodash`包装实例，包装`value`以启用显式链模式。要解除链必须使用 `_#value` 方法。

#### 添加版本

1.3.0

#### 参数

1. `value` *(\*)*: 要包装的值。

#### 返回

*(Object)*: 返回 `lodash` 包装的实例。

#### 例子

```
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];
 
var youngest = _
  .chain(users)
  .sortBy('age')
  .map(function(o) {
    return o.user + ' is ' + o.age;
  })
  .head()
  .value();
// => 'pebbles is 1'
```

Try in REPL

### `_.tap(value, interceptor)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8618)

这个方法调用一个 `interceptor` 并返回 `value`。`interceptor`调用1个参数： *(value)*。 该方法的目的是 进入 方法链序列以便修改中间结果。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 提供给 `interceptor` 的值。
2. `interceptor` *(Function)*: 用来调用的函数。

#### 返回

*(\*)*: 返回 `value`.

#### 例子

```
_([1, 2, 3])
 .tap(function(array) {
// 改变传入的数组
   array.pop();
 })
 .reverse()
 .value();
// => [2, 1]
```

Try in REPL

### `_.thru(value, interceptor)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8646)

这个方法类似 [`_.tap`](https://www.lodashjs.com/docs/latest#tap)， 除了它返回 `interceptor` 的返回结果。该方法的目的是"传递" 值到一个方法链序列以取代中间结果。

#### 添加版本

3.0.0

#### 参数

1. `value` *(\*)*: 提供给 `interceptor` 的值。
2. `interceptor` *(Function)*: 用来调用的函数。

#### 返回

*(\*)*: 返回 `interceptor` 的返回结果。

#### 例子

```
_('  abc  ')
 .chain()
 .trim()
 .thru(function(value) {
   return [value];
 })
 .value();
// => ['abc']
```

Try in REPL

### `_.prototype`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8801)

启用包装对象为 iterable。

#### 添加版本

4.0.0

#### 返回

*(Object)*: 返回包装对象。

#### 例子

```
var wrapped = _([1, 2]);
 
wrapped[Symbol.iterator]() === wrapped;
// => true
 
Array.from(wrapped);
// => [1, 2]
```

Try in REPL

### `_.prototype.at([paths])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8666)

这个方法是 [`_.at`](https://www.lodashjs.com/docs/latest#at) 的包装版本 。

#### 添加版本

1.0.0

#### 参数

1. `[paths]` *(...(string|string[]))*: 要选择元素的属性路径（ 单独指定或者数组）。

#### 返回

*(Object)*: 返回 `lodash` 的包装实例。

#### 例子

```
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 
_(object).at(['a[0].b.c', 'a[1]']).value();
// => [3, 4]
```

Try in REPL

### `_.prototype.chain()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8717)

创建一个`lodash`包装实例，启用显式链模式。

#### 添加版本

0.1.0

#### 返回

*(Object)*: 返回 `lodash` 的包装实例。

#### 例子

```
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];
 
// 不启用显式链
_(users).head();
// => { 'user': 'barney', 'age': 36 }
 
// 启用显式链
_(users)
  .chain()
  .head()
  .pick('user')
  .value();
// => { 'user': 'barney' }
```

Try in REPL

### `_.prototype.commit()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8747)

执行链式队列并返回结果。

#### 添加版本

3.2.0

#### 返回

*(Object)*: 返回 `lodash` 的包装实例。

#### 例子

```
var array = [1, 2];
var wrapped = _(array).push(3);
 
console.log(array);
// => [1, 2]
 
wrapped = wrapped.commit();
console.log(array);
// => [1, 2, 3]
 
wrapped.last();
// => 3
 
console.log(array);
// => [1, 2, 3]
```

Try in REPL

### `_.prototype.next()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8773)

获得包装对象的下一个值，遵循 [iterator protocol](https://mdn.io/iteration_protocols#iterator)。

#### 添加版本

4.0.0

#### 返回

*(Object)*: 返回下一个 iterator 值。

#### 例子

```
var wrapped = _([1, 2]);
 
wrapped.next();
// => { 'done': false, 'value': 1 }
 
wrapped.next();
// => { 'done': false, 'value': 2 }
 
wrapped.next();
// => { 'done': true, 'value': undefined }
```

Try in REPL

### `_.prototype.plant(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8829)

创建一个链式队列的拷贝，传入的 `value` 作为链式队列的值。

#### 添加版本

3.2.0

#### 参数

1. `value` *(\*)*: 替换原值的值。

#### 返回

*(Object)*: 返回 `lodash` 的包装实例。

#### 例子

```
function square(n) {
  return n * n;
}
 
var wrapped = _([1, 2]).map(square);
var other = wrapped.plant([3, 4]);
 
other.value();
// => [9, 16]
 
wrapped.value();
// => [1, 4]
```

Try in REPL

### `_.prototype.reverse()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8869)

这个方法是 [`_.reverse`](https://www.lodashjs.com/docs/latest#reverse) 的包装版本 。

**注意:** 这种方法会改变包装数组。

#### 添加版本

0.1.0

#### 返回

*(Object)*: 返回新的 `lodash` 包装实例。

#### 例子

```
var array = [1, 2, 3];
 
_(array).reverse().value()
// => [3, 2, 1]
 
console.log(array);
// => [3, 2, 1]
```

Try in REPL

### `_.prototype.value()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L8901)

执行链式队列并提取解链后的值。

#### 添加版本

0.1.0

#### Aliases

*_.prototype.toJSON, _.prototype.valueOf*

#### 返回

*(\*)*: 返回解链后的值。

#### 例子

```
_([1, 2, 3]).value();
// => [1, 2, 3]
```

Try in REPL

## `“String” Methods`

### `_.camelCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13930) [Ⓝ](https://www.npmjs.com/package/lodash.camelcase)

转换字符串`string`为 [驼峰写法](https://en.wikipedia.org/wiki/CamelCase)。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回驼峰写法的字符串。

#### 例子

```
_.camelCase('Foo Bar');
// => 'fooBar'
 
_.camelCase('--foo-bar--');
// => 'fooBar'
 
_.camelCase('__FOO_BAR__');
// => 'fooBar'
```

Try in REPL

### `_.capitalize([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13950) [Ⓝ](https://www.npmjs.com/package/lodash.capitalize)

转换字符串`string`首字母为大写，剩下为小写。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要大写开头的字符串。

#### 返回

*(string)*: 返回大写开头的字符串。

#### 例子

```
_.capitalize('FRED');
// => 'Fred'
```

Try in REPL

### `_.deburr([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L13972) [Ⓝ](https://www.npmjs.com/package/lodash.deburr)

转换字符串`string`中 [拉丁语-1补充字母](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table) 和 [拉丁语扩展字母-A](https://en.wikipedia.org/wiki/Latin_Extended-A) 为基本的拉丁字母，并且去除组合变音标记。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要处理的字符串。

#### 返回

*(string)*: 返回处理后的字符串。

#### 例子

```
_.deburr('déjà vu');
// => 'deja vu'
```

Try in REPL

### `_.endsWith([string=''], [target], [position=string.length])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14000) [Ⓝ](https://www.npmjs.com/package/lodash.endswith)

检查字符串`string`是否以给定的`target`字符串结尾。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要检索的字符串。
2. `[target]` *(string)*: 要检索字符。
3. `[position=string.length]` *(number)*: 检索的位置。

#### 返回

*(boolean)*: 如果字符串`string`以`target`字符串结尾，那么返回 `true`，否则返回 `false`。

#### 例子

```
_.endsWith('abc', 'c');
// => true
 
_.endsWith('abc', 'b');
// => false
 
_.endsWith('abc', 'b', 2);
// => true
```

### `_.escape([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14042) [Ⓝ](https://www.npmjs.com/package/lodash.escape)

转义`string`中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。

**注意:** 不会转义其他字符。如果需要，可以使用第三方库，例如 [*he*](https://mths.be/he)。

虽然 ">" 是对称转义的，字符如 ">" 和 "/" 没有特殊的意义，所以不需要在 HTML 转义。 除非它们是标签的一部分，或者是不带引号的属性值。 查看 [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands) 的文章 *(under "semi-related fun fact")* 了解详情 。

在 IE < `9` 中转义引号，因为会中断属性值或 HTML 注释，查看 [HTML5 Security Cheatsheet](https://html5sec.org/) 的 [#59](https://html5sec.org/#59), [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), 和 [#133](https://html5sec.org/#133), 以及 [#133](https://html5sec.org/#133) 了解详情。

当解析 HTML 时，总应该在 [属性值上使用引号](http://wonko.com/post/html-escaping) 以减少 XSS 的可能性。

#### 添加版本

0.1.0

#### 参数

1. `[string='']` *(string)*: 要转义的字符串。

#### 返回

*(string)*: 返回转义后的字符串。

#### 例子

```
_.escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```

Try in REPL

### `_.escapeRegExp([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14064) [Ⓝ](https://www.npmjs.com/package/lodash.escaperegexp)

转义 `RegExp` 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" in .

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要转义的字符串。

#### 返回

*(string)*: 返回转义后的字符串。

#### 例子

```
_.escapeRegExp('[lodash](https://lodash.com/)');
// => '\[lodash\]\(https://lodash\.com/\)'
```

Try in REPL

### `_.kebabCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14092) [Ⓝ](https://www.npmjs.com/package/lodash.kebabcase)

转换字符串`string`为 [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.kebabCase('Foo Bar');
// => 'foo-bar'
 
_.kebabCase('fooBar');
// => 'foo-bar'
 
_.kebabCase('__FOO_BAR__');
// => 'foo-bar'
```

Try in REPL

### `_.lowerCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14116) [Ⓝ](https://www.npmjs.com/package/lodash.lowercase)

转换字符串`string`以空格分开单词，并转换为小写。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.lowerCase('--Foo-Bar--');
// => 'foo bar'
 
_.lowerCase('fooBar');
// => 'foo bar'
 
_.lowerCase('__FOO_BAR__');
// => 'foo bar'
```

Try in REPL

### `_.lowerFirst([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14137) [Ⓝ](https://www.npmjs.com/package/lodash.lowerfirst)

转换字符串`string`的首字母为小写。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.lowerFirst('Fred');
// => 'fred'
 
_.lowerFirst('FRED');
// => 'fRED'
```

Try in REPL

### `_.pad([string=''], [length=0], [chars=' '])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14162) [Ⓝ](https://www.npmjs.com/package/lodash.pad)

如果`string`字符串长度小于 `length` 则从左侧和右侧填充字符。 如果没法平均分配，则截断超出的长度。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要填充的字符串。
2. `[length=0]` *(number)*: 填充的长度。
3. `[chars=' ']` *(string)*: 填充字符。

#### 返回

*(string)*: 返回填充后的字符串。

#### 例子

```
_.pad('abc', 8);
// => '  abc   '
 
_.pad('abc', 8, '_-');
// => '_-abc_-_'
 
_.pad('abc', 3);
// => 'abc'
```

Try in REPL

### `_.padEnd([string=''], [length=0], [chars=' '])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14201) [Ⓝ](https://www.npmjs.com/package/lodash.padend)

如果`string`字符串长度小于 `length` 则在右侧填充字符。 如果超出`length`长度则截断超出的部分。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要填充的字符串。
2. `[length=0]` *(number)*: 填充的长度。
3. `[chars=' ']` *(string)*: 填充字符。

#### 返回

*(string)*: 返回填充后的字符串。

#### 例子

```
_.padEnd('abc', 6);
// => 'abc   '
 
_.padEnd('abc', 6, '_-');
// => 'abc_-_'
 
_.padEnd('abc', 3);
// => 'abc'
```

Try in REPL

### `_.padStart([string=''], [length=0], [chars=' '])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14234) [Ⓝ](https://www.npmjs.com/package/lodash.padstart)

如果`string`字符串长度小于 `length` 则在左侧填充字符。 如果超出`length`长度则截断超出的部分。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要填充的字符串。
2. `[length=0]` *(number)*: 填充的长度。
3. `[chars=' ']` *(string)*: 填充字符。

#### 返回

*(string)*: 返回填充后的字符串。

#### 例子

```
_.padStart('abc', 6);
// => '   abc'
 
_.padStart('abc', 6, '_-');
// => '_-_abc'
 
_.padStart('abc', 3);
// => 'abc'
```

Try in REPL

### `_.parseInt(string, [radix=10])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14268) [Ⓝ](https://www.npmjs.com/package/lodash.parseint)

转换`string`字符串为指定基数的整数。 如果基数是 `undefined` 或者 `0`，则`radix`基数默认是`10`，如果`string`字符串是16进制，则`radix`基数为 `16`。

**注意:** 这个方法与 [ES5 implementation](https://es5.github.io/#x15.1.2.2) 的 `parseInt`是一样的。

#### 添加版本

1.1.0

#### 参数

1. `string` *(string)*: 要转换的字符串。
2. `[radix=10]` *(number)*:转换基数。

#### 返回

*(number)*: 返回转换后的整数。

#### 例子

```
_.parseInt('08');
// => 8
 
_.map(['6', '08', '10'], _.parseInt);
// => [6, 8, 10]
```

Try in REPL

### `_.repeat([string=''], [n=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14299) [Ⓝ](https://www.npmjs.com/package/lodash.repeat)

重复 N 次给定字符串。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要重复的字符串。
2. `[n=1]` *(number)*: 重复的次数。

#### 返回

*(string)*: 返回重复的字符串。

#### 例子

```
_.repeat('*', 3);
// => '***'
 
_.repeat('abc', 2);
// => 'abcabc'
 
_.repeat('abc', 0);
// => ''
```

Try in REPL

### `_.replace([string=''], pattern, replacement)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14327) [Ⓝ](https://www.npmjs.com/package/lodash.replace)

替换`string`字符串中匹配的`pattern`为给定的`replacement` 。

**注意:** 这个方法基于 [`String#replace`](https://mdn.io/String/replace).

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 待替换的字符串。
2. `pattern` *(RegExp|string)*: 要匹配的内容。
3. `replacement` *(Function|string)*: 替换的内容。

#### 返回

*(string)*: 返回替换后的字符串

#### 例子

```
_.replace('Hi Fred', 'Fred', 'Barney');
// => 'Hi Barney'
```

Try in REPL

### `_.snakeCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14355) [Ⓝ](https://www.npmjs.com/package/lodash.snakecase)

转换字符串`string`为 [snake case](https://en.wikipedia.org/wiki/Snake_case).

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.snakeCase('Foo Bar');
// => 'foo_bar'
 
_.snakeCase('fooBar');
// => 'foo_bar'
 
_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
```

Try in REPL

### `_.split([string=''], separator, [limit])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14378) [Ⓝ](https://www.npmjs.com/package/lodash.split)

根据`separator` 拆分字符串`string`。

**注意:** 这个方法基于 [`String#split`](https://mdn.io/String/split).

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要拆分的字符串。
2. `separator` *(RegExp|string)*: 拆分的分隔符。
3. `[limit]` *(number)*: 限制结果的数量。

#### 返回

*(Array)*: 返回拆分部分的字符串的数组。

#### 例子

```
_.split('a-b-c', '-', 2);
// => ['a', 'b']
```

Try in REPL

### `_.startCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14420) [Ⓝ](https://www.npmjs.com/package/lodash.startcase)

转换 `string` 字符串为 [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).

#### 添加版本

3.1.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.startCase('--foo-bar--');
// => 'Foo Bar'
 
_.startCase('fooBar');
// => 'Foo Bar'
 
_.startCase('__FOO_BAR__');
// => 'FOO BAR'
```

Try in REPL

### `_.startsWith([string=''], [target], [position=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14447) [Ⓝ](https://www.npmjs.com/package/lodash.startswith)

检查字符串`string`是否以 `target` 开头。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要检索的字符串。
2. `[target]` *(string)*: 要检查的字符串。
3. `[position=0]` *(number)*: 检索的位置。

#### 返回

*(boolean)*: 如果`string`以 `target`，那么返回`true`，否则返回 `false` 。

#### 例子

```
_.startsWith('abc', 'a');
// => true
 
_.startsWith('abc', 'b');
// => false
 
_.startsWith('abc', 'b', 1);
// => true
```

Try in REPL

### `_.template([string=''], [options={}])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14558) [Ⓝ](https://www.npmjs.com/package/lodash.template)

创建一个预编译模板方法，可以插入数据到模板中 "interpolate" 分隔符相应的位置。 HTML会在 "escape" 分隔符中转换为相应实体。 在 "evaluate" 分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖 [`_.templateSettings`](https://www.lodashjs.com/docs/latest#templateSettings) 的值。

**注意:** 在开发过程中，构建 [`_.template`](https://www.lodashjs.com/docs/latest#template)可以使用 [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)， 便于调试。

了解更多预编译模板的信息查看 [lodash的自定义构建文档](https://lodash.com/custom-builds)。

了解更多 Chrome 沙箱扩展的信息查看 [Chrome的扩展文档](https://developer.chrome.com/extensions/sandboxingEval)。

#### 添加版本

0.1.0

#### 参数

1. `[string='']` *(string)*: 模板字符串.
2. `[options={}]` *(Object)*: 选项对象.
3. `[options.escape=_.templateSettings.escape]` *(RegExp)*: "escape" 分隔符.
4. `[options.evaluate=_.templateSettings.evaluate]` *(RegExp)*: "evaluate" 分隔符.
5. `[options.imports=_.templateSettings.imports]` *(Object)*: 导入对象到模板中作为自由变量。
6. `[options.interpolate=_.templateSettings.interpolate]` *(RegExp)*: "interpolate" 分隔符。
7. `[options.sourceURL='lodash.templateSources[n]']` *(string)*: 模板编译的来源URL。
8. `[options.variable='obj']` *(string)*: 数据对象的变量名。

#### 返回

*(Function)*: 返回编译模板函数。

#### 例子

```
// 使用 "interpolate" 分隔符创建编译模板
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'
 
// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'
 
// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'
 
// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'
 
// 使用反斜杠符号作为纯文本处理
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'
 
// 使用 `imports` 选项导入 `jq` 作为 `jQuery` 的别名
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 使用 `sourceURL` 选项指定模板的来源URL
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => 在开发工具的 Sources 选项卡 或 Resources 面板中找到 "greeting.jst"
 
// 使用 `variable` 选项确保在编译模板中不声明变量
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }
 
// 使用 `source` 特性内联编译模板
// 便以查看行号、错误信息、堆栈
fs.writeFileSync(path.join(cwd, 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');
```

Try in REPL

### `_.toLower([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14687) [Ⓝ](https://www.npmjs.com/package/lodash.tolower)

转换整个`string`字符串的字符为小写，类似 [String#toLowerCase](https://mdn.io/toLowerCase)。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回小写的字符串。

#### 例子

```
_.toLower('--Foo-Bar--');
// => '--foo-bar--'
 
_.toLower('fooBar');
// => 'foobar'
 
_.toLower('__FOO_BAR__');
// => '__foo_bar__'
```

Try in REPL

### `_.toUpper([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14712) [Ⓝ](https://www.npmjs.com/package/lodash.toupper)

转换整个`string`字符串的字符为大写，类似 [String#toUpperCase](https://mdn.io/toUpperCase).

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回大写的字符串。

#### 例子

```
_.toUpper('--foo-bar--');
// => '--FOO-BAR--'
 
_.toUpper('fooBar');
// => 'FOOBAR'
 
_.toUpper('__foo_bar__');
// => '__FOO_BAR__'
```

Try in REPL

### `_.trim([string=''], [chars=whitespace])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14738) [Ⓝ](https://www.npmjs.com/package/lodash.trim)

从`string`字符串中移除前面和后面的 空格 或 指定的字符。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要处理的字符串。
2. `[chars=whitespace]` *(string)*: 要移除的字符。

#### 返回

*(string)*: 返回处理后的字符串。

#### 例子

```
_.trim('  abc  ');
// => 'abc'
 
_.trim('-_-abc-_-', '_-');
// => 'abc'
 
_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar']
```

Try in REPL

### `_.trimEnd([string=''], [chars=whitespace])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14773) [Ⓝ](https://www.npmjs.com/package/lodash.trimend)

从`string`字符串中移除后面的 空格 或 指定的字符。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要处理的字符串。
2. `[chars=whitespace]` *(string)*: 要移除的字符。

#### 返回

*(string)*: 返回处理后的字符串。

#### 例子

```
_.trimEnd('  abc  ');
// => '  abc'
 
_.trimEnd('-_-abc-_-', '_-');
// => '-_-abc'
```

Try in REPL

### `_.trimStart([string=''], [chars=whitespace])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14806) [Ⓝ](https://www.npmjs.com/package/lodash.trimstart)

从`string`字符串中移除前面的 空格 或 指定的字符。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要处理的字符串。
2. `[chars=whitespace]` *(string)*: 要移除的字符。

#### 返回

*(string)*: 返回处理后的字符串。

#### 例子

```
_.trimStart('  abc  ');
// => 'abc  '
 
_.trimStart('-_-abc-_-', '_-');
// => 'abc-_-'
```

Try in REPL

### `_.truncate([string=''], [options={}])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14857) [Ⓝ](https://www.npmjs.com/package/lodash.truncate)

截断`string`字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要截断的字符串。
2. `[options={}]` *(Object)*: 选项对象。
3. `[options.length=30]` *(number)*: 允许的最大长度。
4. `[options.omission='...']` *(string)*: 超出后的代替字符。
5. `[options.separator]` *(RegExp|string)*: 截断点。

#### 返回

*(string)*: Returns the truncated string.

#### 例子

```
_.truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
```

Try in REPL

### `_.unescape([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14932) [Ⓝ](https://www.npmjs.com/package/lodash.unescape)

[`_.escape`](https://www.lodashjs.com/docs/latest#escape)的反向版。 这个方法转换`string`字符串中的 HTML 实体 `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, 和 `&#96;` 为对应的字符。

注意: 不会转换其他的 HTML 实体，需要转换可以使用类似 he 的第三方库。

**注意:** 不会转换其他的 HTML 实体，需要转换可以使用第三方库，类似 [*he*](https://mths.be/he)。

#### 添加版本

0.6.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.unescape('fred, barney, &amp; pebbles');
// => 'fred, barney, & pebbles'
```

Try in REPL

### `_.upperCase([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14959) [Ⓝ](https://www.npmjs.com/package/lodash.uppercase)

转换字符串`string`为 空格 分隔的大写单词。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回大写单词。

#### 例子

```
_.upperCase('--foo-bar');
// => 'FOO BAR'
 
_.upperCase('fooBar');
// => 'FOO BAR'
 
_.upperCase('__foo_bar__');
// => 'FOO BAR'
```

Try in REPL

### `_.upperFirst([string=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L14980) [Ⓝ](https://www.npmjs.com/package/lodash.upperfirst)

转换字符串`string`的首字母为大写。

#### 添加版本

4.0.0

#### 参数

1. `[string='']` *(string)*: 要转换的字符串。

#### 返回

*(string)*: 返回转换后的字符串。

#### 例子

```
_.upperFirst('fred');
// => 'Fred'
 
_.upperFirst('FRED');
// => 'FRED'
```

Try in REPL

### `_.words([string=''], [pattern])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15001) [Ⓝ](https://www.npmjs.com/package/lodash.words)

拆分字符串`string`中的词为数组 。

#### 添加版本

3.0.0

#### 参数

1. `[string='']` *(string)*: 要拆分的字符串。
2. `[pattern]` *(RegExp|string)*: 匹配模式。

#### 返回

*(Array)*: 返回拆分`string`后的数组。

#### 例子

```
_.words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']
 
_.words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```

Try in REPL

## `“Util” Methods`

### `_.attempt(func, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15035) [Ⓝ](https://www.npmjs.com/package/lodash.attempt)

尝试调用`func`，返回结果 或者 捕捉错误对象。任何附加的参数都会在调用时传给`func`。

#### 添加版本

3.0.0

#### 参数

1. `func` *(Function)*: 要尝试调用的函数。
2. `[args]` *(...\*)*: 调用`func`时，传递的参数。

#### 返回

*(\*)*: 返回`func`结果或者错误对象。

#### 例子

```
// Avoid throwing errors for invalid selectors.
var elements = _.attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
 
if (_.isError(elements)) {
  elements = [];
}
```

Try in REPL

### `_.bindAll(object, methodNames)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15069) [Ⓝ](https://www.npmjs.com/package/lodash.bindall)

绑定一个对象的方法到对象本身，覆盖现有的方法。

**注意:** 这个方法不会设置绑定函数的 "length" 属性。

#### 添加版本

0.1.0

#### 参数

1. `object` *(Object)*: 用来绑定和分配绑定方法的对象。
2. `methodNames` *(...(string|string[]))*: 对象绑定方法的名称。

#### 返回

*(Object)*: 返回 `object`.

#### 例子

```
var view = {
  'label': 'docs',
  'click': function() {
    console.log('clicked ' + this.label);
  }
};
 
_.bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => Logs 'clicked docs' when clicked.
```

Try in REPL

### `_.cond(pairs)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15106) [Ⓝ](https://www.npmjs.com/package/lodash.cond)

创建了一个函数，这个函数会迭代`pairs`，并调用最先返回真值对应的函数。该断言函数对绑定 `this` 及传入创建函数的参数。

#### 添加版本

4.0.0

#### 参数

1. `pairs` *(Array)*: 断言函数对。

#### 返回

*(Function)*: 返回新的复合函数。

#### 例子

```
var func = _.cond([
  [_.matches({ 'a': 1 }),           _.constant('matches A')],
  [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
  [_.stubTrue,                      _.constant('no match')]
]);
 
func({ 'a': 1, 'b': 2 });
// => 'matches A'
 
func({ 'a': 0, 'b': 1 });
// => 'matches B'
 
func({ 'a': '1', 'b': '2' });
// => 'no match'
```

Try in REPL

### `_.conforms(source)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15152) [Ⓝ](https://www.npmjs.com/package/lodash.conforms)

创建一个函数。 这个函数会 调用 `source` 的属性名对应的 predicate 与传入对象相对应属性名的值进行断言处理。 如果都符合返回 `true` ，否则返回 `false` 。

**注意:** 当`source`为偏应用时，这种方法等价于 [`_.conformsTo`](https://www.lodashjs.com/docs/latest#conformsTo)。（关于偏应用大家可以自己到google上搜索一下）。

#### 添加版本

4.0.0

#### 参数

1. `source` *(Object)*: 包含断言属性值的对象。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var objects = [
  { 'a': 2, 'b': 1 },
  { 'a': 1, 'b': 2 }
];
 
_.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
// => [{ 'a': 1, 'b': 2 }]
```

Try in REPL

### `_.constant(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15175) [Ⓝ](https://www.npmjs.com/package/lodash.constant)

创建一个返回 `value` 的函数。

#### 添加版本

2.4.0

#### 参数

1. `value` *(\*)*: 要新函数返回的值。

#### 返回

*(Function)*: 返回新的常量函数。

#### 例子

```
var objects = _.times(2, _.constant({ 'a': 1 }));
 
console.log(objects);
// => [{ 'a': 1 }, { 'a': 1 }]
 
console.log(objects[0] === objects[1]);
// => true
```

Try in REPL

### `_.defaultTo(value, defaultValue)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15201) [Ⓝ](https://www.npmjs.com/package/lodash.defaultto)

检查`value`，以确定一个默认值是否应被返回。如果`value`为`NaN`, `null`, 或者 `undefined`，那么返回`defaultValue`默认值。

#### 添加版本

4.14.0

#### 参数

1. `value` *(\*)*: 要检查的值。
2. `defaultValue` *(\*)*: 默认值。

#### 返回

*(\*)*: 返回 resolved 值。

#### 例子

```
_.defaultTo(1, 10);
// => 1
 
_.defaultTo(undefined, 10);
// => 10
```

Try in REPL

### `_.flow([funcs])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15227) [Ⓝ](https://www.npmjs.com/package/lodash.flow)

创建一个函数。 返回的结果是调用提供函数的结果，`this` 会绑定到创建函数。 每一个连续调用，传入的参数都是前一个函数返回的结果。

#### 添加版本

3.0.0

#### 参数

1. `[funcs]` *(...(Function|Function[]))*: 要调用的函数。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
function square(n) {
  return n * n;
}
 
var addSquare = _.flow([_.add, square]);
addSquare(1, 2);
// => 9
```

Try in REPL

### `_.flowRight([funcs])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15250) [Ⓝ](https://www.npmjs.com/package/lodash.flowright)

这个方法类似 [`_.flow`](https://www.lodashjs.com/docs/latest#flow)，除了它调用函数的顺序是从右往左的。

#### 添加版本

3.0.0

#### 参数

1. `[funcs]` *(...(Function|Function[]))*: 要调用的函数。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
function square(n) {
  return n * n;
}
 
var addSquare = _.flowRight([square, _.add]);
addSquare(1, 2);
// => 9
```

Try in REPL

### `_.identity(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15268) [Ⓝ](https://www.npmjs.com/package/lodash.identity)

这个方法返回首个提供的参数。

#### 添加版本

0.1.0

#### 参数

1. `value` *(\*)*: 任何值。

#### 返回

*(\*)*: 返回 `value`.

#### 例子

```
var object = { 'a': 1 };
 
console.log(_.identity(object) === object);
// => true
```

Try in REPL

### `_.iteratee([func=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15314) [Ⓝ](https://www.npmjs.com/package/lodash.iteratee)

创建一个函数，通过创建函数的参数调用 `func` 函数。 如果 `func` 是一个属性名，传入包含这个属性名的对象，回调返回对应属性名的值。 如果 `func` 是一个对象，传入的元素有相同的对象属性，回调返回 `true` 。 其他情况返回 `false` 。

#### 添加版本

4.0.0

#### 参数

1. `[func=_.identity]` *(\*)*: 转换成 callback 的值。

#### 返回

*(Function)*: 返回回调函数 callback。

#### 例子

```
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
// => [{ 'user': 'barney', 'age': 36, 'active': true }]
 
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, _.iteratee(['user', 'fred']));
// => [{ 'user': 'fred', 'age': 40 }]
 
// The `_.property` iteratee shorthand.
_.map(users, _.iteratee('user'));
// => ['barney', 'fred']
 
// Create custom iteratee shorthands.
_.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
  return !_.isRegExp(func) ? iteratee(func) : function(string) {
    return func.test(string);
  };
});
 
_.filter(['abc', 'def'], /ef/);
// => ['def']
```

Try in REPL

### `_.matches(source)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15346) [Ⓝ](https://www.npmjs.com/package/lodash.matches)

创建一个深比较的方法来比较给定的对象和 `source` 对象。 如果给定的对象拥有相同的属性值返回 `true`，否则返回 `false`。

**注意:** 创建的函数相当于 [`_.isMatch`](https://www.lodashjs.com/docs/latest#isMatch)应用 `source` 。

部分比较匹配空数组和空对象源值，分别针对任何数组或对象的价值。见 [`_.isEqual`](https://www.lodashjs.com/docs/latest#isEqual)支持的价值比较的列表。

#### 添加版本

3.0.0

#### 参数

1. `source` *(Object)*: 要匹配属性值的源对象。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];
 
_.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```

Try in REPL

### `_.matchesProperty(path, srcValue)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15376) [Ⓝ](https://www.npmjs.com/package/lodash.matchesproperty)

创建一个深比较的方法来比较给定对象的 `path` 的值是否是 `srcValue` 。 如果是返回 `true` ，否则返回 `false` 。

**注意:** 这个方法支持以 [`_.isEqual`](https://www.lodashjs.com/docs/latest#isEqual) 的方式比较相同的值。

#### 添加版本

3.2.0

#### 参数

1. `path` *(Array|string)*: 给定对象的属性路径名。
2. `srcValue` *(\*)*: 要匹配的值。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];
 
_.find(objects, _.matchesProperty('a', 4));
// => { 'a': 4, 'b': 5, 'c': 6 }
```

Try in REPL

### `_.method(path, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15404) [Ⓝ](https://www.npmjs.com/package/lodash.method)

创建一个调用给定对象 `path` 上的函数。 任何附加的参数都会传入这个调用函数中。

#### 添加版本

3.7.0

#### 参数

1. `path` *(Array|string)*: 调用函数所在对象的路径。
2. `[args]` *(...\*)*: 传递给调用函数的参数。

#### 返回

*(Function)*: 返回新的调用函数。

#### 例子

```
var objects = [
  { 'a': { 'b': _.constant(2) } },
  { 'a': { 'b': _.constant(1) } }
];
 
_.map(objects, _.method('a.b'));
// => [2, 1]
 
_.map(objects, _.method(['a', 'b']));
// => [2, 1]
```

Try in REPL

### `_.methodOf(object, [args])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15433) [Ⓝ](https://www.npmjs.com/package/lodash.methodof)

[`_.method`](https://www.lodashjs.com/docs/latest#method)的反向版。 这个创建一个函数调用给定 `object` 的 path 上的方法， 任何附加的参数都会传入这个调用函数中。

#### 添加版本

3.7.0

#### 参数

1. `object` *(Object)*: 要检索的对象。
2. `[args]` *(...\*)*: 传递给调用函数的参数。

#### 返回

*(Function)*: 返回新的调用函数。

#### 例子

```
var array = _.times(3, _.constant),
    object = { 'a': array, 'b': array, 'c': array };
 
_.map(['a[2]', 'c[0]'], _.methodOf(object));
// => [2, 0]
 
_.map([['a', '2'], ['c', '0']], _.methodOf(object));
// => [2, 0]
```

Try in REPL

### `_.mixin([object=lodash], source, [options={}])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15475) [Ⓝ](https://www.npmjs.com/package/lodash.mixin)

添加来源对象自身的所有可枚举函数属性到目标对象。 如果 `object` 是个函数，那么函数方法将被添加到原型链上。

**注意:** 使用 [`_.runInContext`](https://www.lodashjs.com/docs/latest#runInContext) 来创建原始的 `lodash` 函数来避免修改造成的冲突。

#### 添加版本

0.1.0

#### 参数

1. `[object=lodash]` *(Function|Object)*: 目标对象。
2. `source` *(Object)*: 来源对象。
3. `[options={}]` *(Object)*: 选项对象。
4. `[options.chain=true]` *(boolean)*: 是否开启链式操作。

#### 返回

*(\*)*: 返回 `object`.

#### 例子

```
function vowels(string) {
  return _.filter(string, function(v) {
    return /[aeiou]/i.test(v);
  });
}
 
_.mixin({ 'vowels': vowels });
_.vowels('fred');
// => ['e']
 
_('fred').vowels().value();
// => ['e']
 
_.mixin({ 'vowels': vowels }, { 'chain': false });
_('fred').vowels();
// => ['e']
```

Try in REPL

### `_.noConflict()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15524) [Ⓝ](https://www.npmjs.com/package/lodash.noconflict)

释放 `_` 变量为原来的值，并返回一个 `lodash` 的引用。

#### 添加版本

0.1.0

#### 返回

*(Function)*: 返回 `lodash` 函数。

#### 例子

```
var lodash = _.noConflict();
```

Try in REPL

### `_.noop()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15543) [Ⓝ](https://www.npmjs.com/package/lodash.noop)

这个方法返回 `undefined`。

#### 添加版本

2.3.0

#### 例子

```
_.times(2, _.noop);
// => [undefined, undefined]
```

Try in REPL

### `_.nthArg([n=0])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15567) [Ⓝ](https://www.npmjs.com/package/lodash.ntharg)

创建一个函数，这个函数返回第 `n` 个参数。如果 `n`为负数，则返回从结尾开始的第n个参数。

#### 添加版本

4.0.0

#### 参数

1. `[n=0]` *(number)*: 要返回参数的索引值。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var func = _.nthArg(1);
func('a', 'b', 'c', 'd');
// => 'b'
 
var func = _.nthArg(-2);
func('a', 'b', 'c', 'd');
// => 'c'
```

Try in REPL

### `_.over([iteratees=[_.identity]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15592) [Ⓝ](https://www.npmjs.com/package/lodash.over)

创建一个函数，传入提供的参数的函数并调用 `iteratees` 返回结果。

#### 添加版本

4.0.0

#### 参数

1. `[iteratees=[_.identity]]` *(...(Function|Function[]))*: 要调用的 iteratees。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var func = _.over([Math.max, Math.min]);
 
func(1, 2, 3, 4);
// => [4, 1]
```

Try in REPL

### `_.overEvery([predicates=[_.identity]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15618) [Ⓝ](https://www.npmjs.com/package/lodash.overevery)

建一个函数，传入提供的参数的函数并调用 `predicates` 判断是否 **全部** 都为真值。

#### 添加版本

4.0.0

#### 参数

1. `[predicates=[_.identity]]` *(...(Function|Function[]))*: 要调用的 predicates。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var func = _.overEvery([Boolean, isFinite]);
 
func('1');
// => true
 
func(null);
// => false
 
func(NaN);
// => false
```

Try in REPL

### `_.overSome([predicates=[_.identity]])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15644) [Ⓝ](https://www.npmjs.com/package/lodash.oversome)

创建一个函数，传入提供的参数的函数并调用 `predicates` 判断是否 **存在** 有真值。

#### 添加版本

4.0.0

#### 参数

1. `[predicates=[_.identity]]` *(...(Function|Function[]))*: 要调用的 predicates。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var func = _.overSome([Boolean, isFinite]);
 
func('1');
// => true
 
func(null);
// => true
 
func(NaN);
// => false
```

Try in REPL

### `_.property(path)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15668) [Ⓝ](https://www.npmjs.com/package/lodash.property)

创建一个返回给定对象的 `path` 的值的函数。

#### 添加版本

2.4.0

#### 参数

1. `path` *(Array|string)*: 要得到值的属性路径。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];
 
_.map(objects, _.property('a.b'));
// => [2, 1]
 
_.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
// => [1, 2]
```

Try in REPL

### `_.propertyOf(object)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15693) [Ⓝ](https://www.npmjs.com/package/lodash.propertyof)

[`_.property`](https://www.lodashjs.com/docs/latest#property)的反相版本。 这个方法创建的函数返回给定 path 在`object`上的值。

#### 添加版本

3.0.0

#### 参数

1. `object` *(Object)*: 要检索的对象。

#### 返回

*(Function)*: 返回新的函数。

#### 例子

```
var array = [0, 1, 2],
    object = { 'a': array, 'b': array, 'c': array };
 
_.map(['a[2]', 'c[0]'], _.propertyOf(object));
// => [2, 0]
 
_.map([['a', '2'], ['c', '0']], _.propertyOf(object));
// => [2, 0]
```

Try in REPL

### `_.range([start=0], end, [step=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15740) [Ⓝ](https://www.npmjs.com/package/lodash.range)

创建一个包含从 `start` 到 `end`，但不包含 `end` 本身范围数字的数组。 如果 `start` 是负数，而 `end` 或 `step` 没有指定，那么 `step` 从 `-1` 为开始。 如果 `end` 没有指定，`start` 设置为 `0`。 如果 `end` 小于 `start` ，会创建一个空数组，除非指定了 `step`。

**注意::** JavaScript 遵循 IEEE-754 标准处理无法预料的浮点数结果。

#### 添加版本

0.1.0

#### 参数

1. `[start=0]` *(number)*: 开始的范围。
2. `end` *(number)*: 结束的范围。
3. `[step=1]` *(number)*: 范围的增量 或者 减量。

#### 返回

*(Array)*: 返回范围内数字组成的新数组。

#### 例子

```
_.range(4);
// => [0, 1, 2, 3]
 
_.range(-4);
// => [0, -1, -2, -3]
 
_.range(1, 5);
// => [1, 2, 3, 4]
 
_.range(0, 20, 5);
// => [0, 5, 10, 15]
 
_.range(0, -4, -1);
// => [0, -1, -2, -3]
 
_.range(1, 4, 0);
// => [1, 1, 1]
 
_.range(0);
// => []
```

Try in REPL

### `_.rangeRight([start=0], end, [step=1])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15778) [Ⓝ](https://www.npmjs.com/package/lodash.rangeright)

这个方法类似 [`_.range`](https://www.lodashjs.com/docs/latest#range) ， 除了它是降序生成值的。

#### 添加版本

4.0.0

#### 参数

1. `[start=0]` *(number)*: 开始的范围。
2. `end` *(number)*: 结束的范围。
3. `[step=1]` *(number)*:范围的增量 或者 减量。

#### 返回

*(Array)*: 返回范围内数字组成的新数组。

#### 例子

```
_.rangeRight(4);
// => [3, 2, 1, 0]
 
_.rangeRight(-4);
// => [-3, -2, -1, 0]
 
_.rangeRight(1, 5);
// => [4, 3, 2, 1]
 
_.rangeRight(0, 20, 5);
// => [15, 10, 5, 0]
 
_.rangeRight(0, -4, -1);
// => [-3, -2, -1, 0]
 
_.rangeRight(1, 4, 0);
// => [1, 1, 1]
 
_.rangeRight(0);
// => []
```

Try in REPL

### `_.runInContext([context=root])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1410) [Ⓝ](https://www.npmjs.com/package/lodash.runincontext)

创建一个给定`context`上下文对象的原始的 `lodash` 函数。

#### 添加版本

1.1.0

#### 参数

1. `[context=root]` *(Object)*: 上下文对象。

#### 返回

*(Function)*: 返回新的 `lodash` 对象

#### 例子

```
_.mixin({ 'foo': _.constant('foo') });
 
var lodash = _.runInContext();
lodash.mixin({ 'bar': lodash.constant('bar') });
 
_.isFunction(_.foo);
// => true
_.isFunction(_.bar);
// => false
 
lodash.isFunction(lodash.foo);
// => false
lodash.isFunction(lodash.bar);
// => true
 
// 使用 `context` 模拟 `Date#getTime` 调用 `_.now`
var stubbed = _.runInContext({
  'Date': function() {
    return { 'getTime': stubGetTime };
  }
});
 
// 或者在 Node.js 中创建一个更高级的 `defer`
var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
```

Try in REPL

### `_.stubArray()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15798) [Ⓝ](https://www.npmjs.com/package/lodash.stubarray)

这个方法返回一个新的空数组。

#### 添加版本

4.13.0

#### 返回

*(Array)*: 返回新的空数组。

#### 例子

```
var arrays = _.times(2, _.stubArray);
 
console.log(arrays);
// => [[], []]
 
console.log(arrays[0] === arrays[1]);
// => false
```

Try in REPL

### `_.stubFalse()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15815) [Ⓝ](https://www.npmjs.com/package/lodash.stubfalse)

这个方法返回 `false`.

#### 添加版本

4.13.0

#### 返回

*(boolean)*: 返回 `false`.

#### 例子

```
_.times(2, _.stubFalse);
// => [false, false]
```

Try in REPL

### `_.stubObject()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15837) [Ⓝ](https://www.npmjs.com/package/lodash.stubobject)

这个方法返回一个空对象.

#### 添加版本

4.13.0

#### 返回

*(Object)*: 返回新的空对象。

#### 例子

```
var objects = _.times(2, _.stubObject);
 
console.log(objects);
// => [{}, {}]
 
console.log(objects[0] === objects[1]);
// => false
```

Try in REPL

### `_.stubString()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15854) [Ⓝ](https://www.npmjs.com/package/lodash.stubstring)

这个方法返回一个空字符串。

#### 添加版本

4.13.0

#### 返回

*(string)*: 返回新的空字符串。

#### 例子

```
_.times(2, _.stubString);
// => ['', '']
```

Try in REPL

### `_.stubTrue()`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15871) [Ⓝ](https://www.npmjs.com/package/lodash.stubtrue)

这个方法返回 `true`。

#### 添加版本

4.13.0

#### 返回

*(boolean)*: 返回 `true`。

#### 例子

```
_.times(2, _.stubTrue);
// => [true, true]
```

Try in REPL

### `_.times(n, [iteratee=_.identity])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15894) [Ⓝ](https://www.npmjs.com/package/lodash.times)

调用 iteratee `n` 次，每次调用返回的结果存入到数组中。 iteratee 调用入1个参数： *(index)*。

#### 添加版本

0.1.0

#### 参数

1. `n` *(number)*: 调用 `iteratee` 的次数。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回调用结果的数组。

#### 例子

```
_.times(3, String);
// => ['0', '1', '2']
 
 _.times(4, _.constant(0));
// => [0, 0, 0, 0]
```

Try in REPL

### `_.toPath(value)`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15929) [Ⓝ](https://www.npmjs.com/package/lodash.topath)

转化 `value` 为属性路径的数组 。

#### 添加版本

4.0.0

#### 参数

1. `value` *(\*)*: 要转换的值

#### 返回

*(Array)*: 返回包含属性路径的数组。

#### 例子

```
_.toPath('a.b.c');
// => ['a', 'b', 'c']
 
_.toPath('a[0].b.c');
// => ['a', '0', 'b', 'c']
```

Try in REPL

### `_.uniqueId([prefix=''])`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L15953) [Ⓝ](https://www.npmjs.com/package/lodash.uniqueid)

生成唯一ID。 如果提供了 `prefix` ，会被添加到ID前缀上。

#### 添加版本

0.1.0

#### 参数

1. `[prefix='']` *(string)*: 要添加到ID前缀的值。

#### 返回

*(string)*: 返回唯一ID。

#### 例子

```
_.uniqueId('contact_');
// => 'contact_104'
 
_.uniqueId();
// => '105'
```

Try in REPL

## `Properties`

### [``](https://www.lodashjs.com/docs/latest#VERSION)

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L16644)

(string): 语义化的版本号。

### [``](https://www.lodashjs.com/docs/latest#templateSettings)

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1689) [Ⓝ](https://www.npmjs.com/package/lodash.templatesettings)

(Object): 默认情况下，lodash使用的模板分隔符就像那他们嵌入到Ruby（ERB）一样。更改以下模板设置使用替代分隔符。

### `_.templateSettings.escape`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1697)

(RegExp): 用于检测`data`属性值是否HTML转义。

### `_.templateSettings.evaluate`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1705)

(RegExp): 用于检测代码来进行评估。

### `_.templateSettings.imports`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1729)

(Object): 用于导入变量到编译模板。

### `_.templateSettings.interpolate`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1713)

(RegExp): 用于检测`data`属性值是否注入。

### `_.templateSettings.variable`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1721)

(string): 用于引用该数据对象中的模板文本。

## `Methods`

### `_.templateSettings.imports._`

[Ⓢ](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L1737)

`lodash` 引用。