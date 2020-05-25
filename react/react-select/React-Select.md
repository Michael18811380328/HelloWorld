# React-Select

在 React 中的选择框主要使用 React-select，下面是React-select 使用说明。点击下面的链接可以查看详细的demo和文档。

See [react-select.com](https://www.react-select.com/) for live demos and comprehensive docs.

## Version 2 介绍

当前更新到 2.4.1 版本

Improvements include:

- Flexible approach to data, with customisable functions
- Extensible styling API with [emotion](https://emotion.sh/)
- Component Injection API for complete control over the UI behaviour
- Controllable state props and modular architecture
- Long-requested features like option groups, portal support, animation, and more

# Installation and usage

The easiest way to use react-select is to install it from npm and build it into your app with Webpack.

```bash
yarn add react-select
# or choose this way
npm install react-select
```

Then use it in your app:

```js
import React from 'react';
import Select from 'react-select';
 
// the default options. Anyway, we can based on user input then send a request to server, then make the response data as options. 
// options contains basic value and label. Label can use HTML tag so that it can contain some user header or infomation. And options often made into propertity in class. this.options or this.state.options.
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
 
class App extends React.Component {
  
  // get selection as selectionoption
  state = {
    selectedOption: null,
  }
	
	// handle select change
  handleChange = (selectedOption) => {
    this.setState({
      selectedOption
    });
    console.log(`Option selected:`, selectedOption);
    // if selection change, send request to server => get response as new options.
  }
  
  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
// onchange is a callback function. When user input some texts, onChange function is run. then get value and send request to server. Then get response data, setState to change options. AsyncSelect
```

## Props

Common props you may want to specify include:

- `autoFocus` - focus the control when it mounts 自动聚焦
- `className` - apply a className to the control 控制器类名（改变样式）
- `classNamePrefix` - apply classNames to inner elements with the given prefix 类名的前缀
- `isDisabled` - disable the control 控件是否可用
- `isMulti` - allow the user to select multiple values 是否支持多选
- `isSearchable` - allow the user to search for matching options 是否支持搜索
- `name` - generate an HTML input with this name, containing the current value
- `onChange` - subscribe to change events 选择变化回调函数
- `options` - specify the options the user can select from 下拉菜单选项
- `placeholder` - change the text displayed when no option is selected 没有选项时，占位字符
- `value` - control the current value 当前选项的值

See the [props documentation](https://www.react-select.com/props) for complete documentation on the props react-select supports.

## Controllable Props

You can control the following props by providing values for them. If you don't, react-select will manage them for you.

- `value` / `onChange` - specify the current value of the control

- `menuIsOpen` / `onMenuOpen` / `onMenuClose` - control whether the menu is open

- `inputValue` / `onInputChange` - control the value of the search input (changing this will update the available options)


If you don't provide these props, you can set the initial value of the state they control:

- `defaultValue` - set the initial value of the control
- `defaultMenuIsOpen` - set the initial open value of the menu
- `defaultInputValue` - set the initial value of the search input

## Methods

React-select exposes two public methods:

- `focus()` - focus the control programatically
- `blur()` - blur the control programatically

## Customisation

Check the docs for more information on:

- [Customising the styles](https://www.react-select.com/styles)
- [Using custom components](https://www.react-select.com/components)
- [Using the built-in animated components](https://www.react-select.com/home#animated-components)
- [Creating an async select](https://www.react-select.com/async)
- [Allowing users to create new options](https://www.react-select.com/creatable)
- [Advanced use-cases](https://www.react-select.com/advanced)