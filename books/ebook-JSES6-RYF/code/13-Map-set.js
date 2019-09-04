// Set 类似于数组，没有重复元素。但是API和数组不同
const s = new Set();
[1,2,3,2,1].forEach(item => s.add(item));
console.log(s);

const s2 = new Set([1,2,3,2,1]);
[...s2];
s2.size

let arr = [1,2,3,2,1];
const s3 = new Set(arr);
const divs = document.querySelectorAll('div');
const s4 = new Set(divs);
s4.size

let arrNew = [...new Set(arrDefault)];
let strNew = [...new Set('abcdsac')].join('');

let s5 = new Set();
s5.add({});
s5.size
s5.add({})
s5.size
// 对象是不同的，可以存放两个空对象；NaN在set中只能存放一个

Set.prototype.constructor === Set
Set.prototype.size

// 实例方法（分为操作数据和遍历数据）
let set = new Set([1,2,3,2,1]);
set.add(value);
set.delete(value);
set.has(value);
set.clear(); // 清空全部成员，没有返回值

// 数组第二种去重
const items = new Set([1,2,3,4,5]);
const array = Array.from(items);

// 判断是否具有属性
const test = new Set();
if (test.has(value)) {
  console.log(test);
}

// 遍历数据结构(前三个使用for of 循环)默认遍历value
Set.keys()
Set.values()
set.entries()
set.forEach()

let set = new Set([1,2,3,4,5]);
for (let item of set) {
  console.log(item);
}
set.forEach((key, value) => {
  console.log(key + ":" + value);
});

// 可以通过 [...set] 转化成数组，然后使用数组的方法处理
// 可以求交集并集补集

let a = new Set([1,2,3]);
let b = new Set([3,4,5]);
let union = new Set([...a], [...b]);
let intersect = new Set([...a].filter(x => b.has(x)));
let difference = new Set([...a].filter(item => !b.has(item)));

// 特例 weakSet
// 特点：只能存放对象，不能存放其他类型的数据
// 存放的对象是临时的，垃圾回收机制会忽略这部分对象。
// 适合临时对象（例如文档片段，剪切的数据）
// 没有size属性，不能遍历

const ws = new WeakSet();
const arr = [[1,2], [3,4]]; // 数组的成员只能是对象，如果是简单数据类型会报错
const ws = newWeakSet(arr);
ws.add(obj);
ws.has(obj);
ws.delete(obj);



// Map
// 是对象的升级版：对象是 key-value 的集合，局限是key只能是字符串（如果传入其他的数据类型会转化成字符串）
// Map 的key可以使对象，这样的键值对就是完善的键值对
let m = new Map();
let obj = {p: "hello"};
m.set(obj, 'world');
m.has(obj);
m.get(obj);
m.delete(obj);

const m2 = new Map([
  ['mame', 'Mike'],
  ['age', 20]
]);
// 如果一个键被多次赋值，那么后面的值会覆盖前面的值。注意：如果键是对象，必须是同一个对象。如果是不同的对象，内存地址不同，就会出错、
// 这是会产生同名函数碰撞的情况：我们扩展一个已有的map就可能出现这个问题。

// 主要的API和Set是类似的
let map = new Map().set(1, 'a').set(2, 'b').set(3, 'c');

// Map 和对象的转换（前提是map的属性是字符串）
function mapToObject(map) {
  let obj = Object.create(null);
  for (let [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

function objectToMap(obj) {
  let map = new Map();
  for (let k of Object.keys(obj)) {
    map.set(k, obj[k]);
  }
  return map;
}

// WeakMap 也是类似的用法
