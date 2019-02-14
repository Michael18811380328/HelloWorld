
// seahub

// 12.18 fix-style
// 12.19 fix-style
// 12.20
if (nativeSelection.isCollapsed === false) {
      const nativeRange = nativeSelection.getRangeAt(0);
      const focusNode = nativeSelection.focusNode;
      if ((focusNode.tagName === "I") ||
          (focusNode.nodeType !== 3 && focusNode.getAttribute("class") === "language-type")) {
        // fix select last paragraph
        let fragment = nativeRange.cloneContents();
        let startNode = fragment.firstChild.firstChild;
        let newNativeRange = document.createRange();
        newNativeRange.setStartBefore(startNode);
        newNativeRange.setEndAfter(startNode);
        this.range =  findRange(newNativeRange, this.refs.diffViewer.value);
      }
      else {
        this.range = findRange(nativeRange, this.refs.diffViewer.value);
      }

onGroupChanged = (groupID) => {
    setTimeout(function(){
      let url = new URL(window.location.origin);
      if (groupID) {
        url = url + 'group/' + groupID + '/';
      }
      else {
        url = url + 'groups/';
      }
      window.location = url.toString();
    }, 1);
  }


import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class DismissGroupDialog extends React.Component {

  constructor(props) {
    super(props);
  }

  dismissGroup = () => {
    let that = this;
    seafileAPI.deleteGroup(this.props.groupID).then((res)=> {
      that.props.onGroupChanged();
    });
  }

  render() {
    return(
      <Modal isOpen={this.props.showDismissGroupDialog} toggle={this.props.toggleDismissGroupDialog}>
        <ModalHeader>{gettext('Dismiss Group')}</ModalHeader>
        <ModalBody>
          <span>{gettext('Really want to dismiss this group?')}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleDismissGroupDialog}>{gettext('Cancel')}</Button>
          <Button color="primary" onClick={this.dismissGroup}>{gettext('Dismiss')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const DismissGroupDialogPropTypes = {
  showDismissGroupDialog: PropTypes.bool.isRequired,
  toggleDismissGroupDialog: PropTypes.func.isRequired,
  loadGroup: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  onGroupChanged: PropTypes.func.isRequired,
};

DismissGroupDialog.propTypes = DismissGroupDialogPropTypes;

export default DismissGroupDialog; 
  
72  frontend/src/components/dialog/rename-group-dialog.js
@@ -0,0 +1,72 @@
import React from 'react';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from 'reactstrap';

class RenameGroupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newGroupName: '',
    };
  }

  handleGroupNameChange = (event) => {
    let name = event.target.value;
    this.setState({
      newGroupName: name
    });
  }

  renameGroup = () => {
    let name = this.state.newGroupName.trim();
    if (name) {
      let that = this;
      seafileAPI.renameGroup(this.props.groupID, name).then((res)=> {
        that.props.loadGroup(this.props.groupID);
        that.props.onGroupChanged(res.data.id);
      });
    }
    this.setState({
      newGroupName: '',
    });
    this.props.toggleRenameGroupDialog();
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.renameGroup();
    }
  }

  render() {
    return(
      <Modal isOpen={this.props.showRenameGroupDialog} toggle={this.props.toggleRenameGroupDialog}>
        <ModalHeader>{gettext('Rename Group')}</ModalHeader>
        <ModalBody>
          <label htmlFor="newGroupName">{gettext('Rename group to')}</label>
          <Input type="text" id="newGroupName" value={this.state.newGroupName}
            onChange={this.handleGroupNameChange} onKeyDown={this.handleKeyDown}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleRenameGroupDialog}>{gettext('Cancel')}</Button>
          <Button color="primary" onClick={this.renameGroup}>{gettext('Submit')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const RenameGroupDialogPropTypes = {
  showRenameGroupDialog: PropTypes.bool.isRequired,
  toggleRenameGroupDialog: PropTypes.func.isRequired,
  loadGroup: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  onGroupChanged: PropTypes.func.isRequired,
};

RenameGroupDialog.propTypes = RenameGroupDialogPropTypes;

export default RenameGroupDialog; 


// 12.24
import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { seafileAPI } from '../../utils/seafile-api.js';
import '../../css/manage-members-dialog.css';

const propTypes = {
  groupID: PropTypes.string.isRequired,
  toggleManageMembersDialog: PropTypes.func.isRequired,
  onGroupChanged: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

class ManageMembersDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupMembers: [],
      selectedOption: null,
      errMessage: '',
    };
    this.options = [];
  }

  handleSelectChange = (option) => {
    this.setState({
      selectedOption: option,
      errMessage: '',
    });
    this.options = [];
  }

  loadOptions = (value, callback) => {
    if (value.trim().length > 0) {
      seafileAPI.searchUsers(value.trim()).then((res) => {
        this.options = [];
        for (let i = 0 ; i < res.data.users.length; i++) {
          let obj = {};
          obj.value = res.data.users[i].name;
          obj.email = res.data.users[i].email;
          obj.label =
            <React.Fragment>
              <img src={res.data.users[i].avatar_url} className="avatar" alt=""/>
              <span className="transfer-group-name">{res.data.users[i].name}</span>
            </React.Fragment>;
          this.options.push(obj);
        }
        callback(this.options);
      });
    }
  }

  addGroupMember = () => {
    if (this.state.selectedOption && this.state.selectedOption.email) {
      this.refs.memberSelect.select.onChange([], { action: 'clear' });
      seafileAPI.addGroupMember(this.props.groupID, this.state.selectedOption.email).then((res) => {
        this.listGroupMembers();
        this.options = [];
        this.setState({
          selectedOption: null,
        });
      }).catch((error) => {
        if (error.response) {
          this.setState({
            errMessage: error.response.data.error_msg
          });
        }
      });
    }
  }

  listGroupMembers = () => {
    seafileAPI.listGroupMembers(this.props.groupID).then((res) => {
      this.setState({
        groupMembers: res.data
      });
    });
  }

  deleteMember = (name) => {
    seafileAPI.deleteGroupMember(this.props.groupID, name).then((res) => {
      this.listGroupMembers();
    });
  }

  toggle = () => {
    this.props.toggleManageMembersDialog();
  }

  componentDidMount() {
    this.listGroupMembers();
  }

  render() {
    return (
      <Modal isOpen={true} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{gettext('Manage group members')}</ModalHeader>
        <ModalBody>
          <p>{gettext('Add group member')}</p>
          <AsyncSelect
            className='group-transfer-select'
            isClearable classNamePrefix
            loadOptions={this.loadOptions}
            onChange={this.handleSelectChange}
            placeholder={gettext('Search users...')}
            ref="memberSelect"
          />
          <span className="error">{this.state.errMessage}</span>
          <div className="manage-members">
            <Table hover size="sm" className="manage-members-table">
              <thead>
                <tr>
                  <th width="15%"></th>
                  <th width="45%">{gettext('Name')}</th>
                  <th width="30%">{gettext('Role')}</th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.groupMembers.length > 0 &&
                  this.state.groupMembers.map((item, index = 0) => {
                    return (
                      <tr key={index} >
                        <th scope="row"><img className="avatar" src={item.avatar_url} alt=""/></th>
                        <td>{item.name}</td>
                        <td>
                          {
                            ((this.props.isOwner === false) || (this.props.isOwner === true && item.role === 'Owner')) && 
                            <span className="group-admin">{item.role}</span>
                          }
                          {
                            (this.props.isOwner === true && item.role !== 'Owner') &&
                            <ChangeMemberAdmin
                              item={item}
                              listGroupMembers={this.listGroupMembers}
                              groupID={this.props.groupID}
                              isOwner={this.props.isOwner}
                            />
                          }
                        </td>
                        <td>
                          {
                            ((item.role !== 'Owner' && this.props.isOwner === true) ||
                            (item.role === 'Member' && this.props.isOwner === false)) &&
                            <i
                              className="fa fa-times delete-group-member-icon"
                              name={item.email}
                              onClick={this.deleteMember.bind(this, item.email)}>
                            </i>
                          }
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>{gettext('Close')}</Button>
          <Button color="primary" onClick={this.addGroupMember}>{gettext('Submit')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ManageMembersDialog.propTypes = propTypes;

const ChangeMemberAdminPropTypes = {
  item: PropTypes.object,
  listGroupMembers: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
};
This conversation was marked as resolved by Michael18811380328

class ChangeMemberAdmin extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      changeAdmin: false
    };
  }

  toggleGroupAdmin = () => {
    this.setState({
      changeAdmin: !this.state.changeAdmin
    });
  }

  setGroupAdmin = (e) => {
    const isAdmin = e.target.value.indexOf('admin') > -1 ? 'true' : 'false';
    const userName = e.target.value.split('-', 2)[1];
    seafileAPI.setGroupAdmin(this.props.groupID, userName, isAdmin).then((res) => {
      this.props.listGroupMembers();
      this.setState({
        changeAdmin: false
      });
    });
  }

  render() {
    const item = this.props.item;
    const value = item.email;
    let options = item.role === 'Member' ?
      (<React.Fragment>
        <option value={`member-${value}`}>{gettext('Member')}</option>
        <option value={`admin-${value}`}>{gettext('Admin')}</option>
      </React.Fragment>):
      (<React.Fragment>
        <option value={`admin-${value}`}>{gettext('Admin')}</option>
        <option value={`member-${value}`}>{gettext('Member')}</option>
      </React.Fragment>);
    let admin = this.state.changeAdmin ? 
      (<select className="custom-select-sm" onChange={this.setGroupAdmin}>{options}</select>) :
      (<span className="group-admin">{item.role}
        <i className="fa fa-pencil toggle-group-admin-icon" onClick={this.toggleGroupAdmin}></i>
      </span>);
      return(
      admin
    );
  }
}

ChangeMemberAdmin.propTypes = ChangeMemberAdminPropTypes;


export default ManageMembersDialog;

import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { gettext } from '../../utils/constants';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { seafileAPI } from '../../utils/seafile-api.js';

import '../../css/transfer-group-dialog.css';

const propTypes = {
  groupID: PropTypes.string.isRequired,
  toggleTransferGroupDialog: PropTypes.func.isRequired,
  onGroupChanged: PropTypes.func.isRequired
};

class TransferGroupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      errMessage: '',
    };
    this.options = [];
  }

  handleSelectChange = (option) => {
    this.setState({
      selectedOption: option,
      errMessage: '',
    });
    this.options = [];
  }

  loadOptions = (value, callback) => {
    if (value.trim().length > 0) {
      seafileAPI.searchUsers(value.trim()).then((res) => {
        this.options = [];
        for (let i = 0 ; i < res.data.users.length; i++) {
          let obj = {};
          obj.value = res.data.users[i].name;
          obj.email = res.data.users[i].email;
          obj.label =
            <React.Fragment>
              <img src={res.data.users[i].avatar_url} className="avatar" alt=""/>
              <span className="transfer-group-name">{res.data.users[i].name}</span>
            </React.Fragment>;
          this.options.push(obj);
        }
        callback(this.options);
      });
    }
  }

  transferGroup = () => {
    const email = this.state.selectedOption && this.state.selectedOption.email;
    if (email) {
      seafileAPI.transferGroup(this.props.groupID, email).then((res) => {
        this.props.toggleTransferGroupDialog();
      }).catch((error) => {
        if (error.response) {
          this.setState({
            errMessage: error.response.data.error_msg
          });
        }
      });
    }
  }

  toggle = () => {
    this.props.toggleTransferGroupDialog();
  }

  render() {
    return (
      <Modal isOpen={true} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{gettext('Transfer Group')}</ModalHeader>
        <ModalBody>
          <p>{gettext('Transfer group to')}</p>
          <AsyncSelect
            className='group-transfer-select'
            isClearable classNamePrefix
            loadOptions={this.loadOptions}
            onChange={this.handleSelectChange}
            />
          <div className="error">{this.state.errMessage}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>{gettext('Close')}</Button>
          <Button color="primary" onClick={this.transferGroup}>{gettext('Submit')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

TransferGroupDialog.propTypes = propTypes;

export default TransferGroupDialog;


// seafile-js
// 12.19
  renameGroup(groupID, name) {
    const url = this.server + '/api/v2.1/groups/' + groupID + '/';
    const params = {
      name: name
    }
    return this.req.put(url, params);
  }

  deleteGroup(groupID) {
    const url = this.server + '/api/v2.1/groups/' + groupID + '/';
    return this.req.delete(url);
  }

// 12.22
  transferGroup(groupID, ownerName) {
    const url = this.server + '/api/v2.1/groups/' + groupID + '/';
    const params = {
      owner: ownerName
    }
    return this.req.put(url, params);
  }

  quitGroup(groupID, userName) {
    const name = encodeURIComponent(userName);
    const url = this.server + '/api/v2.1/groups/' + groupID + '/members/' + name + '/';
    return this.req.delete(url);
  }

  listGroupMembers(groupID, isAdmin=false, avatarSize=64) {
    let url = this.server + '/api/v2.1/groups/' + groupID + '/members/?avatar_size=' + avatarSize + '&is_admin=' + isAdmin;
    return this.req.get(url);
  }

  addGroupMember(groupID, userName) {
    const url = this.server + '/api/v2.1/groups/' + groupID + '/members/';
    const params = {
      email: userName
    }
    return this.req.post(url, params);
  }

  addGroupMembers(groupID, userNames) {
    const url = this.server + '/api/v2.1/groups/' + groupID + '/members/bulk/';
    let form = new FormData();
    for (let i = 0; i < userNames.length; i++) {
      form.append("email", userNames[i]);
    }
    return this._sendPostRequest(url, form);
  }

  deleteGroupMember(groupID, userName) {
    const name = encodeURIComponent(userName);
    const url = this.server + '/api/v2.1/groups/' + groupID + '/members/' + name + '/';
    return this.req.delete(url);
  }

  setGroupAdmin(groupID, userName, isAdmin) {
    let name = encodeURIComponent(userName);
    let url = this.server + '/api/v2.1/groups/' + groupID + '/members/' + name + '/';
    const params = {
      is_admin: isAdmin
    }
    return this.req.put(url, params);
  }
