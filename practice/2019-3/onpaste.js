/**
 * 粘贴到编辑器函数
 * @author Michael An
 * @DateTime 2019-03-21T14:55:20+0800
 * @param    {[type]}                 event  [粘贴事件，可以获取Fragment内容]
 * @param    {[type]}                 change [界面]
 * @return   {[type]}                        [boolean]
 */
onPaste = (event, change) => {
  event.preventDefault();

  // data Transfer 是复制粘贴时候的暂存位置，这里从这个对象中获取复制的内容（slate 内部工具函数）
  // https://www.jianshu.com/p/55039f5136cb
  var transfer = getEventTransfer(event);

  // 获取数据传输器的类型、文本、html、fragment
  var type = transfer.type,
      text = transfer.text,
      html = transfer.html,
      fragment = transfer.fragment;

  // 获取change的value, 这是slate属性
  var value = change.value;


  var headerType = value.focusBlock ? value.focusBlock.type : 'paragraph';

  // 处理HTML类型的粘贴文本
  if (type === 'html') {
    // the document get from htmlSerializer.deserialize function may not be a standard slate,
    // this may cause a list_item contains a text node directly, instead of a paragraph node
    // use the toJSON function to  standardize the slate Document
    var document = Document.create(htmlSerializer.deserialize(html).toJSON().document);
    // 首先把HTML转化成一个Document对象。

    if (editBlockquote.utils.isSelectionInBlockquote(change.value) || editTable.utils.isSelectionInTable(change.value) || editList.utils.isSelectionInList(change.value) || headerType.includes('header')) {
      // 如果包括标题，那么需要去掉标题的空格
      if (headerType.includes('header')) {
        change.insertText(text.replace(/\n/g, ' '));
        return true;
      }
      // 然后插入标题文本（返回真，插入成功）
      change.insertText(text);
      return true;
    }

    if (editCode.utils.isInCodeBlock(change.value)) {
      // 如果是代码行内部，需要把代码行中的文本按照回车转化成数组，然后依次插入代码行。
      List(text.split('\n')).map(function (line) {
        return change.insertBlock(Block.create({
          type: 'code_line',
          nodes: [Text.create(line)]
        }));
      });
      return true;
    }

    // 把其他情况的fragment直接插入内部；实际上直接可以把一个Document对象插入slate内部。当然可以插入node inline block 节点。
    change.insertFragment(document);
    return true;
  }
  
  // 如果复制的是文件片段（或者富媒体）
  if (type === 'fragment') {
    // when copy an image element the image is contained in a paragraph
    /*
    *  get the text length of fragment in the clipboard
    * */
    // 获取复制碎片的长度
    var fragmentTextLength = fragment.text.length;
    /*
    *  if selection is in a header, insert the text of fragment
    *  if the fragment contains only void nodes, the text length is 0, in this case do nothing
    * */
    if (headerType.includes('header')) {
      if (fragmentTextLength > 0) {
        change.insertText(text.replace(/\n/g, ' '));
      }
      return true;
    } else if (editTable.utils.isSelectionInTable(change.value)) {
      
      // if selection is in a table and the contains only one element
      if (fragment.nodes.size === 1) {
        var nodeType = fragment.nodes.get(0).type;
        // if the element is table, paste the table with pasteTable function
        if (nodeType === 'table') {
          pasteTable(fragment, editTable, change);
        } else if (nodeType === 'paragraph') {
          // if the element is paragraph, if only copy a image, it would be contained in a paragraph, insert fragment
          change.insertFragment(fragment);
        } else {
          /*
          *  if the element type is others like header code block and text length is not 0
          *  insert the text of the element
          * */
          if (fragmentTextLength > 0) {
            change.insertText(text);
          }
        }
      } else {
        // if the fragment contains more than one element
        fragment.nodes.forEach(function (node) {
          // if element is paragraph traverse the paragraph node, insert the text node or image node
          if (node.type === 'paragraph') {
            node.nodes.forEach(function (paragraphNode) {
              if (paragraphNode.object === 'text') {
                change.insertText(paragraphNode);
              } else {
                change.insertInline(paragraphNode);
              }
            });
            // if the element is node a paragraph, insert the text if the node is not 0
          } else {
            if (node.text.length > 0) {
              change.insertText(node.text);
            }
          }
        });
      }
      return true;
    } else if (editCode.utils.isInCodeBlock(change.value)) {
      // if the fragment contains only image or html_block the text length is 0;
      // insert nothing in the code block
      if (fragmentTextLength === 0) {
        return true;
      }

      // split the text width '\n', and insert these text
      // to code block
      List(text.split('\n')).map(function (lineText) {
        change.insertBlock(Block.create({
          type: 'code_line',
          nodes: [Text.create(lineText)]
        }));
      });
      return true;
    } else if (editList.utils.isSelectionInList(change.value)) {
      // if the text of fragment is not 0, insert the fragment width pasteListUtils
      if (fragmentTextLength > 0) {
        pasteListUtils(fragment, editList, change, text);
      } else {
        // if the text of fragment is 0, insert fragment directly, the fragment might contains image, html_block, empty code block
        // these element can be inserted into list directly
        change.insertFragment(fragment);
      }
      return true;
    } else if (editBlockquote.utils.isSelectionInBlockquote(change.value)) {
      pasteBlockquoteUtil(fragment, change);
      return true;
    } else {
      return;
    }
  }
  if (!isUrl(text)) return;
  if (change.value.selection.isCollapsed) {
    // when paste a url in a code block, paste it as text instead of a link node
    if (editCode.utils.isInCodeBlock(value)) {
      return;
    }
    var inlineText = Inline.create({
      data: { href: text },
      type: 'link',
      nodes: [Text.create({ text: text })]
    });
    change.insertInline(inlineText);
    change.moveToEnd();
    return true;
  }

  if (value.inlines.some(function (inline) {
    return inline.type === 'link';
  })) {
    change.call(function (change) {
      change.unwrapInline('link');
    });
  }

  change.call(function (change, href) {
    change.wrapInline({
      type: 'link',
      data: { href: href }
    });
    change.moveToEnd();
  }, text);
  return true;
}