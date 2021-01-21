# React性能优化

提升性能就是在某些场景下优化react的render渲染次数

## React内置优化

1. 普通组件内部添加 `shouldComponentUpdate`方法，通过判断state、props是否发生变化，决定是否重新render组件。true 执行 render，false 不去执行 render。
2. 继承React.PureComponent组件，其实现原理和在组件内部添加 `shouldComponentUpdate`方法类似，由父组件React.PureComponent完成了相应业务逻辑的判断。缺点：继承React.PureComponent的组件，对props，state只能进行浅比较，对于引用类型则无法进行比较。
3. 函数组件，使用React.memo(), 避免组件的重复渲染

## 优化策略

1. 引用数据类型：采用整体 clone (替换)对象的方式，更新引用数据类型的地址，达到数据更新，视图更新的目的；
2. 对于不影响界面渲染的数据，设置为内部属性，不将其放state中，避免不必要的渲染（优先使用属性，不使用状态，减少状态使用）
3. 父组件向子组件传递参数时，如无必要，尽量不新建对象作为传递参数

## 调试方法

使用`react-devtools`提供的 **profiler**

1. 观测发生修改时，哪些组件进行了重新渲染，
2. 更新的组件，是什么原因进行了重新渲染
3. 对于没有必要渲染的组件可以采用以上方法进行相应的修改

使用方法，可以参考文档[react-devtools](https://zh-hans.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)