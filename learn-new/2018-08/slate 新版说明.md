# slate 新版说明

## value全局对象

```js
import { Value } from 'slate'
```

A `Value` is the top-level representation of data in Slate, containing both a [`Document`](https://docs.slatejs.org/slate-core/document) and a [`Selection`](https://docs.slatejs.org/slate-core/selection). It's what you need to pass into the Slate [``](https://docs.slatejs.org/slate-react/editor) to render something onto the page.



All changes to the document and selection are also performed through the value object, so that they can stay in sync, and be propagated to its internal history of undo/redo value.



For convenience, in addition to changes, many of the selection and document properties are exposed as proxies on the `Value` object.



# Properties

```
Value({
  document: Document,
  selection: Selection,
  history: History,
  schema: Schema,
  data: Data,
  decorations: List<Decoration>,
})
```

## `data`

`Data`

An object containing arbitrary data for the value.

## `decorations`

`List<Decoration>`

A list of ranges in the document with marks that aren't part of the content itself—like matches for the current search string.

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

## `selection`

`Selection`

The current selection of the value.

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