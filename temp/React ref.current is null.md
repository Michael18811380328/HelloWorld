# [React ref.current is null](https://stackoverflow.com/questions/55248483/react-ref-current-is-null)

React 中，ref.current 无法获取DOM的原因分析。

原始问题链接：https://stackoverflow.com/questions/55248483/react-ref-current-is-null

### 问题描述

I'm working on an agenda/calendar app with a variable time range. To display a line for the current time and show blocks for appointments that have been made, I need to calculate how many pixels correspond with one minute inside the given time range.

So for example: If the agenda starts at 7 o'clock in the morning and ends at 5 o'clock in the afternoon, the total range is 10 hours. Let's say that the body of the calendar has a height of 1000 pixels. That means that every hour stands for 100 pixels and every minute for 1,66 pixels.

If the current time is 3 o'clock in the afternoon. We are 480 minutes from the start of the agenda. That means that the line to show the current time should be at 796,8 pixels (480 * 1,66) from the top of the calendar body.

No problems with the calculations but with getting the height of the agenda body. I was thinking to use a React Ref to get the height but I'm getting an error: `ref.current is null`

Below some code:

```jsx
class Calendar extends Component {
  calendarBodyRef = React.createRef();

displayCurrentTimeLine = () => {
  const bodyHeight = this.calendarBodyRef.current.clientHeight; // current is null
}

render() {
  return (
    <table>
      <thead>{this.displayHeader()}</thead>
      <tbody ref={this.calendarBodyRef}>
        {this.displayBody()}
        {this.displayCurrentTimeLine()}
      </tbody>
    </table>
  );
}
}
```

### 解决方法

在界面首次渲染中，不能保证 ref 可以获取到（DOM已经被渲染）。在componentDidMount 阶段或者之后可以获取 DOM 节点。

So the thing about refs is that they aren't guaranteed to be set on first render. You can be sure they are set during and after `componentDidMount` so you have two ways going forward.

You could use the callback style ref and set state based on that. 可以使用回调函数形式设置 Ref（React官方建议使用 React.createRef() 函数创建，避免箭头函数每次生成新的函数）。

E.g. instead of passing your ref as the prop, you can pass in a reference to a function like `this.handleRef` and it would do some logic in there:

```jsx
handleRef = r => {
  this.setState({ bodyHeight: r.clientHeight})
  this.calendarBodyRef .current = r;
};
```

Or, you could keep your current set up but you would have to move your `clientHeight` bit to a lifecycle function like:

```jsx
componentDidMount() {
  this.setState({ bodyHeight: this.calendarBodyRef.current.clientHeight });
}
```

Ultimately, you can't immediately read the current value of a ref like that, you would have to check it after the render and then read your `bodyHeight` from state.

这是下面网友的评论

- I'm just going to use an id and document.getElementById instead. I love React but this is a React design issue. It popped up inexplicably when I switched a component from class to function. What's the harm of this workaround? Using getElementById is working fine so far. 使用 getElementById 获取DOM节点
- I mean you can totally do that if you want but design like that can become extremely fragile because you can potentially run into issues like having the multiple instances of the component rendered sharing the same id and it can make refactoring or generalising components a bit annoying. 
- Thanks. I'm going to stick with it. There are tradeoffs for sure. The approach I'm taking is less convoluted and there isn't any chance of there being multiple instances of this component. So if that's the only foreseeable hazard, then I'm happy with my decision.

