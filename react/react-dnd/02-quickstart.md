# 快速开始

https://react-dnd.github.io/react-dnd/about

这个组件可以实现复杂的拖拽界面效果，同时让不同的组件解耦。拖动过程中可以传递数据，拖动的不同阶段可以显示不同的状态和显示。

React DnD is a set of React utilities to help you build complex drag and drop interfaces while keeping your components decoupled. It is a perfect fit for apps like Trello and Storify, where dragging transfers data between different parts of the application, and the components change their appearance and the application state in response to the drag and drop events.

## 安装

```bash
yarn add react-dnd react-dnd-html5-backend
```

The second package will allow React DnD [the HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop) under the hood. You may choose to use a third-party backend instead, such as [the touch backend](https://npmjs.com/package/react-dnd-touch-backend).

第二个包将允许React DnD在后台使用HTML5拖放API。 您可以选择其他第三方后端API库。

## 例子

```jsx
// Let's make <Card text='Write the docs' /> draggable!
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

export default function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}
```

## 特点

### It works with your components

Instead of providing readymade widgets, React DnD wraps your components and injects props into them. If you use React Router or Flummox, you already know this pattern.

### It embraces unidirectional data flow

React DnD fully embraces the declarative rendering paradigm of React and doesn't mutate the DOM. It is a great complement to Redux and other architectures with the unidirectional data flow. In fact it is built on Redux.

### It hides the platform quirks

HTML5 drag and drop has an awkward API full of pitfalls and browser inconsistencies. React DnD handles them internally for you, so you can focus on developing your application instead of working around the browser bugs.

### It is extensible and testable

React DnD uses the HTML5 drag and drop under the hood, but it also lets you supply a custom “backend”. You can create a custom DnD backend based on the touch events, the mouse events, or something else entirely. For example, a built-in simulation backend lets you test drag and drop interaction of your components in a Node environment.

它与您的组件一起使用

React DnD不需要提供现成的小部件，而是包装您的组件并将道具注入其中。如果您使用React Router或Flummox，您已经知道此模式。

它包含单向数据流

React DnD完全包含了React的声明式渲染范例，并且不改变DOM。它是对Redux和其他具有单向数据流的体系结构的很好的补充。实际上，它是基于Redux构建的。

它隐藏了平台怪癖

HTML5拖放具有笨拙的API，充满陷阱和浏览器不一致。 React DnD在内部为您处理它们，因此您可以专注于开发应用程序，而不是解决浏览器错误。

它是可扩展和可测试的

React DnD使用HTML5拖放功能，但是它还允许您提供自定义的“后端”。您可以基于触摸事件，鼠标事件或完全基于其他事件来创建自定义DnD后端。例如，内置的模拟后端使您可以在Node环境中测试组件的拖放交互。

## Touch Support

For touch support, use React DnD with [the touch backend](https://npmjs.com/package/react-dnd-touch-backend) instead of the HTML5 backend.

为了获得触摸支持，请将React DnD与触摸后端（而不是HTML5后端）一起使用。

## Non-Goals

React DnD gives you a set of powerful primitives, but it does not contain any readymade components. It's lower level than [jQuery UI](https://jqueryui.com/) or [interact.js](http://interactjs.io/) and is focused on getting the drag and drop interaction right, leaving its visual aspects such as axis constraints or snapping to you. For example, React DnD doesn't plan to provide a `Sortable`component. Instead it gives you the tools you need to build your own with any rendering customizations that you need.

React DnD为您提供了一组功能强大的原语，但其中不包含任何现成的组件。它比jQuery UI或interact.js的级别低，并且专注于正确实现拖放交互，而不会出现诸如轴约束或捕捉之类的可视化方面。例如，React DnD不打算提供Sortable组件。相反，它为您提供了使用所需的任何渲染自定义来构建自己的工具。