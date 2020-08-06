// REF

class MyComponent extends React.Component {
  constructor(props) {
    super(props) {
      this.myRef = React.createRef();
    }
  }
  render() {
    return <div ref={this.myRef}/>;
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput}/>
    );
  }
}

class CustomTextInput extends React.Component {
  //
}

// 不能给函数组件添加 ref
function CustomTextInput(props) {
  const textInput = useRef(null);

  function onClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput}/>
      <iput type='button' value="Focus" onClick={onClick} />
    </div>
  );
}

// 组件之间传递REF
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef}/>
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput inputRef={el => this.inputElement = el}/>
    );
  }
}