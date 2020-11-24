# react-dnd 实际使用

还是老生常谈的拖拽组件。拖拽分成三个部分：source、target、container。拖拽的源（可以拖动），拖拽的目标对象（可以放置），拖拽的容器（包裹拖拽组件）。复杂的还需要 layer 拖拽层（拖拽过程中如何显示样式变化）。具体信息见官网  http://react-dnd.github.io/react-dnd/。

下面，以拖拽选项排列顺序为案例。

PR: https://github.com/seafileltd/dtable/pull/360/files

## 文件结构及主要代码

### 拖拽容器 container

src/components/dialog/option-widgets/option-container.js

~~~jsx
import { DropTarget } from 'react-dnd';
import html5DragDropContext from '../../../lib/third-support/draggable/html5DragDropContext';

// 这是拖拽容器的组件
class OptionsContainer extends React.Component {
  render() {
    return (
      <ul className="select-options-list">
        {this.props.options}
      </ul>
    );
  }
}

// 这里设置容器（高阶组件，传入一个组件OptionsContainer作为参数，返回一个拖拽的组件）
const DndOptionsContainer = DropTarget('Option', {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(OptionsContainer);

// 处理HTML5拖拽包裹
export default html5DragDropContext(DndOptionsContainer);
~~~

### 拖拽源 source

这部分选项是可以拖拽的选项

src/components/dialog/option-widgets/option-item.js

~~~jsx
import { DragSource } from 'react-dnd';

const dragSource = {
  // 这里有不同的事件，在事件中可以获取拖拽中的状态
  beginDrag: props => {
    return { idx: props.optionIndex, data: props.option };
  },
  endDrag(props, monitor) {
    const optionSource = monitor.getItem();
    const didDrop = monitor.didDrop();
    let optionTarget = {};
    if (!didDrop) {
      return { optionSource, optionTarget };
    }
  }
};

const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

// 使用 connectDropTarget/connectDragPreview 包裹拖拽部分
class OptionItem extends React.Component {

  render() {
    return connectDropTarget(
      connectDragPreview(
        <li>
          {connectDragSource(
            <div className="rdg-drag-option-handle">
              <i className="dtable-font dtable-icon-drag"></i>
            </div>
          )}
          <div className="option-item">
            <span className="option-name" style={{ backgroundColor: option.color }}>{option.name}</span>
          </div>
        </li>
      )
    );
  }
}

export default DragSource('Option', dragSource, dragCollect)(OptionItem);  
~~~

### 拖拽目标 target

拖动到这里可以释放，释放后对应的事件，然后执行JS代码（移动选项顺序）

src/components/dialog/thead-select-option-dialog.js

~~~jsx
import { DropTarget } from 'react-dnd';

const dropTarget = {
  drop(props, monitor) {
    const optionSource = monitor.getItem();
    const { optionIndex: targetIdx } = props;
    if (targetIdx !== optionSource.idx) {
      let optionTarget = { idx: targetIdx, data: props.option };
      props.moveOption(optionSource, optionTarget);
    }
  }
};

const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  draggedRow: monitor.getItem()
});

class TheadSelectOptionDialog extends React.Component {

  getOptionItems = () => {
    let DndOptionItem = DropTarget('Option', dropTarget, dropCollect)(OptionItem); 
    return (
      options.map((option, optionIndex) => (
        <DndOptionItem 
          key={optionIndex}
          optionsLength={options.length}
          option={option}
          currentIndex={currentIndex}
          optionIndex={optionIndex}
          isOptionOperationDropdownmenuShow={isOptionOperationDropdownmenuShow}
          moveOption={this.moveOption}
          editOption={this.editOption}
          deleteOption={this.deleteOption}
          onMoreOperationToggle={this.onMoreOperationToggle}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onOptionOperationDropdownmenuShow={this.onOptionOperationDropdownmenuShow}
          toggleChangeOptionDialog={this.toggleChangeOptionDialog}
        />
      ))
    );
  }

  render() {
    return (
      <ModalBody className="thead-select-option-body">
        {options.length === 0 && <div className="mt-2">{t('No_option')}</div>}
        <DndSelectOptionsContainer options={optionSelect} currentIndex={currentIndex} />
      </ModalBody>
    );
  }
}

export default (TheadSelectOptionDialog)
~~~

