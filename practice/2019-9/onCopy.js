onCopy(event, change) {
  const value = change.value;
  const { selection, startBlock, endBlock } = value;

  // 在表格中的情况
  if (editTable.utils.isSelectionInTable(change.value)) {
    return tableCopy(
      event, editTable.utils.getPosition(change.value).tableBlock, editTable, value, this.editor.selectedCells
    );
  }

  // 未选中直接返回
  if (selection.isCollapsed) return;

  // 代码块中的情况
  if (editCode.utils.isInCodeBlock(change.value) || editList.utils.isSelectionInList(change.value)) {
    if (startBlock.key !== endBlock.key) return;
    let text = startBlock.text;
    if (Math.abs(selection.start.offset - selection.end.offset) === text.length) return;

    event.preventDefault();
    setEventTransfer(event, 'text', text.slice(selection.start.offset, selection.end.offset));

    return true;
  }
  return;
},

/*
  Ctrl+V to give the selected text a link which from the clipboard
*/

onPaste(event, change) {

  event.preventDefault();
  const transfer = getEventTransfer(event);
  const { type, text, html, fragment } = transfer;
  const { value } = change;
  let headerType = value.focusBlock ? value.focusBlock.type : 'paragraph';

  if (type === 'html') {
    const { document } = htmlSerializer.deserialize(html);
    if (editBlockquote.utils.isSelectionInBlockquote(change.value) ||
      editTable.utils.isSelectionInTable(change.value) ||
      editList.utils.isSelectionInList(change.value) ||
      headerType.includes('header')) {
      if (headerType.includes('header')) {
        change.insertText(text.replace(/\n/g, ' '));
        return true;
      }
      change.insertText(text);
      return true;
    }
    if (editCode.utils.isInCodeBlock(change.value)) {
      List(text.split('\n')).map(line =>
        change.insertBlock(Block.create({
          type: 'code_line',
          nodes: [Text.create(line)]
        }))
      );
      return true;
    }
    change.insertFragment(document);
    return true;
  }


  if (type === 'fragment') {
    if (editTable.utils.isSelectionInTable(change.value) || editCode.utils.isInCodeBlock(change.value) ||
      headerType.includes('header')) {

      if (headerType.includes('header')) {
        change.insertText(text.replace(/\n/g, ' '));
        return true;
      }

      if (editTable.utils.isSelectionInTable(change.value) &&
        (fragment.nodes.size === 1 && fragment.nodes.get(0).type === 'table')
      ) {
        pasteTable(fragment, editTable, change);
        return true;
      }

      if (editCode.utils.isInCodeBlock(change.value)) {
        List(text.split('\n')).map((lineText) => {
          change.insertBlock(Block.create({
            type: 'code_line',
            nodes: [Text.create(lineText)]
          }));
        });
        return true;
      }

      change.insertText(text);
      return true;
    } else if (editList.utils.isSelectionInList(change.value)) {
      pasteListUtils(fragment, editList, change, text);
      return true;
    } else {
      return;
    }
  }


  if (!isUrl(text)) return;

  if (change.value.selection.isCollapsed) {
    const inlineText = Inline.create({
      data: { href: text },
      type: 'link',
      nodes: [Text.create({ text: text })]
    });
    change.insertInline(inlineText);
    change.moveToEnd();
    return true;
  }