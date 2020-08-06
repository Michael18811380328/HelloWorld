// Protals
// 可以将子节点渲染到父节点之外的DOM节点的方案
import React from 'react';
React.createProtal(child, container)
// 适合对话框，提示框，这样可以跳出当前的容器
render() {
  return ReactDOM.createProtal(
    this.props.children,
    domNode
  );
}

// 实际使用
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createProtal(this.props.children, this.el);
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>{this.state.clicks}</p>
        <Modal>
          <Child/>
        </Modal>
      </div>
    );
  }
}

function Child() {
  return (
    <div className="modal">
      <button></button>
    </div>
  );
}

ReactDOM.render(<Parent/>, appRoot);
