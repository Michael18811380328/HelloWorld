function getText() {
  // 如果传入的选中文本长度大于0
  if (this.props.selectedText.length > 0) {
    // 获取传入的位置信息；将位置信息放在detail字段中并JSON存储
    let detail = {};
    detail.position = this.props.commentPosition;
    let detailJSON = JSON.stringify(detail);
    // 将四个参数传入函数中发送评论文本、评论位置信息
    this.props.editorUtilities.postComment(comment.trim(), detailJSON).then((response) => {
      // 回调函数中重新枚举评论内容和评论数量（位于不同的组件位置）
      this.listComments();
      this.props.getCommentsNumber();
    });
  }
  else {
    this.props.editorUtilities.postComment(comment.trim()).then((response) => {
      // 如果文本长度是0 直接发送评论信息 回调函数相同
      this.listComments();
      this.props.getCommentsNumber();
    });
  }
  // 清空当前输入框的内容
  this.refs.commentTextarea.value = '';
}

setQuoteText = (text) => {
  // 如果参数长度大于0， 设置评论去的文本时传入参数的md格式
  if (text.length > 0) {
    this.refs.commentTextarea.value = '> ' + text;
  }
}

scrollToQuote = (detail) => {
  this.props.scrollToQuote(detail);
  this.refs.commentTextarea.value = '';
  // 执行跳转函数，设置文本框内容
}

componentDidMount() {
  this.setQuoteText(this.props.selectedText);
  // 界面加载完毕后，设置选中文本到输入框中
}

componentWillReceiveProps(nextProps) {
  // 当新传入组件的选中文本参数不同时，获取新的组件的参数
  if (this.props.selectedText !== nextProps.selectedText) {
    this.setQuoteText(nextProps.selectedText);
  }
}

// 设置按钮的位置
setBtnPosition = (e) => {
  const nativeSelection = window.getSelection();
  if (!nativeSelection.rangeCount) {
    return;
  }
  if (nativeSelection.isCollapsed === false) {
    const nativeRange = nativeSelection.getRangeAt(0);
    let range = findRange(nativeRange, this.editor.value);
    if (!range) {
      return;
    }
    let rect = nativeRange.getBoundingClientRect();
    // fix Safari bug
    if (navigator.userAgent.indexOf('Chrome') < 0 && navigator.userAgent.indexOf('Safari') > 0) {
      if (nativeRange.collapsed && rect.top == 0 && rect.height == 0) {
        if (nativeRange.startOffset == 0) {
          nativeRange.setEnd(nativeRange.endContainer, 1);
        } else {
          nativeRange.setStart(nativeRange.startContainer, nativeRange.startOffset - 1);
        }
        rect = nativeRange.getBoundingClientRect();
        if (rect.top == 0 && rect.height == 0) {
          if (nativeRange.getClientRects().length) {
            rect = nativeRange.getClientRects()[0];
          }
        }
      }
    }
    let style = this.refs.commentbtn.style;
    let rightSideWidth = this.props.isShowComments ? 470 : 350;
    style.top = this.props.isShowComments ?
      `${rect.top - 93 + this.refs.mainPanel.scrollTop}px` :
      `${rect.top - 93 + this.props.getScrollTop()}px`;
    style.right = `${window.innerWidth - rect.x - rightSideWidth - 10}px`;
    return range;
  }
  else {
    let style = this.refs.commentbtn.style;
    style.top = '0px';
    style.right = '5000px';
  }
}

// 选中文本增加评论函数
addComment = (e) => {
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
  const focusText = document.getNode(focus.key);
  const anchorInline = document.getClosestInline(anchor.key);
  const focusInline = document.getClosestInline(focus.key);
  const focusBlock = document.getClosestBlock(focus.key);
  const anchorBlock = document.getClosestBlock(anchor.key);
  if (anchorBlock && anchor.offset == 0 && focusBlock && focus.offset != 0) {
    range = range.setFocus(focus.setOffset(0));
  }
  // COMPAT: If the selection is at the end of a non-void inline node, and
  // there is a node after it, put it in the node after instead. This
  // standardizes the behavior, since it's indistinguishable to the user.
  if (anchorInline && anchor.offset == anchorText.text.length) {
    const block = document.getClosestBlock(anchor.key);
    const nextText = block.getNextText(anchor.key);
    if (nextText) range = range.moveAnchorTo(nextText.key, 0);
  }
  if (
    focusInline && focus.offset == focusText.text.length) {
    const block = document.getClosestBlock(focus.key);
    const nextText = block.getNextText(focus.key);
    if (nextText) range = range.moveFocusTo(nextText.key, 0);
  }
  let selection = document.createSelection(range);
  selection = selection.setIsFocused(true);
  this.props.addCommentPosition(selection.anchor.path);
}

componentDidMount() {
  document.addEventListener('selectionchange', this.setBtnPosition);
}

componentWillUnmount() {
  document.removeEventListener('selectionchange', this.setBtnPosition);
}

openCommentList = () => {
  if (!this.state.isShowComments) {
    this.setState({
      isShowComments: true
    });
  }
}

setSelectedText = (text) => {
  this.setState({
    selectedText: text
  });
}

addCommentPosition = (position) => {
  this.setState({
    commentPosition: position
  });
}

getScrollTop = () => {
  return this.refs.markdownViewer.scrollTop;
}

findScrollContainer = (el, window) => {
  let parent = el.parentNode;
  const OVERFLOWS = ['auto', 'overlay', 'scroll'];
  let scroller;
  while (!scroller) {
    if (!parent.parentNode) break;
    const style = window.getComputedStyle(parent);
    const { overflowY } = style;
    if (OVERFLOWS.includes(overflowY)) {
      scroller = parent;
      break;
    }
    parent = parent.parentNode;
  }
  if (!scroller) {
    return window.document.body;
  }
  return scroller;
}

scrollToQuote = (detailJSON) => {
  try {
    const win = window;
    let detail = JSON.parse(detailJSON);
    let path = detail.position;
    if (path.length > 2) {
      // deal with code block or chart
      path[0] = path[0] > 1 ? path[0] - 1 : path[0] + 1;
      path = path.slice(0, 1);
    }
    let node = this.state.value.document.getNode(path);
    if (!node) {
      path = path.slice(0, 1);
      node = this.state.value.document.getNode(path);
    }
    const element = win.document.querySelector(`[data-key="${node.key}"]`);
    const scroller = this.findScrollContainer(element, win);
    const isWindow = scroller == win.document.body || scroller == win.document.documentElement;
    if (isWindow) {
      win.scrollTo(0, element.offsetTop);
    } else {
      scroller.scrollTop = element.offsetTop;
    }
  } catch (e) {
    // deal with error path or deleted node
    console.log('The quote was not found.');
  }
}

if (this.refDom) {
  const native = window.getSelection();
  const range = native.getRangeAt(0);
  const rect = range.commonAncestorContainer.parentNode;
  let rect = range.getBoundingClientRect();
  if (navigator.userAgent.indexOf('Chrome') < 0 && navigator.userAgent.indexOf('Safari') > 0) {
    if (range.collapsed && rect.top == 0 && rect.height == 0) {
      if (range.startOffset == 0) {
        range.setEnd(range.endContainer, 1);
      } else {
        range.setStart(range.startContainer, range.startOffset - 1);
      }
      rect = range.getBoundingClientRect();
      if (rect.top == 0 && rect.height == 0) {
        if (range.getClientRects().length) {
          rect = range.getClientRects()[0];
        }
      }
    }
  }

  style.top = `${rect.top + this.props.editor.getScrollTop() - this.refDom.offsetHeight - 100}px`;
  if ((window.innerWidth - rect.x) < this.refDom.clientWidth / 2) {
    style.right = '0px';
  }
  else if (window.innerWidth * 0.25 > (rect.x - this.refDom.clientWidth / 2)) {
    style.right = `${window.innerWidth * 0.85 - rect.x}px`;
  }
  style.right = `${window.innerWidth - rect.x - this.refDom.clientWidth / 2}px`;
}

toggleReviewTip = () => {
  this.setState({
    showReviewTip: !this.state.showReviewTip
  });
}