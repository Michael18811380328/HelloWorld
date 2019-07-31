// 异步操作的流程控制：串行和并行

// 1 串行执行（耗时间）
var items = [1, 2, 3, 4, 5]; // 存放事件队列
var results = []; // 存放每个异步任务的结果

function async(arg, callback) {
  // 异步任务执行（1s）
  setTimeout(() => {
    callback(arg * 2);
  }, 1000);
}

function final(value) {
  // 全部异步任务执行完毕后，处理数据
  console.log(value);
}

function series(item) {
  if (item) {
    // 如果任务队列中有任务，执行，并将结果放在results数组中，然后执行下一个事件
    async(item, (result) => {
      results.push(result);
      return series(items.shift());
    });
  } else {
    // 如果事件队列执行完毕，执行处理函数的程序（将所有异步事件结果传入）
    return final(results[results.length - 1]);
  }
}

// 2 并行执行（同时发请求，消耗性能）（异步函数和结果函数复用）
items.forEach((item) => {
  async(item, function(result){
    results.push(result);
    if (results.length === items.length) {
      // 异步任务全部执行
      final(results[results.length - 1]);
    }
  })
});

// 3 串行和并行结合（异步函数和结果函数复用）
let running = 0;
let limit = 0;

function launcher() {
  while (running < limit && items.length > 0) {
    let item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if (items.length > 0) {
        launcher();
      } else {
        final(results);
      }
    });
    running++;
  }
}

launcher();