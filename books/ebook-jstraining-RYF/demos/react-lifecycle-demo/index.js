class MyList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,
      error: null,
      data: null
    };
  }

  componentDidMount() {
    const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
    $.getJSON(url).done((value) => {
      this.setState({
        loading: false,
        data: value
      });
      console.log(value);
    }).fail((error, textStatus) => {
      console.log(error, textStatus);
      this.setState({
        loading: false,
        error: error.status
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error}</span>;
    } else {
      console.log(data);
      return (
        <div>
          <p>API 数据获取成功</p>
          <p>改写代码，将结果显示在这里</p>
        </div>
      );
    }
  }
};

ReactDOM.render(
  <MyList/>,
  document.getElementById('example')
);