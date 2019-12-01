# 使用react-transition-group实现动画效果进阶

这次用react-transition-group做一个togglebutton控制div显示和隐藏的例子

首先我们需要安装react-transition-group，输入：

```bash
npm install react-transition-group --save
```

组件中引入CSSTransition模块：

```jsx
import { CSSTransition } from 'react-transition-group'
```

将CSSTransition标签包裹在需要实现动画效果的元素外，然后进行相关属性的配置：

```jsx
constructor(props){
  super(props);
  this.state = {
    show: true
  };
}

handleToggole: ()=> {
  this.setState({show: !this.state.show});
}

render() {
  return (
    <Fragment>
      <CSSTransition
        in={this.state.show} // 如果this.state.show从false变为true，则动画入场，反之out出场
        timeout={1000} //动画执行1秒
        classNames='fade' //自定义的class名前缀
        unMountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
        onEntered={(el) => {
          el.style.color='blue'   //可选，动画入场之后的回调，el指被包裹的dom，让div内的字体等于蓝色
        }}
        onExited={() => {
          xxxxx   //同理，动画出场之后的回调，也可以在这里来个setState啥的操作
        }}
        >
        <div>hello</div>
      </CSSTransition>
      <button onClick={this.handleToggole}>toggle</button>
    </Fragment>
  )
}
```

一旦动画入场，插件将会自动的在包裹住的标签上添加很多css样式，默认class名是fade，所以我们需要给CSSTransition标签加上classNames='fade'，然后去css文件进行配置：

```css
//enter是入场前的刹那（点击按钮），appear指页面第一次加载前的一刹那（自动）
.fade-enter, .fade-appear {
    opacity: 0;
}
//enter-active指入场后到入场结束的过程，appear-active则是页面第一次加载自动执行
.fade-enter-active, .fade-appear-active { 
    opacity: 1;
    transition: opacity 1s ease-in;
}
//入场动画执行完毕后，保持状态
.fade-enter-done {
    opacity: 1;
}
//同理，出场前的一刹那，以下就不详细解释了，一样的道理
.fade-exit {
    opacity: 1;
}

.fade-exit-active {
    opacity: 0;
    transition: opacity 1s ease-in;
}

.fade-exit-done {
    opacity: 0;
}
```

如果页面上一组dom都需要添加动画效果时我们需要在最外面再加一个TransitionGroup

```jsx
import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  render() {
    return (
      <Fragment>
        <TransitionGroup>
          {
            this.state.list.map((item, index) => {
              return (
                <CSSTransition
                  timeout={1000}
                  classNames='fade'
                  unmountOnExit
                  onEntered={(el) => {el.style.color='blue'}}
                  appear={true}
                  key={index}
                  >
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={this.handleAddItem}>toggle</button>
      </Fragment>
    )
  }

  handleAddItem() {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}

export default App;
```

