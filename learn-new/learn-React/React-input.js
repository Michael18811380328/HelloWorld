// import React from 'react';
// impirt ReactDOM form 'react-dom';

class LosinForm extends React.Component {

  constructor(...args) {
    super(...args)
  }

  // 使用默认的 defauleProps defaultValue defaultChecked 设置表单初始值。
  // 当然可以绑定状态 state; 
  // this.setState({ value: this.props.name });

  render() {
    return (
      <form action="http://www.baidu.com" method="get">
        <input type="text" name="userName" defaultValue={this.props.userName}/>
        <input type='submit' value="提交"/>
      </form>
    );
  }
}

$(function() {
  ReactDOM.render(
    <LoginForm userName="Michael"/>
  );
});