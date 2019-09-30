class Ajax extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidmount() {
    fetch('url').then(res => res.json()).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>erroe</div>;
    }
    else if (!isLoaded) {
      return <div>Loading</div>
    }
    else {
      return (
        <ul>
          { items.map(item => (...))}
        </ul>
      );
    }
  }

}