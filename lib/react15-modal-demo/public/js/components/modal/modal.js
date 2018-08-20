import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';
import util from 'lib/util';
import './modal.scss';

const modalOpenClass = 'modal-open';

const toggleBodyClass = isOpen => {
  const body = document.body;
  if(isOpen) {
    body.classList.add(modalOpenClass);
  } else {
    body.classList.remove(modalOpenClass);
  }
}

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false
    };
    toggleBodyClass(props.isOpen);
    util.bindMethods(['onCancelClick', 'onOkClick', 'close', 'onRest'], this);
  }
  componentWillReceiveProps(nextProps) {
    if('isOpen' in nextProps) {
      this.setState({
        isOpen: nextProps.isOpen
      });
      toggleBodyClass(nextProps.isOpen);
    }
  }
  close() {
    this.setState({
      isOpen: false
    });
    toggleBodyClass(false);
  }
  onCancelClick() {
    this.props.onCancel();
    this.close();
  }
  onOkClick() {
    this.props.onOk();
    this.close();
  }
  onRest() {
    const { isOpen } = this.state;
    if(!isOpen) {
      this.props.onClose();
    }
    this.props.onRest();
  }
  render() {
    const {
      title,
      children,
      className,
      okText,
      cancelText,
      onOk,
      onCancel,
      type,
      maskClosable,
      onClose
    } = this.props;
    const { isOpen } = this.state;
    return (
      <Motion
        defaultStyle={{
          opacity: 0.8,
          scale: 0.8
        }}
        style={{
          opacity: spring(isOpen ? 1 : 0, presets.stiff),
          scale: spring(isOpen ? 1 : 0.8, presets.stiff)
        }}
        onRest={this.onRest}
      >
        {
          ({
            opacity,
            scale
          }) => (
            <div
              className={`modal-container ${className}`}
              style={{opacity}}
              onClick={maskClosable ? this.close : () => {}}
            >
              <div
                className="modal-body"
                style={{
                  opacity,
                  transform: `translate3d(-50%, -50%, 0) scale(${scale})`
                }}
              >
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
  type: PropTypes.oneOf(['alert', 'confirm', 'error']),
  onRest: PropTypes.func
};

Modal.defaultProps = {
  className: '',
  maskClosable: true,
  onCancel: () => {},
  onOk: () => {},
  okText: 'OK',
  cancelText: 'Cancel',
  type: 'alert',
  onRest: () => {}
};
