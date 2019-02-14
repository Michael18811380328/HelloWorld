// 将一个node节点转化成字符串输出（用于markdown格式输出）原生JS
function nodeToString (node) {
  var tmpNode = document.createElement( "div" );
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
  // 首先创建一个div容器，将传入的node作为子节点插入到div容器中，获取容器中的innerHTML，即可获取转换后的字符串
}

// 在JQ进行转化
// 首先将HTML中的注释进行转换，按照换行将HTML放入数组中。
function node2string() {
  var htmlArr = $("#html").val().replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").split('\n');
  var len = htmlArr.length;
  var outArr = [];
  outArr.push( "\'\\\n");
  // 遍历节点获取内部的节点
  jQuery.each(htmlArr, function (index, value) {
    if (value !== "") {
      outArr.push( value + "\\\n");
    }
  });
  outArr.push( "\'");
  // 将数组组合起来
  $("#string").val(outArr.join(""));
}

// slate 复制函数
function onCopy(event, change, editor) {
  debug$5('onCopy', { event: event });
  cloneFragment(event, change.value);
}

// slate 剪切函数
function onCut(event, change, editor) {
  debug$5('onCut', { event: event });
  // Once the fake cut content has successfully been added to the clipboard,
  // delete the content in the current selection.
  cloneFragment(event, change.value, change.value.fragment, function () {
    // If user cuts a void block node or a void inline node,
    // manually removes it since selection is collapsed in this case.
    var value = change.value;
    var endBlock = value.endBlock,
        endInline = value.endInline,
        selection = value.selection,
        schema = value.schema;
    var isCollapsed = selection.isCollapsed;

    var isVoidBlock = endBlock && schema.isVoid(endBlock) && isCollapsed;
    var isVoidInline = endInline && schema.isVoid(endInline) && isCollapsed;

    if (isVoidBlock) {
      editor.change(function (c) {
        return c.removeNodeByKey(endBlock.key);
      });
    } else if (isVoidInline) {
      editor.change(function (c) {
        return c.removeNodeByKey(endInline.key);
      });
    } else {
      editor.change(function (c) {
        return c.delete();
      });
    }
  });
}