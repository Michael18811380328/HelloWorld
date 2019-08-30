// Node
node.nodeType
node.nodeName
node.nodeValue
node.textContent
document.documentElement.textContent // 这里可以获取一部分界面的节点和文本内容
node.baseURL
node.ownerDocument
node.nextSibling
node.previousSibling
node.parentNode
node.parentElement
node.firstChild
node.lastChild
node.isConnected // 当前节点是否在文档中（可以把文档碎片插入文档中）

node.appendChild(p);
node.hasChildNodes();

node.hasChildNodes() || node.firstChile !== null || (node.childNodes && node.childNodes.length === 0) // 这三种方法可以判断是否有子节点

node.cloneNode();

node.parentNode.insertBefore(newNode, referNode);
node.parentNode.removeChild(childNode)

while (element.firstChile) {
  // 移除全部的子节点
  element.removeChild(element.firstChile);
}

node.replaceChild(newNode, oldNode);
node.contains(childNode);
node.compareDocumentPosition(node); // 判断两个节点的位置

node.isEqualNode
node.isSameNode
node.normalize
node.getRootNode

// Document Node
document === window.document

