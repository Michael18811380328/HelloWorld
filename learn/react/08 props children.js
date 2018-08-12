var WebName = React.createClass({
	render:function(){
		return <h1>{ this.props.webname }</h1>;
	}
});
///
var WebLink = React.createClass({
	render:function(){
		return <a href={ this.props.weblink }>{ this.props.weblink }</a>
	}
});
///
var WebShow = React.createClass({
	render:function(){
		return (
			<div>
				<WebName webname={ this.props.wName }/>
				<WebLink weblink={ this.props.wLink }/>
			</div>	
		);
	}
});
///
ReactDOM.render(
	<WebShow wName="hi" wLink="http://www.baidu.com"/>,
	document.getElementById("container")
);

var Link = React.createClass({
	render:function(){
		return <a { ...this.props } >{ this.props.name }</a>
	}
});
///
ReactDOM.render(
	<Link href="http://www.sina.cn" name="新浪"/>,
	document.getElementById('container2')
);

//09 children 遍历子节点

	var ListComponent = React.createClass({
		render:function(){
			return (
				<ul>{
					//列表的数量和内容不确定，创建模板才能确定，利用this.props.children从父组件获取需要显示的列表项内容。获取到列表各项内容后，需要遍历children，逐项进行设置。使用React.Children.map方法，返回值是数组对象，这里指的是数组中的元素<li>,child是遍历得到的父组件的子节点
						
					React.Children.map(this.props.children,function(child){
						return <li>{ child }</li>
					})
				}</ul>
			);
		}
	});

	ReactDOM.render(
		(
			<ListComponent>
				<h1>新浪微博</h1>
				<a href="http://www.baidu.com">http://www.baidu.com</a>
			</ListComponent>
		),document.getElementById("container3")
	);
