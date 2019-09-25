# React组件创建

## React.createClass

这是旧版本的api，使用React.createClass创建组件，配套的一些api，有getDefaultProps, getinitialstate。官方已经不建议使用了，使用下面新的api替代。

## ES6 classes

```
import * as React from 'react'class Page extends React.Component {  render() {    return (<div>      home    </div>)  }}
```

这是一个实现了render方法的class。也是一个基本的react组件。

## 无状态函数

```
function Button(props, context) {    return (        <button>            <em>{props.text}</em>            <span>{context.name}</span>        </button>    );}
```

纯函数,不存在state，只接受props和state。纯函数有优点，优点就是易于测试，无副作用。

# React数据流

## state

state是组件的内部状态，需要在视图里面用到的状态，才需要放到state里面去。如下，我们在类上创建一个state属性，在视图里面通过使用this.state.name去引用。而这里的state定义则代替的是getinitialstate方法。

```
import * as React from 'react'class Page extends React.Component {  state = {      name: '小明'  }      render() {    return (<div>      {this}    </div>)  }}
```

如何更新state呢，直接更改state其实可以可以的，不过这样子无法触发组件视图的更新机制。所以使用 `setState()`api。值得注意的是setState是异步的，原因是react内部需要对setState做优化，不是state变了立刻去更新视图，而是拦截一部分state的改变，等到合适的时机再去更新视图。

```
import * as React from 'react'class Page extends React.Component {  state = {      name: '小明'  }      render() {    setTimeout(() => this.setState({name: '小明儿子'})， 5000)    return (<div>      {this.state.name}    </div>)  }}
```

> *真实开发中绝不要在render函数里面去更改state，以上只是为了演示*

## props

props是组件之间传递数据的最主要api, react推崇的是自顶向下的数据流向，也就是组件的数据要从父组件传给子组件。如果子组件需要向父组件传递数据，则需要使用回调函数的方式。

```
import * as React from 'react'class Child extends React.Component {  render() {    return (<div>      {this.props.parentName}    </div>)  }}class Parent extends React.Component {  state = {      name: '小明'  }      render() {    setTimeout(() => this.setState({name: '小明儿子'})， 5000)    return (<div>      <Child parentName={this.state.name}/>    </div>)  }}
```

可以看到Child组件显示了父组件的name。当父组件状态更新了，子组件同步更新。那如何在子组件中更改父组件状态呢？答案是回调函数。

```
import * as React from 'react'class Child extends React.Component {  update() {      this.props.onChange('小明名字改了')  }  render() {    return (<div>      {this.props.parentName}      <button onClick={this.update.bind(this)}>更新</button>    </div>)  }}class Parent extends React.Component {  state = {      name: '小明'  }      changeName(name) {      this.setState({          name      })  }  render() {    setTimeout(() => this.setState({name: '小明儿子'})， 5000)    return (<div>      <Child onChange={this.changeName.bind(this)} parentName={this.state.name}/>    </div>)  }}
```

注意哈：props是不可以更改的，这既不符合react单向数据流思想，也为维护带来灾难。

### 事件

react里面的用户事件都是合成事件，被React封装过。内部使用的还是事件的委托机制。 常用的事件有点击事件onClick，input的onChange事件等，官网都可以查到。

#### 合成事件的this指向问题

就像上文一样，我们绑定事件的方式很奇怪，使用了bind来显示绑定this的指向。因为传递到组件内部的只是一个函数，而脱离了当前对象的函数的this指向是不能指到当前组件的，需要显示指定。

#### 通过bind

```
<button onClick={this.update.bind(this)}>更新</button>
```

#### 构造器内部指定

```
import * as React from 'react'class Child extends React.Component {  constructor(props) {     super(props)      this.update = this.update.bind(this)  }  update() {      this.props.onChange('小明名字改了')  }  render() {    return (<div>      {this.props.parentName}      <button onClick={this.update}>更新</button>    </div>)  }}
```

#### 箭头函数

```
import * as React from 'react'class Child extends React.Component {  update => e = {      this.props.onChange('小明名字改了')  }  render() {    return (<div>      {this.props.parentName}      <button onClick={this.update}>更新</button>    </div>)  }}
```

#### 装饰器

```
import * as React from 'react'class Child extends React.Component {  constructor(props) {     super(props)   }  @autoBind  update() {      this.props.onChange('小明名字改了')  }  render() {    return (<div>      {this.props.parentName}      <button onClick={this.update}>更新</button>    </div>)  }}
```

装饰器是es7语法，如果需要使用需要安装对应的babel：present版本。而typescript则原生支持。

> autoBind原理大概就是劫持get方法，get时改变this指向

### 如何获得evnt原生事件

通过e.nativeEvent获取原生事件对象

```
import * as React from 'react'class Child extends React.Component {  constructor(props) {     super(props)      this.update = this.update.bind(this)  }  update(e) {      console.log(e.nativeEvent)  }  render() {    return (<div>      <button onClick={this.update}>更新</button>    </div>)  }}
```

### 解决冒泡和取消默认事件

```
e.preventDefault() //取消默认行为
```

```
e.stopPropagation() //取消冒泡
```

这个和浏览器原生事件处理方案是一致的。问题是我们只可以调合成事件的 `e`的方法，不可以通过 `e.nativeEvent`方法做这些操作，原因是上文讲过的委托。

#### **判断回文字符串** 🐛

回文：回文字符串是指正着读和反着读该字符串都是相同拼写

```js
function palindrome(str){
    // \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
    var re = /[\W_]/g;
    // 将字符串变成小写字符,并干掉除字母数字外的字符
    var lowRegStr = str.toLowerCase().replace(re,'');
    // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
    if(lowRegStr.length===0)
        return true;
    // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
    if(lowRegStr[0]!=lowRegStr[lowRegStr.length-1])
        return false;
    //递归
    return palindrome(lowRegStr.slice(1,lowRegStr.length-1));
}
```

#### **数组去重** 🐛

```js
function unique(arr){
    var obj = {}
    var data = []
    for(var i in arr){
        if(!obj[arr[i]]){
            obj[arr[i]] = true;
            data.push(arr[i]);
        }
    }
    return data;
}
```



# ReactDom

## ref

特殊的props，ref组件对象的引用，现在官方也不建议直接给ref赋值，需要通过函数来赋值。

```js
ReactDOM.render((  <div>    <Calendar ref={ref => this.c = ref} any-ss="text"/>  </div>), document.getElementById('root'))
```

## render

顶层api,只有在根组件时候才需要使用。第一个参数是Component,第二个参数是dom节点

## findDOMNode

通过传入component实例获取此component根dom节点，在这里可以去dom节点进行操作了，虽然极其不建议这么做，但是你确实可以做。

## unmountComponentAtNode

卸载此组件，并销毁组件state和事件

接收组件的引用，也就是ref。仅仅是取消挂载，组件还在，如果需要彻底清除的话，需要手动删掉此dom。

# 表单

## onchange配合value

与vue框架不同的是，react如果要实现表单元素变化，状态同步更新，必须要自己去监听表单事件。

```
import * as React from 'react'class Child extends React.Component {  state = {      name: '小明'  }  constructor(props) {     super(props)      this.update = this.update.bind(this)  }  update(e) {      this.setState({          name: e.target.value      })  }  render() {    return (<div>      <input onChange={this.update} value={this.state.name}/>    </div>)  }}
```

## 受控组件和非受控组件

受控组件和非受控组件这些都是指的表单组件，当一个表单的值是通过value改变的而不是通过defaultValue是受控组件，否则就是非受控组件。

下面组件中的input就是受控组件

```
import * as React from 'react'class Child extends React.Component {  state = {      name: '小明'  }  constructor(props) {     super(props)      this.update = this.update.bind(this)  }  update(e) {      this.setState({          name: e.target.value      })  }  render() {    return (<div>      <input onChange={this.update} value={this.state.name}/>    </div>)  }}
```

下面组件中的input是非受控组件

```
import * as React from 'react'class Child extends React.Component {  state = {      name: '小明'  }  constructor(props) {     super(props)      this.update = this.update.bind(this)  }  update(e) {      this.setState({          name: e.target.value      })  }  render() {    return (<div>      <input onChange={this.update} defaultValue={this.state.name}/>    </div>)  }}
```

# 组件之间通讯

## 父子之间通讯

父子之间通讯又分为父->子，子->父。

因为react单向数据流向的缘故，父->子通信的话直接通过props。父组件数据变动，直接传递给子组件。

子->父组件之间就要通过回调函数来通信了，父组件传递一个回调函数给子组件，子组件通过调用此函数的方式通知父组件通信。

## 跨级组件通信

react为了实现祖先组件和后辈组件之间的通信问题，引入了contextApi。

```jsx
class Button extends React.Component {  render() {    return (      <button style={{background: this.context.color}}>        {this.props.children}      </button>    );  }}Button.contextTypes = {  color: React.PropTypes.string};class Message extends React.Component {  render() {    return (      <div>        {this.props.text} <Button>Delete</Button>      </div>    );  }}class MessageList extends React.Component {  getChildContext() {    return {color: "purple"};  }  render() {    const children = this.props.messages.map((message) =>      <Message text={message.text} />    );    return <div>{children}</div>;  }}MessageList.childContextTypes = {  color: React.PropTypes.string};
```

MessageList中的color会自动更新到儿孙组件里面去，实现跨级啊通信。如果需要反过来通信，则需要借助其他工具，比如事件系统(Pub/Sub)。

## 没有嵌套关系组件之间通信

组件之间通信最主流的两种方式脱胎于观察这模式和中介者模式这两种。

跨级之间通信现在最主流的方式就是观察这模式的实现Pub/Sub，react社区中的redux也是使用这种方式实现的。

vue2.X版本也去掉了跨组件通信的功能。那如何在2.x中做跨组件通信呢？如果不借助外力的话，是不是可以使用 `$ parent` 和 `$ childen` 的递归调用实现全局组件通信呢？比如我想广播一个事件，我就查找到所有的子组件，挨个触发`$emit(xx)`，上报一个事件也是同理，只不过需要查找所有的$parent。结合起来就可以实现组件之间的通信，只不过这种查找效率比较低，需要慎用和优化
