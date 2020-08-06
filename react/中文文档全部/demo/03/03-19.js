// 严格模式
// 严格模式不会在生产环境中使用，只会在开发环境中提示
// 类似 Fragment ，不会渲染实体的DIV

// 可以对程序任何部分组件使用严格模式
import React from 'react';

function Example() {
  return (
    <>
      <Header/>
        <React.StrictMode>
          <>
            <ComponentOne />
            <ComponentTwo />
          </>
        </React.StrictMode>
      <Footer/>
    </>
  );
}

/**
 * 主要作用
 * 识别不安全的生命周期函数：componentWillMount
 * REF 字符串的警告
 * findDOMNode 方法的警告
 * 过时的 contextAPI
 * 检测意外的副作用
 */

 class My extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return <input type="text" ref={this.inputRef}/>
  }
 }

