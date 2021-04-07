import React from 'react';
import Options from './options';
// 外部包裹组件
import { DropTarget } from 'react-dnd';
import html5DragDropContext from './html5DragDropContext';

class App extends React.Component {

  render () {
    return (
      <div>
        <Options />
      </div>
    );
  }
}

// 释放的源
const dropTarget = {};

// 释放的收集函数
const dropCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

// 三个参数：名称，
const DndOptionsContainer = DropTarget('Option', dropTarget, dropCollect)(App);

// 这个外部使用拖拽包一层
// 全局最外部包一层
export default html5DragDropContext(DndOptionsContainer);
