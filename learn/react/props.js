// 父组件
/*设置默认值*/

 constructor() {
   super();
   this.state = {
     visible: false,
     itemData: {}
   }
 }

/*设置显示隐藏状态和要传递的参数*/

showModal = (itemData) => {
   this.setState({
     visible: true,
     itemData
   });
}

/*获取子组件传递过来的值*/

changeStatus = (status) =>{
   this.setState({
     visible:status
   })
 }
/*表格的columns*/

const columns= [ 
      {
        title: 'example',
        dataIndex: 'pepper',
        key: 'orange',
        width: 100,
      },
      {
        title: '操作',
        width: 100,
        key: 'action',
        className: 'table-action',
        render: (text, item) => {
          return (
            <div>
              <div style={{ 'color': 'blue' }} onClick={this.showModal.bind(this,item)}>编辑</div>
            </div>
          );
        },
      }]

render (){

        /*这里是弹框组件，通过visible，entray，status将父组件的值传递给子组件*/

        <CollectionCreateForm
          visible={visible}
          entray={itemData}
          status={this.changeStatus}
        />
   }
}

// 子组件
onOk = () => {
      let status = false;
      this.props.status(status);
    }

onCancel = () =>{
      let status = false;
      this.props.status(status);
  }

render() {
      const { visible, entray} = this.props;
      return (
       <Modal
          visible={visible}
          title="呵呵哒"
          onCancel={this.onCancel}
          onOk={this.onOk}
        >
        </Modal>