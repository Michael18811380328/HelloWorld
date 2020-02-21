// 2020-020-01 cloneChild
function checkEditor(column, editorProps) {
  const CustomEditor = column.editor;
  if (React.isValidElement(CustomEditor)) {
    return React.cloneElement(CustomEditor, editorProps);
  }
  if (isFunction(CustomEditor)) {
    return <CustomEditor {...editorProps}/>
  }
}

// React 中，JSX 标签会转换成原生的JavaScript代码
// 所以，可以使用JSX标签创建组件，也可以使用React提供的API创建组件
// 下面是常见的元素操作和组件操作的API

// 1、创建元素 createElement
// API 具有三个参数
// 第一个是元素的类型（必选）
// 第二个是元素的属性
// 第三个是元素的子节点
var React = require('react');

let dom = React.createElement(type, [props], [children]);
let dom2 = React.createElement('div', {className: 'wrapper'}, dom, React.createElement('hr'));
// 快捷创建元素
// React.createElement('div') === React.DOM.div()

// 2. cloneElement
// 参数和createElement一致
let div = React.createElement('div');
let dom3 = React.cloneElement(div, {className: 'wrapper'}, dom);

// 3、判断原始是否是有效的ReactElement isValidElement
function checkValid() {
  let div = React.createElement('div');
  React.isValidElement(div); // true;
  let div2 = document.getElementById('wrapper');
  React.isValidElement(div2); // false
}

// 组件操作 API（Component class）
// 创建组件：createClass() 创建并返回一个组件类，内部需要实现render方法
let App = React.createClass({
  displayName: 'App',
  render: function() {
    let hr = React.createElement('hr');
    let h2 = React.createElement('h2', null, this.props.children);
    return (React.createElement('div', null, h2, hr));
  }
});
// 现在就返回一个APP的类（组件）
// 大型组件需要单独写，class App extends React.Component
// 如果是小新组件，没有复杂方法，可以使用这个API

// 这几个主要的区别：https://www.zhihu.com/question/27602269/answer/40168594
// 基本上，使用JSX可以完成上面API的工作。

// 2-6 common-dataset-column
async initData = () => {
  const selectedViewIndex = this.dtableStore.view_index;
  const datasetIds = this.getCommonDatasetIds();
  await this.listCommonDatasets(datasetIds);
  dtableWebAPI.getRelatedUsers(workspaceID, fileName).then(res => {
    let data = res.data ? res.data.user_list : [];
    let collaList = [];
    data.forEach(item => {
      let colla = new Collaborator(item);
      collaList.push(colla);
    });
    this.setState({
      value: this.dtableStore.value,
      collaborators: collaList,
      selectedViewIndex,
    }, () => {
      this.onHistoryState();
    });
  });
  this.listNotications();
}

getCommonDatasetIds = () => {
  const value = this.dtableStore.value;
  const tables = value.tables;
  let datasetIds = new Set();
  for (let i = 0; i < tables.length; i++) {
    const columns = tables[i].columns;
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j];
      if (column.type === 'link-common-dataset' && column.data) {
        const datasetId = column.data.linked_common_dataset_id;
        datasetIds.add(datasetId);
      }
    }
  }
  return [...datasetIds];
}

async listCommonDatasets = (datasetIds) => {
  let newDatasets = [];
  for (let i = 0; i < datasetIds.length; i++) {
    let item = datasetIds[i];
    let res = await window.dtableWebAPI.getCommonDataset(item);
    const tableData = res.data;
    newDatasets[item] = tableData;
  }
  this.setState({
    linkedCommonDatasets: newDatasets
  });
}

async getCommonDataset = (datasetId) => {
  const linked = [...this.state.linkedCommonDatasets];
  if (linked[datasetId]) {
    return;
  }
  const res = await window.dtableWebAPI.getCommonDataset(datasetId);
  const tableData = res.data;
  linked[datasetId] = tableData;
  this.setState({
    linkedCommonDatasets: linked
  });
}

// edit column dialog
initData = () => {
  window.dtableWebAPI.listCommonDatasets().then((res) => {
    const datasetList = res.data.dataset_list;
    this.datasetLinks = datasetList.map(dataset => {
      const value = dataset.id;
      const label = <span>{dataset.name}</span>
    });
    this.setState({
      selectedDatasetLink: this.datasetLinks[0]
    });
  });
}

// https://github.com/seafileltd/dtable/pull/825/files
// 主要是editor-formatter
