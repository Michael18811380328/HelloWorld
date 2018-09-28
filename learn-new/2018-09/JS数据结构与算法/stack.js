// stack in JS 栈（使用数组实现）
// 0 构造函数创建栈
function Stack() {
  // 属性和方法的声明
  let items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    return items.pop();
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  // peek 返回栈顶的元素，不对栈进行修改
  this.isEmpty = function() {
    return items.length === 0;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
  this.print = function() {
    console.log(items.toString());
  };
}

let stack = new Stack();
console.log(stack.isEmpty());

stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();

console.log(stack.peek());
console.log(stack.size());
console.log(stack.isEmpty());


// 1 实践：十进制二进制转化 p39
function divideBy2(decNumber) {
  let remStack = new Stack();
  let rem;
  let binary = '';

}




function divideBy2(decNumber){
    var remStack = new Stack(),
        rem,
        binaryString = '';
    while (decNumber > 0){ //{1}
        rem = Math.floor(decNumber % 2); //{2}
        remStack.push(rem); //{3}
        decNumber = Math.floor(decNumber / 2); //{4}
}
        while (!remStack.isEmpty()){ //{5}
            binaryString += remStack.pop().toString();
}
        return binaryString;
    }
console.log(divideBy2(233)); //输出11101001



function baseConverter(decNumber, base){
var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; //{6}


while (decNumber > 0){
rem = Math.floor(decNumber % base);
remStack.push(rem);
decNumber = Math.floor(decNumber / base);
}

while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()]; //{7}
}
    return baseString;
}



