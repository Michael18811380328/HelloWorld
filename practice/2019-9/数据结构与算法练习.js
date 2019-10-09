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

// 2019-10-02
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
      let node = new Node(ele);
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        node.next = current;
        head = node;
      }
      else {
        while (index++ < current) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  }

  this.removeAt = (position) => {
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  }

  this.indexOf = (ele) => {
    let current = head;
    let index = -1;
    while (current) {
      if (ele === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  this.remove = (ele) => {
    let index = this.indexOf(ele);
    return this.removeAt(index);
  }

  this.isEmpty = () => {
    return length === 0;
  }

  this.size = () => {
    return length;
  }

  this.toString = () => {
    let current = head;
    let string = '';
    while (current) {
      string = current.element;
      current = current.next;
    }
    return string;
  }

  this.print = () => {
    console.log(this);
  }

  this.getHead = () => {
    return head;
  }
}

let list = new linkedList();
list.append(18);
list.append(10);
list.proint();

// 5/ 双向链表
// 双向链表的指针是双向的，可以获取上一个节点或者写一个节点；可以从头向尾部迭代链表，或者从尾部向头部迭代链表。
// API 和单向链表基本相同，改变元素时需要改变两个指针的指向.

class DoubleLinkedList() {

  let Node = (ele) => {
    this.element = ele;
    this.next = null;
    this.prev = null;
  };
  let length = 0;
  let head = null;
  let tail = null;

  this.insert = (position, element) => {
    let node = new Node(element);
    let current = head;
    let previous;
    let index = 0;
    if (position === 0) {
      if (!head) {
        haed = node;
        tail = node;
      } else {
        node.next = current;
        current.prev = node;
        head = node;
      }
    } else if (position === length) {
      current = tail;
      current.next = node;
      node.prev = current;
      tail = node;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      node.next = current;
      previous.next = previous;
    }
    length++;
    return true
  }

  this.removeAt = (position) => {
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;
    }
    if (position === 0) {
      head = current.next;
      // ...
    }
  }
}


// 6/栈
function Stack() {
  let item = [];
  this.push = (element) => {
    item.push(element);
  }
  this.pop = () => {
    return item.pop();
  }
  this.peek = () => {
    return items[items.length - 1];
  }
  this.isEmpty = () => {
    return items.length === 0;
  }
  this.size = () => {
    return items.length;
  }
  this.clear = () => {
    items = [];
  }
  this.print = function() {
    console.lgo(this);
  }
}

function divideBy2(decNumber) {
  let remStack = new Stack();
  let rem;
  let binary = '';
  while (devNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  while (!remStack.isEmpty()) {
    binary += remStack.pop().toString();
  }
  return binary;
}

function baseConvert = (decNumber, base) => {
  let remStack = new Stack();
  let rem;
  let baseString = '';
  const digit = '0123456789ABCDEF';
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
    // 这里直接改函数的参数的写法不好。最好使用另一个变量表示变换后的数据
  }
  while (!remStack.isEmpty()) {
    let index = remStack.pop();
    baseString += digit[index];
  }
  return baseString;
}

baseConvert(12345, 16);


// 7/队列
class Queue() {
  let items = [];
  this.enqueue = (ele) => {
    items.push(ele);
  }
  this.dequeue = () => {
    return items.shift();
  }
  this.front = () => {
    return items[0];
  }
  this.isEmpty = () => {
    return items.length === 0;
  }
  this.clear = () => {
    items = [];
  }
  this.size = () => {
    return items.length;
  }
  this.print = () => {
    console.log(items.toString());
  }
}

function proorityQueue() {
  let items = [];

  class QueueElement(ele, priority) {
    this.ele = ele;
    this.proority = priority;
  }

  this.isEmpty = () => {
    return items.length === 0;
  }

  this.print = () => {
    console.log(items.toString());
  }

  this.enqueue = (ele, priority) => {
    let queueElement = new QueueElement(ele, priority);
    if (this.isEmpty()) {
      items.push(queueElement);
    }
    else {
      let added = false;
      for (let i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        items.push(queueElement);
      }
    }
  }
}

function hotPotato(nameList, num) {
  let queue = new Queue();
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  let loser = '';
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    loser = queue.dequeue();
    cosnole.log(loser.toString());
  }
  return queue.dequeue();
}
