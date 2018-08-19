import React from 'react';

class ToDoForm extends React.Component{

  submit(event){
    event.preventDefault();
  }

  add(event){
    
    if(event.type=="keyup" && event.keyCode!=13){
      return false;
    }

    let txt=this.refs.txt.value;
    if(txt=="") return false;
    this.props.addItem(txt);
    this.refs.txt.value="";
  }

  render(){
    return(
       <form className="form-horizontal" onSubmit={this.tijiao.bind(this)}>
        <div className="form-group">
          <div className="col-sm-10">
            <input ref="txt"  type="text" className="form-control" onKeyUp={this.add.bind(this)} id="exampleInputName2" placeholder="请输入内容"/>
          </div>
          <div className="col-sm-2">
        <button type="button" className="btn btn-primary" onClick={this.add.bind(this)}>添加</button>
          </div>
        </div>
      </form>
    );
  }
}
export default ToDoForm;