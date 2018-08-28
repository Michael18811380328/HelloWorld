# React

从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机。

我学习 React 时，就很苦恼。有的教程讨论一些细节问题，对入门没帮助；有的教程写得不错，但比较短，无助于看清全貌。我断断续续学了几个月，看过二十几篇教程，在这个过程中，将对自己有帮助的 Demo 都收集下来，做成了一个库 [React Demos](https://github.com/ruanyf/react-demos) 。

## 零、安装

React 的安装包，可以到[官网](https://facebook.github.io/react/downloads.html)下载。不过，[React Demos](https://github.com/ruanyf/react-demos) 已经自带 React 源码，不用另外安装，只需把这个库拷贝到你的硬盘就行了。

```bash
$ git clone git@github.com:ruanyf/react-demos.git
```

需要说明的是，React 可以在浏览器运行，也可以在服务器运行，但是本教程只涉及浏览器。一方面是为了尽量保持简单，另一方面 React 的语法是一致的，服务器的用法与浏览器差别不大。[Demo11](https://github.com/ruanyf/react-demos/tree/master/demo11)  是服务器首屏渲染的例子，有兴趣的朋友可以自己去看源码。

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

上面代码有两个地方需要注意。首先，最后一个 script 标签的 type 属性为 text/jsx 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/jsx" 。 

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

上一节的代码， HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 [JSX 的语法](http://facebook.github.io/react/docs/displaying-data.html#jsx-syntax)，它允许 HTML 与 JavaScript 的混写（查看 [Demo02](https://github.com/ruanyf/react-demos/blob/master/demo02/index.html) ）。

```javascript
var names = ['Alice', 'Emily', 'Kate'];

React.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

上面代码体现了 JSX 的基本语法规则：遇到 HTML 标签（以 &lt; 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。上面代码的运行结果如下。



JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员（查看 [demo03](https://github.com/ruanyf/react-demos/blob/master/demo03/index.html) ）。这个属性实际上可以使用。

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

上面代码的arr变量是一个数组，结果 JSX 会把它的所有成员，添加到模板，运行结果如下。



## 四、组件

React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类（查看 [demo04](https://github.com/ruanyf/react-demos/blob/master/demo04/index.html)）。

```javascript
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

React.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

上面代码中，变量 HelloMessage 就是一个组件类。模板插入 &lt;HelloMessage /&gt; 时，会自动生成 HelloMessage 的一个实例（下文的“组件”都指组件类的实例）。

注意：所有组件类都必须有自己的 render 方法，用于输出组件。

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 &lt;HelloMessage  name="John" /&gt; ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

添加组件属性，有一个地方需要注意，**就是 class 属性需要写成 className ，for 属性需要写成 htmlFor** ，这是因为 class 和 for 是 JavaScript 的保留字。



## 五、this.props.children

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点（查看 [demo05](https://github.com/ruanyf/react-demos/blob/master/demo05/index.html)）。

```javascript
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        this.props.children.map(function (child) {
          return <li>{child}</li>
        })
      }
      </ol>
    );
  }
});

React.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取

这里需要注意，只有当子节点多余1个时，this.props.children 才是一个数组，否则是不能用 map 方法的， 会报错。



## 六、React.findDOMNode()

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。

根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 [DOM diff](http://calendar.perfplanet.com/2013/diff/) ，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 React.findDOMNode 方法（查看 [demo06](https://github.com/ruanyf/react-demos/blob/master/demo06/index.html) ）。

```javascript
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

React.render(
  <MyComponent />,
  document.getElementById('example')
);
```

上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。

这时就必须获取真实的 DOM 节点，**虚拟 DOM 是拿不到用户输入的**。

为了做到这一点，**文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就指向这个虚拟 DOM 的子节点**，最后通过 React.findDOMNode 方法获取真实 DOM 的节点。

需要注意的是，由于 React.findDOMNode 方法获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个方法，否则会返回 null 。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会调用 React.findDOMNode 方法。

（使用组件的生命周期componentdidmount可以在DOM完成一次渲染后执行，对于界面预加载或者异步请求的情况很适用）

React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等，完整的事件清单请查看[官方文档](http://facebook.github.io/react/docs/events.html#supported-events)。



## 七、this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI （查看 [demo07](https://github.com/ruanyf/react-demos/blob/master/demo07/index.html) ）。

```javascript
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

React.render(
  <LikeButton />,
  document.getElementById('example')
);
```

上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。

由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。

一个简单的区分方法是，**this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性**。

## 八、表单

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取（查看 [demo08](https://github.com/ruanyf/react-demos/blob/master/demo08/index.html) ）。

```javascript
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

React.render(<Input/>, document.body);
```

上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况，更多介绍请参考[官方文档](http://facebook.github.io/react/docs/forms.html)。

备注：onChange回调函数随着input表单的value值改变而改变。对于input=text具有很好的value属性使用较好，但是对于input-file没有value属性，可能融合不是很好。所以在editor的上传本地图片按钮中，onChange事件和button的onClick事件可能产生冲突。其他表单直接使用onChange事件，调用event.target.value接口



## 九、组件的生命周期

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

这些方法的详细说明，可以参考[官方文档](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)。下面是一个例子（查看 [demo09](https://github.com/ruanyf/react-demos/blob/master/demo09/index.html) ）。

```javascript
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },
 	// 通常情况直接改变类，不使用react直接改变样式

  componentDidMount: function () {
    this.timer = setInterval() => {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }, 100);
  },
  // 组件已经加载后执行opacity的显示循环

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

React.render(
  <Hello name="world"/>,
  document.body
);
```

上面代码在hello组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。

另外，组件的style属性的设置方式也值得注意，不能写成 

```javascript
style="opacity:{this.state.opacity};"
```

而要写成

```javascript
style={{opacity: this.state.opacity}}
```

这是因为 [React 组件样式](https://facebook.github.io/react/tips/inline-styles.html)是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。



## 十、Ajax

组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI （查看 [demo10](https://github.com/ruanyf/react-demos/blob/master/demo10/index.html) ）。

**这个功能很重要！！！**

```javascript
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      console.log(result);
      var lastGist = result[0];
      if (this.isMounted()) {
        // this.isMOunted 是es5的语法，在es6中不支持这个语法
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

React.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```

上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 没有任何依赖，完全可以使用其他库。

## 十一、参考链接

- [React's official site](http://facebook.github.io/react)
- [React's official examples](https://github.com/facebook/react/tree/master/examples)
- [React (Virtual) DOM Terminology](http://facebook.github.io/react/docs/glossary.html), by Sebastian Markbåge
- [The React Quick Start Guide](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), by Jack Callister
- [Learning React.js: Getting Started and Concepts](https://scotch.io/tutorials/learning-react-getting-started-and-concepts), by Ken Wheeler
- [Getting started with React](http://ryanclark.me/getting-started-with-react/), by Ryan Clark
- [React JS Tutorial and Guide to the Gotchas](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/), by Justin Deal
- [React Primer](https://github.com/BinaryMuse/react-primer), by Binary Muse
- [jQuery versus React.js thinking](http://blog.zigomir.com/react.js/jquery/2015/01/11/jquery-versus-react-thinking.html), by zigomir




## 基本思想

为什么要服务器端渲染：

- SEO
- mobile performance
- time to first interaction and accessibility. 

## 一个简单的状态驱动的例子

```javascript
var Box = Bloop.createClass({
  getInitialState: function() {
    return { number: 0 };
  },
  // 等价于
  state {
  	number: 0
	}

  updateNumber: function() {
    this.state.number++;
  },
  // 等价于
  updateNumber = () => {
   this.state.number ++;   
  }

  render: function() {
    return dom.div(
      this.state.number,
      dom.button({ onClick: this.updateNumber }, 'Increment')
      // 这一句其他地方没见过
    );
  }
});
```

## DOM Diff

```javascript
var MyComponent = React.createClass({ 
  render: function() { 
    if (this.props.first) { 
      return <div className="first"><span>A Span</span></div>; 
    } else { 
      return <div className="second"><p>A Paragraph</p></div>; 
    } 
  } 
});
```

render方法的运行结果，并不是返回一个DOM对象，而是一个正常的JavaScript对象，被称为虚拟DOM（virtual DOM）。

一旦状态发生变化，需要重新生成View， React会试着发现最小步骤从上一次render的结果到下一次。比如，组件原来是 <MyComponent first={true} />，现在变为<MyComponent first={false} />，最后又卸载，步骤如下：

第一步：从无生成第一次渲染：生成代码：<div className="first"><span>A Span</span></div>

第二步：第一次渲染生成第二次渲染：

- 替换属性className="first" 为className="second"
- 替换节点：<span>A Span</span> 为 <p>A Paragraph</p>

第三步：从第三次渲染到卸载

- 移除节点：<div className="second"><p>A Paragraph</p></div>

参考链接：

- Christopher Chedeau, [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)

  

##  React.createClass()：新建一个组件

```js
var Photo = React.createClass({
  render: function() {
    return <img src='http://tinyurl.com/lkevsb9' />
  }
});

React.render(<Photo />, document.body);

```

组件通过React.createClass方法创建。**组件至少需要一个render方法**，返回一个虚拟DOM节点，子节点和事件回调函数都放在这个节点上。**组件在运行时，只能取到两个对象：props和state**。

（组件相当于一个产生dom结构的函数，props是传入的实际参数，是固定值（可以通过固定值延伸其他可变参数）；state是函数内部的局部变量，可以在函数中进行计算改变。）props是不可变的，state是可变的。

```javascript
var ReadingTimeWidget = React.createClass({
  // 组件没有state？
    render: function() {
        var message = '';
        if (this.state.secondsRequired !== null) {
            message = 'TODO';
        } else {
            message = 'Calculating reading time...';
        }
        return (
            <span id='reading_time'>{message}</span>
        );
    }
});
```

React.renderComponent方法用来渲染组件，第一个参数是React组件，第二个参数是要加载这个组件的DOM节点。

```javascript
React.renderComponent(
        <h1>Hello, world!</h1>,
        document.getElementById('myDiv')
    );
```

React.createClass方法用于生成组件。

```javascript
var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});
```

定义组件后，再使用React.renderComponent方法，就很简单了。

```javascript
React.renderComponent(
    <MyComponent/>,
    document.getElementById('myDiv')
);
```



### props

```js
var Photo = React.createClass({

  render: function() {
    return (
      <div className='photo'>
        <img src={this.props.imageURL} />
        <span>{this.props.caption}</span>
      </div>
    )
  }
});

React.render(<Photo imageURL='http://tinyurl.com/lkevsb9' caption='New York!' />, document.body);

```

渲染的时候，组件可以指定HTML属性。在组件内部，使用props对象获取属性。

```javascript

var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, {this.props.name}!</h1>
        );
    }
});

React.renderComponent(<MyComponent name="Handsome" />, document.getElementById('myDiv'));

```

### 组件的回调函数

- componentWillMount：在组件渲染前发生（服务器和浏览器）
- componentDidMount：在渲染后发生（浏览器）
- shouldComponentUpdate： 返回一个布尔值，表示组件是否应该更新
- componentWillUnmount：组件卸载前发生

### 组件的方法

- getInitialState：返回状态的初始值
- getDefaultProps：如果没有设置HTML属性，则将其设为默认值
- mixins：一个数组，其成员是对象，用来延伸当前组件的功能

###  指定初始状态

getInitialState方法用来设置初始状态

```javascript
var MyComponent = React.createClass({
    getInitialState: function(){
        return {
            count: 5
        }
    },
    render: function(){
        return (
            <h1>{this.state.count}</h1>
        )
    }
});
```

组件的状态用this.state对象读取，比如this.state.secondsRequired。注意，React的数据流是单向的，只能由state和props对象流向组件。

setState方法用于更新组件状态。

```javascript

/** @jsx React.DOM */

var FilteredList = React.createClass({

  filterList = (event) => {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  
  getInitialState: function(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
     }
  },
  
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  
  render: function(){
    return (
      <div className="filter-list">
        <input type="text" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );

});

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )  
  }
});

React.render(<FilteredList/>, document.getElementById('mount-point'));
```

### 组件的事件

```javascript
var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div class="my-component">
        <h1>Count: {this.state.count}</h1>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

React.renderComponent(<Counter/>, document.getElementById('mount-point'));

```

### 渲染组件

React.renderComponent方法用来渲染组件，第二个参数指定挂载点。

```javascript
$(document).ready(function() {
    var mountPoint = $('#reading_time_mount');
    if (mountPoint) {
        var contentDiv = $('#main_content');

        React.renderComponent(
            <ReadingTimeWidget contentDiv={contentDiv} wpm={200} />,
            mountPoint.get(0));
    }
});
```



## 综合实例

```javascript
var Photo = React.createClass({

  toggleLiked: function() {
    this.setState({
      liked: !this.state.liked
    });
  },

  getInitialState: function() {
    return {
      liked: false
    }
  },

  render: function() {
    var buttonClass = this.state.liked ? 'active' : '';

    return (
      <div className='photo'>
        <img src={this.props.src} />

        <div className='bar'>
          <button onClick={this.toggleLiked} className={buttonClass}>
            ♥
          </button>
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

    return (
      <div className='photo-gallery'>
        {photos}
      </div>
    )
  }
});

React.render(<PhotoGallery />, document.body);

```

