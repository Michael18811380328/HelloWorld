// Effect Hook
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = '' + count;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// 原生写法：生命周期函数
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = '' + this.state.count;
  }

  componentDidUpdate() {
    document.title = '' + this.state.count;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

// 传统生命周期函数中，在UNmount阶段清空绑定和定时器
// 在Hook中，直接在 useEffect中清空这部分
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChnage(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);   
    // Specify how to clean up after this effect:    
    return function cleanup() {      
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);    
    };
  });

  if (isOnline === null) return 'loading'
  return isOnline ? "Online" : 'Offline';
}