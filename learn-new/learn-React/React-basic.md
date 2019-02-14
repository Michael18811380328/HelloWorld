### React

注意：重点是查漏补缺

http://www.runoob.com/react/react-tutorial.html

#### 安装

1、webpack 编译流程（http://www.runoob.com/react/react-install.html）

```bash
// 使用淘宝 cnpm 安装速度较快
npm install -g cnpm --registry=http://registry.npm.taobao.org

npm config set registry https://registry.npm.taobao.org

cnpm install [name]

// 快速搭建 React 开发环境
cnpm install -g create-react-app
create-reast-app my-app
cd my-app/
npm start
localhost://3000
开始界面 index.html
App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

https://blog.csdn.net/u012859720/article/details/70597119/
```

```js
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>欢迎来到菜鸟教程</h2>
        </div>
        <p className="App-intro">
          你可以在 <code>src/App.js</code> 文件中修改。
        </p>
      </div>
    );
  }
}
 
export default App;
```

晚上回去弄一个空的文件夹，按照流程走一次；



2、忽略文件：这部分文件不会上传到github（对于node-module和个人本地配置文件需要忽略处理）；

.gitignore（隐藏文件）

```
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
/node_modules

# testing
/coverage

# production
/build

#Idea

/.idea


#dist
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

src/config.js

# backup files
*~
```

ES6 与 传统代码——ES6 需要使用 this.props

```js
function Clock(props) {
  return (
    <div>
      {props.data.toLocaleTimeString()}
    </div>
  );
}

class Clock extends React.Component {
  render () {
    return (
      <div>this.props.data.toLocaleTimeString()</div>
    );
  }
}
```

JSX 语法补充：

注释写在花括号中，{/* test */} 在测试的时候写jsx注释很方便



#### React 组件

为了提高代码的复用性，最好使用复合组件；在一个界面中使用多个独立的组件，这样可以最好的做到组件的复用。组件的主要目的就是组件的复用。

```js
/* es5 函数定义组件 */
function Hello(props) {
  return (<h1 className={this.props.h1}>Hello</h1>);
}

/* es6 类定义组件 */
class Welcome extends React.Compoennt {
  consotructor(props) {
    super(props);
    this.state = {
      input: this.props.time
    };
  }
  render() {
    return (<h1>Hello</h1>);
  }
}
// 现在常用ES6的方法，使用ES5的方法自己也要会做。
```

#### React 状态 state

只要state发生变化，就会根据新的state重新渲染用户界面（避免滥用state）；



#### 生命周期函数

```js
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

组件



相对于其他的框架，react 和其他库兼容较好（Angular 兼容不是很好）。React 主要解决基本的问题（state component），不会去在意其他事情。



React 中的表单



#### React 受控组件

1.受控组件：在原生的HTML中，input（type='text'） textarea select 三个元素的内部的属性可以随着用户的输入变化。

2.react 中使用 state 控制属性的变化，将原生的受控组件和 react 中 state 结合。

```js
class Text extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  
  handleChange = (e) => {
    let text = e.target.value.trim();
    this.setState({
      value: text
    });
  } 
  
  handleSubmit = (e) => {
    e.preventDefault();
    seafile.addComment(this.state.value).then((res) => {
      console.log(res.data.success);
    })
  }
  
  render() {
    <form>
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
      <button onClick={this.hanldeSubmit}>Submit</button>
    </form>
  }
}
```

使用受控组件可以过滤用户输入，在handlechange 函数中，设置正则表达式或者简单的trim函数可以过滤部分输入。

`<input type='file' />`是非受控组件。将本地的n个文件上传到服务器中。



当界面上有多个input时，可以只写一个函数，handleinputChange 处理所有的input输入。通过 event.target.type 或者 event.target.name 进行选择，判断是哪个组件发生输入并进行不同的界面操作。

~~~html
<input type="textarea" name="comment" onChange="handleInputChange"/>
<input type="checkoutbox" name="comment-number" onChange="handleInputChange"/>
~~~

~~~js
handleInputChange = (e) => {
  let value = e.target.type === 'textarea' ? e.target.value : e.target.checked;
  const name = e.target.name;
  this.setState({
    //
  });
}
~~~

受控组件使用很多会形成很多的处理函数（2n）根据场合使用受控组件和非受控组件。

#### React组合&继承

React中使用组件进行数据传递。可以进行组件的嵌套组合，实现功能的复用（函数、属性）；react中不推荐使用继承的方法。

对于对话框和侧旁栏，使用前可能不清除内部的功能和需要的资源。

#### React 理念

1. 静态界面：使用props进行单向数据传递，从顶向下进行数据传递，不需要使用state。
2. 动态界面：使用props进行从上到下传递（repoID），state进行组件内部的数据产生和传递（comment）。简单界面使用从上到下的开发过程，复杂界面使用从下到上的开发流程。尽量减少state使用：确定state的使用位置，确定使用state的组件。
3. 组件化会增加代码复用性（后期开发显著增加代码复用性，初期代码比较复杂）



#### 开发流程

1. UI 设计：根据UI中不同图层，确定组件的相对位置；根据产品功能，根据后端传来的数据（默认是字典的JSON），确定组件的内容。基本上，一个组件做到实现一个单一的功能。如果一个组件可以实现很多功能（后期增加很多新的功能，需要拆分成独立功能的子组件）。
2. 静态开发：不考虑用户交互的情况，直接静态页面进行开发（listComments），数据自顶向下进行传递。完成静态开发后，可以进行逐步测试，确保当前静态功能的实现（显示当前评论数量，显示当前已有评论，删除评论）。
3. 动态开发：主要针对用户输入或者操作。用户在底组件中输入，从下层获取数据直接请求，或者使用父组件的函数统一进行请求。

#### React 状态提升

需求：react是一个数据单向传值的框架，如果子组件不能直接给父组件传值。

如果内部多个子组件共同使用相同的数据，并且互相影响。那么可以将这部分共有的数据存放在父组件的属性中，将handleChange作为props传递给子组件。不同子组件会更改福钻进的某个参数，这部分参数会影响其他子组件的行为。确保父组件内部的数据改变会改变子组件的属性。

案例：公里和英里进行转换，总数是固定的，不同子组件需要根据单位进行转换，将唯一的数据存放在父组件中，这样可以减少组件传值造成的bug。

tips：在Chrome react 工具可以查看不同组件的传值，不需要每次console.log。

~~~js
class Text extends React.Compontent {
  
  constrcutor(props) {
    super(props);
    this.state({
      lan: null,
      length: 0
    });
  }
  
  handleInputChange = (e) => {
    if (e.target.name === 'zh') {
      this.setState({
        lan: 'zh',
        length: e.target.value
      })
    }
    else if (e.target.name === 'en') {
      this,setState({
        lan: 'en',
        length: e.target.value
      })
    }
  }
  
  render() {
    const lan = this.state.lan;
    const chinese = lan === "zh" ? length : length * 0.5;
    const english = lan === "en" ? length : length * 2;
    return (
      <div>{chinese}</div>
      <div>{english}</div>
    );
  }
}
~~~

不管输入的是英语还是汉语的单位，那么长度会转化成为英语和汉语进行处理显示。

