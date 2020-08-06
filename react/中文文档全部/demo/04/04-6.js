// 合成事件
// react 中获取的是合成事件，对应的 nativeEvent 是原生事件
// 常用的方法是：stopPropagation preventDefault 

// 处于性能，不能直接通过异步访问事件
// 需要的话，可以通过 event.persist 异步访问事件
function onClick(event) {
  console.log(event, event.type);
  const eventType = event.type;
  setTimeout(() => {
    console.log(event); // null
    console.log(eventType); // click
  }, 0);
}
// 常见的事件都支持合成事件