// ref 转发
function FancyButton(props) {
  return (
    <button className="fancy">
      {props.children}
    </button>
  );
}

// 修改后的组件
const FancyButton = React.forwardRef((props, ref) => {
  <button ref={ref} className='fancy'>
    {props.children}
  </button>
});

// 使用组件(这样父节点可以获取子节点的ref)
this.ref = React.createRef();
<FancyButton ref={this.ref}>click</FancyButton>
console.log(this.ref.current);


// 在高阶组件中使用转发 refs
function logProps(WrappedComponent) {
  // 高阶组件接收一个组件作为参数
  // 创建一个新的组件
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log(prevProps, this.props);
    }
    // 把传入的组件包起来
    render() {
      return {
        <WrappedComponent {this.props}/>
      };
    }
  }
  // 返回包裹后的组件
  // 这个思维可以用来写Modal或者移动端包裹层
  return LogProps;
}

// 在高阶组件中使用 ref 转发
function logProps(Component) {
  class logProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log(prevProps, this.props);
    }
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <Component ref={forwardedRef} {...rest}/>;
    }
  }
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref}/>;
  });
}

const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref}>;
});

const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref}>;
  }
);

function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardedRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref}/>;
  }

  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;
  return React.forwardRef(forwardRef);
}
