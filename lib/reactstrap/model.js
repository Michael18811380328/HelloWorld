class ExampleApp extends React.Component {
  constructor () {
    super();
    // visible：none
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ 
      showModal: true 
      // this.state.showModal = true
    });
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false 
    });
  }
  
  render () {
    return (
      <div>
        // 控制器和modal是平行的，控制器单向操作；如果不涉及组件传值，不使用props。
        <button onClick={ this.handleOpenModal }>Trigger Modal</button>
        /// 核心组件属性：isOpen，绑定属性
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          ///内部控制器绑定关闭
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))