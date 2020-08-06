//// 3-1 无障碍辅助功能（用户体验和便捷阅读）
// 180行代码
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onChangeHandler}
  value={inputValue}
  name="name"
/>

import React from 'react';

function ListItem({item}) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => {
        <ListItem item={item} key={item.id}/>
      })}
    </dl>
  );
}

// 上面的两个函数可以合并成一个函数
function Glossary2(props) {
  return (
    <dl>
      {props.items.map(item => {
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      })}
    </dl>
  );
}

// 无障碍表单：增加 name 和 label 属性
{/* <label htmlFor="nameInput">Name:</label>
<input id="nameInput" type="text" name="name"></input> */}

// 设置焦点获取焦点
// 对话框打开时，焦点应该聚焦到对话框的输入框中。
// 对话框关闭时，焦点应该聚焦到开启按钮上面。

// 一个组件内部实现获取焦点
class CustomTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.focus();
  }

  focus() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <input type='text' ref={this.textInput}/>
    );
  }
}

// 父组件让子组件内部获取焦点
function CustomTextInput(props) {
  return (
    <div className="custom-input">
      <input ref={props.inputRef}/>
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputEle = React.createRef();
  }

  componentDidMount() {
    this.inputEle.current.focus();
  }

  render() {
    return (
      <CustomTextInput innerRef={this.inputEle}/>
    );
  }
}

// 鼠标和指针事件
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick);
  }

  onClickHandler = () => {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClick = (e) => {
    if (this.state.isOpen && !this.toggleContainer.current.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}></button>
        {this.state.isOpen && (
          <ul>
            <li>Option1</li>
            <li>Option2</li>
            <li>Option3</li>
          </ul>
        )}
      </div>
    );
  }
}

class BlurExample extents React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.timeOutId = null;
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler} aria-haspopup="true" aria-expanded={this.state.isOpen}>Select an option</button>
        {
          this.state.isOpen && (
          <ul><li></li></ul>  
        )}
      </div>
    );
  }
}