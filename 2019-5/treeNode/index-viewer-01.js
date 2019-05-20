import React from 'react';
import PropTypes from 'prop-types';
import { repoID, slug, serviceURL, isPublicWiki } from '../utils/constants';
import { Utils } from '../utils/utils';
import { Value } from 'slate';
import treeHelper from './tree-view/tree-helper';
import TreeNode from './tree-view/tree-node';
import { deserialize } from '@seafile/seafile-editor/dist/utils/slate2markdown';
import'../css/index-viewer.css';

const viewerPropTypes = {
  indexContent: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

class IndexContentViewer extends React.Component {

  constructor(props) {
    super(props);
    this.links = [];
    this.rootNode = {};
    // rootNode is slate node
    // 方案一：直接使用slate数据结构渲染界面内容
    this.treeNode = {};
    // treeNode is tree node
    // 方案二：将slate的数据结构转换成部分树结构。
  }

  componentWillMount() {
    // 在加载界面前从服务器端获取根节点
    this.getRootNode();
  }

  componentDidMount() {
    // 绑定链接点击事件（捕获事件，阻止默认的链接跳转，变成右侧的内容更新）
    this.bindClickEvent();
  }

  componentWillReceiveProps() {
    this.removeClickEvent();
  }

  componentDidUpdate() {
    this.bindClickEvent();
  }

  componentWillUnmount() {
    this.removeClickEvent();
  }

  bindClickEvent = () => {
    // 界面加载或者刷新时，获取界面中的链接，给每一个链接绑定一个点击事件（onLinkClick）
    const contentClass = 'wiki-nav-content';
    this.links = document.querySelectorAll(`.${contentClass} a`);
    this.links.forEach(link => {
      link.addEventListener('click', this.onLinkClick);
    });
  }

  removeClickEvent = () => {
    // 界面卸载前，移出绑定的事件（移除函数 onLinkClick）
    this.links.forEach(link => {
      link.removeEventListener('click', this.onLinkClick);
    });
  }

  onLinkClick = (event) => {
    // 点击链接阻止默认的事件
    event.preventDefault(); 
    event.stopPropagation();
    const link = this.getLink(event.target);
    // 获取链接的内容
    if (link) this.props.onLinkClick(link);
    // 如果链接存在，右侧界面重新渲染
  }

  getLink = (node) => {
    // 根据点击的链接获取链接（如果当前节点没有链接，获取父级元素的链接）
    const tagName = node.tagName;
    if (!tagName || tagName === 'HTML') return;
    if (tagName === 'A') {
      return node.href;
    } else {
      return this.getLink(node.parentNode);
    }
  }

  // 这个函数是陈写的，转换 slateNode 中链接的内容（文件和文件夹不同）
  changeInlineNode = (item) => {
    if (item.object == 'inline') {
      let url;

      // change image url
      if (item.type == 'image' && isPublicWiki) {
        url = item.data.src;
        const re = new RegExp(serviceURL + '/lib/' + repoID +'/file.*raw=1');
        // different repo 
        if (!re.test(url)) {
          return;
        }
        // get image path
        let index = url.indexOf('/file');
        let index2 = url.indexOf('?');
        const imagePath = url.substring(index + 5, index2);
        // replace url
        item.data.src = serviceURL + '/view-image-via-public-wiki/?slug=' + slug + '&path=' + imagePath;
      } 

      else if (item.type == 'link') {
        url = item.data.href;

        /* eslint-disable */
        let expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
        /* eslint-enable */
        let re = new RegExp(expression);

        // Solving relative paths  
        if (!re.test(url)) {
          item.data.href = serviceURL + '/published/' + slug + '/' + url;
        }
        // change file url 
        else if (Utils.isInternalMarkdownLink(url, repoID)) {
          let path = Utils.getPathFromInternalMarkdownLink(url, repoID);
          // replace url
          item.data.href = serviceURL + '/published/' + slug + path;
        } 
        // change dir url 
        else if (Utils.isInternalDirLink(url, repoID)) {
          let path = Utils.getPathFromInternalDirLink(url, repoID);
          // replace url
          item.data.href = serviceURL + '/published/' + slug + path;
        }
      }
    }

    return item;
  }

  // 渲染前转换SlateNodes中的链接内容
  modifyValueBeforeRender = (value) => {
    let nodes = value.document.nodes;
    let newNodes = Utils.changeMarkdownNodes(nodes, this.changeInlineNode);
    value.document.nodes = newNodes;
    return value;
  }

  // 从slate中获取根节点（无序列表）
  getRootNode = () => {
    let value = deserialize(this.props.indexContent);
    value = value.toJSON();
    value = this.modifyValueBeforeRender(value);
    value = Value.fromJSON(value);
    const nodes = value.document.nodes;
    // 这里的两次转换不需要

    nodes.map((node) => {
      if (node.type ==='unordered_list' || node.type === 'ordered_list') {
        this.rootNode = node;
        this.treeNode = this.transSlateToTree(node.nodes);
      }
    });
  }

  // 第一版：直接将slate中的节点转换成treeNode，不改变数据结构
  transSlateToTree = (slateNodes) => {
    let treeNodes = slateNodes.map((node) => {
      if (node.type === 'paragraph') {
        let href = '';
        node.nodes.map((linkNode) => {
          href = linkNode.data ? encodeURI(linkNode.data.get('href')) : 'javascript:void(0);';
        });
        let treeNode = { text: node.text, href: href };
        return treeNode;
      } else {
        return this.addResponseListToNode(node.nodes);
      }
    });
    return treeNodes;
  }

  render() {
    return <FolderItem rootNode={this.rootNode} bindClickEvent={this.bindClickEvent} hasChild={false}/>;
  }
}

IndexContentViewer.propTypes = viewerPropTypes;

const FolderItemPropTypes = {
  rootNode: PropTypes.object.isRequired,
  bindClickEvent: PropTypes.func.isRequired,
  hasChild: PropTypes.bool,
};

class FolderItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showChild: true
    };
  }

  toggleShowChild = () => {
    this.setState({showChild: !this.state.showChild}, () => {
      if (this.state.showChild) {
        this.props.bindClickEvent();
      }
    });
  }

  componentDidMount() {
    if (this.props.hasChild) {
      this.setState({ showChild: false });
    }
  }

  render() {
    const { rootNode } = this.props;
    return (
      <div className="folder-item px-2">
        {
          rootNode.nodes.map((node) => {
            if (node.type === 'paragraph') {
              let href = '';
              node.nodes.map((linkNode) => {
                // 第一版直接在渲染的时候处理不是链接的情况（这样保证界面不会报错，但是使用的是slate的数据结构）
                // deal with node isn't a link
                href = linkNode.data ? encodeURI(linkNode.data.get('href')) : 'javascript:void(0);';
              });
              return (
                <div key={node.key} className="px-4 wiki-nav-content">
                  <a href={href}>{node.text}</a>
                </div>
              );
            } else {
              const hasChild = (rootNode.type === 'unordered_list' && rootNode.nodes.size > 1);
              return (
                <React.Fragment key={node.key}>
                  {this.props.hasChild &&
                    <span className="switch-btn" onClick={this.toggleShowChild}>
                      {this.state.showChild ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>}
                    </span>
                  }
                  {this.state.showChild &&
                    <FolderItem
                      rootNode={node}
                      key={node.key}
                      hasChild={hasChild}
                      bindClickEvent={this.props.bindClickEvent}
                    />
                  }
                </React.Fragment>
              );
            }
          })
        }
      </div>
    );
  }
}

FolderItem.propTypes = FolderItemPropTypes;

export default IndexContentViewer;
