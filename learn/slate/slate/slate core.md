## slate core

# 1.Document

```
import { Document } from 'slate'
```

Slate 中文档模型的顶层节点。

Document 是由 **block 节点、inline 节点和 text 节点**组成的——和 DOM 一致。注意 document 节点的直接子节点必须是 block 节点。

在一些地方，你会看到 "fragment" 的概念，这实际上是未挂载到主 `State` 的 `Docuement` 对象。例如，在剪贴选择的内容时，我们认为内容是一个文档 "fragment"。

## Properties

```js
Document({
  nodes: Immutable.List<Node>,
})
// immutable 不可改变的
```

### `data`

`Immutable.Map`

任意与 document 关联的 data 对象。默认为空 `Map`。

### `nodes`

`Immutable.List`

子节点列表。

## Computed Properties

### `kind`

`String`

不可变的 String，值为 `document` 以便于将这类节点与 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)、[`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 和 [`Text`](https://doodlewind.github.io/slate-doc-cn/reference/slate/text.html) 节点区分开。

### `text`

`String`

该节点的全部子 [`Text`](https://doodlewind.github.io/slate-doc-cn/reference/slate/text.html) 节点连接成的字符串。

## Static Methods

### `Document.create`

`Document.create(properties: Object) => Document`

由原生 JS `properties` 对象创建一个 document。

### `Document.fromJSON`

`Document.fromJSON(object: Object) => Document`

由 JSON `object` 创建一个 document。

### `Document.isDocument`

`Document.isDocument(maybeDocument: Any) => Boolean`

返回传入的参数是否为 `Document` 的 boolean 值。

## Node Methods

Document 实现了 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 接口。对所有 node 方法的相关信息，参见 [`Node` 文档](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html)。

## Instance Methods

### `toJSON`

`toJSON() => Object`

返回 document 的 JSON 表示。



# 2.Change

```js
import { Change } from 'slate'
```

change在slate中不是动词，是一个对象！！！创建change对象，通过onChange(change)执行对象并进行页面的渲染。change.value需要深入研究（一部分属性和方法在浏览器中没有显示）。

change的作用类似于react中setstate，通过设置change对象并执行，可以在editor界面中进行文本调整。当前对于选中的部分增加链接，就是根据selection部分，change对应的属性和方法，增加链接。



通过 Change，你可以定义一系列对当前 [`State`](https://doodlewind.github.io/slate-doc-cn/reference/slate/state.html) 中 [`Document`](https://doodlewind.github.io/slate-doc-cn/reference/slate/document.html) 或 [`Selection`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html) 的变换。

所有的变换都是都通过 `Change` 对象实现的，因而变换的历史能够在撤销、重做操作中保存，并使协同编辑成为可能。

变换可以操作 [`Document`](https://doodlewind.github.io/slate-doc-cn/reference/slate/document.html) 、[`Selection`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html)，或同时操作二者。

- Properties
  - [`state`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#state)
- Methods
  - [`apply`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#apply)
  - [`call`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#call)
- Current State Changes 当前状态的变化
  - [`deleteBackward`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deletebackward)
  - [`deleteForward`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deleteforward)
  - [`delete`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#delete)
  - [`insertBlock`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertblock)
  - [`insertFragment`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertfragment)
  - [`insertInline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertinline)
  - [`insertText`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#inserttext)
  - [`addMark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#addmark)
  - [`setBlock`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setblock)
  - [`setInline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setinline)
  - [`splitBlock`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#splitblock)
  - [`splitInline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#splitinline)
  - [`removeMark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#removemark)
  - [`toggleMark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#togglemark)
  - [`unwrapBlock`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapblock)
  - [`unwrapInline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapinline)
  - [`wrapBlock`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapblock)
  - [`wrapInline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapinline)
  - [`wrapText`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wraptext)
- Selection Changes 选中部分状态的变化
  - [`blur`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#blur)
  - [`collapseTo{Edge}Of`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#collapsetoedgeof)
  - [`collapseTo{Edge}Of{Direction}Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#collapsetoedgeofdirectionblock)
  - [`collapseTo{Edge}Of{Direction}Text`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#collapsetoedgeofdirectiontext)
  - [`collapseTo{Edge}`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#collapsetoedge)
  - [`extendTo{Edge}Of`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#extendtoedgeof)
  - [`extend`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#extend)
  - [`flip`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#flip)
  - [`focus`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#focus)
  - [`move`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#move)
  - [`move{Edge}`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#moveedge)
  - [`moveOffsetsTo`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#moveoffsetsto)
  - [`moveToRangeOf`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#movetorangeof)
  - [`select`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#select)
  - [`selectAll`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#selectall)
  - [`deselect`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deselect)
- Node Changes 节点变化
  - [`addMarkByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#addmarkbykey)
  - [`insertNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertnodebykey)
  - [`insertFragmentByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertfragmentbykey)
  - [`insertTextByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#inserttextbykey)
  - [`moveNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#movenodebykey)
  - [`removeMarkByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#removemarkbykey)
  - [`removeNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#removenodebykey)
  - [`removeTextByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#removetextbykey)
  - [`setMarkByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setmarkbykey)
  - [`setNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setnodebykey)
  - [`splitNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#splitnodebykey)
  - [`unwrapInlineByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapinlinebykey)
  - [`unwrapBlockByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapblockbykey)
  - [`unwrapNodeByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapnodebykey)
  - [`wrapBlockByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapblockbykey)
  - [`wrapInlineByKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapinlinebykey)
- Document Changes 文档树变化
  - [`deleteAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deleteatrange)
  - [`deleteBackwardAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deletebackwardatrange)
  - [`deleteForwardAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#deleteforwardatrange)
  - [`insertBlockAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertblockatrange)
  - [`insertFragmentAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertfragmentatrange)
  - [`insertInlineAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#insertinlineatrange)
  - [`insertTextAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#inserttextatrange)
  - [`addMarkAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#addmarkatrange)
  - [`setBlockAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setblockatrange)
  - [`setInlineAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#setinlineatrange)
  - [`splitBlockAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#splitblockatrange)
  - [`splitInlineAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#splitinlineatrange)
  - [`removeMarkAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#removemarkatrange)
  - [`toggleMarkAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#togglemarkatrange)
  - [`unwrapBlockAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapblockatrange)
  - [`unwrapInlineAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#unwrapinlineatrange)
  - [`wrapBlockAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapblockatrange)
  - [`wrapInlineAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wrapinlineatrange)
  - [`wrapTextAtRange`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#wraptextatrange)
- History Changes
  - [`redo`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#redo)
  - [`undo`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#undo)

## Properties

### `state`

当前 change 所应用到的 [`State`](https://doodlewind.github.io/slate-doc-cn/reference/slate/state.html)。 每次执行新的 change 函数，都会更新该属性。

（调用change的方法会更新state属性，state框架不需要操作者直接更新属性，通过change函数即可更新state属性。所以一定在设置change对象后更新属性，否则设置的属性不会生效。）



## Methods

### `apply`

`apply(options: Object) => Change`

应用当前 change 步骤，若需要则将其保存到历史记录中。

### `call`

`call(customChange: Function, ...arguments) => Change`

该方法调用 `customChange` 函数，将当前的 `Change` 对象实例作为第一个参数传入，并传入剩余的其它参数。

`customChange` 的函数签名为：

`customChange(change: Change, ...arguments)`

`call` 的作用是允许编写自定义的 change 函数并使其支持链式调用。例如：

```
return state.change()
  .call(myCustomInsertTableChange, columns, rows)
  .focus()
  .apply()
```

## Current State Changes

### `deleteBackward`

`deleteBackward(n: Number) => Change`

在当前光标位置向后删除 `n` 个字符。若选择范围已扩展，这个方法等价于一个普通的 [`delete()`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#delete)。`n` 默认为 `1`。

### `deleteForward`

`deleteForward(n: Number) => Change`

在当前光标位置向前删除 `n` 个字符。若选择范围已扩展，这个方法等价于一个普通的 [`delete()`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#delete)。`n` 默认为 `1`。

### `delete`

`delete() => Change`

删除当前选择范围内的所有内容。

### `insertBlock`

`insertBlock(block: Block) => Change` 
`insertBlock(properties: Object) => Change` 
`insertBlock(type: String) => Change`

在与当前 block 同深度的位置插入一个新 block，若当前 block 非空，将其切分为两个 block 以为其腾出空间。若选择范围已扩展，则先将其删除。

### `insertFragment`

`insertFragment(fragment: Document) => Change`

在当前选择位置插入一个 [`fragment`](https://doodlewind.github.io/slate-doc-cn/reference/slate/document.html)。若选择范围已扩展，则先将其删除。



#############

### `insertInline`

`insertInline(inline: Inline) => Change` 
`insertInline(properties: Object) => Change`

在当前光标位置插入一个新 inline，若当前 text 非空，将其切分为两个以为其腾出空间。若选择范围已扩展，则先将其删除。

### `insertText`

`insertText(text: String) => Change`

在当前选择位置插入一个 text 字符串。若选择范围已扩展，则先将其删除。

### `addMark`

`addMark(mark: Mark) => Change` 
`addMark(properties: Object) => Change` 
`addMark(type: String) => Change`

为当前选择范围的字符添加 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。为方便起见，你可以传入 `type` 字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `setBlock`

`setBlock(properties: Object) => Change` 
`setBlock(type: String) => Change`

根据 `properties` 设置当前选择范围内 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)。为方便起见，你可以传入 `type` 字符串作为该 block 的类型。

### `setInline`

`setInline(properties: Object) => Change` 
`setInline(type: String) => Change`

根据 `properties` 设置当前选择范围内 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html)。为方便起见，你可以传入 `type` 字符串作为该 inline 的类型。

### `splitBlock`

`splitBlock(depth: Number) => Change`

根据 `depth` 级别来切分当前选择范围内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)。若选择范围已扩展，则先将其删除。`depth` 默认为 `1`。

### `splitInline`

`splitInline(depth: Number) => Change`

根据 `depth` 级别来切分当前选择范围内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)。若选择范围已扩展，则先将其删除。`depth` 默认为 `Infinity`。

### `removeMark`

`removeMark(mark: Mark) => Change` 
`removeMark(properties: Object) => Change` 
`removeMark(type: String) => Change`

移除当前选择范围字符的 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。为方便起见，你可以传入 `type` 字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `toggleMark`

`toggleMark(mark: Mark) => Change` 
`toggleMark(properties: Object) => Change` 
`toggleMark(type: String) => Change`

添加或删除当前选择范围字符的 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)，依据是其是否存在于选择范围内。为方便起见，你可以传入 `type` 字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `unwrapBlock`

`unwrapBlock([type: String], [data: Data]) => Change`

根据对 `type` 和 / 或 `data` 的匹配，解包所有当前选择范围内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点。

### `unwrapInline`

`unwrapInline([type: String], [data: Data]) => Change`

根据对 `type` 和 / 或 `data` 的匹配，解包所有当前选择范围内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点。

### `wrapBlock`

`wrapBlock(type: String, [data: Data]) => Change`

使用类型为 `type` 的新 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 将当前选择范围内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点包裹起来，可附加 `data` 信息。

### `wrapInline`

`wrapInline(type: String, [data: Data]) => Change`

使用类型为 `type` 的新 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 将当前选择范围内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 节点包裹起来，可附加 `data` 信息。

### `wrapText`

`wrapText(prefix: String, [suffix: String]) => Change`

将当前选择范围内的文本用 `prefix` 和 `suffix` 字符串围起来。若省略了 `suffix`，将使用 `prefix` 替代之。



## Selection Changes

### `blur`

`blur() => Change`

使当前选择范围失去焦点。

### `collapseTo{Edge}`

`collapseTo{Edge}() => Change`

将当前选择范围收缩至其 `{Edge}`。`{Edge}` 可为 `Anchor`、`Focus`、`Start` 或 `End`。

### `collapseTo{Edge}Of`

`collapseTo{Edge}Of(node: Node) => Change`

将当前选择范围收缩至 `node` 的 `{Edge}`。`{Edge}` 可为 `Start` 或 `End`。

### `collapseTo{Edge}Of{Direction}Block`

`collapseTo{Edge}Of{Direction}Block() => Change`

将当前选择范围按照 `{Direction}` 方向收缩至下一个 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点的 `{Edge}`。`{Edge}` 可为 `Start`或 `End`，`{Direction}` 可为 `Next` 或 `Previous`。

### `collapseTo{Edge}Of{Direction}Text`

`collapseTo{Edge}Of{Direction}Text() => Change`

将当前选择范围按照 `{Direction}` 方向收缩至下一个 [`Text`](https://doodlewind.github.io/slate-doc-cn/reference/slate/text.html) 节点的 `{Edge}`。`{Edge}` 可为 `Start`或 `End`，`{Direction}` 可为 `Next` 或 `Previous`。

### `extend`

`extend(n: Number) => Change`

将当前选择范围扩展 `n` 个字符。`n` 的正负用于指示方向。

### `extendTo{Edge}Of`

`extendTo{Edge}Of(node: Node) => Change`

将当前选择范围扩展至 `node` 的 `{Edge}`。`{Edge}` 可为 `Start` 或 `End`。

### `flip`

`flip() => Change`

翻转当前选择范围。

### `focus`

`focus() => Change`

使当前选择范围获得焦点。

### `move`

`move(n: Number) => Change`

根据 `n` 移动当前选择范围的偏移量。

### `move{Edge}`

`move{Edge}(n: Number) => Change`

根据 `n` 移动当前选择范围 `{Edge}` 的偏移量。`{Edge}` 可为 `Start` 或 `End`。

### `moveOffsetsTo`

`moveOffsetsTo(anchorOffset: Number, focusOffset: Number) => Change`

将当前选择范围移动至新的 `anchorOffset` 和 `focusOffset`。

### `moveToRangeOf`

`moveToRangeOf(node: Node) => Change`

将当前选择范围的锚点移动至 `node` 的开始，焦点移动至 `node` 的结束。

### `select`

`select(properties: Selection || Object) => Change`

使用合并的 `properties` 更新当前选择范围。`properties` 可为 [`Selection`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html) 对象或带 selection 相关属性的原生 JS 对象。

### `selectAll`

`selectAll() => Change`

选择当前全部文档内容并获得焦点。

### `deselect`

`deselect() => Change`

取消选择。

## Node Changes

### `addMarkByKey`

`addMarkByKey(key: String, offset: Number, length: Number, mark: Mark) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，为其中由 `offset` 开始的 `length` 个字符添加 `mark`。

### `insertNodeByKey`

`insertNodeByKey(key: String, index: Number, node: Node) => Change`

根据父 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，在其中的 `index` 位置插入 `node`。

### `insertFragmentByKey`

`insertFragmentByKey(key: String, index: Number, fragment: Fragment) => Transform`

根据父 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，在其中的 `index` 位置插入 [`Fragment`](https://doodlewind.github.io/slate-doc-cn/reference/slate/fragment.md)。

### `insertTextByKey`

`insertTextByKey(key: String, offset: Number, text: String, [marks: Set]) => Change`

根据父 [`Text Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/text.html) 的 `key`，在其中从 `offset` 起的位置插入带可选 `marks` 的 `text`。

### `moveNodeByKey`

`moveNodeByKey(key: String, newKey: String, newIndex: Number) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，将其移动到带 `newKey` 的新父节点下，相应下标为 `newIndex`。

### `removeMarkByKey`

`removeMarkByKey(key: String, offset: Number, length: Number, mark: Mark) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，移除其中从 `offset` 开始 `length` 个字符的 `mark`。

### `removeNodeByKey`

`removeNodeByKey(key: String) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，将其从文档中移除。

### `removeTextByKey`

`removeTextByKey(key: String, offset: Number, length: Number) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，移除其中从 `offset` 开始 `length` 个字符的文本。

### `setMarkByKey`

`setMarkByKey(key: String, offset: Number, length: Number, mark: Mark, properties: Object) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，为其设置 `properties` 词典对应的 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `setNodeByKey`

`setNodeByKey(key: String, properties: Object) => Change` 
`setNodeByKey(key: String, type: String) => Change`

根据 [`Node`](https://doodlewind.github.io/slate-doc-cn/reference/slate/node.html) 的 `key`，为其设置 `properties` 词典。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `splitNodeByKey`

`splitNodeByKey(key: String, offset: Number) => Change`

根据从 `offset` 开始的 `key` 切分节点。

### `unwrapInlineByKey`

`unwrapInlineByKey(key: String, properties: Object) => Change` 
`unwrapInlineByKey(key: String, type: String) => Change`

根据 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 的 `key`，解包其中匹配 `properties` 的节点。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `unwrapBlockByKey`

`unwrapBlockByKey(key: String, properties: Object) => Change` 
`unwrapBlockByKey(key: String, type: String) => Change`

根据 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 的 `key`，解包其中匹配 `properties` 的节点。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `unwrapNodeByKey`

`unwrapNodeByKey(key: String) => Change`

根据 `key`，将节点从其父节点中解包出来。若该节点前后存在兄弟节点，则切分其父节点。若该节点为唯一子节点，则将父节点移除并替换为该节点。不支持解包根节点。

### `wrapBlockByKey`

`wrapBlockByKey(key: String, properties: Object) => Change` 
`wrapBlockByKey(key: String, type: String) => Change`

将满足 `properties` 的给定节点包裹在 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点中。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `wrapInlineByKey`

`wrapInlineByKey(key: String, properties: Object) => Change` 
`wrapInlineByKey(key: String, type: String) => Change`

将满足 `properties` 的给定节点包裹在 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 节点中。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

## Document Changes

### `deleteBackwardAtRange`

`deleteBackwardAtRange(range: Selection, n: Number) => Change`

在 `range` 中向后删除 `n` 个字符。若 `range` 处于展开状态，该方法等价于普通的 [`delete()`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#delete)。`n` 默认为 `1`。

### `deleteForwardAtRange`

`deleteForwardAtRange(range: Selection, n: Number) => Change`

在 `range` 中向前删除 `n` 个字符。若 `range` 处于展开状态，该方法等价于普通的 [`delete()`](https://doodlewind.github.io/slate-doc-cn/reference/slate/change.html#delete)。`n` 默认为 `1`。

### `deleteAtRange`

`deleteAtRange(range: Selection, ) => Change`

删除 `range` 中全部内容。

### `insertBlockAtRange`

`insertBlockAtRange(range: Selection, block: Block) => Change` 
`insertBlockAtRange(range: Selection, properties: Object) => Change` 
`insertBlockAtRange(range: Selection, type: String) => Change`

在 `range` 中与叶子 block 相同深度的位置，插入新 block。若当前 block 非空，将其切分以腾出空间。若选择范围已扩展，则先将其删除。

### `insertFragmentAtRange`

`insertFragmentAtRange(range: Selection, fragment: Document) => Change`

在 `range` 中插入一个 [`fragment`](https://doodlewind.github.io/slate-doc-cn/reference/slate/document.html)。若当前 block 非空，将其切分以腾出空间。若选择范围已扩展，则先将其删除。

### `insertInlineAtRange`

`insertInlineAtRange(range: Selection, inline: Inline) => Change` 
`insertInlineAtRange(range: Selection, properties: Object) => Change`

在 `range` 中插入一个 inline 节点。若当前文本非空，将其切分以腾出空间。若选择范围已扩展，则先将其删除。

### `insertTextAtRange`

`insertTextAtRange(range: Selection, text: String) => Change`

在 `range` 中插入一个 `text` 字符串。若选择范围已扩展，则先将其删除。

### `addMarkAtRange`

`addMarkAtRange(range: Selection, mark: Mark) => Change` 
`addMarkAtRange(range: Selection, properties: Object) => Change` 
`addMarkAtRange(range: Selection, type: String) => Change`

在 `range` 中添加 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。为方便起见，你可以传入 `type` 字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `setBlockAtRange`

`setBlockAtRange(range: Selection, properties: Object) => Change` 
`setBlock(range: Selection, type: String) => Change`

在 `range` 中设置 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 的 `properties`。为方便起见，你可以传入 `type` 字符串来设置 block 类型。

### `setInlineAtRange`

`setInlineAtRange(range: Selection, properties: Object) => Change` 
`setInline(range: Selection, type: String) => Change`

在 `range` 中设置 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 的 `properties`。为方便起见，你可以传入 `type` 字符串来设置 inline 类型。

### `splitBlockAtRange`

`splitBlockAtRange(range: Selection, depth: Number) => Change`

根据 `depth` 级别来切分 `range` 内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)。若选择范围已扩展，则先将其删除。`depth` 默认为 `1`。

### `splitInlineAtRange`

`splitInlineAtRange(range: Selection, depth: Number) => Change`

根据 `depth` 级别来切分 `range` 内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html)。若选择范围已扩展，则先将其删除。`depth` 默认为 `Infinity`。

### `removeMarkAtRange`

`removeMarkAtRange(range: Selection, mark: Mark) => Change` 
`removeMarkAtRange(range: Selection, properties: Object) => Change` 
`removeMarkAtRange(range: Selection, type: String) => Change`

移除 `range` 内字符的 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。为方便起见，你可以传入 `type` 字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `toggleMarkAtRange`

`toggleMarkAtRange(range: Selection, mark: Mark) => Change` 
`toggleMarkAtRange(range: Selection, properties: Object) => Change` 
`toggleMarkAtRange(range: Selection, type: String) => Change`

添加或删除 `range` 内字符的 [`mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)，依据是其是否存在于选择范围内。为方便起见，你可以传入 `type`字符串或 `properties` 对象来隐式地创建一个该类型的 [`Mark`](https://doodlewind.github.io/slate-doc-cn/reference/slate/mark.html)。

### `unwrapBlockAtRange`

`unwrapBlockAtRange(range: Selection, properties: Object) => Change` 
`unwrapBlockAtRange(range: Selection, type: String) => Change`

根据对 `properties` 的匹配，解包 `range` 内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 节点。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `unwrapInlineAtRange`

`unwrapInlineAtRange(range: Selection, properties: Object) => Change` 
`unwrapInlineAtRange(range: Selection, type: String) => Change`

根据对 `properties` 的匹配，解包 `range` 内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 节点。为方便起见，你可以传入 `type` 字符串或 `properties` 对象。

### `wrapBlockAtRange`

`wrapBlockAtRange(range: Selection, properties: Object) => Change` 
`wrapBlockAtRange(range: Selection, type: String) => Change`

将 `range` 内的 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html) 包裹为一个具备 `properties` 的新 [`Block`](https://doodlewind.github.io/slate-doc-cn/reference/slate/block.html)。为方便起见，你可以传入 `type`字符串或 `properties` 对象。

### `wrapInlineAtRange`

`wrapInlineAtRange(range: Selection, properties: Object) => Change` 
`wrapInlineAtRange(range: Selection, type: String) => Change`

将 `range` 内的 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html) 包裹为一个具备 `properties` 的新 [`Inline`](https://doodlewind.github.io/slate-doc-cn/reference/slate/inline.html)。为方便起见，你可以传入 `type`字符串或 `properties` 对象。

### `wrapTextAtRange`

`wrapTextAtRange(range: Selection, prefix: String, [suffix: String]) => Change`

将 `range` 内的文本用 `prefix` 和 `suffix` 字符串围起来。若省略了 `suffix`，将使用 `prefix` 替代之。

## History Changes

### `redo`

`redo() => Change`

在历史记录中前进一步。

### `undo`

`undo() => Change`

在历史记录中后退一步。





# 3.Selection

```
import { Selection } from 'slate'
```



Slate [`Document`](https://doodlewind.github.io/slate-doc-cn/reference/slate/document.html) 中的选择范围。Slate 中的 Selection 是按照原生 [DOM Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) 设计的，使用形如 "anchor"、"focus" 和 "collapsed" 的术语。

"anchor" 是选择范围中固定不动的端点，而 "focus" 为非固定的端点，在移动光标位置时可能移动（如按下 `Shift + →` 时）。

很多情况下，你不需要知道哪个端点是 "anchor"，哪个端点又是 "focus"，只想知道它们在文档中的前后顺序。这时，通过 "start" 和 "end" 点可以使用很多便捷而等效的属性和方法。

- Properties 属性
  - [`anchorKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#anchorkey)
  - [`anchorOffset`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#anchoroffset)
  - [`focusKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#focuskey)
  - [`focusOffset`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#focusoffset)
  - [`isBackward`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isbackward)
  - [`isFocused`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isfocused)
- Computed Properties 计算属性
  - [`endKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#endkey)
  - [`endOffset`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#endoffset)
  - [`isBlurred`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isblurred)
  - [`isCollapsed`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#iscollapsed)
  - [`isExpanded`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isExpanded)
  - [`isForward`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isForward)
  - [`startKey`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#startkey)
  - [`startOffset`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#startoffset)
- Static Methods 静态方法
  - [`Selection.create`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#selectioncreate)
  - [`Selection.fromJSON`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#selectionfromjson)
  - [`Selection.isSelection`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#selectionisselection)
- Instance Methods 实例方法
  - [`toJSON`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#tojson)
- Checking Methods 
  - [`has{Edge}AtEndOf`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#hasedgeatendof)
  - [`has{Edge}AtStartOf`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#hasedgeatstartof)
  - [`has{Edge}Between`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#hasedgebetween)
  - [`has{Edge}In`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#hasedgein)
  - [`isAtEndOf`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isatendof)
  - [`isAtStartOf`](https://doodlewind.github.io/slate-doc-cn/reference/slate/selection.html#isatstartof)

## Properties

```
Selection({
  anchorKey: String,
  anchorOffset: Number,
  focusKey: String,
  focusOffset: Number,
  isFocused: Boolean,
  isBackward: Boolean  
})
```

### `anchorKey`

`String`

选择范围锚点所在文本节点的 key。

### `anchorOffset`

`Number`

从选择范围锚点所在文本节点开始位置起的字符数量。

### `focusKey`

`String`

选择范围焦点所在文本节点的 key。

### `focusOffset`

`Number`

从选择范围焦点所在文本节点开始位置起的字符数量。

### `isBackward`

`Boolean`

选择范围是否反向。若选择范围焦点在文档中位置出现于锚点前，则认为其【反向】。

### `isFocused`

`Boolean`

选择范围是否具有焦点。



## Computed Properties

在创建选择范围时并不提供这些属性，它们是通过真实属性计算得出的。

### `isBlurred`

`Boolean`

为方便起见，与 `isFocused` 相反。

### `isCollapsed`

`Boolean`

选择范围是否收缩。当选择范围中锚点与焦点相等时认为其【收缩】。

### `isExpanded`

`Boolean`

为方便起见，与 `isExpanded` 相反。

### `isForward`

`Boolean`

为方便起见，与 `isBackward` 相反。

### `startKey`

### `startOffset`

### `endKey`

### `endOffset`

用于访问选择范围首尾位置的若干便捷属性。当选择范围为前向时，`start` 指向 `anchor` 端点，`end` 指向 `focus` 端点。当选择范围为后向时则相反。



## Static Methods

### `Selection.create`

`Selection.create(properties: Object) => Selection`

使用 `properties` 创建新 `Selection` 实例。

### `Selection.fromJSON`

`Selection.fromJSON(object: Object) => Selection`

由 JSON `object` 创建选择范围。

### `Selection.isSelection`

`Selection.isSelection(maybeSelection: Any) => Boolean`

返回传入参数是否为 `Selection` 的 boolean 值。



## Instance Methods

### `toJSON`

`toJSON() => Object`

返回选择范围的 JSON 表示。



## Checking Methods

### `has{Edge}AtStartOf`

`has{Edge}AtStartOf(node: Node) => Boolean`

判断选择范围是否有位于 `node` 开始位置的边缘。`{Edge}` 可为 `Anchor`、`Focus`、`Start`、`End` 或 `Edge`（对应其中任一端点）。

### `has{Edge}AtEndOf`

`has{Edge}AtEndOf(node: Node) => Boolean`

判断选择范围是否有位于 `node` 结束位置的边缘。`{Edge}` 可为 `Anchor`、`Focus`、`Start`、`End` 或 `Edge`（对应其中任一端点）。

### `has{Edge}Between`

`has{Edge}Between(node: Node, start: Number, end: Number) => Boolean`

判断选择范围是否有位于 `node` 中 `start` 与 `end` 之间位置的边缘。`{Edge}` 可为 `Anchor`、`Focus`、`Start`、`End` 或 `Edge`（对应其中任一端点）。

### `has{Edge}In`

`has{Edge}In(node: Node) => Boolean`

判断选择范围是否有位于 `node` 内位置的边缘。`{Edge}` 可为 `Anchor`、`Focus`、`Start`、`End` 或 `Edge`（对应其中任一端点）。

### `isAtStartOf`

`isAtStartOf(node: Node) => Boolean`

判断选择范围是否位于 `node` 开始位置。

### `isAtEndOf`

`isAtEndOf(node: Node) => Boolean`

判断选择范围是否位于 `node` 结束位置。