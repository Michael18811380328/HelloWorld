class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch('http://api.example.com/items')
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: false,
          items: result.items,
        });
      }, (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <ul>
          {items.map(item => {
            <li key={item.name}>
              {item.name} + {item.price}
            </li>
          })}
        </ul>
      );
    }
  }
}

// Hook
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/items")
      .then((res) => res,json())
      .then((res) => {
        setIsLoaded(true);
        setItems(res.items);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    return(
      <ul>
        {items.map(item => {
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        })}
      </ul>
    );
  }
}
