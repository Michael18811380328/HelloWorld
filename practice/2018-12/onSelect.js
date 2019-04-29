import Base64 from 'slate-base64-serializer'
import Debug from 'debug'
import Hotkeys from 'slate-hotkeys'
import Plain from 'slate-plain-serializer'
import getWindow from 'get-window'
import { IS_IOS } from 'slate-dev-environment'

import cloneFragment from '../utils/clone-fragment'
import findDOMNode from '../utils/find-dom-node'
import findNode from '../utils/find-node'
import findPoint from '../utils/find-point'
import findRange from '../utils/find-range'
import getEventRange from '../utils/get-event-range'
import getEventTransfer from '../utils/get-event-transfer'
import setEventTransfer from '../utils/set-event-transfer'


function onSelect(event, editor, next) {
  debug('onSelect', { event })

  const window = getWindow(event.target)
  const native = window.getSelection()
  // 获取当前的窗口，获取窗口中 nativeSelection

  const { value } = editor
  const { document } = value
  // 传入editor 获取 document
  
  // If there are no ranges, the editor was blurred natively.
  // MDN：The Selection.rangeCount read-only property returns the number of ranges in the selection. Before the user has clicked a freshly loaded page, the rangeCount is 0.
  // After the user clicks on the page, rangeCount is 1, even if no selection is visible.A user can normally only select one range at a time, so the rangeCount will usually be 1.
  // Scripting can be used to make the selection contain more than one range.Gecko browsers allow multiple selections across table cells.
  // rangeCount，是一个只读参数， 表示界面中选中部分的个数。当用户点击一个新页面前，这个参数是0. 
  // 当用户点击后，即使没有选中任何内容，这个参数变成1。所以这个参数通常是1；window.getSelection().rangeCount
  if (!native.rangeCount) {
    editor.blur()
    return
  }

  // Otherwise, determine the Slate selection from the native one.
  // 从 DOM-selection 中获取 slate 中的选中部分。
  let range = findRange(native, editor)
  if (!range) {
    return
  }

  // 获取 slate range 
  const { anchor, focus } = range
  const anchorText = document.getNode(anchor.key)
  const focusText = document.getNode(focus.key)
  const anchorInline = document.getClosestInline(anchor.key)
  const focusInline = document.getClosestInline(focus.key)
  const focusBlock = document.getClosestBlock(focus.key)
  const anchorBlock = document.getClosestBlock(anchor.key)

  // COMPAT: If the anchor point is at the start of a non-void, and the
  // focus point is inside a void node with an offset that isn't `0`, set
  // the focus offset to `0`. This is due to void nodes <span>'s being
  // positioned off screen, resulting in the offset always being greater
  // than `0`. Since we can't know what it really should be, and since an
  // offset of `0` is less destructive because it creates a hanging
  // selection, go with `0`. (2017/09/07)
  if (
    anchorBlock &&
    !editor.isVoid(anchorBlock) &&
    anchor.offset == 0 &&
    focusBlock &&
    editor.isVoid(focusBlock) &&
    focus.offset != 0
  ) {
    range = range.setFocus(focus.setOffset(0))
  }

  // COMPAT: If the selection is at the end of a non-void inline node, and
  // there is a node after it, put it in the node after instead. This
  // standardizes the behavior, since it's indistinguishable to the user.
  if (
    anchorInline &&
    !editor.isVoid(anchorInline) &&
    anchor.offset == anchorText.text.length
  ) {
    const block = document.getClosestBlock(anchor.key)
    const nextText = block.getNextText(anchor.key)
    if (nextText) range = range.moveAnchorTo(nextText.key, 0)
  }

  if (
    focusInline &&
    !editor.isVoid(focusInline) &&
    focus.offset == focusText.text.length
  ) {
    const block = document.getClosestBlock(focus.key)
    const nextText = block.getNextText(focus.key)
    if (nextText) range = range.moveFocusTo(nextText.key, 0)
  }

  let selection = document.createSelection(range)
  selection = selection.setIsFocused(true)

  // Preserve active marks from the current selection.
  // They will be cleared by `editor.select` if the selection actually moved.
  selection = selection.set('marks', value.selection.marks)

  editor.select(selection)
  next()
}
