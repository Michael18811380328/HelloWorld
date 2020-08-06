// state hook
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}></button>
    </>
  );
}

// 多个state
function ManyStates() {
  const [age, setAge] = ustState(40);
  const [fruit, setFruit] = useState('apple');
  let defaultTodos = [
    {text: 'learn hook'}
  ];
  const [todos, setTodos] = useState(defaultTodos);
}

// EffectHook
import React, { useState, useEffect } from 'react';

function Example() {
  // 相当于componentDidMount and componentDidUpdate
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = count;
  });
  return (
    <>
      <p>You clicked {count} time</p>
      <button onClick={() => setCount(count + 1)}>
        Click to add 1
      </button>
    </>
  );
}

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  function onStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  useEffect(() => {
    ChatAPI.subcribeToFriendStatus(props.frined.id, onStatusChange);
    return () => {
      ChatAPI.unsubcribeToFriendStatus(props.frined.id, onStatusChange);
    }
  });

  if (isOnline === null) {
    return "loading"
  }

  return isOnline ? 'Online' : 'Offline';
}

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = ''  + count;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function onStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  //
}

