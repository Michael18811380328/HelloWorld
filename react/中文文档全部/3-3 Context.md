# Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

- [何时使用 Context](https://zh-hans.reactjs.org/docs/context.html#when-to-use-context)
- [使用 Context 之前的考虑](https://zh-hans.reactjs.org/docs/context.html#before-you-use-context)
- [API](https://zh-hans.reactjs.org/docs/context.html#api)
  - [React.createContext](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)
  - [Context.Provider](https://zh-hans.reactjs.org/docs/context.html#contextprovider)
  - [Class.contextType](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)
  - [Context.Consumer](https://zh-hans.reactjs.org/docs/context.html#contextconsumer)
  - [Context.displayName](https://zh-hans.reactjs.org/docs/context.html#contextdisplayname)
- [示例](https://zh-hans.reactjs.org/docs/context.html#examples)
  - [动态 Context](https://zh-hans.reactjs.org/docs/context.html#dynamic-context)
  - [在嵌套组件中更新 Context](https://zh-hans.reactjs.org/docs/context.html#updating-context-from-a-nested-component)
  - [使用多个 Context](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts)
- [注意事项](https://zh-hans.reactjs.org/docs/context.html#caveats)
- [废弃的 API](https://zh-hans.reactjs.org/docs/context.html#legacy-api)



## 何时使用 Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。  
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，  
  // 因为必须将这个值层层传递所有组件。  
  return (    
    <div>
      <ThemedButton theme={props.theme} />
    </div>  
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 context, 我们可以避免通过中间元素传递 props：

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。

const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。    
    // 无论多深，任何组件都能读取这个值。    
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。    
    return (
      <ThemeContext.Provider value="dark">        
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。  
  // React 会往上找到最近的 theme Provider，然后使用它的值。  
  // 在这个例子中，当前的 theme 值为 “dark”。  
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;  
  }
}
```

注：现在的移动端判断时，每次都会执行正则表达式判断，这个会消耗性能。如果全局设置到APP上面，这样获取一次即可判断是否是移动端，这个可以全局传递。

## 使用 Context 之前的考虑

Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。

**如果你只是想避免层层传递一些属性，[组件组合（component composition）](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)有时候是一个比 context 更好的解决方案。**

比如，考虑这样一个 `Page` 组件，它层层向下传递 `user` 和 `avatarSize` 属性，从而深度嵌套的 `Link` 和 `Avatar` 组件可以读取到这些属性：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果在最后只有 `Avatar` 组件真的需要 `user` 和 `avatarSize`，那么层层传递这两个 props 就显得非常冗余。而且一旦 `Avatar` 组件需要更多从来自顶层组件的 props，你还得在中间层级一个一个加上去，这将会变得非常麻烦。

一种**无需 context** 的解决方案是[将 `Avatar` 组件自身传递下去](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)，因而中间组件无需知道 `user` 或者 `avatarSize` 等 props：

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

注：现在seafile-editor使用这种方法，多个属性可以放在一个对象中传递，减少了props的个数

这种变化下，只有最顶部的 Page 组件需要知道 `Link` 和 `Avatar` 组件是如何使用 `user` 和 `avatarSize` 的。

这种对组件的*控制反转*减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。

而且你的组件并不限制于接收单个子组件。你可能会传递多个子组件，甚至会为这些子组件（children）封装多个单独的“接口（slots）”，[正如这里的文档所列举的](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)

```jsx
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

这种模式足够覆盖很多场景了，在这些场景下你需要将子组件和直接关联的父组件解耦。如果子组件需要在渲染前和父组件进行一些交流，你可以进一步使用 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。

但是，有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新。使用 context 的通用的场景包括管理当前的 locale，theme，或者一些缓存数据，这比替代方案要简单的多。



## API

### `React.createContext`

```js
const MyContext = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

**只有**当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 `undefined` 传递给 Provider 的 value 时，消费组件的 `defaultValue` 不会生效。

### `Context.Provider`

```jsx
<MyContext.Provider value={/* 某个值 */}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

通过新旧值检测来确定变化，使用了与 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 相同的算法。

> 注意
>
> 当传递对象给 `value` 时，检测变化的方式会导致一些问题：详见[注意事项](https://zh-hans.reactjs.org/docs/context.html#caveats)。

### `Class.contextType`

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 [`React.createContext()`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

> 注意：
>
> 你只通过该 API 订阅单一 context。如果你想订阅多个，阅读[使用多个 Context](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts) 章节
>
> 如果你正在使用实验性的 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 `static` 这个类属性来初始化你的 `contextType`。

```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

### `Context.Consumer`

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

这里，React 组件也可以订阅到 context 变更。这能让你在[函数式组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)中完成订阅 context。

这需要[函数作为子元素（function as a child）](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

> 注意
>
> 想要了解更多关于 “函数作为子元素（function as a child）” 模式，详见 [render props](https://zh-hans.reactjs.org/docs/render-props.html)。

### `Context.displayName`

context 对象接受一个名为 `displayName` 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

示例，下述组件在 DevTools 中将显示为 MyDisplayName：

```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

## 示例

### 动态 Context

对于上面的 theme 例子，使用动态值（dynamic values）后更复杂的用法：

**theme-context.js**

```js
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(  themes.dark // 默认值);
```

**themed-button.js**

```js
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;
export default ThemedButton;
```

**app.js**

```jsx
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，    
    // 而外部的组件使用默认的 theme 值    
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```



### 在嵌套组件中更新 Context

从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。在这种场景下，你可以通过 context 传递一个函数，使得 consumers 组件更新 context：

**theme-context.js**

```jsx
// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
export const ThemeContext = React.createContext({
  theme: themes.dark,  
  toggleTheme: () => {},
});
```



**theme-toggler-button.js**

```jsx
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数  return (    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```



**app.js**

```jsx
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。    
    this.state = {      
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };  }

  render() {
    // 整个 state 都被传递进 provider    
    return (
      <ThemeContext.Provider value={this.state}>        
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
```



### 消费多个 Context

为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

```jsx
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>        <UserContext.Provider value={signedInUser}>          <Layout />
        </UserContext.Provider>      </ThemeContext.Provider>    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>      {theme => (        <UserContext.Consumer>          {user => (            <ProfilePage user={user} theme={theme} />          )}        </UserContext.Consumer>      )}    </ThemeContext.Consumer>  );
}
```

如果两个或者更多的 context 值经常被一起使用，那你可能要考虑一下另外创建你自己的渲染组件，以提供这些值。

## 注意事项

因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 `value` 属性总是被赋值为新的对象：

```jsx
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},    };
  }

  render() {
    return (
      <Provider value={this.state.value}>        
        <Toolbar />
      </Provider>
    );
  }
}
```

## 过时的 API

> 注意
>
> 先前 React 使用实验性的 context API 运行，旧的 API 将会在所有 16.x 版本中得到支持，但用到它的应用应该迁移到新版本。过时的 API 将在未来的 React 版本中被移除。阅读[过时的 context 文档](https://zh-hans.reactjs.org/docs/legacy-context.html)了解更多。

