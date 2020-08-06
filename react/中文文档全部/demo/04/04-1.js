// React 顶层API

class Greeting extends React.Component {
  render() {
    return <span></span>;
  }
}

const MyComponent = React.memo(function MyComponnet(props) {
  // props
});

React.createElement(type, [props], [...children]);

React.cloneElement(element, [props], [...children]);

React.isValidElement(object);

// React.Children
React.Children.map(children, function[(thisArg)]);

React.Children.forEach(children, function[(thisArg)]);

React.Children.count(children);

React.Children.only(children);

React.Children.toArray(children);

// Ref
class My extends React.Component {
  cosntructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    return <input type='text' ref={this.inputRef}/>;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}

// React.forwardRef
// 子组件中使用
const FancyButton = React.forwardRef((props, ref) => {
  <button ref={ref} className="test">
    {props.children}
  </button>
});

// 父组件中创建
// 直接在父组件获取子组件中的REF-input
const ref = React.createRef();
<FancyButton ref={ref}>click me!</FancyButton>

const Some = React.lazy(() => 
  import('./Some')
);

// React.Suspense 加载指示器
// 防止某些没有具备渲染条件的组件渲染
// 懒加载组件
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<Spinner/>}>
      <OtherComponent/>
    </React.Suspense>
  );
}