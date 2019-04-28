## textarea 标签

在HTML当中，`<textarea>` 元素通过子节点来定义它的文本内容

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在React中，`<textarea>`会用`value`属性来代替。这样的话，表单中的`<textarea>` 非常类似于使用单行输入的表单：

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

注意`this.state.value`是在构造函数中初始化，这样文本区域就能获取到其中的文本。

## select 标签

在HTML当中，`<select>`会创建一个下拉列表。例如这个HTML就创建了一个下拉列表的原型。

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，Coconut选项最初由于`selected`属性是被选中的。在React中，并不使用之前的`selected`属性，而在根`select`标签上用`value`属性来表示选中项。这在受控组件中更为方便，因为你只需要在一个地方来更新组件。例如：

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[在 CodePen 上尝试。](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

总之，`<input type="text">`, `<textarea>`, 和 `<select>` 都十分类似 - 他们都通过传入一个`value`属性来实现对组件的控制。

## file input 标签

在HTML当中，`<input type="file">` 允许用户从他们的存储设备中选择一个或多个文件以提交表单的方式上传到服务器上, 或者通过 Javascript 的  [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)  对文件进行操作 。

```
<input type="file" />
```

由于该标签的  `value` 属性是只读的， 所以它是 React 中的一个**非受控组件**。我们会把它和其他非受控组件一起在[后面的章节](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)进行详细的介绍。

## 多个输入的解决方法

当你有处理多个受控的`input`元素时，你可以通过给每个元素添加一个`name`属性，来让处理函数根据 `event.target.name`的值来选择做什么。

例如:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[在 CodePen 上尝试。](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

注意我们如何使用ES6当中的[计算属性名](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)语法来更新与给定输入名称相对应的状态键：

```js{2}
this.setState({
  [name]: value
});
```

相当于如下ES5语法

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

同样由于 `setState()` 自动[将部分状态合并到当前状态](/docs/state-and-lifecycle.html#状态更新合并)，因此我们只需要使用发生变化的部分调用它。

## 受控组件的替代方法

有时使用受控组件可能很繁琐，因为您要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。当您将预先存在的代码库转换为React或将React应用程序与非React库集成时，这可能变得特别烦人。在以上情况下，你或许应该看看[非受控组件](/docs/uncontrolled-components.html)，这是一种表单的替代技术。

