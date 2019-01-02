### Selection 学习

Selection对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的Selection对象，请调用 [`window.getSelection()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)。

 

用户可能从左到右（与文档方向相同）选择文本或从右到左（与文档方向相反）选择文本。**anchor**指向用户开始选择的地方，而**focus**指向用户结束选择的地方。如果你使用鼠标选择文本的话，anchor 就指向你按下鼠标键的地方，而focus就指向你松开鼠标键的地方。anchor 和 focus 的概念不能与选区的起始位置和终止位置混淆，因为anchor指向的位置可能在focus指向的位置的前面，也可能在focus指向位置的后面，这取决于你选择文本时鼠标移动的方向（也就是按下鼠标键和松开鼠标键的位置）。

 

Selection对象所对应的是用户所选择的 [`ranges`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range) （区域），俗称拖蓝。默认情况下，该函数只针对一个区域，我们可以这样使用这个函数：

```
var selObj = window.getSelection();
var range  = selObj.getRangeAt(0);
```

- `selObj 被赋予一个 `Selection对象
- `range `被赋予一个 [Range](https://developer.mozilla.org/en-US/docs/DOM/range) 对象

调用 [`Selection.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/toString) 方法会返回被选中区域中的**纯文本**。要求变量为字符串的函数会自动对对象进行该处理，例如：

```
var selObj = window.getSelection();
window.alert(selObj);
```

## 术语表

本页面使用的其他关键词汇：

- 锚点（anchor）

  锚指的是一个选区的起始点（不同于HTML中的锚点链接，译者注）。当我们使用鼠标框选一个区域的时候，锚点就是我们鼠标按下瞬间的那个点。在用户拖动鼠标时，锚点是不会变的。

- 焦点（focus）

  选区的焦点是该选区的终点，当您用鼠标框选一个选区的时候，焦点是你的鼠标松开瞬间所记录的那个点。随着用户拖动鼠标，焦点的位置会随着改变。

- 范围（range）

  范围指的是文档中连续的一部分。一个范围包括整个节点，也可以包含节点的一部分，例如文本节点的一部分。用户通常下只能选择一个范围，但是有的时候用户也有可能选择多个范围（例如当用户按下Control按键并框选多个区域时，Chrome中禁止了这个操作，译者注）。“范围”会被作为[`range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)对象返回。Range对象也能通过DOM创建、增加、删减。

## 属性

- [`anchorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/anchorNode)

  返回该选区起点所在的节点（[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)）。

- [`anchorOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/anchorOffset)

  返回一个数字，其表示的是选区起点在 [`anchorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/anchorNode) 中的位置偏移量。如果 anchorNode 是文字节点，那么返回的就是从该文字节点的第一个字开始，直到被选中的第一个字之间的字数（如果第一个字就被选中，那么偏移量为零）。如果 anchorNode 是一个元素，那么返回的就是在选区第一个节点之前的同级节点总数。(这些节点都是 anchorNode 的子节点)

- [`focusNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/focusNode)

  返回该选区终点所在的节点。

- [`focusOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/focusOffset)

  返回一个数字，其表示的是选区终点在 [`focusNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/focusNode) 中的位置偏移量。如果 focusNode 是文字节点，那么选区末尾未被选中的第一个字，在该文字节点中是第几个字（从0开始计），就返回它。如果 focusNode 是一个元素，那么返回的就是在选区末尾之后第一个节点之前的同级节点总数。

- [`isCollapsed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/isCollapsed)

  返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置。

- [`rangeCount`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/rangeCount)

  返回该选区所包含的连续范围的数量。

## 方法

- [`getRangeAt`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/getRangeAt)

  返回选区开始的节点（[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)）。

- [`collapse`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/collapse)

  将当前的选区折叠为一个点。

- [`extend`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/extend)

  将选区的焦点移动到一个特定的位置。

- [`modify`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/modify)

  修改当前的选区。

- [`collapseToStart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/collapseToStart)

  将当前的选区折叠到起始点。

- [`collapseToEnd`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/collapseToEnd)

  将当前的选区折叠到最末尾的一个点。

- [`selectAllChildren`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/selectAllChildren)

  将某一指定节点的子节点框入选区。

- [`addRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/addRange)

  一个区域（[`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)）对象将被加入选区。

- [`removeRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/removeRange)

  从选区中移除一个区域。

- [`removeAllRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/removeAllRanges)

  将所有的区域都从选区中移除。

- [`deleteFromDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/deleteFromDocument)

  从页面中删除选区中的内容。

- [`selectionLanguageChange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/selectionLanguageChange)

  当键盘的朝向发生改变后修改指针的Bidi优先级。

- [`toString`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/toString)

  返回当前选区的纯文本内容。

- [`containsNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/containsNode)

  判断某一个node是否为当前选区的一部分。

## 扩展

- [`window.getSelection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection), [`document.getSelection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getSelection), [Range](https://developer.mozilla.org/en-US/docs/DOM/range)
- HTML5 DOM Range [Interface Selection](http://html5.org/specs/dom-range.html#selection)
- [IDL definition in Mozilla cross-reference](http://lxr.mozilla.org/mozilla/source/content/base/public/nsISelection.idl)
- [目前 CSS 实现竖排文本较为通用的方式是什么？](http://www.zhihu.com/question/20874144)（页内搜索"Bidi"可了解Bidi优先顺序）