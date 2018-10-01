## Slate

富文本编辑框架——把word功能放在web端（用户可以进行文本编辑改动，样式变化，基于React框架进行render)。

说明文档：https://doodlewind.github.io/slate-doc-cn/

特点：slate使用插件实现编辑器的核心逻辑。

目前时间紧，首先学习slate核心内容，其他工作暂时放一下，必须设置ddl。



Slate 并非一个编辑器应用，而是一套在 React 和 Immutable 的坚实基础上，用于操作富文本数据的强大框架。

### Immutable，迄今最理想的数据结构

我们知道，JS 对象的属性是可以随意赋值的，也就是 mutable 可变的。而相对地，不可变的数据类型不允许随意赋值，每次通过 Immutable API 的修改，都会生成一个新的引用。

看起来这并不算什么，和每次修改都全量复制一份数据比起来并没有什么区别。但 Immutable 的强大之处，在于 **不同引用之间，相同的部分是完全共享的** 。这也就意味着，对一棵基于 Immutable 的复杂文档树， 即便只改变了某一片叶子节点，也会生成一棵新树，但这棵新树除了那一片叶子节点外，所有内容都是和原有的树共享的 。

这和富文本编辑有什么关系呢？我们知道，编辑器的【撤销】其实是一个难度非常大的功能，许多定制了撤销功能的编辑器，很容易出现撤销前后的状态不一致的情况。但有了 Immutable 后，每次编辑都会生成一个全新的编辑器状态，只需 简单地在不同状态之间切换，就能轻松地实现撤销和重做操作 。并且，Immutable 也完全支持复杂的嵌套来表达文档的树形结构。可以说，Immutable 天生适合用于实现富文本编辑的模型层。在 Slate 和 Draft.js 中，富文本数据就是对 Immutable 的一层封装，从而自带了对撤销操作的支持，不需额外编码实现。在这方面，Slate 相比 Draft.js 的一个重要加分项是它 **支持嵌套的数据结构** ，对表格等复杂内容的编辑提供了良好的支持。

### React，迄今最合适的视图层

说到 Immutable 就不能不提 React，目前 [Immutable.js](https://www.colabug.com/goto/aHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vaW1tdXRhYmxlLWpzLw==) 这个不可变数据的 JS 库就是 Facebook 自己实现的，并且一开始引入 Immutable 的目的也不是为了撤销，而是为了优化 React 应用的性能。可以说，Immutable 和 React 有着天生的默契。

那么，为什么我们需要 React 呢？目前，除了 Slate 和 Draft.js 外几乎所有的编辑器方案，在需要定制编辑节点（如公式、图表等）时，要么需要接触和 DOM 紧密耦合的编辑器插件概念，要么只能使用编辑器内置的功能。这种做法在学习成本和效率上都不是最优的。

设想一下，如果 编辑器中的编辑内容，全部都能以 React 组件的形式（如标题用 Heading 组件，段落用 Paragraph 组件等）来实现 ，那么富文本编辑的门槛还会这么高吗？从 Immutable 数据映射到一个个 React 组件，是已经在许多 Web 应用中经历过考验的成熟模式。而在这种架构下，ContentEditable 那些令人望而生畏的问题也能得到很好的解决：只需要为 React 组件增加 `contentEditable` 属性，而后对各种按键、点击等事件 `preventDefault` ，由框架决定事件对 Immutable 的变换，最后生成新状态按需触发重绘即可！

这种方案下，实现一个编辑器不再需要精通 DOM 的专家，难度大大降低了。即便像本文作者这样仅仅熟悉 React，对前端只有一年多经验的普通开发者，也有能力开发自己的编辑器了。在此稍微夹带一些私货：

在富文本编辑领域，React + Immutable 这种在全局粒度全量地更改状态，而后按需更新组件的方案，比起 Vue 这样基于依赖追踪细粒度地更新组件的方案，是更有优势的。Vue 直接 mutate 数据的方式在原理上并不利于实现撤销与回退，并且函数式组件 VNode 的 API 也没有 React 这么直观易用（Vue 2.5 有改善，但差距仍然存在）。目前，Vue 社区还没有类似的框架出现， **这个场景也是 React 技术栈相比 Vue 的一个闪亮之处。**

不过，Draft.js 和 Slate 都实现了对 React 的支持。虽然 Slate 定制节点的 API 更方便一些，但这也不是决定性的优势。那么 Slate 的特殊之处又哪呢？

### Slate，迄今最优秀的 Controller

从前面的介绍中，我们看到相当多创新之处都是来自 Draft.js 的。那么，Slate 又有什么独特之处呢？

Draft.js 有 Immutable 作为 Model，有 React 作为 View，但在使用它实现编辑器的过程中，你可能会感觉这比起一般的应用开发来，负担还是有些沉重，或者说少了一点什么东西。嗯，这个东西也许就是你熟悉的 Controller。

即便在前端轮子满天飞的今天，UI 应用的架构 MVC 也不会过时，而是演化为了 MVVM 甚至 M-V-Whatever 的架构。编辑器应用同样是个 UI 应用， **我们同样需要一种机制，将 Model 和 View 连接起来** 。

这可能不是 Draft.js 的闪光之处，它的文档变换 API 使用起来比较沉重，并且对 EditorState 的修改存在着较多限制。而 Slate 则提供了更加灵活的概念，来连接 Model 与 View。我们简单介绍一下 Slate 中编辑操作发生时的处理流程：

1. 用户在编辑器光标所在的 Node 内按键，触发事件。
2. 根据按键的键值，分发不同的 Change，如换行、加粗等。
3. Change 修改 State，生成新 State。
4. 新 State 经过 Schema 校验后，渲染到编辑器内，按需更新相应的 Node。

整个流程中最核心的机制可概括为一个公式： `state.change().change()` ，Change 是一个非常优雅的 API，所有的变换都是都通过 Change 对象实现的。比如，用户先插入了文本，又删除了另一个段落，这时对文档的变更就可以抽象为：

```
state.change().insertText().deleteBlock()
```

每个操作都是链式调用！在协同编辑的场景下，来自不同用户的操作其实也可以归结为这样对 State 的链式调用，这也让基于 Slate 实现协同编辑成为了可能。另一方面，每一个 Change 链式调用中的 API 都可实现为纯函数，而后通过 Slate 的 `call` API 来链式执行，这也让编写自己的 Change 并添加单元测试成为了可能。

这种优雅地处理编辑操作的方式，使得 Slate 能够更简单地将 Model 与 View 连接起来，实现对富文本数据的复杂操作。另外，Slate 支持自定义对状态的 Schema 校验规则，可以添加一些形如【第一个节点必须是 Heading 节点】或者【图片节点必须包含 src 属性】的校验规则，并对异常数据进行过滤。

当然，Slate 中并没有 Controller 的概念，不过实际上，基于 Slate 编写的富文本编辑 Change 操作，和编写传统 MVC 应用中 Controller 逻辑的体验有些接近。换句话说，Slate 把编写复杂操作逻辑的难度，降低到了编写 Change 函数的水平。在这一点上，Slate 的架构是十分易用的。



Slate 的许多核心特性是从其他优秀编辑器项目中借鉴的，如其 Immutable 数据层与框架理念来自 Draft.js、Schema 与 Change 概念来自 ProseMirror 等。