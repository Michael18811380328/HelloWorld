// jsx javascript xml语言 
/*
	1.不能使用原生JS中的for和class，可以使用HtmlFor和className进行替代；
	2.在react中，不使用jquery来查找元素。react的思想就是通过属性变化控制元素的显示和隐藏。所以避免使用DOM的方法去查找对象。
	3.在花括号中可以加入变量，也可以加入函数
*/ 

function date(d){
	return [
		d.getFullYear(),
		d.getMonth() + 1,
		d.getDate()
	].join('-');
}
// <p>{date(new Date())}</p>

// 4.可以使用多行注释

// 5.使用条件判断进行渲染
let Hello = React.createClass({
	render:function(){
		// 这样可以预设变量，类似于函数的参数预设变量。
		return (
			<p>{this.props.name?this.props.name:"Mike"}</p>
		);
	}
}) 

初始化阶段：
getDefaultProps:获取默认属性，只调用一次；
getInitialState:初始化每个实例特有初始状态；
componentWillMount
render
componentDidMount

运行中阶段：
compoenntWillReceiveProps: 组件即将接收到属性改变，或者父组件的属性已经发生变化，即将传递到子组件的情况。

shouldComponentUpdate:当组件的属性和状态发生变化触发。这是一个疑问句，我们告诉react不去更新某个组件，有时候属性或者黄台不会导致组件更新，在组件不需要更新的情况下，手动使用shouldComponentUpdate返回false，这样不会经过render和diff算法去判断是否需要更新，从而提高浏览器的性能。

componentWillUpdate

render

componentDidUpdate

销毁阶段

componentWillUnmount:开发者可以利用最后的机会清理工作。

React中的事件：

①移动设备上的触摸事件：onTouchCancel、onTouchEnd、onTouchMove、onTouchStart 
②键盘类事件：onKeyDown、onKeyPress、onKeyUp
③剪切类事件：onCopy、onCut、onPaste 
④表单类：onChange//内容变化即触发、onInput、onSubmit//禁止表单默认跳转行为
⑤事件：onFocus、onBlur 
⑥UI元素类：onScroll
⑦鼠标滚动事件：onWheel
⑧鼠标类型：onClick、onContextMenu（右键菜单）、onDoubleClick、onMouseDown、onMouseEnter、onMouseLeave、onMouseMove、onMouseOut、onMouseOver、onMouseUp
⑨拖拽事件：onDrop、onDrag、onDragEnd、onDragEnter、onDragExit、onDragLeave、onDragOver、onDragStart

事件对象：event
事件发生时，会拿到一个事件对象，event.target就是事件对象的属性


react是单向传值，父组件可以props给子组件。自组件原则上不能给父组件传值。不过可以通过触发事件进行通信，也就是委托。父组件和子组件的嵌套可以实现数据交换。








