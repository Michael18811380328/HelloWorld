# `Decoration`

```js
import { Decoration } from 'slate'
```

A decoration is a range of the document that has a specific [`Mark`](./mark.md) dynamically applied to it based on its content or some other external state. It is not actually reflected in the document's structure itself. This can be useful for cases like syntax highlighting, or search result highlighting.

Decoration是文档的一个范围，它有一个特定的mark，根据内容或其他外部状态动态地应用到document中。它实际上并没有反映在文档的结构本身中。这对于语法突出显示或搜索结果突出显示等情况很有用。

Decorations implement the [`Range`](./range.md) interface, but also contain a `mark`.

## Properties

```js
Decoration({
  anchor: Point,
  focus: Point,
  mark: Mark,
})
```

### `mark`

`Mark`

The mark associated with the decoration.



### `object`

`String`

A string with a value of `'decoration'`.



## Static Methods

### `Decoration.create`

`Decoration.create(properties: Object) => Decoration`

Create a new `Decoration` instance with `properties`.



### `Decoration.createProperties`

`Decoration.createProperties(object: Object|Decoration) => Object`

Create a new dictionary of range properties from an `object`.



### `Decoration.fromJSON`

`Decoration.fromJSON(object: Object) => Decoration`

Create a range from a JSON `object`.



### `Decoration.isDecoration`

`Decoration.isDecoration(value: Any) => Boolean`

Check whether a `value` is a `Decoration`.



## Instance Methods

### `toJSON`

`toJSON() => Object`

Return a JSON representation of the range.

## Mutating Methods

### `setMark`

`setMark(mark: Mark) => Decoration`

Return a new decoration with a new `mark`.
