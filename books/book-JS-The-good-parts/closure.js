// 案例一：闭包：内部函数可以访问外部函数的变量
var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
}

fade(document.body);

// 100ms后，执行step函数；继续调用step函数并在100ms后执行

// 案例二：错误示范
var handlers = function(nodes) {
  for (i = 0; i < nodes.length ; i++) {
    node[i].onclick = function(e) {
      alert(i);
    };
  }
};
// 这个错误案例中，事件处理器函数绑定了变量i，并不是函数在构造时的变量i的值。

// 案例三：改良后的节点绑定案例
let handlers = (nodes) => {
  let helper = function(i) {
    return function(e) {
      alert(i);
    };
  };
  var i;
  for(i = 0; i < nodes.length; i++) {
    nodes[i].onclick = helper(i);
  }
}
// 避免在循环中创建一个函数，可能会引起混乱。
// 我们可以在循环之外创建一个辅助函数（helper）使用辅助函数返回一个绑定了当前i值的函数。