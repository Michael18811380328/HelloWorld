import React from 'react';

class RegisterPluginItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPluginTipShow: false
    };
    this.enteredCounter = 0; // Determine whether to enter the child element to avoid dragging bubbling bugs。
  }

  pluginDragEnter = (e) => {
    e.preventDefault();
    this.enteredCounter++;
    if (this.enteredCounter !== 0) {
      this.setState({isPluginTipShow: true});
    }
  }

  pluginDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  pluginDragLeave = (e) => {
    this.enteredCounter--;
    if (this.enteredCounter === 0) {
      this.setState({isPluginTipShow: false});
    }
  }

  pluginDrop = (event) => {
    this.enteredCounter = 0;
    this.setState({isPluginTipShow: false});
    let files = event.dataTransfer.files;
    let isZipFile = files[0].type === 'application/zip';
    if (!isZipFile) return;
    this.props.onUploadPlugin(event, files[0]);
  }

  onUploadPluginToggle = (e) => {
    e.stopPropagation();
    this.refs.files.click();
  }
  
  onInputFile = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }
  
  handleFileChange = (event) => {
    event.persist();
    this.props.onUploadPlugin(event);
  }

  render() {
    let { t } = this.props;
    let { isPluginTipShow } = this.state;
    return (
      <div className={`register-plugin-item ${isPluginTipShow ? 'plugin-item-active' : ''}`}>
        <div 
          className="register-plugin-container"
          onClick={this.onUploadPluginToggle}
          onDragEnter={this.pluginDragEnter} 
          onDragOver={this.pluginDragOver} 
          onDragLeave={this.pluginDragLeave}
          onDrop={this.pluginDrop} 
        >
          <div className="register-plugin-content">
            <i className="register-plugin-icon dtable-font dtable-icon-upload"></i>
            <div className="register-plugin-tip">{t('Click_to_upload_plugin')}</div>
          </div>
          <input className="file-uploader" type="file" ref='files' onClick={this.onInputFile} onChange={this.handleFileChange} />
        </div>
      </div>
    );
  }
}
