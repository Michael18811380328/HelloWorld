// 2019-02 codes

// week 2
// Feb 12
/**
 * [lockFile]
 * @author Michael An
 * @DateTime 2019-02-19T15:36:14+0800
 * @param    {[string]}                 repoID
 * @param    {[string]}                 filePath
 * @return   {[object]}
 */
lockFile(repoID, filePath) {
  const url = this.server + '/api/v2.1/repos/' + repoID + '/file/?p=' + filePath;
  let form = new FormData();
  form.append('operation', 'lock');
  return this.req.put(url, form);
}

/**
 * [unlockFile]
 * @author Michael An
 * @DateTime 2019-02-19T15:36:14+0800
 * @param    {[string]}                 repoID
 * @param    {[string]}                 filePath
 * @return   {[object]}
 */
unlockFile(repoID, filePath) {
  const url = this.server + '/api/v2.1/repos/' + repoID + '/file/?p=' + filePath;
  let form = new FormData();
  form.append('operation', 'unlock');
  return this.req.put(url, form);
}

// 请求的url中如果带有其他特殊字符或者汉字，为了处理非ASCII码的字符，需要urlencode操作。
// 函数名需要说明函数的意义。最好写清楚函数的作用、函数的参数及数据类型、函数的返回值等(加入插件说明函数内容)。

// Feb 13 view file text
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import moment from 'moment';
import watermark from 'watermark-dom';
import { ButtonGroup, Tooltip } from 'reactstrap';
import { SeafileAPI } from './utils/utils';
import { serviceURL, gettext, mediaUrl } from './utils/constants';
import InternerLinkDialog from './component/dialog/internal-link-dialog';

import 'codemirror/lib/css/css';
import 'codemirror/lib/php/php';
import './css/view-file-text.css';

// from django import some parameters intp html page
const { isPro, repoID, filePath } = window.app.pageOptions;

// codemirror setting options
const options = {
  lineNumbers: true,
  mode: Utils.chooseLanguage(fileExt.slice(3, fileExt.length - 3)),
  extraKeys: {'Ctrl': 'autocomplete'},
  theme: 'default',
  autoMatchParens: true,
  textWapping: true,
  lineWapping: true,
  readOnly: 'nocursor',
};

class ViewFileText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLocked: isLocked,
      star: isStarted,
    };
  }

  /**
   * @author Michael An
   * @DateTime 2019-02-23T10:06:07+0800
   * @param    {event}                 e [description]
   * @return   {page refresh} change encode then page refresh. Then backend send different content into this page.
   */
  changeEncode = (e) => {
    window.location.href = serviceURL + '/lib/' + repoID + '/file/' + fileName + '/?file_enc=' + e.target.value;
  }

  // fileEncode
  fileEncode = () => {
    const list = fileEncodingList.substring(1, fileEncodingList.length - 1).replace(/\'*/g, '').replace(/\s*/g, '').split(',');
    return (
      <div className="file-encode-conut">
        <label htmlFor="file-enc">{gettext('Encoding:')}</label>
        <select id="file-enc" onChange={this.changeEncode} defaultValue={encoding}>
          {
            list && list.map((value, index) => {
              if (value = 'auto') {
                return (<option value={value} key={index}>{gettext('auto detect')}</option>);
              }
              else {
                return (<option value={value} key={index}>{value}</option>)
              }
            })
          }
        </select>
      </div>
    );
  }

  handleMouseDown = (option) => {
    switch(option) {
      case 'back':
        window.location.href = serviceURL + '/library/' + repoID + '/' + repoName + '/';
        break;
      case 'lock':
        this.toggleLockFile();
        break;
      case 'history':
        window.location.href = serviceURL + '/repo/file_reversions' + repoID + '/?p=' + filePath;
        break;
      case 'edit':
        window.location.href = serviceURL + '/repo/' + repoID + '/file/edit/?p=' + filePath + '&file_enc=' + encoding;
        break;
      case 'download':
        window.location.href = serviceURL + '/lib/' + repoID + '/file/' + filePath + '?dl=1';
        break;
    }
  }


  renderToolbar() {
    //
  }
}