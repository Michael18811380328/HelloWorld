# react-dnd使用手记

1. 安装
   `yarn add react-dnd react-dnd-html5-backend`
2. 了解相应API

- DragSource DropTarget

  DragSource用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）

  DropTarget 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）

  参数:(type, spec, collect)

  - type: `string|symbol|用一个函数来返回该组件的其他 props`拖拽类型，必填。

  - spec: 拖拽事件的方法对象，必填。
    source组件的spec 可以定义**拖动**相关的事件
    target组件的spec 可以定义**放置**相关的事件

    e.g. *DragSource specObj*

    - beginDrag(props, monitor, component): 拖动开始时触发的事件，必须。返回跟props相关的对象
    - endDrag(props, monitor, component): 拖动结束时触发的事件，可选。
    - canDrag(props, monitor): 当前是否可以拖拽的事件，可选。
    - isDragging(props, monitor): 拖拽时触发的事件，可选。

    e.g. *DropTarget specObj*

    - drop(props, monitor, component) 组件放下时触发的事件，可选。
    - hover(props, monitor, component) 组件在DropTarget上方时响应的事件，可选。
    - canDrop(props, monitor) 组件可以被放置时触发的事件，可选。

    specObj 对象方法相关参数

    - props： 组件当前的props

    - monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped。具体获取方法，参看

      collect 参数 monitor 部分

      - `source组件` 的 monitor 参数是 [DragSourceMonitor](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drag-source-monitor.html) 的实例
      - `target组件` 的 monitor 参数是 [DropTargetMonitor](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drop-target.html) 的实例

    - component：当前组件实例

  - collect: 把拖拽过程中需要信息注入组件的 props，接收两个参数 connect and monitor，必填。
    collect是一个返回一个会注入到组件的 props 中对象的函数，即我们可以通过 this.props 获取collect返回的所有属性。
    参数:(connect, monitor)

    - connect

      - `source组件` collect 中 connect是 [DragSourceConnector](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drag-source-monitor.html)的实例，它内置了两个方法：`dragSource()` 和 `dragPreview()`。`dragSource()`返回一个方法，将`source组件`传入这个方法，可以将 source DOM 和 React DnD backend 连接起来；`dragPreview()` 返回一个方法，你可以传入节点，作为拖拽预览时的角色。
      - `target组件` collect 中 connect是 [DropTargetConnector](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drop-target-connector.html)的实例，内置的方法 `dropTarget()` 对应 `dragSource()`，返回可以将 drop target 和 React DnD backend 连接起来的方法。

    - monitor

      用于查询当前的拖拽状态，其对应实例内置了很多方法。

      - `source组件` collect 中 monitor是 [DragSourceMonitor](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drag-source-monitor.html)的实例。
      - `target组件` collect 中 monitor是 [DropTargetMonitor](https://links.jianshu.com/go?to=http%3A%2F%2Freact-dnd.github.io%2Freact-dnd%2Fdocs-drop-target-monitor.html)的实例。
        内置方法列表：



```cpp
// DragSourceMonitor
monitor.canDrag()        // 是否能被拖拽
monitor.isDragging()      // 是否正在拖拽
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()

// DropTargetMonitor
monitor.canDrop()         // 是否可被放置
monitor.isOver(options)   // source是否在target上方
monitor.getItemType()     // 拖拽组件type
monitor.getItem()         // 当前拖拽的item
monitor.getDropResult()   // 查询drop结果
monitor.didDrop()         // source是否已经drop在target
monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
monitor.getInitialSourceClientOffset()
monitor.getClientOffset() // 拖拽组件当前offset
monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
monitor.getSourceClientOffset()
```

- DragDropContext
  用于包装拖拽根组件，DragSource 和 DropTarget 都需要包裹在DragDropContex内
- DragDropContextProvider
  与 DragDropContext 类似，用 DragDropContextProvider 元素包裹拖拽根组件。

1. 基本概念理解

- Backend 实现 DnD 的方式，默认是用 HTML5 DnD API，它不能在触屏环境下工作，而且在 IE 下可定制性比其他浏览器弱。你也可以用自己实现，具体请看官方文档。
- Items 拖拽数据的表现形式，用 Object 来表示。譬如，要拖拽一张卡片，那这张卡片的数据的表现形式可能是 { id: xxx, content: yyy }。
- Types 表示拖/放组件的兼容性，DragSource 和 DropTarget 必须指定 type。**只有在 type 相同的情况下，DragSource 才能放到 DropTarget 中**。
  补充代码示例：
  App.js



```jsx
import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './ColorBox/Card'
import './App.css';

const CardList = ['red', 'green', 'yellow', 'blue'];

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardList: CardList
        }
        this.moveCard = this.moveCard.bind(this)
        this.findCard = this.findCard.bind(this)
    }

    moveCard(droppedId, target) {
        let { cardList } = this.state;
        let source = cardList.indexOf(droppedId);
        cardList[source] = cardList[target];
        cardList[target] = droppedId;
        this.setState({
            cardList
        })
    }

    findCard(id) {
        let { cardList } = this.state;
        const card = cardList.filter(c => c === id)[0]
        return {
            card,
            index: cardList.indexOf(card),
        }
    }

    render() {
        let { cardList } = this.state;
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div className="App">
                    {cardList.map((item, index) => {
                        return <Card
                            className={item}
                            id={item}
                            index={index}
                            moveCard={this.moveCard}
                            findCard={this.findCard}
                            key={item} />
                    })}
                </div>
            </DragDropContextProvider>
        );
    }
}

export default App
```

Card.js



```jsx
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const sourceSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    },
    // endDrag(props, monitor) {
    //  const { id: droppedId, index } = monitor.getItem()
    //  const didDrop = monitor.didDrop()
    //  debugger

    //  if (!didDrop) {
    //      props.moveCard(droppedId, index)
    //  }
    // },
}

const targetSpec = {
    canDrop() {
        return false
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem()
        const { id: overId } = props

        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex)
        }
    },
}

@DragSource('box', sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
@DropTarget('box', targetSpec, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
class Card extends Component {
    // constructor(props){
    //  super(props)
    // }
    render() {
        let { connectDragSource, connectDropTarget, className } = this.props

        return connectDropTarget(
            (connectDragSource(<div className={className}></div>))
        );
    }
}

export default Card;
```