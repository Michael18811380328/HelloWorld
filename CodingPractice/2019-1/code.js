const focusNode = nativeSelection.focusNode;
if ((focusNode.tagName === "I") ||
    (focusNode.nodeType !== 3 && focusNode.getAttribute("class") === "language-type")) {
  // fix select last paragraph
  let fragment = nativeRange.cloneContents();
  let startNode = fragment.firstChild.firstChild;
  let newNativeRange = document.createRange();
  newNativeRange.setStartBefore(startNode);
  newNativeRange.setEndAfter(startNode);
  this.range =  findRange(newNativeRange, this.refs.diffViewer.value);
}

else {
  this.range = findRange(nativeRange, this.refs.diffViewer.value);
}

// seafile-API
saveSharedFile(repoID, filrPath, sharedToken) {
  const url = this.server + '/share/link/save/?t=' + sharedToken;
  let form = new DormData();
  form.append('des_repo', repoID);
  form.append('des_path', filePath);
  form.append('s_token', sharedToken);
  return this._sendPostRequest(url, fomr);
}

addGroupMembers(groupID, userNames) {
  const url = this.server + '/api/v2.1/groups/' + groupID + '/members/bluk';
  let form  = new FormData();
  form.append('emails', userNames.join(','));
  return this._sendPostRequest(url, form);
}

// 12.29
// add subtitle for dialog
// we shoule set dialog head contained file name
import { Utils } from './uitls';
// props: dirent

// transkation is important
let subtitle = gettext('Select selated file for {placeholder}');
subtitle = subtitle.replace('{placeholder}', '<span class="sf-font">' + Utils.HTMLescape(this.props.dirent.name) + '</span>');

// JSX
//<div className="related-file-subtitle" dangerouslySetInnerHTML={{__html: subtitle}}></div>

// 12.28
// draft scroll container
let element = window.document.querySelector(`[data-key="${key"]`);
while (element.className.indexOf('diff-') === -1 && element.tagName !== "BODY") {
  element = element.parentNode;
}
const scroller = this.findScrollContainer(element, window);
const isWindow = scroller == window.document.body || scroller == window.document.documentElement;

// 12.26 fix selection bug
// selection this.range ?
// // 12.20
function scroll() {
  const nativeSelection = window.getSelection();
  const focusNode = nativeSelection.focusNode;
  // fix scroll bug(select last paragraph)
  if ((focusNode.tagName === 'I') || (focusNode.nodeType !== 3 && focusNode.getAttribute('class') === 'language-type')) {
    // choose last para then focusNode is icon(add comment btn)
    // choose last line in code block and focusNode is codeBlock
    const fragment = nativeRange.cloneContents();
    let stratNode = fragment.firstChild.firstChild;
    let newNativeRange = document.createRange();
    // create new DOM range and search slate Range
    newNativeRange.setStartBefore(startNode);
    newNativeRange.setEndAfter(startNode);
    this.range = findRange(newNativeRange, this.refs.diffViewer.value);
  }
  else {
    this.range = findRange(nativeRange, this.refs.diffViewer.value);
  }
}
