# Lodash 常用方法

lodash的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。类似immutable.js的理念去处理。

lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。

 

lodash的引用

```js
import _ from 'lodash';
```
用一个数组遍历来说明为什么要使用lodash

常规数组遍历


~~~js
agent.forEach(function (n,key) {
  agent[key].agent_id = agent[key].agent_name;
  return agent;
});
~~~

使用lodash来遍历

~~~js
_.forEach(agent,function(n,key) {
  agent[key].agent_id= agent[key].agent_name
});
~~~

这是一个常见的forEach的数组遍历，使用了lodash过后，_.forEach()这是一个值，而不是一个函数。就可以直接

const arr = _.forEach();


这时候arr就是新的数组agent。而在常规的js数组遍历中，还需要考虑return的值和this的指向问题。虽然这样看起来，二者相差不大，但是在实际的开发过程中，熟练的使用lodash能大大的提高开发的效率。



再来总结一些lodash常用函数（还是推荐大家能去官网把所有的函数看一遍增加一些印象）

 

1.chunk，将数组进行切分。（也是官网的第一个函数）

~~~js
const arr = [1,2,3,4,5,6,7,8,9];
_.chunk(arr,2);
// =>[[1,2],[3,4],[5,6],[7,8],[9]]
~~~

这个函数把数组按照一定的长度分开，返回新的数组。（片段化数组）

 

2.compact，去除假值。（将所有的空值，0，NaN过滤掉）

 

_.compact(['1','2',' ',0])
// => ['1','2']
对应的还有一个数组去重函数，这在实际的开发中很有作用。




3.uniq，数组去重。（将数组中的对象去重，只能是数组去重，不能是对象去重。）

 

_.uniq([1,1,3])
// => [1,3]
这跟介绍的第二个函数compact有很好的配合作用。（后端接口传来的数据很多是有重复或者空值的，这时候就可以使用两个函数来过滤数据。ladash只是最基础的库，其实可以将几个函数封装起来组件自己的库。）

 

4.filter和reject，过滤集合，传入匿名函数。（二者放在一起讨论的原因是，两个函数类似但返回的值是相反。）

 

_.filter([1,2],x => x = 1)
// => [1]

_.reject([1,2],x => x=1)
// => [2]
这两个过滤器，第二个参数值是false的时候返回是reject的功能，相反是true的时候是filter。

 

5.map和forEach，数组遍历。（相似）

如果不明白map和forEach有什么相似的可以百度一下，简单说一下不同点就是，map的回调函数中是支持return返回值的。

不过二者都不改变原来的数组。

 

_.map([1,2],x => x+1)
// => [2,3]
推荐使用map。

6.merge,参数合并。（merge函数像是Git的merge分支操作一样，将两个参数合并在一起。）

官网的解释是，递归的将源对象和继承的可枚举字符串监控属性合并到目标对象中。源对象从左到右引用，后续来源将覆盖以前来源的属性分配。

 

var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};

var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};

_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
这里就像借用官网的代码来解释一下了。在实际开发中，前端在接口的请求可以merge一下之前的query和现在改变的查询的值，再去请求后端接口的数据。

 

7.extend，类似参数对象合并。

~~~js
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
~~~

8.cancat，数组连接

~~~js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]

~~~

可以接受多个参数，将多个参数合并为一个数组元素。

 

9.keys ，取出对象中所有的key值组成新的数组。

~~~js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.keys(new Foo);
// => ['a', 'b'] (iteration order is not guaranteed)

_.keys('hi');
// => ['0', '1']

~~~


类似object.keys()，返回对象中可枚举属性的数组。


