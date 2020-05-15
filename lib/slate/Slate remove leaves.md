# slate remove leaves

### text 节点属性改变

With the pull request, text nodes no longer have a `.leaves` property. Instead, each text node has a unique set of marks. Which means...

==现在 text 节点没有 leaves 这个属性==。取代这个属性的是一个独特的一系列的 marks. 这就意味着：

- When a new mark is added to a partial length of a text node, it is split in two.在一个文本节点中间加入一个部分长度的 mark ，一个文本节点变成两个文本节点。
- When adjacent text nodes have the same marks, they are merged. 当相邻的文本节点具有相同的 marks 他们将会合并。

This reduces some unnecessary nesting in the data model, and simplifies a few other pieces of logic as a result.

这样的好处是，减少了数据模型中的不必要的嵌套，简化了其他一部分的逻辑片段。

------

#### BREAKING 更新

**1、Mark operations no longer have offset or length properties.** Since text nodes now contain a unique set of marks, it wouldn't make sense for a single mark-related operation to result in a splitting of nodes. Instead, when a mark is added to only part of a text node, it will result in a `split_node`operation as well as an `add_mark` operation.

**==Mark 操作不会有 offset 或者 length 的属性==**。既然文本节点包含了一个独特的 marks，那么与标记相关的操作，导致节点分裂是没有意义的。



**2、Text operations no longer have a marks property.** Previously it was used to add text with a specific set of marks. However this is no longer necessary, and when text is added with marks it will result in an `insert_text` operation as well as an `add_mark` operation.

**==Text 操作不具有一个 marks 属性==**。



**3、Using Text.create or Text.createList with a leaves property will error.** Now that text nodes no longer have leaves, you will need to pass in the `text` string and `marks` directly when creating a new text node. (However, you can still create entire values using `Value.create` in a backwards compatible way for convenience while migrating.)

==重点：使用 Text.create 或者 Text.createList 方法，包含一个 leaves 属性将会报错== 现在 text 节点没有 leaves 子节点，创建一个文本节点时，你需要直接传递一个 text 字符串和 marks. 然而， 你仍然可以用 Value.create 创建一个整个的 values.

```js
// This works, although deprecated, which is the common case...
Value.create(oldValueJson)

// ...but this will error!
Text.create(oldTextJson)
```



**4、Value.toJSON returns the new data model format, without leaves.** Although `Value.fromJSON` and `Value.create` allow the old format in deprecated mode, calling `Value.toJSON` will return the new data format. If you still need the old one you'll need to iterate the document tree converting text nodes yourself.

Value.toJSON 会返回新的数据模型(不包含leaves) 尽管使用 Value.fromJSON or Value.create 允许就格式，使用 toJSON 会返回新的结果。



**5、The <text> and <mark> hyperscript tags must now return a single text node.** Previously they were more lenient, and might return an array of text nodes. This made it hard to be explicit in tests, and made certain configurations impossible. This new restriction makes it easier to reason about what the tags return, even if it makes certain cases slightly more verbose. For example:

现在每一个 text or mark 超级文本标记标签返回一个单独的文本节点。

```html
<paragraph>
  <b>a few <i>italic</i> and bold words.</b>
</paragraph>
```

Must now be written as:

```html
<paragraph>
  <b>a few </b>
  <b><i>italic</i></b>
  <b> and bold words.</b>
</paragraph>
```

Slightly more verbose, but with the benefit of being easy to tell exactly how many text nodes you will receive in your resulting document. And it allows setting `key=` values on the mark tags directly, since they map `1:1` to text nodes.



**6、The HTML serializer has been updated to remove text.leaves.** For serializing it requires you pass in the new format for text nodes. And for deserializing it will return the new format.

Serializer 函数将会移出 text.leaves 方法。你需要传入新的text节点



**7、The Plain serializer has been updated to remove text.leaves.** For serializing it requires you pass in the new format for text nodes. And for deserializing it will return the new format.

plain serializer 也会删除 text.leaves



**8、The low-level Value.\* and Node.\* mutation methods have changed.** These changes follow the operation signature changes, since the methods take the same arguments as the operations themselves. For example:

```js
// Previously...
value.addMark(path, offset, length, mark)

// ...is now:
value.addMark(path, mark)
```

These are low-level methods, so this change shouldn't affect the majority of use cases.



#### DEPRECATED 弃用

**Initializing editors with Text nodes with a leaves property is deprecated.** In this new version of Slate, creating a new value with `Value.create` with the old leaf data model is still allowed for convenience in migration, but it will be removed in a coming version. (However, using the low-level `Text.create` will throw an error!)

初始化 editor 时，text节点附加一个 leaves 被弃用。在这个版本中，新方法中使用旧的叶节点还可以使用，这个方法在下一个版本中将会移出。将会抛出一个错误。

```js
// This works, although deprecated, which is the common case...
Value.create(oldValueJson)

// ...but this will error!
Text.create(oldTextJson)
```