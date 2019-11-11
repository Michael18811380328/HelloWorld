class Title extennds React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };

    handleChange = (e) => {
      this.setState({
        name: e.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h1>{this.state.name}</h1>
        <input type="text" onChange={this.handleChange}/>
      </div>
    );
  }
};

ReactDOM.render(<Title name="Tom">, document.getElementById('wrapper'));


