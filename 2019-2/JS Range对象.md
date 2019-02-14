### JS Range对象

#### 定义

Range：一段选中的内容，可以是空的。包括起始节点和起始点的序号，结束节点和结束节点的序号（偏移量）。可以手动定义一个选区。

Range 可以使一段HTML，这部分HTML选择时，可能会选择一部分标签，此时浏览器会根据情况补齐剩下的标签。（</p>）形成一个DOM-Range

#### 分类

W3C、Firefox、IE 下的range是不完全相同的。W3C为主，其余两个了解就行。

#### API

1. cloneContents() 复制当前选中的部分DOM并返回

documentFragment = rangeObject.cloneContents();

Safari 的 bug：选择范围是空，将会返回null而不是空文档。

docFragment = rangeObj.cloneContents() || document.createDocumentFragment();

