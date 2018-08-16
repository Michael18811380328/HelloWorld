// child

onOk = () => {
	console.log('ok');
	let status = true;
	this.props.status(status);
}

onCancle = () => {
	console.log('cancle');
	let status = false;
	this.props.status(status);
}

render(){
	return (
		<Modal visible={this.props.visible} title={this.props.title} onOK={ this.okOk } onCancle={ this.onCancle } >
			<ModalHead></ModalHead>
			<ModalBody></ModalBody>
			<ModalFoot></ModalFoot>
		</Modal>
	);
}

// father 
constructor(){
	super();
	this.state = {
		visible: false
	}
}

changeStatus = () => {
	this.setState({
		visible: status
	});
}

render(){
	return(
		<Text visible={ visible } status={ this.changeStatus } ></Test>
	);
}
