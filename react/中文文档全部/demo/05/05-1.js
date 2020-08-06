// Hook 不使用Class的时候，使用state、props等状态
// 可以在组件之间复用逻辑
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

// 每一个useState对应一个状态和设置函数
// 初始的值是0，通过useState设置