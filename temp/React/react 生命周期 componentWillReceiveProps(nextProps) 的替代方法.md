# componentWillReceiveProps 的替代方法

例如：

```jsx
componentWillReceiveProps(nextProps) {
  if (this.props.editInfo.id !== nextProps.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: nextProps.editInfo.id
    })
  }
}
```

可写成：

```jsx
static getDerivedStateFromProps(props, state) {
  if (props.editInfo.id !== state.editInfo.id) {
    return {
      editInfo: props.editInfo
    };
  }
  return null;
}
  
componentDidUpdate(prevProps, prevState) {
  if (this.state.editInfo.id !== prevState.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: this.state.editInfo.id
    })
  }
}
```

.