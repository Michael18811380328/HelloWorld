// ajax in react

// In the componentDidMount lifestyle, We can populate data with AJAX. Then we can use setState to update component when data is retrived.

class MyComponent extends React.Compoenent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
}

componentDidMount() {
  fetch("https://api.example.com/items").then(response => response.json()).then(
    (result) => {
      this.setState({
        isLoaded: true,
        items: result.items
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )
}
// it is significant to handle errors here. Instance of a catch() block so that we don't swallow exceptions from actual bugs in components.

render() {
  const { error, isLoaded, items } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <dic>The page is loading...</div>
  } else {
    return (
      <ul>
        {items.map(item => {<li key={item.name}>{item.name} {item.price}</li>})}
      </ul>
    );
  }
}