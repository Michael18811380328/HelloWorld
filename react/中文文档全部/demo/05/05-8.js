// FAQ

// 生命周期方法要如何对应到 Hook？

// - constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
// - getDerivedStateFromProps：改为 在渲染时 安排一次更新。
// - shouldComponentUpdate：详见 下方 React.memo.
// - render：这是函数组件体本身。
// - componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。
// - getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。
