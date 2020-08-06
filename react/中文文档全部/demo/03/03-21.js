// 非受控组件的使用
// 在表单上传文件，长文本编辑中会使用到
class NameForm extends React.Component {
  constructor(props) {
    this.input = React.createRef();
  }

  onSubmit = (e) => {
    console.log(this.input.current.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" ref={this.input}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

  renderNode() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            defaultValue="Bob"
            type="text"
            ref={this.input}
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.fileInput.current.files[0].name);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          <input type="file" ref={this.fileInput}/>
        </label>
        <br/>
        <button type="submit"></button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);