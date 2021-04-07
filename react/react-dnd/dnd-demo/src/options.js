import React from 'react';
import Option from './option';
// 释放的对象
import { DropTarget } from 'react-dnd';

// 释放
const dropTarget = {
  drop(props, monitor) {
    const optionSource = monitor.getItem();
    // 拖拽的位置
    // optionSource.idx
    // 释放的位置
    // props.option
    if (props.option !== optionSource.data) {
      optionSource.callback(optionSource.data, props.option);
    }
  }
};

// 释放的收集函数
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  draggedRow: monitor.getItem()
});

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [1,2,3,4,5,6,7],
    };
  }

  // 释放后的处理函数
  move = (a, b) => {
    // console.log(a, b);
    let options = this.state.options.slice(0);
    // console.log(options);
    let A = options.findIndex(item => item === a);
    let B = options.findIndex(item => item === b);
    // console.log(A, B);
    options[A] = b;
    options[B] = a;
    this.setState({ options });
  }

  render () {
    // 每一项都可以释放（高阶函数，第一个是明传入哪个，第二个是释放对象，第三个是释放搜集函数）
    let DndOptionItem = DropTarget('Option', dropTarget, dropCollect)(Option);
    return (
      this.state.options.map((option, optionIndex) => (
        <DndOptionItem 
          key={optionIndex}
          option={option}
          move={this.move}
        />
      ))
    );
  }
}

export default Options;
