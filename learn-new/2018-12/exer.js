setQuoteText = (mdFile) => {
  // 将markdown的文件形式转化成为HTML形式
  processor.process(mdFile).then((result) => {
    let quote = String(result);
    // 将内容字符串化并存储到state中
    this.setState({
      quote: quote
    });
  });
}

// 改进版：评论中 quote 和 comment 分开处理
convertComment = (item) => {
  processor.process(item.comment).then((result) => {
    let comment = String(result);
    this.setState({
      comment: comment
    });
  });
  processor.process(item.quote).then((res) => {
    this.quote = String(res);
    this.setState({
      quote: quote
    });
  });
}
// 关键技术：processor.process
// 如何将md文件转化成需要的格式？这是最重要的问题。

import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import SeafileAPI from '../../utils/seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'reactstrap';

// 注意PureComponent的区别：shouldComponentUpdate
class CreateGroupDialog extends React.Component {

  constructor(props) {
    // super实现继承父组件
    super(props);
    this.state = {
      groupName: ''
    };
  }

  handleGroupChange = (e) => {
    // 处理输入框内容变化，改变状态；react需要受控组件
    // 必要的时候，对输入的内容进行正则过滤；
    let name = e.target.value.trim();
    this.setState({
      groupName: name
    });
  }

  handleSubmitGroup = () => {
    let name = this.state.groupName.trim();
    if (name) {
      let that = this;
      seafileAPI.createGroup(name).then((res) => {
        that.props.listGroup();
      });
    }
    this.setState({
      groupName: ''
    });
    this.props.toggleGroupModal();
  }

  render() {
    return(
      <Modal isOpen={this.props.showAddGroupDialog} toggle={this.props.toggleAddGroupModal}>
        <ModalHeader toggle={this.props.toggle}>{gettext('hi')}</ModalHeader>
        <ModalBody>
          <label htmlFor="groupName">{gettext('name')}</label>
          <Input type="text" id="groupName" value={this.state.groupName} onChange={this.handleGroupChange}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>{gettext('hi')}</Button>
          <Button color="secondary" onClick={this.props.toggleAddGroup Dialog}>{gettext("hello")}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const propTypes = {
  toggleGroupDialog: PropTypes.func.isRequired,
  listGroups: PropTypes.func.isRequired,
  showAddGroupModal: PropTypes.bool,isRequired,
};

CreateGroupDialog.propTypes = propTypes;

export default createGroupDialog;

//// another class


const propTypes = {
  searchPlaceholder: PropTypes.string,
  onShowSidePanel: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  toggleAddGroupModal: PropTypes.func.isRequired,
};

class GroupToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  // 组件是单项组件，没有用户输入
  
  toggleAddGroupModal = () => {
    this.setState({
      showAddGroupDialog: !this.state.showAddGroupDialog
    });
  }

  componentDidMount() {
    this.listGroups();
  }

  render() {
    let { onShowSidePanel, onSearchedClick } = this.props;
    let placeHolder = this.props.searchPlaceHolder || "Search files in this repo";
    return (
      <div className="main-panel-north">
        <div className="cur-view-toolbar"></div>
      </div>
    );
  }
}

GroupToolbar.propTypes = propTypes;

export default GroupToolbar;

// 12.12  

  setQuoteText = (mdQuote) => {
    processor.process(mdQuote).then(
      (result) => {
        let quote = String(result);
        this.setState({
          quote: quote
        });
      }
    );
  }

  convertComment = (item) => {
    processor.process(item.comment).then(
      (result) => {
        let comment = String(result);
        this.setState({
          comment: comment
        });
      }
    );
    processor.process(item.quote).then(
      (result) => {
        let quote = String(result);
        this.setState({
          quote: quote
        });
      }
    );
  }

// 12.13 add group
import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'reactstrap';

class CreateGroupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };
  }

  handleGroupChange = (event) => {
    let name = event.target.value.trim();
    this.setState({
      groupName: name
    });
  }

  handleSubmitGroup = () => {
    let name = this.state.groupName.trim();
    if (name) {
      let that = this;
      seafileAPI.createGroup(name).then((res)=> {
        that.props.listGroups();
      });
    }
    this.setState({
      groupName: '',
    });
    this.props.toggleAddGroupModal();
  }

  render() {
    return(
      <Modal isOpen={this.props.showAddGroupModal} toggle={this.props.toggleAddGroupModal}>
        <ModalHeader toggle={this.toggle}>{gettext('New group')}</ModalHeader>
        <ModalBody>
          <label htmlFor="groupName">{gettext('Name')}</label>
          <Input type="text" id="groupName" value={this.state.groupName} onChange={this.handleGroupChange}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmitGroup}>{gettext('Submit')}</Button>
          <Button color="secondary" onClick={this.props.toggleAddGroupModal}>{gettext('Cancel')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const CreateGroupDialogPropTypes = {
  toggleAddGroupModal: PropTypes.func.isRequired,
  listGroups: PropTypes.func.isRequired,
  showAddGroupModal: PropTypes.bool.isRequired,
};

CreateGroupDialog.propTypes = CreateGroupDialogPropTypes;

export default CreateGroupDialog; 

//// hub 
import React from 'react';
import PropTypes from 'prop-types';
import CommonToolbar from './common-toolbar';
import { Button } from 'reactstrap';
import { gettext } from '../../utils/constants';

const propTypes = {
  searchPlaceholder: PropTypes.string,
  onShowSidePanel: PropTypes.func.isRequired,
  onSearchedClick: PropTypes.func.isRequired,
  toggleAddGroupModal: PropTypes.func.isRequired,
};

class GroupsToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { onShowSidePanel, onSearchedClick } = this.props;
    let placeHolder = this.props.searchPlaceholder || 'Search files in this library';
    return (
      <div className="main-panel-north">
        <div className="cur-view-toolbar">

          <div className="operation">
            <Button color="btn btn-secondary operation-item" onClick={this.props.toggleAddGroupModal}>
              <i className="fas fa-plus-square op-icon"></i>{gettext("New Group")}
            </Button>
          </div>

          <span title="Side Nav Menu" onClick={onShowSidePanel}
            className="sf2-icon-menu side-nav-toggle hidden-md-up d-md-none">
          </span>
          
        </div>
        <CommonToolbar searchPlaceholder={placeHolder} onSearchedClick={onSearchedClick}/>
      </div>
    );
  }
}

GroupsToolbar.propTypes = propTypes;

export default GroupsToolbar;

  toggleAddGroupModal = () => {
    this.setState({
      showAddGroupModal: !this.state.showAddGroupModal
    });
  }

  componentDidMount() {
    this.listGroups();
  }

//// 12.14 hub

import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from 'utils/constants';
import { seafileAPI } from 'seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } form 'reactstrap';

class CreateGroupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupName: ''
    };
  }

  handleGroupChange = (event) => {
    let name = event.target.value.trim();
    this.setState({
      groupName: name
    });
  }

  handleSubmitGroup = () => {
    let name = this.state.froupName.trim();
    if (name) {
      let that = this;
      seafileAPI.createGroup(name).then((res) => {
        that.props.listGroup();
      });
    }
    this.setState({
      groupName: ''
    });
    this.props.toggleAddGroupModal();
  }

  render() {
    return(
      <Modal isOpen={this.props.showAddGroupModal} toggle={this.props.toggleAddGroupDialog}>
        <ModalHeader toggle={this.toggle}>{gettext('New group')}</ModalHeader>
      </Modal>
    );
  }
}

const CreateGroupDialogPropType = {
  toggleAddGroupModal: PropTypes.func.isRequired,
  listGroups: PropTypes.func.isRequired,
  showAddGroupModal: PropTypes.bool.isRequired,
}















