### Range对象学习

Range表示包含节点和部分文本节点的文档片段。

 `Range`可以用 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象的 [`createRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createRange)方法创建，也可以用[`Selection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)对象的[`getRangeAt`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/getRangeAt)方法取得。另外，可以通过构造函数 [`Range()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/Range) 来获得一个 `Range `。

### 属性[节](https://developer.mozilla.org/zh-CN/docs/Web/API/Range#Properties)

- [`Range.collapsed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapsed) 只读

  返回一个用于判断 `Range `起始位置和终止位置是否相同的布尔值。

- [`Range.commonAncestorContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/commonAncestorContainer) 只读

  返回包含 `startContainer `和 endContainer 的最深的节点。

- [`Range.endContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/endContainer) 只读

  返回包含 `Range `终点的节点。

- [`Range.endOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/endOffset) 只读

  返回 endContainer 中表示Range终点位置的数字。

- [`Range.startContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/startContainer) 只读

  返回包含 `Range `开始的节点。

- [`Range.startOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/startOffset) 只读

  返回 startContainer 中表示 `Range `起始位置的数字。

### 方法[节](https://developer.mozilla.org/zh-CN/docs/Web/API/Range#Methods)

#### 定位方法

1.setStart:表示某个节点的range对象的起点位置; 

2.setEnd:表示某个节点的range对象的结束位置;

3.setStartBefore:表示用于将某个节点的起点位置设置为range对象的起点位置;

 4.setStartAfter:表示用于将某个节点的终点位置设置为range对象的起点位置; 

5.setEndBefore:表示用于将某个节点的起点位置设置为range对象的终点位置; 

6.setEndAfter:表示用于将某个节点的终点位置设置为range对象的终点位置;



*我们没有在此列举继承方法。*

- [`Range.setStart()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStart)

  设置 `Range 的起点`。

- [`Range.setEnd()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEnd)

  设置 `Range `的终点。

- [`Range.setStartBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStartBefore)

  以其它节点 （ [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)）为基准，设置 `Range `的起点。

- [`Range.setStartAfter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStartAfter)

  以其它节点为基准，设置 `Range `的始点。

- [`Range.setEndBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEndBefore)

  以其它节点为基准，设置 `Range `的终点。

- [`Range.setEndAfter()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEndAfter)

  以其它节点为基准，设置 `Range `的终点。

- [`Range.selectNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/selectNode)

  设定一个包含节点和节点内容的 `Range` 。

- [`Range.selectNodeContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/selectNodeContents)

  设定一个包含某个节点内容的 `Range` 。

- [`Range.collapse()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapse)

  向指定端点折叠该 `Range` 。

#### 编辑方法

*通过以下方法，可以从 Range 中获得节点，改变 Range 的内容。*

- [`Range.cloneContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/cloneContents)

  返回 `Range `当中节点的文档片段（[`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)）。

- [`Range.deleteContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/deleteContents)

  从文档（[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)）中移除 `Range` 中的内容。

- [`Range.extractContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/extractContents)

  把 `Range` 的内容从文档树移动到文档片段中。

- [`Range.insertNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/insertNode)

  在 `Range 的`起点处插入节点。

- [`Range.surroundContents()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/surroundContents)

  将 `Range 的内容移动到一个新的节点中。`

#### 其他方法

- [`Range.compareBoundaryPoints()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/compareBoundaryPoints)

  比较两个 `Range` 的端点。

- [`Range.cloneRange()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/cloneRange)

  返回拥有和原 `Range` 相同端点的克隆 `Range` 对象。

- [`Range.detach()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/detach)

  从使用状态释放 `Range，此方法用于改善性能`。

- [`Range.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/toString)

  把Range内容作为字符串返回。

#### Gecko 方法

*在这里解释Mozilla独有的，在W3C DOM标准里没有的* `Range`*方法。*

- [`Range.compareNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/compareNode) 

  返回常量，表示node是否在range的前、后、中、外。

- [`Range.comparePoint()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/comparePoint) 

  返回-1、0、1，分别表示指定点在range的前、中、后。

- [`Range.createContextualFragment()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/createContextualFragment)

  解析指定字符串（XML或HTML），并返回document fragment。

-  

- [`Range.intersectsNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/intersectsNode) 

  返回boolean值，表示指定Node是否横断Range。

- [`Range.isPointInRange()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/isPointInRange) 

  返回boolean值，表示指定点是否在range中。

-  

- [`Range.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getBoundingClientRect) 

  Returns a [`ClientRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClientRect) object which bounds the entire contents of the`Range`; this would be the union of all the rectangles returned by [`range.getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getClientRects).

- [`Range.getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getClientRects) 

  Returns a list of [`ClientRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/ClientRect) objects that aggregates the results of [`Element.getClientRects()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects) for all the elements in the `Range`.