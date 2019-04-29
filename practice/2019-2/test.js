// Seahub Jan 2019
// 使用对话框需要外部点击后对话框消失.
// <Modal toggle={this.handleToggleDialog}></Modal> 

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MarkdownViewer from '@seafile/seafile-editor/dist/viewer/markdown-viewer';
import Loading from './component/loading';
import { seafileAPI } from './utils/seafile-api';
import { gettext } from './utils/constants';

const propTypes = {
  repoID: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
  toggleCancle: PropTypes.func.isRequired,
  href: PropTypes.string,
};

class ReadmeDialog extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      readmeContent: mull,
      isLoading: true,
    };
  }

  componentDidMount() {
    seafileAPI.getFileDownloadLink(this.props.repoID, this.props.filePath).then(res => {
      seafileAPI.getFileContent(res.data).then(res => {
        this.setState({
          readmeContent: res.data,
          isLoading: false,
        });
      });
    });
  }

  render() {
    return (
      <Modal isOpen={true} className="readme-dialog" size='lg'>
        <ModalHeader>{gettext('Readme.md')}
          <a className="readme-dialog-edit" href={this.props.href} target='_blank'>
            <i className="fa fa-pencil"></i>
          </a>
        </ModalHeader>
        <ModalBody>
          {
            this.state.isLoading ?
            <Loading/>
            :
            <MarkdownViewer markdownContent={this.state.readmeContent} showTOC={false}>
          }
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={this.props.toggleCancle}>{gettext('Close')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ReadmeDialog.propTypes = propTypes;

export default ReadmeDialog;