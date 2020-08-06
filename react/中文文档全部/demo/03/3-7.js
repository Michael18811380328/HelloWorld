const Component = higherOrderComponent(WrappedComponent);

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      comments: DataSource.getComments(),
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments(),
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => {
          <Comment comment={comment} key={comment.id}/>
        })}
      </div>
    );
  }
}

// 订阅事件部分，我们可以提取一个公共组件
