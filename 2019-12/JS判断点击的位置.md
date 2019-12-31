# JS 判断元素父子关系

在工作中遇到一个问题：如果界面元素很多，如何判断当前点击的元素，和某个元素是否有父子关系？

如果有20个DIV在嵌套，如果界面发生一个点击事件，在document 监听到这个点击事件，怎样判断点击位于哪个父元素下面

查找资料后，有下面几个解决方案

## 原生 JS

原生JS中可以使用 dom.contains(dom) 来判断是否存在父子关系。

~~~js
var father = document.getElementById('#wrap');
var son = event.target;
if (father.contains(son)) {
  console.log('点击的元素是父元素的子元素');
} else {
  console.log('点击的元素不是父元素的子元素');
}
~~~

注意：这个方法在旧版火狐或者IE浏览器中存在兼容性问题，详情可以参考 https://www.cnblogs.com/cuixi/archive/2013/11/06/3409918.html 兼容写法

~~~js
// 早期 Firefox 兼容写法
console.log(father.compareDocumentPosition(son));

// 下面是兼容写法
var contains = function(a, b, itself){
  // 第一个节点是否包含第二个节点
  //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+,safari5.1.7+
  if (itself && a == b){
    return true
  }
  if (a.contains){
    if (a.nodeType === 9) {
      return true;
    }
    return a.contains(b);
  }
  else if (a.compareDocumentPosition){
    return !!(a.compareDocumentPosition(b) & 16);
  }
  while ((b = b.parentNode))
    if (a === b) {
      return true;
    }
  return false;
}
~~~

## jquery

jquery 中给我们提供了一个方法，可以直接判断父子关系

`$.contains() `方法用于判断指定元素内是否包含另一个元素，即另一个DOM元素是否是指定DOM元素的后代。

~~~js
$.contains(container, contained)
~~~

| 参数        | 描述                                             |
| :---------- | :----------------------------------------------- |
| *container* | Element类型 指定可能包含其他元素的祖辈容器元素。 |
| *contained* | Element类型 指定可能被其他元素包含的后代元素。   |

例子

~~~js
$.contains(father, son)); // true
$.contains(son, father)); // false
~~~

详情可参考：https://www.runoob.com/jquery/misc-contains.html

## React

React 存在的特殊问题：React 父子组件实际渲染后可能位于不同的根组件中

React 渲染有两种情况：第一个情况是传统的父子组件，那么使用传统的 `dom.contains(e.target)` 可以判断点击对象的父子关系；第二种情况是 portals，例如使用 modal 或者 mask, 组件的逻辑是父子关系，但是渲染后的界面中，会把子组件挂在到根节点的某个节点，界面上显示成不同的图层，这样使用传统的  dom.contains 无法判断组件的父子层级。下面是具体的解决方案：

Detecting outside click on a react component is surprisingly hard. A general approach is to have a global click handler on the document which checks if the click target is inside the editor container or not using editorContainer.contains(e.target). This approach works well until portals(入口站点) are used for editors. Portals render children into a DOM node that exists outside the DOM hierarchy of the parent component so editorContainer.contains(e.target) does not work. Here are some examples of the DOM structure with different types of editors。

很难检测到React组件的外部的点击事件。通常是在document上绑定全局点击处理函数，以检查点击的对象（即event.target）是否位于编辑器容器内，或不使用editorContainer.contains（e.target）。在使用入口站点进行编辑之前，此方法效果很好。入口站点将子组件，渲染到父组件的DOM层次结构之外的DOM节点中，因此editorContainer.contains（e.target）不起作用。这是使用不同类型的编辑器的DOM结构的一些示例。

~~~html
// SimpleEditor for example Texbox (No Portals)
<div react-data-grid>..<div>
  <div portal-created-by-the-grid-for-editors>
     <div editor-container>
       <div simple-editor>..</div>
     </div>
  <div>

// ComplexEditor for example Modals (using Portals)
  <div react-data-grid>..<div>
  <div portal-created-by-the-grid-for-editors>
     <div editor-container>
       // Nothing here
     </div>
  <div>
  <div portal-created-by-the-editor>
    <div complex-editor>..</div>
  </div>
~~~

One approach to detect outside click is to use event bubbling through portals. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree. This means a click handler can be attached on the document and on the editor container. The editor container can set a flag to notify that the click was inside the editor and the document click handler can use this flag to call onClickOutside. This approach however has a few caveats

检测外部点击的一种方法是通过 portals 使用事件冒泡。即使这些元素不是DOM树中的祖先，从portals内部触发的事件也将传播到包含的 React 树中的祖先。这意味着可以在文档和编辑器容器上附加单击处理程序。编辑器容器可以设置一个标志，以通知该单击是在编辑器内部的，而文档单击处理程序可以使用此标志来调用onClickOutside。但是，此方法有一些警告

- Click handler on the document is set using document.addEventListener
- Click handler on the editor container is set using onClick prop

-使用document.addEventListener设置文档上的单击处理程序
-使用onClick属性设置编辑器容器上的单击处理程序

This means if a child component inside the editor calls e.stopPropagation then the click handler on the editor container will not be called whereas document click handler will be called.
https://github.com/facebook/react/issues/12518 To solve this issue onClickCapture event is used.

这意味着，如果编辑器中的子组件调用e.stopPropagation，则不会调用编辑器容器上的单击处理程序，而将调用文档单击处理程序。https://github.com/facebook/react/issues/12518。为了解决此问题，使用了onClickCapture事件。

下面是具体的使用：在一个组件外部嵌套一个 ClickOutside 组件，这个组件会捕获组件外部的点击事件。

~~~js
import React from 'react';

class ClickOutside extends React.Component {
  isClickedInside = false;

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (e) => {
    if (this.isClickedInside) {
      this.isClickedInside = false;
      return;
    }
    this.props.onClickOutside(e);
  };

  handleClick = () => {
    this.isClickedInside = true;
  };

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
        onClickCapture: this.handleClick
     }
   );
  }
}

export default ClickOutside；
~~~

这样可以判断点击的位置和子组件的关系