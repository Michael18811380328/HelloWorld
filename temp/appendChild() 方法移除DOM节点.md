# HTML DOM appendChild() 方法

## 实例

添加列表项:

`document.getElementById("myList").appendChild(newListItem);`

## 定义和用法

appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。

**提示：**如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。

你可以使用 appendChild() 方法移除元素到另外一个元素。

## 实例

转移某个列表项到另外一个列表项：

~~~js
var node=document.getElementById("myList2").lastChild;
document.getElementById("myList1").appendChild(node);
~~~

