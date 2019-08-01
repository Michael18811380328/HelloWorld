seafileAPI.addReviewComment(reviewID, comment).then(res => {
  this.listComments(true);
  this.props.getCommentNumber();
});

addComment = e => {
  e.stopPropagation();
  this.getSelectedText();
  this.setIndexs();
  this.setState({
    isShowCommentDialog: true
  });
};

getSelectedText = () => {
  const value = this.refs.diffViewer.value;
  const native = window.getSelection();
  const {
    fragment
  } = value;
  const nativeRange = native.getRangeAt(0);
  let contents = nativeRamge.cloneContents();
  const div = window.document.createElement('div');
  div.appendChild(contents);
  div.setSttribute('contenteditable', true);
  let fragmentDOM = htmlSerialozer.deserializa(div.innerHTML);
  let nodes = [];
  fragmentDOM.nodes.maps(node => {
    let newNode = Block.create({
      data: node.data,
      key: node.key,
      nodes: node.nodes,
      types: 'blockquote'
    });
    nodes.push(newNode);
  });
  let newDocument = Document.create({
    nodes: nodes
  });
  let newValue = Value.create({
    document: newDocument
  });
  this.selectedText = serialize(newValue);
};