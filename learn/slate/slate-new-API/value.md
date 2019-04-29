# `Value`

```js
import { Value } from 'slate'
```

A `Value` is the top-level representation of data in Slate, containing both a [`Document`](./document.md) and a [`Selection`](./selection.md). It's what you need to pass into the Slate [`<Editor>`](../slate-react/editor.md) to render something onto the page.

value是slate中的数据的最高的代表（包含了Document节点和Selection部分）这是你想要通过渲染到页面中的节点的内容，传递到slate-editor内部的数据。



All changes to the document and selection are also performed through the value object, so that they can stay in sync, and be propagated to its internal history of undo/redo value.

所有俗语document和selection的改变也都会显示在value对象上面，所以可以保持同步，可以获得历史操作情况在undo-redo的value中。



For convenience（为了方便）, in addition to changes, many of the selection and document properties are exposed as proxies on the `Value` object.

除了change对象具有value属性外，许多选中部分和document的属性都暴露了一个Value的对象的接口。（其他对象可以调用value属性）value很重要。



## Properties

```js
Value({
  document: Document,
  selection: Selection,
  history: History,
  schema: Schema,
  data: Data,
  decorations: List<Decoration>,
})
```

### `data`

`Data`

An object containing arbitrary data for the value.



### `decorations`

`List<Decoration>`

A list of ranges in the document with marks that aren't part of the content itself—like matches for the current search string.



### `document`

`Document`

The current document of the value.

### `history`

`History`

An object that stores the history of changes.



### `object`

`String`

A string with a value of `'value'`.

### `schema`

`Schema`

An object representing the schema of the value's document.



### `selection`

`Selection`

The current selection of the value.

通过value可以获得大部分需要获得的内容。



## Computed Properties

These properties aren't supplied when creating a `Value`, but are instead computed based on the current `document` and `selection`.

如果创建一个value不会具有下面的属性，实际上的document和selection具有计算属性。

### `{edge}Text`

`Text`

Get the leaf [`Text`](./text.md) node at `{edge}`. Where `{edge}` is one of: `anchor`, `focus`, `start` or `end`.

### `{edge}Block`

`Block`

Get the leaf [`Block`](./block.md) node at `{edge}`. Where `{edge}` is one of: `anchor`, `focus`, `start` or `end`.



### `marks`

`Set`

Get a set of the [`Marks`](./mark.md) in the current selection.



### `activeMarks`

`Set`

Get a subset of the [`Marks`](./mark.md) that are present in _all_ the characters in the current selection. It can be used to determine the active/inactive state of toolbar buttons corresponding to marks, based on the usual rich text editing conventions.



### `blocks`

`List`

Get a list of the lowest-depth [`Block`](./block.md) nodes in the current selection.

### `fragment`

`Document`

Get a [`Document`](./document.md) fragment of the current selection.

### `inlines`

`List`

Get a list of the lowest-depth [`Inline`](./inline.md) nodes in the current selection.

### `texts`

`List`

Get a list of the [`Text`](./text.md) nodes in the current selection.



## Static Methods

### `Value.create`

`Value.create(properties: Object) => Value`

Create a new `Value` instance with `properties`.

### `Value.fromJSON`

`Value.fromJSON(object: Object) => Value`

Create a value from a JSON `object`.

### `Value.isValue`

`Value.isValue(any: Any) => Boolean`

Returns a boolean if the passed in argument is a `Value`.

## Instance Methods

### `change`

`change() => Change`

Create a new [`Change`](./change.md) that acts on the current value.

在当前的value上创建一个新的change

### `toJSON`

`toJSON() => Object`

Returns a JSON representation of the value.
