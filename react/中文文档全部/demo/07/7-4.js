// this.setState 中获取this.state 是异步操作
// 如果频繁调用，但是异步事件没有处理完，可能出错
// 可以给 this.setState 传递一个函数避免错误
increase() {
  this.setState((state) => {
    return {
      count: state.count + 1
    }
  });
}

fn() {
  this.increase();
  this.increase();
  this.increase();
  // 这样每次执行时，都会从state中重新获取当前的count
  // 不会因为异步事件造成错误
  // 运行后的结果是 count 加3
}