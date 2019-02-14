// fibonacci 算法优化
// 函数记忆：如果使用递归进行计算，首先函数先检查之前是否进行计算，是否存在结果，如果有直接进行调用，没有的话再次进行递归调用。在递归中可以大大优化函数的计算速度。

// 传统方法：453次
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
for (let i = 0; i <= 10 ; i++) {
  console.log(fibonacci(i));
}

// 改良方法：函数调用了29次
var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = meno[n];
    if(typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();