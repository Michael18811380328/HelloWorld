# jsx语法

前端MVVM主流框架都有一套自己的模板处理方法，react则使用它独特的jsx语法。在组件中插入html类似的语法，简化创建view的流程。

## 原生元素

```jsx
ReactDOM.render(
  (<div><h1>标题</h1></div>),
  document.getElementById('root')
)；
```

通过简单的语法页面就会被插入一个div+一个h1标签。原生的html元素可以被直接使用。以上的语法并不是js支持的语法，需要被转换之后才能运行。

## 自定义元素

react强大之处就在于可以组件的自定义，实现组件的复用。如果我们创建了一个组件。我们也可以通过jsx语法调用。

```jsx
import * as React from 'react'

class Page extends React.Component {
  render() {    
    return (<div>      home111 &copy; © \ua9    </div>)
  }
}

ReactDOM.render((<div><Page/></div>), document.getElementById('root'));
```

我们定义了一个Page组件，可以在jsx里面像调用html一样直接调用。

## 插入动态数据

```jsx
let name = 'hi'
ReactDOM.render((  <div>    {name}  </div>), document.getElementById('root'))
```

使用{}就可以插入数据，但是{}中间的必须是js表达式，不能是语句。如果表达式的执行结果是一个数组，则会自动join。

## 注释

jsx语法和html语法一样，也是可以插入注释，只不过写的时候有一些区别

### 子组件注释

```jsx
let name = 'hi'
ReactDOM.render((<div>{/* 注释 */}{name}</div>), document.getElementById('root'))
```

在子组件中插入注释，需要使用{}包裹起来，在//之间插入注释文字。

### 属性注释

```jsx
let name = 'hi'
ReactDOM.render((  <div>    {name}    <img /*         多行注释    */ src="1.jpg"/>  </div>), document.getElementById('root'))
```

在标签中间，可以插入一个多行注释，类似上面的代码。

## 属性props

1. 可以向使用html的attr一样使用属性，就像下面img的src一样

```jsx
let name = 'hi'
ReactDOM.render((  <div>    <img src="1.png"/>  </div>), document.getElementById('root'))
```

1. 如果需要传递动态属性，使用{}，多个属性，使用展开运算符

```jsx
let props = {    src: '1.png',    alt: '1图片'}
ReactDOM.render((  <div>    <img src={"1.png"}/>    <img {...props}/>  </div>), document.getElementById('root'))
```

1. 两个转换,class-->className for-->htmlFor

因为class和for是javascript关键字，所以这里需要用转换之后名称

```jsx
ReactDOM.render((  <div className="tab">    <label htmlFor="name">姓名:</label><input id="name"/>  </div>), document.getElementById('root'))
```

1. 布尔属性

如果一个属性的值是布尔值，当这个值是true的时候则可以省略=后面的值，只保留key。

```jsx
ReactDOM.render((  
  <div className="tab">    
    <input type="text" required/>    
    <input type="text" required={true}/>  
  </div>), document.getElementById('root'))
```

1. 原生元素的自定义属性

react对元素属性做了校验，如果在原生属性上使用此元素不支持的属性，则不能编译成功。必须使用data-前缀

```jsx
ReactDOM.render((  
  <div className="tab">    
    <input type="text" data-init="22"/>  
  </div>), document.getElementById('root'))
```

## 插入html

如果动态的插入html元素,react出于安全性考虑会自动帮我们转义。所以一定要动态的插入元素的话，使用dangerouslySetInnerHTML

```jsx
ReactDOM.render((  
  <div className="tab">    
  	<div dangerouslySetInnerHTML={{__html: '<span>test</span>'}}></div>
  </div>),
document.getElementById('root'))
```

