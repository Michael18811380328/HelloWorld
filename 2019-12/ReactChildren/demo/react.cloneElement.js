import React from 'react';
import ReactDOM from 'react-dom';
/**
 * if there is a father and several sons
 * we can change son though father.chiuldren
 * 我们可以通过父组件，给子组件设置属性
 */

// <RadioGroup name="g1">
//   <RadioButton value="first">First</RadioButton>
//   <RadioButton value="second">Second</RadioButton>
//   <RadioButton value="third">Third</RadioButton>
// </RadioGroup>

// 首先了解 React.cloneElement(element, object)
// 可以把想要克隆的元素作为第一个参数，然后把设置的属性作为第二个参数
// 通过这个方法修改子组件的属性

const another = React.cloneElement(element, {
  height: 100,
  width: 50,
  draggable: true,
  editbale: false,
});

class RadioGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  renderChildren = () => {
    const { name, children } = this.props;
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        name: name,
      });
    });
  }

  render() {
    return (
      <div className="outer-container">
        {this.renderChildren()}
      </div>
    );
  }
}