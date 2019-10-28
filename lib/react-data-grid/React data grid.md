### React data grid

主要功能：界面显示 Excel 预览，可以将一个对象或者 json 格式化成为界面。

##### 安装

~~~bash
npm install react-data-grid --save
~~~

##### 基本使用

~~~js
import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];

const rows = [
  {id: 0, title: 'row1', count: 20},
  {id: 1, title: 'row1', count: 40},
  {id: 2, title: 'row1', count: 60}
];

// 实际的标题和列都是实时获取的
function HelloWorld() {
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={3}
      minHeight={150}
    />
  );
}
~~~

##### 插件安装

~~~bash
npm install react-data-grid-addons --save
~~~

大部分的功能会集成在插件中，例如富表格编辑、右键菜单、拖拽功能、行分组管理等。未来这部分功能将分成多个包以供不同客户使用。