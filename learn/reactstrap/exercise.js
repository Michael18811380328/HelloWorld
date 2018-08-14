import React from './react';

class Dialog extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
		this.OpenMpodal = this.OpenModal.bind(this);
		this.CloseModal = this.CloseModal.bind(this);
	}
	OpenModal() {
		this.setState({
			showModal: true
		});
	}
	CloseModal() {
		this.setState({
			showModal:false
		});
	}

	render（）{
		return (
			<div>
				<button onClick={ this.OpenModal }>OPEN</button>
				<Modal
					isOpen={this.state.showModal}
					contentLabel="MichaelAn"
					onRequestClose={this.CloseModal}
					shouldCloseOnOverlayClick={false}
				>
					<p>hello Michael An</p>
					<button onClick={this.CloseModal}>CLOSE
					</button>
				</Modal>
			</div>
		);
	}
}
const props = {};
export default Modal;