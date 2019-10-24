// BST： binary search tree 二叉搜索树是特殊的二叉树
// 树结构的核心就是遍历树节点，或者把字符串转化成树结构（DOM树）
// 遍历二叉树：左节点 自身 右节点

function BinarySearchTree() {
  
  let Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  this.root = null;

  this.insert = function(key) {
    let newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  }

  let insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      //
    }
  }
}