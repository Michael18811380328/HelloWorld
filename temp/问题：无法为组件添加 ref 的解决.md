# 问题：无法为组件添加 ref 的解决

## 问题来源

我们有一个子组件，外部父组件通过 ref 获取子组件的DOM。现在需要给子组件添加翻译（i18N）。

~~~js
export default ChildComponent;
// 改成下面的
export default withTranslation('translation')(ChildComponent);
~~~

加上翻译后，会报错

~~~js
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
~~~

## 问题原因

因为原来父组件通过 ref 获取了子组件的节点（子组件是class创建的），现在使用 withTranslation 包裹后，子组件是函数创建的。函数创建的子组件不能增加 refs. 官方推荐使用 React.forwardRef 解决。

百度的结果是，在 redux 也会出现这个问题。

~~~js
export default connect(stateToProps, null, null, { forwardRef: true })(ChildNode);
~~~

## 解决方案

React 官网介绍的很详细，我尝试了 React.forwardRef() 方法，效果不佳。参考了 i18n 官网推荐的方法（https://react.i18next.com/latest/withtranslation-hoc）use ref (>= v10.6.0)，You can use forwardRefs like:

```jsx
const Wrapped = withTranslation('translation', { withRef: true })(MyComponent);

// then pass a ref in your render method like
const myRef = React.createRef();
<Wrapped ref={myRef} />;

// use myRef.current to access it
```

然后我把输出改成了，项目就运行正常。这里的知识点是 高阶组件中 ref 传值。

~~~js
export default withTranslation('translation', { withRef: true })(ChildComponent);
~~~

## 参考文档

https://stackoverflow.com/questions/56688154/react-hooks-function-components-cannot-be-given-refs-with-useref

https://blog.csdn.net/he452460213/article/details/103911923

https://react.i18next.com/

https://react.i18next.com/latest/withtranslation-hoc

https://zh-hans.reactjs.org/docs/forwarding-refs.html