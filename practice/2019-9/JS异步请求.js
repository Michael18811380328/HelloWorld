// 使用定时函数模拟异步请求：

// 方法一：使用回调函数
function doSomething(callback){
  setTimeout(function(){
    console.log('执行结束');
    let result = 4;
    callback(result);
  },100);
}

function callback(result){
  console.log('接收到结果为：'+result);
}

doSomething(callback);
doSomething((result)=>{console.log('接收到结果为：'+result)});


// 方法二：promise对象
function doSomething(){
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log('执行结束');
      let result = 6;
      resolve(result);
    },100);
  });

}

doSomething().then(result=>{
  console.log('接收到结果为：'+result);
});


// 方法三：generator函数
function doSomething(){
  setTimeout(function(){
    let result = 6;
    it.next(result);
  },100);
}

function *gener(){
  var result = yield doSomething();
  console.log(result);
}

let it = gener();
it.next();

// 方法四：async（ES7）
function doSomething(){
  return new Promise(resolve=>{
    setTimeout(function(){
      let result = 6;
      resolve(result);
    },100);
  });

}

async function action(){
  let result = await doSomething();
  console.log(result);
}
action();
