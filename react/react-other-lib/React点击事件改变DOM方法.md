# 怎样在 React 中使用事件处理？

原文链接：https://stackoverflow.com/questions/28511207/react-js-onclick-event-handler

## 问题描述

I have

```jsx
var TestApp = React.createClass({
  
  getComponent: function(){
    console.log(this.props);
  },

  render: function(){
    return(
      <div>
        <ul>
          <li onClick={this.getComponent}>Component 1</li>
        </ul>
      </div>
    );
  }
});

React.renderComponent(<TestApp />, document.body);
```

I want to color the background of the ==clicked list element==. How can I do this in React ?

Something like

```jsx
$('li').on('click', function(){
  $(this).css({'background-color': '#ccc'});
});
```

## Answers

### 1

直接设置目标元素的颜色，或者设置state状态，然后改变类名改变颜色。

Why not just:

```jsx
onItemClick: function (event) {
  event.currentTarget.style.backgroundColor = '#ccc';
},

  render: function() {
    return (
      <div>
        <ul>
          <li onClick={this.onItemClick}>Component 1</li>
        </ul>
      </div>
    );
  }
```

And if you want to be more React-ive about it, you might want to set the selected item as ==state== of its containing React component, then reference that state to determine the item's color within `render`:

```jsx
onItemClick: function (event) {
  this.setState({
    selectedItem: event.currentTarget.dataset.id
  });
  //where 'id' =  whatever suffix you give the data-* li attribute
},

  render: function() {
    return (
      <div>
        <ul>
          <li onClick={this.onItemClick} data-id="1" className={this.state.selectedItem == 1 ? "on" : "off"}>Component 1</li>
          <li onClick={this.onItemClick} data-id="2" className={this.state.selectedItem == 2 ? "on" : "off"}>Component 2</li>
          <li onClick={this.onItemClick} data-id="3" className={this.state.selectedItem == 3 ? "on" : "off"}>Component 3</li>
        </ul>
      </div>
    );
  },
```

Of course, you'd want to put those into a loop, and you need to make the `li.on` and `li.off` styles set your `background-color`.

### 2

首先使用JQ获取元素节点

Two ways I can think of are

```jsx
var TestApp = React.createClass({
  getComponent: function(index) {
    $(this.getDOMNode()).find('li:nth-child(' + index + ')').css({
      'background-color': '#ccc'
    });
  },
  render: function() {
    return (
      <div>
        <ul>
          <li onClick={this.getComponent.bind(this, 1)}>Component 1</li>
          <li onClick={this.getComponent.bind(this, 2)}>Component 2</li>
          <li onClick={this.getComponent.bind(this, 3)}>Component 3</li>
        </ul>
      </div>
    );
  }
});
React.renderComponent(<TestApp /> , document.getElementById('soln1'));
```

This is my personal favorite.

```jsx
var ListItem = React.createClass({
  getInitialState: function() {
    return {
      isSelected: false
    };
  },
  handleClick: function() {
    this.setState({
      isSelected: true
    })
  },
  render: function() {
    var isSelected = this.state.isSelected;
    var style = {'background-color': ''};
    if (isSelected) {
      style = {
        'background-color': '#ccc'
      };
    }
    return (
      <li onClick={this.handleClick} style={style}>{this.props.content}</li>
    );
  }
});

var TestApp2 = React.createClass({
  getComponent: function(index) {
    $(this.getDOMNode()).find('li:nth-child(' + index + ')').css({
      'background-color': '#ccc'
    });
  },
  render: function() {
    return (
      <div>
        <ul>
          <ListItem content="Component 1" />
          <ListItem content="Component 2" />
          <ListItem content="Component 3" />
        </ul>
      </div>
    );
  }
});
React.renderComponent(<TestApp2 /> , document.getElementById('soln2'));
```

I hope this helps.

### 3

使用ES6的箭头函数处理事件

Here is how you define a *react onClick event handler*, which was answering the question title... using es6 syntax

```jsx
import React, { Component } from 'react';

export default class Test extends Component {
  handleClick(e) {
    e.preventDefault()
    console.log(e.target)
  }

  render() {
    return (
      <a href='#' onClick={e => this.handleClick(e)}>click me</a>
    )
  }
}
```



### 4

Use ECMA2015. Arrow functions make "this" a lot more intuitive.

```jsx
import React from 'react';

class TestApp extends React.Component {
  getComponent(e, index) {
    $(e.target).css({
      'background-color': '#ccc'
    });
  }
  render() {
    return (
      <div>
        <ul>
          <li onClick={(e) => this.getComponent(e, 1)}>Component 1</li>
          <li onClick={(e) => this.getComponent(e, 2)}>Component 2</li>
          <li onClick={(e) => this.getComponent(e, 3)}>Component 3</li>
        </ul>
      </div>
    );
  }
});
React.renderComponent(<TestApp /> , document.getElementById('soln1'));`
```
