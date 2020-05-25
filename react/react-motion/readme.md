## react-motion

这是一个react框架下面的动画库，可以做简单的动画

官网链接

https://github.com/chenglou/react-motion

https://www.npmjs.com/package/react-motion

实例

https://juejin.im/post/5b48061551882519790c77f3

实例

~~~jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';
import './modal.scss';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    };
    util.bindMethods(['onCancelClick', 'onOkClick', 'close', 'onRest'], this);
  }

  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    className: PropTypes.string,
    maskClosable: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onRest: PropTypes.func
    // 动画接口
  };

  Modal.defaultProps = {
    className: '',
    maskClosable: true,
    onCancel: () => {},
    onOk: () => {},
    okText: 'OK',
    cancelText: 'Cancel',
    onRest: () => {}
    // 接口默认值为空函数
  };

  // 回调函数
  onRest = () => {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.props.onClose();
    }
    this.props.onRest();
  }

  onClose = () => {
    setState({
      isOpen: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('isOpen' in nextProps) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }

  render() {
    const { title, children, className, okText, cancelText, onOk, onCancel, maskClosable } = this.props;
    return (
      <div className={`mocal-container ${className}`}>
        <div className={`modal-title ${type}`}>{title}</div>
        <div className="modal-body">
          <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button className="ok-btn" onClick={onOk}>{okText}</button>
          <button className="cancel-btn" onClick={onCancel}>{cancelText}</button>
        </div>
        </div>
        <Motion
          defaultStyle={{opacity: 0.8, scale: 0.8}}
          style={{opacity: spring(isOpen ? 1 : 0, presets.stiff), scale: spring(isOpen ? 1 : 0.8, presets.stiff)}}
          onRest={this.onRest}>
          {
           ({opacity, scale}) => (
            <div className={`modal-container ${className}`} style={{opacity}} onClick={maskClosable ? this.close : () => {} } >
            <div className="modal-body" style={{opacity, transform: `translate3d(-50%, -50%, 0) scale(${scale})`}}>
              <div className={`modal-title ${type}`}>{title}</div>
              <div className="modal-content">{children}</div>
              <div className="modal-footer">
              <button className="ok-btn" onClick={this.onOkClick}>{okText}</button>
              <button className="cancel-btn" onClick={this.onCancelClick}>{cancelText}</button>
              </div>
            </div>
            </div>
            )
          }
        </Motion>
    );
  }
}

export default Modal;
~~~

