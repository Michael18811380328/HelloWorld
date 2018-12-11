seafileAPI.addReviewComment(reviewID, comment).then((response) => {
  this.listComments(true);
  this.props.getCommentsNumber();
});

getSelectedText = () => {
  const value = this.refs.diffViewer.value;
  const native = window.getSelection();
  const { fragment } = value;
  const nativeRange = native.getRangeAt(0);
  let contents = nativeRange.cloneContents();
  const div = window.document.createElement('div');
  div.appendChild(contents);
  div.setAttribute('contenteditable', true);
  let fragmentDOM = htmlSerializer.deserialize(div.innerHTML).document;
  let nodes = [];
  for (let i = 0; i < fragmentDOM.nodes.toArray().length; i++) {
    let node = Block.create({
      data: fragmentDOM.nodes.toArray()[i].data,
      key: fragmentDOM.nodes.toArray()[i].key,
      nodes: fragmentDOM.nodes.toArray()[i].nodes,
      type: 'blockquote'
    });
    nodes[i] = node;
  }
  let newDocument = Document.create({
    nodes: nodes
  });
  let newValue = Value.create({
    document: newDocument
  });
  this.selectedText = serialize(newValue);
}


addComment = (e) => {
  e.stopPropagation();
  this.getSelectedText();
  this.getIndexs();
  this.setState({
    isShowCommentDialog: true
  });
}

fragmentDOM.nodes.map(node => {
  let newNode = Block.create({
    data: node.data,
    key: node.key,
    nodes: node.nodes,
    type: 'blockquote'
  });
  nodes.push(newNode);
});