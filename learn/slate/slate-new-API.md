# slate 新版说明

## value全局对象

```js
import { Value } from 'slate'
```

A `Value` is the top-level representation of data in Slate, containing both a [`Document`](https://docs.slatejs.org/slate-core/document) and a [`Selection`](https://docs.slatejs.org/slate-core/selection). It's what you need to pass into the Slate [``](https://docs.slatejs.org/slate-react/editor) to render something onto the page.

value是slate中的顶层数据表示，包括一个Document对象和Selection对象，是你需要渲染到页面上的内容。



All changes to the document and selection are also performed through the value object, so that they can stay in sync, and be propagated to its internal history of undo/redo value.

所有对于文档和选中内容的改变，会在value对象上进行表现。这样它们就可以保持同步，并被传播到它的内部历史撤消/重做值。



For convenience, in addition to changes, many of the selection and document properties are exposed as proxies on the `Value` object.

为了方便起见，除了更改之外，许多选择和文档属性都作为值对象上的代理公开。



# Properties

```js
Value({
  document: Document,
  selection: Selection,
  history: History,
  schema: Schema, 模式；计划；图解；摘要
  data: Data,
  decorations: List<Decoration>,
})
```

## `data`

`Data`

An object containing arbitrary（任意的）data for the value.

## `decorations`

`List<Decoration>`

A list of ranges in the document with marks that aren't part of the content itself—like matches for the current search string.

文档中带有标记的范围列表，这些标记本身与当前搜索字符串的内容不匹配。

## `document`

`Document`

The current document of the value.

## `history`

`History`

An object that stores the history of changes.

## `object`

`String`

A string with a value of `'value'`.

## `schema`

`Schema`

An object representing the schema of the value's document.

这是一个表示文档的值的模式的对象

## `selection`

`Selection`

The current selection of the value.

当前选中的部分的value。

# Computed Properties

These properties aren't supplied when creating a `Value`, but are instead computed based on the current `document` and `selection`.

## `{edge}Text`

`Text`

Get the leaf [`Text`](https://docs.slatejs.org/slate-core/text) node at `{edge}`. Where `{edge}` is one of: `anchor`, `focus`, `start` or `end`.

## `{edge}Block`

`Block`

Get the leaf [`Block`](https://docs.slatejs.org/slate-core/block) node at `{edge}`. Where `{edge}` is one of: `anchor`, `focus`, `start` or `end`.

## `marks`

`Set`

Get a set of the [`Marks`](https://docs.slatejs.org/slate-core/mark) in the current selection.

## `activeMarks`

`Set`

Get a subset of the [`Marks`](https://docs.slatejs.org/slate-core/mark) that are present in *all* the characters in the current selection. It can be used to determine the active/inactive state of toolbar buttons corresponding to marks, based on the usual rich text editing conventions.

## `blocks`

`List`

Get a list of the lowest-depth [`Block`](https://docs.slatejs.org/slate-core/block) nodes in the current selection.

## `fragment`

`Document`

Get a [`Document`](https://docs.slatejs.org/slate-core/document) fragment of the current selection.

## `inlines`

`List`

Get a list of the lowest-depth [`Inline`](https://docs.slatejs.org/slate-core/inline) nodes in the current selection.

## `texts`

`List`

Get a list of the [`Text`](https://docs.slatejs.org/slate-core/text) nodes in the current selection.

# Static Methods

## `Value.create`

`Value.create(properties: Object) => Value`

Create a new `Value` instance with `properties`.

## `Value.fromJSON`

`Value.fromJSON(object: Object) => Value`

Create a value from a JSON `object`.

## `Value.isValue`

`Value.isValue(any: Any) => Boolean`

Returns a boolean if the passed in argument is a `Value`.

# Instance Methods

## `change`

`change() => Change`

Create a new [`Change`](https://docs.slatejs.org/slate-core/change) that acts on the current value.

## `toJSON`

`toJSON() => Object`

Returns a JSON representation of the value.



~~~js
var href = node.get('data').get('href');
insertInline(Inline)
//在当前位置插入一个Inline节点(当前应当没有选中元素，或者selection是false)
insertInlineAtRange(selection, inline)
// 在当前选中的range中插入一个Inline节点，如果这个range中的selection有内容，直接删除内容加入Inline节点；如果range中没有内容，直接插入节点。bug：如果这个节点是一个空行，那么删除这个节点后，node.key就会是空的，就无法插入新的Inline节点，所以会报错。解决方案：手动删除这个节点，手动插入新的Inline节点。
delete()
// 删除选中部分的内容
setInlines({object：json})
// 设置当前Inline节点的属性(data)。这个操作会覆盖之前的data属性，如果之前的属性现在没有被新加入，那么这个属性将会被删除。
removeTextByKey(key, 开始位置，结束位置)
// 通过节点的key值删除文本节点内部的文字(linklength需要获取)
insertTextByKey(key, 0 , text)
// 通过节点的key在这个节点的位置上增加文本。
wrapInline
// 将当前选中的文本包裹成一个Inline节点(type='text')

let inline = Inline.create({
  data:{},
  type:"text",
  nodes:[Text.create({text:文本})]
})

unwrapInline
// 将当前的Inline对象解包
~~~

