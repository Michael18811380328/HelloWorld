## data structure

数据结构

1. 数组 array
2. 链表 linked list
3. 队列 queue
4. 栈 stack
5. 堆 heap
6. 树 tree
7. 散列(哈希) hash
8. 图 graph



这部分内容需要不断复习，核心代码自己抄三次，需要默写关键逻辑

参考书

《学习JavaScript数据结构与算法》巴西人

《实用数据结构》清华大学林小茶写（C语言）





## 第一章 概述

### 数据结构

数据结构：把数据做到有效的安排，并建立数据之间的关系（数据+数据间的关系）。

数据结构三个要点：信息之间的逻辑关系，信息在计算机中的物理存储方式，对信息的运算（增删改查排序）。数据的逻辑结构：分为线性结构（线性表）和非线性结构（树和图）。数据的物理结构：顺序存储结构（逻辑上相邻的节点在物理存储上也相邻）、链式存储结构（逻辑上相邻的节点在物理上不一定相邻，节点的逻辑关系由指针描述）、索引存储结构（建立索引表来标识节点的地址）、散列存储结构（根据节点的关键字直接计算出节点的存储地址）。

数据>数据元素>数据项：数据对应数据表，数据元素对应数据表的一条信息，数据项是最小的信息单元（对应某条信息的某个属性）

### 算法

计算和算法的区别：计算简单的四则运算直接使用数学函数，计算复杂的问题（例如迷宫和贪吃蛇）需要算法。同一个算法用不同的数据结构会产生不同的执行效率。所以要定量分析不同数据结构表示的效率和适用的场合。这就是数据结构和算法的联系。

解决问题的数据结构很好理解，但是实现数据结构的算法比较难。

算法的特点：具有输入输出，有穷性（避免死循环），确定性（每一步是明确的结果），可行性（算法中每一步通过有限次运行可以实现）。

### 大O表示法和时间复杂度

时间复杂度：把算法中包含简单操作的次数叫做算法的时间复杂度，衡量算法的性能。大O表示法将简单操作的次数取极限获取（常见的优劣记住）。

空间复杂度：计算过程中需要消耗的内存（存储int和object消耗内存不同）。



## 第六章 集合

### 集合

集合是唯一的项的集合，类似于数学中的有限级。如果集合中没有元素就是空集。计算机中的集合也有交集、并集、差集的计算。集合基于 ES6 的 Set。集合中的元素是无序的，所以可以使用对象实现（也可以使用数组）

~~~js
function Set() {
  items = {};
  this.has = (value) => {
    // return value in items;
    return items.hasOwnProperty(value); // better
  }
  
  this.add = (value) => {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  }
  
  this.remove = (value) => {
    if (this.has(value)) {
      delete items[value];
      return true
    }
    return false;
  }
  
  this.clear = () => {
    items = {};
  }
  
  this.size = () => {
    return Object.keys(items).length; //es5
  }
  
  this.sizeLegacy = () => {
    var count = 0;
    // 这里不能直接使用for-in循环，这样会遍历到继承的属性（继承的属性不属于集合的属性）；所以需要使用hasOwnProperty 监测是否属于对象自己的属性
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count; //es3
  }
  
  this.value = () => {
    return Object.keys(items);
  }
}

let set = new Set();
set.add(1);
set.add(2);
~~~

下面是集合的运算

~~~js
function Set() {
  
  // 并集
  this.unionSet = (set) => {
    let unionSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = set.values();
    for (let j = 0; j < values.length; j++) {
      unionSet.add(values[j]);
    }
    return unionSet;
  }
  
  // 交集
  this.interSection = (otherSet) => {
    let interSection = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (other.has(values[i])) {
        interSection.add(values[i]);
      }
    }
    return interSection;
  }
  
  // 差集
  this.difference = (otherSet) => {
    let differenceSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  }
  
  // 子集
  this.sebSet = (otherSet) => {
    if (this.size() > otherSet.size()) {
      return false
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  }
}
~~~



## 第七章 字典和散列表

集合、字典、散列表都是存储唯一值的数据结构（不重复）。集合关注的是值，字典和散列表关注的是键值对。

### 字典

字典的实际使用：地址簿或者英语字典

字典对应于JS中的 Map 对象

~~~js
function Dictionary() {
  items = {};
  
  this.has = (key) => {
    return key in items;
  }
  
  this.set = (key, value) => {
    items[key] = value;
  }
  
  this.remove = (key) => {
    if (items.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  }
  
  this.get = (key) => {
    return items.has(key) ? items[key] : undefined;
  }
  
  this.values = () => {
    let values = [];
    for (let key in items) {
      if (this.has(key)) {
        values.push(items[key]);
      }
    }
    return values;
  }
  
  this.clear = () => {
    items = {};
  }
  
 	this.keys = () => {
    return items.keys;
  }
  
  this.size = () => {
    return Object.keys(items).length;
  }
  
  this.getItems = () => {
    return items;
  }
}
~~~

### 散列表（哈希表）

散列表，HashTable 又称哈希表。

散列算法：在数据结构中尽快找到一个值。给定一个键值对，散列函数可以获取一个地址，因此能够快速检索到这个值。

最简单的散列函数：把一个键的每一个字母的ASCII值相加，得到散列值。

~~~js
function HashTable() {
  let table = [];
  
  // 散列函数(工具函数) 下面简写为 loseHashCode
 	loseloseHashCode = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
    // 为了获取一个较小的数值，所以用hash值除以一个数，获取余数
  }
  
  this.put = (key, value) => {
    let position = loseHashCode(key);
    table[position] = value;
  }
  
  this.get = (key) => {
    return table[loseHashCode(key)];
  }
  
  this.remove = (key) => {
    table[loseHashCode(key)] = undefined;
  }
  
  this.print = () => {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ' ' + table[i]);
      }
    }
  }
 	
}
~~~

对于哈希表，不需要把数组中对应的位置删掉。因为哈希表一部分项没有元素（空位），默认是undefined。如果删除一个位置后，下次获取或者删除一个项时，这个元素不在散列函数求出的位置上。

如果地址簿中 key = 'John' 根据散列函数计算的散列值是29，那么存储在 table[29] 中。当然，现在还有散列函数中冲突等问题，稍后解决。

==处理哈希表中的冲突==：可能不同的键转化的散列值是相同的，所以产生了多对一的情况，就会产生冲突。解决这个问题的方法是：分离链接、线性探查、双散列法。

==分离链接==：在每一个哈希值的位置，放置一个线性链表。如果多个数据对应一个散列值，可以放在对应的链表中。缺点是需要开辟新的内存存放这部分数据。

~~~js
// 分离链接：首先写一个辅助类（在哈希表内部），把键值对存放在一个对象实例中
let ValuePair = (key, value) => {
  this.key = key;
  this.value = value;
}
// 注意：上面是一个类（可以把key value 设置到当前类的属性上）

// 下面改写散列表的方法
this.put = (key, value) => {
  let position = lostHashCode(key);
  if (table[position] === undefined) {
    table[position] = new LinkedList();
  }
  let obj = new ValuePair(key, value);
  table[position].append(obj);
}

this.get = (key) => {
  let position = loseHashCode(key);
  if (table[position] === undefined) {
    return undefined;
  }
  var current = table[position].getHead();
  while (current.next) {
    if (current.element.key === key) {
      return current.element.value;
    }
    current = current.next;
  }
  if (current.element.key === key) {
    return current.element.value;
  }
}

this.remove = (key) => {
  let position = loseHashCode(key);
  if (table[position] !== undefined) {
    let current = table[position].getHead();
    while(current.next) {
      if (current.element.key === key) {
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true
      }
      current = current.next;
    }
    if (current.element.key === key) {
      table[position].remove(current.element);
      if (tab;e[position].isEmpty()) {
        table[position] = undefined;
      }
      return true;
    }
  }
  return false;
}

~~~

==线性探查==：如果产生冲突 table[i] 已经有值，继续查询table[i+1]，只到下一个空位。好处：不需要建立新的数据结构。散列表的相关方法也要改动。

~~~js
this.put = (key, value) => {
  let position = loseHashCode(key);
  if (table[position] === undefined) {
    table[position] = new ValuePair(key, value);
  } else {
    let index = ++position;
    while (table[index] !== undefined) {
      index++;
    }
    table[index] = new ValuePair(key, value);
  }
}
// 注意：在JS中数组的长度可以自动增加，所以线性探查不会出问题。在C语言中数组的长度是固定的，如果数组的位置用完了，需要开辟新的内存地址。

this.get = (key) => {
  let position = loseHashCode(key);
  if (table[position] !== undefined) {
    if (table[position].key === key) {
      return table[position].value;
    }
    else {
      let index = ++position;
      while (table[index] === undefined || table[index].key !== key) {
        index++;
      }
      if (table[index].key === key) {
        return table[index.value];
      }
    }
  }
  return undefined;
}

this.remove = (key) => {
  let position = loseHashCode(key);
  if (table[position] !== undefined) {
    if (table[position].key === key) {
      table[position] = undefined;
      return true;
    } else {
      let index = ++position;
      while (table[index] === undefined || table[index].key !== key) {
        index++;
      }
      if (table[index].key === key) {
        table[position] = undefined;
        return true;
      }
    }
  }
  return false;
}
~~~

==更好的散列函数== 之前的散列函数会产生很多散列冲突，所以我们需要写一个冲突少，性能好的函数。下面的函数是社区推荐的较好的散列函数。

~~~js
function djb2HashCode(key) {
  let hash = 5381; // 设置一个初始质数（现在使用5381）
  for (let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i); // 5381 * 33 获取一个魔力数 
  }
  return hash % 1013; // 这里的值是大于散列个数的一个质数（如果散列有1000，那么这个选择1013）
}
~~~



## 第八章 树

### 概念

树：N个有限数据的集合，可以是一个空树。树只有一个根节点，没有子节点的节点是叶节点。每一个子节点本身又是一棵树（递归）。适应于快速存储查找数据。

结点：一个数据元素及其指向子树的分支信息。

结点的度：一个节点的子节点的个数

树的度：节点的度的最大值。

树的层数：根节点是1，从上到下增加。

树的深度：树共计有多少层，等于树的层数的最大值。

有序树和无序树：如果子树的顺序可以变化，就是无序树。（DOM树中，如果子树可以变化，那么界面排布就混乱了，所以DOM树是有序树）。

### 二叉树

二叉树：一个节点最多只有两个子树（左子树右子树）。普通的树可以和二叉树互相转换：左子树表示当前节点的第一个子树，右子树表示当前节点的兄弟节点。二叉树可以由顺序存储结构或者链式存储结构表示。二叉树的遍历：前序遍历（根左右）、中序遍历（左根右）、后续遍历（左右根）。

二叉搜索树：左节点<自身<右节点（BST，binary search tree）这里经常使用递归。

~~~js
function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  // 这里使用指针表示节点的指向，左右指针分别指向左节点和右节点。
  var root = null; // 根元素
  
  // 插入节点函数(处理根节点)
  this.insert = function(key) {
    let newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  }
  // 插入节点辅助函数（递归比较插入节点）
  let insertNode = function(node, newNode) {
    // 如果当前节点的值大于新节点，那么放在左节点处理
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    }
    // 如果当前节点的值小于等于新节点，那么新节点放在右节点处理。插入后，当前节点的值和右节点的值可能相同
    else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }
  
  // 遍历节点
  //（中序遍历，按照大小顺序遍历节点）
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
  }
  let inOrderTraverseNode = function(root, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left);
      callback(node.key);
      inOrderTraverseNode(node.right);
    }
  }
  // 先序遍历(根左右，打印一个结构化的文档)
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback)
  }
  let preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left);
      preOrderTraverseNode(node.right);
    }
  }
  // 后续遍历（左右根，计算文件或者文件夹的大小）
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback);
  }
  let postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left);
      postOrderTraverseNode(node.right);
      callback(node.key);
    }
  }
  
  // search(第一个函数是对外暴露的API，下面的辅助函数是内部函数)
  this.min = function() {
    return minNode(root);
  }
  let minNode = function(node) {
    if (node) {
      // the left node is min node
      while (node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }
  
  this.max = function() {
    return maxNode(root);
  }
  let maxNode = function(node) {
    if (node) {
      while (node.right) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  
  this.search = function(key) {
    return searchNode(root, key);
  }
  let searchNode = function(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    }
    else if (key > node.key) {
      return searchNode(node.right, key);
    }
    else {
      return true;
    }
  }
  
  // remove Node 较复杂
  this.remove = function(key) {
    root = removeNode(root, key); 
  }
  let removeNode = function(node. key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right);
      return node;
    } else if (key === node.key) {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      }
      if (node.right === null) {
        node = node.left;
        return node;
      }
      // 被删除的节点具有左右子节点(删除当前节点，将右侧最小节点作为父节点，或者把左侧最大节点作为父节点)
     	let aux = findMinNode(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right. aux.key);
      return node;
    }
  }
}
~~~

二叉搜索树的不足：可能一部分分支特别长或者特别短，不平衡。这样操作某个长分支会消耗性能。

改进版：自平衡二叉搜索树（AVL树， 阿德尔森-维尔斯和兰迪斯树）任意节点左右子节点高度的差最大是1。

还有红黑树（进行高效的中序遍历）和堆积树。



## 第九章 图

社交网络、通信道路等都可以使用图描述。

### 概念

G = (V, E) 图是由一系列节点和边组成

相邻顶点：相邻的两个顶点（由一条边连接）

顶点的度：一个顶点相邻顶点的个数

路径：若干相邻的边构成的序列

简单路径：不包括重复顶点的路径

环：简单路径中首尾相同

无环路径

连通路径：任意两个顶点间存在路径

有向图：边是一个向量，具有方向（交通图）；无向图：边没有方向（人际圈）；强连通（每两个顶点间双向连通）

加权：边具有权值

图相对之前的数据结构最复杂，解决方法很多。

### 图的三种表示

邻接矩阵：使用一个二维数组，如果两个点有边那么对应的二维数组就是1，否则就是0.（如果加权图，那么数值就是权重）。弊端：如果一个稀疏图（内部联系较少），那么这个矩阵需要存储很多0，占用内容。新开辟一个顶点会占用较多内存，需要迭代一行。

邻接表：使用链表，散列表，字典表示。描述每一个顶点的链接关系。

关联矩阵：使用顶点和边作为矩阵的两边，适应于边的数量很多。

### 创建图

使用邻接表方式（字典）

~~~js
function Graph() {
  let vertices = []; // 存放顶点数组
  let adjList = new Dictionary(); // 存放顶点的邻接表
  
  // 增加一个顶点：将顶点添加到顶点数组中，并且在顶点的邻接表中加入对应的属性（空数组）
  this.addVertex = function(point) {
    vertices.push(point);
    adjList.set(point, []);
  },
  
  // 增加一个边：传入两个顶点，增加邻接表中两点间边
  this.addEdge = function(point, point2) {
    adjList.get(point).push(point2);
    adjList.get(point2).push(point); // 如果是有向图，需要单向添加边；无向图需要添加两个边
  },
  
  this.toString = function() {
    let s = '';
    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + ' ';
      let neighbors = adjList.get(vertices[i]);
      for (let j = 0; j < neighbor.length; j++) {
        s += neighbor[j]
      }
      s += '\n';
    }
    return s;
  },
}
~~~

### 遍历图

遍历的目的：寻找某个顶点；计算两个顶点的距离；检查图是否连通或者有环结构

算法：获取第一次访问的节点，并且记录没有被访问的节点（加入到列表中）

遍历的方法：广度优先搜索；深度优先搜索。广度优先搜索使用队列，把待访问的节点放入队列中，先入的节点先探索（先访问兄弟节点）；深度优先搜索使用栈，如果存在新的顶点就去访问（先访问孙子节点）。为了效率，每个节点最多访问两次。

顶点分为三种状态：没有访问到，已经访问但是没有深入探索；已经深入探索；

#### 1、广度优先算法 bfs

~~~js
let initializeColor = function() {
  // 辅助函数：初始化图：全部的节点是白色（未访问）
  let color = [];
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = 'white';
  }
  return color;
}

this.bfs = function(v, callback) {
  // 初始化图（全部节点是白色）
  let color = initializeColor();
  let queue = new Queue();
  // 把当前节点入队列
  queue.enqueue(v);
  
  // 当队列时非空时
  while (!queue.isEmpty()) {
    // 第一个元素出队列
    let u = queue.dequeue();
    // 从字典中获取当前节点的全部相邻节点
    let neighbors = adjList.get(u);
    // 设置节点是灰色（已经访问，但是没有深入）
    color[u] = 'grey';
    // 遍历每一个相邻节点
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      // 如果相邻节点没有被访问，那么设置这个节点被访问，并且放入待遍历的队列中
      if (color[w] === 'white') {
        color[w] === 'grey';
        queue.enqueue(w);
      }
    }
    // 深入后的节点设置属性为黑色
    color[u]= 'black';
    // 如果传入回调函数，出队列的节点执行回调函数
    if (callback) callback(u);
  }
}
~~~

改进算法：使用BFS算法计算不同节点的距离：在遍历相邻节点时，增加一个距离变量，这样可以存储不同相邻节点和初始节点的位置。下面是优化后的算法

疑问：如果是子节点有不同的路径，通过多个路径可以访问一个节点，那么哪个路径是最短对的路径？

~~~js
let BFS = function(v) {
  let color = initializeColor();
  let queue = new Queue();
  let d = []; // 存放不同节点的路径
  let pred = []; // 存放前一个节点，用来计算最短距离
  
  queue.enqueue(v);
  
  // 初始化全部的路径距离是0，前一个节点是空
  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    pred[vertices[i]] = null;
  }
  
  while (!queue.isEmpty()) {
    let u = queue.dequeue();
    let neighbors = adjList.get(u);
    color[u] = 'grey';
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        color[w] = 'grey';
        // 路径增加，设置前一个节点为父节点
        d[w] = d[u] + 1;
        pred[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = 'black';
  }
  return {
    distances: d,
    predecessors: pred,
  };
};

// distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3],
// predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G:"C", H: "D", I: "E"]

// 然后计算顶点（A）到其他节点的路径
~~~

#### 2、深度优先算法 dfs

首先探索一个分支，沿着路径探索，直到这个路径被全部探索，然后原路返回探索下一个路径。深度优先算法是递归的，所以使用栈更合适。

~~~js
// 辅助函数和上面相同
// 开始第一个节点
this.des = function(callback) {
  let color = initializeColor();
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === 'white') {
      dfsVisit(vertices[i], color, callback);
    }
  }
}
// 访问节点函数
let dfsVisit = function(u, color, callback) {
  color[u] = 'grey';
  if (callback) callback(u);
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    let w = neighbors[i];
    if (color[w] === 'white') {
      // 递归遍历这个节点
      dfsVisit(w, color, callback);
    }
  }
  // 遍历结束后，设置当前节点是黑色
  color[u] = 'black';
}
~~~

深度优先算法改进：我们需要知道一个节点变成灰色（开始探索）的时间，一个节点变成黑色（结束探索的时间）以及这个节点的前一个节点（node）

下面是改进的 DFS 算法

~~~js
let time;

this.DFS = function(callback) {
  let color = initializeColor();
  // 设置初始时间是0
  time = 0;
  // 创建开始时间和结束时间的数组
  let discovery = []; 
  let finished = [];
  // 存储前一个节点的数组
  let predecessors = [];
	for (let i = 0; i < vertices.length; i++) {
    discovery[vertices[i]] = 0;
    finished[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === 'white') {
      dfsVisit(vertices[i], color, discovery, finished, predecessors, callback);
    }
  }
  return { discovery, finished, predecessors };
}

dfsVisit = (u, color, d, f, p, callback) => {
  // 开始探索U节点
  color[u] = 'grey';
  d[u] = ++time;
  if (callback) callback;
  let neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    let w = neighbors[i];
    if (color[w] === 'white') {
      dfsVisit(w, color, d, f, p, callback);
      p[w] = u;
    }
    color[u] = 'black';
    f[u] = ++time;
    // 结束探索U节点
  }
}
~~~

改进后的算法满足（V表示节点的数量）通过 d[u] / f[u] 可以计算不同节点的时间比值，可以用于拓扑排序

1 ≤ d[u] < f[u] ≤2 |V|



拓扑排序（DFS扩展）

实例：如果一些任务的执行时连续的（需要步骤）然后不同的任务构成不同的节点，节点之间可以获取最短路径，可以计算具体遍历节点的时间，可以计算多种遍历节点的情况。



## 第十章 排序和搜索算法

排序算法是搜索算法的基础

### 排序算法

用数组构建一个简单的数据结构来排序

~~~js
function ArrayList() {
  let arr = [];
  this.insert = (item) => {
    arr.push(item);
  };
  // 验证排序的结果
  this.toString = () => {
    console.log(arr.join(''));
  }
} 
~~~

下面是五个排序算法，由差变好

#### 1 冒泡排序法

~~~js
function ArrayList() {
  let arr = [];
  this.insert = (item) => {
    arr.push(item);
  };
  this.toString = () => {
    console.log(arr.join(''));
  }
  
  // 缺点：内循环和外循环消耗时间，频繁交换数组的位置消耗内存。
  bubbleSort = () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let k = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = k;
        }
      }
    }
  }
  // 改进版冒泡排序法（内循环次数减半）
  bubbleSortUpdate = () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          // 交换函数，交换数组中两个项的位置；
          swap(arr[j], arr[j + 1]);
        }
      }
    }
  }
}
~~~


#### 2 选择排序法

（遍历数组获取最小值，然后和第一位交换）时间复杂度n平方

~~~js
selectionSort = () => {
  let len = arr.length;
  let minItem;
  for (let i = 0; i < len; i++) {
    minItem = i;
    for (let j = i; j < len; j++) {
      if (arr[minItem] > arr[j]) {
        minItem = j;
      }
    }
    if (i !== minItem) {
      swap(arr[i], arr[minItem]);
    }
  }
}
~~~

#### 3 插入排序法  

  ~~~js
insertSort = () => {
  let len = arr.length;
  let j , temp;
  for (let i = 0; i < len; i++) {
    j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
}
  // 前三个性能不好，后面两个排序可以用在实际工作中
  // 上面的代码把一部分变量定义的函数内部开始位置，不定义在循环内部，这样可以节省内存。
  ~~~

#### 4 并归排序

nlogn 火狐浏览器使用

思路：把一个数组切分成很多小数组，然后对每个小数组排序，最后将小数组并归一个排序完整的大数组。

~~~js
this.mergeSort = function() {
  array = mergeSortRec(array);
}

let mergeSortRect = function(array) {
  let len = array.length;
  if (len === 1) {
    return array;
  }
  let mid = Math.floor(length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(min, len);
  return merge(mergeSortRect(left), mergeSortRect(right));
}

let merge = function(left, right) {
  let result = [];
  let il, ir;
  // 用新数组迭代两个旧数组
  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il]);
    } else {
      result.push(right[ir]);
    }
  }
  while (il < left.length) {
    result.push(left[il]);
  }
  while (ir < right.length) {
    result,push(right[ir]);
  }
  return result;
}
~~~

#### 5 快速排序

快速排序法较复杂，性能最好 nLogn。

思想：首先获取数组的中间项（主元）；然后设置第一个项为前指针，最后一个项是后指针。前指针向后移动，直到找到一个比中间项大的元素，后指针向前移动，找到一个比中间项小的元素，交换两个元素的位置。然后继续执行，直到前指针大于后指针。那么这样一轮过后，前面的项都比中间项小，后面的项都比中间项大；之后利用递归的思想，把数组划分成前后两部分，继续排序，最后排序结束。

~~~js
this.quickSort = function() {
  quick(array, 0, array.length - 1);
}

function quick(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quick(array, left, index - 1);
    }
    if (index < right) {
      quick(array, index, right);
    }
  }
}

function partition(array, left, right) {
  // 主元可以随机选择；通常选择中间一个排序性能较好
  let middle = array[Math.floor((left + right) / 2)];
  let i = left, j = right;
  while (i < j) {
    while (array[i] < middle) {
      i++;
    }
    while (array[j] > middle) {
      j--;
    }
    if (i <= j) {
      swapQuickStort(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function swapQuickStort(array, index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
~~~

### 搜索算法

#### 1 顺序搜索

最低效的搜索方法，需要遍历整个数组。

~~~js
function sequentialSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}
~~~

#### 2 二分搜索

要求被搜索的数组已经排序，然后找到中间的值，和目标值相比较，直到找到目标值。

~~~js
this.binarySearch = function(target) {
  this.quickSort();
  let low = 0, height = array.length - 1;
  let middle, element;
  while (low <= height) {
    mid = Math.floor((low + height) / 2);
    element = array[mid];
    if (element < target) {
      low = middle + 1
    } else if (element > target) {
      height = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
~~~

## 第十一章 算法补充

### 递归

递归：把一个复杂问题转化成多步重复计算。可以一个函数调用自己，可以两个函数互相调用。

在ES6中，可以使用尾调用（函数最后一句代码调用函数）进行优化。其他语言中递归性能不好，ES6通过尾递归可以优化性能。
注意：递归需要有边界条件，避免无限递归造成浏览器内存溢出（stack overflow error）。例如斐波那契数列：

~~~js
function fibonacci(n) {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2)
}
// 非递归写法
function fib(num) {
  let result = 1;
  let n1 = 1, n2 = 1;
  for (let i = 3; i < num; i++) {
    result = n1 + n2;
    n1 = n2;
    n2 = result;
  }
  return result;
}
~~~

递归代码量很少，更容易理解；难点是边界条件和开始条件。

### 动态规划

分而治之：把一个复杂的问题分解成很多无关联的小问题（例如接雨水）。

动态规划：把一个复杂的问题分解成很多关联的小问题（识别子问题和边界条件）下面是典型问题

~~~markdown
- 背包问题:给出一组项目，各自有值和容量，目标是找出总值最大的项目的集合。这个 问题的限制是，总容量必须小于等于“背包”的容量。
- 最长公共子序列:找出一组序列的最长公共子序列(可由另一序列删除元素但不改变余 下元素的顺序而得到)。
- 矩阵链相乘:给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法(计算次数尽可 能少)。相乘操作不会进行，解决方案是找到这些矩阵各自相乘的顺序。
- 硬币找零:给出面额为d1...dn的一定数量的硬币和要找零的钱数，找出有多少种找零的 方法。
- 图的全源最短路径:对所有顶点对(u, v)，找出从顶点u到顶点v的最短路径。
~~~

### 最少硬币找零算法

硬币找零问题是给出要找零的钱数，以及可 用的硬币面额d1...dn及其数量，找出有多少种找零方法。

最少硬币找零问题是给出要找零的钱数， 以及可用的硬币面额d1...dn及其数量，找到所需的最少的硬币个数（就是上面硬币找零算法结果中，硬币最少的一种算法）。 

例如：美国有以下面额(硬币):d1=1，d2=5，d3=10，d4=25。 如果要找36美分的零钱，我们可以用1个25美分、1个10美分和1个便士(1美分)。 

~~~js
function MinCoinChange(coins) {
  let coins = coins;
  let cache = {};
  this.makeChange = (amount) => {
    let me = this;
    if (!amount) return [];
    if (cache[amount]) return cache[amount];
    
    let min = [], newMin, newAmount;
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i];
      newAmount = amount - coin;
      if (newAmount >= 0) {
        // 递归获取最小值
        newMin = me.makeChange(newAmount);
      }
      if (newAmount >=0 && (newMin.length < min.length - 1) || !min.length) && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin);
        console.log(min, amount);
      }
    }
    return (cache[amount] = min);
  }
}
~~~

### 贪心算法

贪心算法：追求每一个局部的问题的最优解。大部分情况下可以获取正确的值，少出情况不是最优解，这样写性能很好。

~~~js
function MinCoinChange(coins) {
  let coins = coins;
  // 这里的coins是从小到大排序的，然后依次把最大的值加入到total中，然后把coin存储在change中
  this.makeChange = (amount) => {
    let change = [];
    let total = 0;
    for (let i = coins.length; i >= 0; i--) {
      let coin = coins[i];
      while (total + coin <= amount) {
        change.push(coin);
        total += coin;
      }
    }
    return change;
  }
}
~~~

如果是 [1, 5, 10, 25] target 36 可以算对；如果是[1, 3, 4] target 6 就会算错

如果对算法精度要求不高，贪心算法可以在较好的时间内计算出可以接受的答案。

### 大O表示法与时间复杂度

如果算法的计算时间和传入参数大小无关，即算法的耗时是一个常数，那么复杂度就是O1

~~~js
function add (a,b) {
  return a + b;
}
~~~

如果算法的计算时间和传入的数组的参数个数相等，那么就是On

~~~js
function index(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
~~~

如果计算时间和数组的参数的平方相等，就是On2，例如冒泡排序法的内循环*外循环

常见的算法复杂度的计算



最后列出算法比赛的网站

- UVa Online Judge(http://uva.onlinejudge.org/):这个网站包含了世界各大赛事的题目， 包括由IBM赞助的ACM国际大学生程序竞赛 ICPC 

- Sphere Online Judge(http://www.spoj.com/): 这个网站和UVa Online Judge差不多，但支 

  持用更多语言解题(包括JavaScript)。 

-   Coder Byte(http://coderbyte.com/):这个网站包含了74个可以用JavaScript解答的题目(简 

  单、中等难度和非常困难)。 

-   Project Euler(https://projecteuler.net/):这个网站包含了一系列数学/计算机的编程题目。 

  你所要做的就是输入那些题目的答案，不过我们可以用算法来找到正确的解答。 Hacker Rank(https://www.hackerrank.com):这个网站包含了263个挑战，分为16个类别 

  (可以应用本书中的算法和更多其他算法)。它也支持JavaScript和其他语言。 

-   Code Chef(http://www.codechef.com/):这个网站包含一些题目，并会举办在线比赛。 

-   Top Coder(http://www.topcoder.com/):此网站会举办算法联赛，这些联赛通常由NASA、 

  Google、Yahoo!、Amazon和Facebook这样的公司赞助。参加其中一些赛事，你可以获得 到赞助公司工作的机会，而参与另一些赛事会赢得奖金。这个网站也提供很棒的解题和 算法教程。 
