// render props 
<DataProvider render={data => (
  <h1>{data.target}</h1>
)}/>

// 组件的Props是一个函数，函数返回一个React元素（而不是实现渲染逻辑
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }

  onMouseDown = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <p>{this.state.x}{this.state.y}</p>
      </div>
    );
  }
}

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="./cat.jpg" style={{position: 'absolute', lft: mouse.x, top: mouse.y}}/>
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  onMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY,
    });
  }

  render() {
    return (
      <div style={{height: '100vh'}} onMouseMove={this.onMouseMove}>
        <Cat mouse={this.state}/>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1></h1>
        <MouseWithCat/>
      </div>
    );
  }
}
