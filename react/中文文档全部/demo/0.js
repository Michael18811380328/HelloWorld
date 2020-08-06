// 这是练习代码：关键的代码要至少抄写三次才能理解
// 抄写过程中会发现笔记中的手误等等，加深理解

// 0 目录(30行代码)
// 高阶函数的参数是一个组件，返回值也是一个组件
// 注意高阶函数获取内部组件的 ref i18n
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log(prevProps, this.props);
    }
    render() {
      return (<WrappedComponent {this.props.} />);
    }
  }
}

// 一个对象可以对外暴露多个子组件（这样组件名需要处理）
// 可以把多个相关的组件放在一个对象中，然后对外暴露这个对象
// （React.Fragment React.Component） 
const Component = {
  A: (props) => {
    return <div>{props}</div>
  },
  B: (props) => {
    return <span>{props}</span>
  }
}

function test() {
  return <Component.A><Component.B/></Component.A>;
}