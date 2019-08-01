{
  // console.log(a,b,c); 不存在变量提升（暂时性死区）
  let a = 10;
  const b = 20;
  var c = 30;
}
// console.lgo(a,b,c); 块级作用域

{{
  let a = 10;
  { let a = 10; }
}};

(function() {
  var tmp = 1;
  console.log(tmp);
}());

{
  let tmp = 1;
  console.log(tmp);
}

// 块级作用域内部不要声明函数，优先使用函数表达式
{
  let a = 10;
  let fun = function() {
    return a;
  };
  // 这样函数fun就是块级作用域限制
}

let b = 1;
// console.log(this !== window);
// window.b === undefined;
// 声明的外部变量和顶层对象window脱钩，this不指向全局对象window(看具体环境，node)