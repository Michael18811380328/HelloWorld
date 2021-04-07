import React from 'react';

// 每一个选项是拖拽的源
import { DragSource } from 'react-dnd';

// 拖拽函数
const dragSource = {
  // 开始拖拽函数
  beginDrag: props => {
    console.log(props);
    // console.log('start drag');
    return {
      // idx: props.optionIndex,
      data: props.option,
      mode: 'option',
      callback: props.move,
    };
  },
  // 结束拖拽函数
  endDrag(props, monitor) {
    console.log('end drag');
    const optionSource = monitor.getItem();
    const didDrop = monitor.didDrop();
    // console.log(didDrop);
    let optionTarget = {};
    if (!didDrop) {
      return { optionSource, optionTarget };
    }
  },
  isDragging(props, monitor) {
    // console.log('拖拽中');
    const { optionIndex, draggedRow } = props;
    const { idx } = draggedRow;
    return idx > optionIndex;
  }
};

// 拖拽的收集函数(高阶函数的第三个参数)
// 对应上面的三个函数
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

class Option extends React.Component {

  render () {
    const { connectDragSource, connectDragPreview, connectDropTarget } = this.props;
    return connectDropTarget(
      connectDragPreview(
        <li>
          <span>这是测试的文字测试 {this.props.option}</span>
          {connectDragSource(
            <span className="rdg-drag-option-handle">
              <i>拖拽部分</i>
            </span>
          )}
        </li>
      )
    );
  }
}

// 对外暴露高阶组件
// 第一个是名称，第二个是拖拽源，第三个是拖拽收集函数
export default DragSource('Option', dragSource, dragCollect)(Option);
