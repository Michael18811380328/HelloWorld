// 2018-12 editor
// name:related-files-list.js

import React from 'react';
import { Card, Cardtitle, CardText } from 'reactstrap';
import { translate } from 'react-i18next';
// https://react.i18next.com/getting-started 翻译插件

require('../css/list.css');

class RelatedFilesList extends React.Component {

  constructor(props) {
    super(props);
  }

  // 函数作用：对路径进行encode。首先对路径按照/进行处理，放置在一个数组中。对数组的每一项进行encode,之后再拼接起来。
  // len = path_arr.length 放出来很好，避免每次计算数组的长度
  // 使用 path_arr 和 path_arr_ 表示新旧数组也很好
  encodePath = (path) => {
    if (!path) {
      return '';
    }
    let path_arr = path.split('/');
    let path_arr_ = [];
    for (let i = 0, len = path_arr.length; i < len; i++) {
      path_arr_.push(encodeURIComponent(path_arr[i]));
    }
    return path_arr_.join('/');
  }

  render() {
    const siteRoot = this.props.siteRoot;
    return (
      <div className="sf-related-files">
        <div className="sf-related-files-header">
          <h4>{this.props.t('related_files')}</h4>
        </div>
        {
          this.props.relatedFiles.map((relatedFile, index) => {
            let href = siteRoot + 'lib/' + relatedFile.repo_id + '/file' + this.encodePath(relatedFile.path);
            return (
              <div className="sf-related-file" key={idnex}>
                <a href={href} target="_blank">
                  <Card body size="sm">
                    <CardTitle>{/*test*/}</CardTitle>
                    <CardText>{/*test*/}</CardText>
                  </Card>
                </a>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default translate('translation')(RelatedFileList);

// seahub 2018-12
// 1.manage-members-dialog.js
import React form 'react';
import AsyncSelects from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { gettext } from './uitls/constants';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { seafileAPI } from './utils/seafile-api.js';

require('./manage-members-dialog.css');

const propTypes = {
  groupID: PropTypes.string.isRequired,
  toggleManageMembersDialog: PropTypes.func.isRequired,
  onGroupChanged: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired
};

// 传入的参数：当前的token、ID
// 这个组件改变后的回调函数（如果是一个双向组件，用户改变属性））
// 关闭这个组件的函数

class ManageMemberDialog extends React.Component {

  comnstructor(props) {
    super(props);
    this.state = {
      groupMembers: [],
      selectedOption: null,
      errMessage: '',
    };
    this.options = [];
  }

  // 如果是经常变化的使用state，如果是不变的使用props传入。中间的用属性 this.options。 state 尽量使用很少，能推出来的就不要多用state。state尽量存储简单数据类型。
  handleSelectChange = (options) => {
    this.setState({
      selectedOption: options,
      errMessage: '',
    });
    this.options = [];
  }

  loadOptions = (value, callback) => {
    if (value.trim().length > 0) {
      seafileAPI.searchUsers(value.trim()).then((res) => {
        this.options = [];
        for (let i = 0; i < res.data.users.length; i++) {
          let obj = {};
          obj.value = res.data.users[i].name;
          obj.email = res.data.users[i].email;
          obj.label = 
            <React.Fragment>
              <img src={res.data.users[i].avatar_url} className="avatar" alt=''/>
              <span className="transfer-group-name">{res.data.users[i].name}</span>
            </React.Fragment>
          this.options.push(obj);
        }
        callback(this.options);
      });
    }
  }
  // 处理用户查询和 async-selection 下拉选项的情况。
}