## React 高级指导

### 1、深入JSX语法

jsx实际上是一个语法糖，babel 将 jsx 转化为 JS，React.createElement 的过程（创建标签和属性）。

如果标签中是大写，说明是一个组件，必须在作用域中声明。组件实际上就是一个函数。

~~~js
import React from 'react';

function Hello(props) {
  return <div>Hello {this.props.name}</div>;
}

function HelloWorld() {
  return <Hello name="Amirica"/>
}
// 只要在定义域内定义一个函数，返回值是一个JSX即可作为一个单向的组件
~~~

#### 大括号

JSX中 { } 内部的 JS 语句：if 和 for 不能在大括号内使用（可以使用 && 进行判断）可以在return之前操作 if 和 for等复杂变量处理过程，将需要显示的变量暂时存储在变量中，这样实现条件渲染和循环。

#### 扩展属性

~~~js
const props = {name: "Mike", age: '16'}; //object
return <Hello {...props}>;

// 将一个对象作为props进行传递。优点：大型应用数据多，统配向下传递属性，可以方便的进行树结构创建。缺点：很多不相关的属性创建到节点内部。
~~~

jsx 中使用 && 进行条件渲染。需要注意：前面的条件必须返回 false 的情况下才不会渲染后面的对象。

~~~js
{this.props.commentsNumber.length && <span></span>}
 // 当数组的长度是0(空数组)，长度是0，界面会渲染一个0，而不会渲染后面的span。
~~~

 如果想要以jsx的形式在界面上输出 true 或 false null undefined， 那么需要转化成字符串进行输出。否则JSX中进行判断操作。

### 2、PropTypes监测数据类型

注意: `React.PropTypes` 自 React v15.5 起已弃用。请使用 [`prop-types` ](https://www.npmjs.com/package/prop-types)库代替。

~~~js
import PropTypes from 'prop-types';

class Hello extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
};
~~~

在开发模式下，react会监测传值的类型；

~~~js
// 你也可以限制你的属性值是某个特定值之一
optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 限制它为列举类型之一的对象
optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
requiredAny: PropTypes.any.isRequired,
  
~~~

### 3、静态类型检查

1. 使用 flow-bin 库检查数据类型：这个比propTypes 强大(facebook)

~~~bash
npm install flow-bin --save-dev flow-bin
npm run flow init 
# 增加 "flow": "flow" 到 package.json 脚本中

npm install --save-dev babel-preset-flow

# 稍后运行
npm run flow

# 详情查阅 flow 的说明文档
~~~

2. typeScript - 微软



### 4、ref

在这三种情况下使用 ref 。尽量减少 ref 的使用。如果必须使用，首先考虑使用状态提升的方式，将子组件的状态放到父组件中，不同组件就可以共享这个状态。ref 的更新在 componentDidMount and componentDidUpdate 阶段。

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库

目前使用ref的情况：获取选中文本的位置，获取滚动元素的位置。

不能在函数式组件上使用 ref

~~~js
<HelloWorld ref={this.helloworld}> // wrong
// 因为函数式组件没有实例，无法获取；可以使用点语法获取当前组件的ref。
 
<Editor ref={(editor) => this.editor = editor}> //correct
// 直接使用一个变量接一下 a = 组件 使用组件点语法获取 editor 。
this.editor.value...
~~~

通常情况下，父组件不会直接获取子组件的属性。这样会保证子组件很好的封装性。

~~~js
// 子组件最好不要直接调用父组件的函数
this.props.getCommentNumber();

// 可以设置组件的回调函数
// father
onCommentAdded = (response) => {
  this.getCommentNumber();
}
// son 
this.props.onCommentAdded(response);
// 子组件获取评论数量后，调用组件的回调函数，具体做什么事情需要父组件决定；
~~~

父组件获取子组件的ref的情况：父组件需要获取子组件（设置子组件）节点的位置；

可以获取选中的部分，获取选中文本的坐标，计算后设置属性（buttonTop），将这个参数直接传递给子组件中的菜单，以行内样式设置子组件的位置。

不推荐直接获取元素的做法！

### 5、非受控组件

大部分情况，表单使用受控组件处理（react处理）；少数情况使用非受控组件（DOM）处理；

```js
// 非受控组件

<input type="text" ref={(input) => this.input = input}>
  
handleClick = () => {
	console.log(this.input.value);  
}
不建议下面的写法，需要使用ref
```

大部分情况表单可以写成受控组件。文件上传表单是非受控组件。使用上面的ref方法，将已经上传的内容（文件名），设置到组件的属性中。

### 6、性能优化

1、使用 React 生产版本，使用 uglify-js ，使用其他插件优化代码，去掉注释；

2、避免重复渲染：当一个组件的props和status发生变化后，React会比较前后的差异进行渲染。如果知道某些情况下，即使发生变化也不需要渲染界面，可以手动操作。shouldComponentUpdate 默认是 true。

如果不设置，那么会通过 diff 算法比较整个节点树是否发生变化，稍后判断进行渲染。如果设置false， 直接跳过整个情况（不进行 diff 比较）。

~~~js
shouldComponentUpdate(nextProps, nextState) {
  return true;
}

// return false;
~~~

大部分情况下，你可以使用`React.PureComponent`而不必写你自己的`shouldComponentUpdate`，它只做一个浅比较。但是由于浅比较会忽略属性或状态**突变**的情况，此时你不能使用它。

使用不可突变的数据结构 [Immutable.js] 可以解决状态突变的情况。原始集合在新集合创建后仍然可以使用。新集合和原始集合结构共享。

### 7、协调 reconciliation

如果完全更新一个DOM树，那么算法的时间复杂度是o(n³)。通过对比不同组件和不同节点是否相同减少计算量。这时的算法复杂度是o(n)。

两个重要原理：两个不同类型的元素会产生完全不同的树；根据key的属性，判断稳定的子节点。不同类型的元素直接渲染，相同类型的元素仅仅更新属性。keys是一个索引，在同一个序列中的所有子节点具有不同的keys。使用 map 方法渲染子节点是需要加入唯一的固定的key值。

### 8、context

避免了props的逐层传递，直接跨越中间的组件进行数据传递。（例如全局的数据，用户的信息，主题，语言等）。用于多个层级多个组件的情况。目前实际开发中还没有用到。

~~~js
// 常见 context API
const { Provider, Consumer } = React.createContext(defaultValue);
// 创建：渲染 consumer 时，可以根据组件树上层中最接近的组件中匹配 Provider 读取当前的 context 值。如果上层组件树中没有一个 Provider 那么需要用到 default Value。

<Provider value={} />

<Consumer>
  {value => /* render sth based on the context value */}
</Consumer>

对于每一个provider更新，consumer将会更新(不受到props更新的影响)。
~~~

### 9、fragments

一个空的元素。一个组件的根元素必须是一个单独的元素。

~~~js
function Glossary(props) {
  return (
  	<dl>
    	{props.items.map(item => (
       	<React.Fragment key={item.id}>
    			<dt>{item.term}</dt>
    			<dt>{item.description}</dt>
    		</React.Fragment>
       ))}
    </dl>
  );
}
~~~


看到高阶组件，看不太懂

