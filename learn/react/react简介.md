# React-阮一峰

## 安装

```bash
$ git clone git@github.com:ruanyf/react-demos.git
```

需要说明的是，React 可以在浏览器运行，也可以在服务器运行，但是本教程只涉及浏览器。

## 一、HTML 模板

使用 React 的网页源码，结构大致如下。

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/JSXTransformer.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/jsx">
      // ** Our code goes here! **
    </script>
  </body>
</html>
```

注意，最后一个 script 标签的 type 属性为 text/jsx 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/jsx" 。 

其次，React 提供两个库： react.js 和 JSXTransformer.js ，它们必须首先加载。其中，JSXTransformer.js 的作用是将 JSX 语法转为 JavaScript 语法。这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。

```bash
$ jsx src/ build/
```

上面命令可以将 src 子目录的 js 文件进行语法转换，转码后的文件全部放在 build 子目录。

## 二、React.render()

React.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

```javascript
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

## 三、JSX 语法

HTML 语言直接写在 JavaScript 语言之中，不加任何引号，它允许 HTML 与 JavaScript 的混写。

```javascript
var names = ['Alice', 'Emily', 'Kate'];

React.render(
  <div>
  {names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

上面代码体现了 JSX 的基本语法规则：遇到 HTML 标签（以 &lt; 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

```javascript
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
React.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

上面代码的arr变量是一个数组，结果 JSX 会把它的所有成员，添加到模板。

## 四、组件

React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类。

```javascript
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

React.render(
  <HelloMessage name="John/>,
  document.getElementById('example')
);
```

上面代码中，变量 HelloMessage 就是一个组件类。模板插入 &lt;HelloMessage /&gt; 时，会自动生成 HelloMessage 的一个实例（下文的“组件”都指组件类的实例）。

注意：==所有组件类都必须有自己的 render 方法，用于输出组件==。

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 &lt;HelloMessage  name="John" /&gt; ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

添加组件属性，有一个地方需要注意，**就是 class 属性需要写成 className ，for 属性需要写成 htmlFor** ，这是因为 class 和 for 是 JavaScript 的保留字。

## 五、this.props.children

this.props 对象的属性与组件的属性一一对应，==但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点==。

```jsx

var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {this.props.children.map(function (child) {
          return <li>{child}</li>
       })}
      </ol>
    );
  }
});

React.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
document.body);
```

上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取

==这里需要注意，只有当子节点多余1个时，this.props.children 才是一个数组，否则是不能用 map 方法的， 会报错==。如果只有一个节点，那么是一个对象，如果没有子节点，返回的是undefined.



## 六、React.findDOMNode()

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。

根据 React 的设计，==所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做  DOM diff  ，它可以极大提高网页的性能表现==。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 React.findDOMNode 方法。

```jsx
var MyComponent = React.createClass({
  handleClick: function() {
    React.findDOMNode(this.refs.myTextInput).focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

React.render(<MyComponent />,document.getElementById('example'));
```

上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。

这时就必须获取真实的 DOM 节点，==虚拟 DOM 是拿不到用户输入的==。

为了做到这一点，**文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就指向这个虚拟 DOM 的子节点**，最后通过 React.findDOMNode 方法获取真实 DOM 的节点。

需要注意的是，==由于 React.findDOMNode 方法获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个方法==，否则会返回 null 。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会调用 React.findDOMNode 方法。



## 七、state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 。

由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。

一个简单的区分方法是，**this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性**。



## 八、表单

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取。

onChange回调函数随着input表单的value值改变而改变。对于input=text具有很好的value属性使用较好，但是对于input-file没有value属性，可能融合不是很好。所以在editor的上传本地图片按钮中，onChange事件和button的onClick事件可能产生冲突。其他表单直接使用onChange事件，调用event.target.value接口



## 九、生命周期

组件的[生命周期](https://facebook.github.io/react/docs/working-with-the-browser.html#component-lifecycle)分成三个状态：

- Mounting：已插入真实 DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种回调函数。

- componentWillMount()

- componentDidMount()

- componentWillUpdate(object nextProps, object nextState)

- componentDidUpdate(object prevProps, object prevState)

- componentWillUnmount()


此外，React 还提供两种特殊状态的回调函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用



## 十、Ajax

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI。

```javascript
var UserGist = React.createClass({
  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  render: function() {
    return <div></div>;
  }
});

React.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```



## 服务器端渲染原因

- SEO优化
- mobile performance 移动端体验更好
- time to first interaction and accessibility. 界面首次加载时间优化

## 综合实例

```jsx
var Photo = React.createClass({

  toggleLiked: function() {
    this.setState({ liked: !this.state.liked});
  },

  getInitialState: function() {
    return { liked: false }
  },

  render: function() {
    var buttonClass = this.state.liked ? 'active' : '';
    return (
      <div className='photo'>
        <img src={this.props.src} />
        <div className='bar'>
          <button onClick={this.toggleLiked} className={buttonClass}>♥</button>
          <span>{this.props.caption}</span>
        </div>
      </div>
    )
  }
});

var PhotoGallery = React.createClass({

  getDataFromServer: function() {
    return [{
      url: 'http://tinyurl.com/lkevsb9',
      caption: 'New York!'
    },
    {
      url: 'http://tinyurl.com/mxkwh56',
      caption: 'Cows'
    },
    {
      url: 'http://tinyurl.com/nc7jv28',
      caption: 'Scooters'
    }];
  },

  render: function() {
    var data = this.getDataFromServer();
    var photos = data.map(function(photo) {
      return <Photo src={photo.url} caption={photo.caption} />
    });
    return <div className='photo-gallery'>{photos}</div>;
  }
});

React.render(<PhotoGallery />, document.body);
```

