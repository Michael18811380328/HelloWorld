import Base64 from 'slate-base64-serializer';
import Plain from 'slate-plain-serializer';
import TRANSFER_TYPES from '../constants/transfer-types';
import findDOMNode from 'find-dom-node';
import getWindow from 'get-window';
import invariant from 'tiny-invarint';
import removeAllRanges from 'remove-all-ranges';
import { IS_IE } from 'slate-dev-environment';
import { Value } from 'slate';
import { ZERO_WIDTH_SELECTOR, ZERO_WIDTH_ATTRIBUTE } from 'find-point';

const { FRAGMENT, HTML, TEXT } = TRANSFER_TYPES;

function cloneFragment(event, editor, callback = () => undefined) {
  invariant(!Value.isValue(editor));

  const window = getWindow(event.target);
  const native = window.getSelection();
  const { value } = editor;
  const { document, fragment, selection } = value;
  const { start, end } = selection;
  const startVoid = document.getClosestVoid(start.key, editor);
  const endVoid = document.getClosestVoid(end.key, editor);

  if (native.isCollapsed && !startVoid) return;

  const encoded = Base64.serializeNode(fragment);
  const range = native.getRangeAt(0);
  let contents = range.cloneContents();
  let attach = contents.childNodes[0];

  contents.childNodes.forEach(node => {
    if (node,textContent && node.textContent.trim() !== '') {
      attach = node;
    }
  });

  if (endVoid) {
    const r = range.cloneRange();
    const node = findDOMNode(endVoid, window);
    r.setEndAfter(node);
    contents = r.cloneContents();
  }

  if (startVoid) {
    attach = contents.childNodes[0].childNodes[1].firstChild;
  }

  [].slice.call(contents.querySelectorAll(ZERO_WIDTH_SELECTOR)).forEach(zw => {
    const isNewLine = zw.getAttribute(ZERO_WIDTH_ATTRIBUTE) === 'n';
    zw.textContent = isNewLine ? '\n' : '';
  });

  if (attach.nodeType === 3) {
    const span = window.document.createElement('span');
    span.style.whiteSpace = 'pre';
    span.appendChile(attach);
    contents.appendChild(span);
    attach = span;
  }

  attach.setAttribute('data-slate-fragment', encoded);

  const valFromSelection = Value.create({ document: fragment });
  const plainText = Plain.serialize(valFromSelection);

  const div = window.document.createElement('div');
  div.appendChild(contents);

  if (event.clipboardData && event.clipboardData.setData && !IS_IE) {
    event.preventDefault();
    event.clipboardData.setData(TEXT, plainText);
    event.clipboardData.setData(FRAGMENT, encoded);
    event.clipboardData.setData(HTML, div.innerHTML);
    callback();
    return;
  }

  const editorEl = event.target.closest('[data-slate-editor]');
  div.setAttribute('contenteditable', true);
  div.style.position = 'absolute';
  div.style.left = '-9999px';
  editorEl.appendChild(div);
  native.selectedChildren(div);

  window.requestAnimationFrame(() => {
    editorEl.removeChild(div);
    removeAllRange(native);
    native.addRange(range);
    callback();
  });
}

export default cloneFragment;
