import React from 'react';
import Options from './options';
// 拖拽功能
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

// 释放的源：由拖拽state传递给子组件的部分（如果函数名相同，则覆盖原始拖拽函数）
const dropTarget = {};

// 释放的收集函数（内部释放函数，对应到 connect 中的函数）
const dropCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

// 三个参数：名称，dropTraget， dropCollect
// 这里表示整个APP都可以被释放
const DndOptionsContainer = DropTarget('Option', dropTarget, dropCollect)(App);

// 全局最外部用 html5DragDropContext 包一层
export default html5DragDropContext(DndOptionsContainer);
