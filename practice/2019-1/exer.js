// Jan 2019 seahub codes
// think over how to decrease bugs. Now there are much bugs

// Jan 2, 2019 button style
// return ...
{
  this.state.reviewStatus === 'finished' &&
  <div className="cur-file-oparation">
    <button className="btn review-state review-state-finished" title={gettext('Finished')}></button>
  </div>
}
{
  this.state.reviewStatus === 'closed' &&
    <div className="cur-file-oparation">
      <button className="btn review-state review-state-closed" title={gettext('Closed')}></button>
    </div>
}

// Jan 3 scroll to quote bug
scrollToQuote = (newIndex, oldIndex, quote) => {
  const nodes = this.refs.diffViewer.value.document.nodes;
  let key;
  // 遍历全部节点，找到index相同的节点的key值
  nodes.map((node) => {
    if(node.data.get('old_index') == oldIndex && node.data.get(new_index) == newIndex) {
      key = node.key;
    }
  });
  // 如果找不到这个节点，对比文本内容和节点内容，找到节点
  if (typeof(key) !== 'string') {
    nodes.map((node) => {
      if (node.text.indexOf(quote) > 0) {
        key = node.key;
      }
    });
  }
  // 找到节点后
  if (typeof(key) === "string") {
    const win = window;
    let element = win.document.querySelector(`[data-key]="${key}"`);
    // 找到界面中对应的元素
    while (element.tagName === "CODE") {
      element.element.parentNode;
    }
    // 如果是代码块，找到父亲节点
    const scroller = this.findScrollerContainer(element, win);
    // 获取滚动对象
    const isWindow = scroller == win.document.body || scroller == win.document.documentElement;
    if (isWindow) {
      win.scrollTo(0, element.offsetTop);
    }
    else {
      scroller.scrollTop = element.offsetTop;
    }
    // 界面滚动，跳转到相应引用节点
  }
}

// #2775
// watermark
function watermark(boolean) {
  if (boolean) {
    let watermark_txt;
    watermark_txt = siteName + loginUser;
    watermark.init({
      watermark_txt: watermark_txt,
      watermark_alpha: 0.075
    });
    // 设置水印的文字内容和透明度，其他设置参考说明文档
  }
}

// #2783 add group members muili
addGroupMembers = () => {
  let emails = [];
  for (let i = 0; i < this.state.selectedOptions.length; i++) {
    emails.push(this.state.selectedOption[i].email)
  }
}