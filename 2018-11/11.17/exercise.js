postCOmment(repoID, filePath, comment, datail) {
  const path = encodeURIComponent(filePath);
  const url = this.server + '/api2/repos/' + repoID + '/file/comments/?p=' + path;
  let form = new FormData();
  form.append('comment', comment);
  form.append('detail', detail);
  return this._sendPostRequest(url, form);
}

function getText() {
  if(this.props.selectedText.length > 0) {
    let detail = {};
    detail.position = this.props.commentPosition;
    let detailJSON = JSON.stringify(detail);
    this.props.editorUtilities.postComment(comment.trim(), detailJSON).then((response) => {
      this.listComments();
      this.props.getCOmmentsNumber();
    });
  }
  else {
    this.props.editorUtilities.postComment(comment.trim()).then((response) => {
      this.listComments();
      this.props.getCommentsNumber();
    });
  }
  this.refs.commentTextarea.value = '';
}

setQuoteText = (text) => {
  if (text.length > 0) {
    this.ref.commentTextarea.value = '> ' + text;
  }
}

scrollToQuote = (detail) => {
  this.props.scrollToQuote(detail);
  this.refs.commentTextarae.value = '';
}

componentWillMount() {
  this.setQuoteText(this.props.selectedText);
}

componentWillReceiveProps(nextProps) {
  if (this.props.selectedText !== nextProps.selectedText) {
    this.setQuoteText(nextProps.selectedText);
  }
}

setBtnPosition = (e) => {
  const nativeSelection = window.getSelection();
  if (!nativeSelection.rangeCount) {
    return;
  }
  if (nativeSelection.isCollapsed === false) {
    const nativeRange = nativeSelection.getRangeAt(0);
    let range = findRange(nativeRange, this.editor,value);
    if (!range) {
      return;
    }
    let rect = nativeRange.getBoundingClientRect();
    if (navigator.userAgent.indexOf('Chrome') < 0 && navigator.userAgent.indexOf('Safari') > 0) {
      if (nativeRange.collapsed && rect.top === 0 && rect.height == 0) {
        if (nativeRange.startOffset == 0){
          nativeRange.setEnd(nativeRange.endContainer, 1);
        } else {
          nativeRange.setEnd(nativeRange.startContainer, nativeRange.startOffset - 1);
        }
        rect = nativeRange.getBoundingCLientRect();
        if (rect.top == 0 && rect.height == 0) {
          if (nativeRange.getClientTects().length) {
            rect = nativeRange.getClientRect()[0];
          }
        }
      }
    }
    let style = this.refs.commentbtn.style;
    let rightSideWidth = this.props.isShowComments ? 470 : 350;
    style.top = this.props.isShowComments ? `${rect.top - 93 + this.refs.mainPanel.scrollTop}px` : `${rect.top - 93 + this.props.getScrollTop()}px`;
    style.right = `${window.innerWidth - rect.x - rightSideWidth - 10}px`;
    return range;
  }
  else {
    let style = this.refs.commentbtn.style;
    style.top = '0px';
    style.right = '5000px';
  }
}

addComment(e) {
  e.stopPropagation();
  let text = window.getSelection().toString().trim();
  this.props.setSelectedText(text);
  this.props.openCommentList();
  let range = this.setBtnPosition();
  if (!range) {
    return;
  }
  const { document } = this.editor.value;
  const { anchor, focus } = range;
  const anchorText = document.getNode(anchor.key);
  const focusText = document.getNode(anchor.key);
  const anchorInline = document.getClosestInline(anchor.key);
  const focusInline = document.getClosestInline(focus.key);
  const focusBlock = document.getClosestBlock(focus.key);
  const anchorBlock = document.getClosestBlock(anchor.key);
  if (anchorBlock && anchor.offset == 0 && focusBlock && focus.offset != 0) {
    range = range.setFocus(focus.setOffset(0));
  }
  if (anchorInline && anchor.offset == anchorText.text.length) {
    const block = document.getClosestBlock(anchor.key);
    const nextText = block.getNextText(anchor.key);
    if (nextText) {
      range = range.moveAnchorTo(nextText.key, 0);
    }
    if (focusInline && focus.offset == focusText.text.length) {
      const block = document.getClosestBlock(focus.key);
      const nextText = block.getNextText(focus.key);
      if (nextText) {
        range = range.moveFocusTo(nexttext.key, 0);
      }
      let selection = document.createSelection(range);
      selection = selection.setIsFocus(true);
      this.props.addCommentPosition(selection.anchor.path);
    }
  }
}
