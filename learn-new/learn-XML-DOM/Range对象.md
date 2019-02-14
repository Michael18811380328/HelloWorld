## Range 对象

### 定义概念

Range (范围)是文档中连续范围区域，例如用鼠标选中的区域。

主要用途：文档中的删除、剪切、复制、粘贴文本。

~~~js
deleteContents()
extractContents()
cloneContents()
insertNode()
~~~

一个 range 具有两个边界点（anchor-focus）。每一个边界点由一个节点（anchor-node focus-node）和一个偏移量（anchor-offset focus-offset）构成。这个节点可以是 element/document/text 节点。对于 element 和 document 节点，偏移量指的是位于子节点的位置；对于 text 节点，偏移量指的是文本中两个字符间的位置。

### 属性

在一个 range 中，所有的属性都是只读的。只能通过方法改变range，才能改变对应的属性。

~~~js
collapsed 选中部分是否折叠(开始点和结束点是否重合)
commonAncestorContainer Range中的开始点和结束点的祖先节点
startOffset-endOffset 开始点结束点的偏移量
startContainer-endContainer 开始点处于的Document节点
~~~

### 方法

~~~js
cloneContents();
// 复制 Document Fragment 对象
deleteContents()；
// 删除 Range 对象表示的 Document 区域
extractContents();
// 剪切 当前范围的文本区域；(界面介绍，方法返回 Document Fragment 对象)

cloneRange();
// 复制 range 

collapse(); 
// 折叠当前选中部分
detach()；
// 停止跟踪(detach操作后，当前range的其他方法失效并报错)
toString()；
// 返回该范围表示的文档区域的纯文本内容

compareBoundaryPoints(); 
// 比较当前范围的边界点和另一个范围的边界点；返回值 0 -1 1

insertNode();
// 将制定的节点插入文档范围的开始点
selectNode();
// 选择Range对应的边界点，包含节点和子孙节点
selectNodeContents();
// 选择边界点的子孙节点(不包含外部这个节点)

setStart(); setEnd();
// 设置开始节点为指定的节点和偏移量；
~~~

range 常用在复制、粘贴文本，配合鼠标事件的触发，获取当前选中的部分，并将选中的document fragment 复制粘贴创建新的 node 节点，并插入到指定位置。获取节点的偏移量从而获取选中的部分。

注意：上面的属性方法基于 XML，slate 中的独有的方法不完全相同。