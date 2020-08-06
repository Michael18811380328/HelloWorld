// state hook
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        button
      </button>
    </>
  );
}

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}></button>
      </>
    );
  }
}

// 总结：如果state是简单对象，只在当前函数式组件中使用
// 那么可以优先使用 HOOK，这样写setState更方便
