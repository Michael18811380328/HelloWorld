/**
 * 数据结构与算法练习：2019-10-01
 */

// 1/数组新方法
function isEven(x) {
  return (x % 2 === 0);
}

array.every
// 数组的每一项返回值都是真的，结果才是真的，否则就是false，方法不会改变原始数据
array.some 
// 数组的任意一项返回true即可。方法不会改变原数组
array.forEach((item, index, arr) => { fun(item) });
// 数组的每一项执行一次函数，没有返回值，不会改变原数组
let arr2 = array.map((item, index, array) => {return fun(item)});
// 数组的每一项执行一次函数，返回值是一个新的数组，新数组和原始数组一一对应，不会改变原始的数组
array.filter
// 数组项依次执行函数，将返回值是true的项作为一个新的数组返回，不会改变原始数组。例如传入一个数组，规律器是获取偶数，那么结果的驻足中就是偶数。
let arr3 = array.filter((item) => {
  return isEven(item);
});

arr.reduce((previous, current, index) => {
  return sth
}, initialValue);
// 叠加器函数：依次执行数组的每一项，根据返回值进行计算


// 2/字符串排序
array.sort((a, b) => {
  a.toLowerCase() < b.toLowerCase() ? -1 : 1
});


// 3/字典（基于数组）就是固定的键值对
class Dictionary() {

  this.dataStore = [];

  add = (key, value) => {
    this.dataStore[key] = value;
  }

  find = (key) => {
    return this.dataStore[key];
  }

  remove = (key) => {
    if (this.dataStore(key)) {
      delete this.dataStore[key];
      return true;
    } else {
      return false;
    }
  }

  showAll = () => {
    let sortKeys = Object.keys(this.dataStore).sort();
    for (let key in sortKeys) {
      return sortKeys[key] + ' ' + this.dataStore[sortKeys[key]];
    }
  }

  count = () => {
    let n = 0;
    for (let key in this.dataStore) {
      n++;
    }
    return n;
    // return this.dataStore.length
  }

  clear = () => {
    for (let key in this.dataStore) {
      delete this.dataStore[key];
    }
  }
}


// 4/单向链表
// 数组在存储中就是一个单向链表（JS的数组是特殊的对象，例外）。所以数组的每一个项存储的是当前的内容和下一个项的指针。单向链表好处：删除和增加元素时，不需要改变已有元素在内存中的位置；缺点：获取数据访问链表需要从第一个元素开始迭代链表。

function linkedList() {

  // 初始化链表
  let length  = 0;
  let head = null;
  let Node = function(ele) {
    this.element = ele;
    this.next = null;
  }

  this.append = (ele) => {
    let node = new Node(ele);
    let current;
    if (head === null) {
      head = node;
    }
    else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  }

  this.insert = (position, ele) => {
    if (position >= 0 && position <= length) {
      //
    }
  }
}






























