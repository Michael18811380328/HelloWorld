// 0.linked list 链表
// 大部分语言中的数组具有固定的长度（JS是个例外），从一个数组中直接添加或者改变元素需要占用内存，需要移动元素。数组在内存中是连续放置的，但是链表是一个动态的数据结构，不是连续放置在内存中的数据。实际上链表的每个节点存储自身数据和下一个节点的引用（指针）
// 好处：添加元素或者删除元素不需要改变已有元素在内存中的位置；弊端：访问列表需要从一个开始元素以此迭代列表。
// 实例：一列火车：车厢是一个节点，连接处是一个指针。
// 分类：链表和双向链表
function linkedList() {
  let length = 0;
  // 第一个节点的引用存储（head）
  let head = null;
  // 需要加入列表的项，具有node节点和指针（指向下一个空节点）
  let Node = function(ele) {
    this.element = ele;
    this.next = null;
  };
  // API
  // 1.向列表尾部添加元素
  this.append = function(ele) {
    let node = new Node(ele);
    let current;
    if (head === null) {
      // 如果列表是空，添加第一个元素
      head = node;
    }
    else {
      current = head;
      // 循环列表找到最后一项
      while (current.next) {
        current = current.next;
      }
      // 将最后一项的next赋值为node，建立链接
      current.next = node;
    }
    length ++;// 更新链表的长度
  };
  this.insert = function(position, ele) {};
  this.removeAt = function(position) {

  };
  this.remove = function(ele) {};
  this.indexOf = function(ele) {};
  this.isEmpty = function() {};
  this.size = function() {};
  this.toString = function() {};
  // 列表使用了node类，所以需要重写继承于对象的toString方法，只输出元素的值。
  this.print = function() {
    console.log(this);
  };
}


// test
let list = new linkedList();
list.append(15);
list.append(10);
list.print();