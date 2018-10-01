// 子组件
// 不管点击确定还是取消，给父组件属性false，弹窗不显示
onOk = () => {
	let status = true;
	this.props.status(status);
	// 设置父组件的显示状态是false
}
onCancel = () => {
	let status = false;
	this.props.status(status);
	// 设置父组件的显示状态是false
}
render(){
	const {visible} = this.props;
	// 从父组件中取出这两个参数
	return (
		<Modal onOk={this.onOK} onCalcle={this.onCancel} title="Seafile" visible={visible}>
		</Modal>
	);
	/// 框体显示取决于父组件的visible属性
}
export default Dialog

// 父组件
// 设置默认样式：不显示
constructor(){
	super();
	this.state = {
		visible: false
	}
}
// 显示modal函数
showModal = () => {
	this.setState({
		visible: true
	});
}
// 改变显示状态
changeStatus = (status) => {
	this.setState({
		visible:status
	});
}
// 传值：可见和状态
render (){
	<Dialog visible={visible} status={this.changeStatus}/>
}