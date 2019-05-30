class Stack() {
  function Stack() {
    this.dataSource = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.length = length;
    this.clear = clear
  }

  function push(element) {
    this.dataSource[this.top++] = element;
  }

  function pop(element) {
    return this.dataSource[--this.top]
  }

  function peek() {
    return this.dataSource[this.top - 1]
  }

  function clear() {
    this.top = 0;
  }

  function length() {
    return this.top
  }
}

// 下面是三个主要应用
// 栈可以用来判断一个算术表达式中的括号是否匹配。编写一个函数，该函数接受一个算术表达式作为参数，返回括号缺失的位置。
// 下面是一个括号不匹配的算术表达式的例子：2.3 + 23 / 12 + (3.14159×0.24。

function panduan(shizi) {
  var s = new Stack();
  var left = ['(', '{', '['];
  var right = [')', '}', ']'];
  for (let i = 0; i < shizi.length; i++) {
    if (left.indexOf(shizi[i]) > -1) {
      s.push(shizi[i])
    } else if (right.indexOf(shizi[i]) > -1) {
      var c = s.peek();
      switch (shizi[i]) {
        case '}':
          if (c == '{') {
            s.pop();
            break;
          }
          return i + 1;
        case ']':
          if (c == '[') {
            s.pop();
            break;
          }
          return i + 1;
        case ')':
          if (c == '(') {
            s.pop();
            break;
          }
          return i + 1;

        default: break;
      }
    }
  }
  if (s.length() > 0) {
    return shizi.length+ 1;
  }
  return -1
}
console.log(panduan('2+3/1+(3*2')) //11
console.log(panduan('2+(3/1)+(3*2')) //13

// 使用两个栈，一个用来存储操作数，一个用来存储操作符，设计并实现一个js函数，该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。
function infixToPostfix(exp) {
  var operatorStack = new Stack();
  var postfixExp = [];

  exp.split('').forEach(function (char) {

    if (isOperator(char)) {
      // 比较优先级
      while (comparePriority(operatorStack.peek(), char)) {
        var tmp = operatorStack.pop();
        if (tmp !== '(' && tmp !== ')') {
          postfixExp.push(tmp);
        }
        if (tmp === '(' && char === ')') { // 匹配到左括号的时候，结束循环。
          break;
        }
      }
      if (char !== ')') {
        operatorStack.push(char);
      }
    } else {
      postfixExp.push(char);
    }
  });
  while (operatorStack.length()) {
    postfixExp.push(operatorStack.pop());
  }
  return postfixExp.join('');
}

function computePostfix(exp) {
  var numStack = new Stack();
  exp.split('').forEach(function (char) {
    if (char.trim()) {
      if (!isOperator(char)) {
        numStack.push(char);
      } else {
        var tmp = numStack.pop();
        numStack.push(eval(numStack.pop() + char + tmp));
      }
    }
  });
  return numStack.pop();
}

var postfixExp = infixToPostfix('(8-2)/(3-1)*(9-6)');
var postfixExpValue = computePostfix(postfixExp);

console.log(postfixExp); // 82-31-/96-*
console.log(postfixExpValue); // 9

// 佩兹糖果盒，不改变其他颜色糖果将黄色糖果移出
// 1:红 2：黄 3：白
var s = [1, 1, 1, 1, 3, 3, 2, 2, 2, 2, 1, 1, 3, 3, 1, 2, 3, 1, 3, 2];

function yichusugger(arr) {
  var s = new Stack();
  for (let i = 0; i < arr.length; i++) {
    s.push(arr[i])
  }
  var newArr = [];
  while (s.length() > 0) {
    var color = s.pop();
    if (color != 2) {
      newArr.push(color)
    }
  }
  return newArr
}
console.log(yichusugger(s))
