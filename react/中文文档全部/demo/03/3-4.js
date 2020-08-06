// 3-4 错误边界
// 组件中使用了 static getDerivedStateFromError() 渲染备用UI
// 使用 componentDidCatch 打印当前错误

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Loading...</h1>
    }
    return this.props.children;
  }
}

// use 可以捕获子组件中的错误
<ErrorBoundary><Component/></ErrorBoundary>

// 处理一个组件自身的错误，还是用原来的try-catch

class B extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.click = this.click.bind(this);
  }

  click() {
    try {
      // ...
    } catch(e) {
      this.setState({
        error: e,
      });
    }
  }

  render() {
    if (this.state.error) {
      return <div>Loading...</div>
    }
    return <div></div>
  }
}
