import React from 'react';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';

class ToDoapp extends React.Component{

  constructor(props){
    super(props);
    this.ids = 1;
    this.state = {
        todos:[]
    };
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.okItem=this.okItem.bind(this);
  }

  okItem(id){
    this.state.todos.map( item => {
      if(item.id == id){
        item.done=1;
      }
        return item;
      });
      this.setState({
        todos:this.state.todos
      });
  }

  deleteItem(id){
    let newtodos = this.state.todos.filter((item) => {
      return !(item.id == id)
    });
      this.setState({
        todos:newtodos
      });
  }

  addItem(value){
     this.state.todos.unshift(
      {
        id:this.ids++,
        text:value,
        time:(new Date()).toLocaleString(),
        done:0
      }
    )

    this.setState({
      todos: this.state.todos
    });
  }

  render(){
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-headingbg-danger">
            <h1 className="text-center ">ToDo
              <small>你要做什么？</small>
            </h1>
          </div>
          <div className="panel-body">
            <ToDoForm addItem={this.addItem}/>
            <ToDoList okItem={this.okItem} deleteItem={this.deleteItem} data={this.state.todos}/>
          </div>
        </div> 
      </div>
    );
  }
}

export default ToDoapp;