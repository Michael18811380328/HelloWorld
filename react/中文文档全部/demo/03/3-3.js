// 3-3 context 多重组件传值，无序显式传值（语言、地区等）
class App extends React.Component {
  render() {
    return <Toolbar theme="dark"/>
  }
}

function Toolbar(props) {
  return <ThemeButton theme={props.theme}></ThemeButton>;
}

class ThemeButton extends React.Component {
  render() {
    return (<Button theme={this.props.theme}></Button>);
  }
}

// 现在这样写，全局的属性会一直向下传递（中间组件不需要，但是需要传值）
// 所以我们可以使用 context 优化

const ThemeContext = React.createContext('dark');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <ThemeButton/>
  );
}

class ThemeButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context}></Button>;
  }
}

// 修改后，中间组件不需要处理props传参，只需要在顶部组件和叶组件中获取参数

























