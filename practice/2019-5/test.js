<Input innerRef={input => {this.newInput = input;}}/>

constructor(props) {
  super(props);
  this.state = {};
  this.newInput = React.createRef();
}

componentDidMount() {
  this.newInput.focus();
  this.newInput.setSelectionRange(0, 0);
}


// use inner ref to focus. When Input in a Modal.

<Input innerRef={input => {this.newInput = input;}}/>

constructor(props) {
  super(props);
  this.state = {};
  this.newInput = React.createRef();
}

componentDidMount() {
  this.newInput.focus();
  this.newInput.setSelectionRange(0, 0);
}
