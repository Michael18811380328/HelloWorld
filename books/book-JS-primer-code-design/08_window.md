### 8.1 window 对象(k)

#### 全局作用域

全局变量不能通过delete删除，而直接在window上定义的的属性可以(定义在window上面的属性在使用结束后需要释放，避免内存泄漏)

```js
var age =29;
window.color ="red";
console.log(delete window.age); //在IE<9时抛出错误，在其他浏览器中返回false
console.log(delete window.color); //在IE>9时抛出错误，在其他浏览器中返回true
```

使用 var 语句添加的window属性有一个名为[[Configurable]]的特性，这个特性的值被设置为 
false，所以无法通过delete删除。

另外，尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

```js
var newValue = oldValue; //这里会报错，因为oldValue未定义
var newValue = window.oldValue;  //不会报错，因为这是一次属性查询，值为undefined
```

#### 间歇调用和超时调用

```js
var timeoutId = setTimeout(function() {
	console.log('hello') 
},1000);
//返回一个数值id，这是唯一标识符，用他来取消调用

clearTimeout(timeoutId);

var intervalId = setInterval(function(){
  console.log("hello");
},1000);

clearInterval(intervalID);
// 使用定时器后，需要清除定时器(在React中使用定时器时可以绑定到对象的属性上面)
```

在开发环境下，很少真正的使用间歇调用setInterval，因为后一个间歇调用可能会在前一个间歇调用结束之前启动。

#### 系统对话框

alert(),confirm(),prompt() 
这三个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行。

#### location对象

location.replace()这个方法只接受一个参数，即要导航到的URL,结果会导致浏览器位置的改变，但是不会生成浏览记录。 
location.reload()如果不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载。需要输入参数true。

navigator对象
screen对象

#### history对象

history.go(-1)//后退一页
history.go(+1)//前进一页

history.go("baidu.com")//返回到历史记录中包含该字符串的第一个位置
