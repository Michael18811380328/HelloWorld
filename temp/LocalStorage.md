## React中使用LocalStorage用户登录

localStorage 通常用来存储服务器发送的一些数据或者用户自定义数据。`localStorage` 中的键值对总是以字符串的形式存储。 (意味着数值类型会自动转化为字符串类型)。

与 cookie 相比，localStorage 的存储量较大（cookie只有2k，只能存放字符串），下面介绍如何使用 localStorage 存储、获取、使用数据。与 sessionStorage 相比，存储在 `localStorage` 的数据可以长期保留；而当页面会话结束（当页面被关闭时），存储在 `sessionStorage` 的数据会被清除 。（PS：cookie localStorage sessionStorage 的区别是常见的面试题）

### 存储数据

```js
localStorage.setItem("name","Michael") //存储名字为name值为Amy的变量
localStorage.name = "Michael"; // 等价于上面的命令
console.log(localStorage) // Storage {name: "Michael", length: 1}
```

### 读取数据

```js
localStorage.getItem("name") //读取保存在localStorage对象里名为name的变量的值
localStorage.name

localStorage.valueOf() //读取存储在localStorage上的所有数据
localStorage.key(0) // 读取第s一条数据的变量名(键值)

//遍历并输出localStorage里存储的名字和值
for(let i=0; i<localStorage.length;i++){
  console.log(localStorage.key(i)+''+localStorage.getItem(localStorage.key(i)));
}
```

所以，相当于localstorage上得有变量或者后面需要点上一个参数，如果单纯的让localstorage等于一个变量的话其实是没有存到上面

### 删除数据

这是 MDN 的案例，可以移除一个或者所有的 localStorage

```js
localStorage.setItem('myCat', 'Tom');
let cat = localStorage.getItem('myCat');
localStorage.removeItem('myCat');
localStorage.clear(); // 移除所有
```


### react项目使用

用户在登录界面中，用户首次登录需要输入用户名和密码，如果登录成功后，服务器会返回一个 token（相当于游戏中的盾牌），使用这个 token 在后续的请求中避免每次发送用户名和密码进行验证。下面在react中使用 localStorage 存储一个用户登录信息。

```jsx
import React, { Component } from 'react';

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      userName:"",
      password:""
    }
  }
  
  //请求接口
  userOnLine = () => {
    let storage = window.localStorage;
    axios.post("/safemgmt/api/admin/login", {
      username:this.state.userName,
      password:this.state.password,
    }).then( res => {
      if(res.data.code === "0"){
        window.location.href = "#/admin/home";
      }
      // 登录成功后，将token存储到localStorage中
      storage.token = res.data.result.token;
      // 设置以后的请求配置：把token放在请求头中(不需要每次传入用户名和密码)
      axios.interceptors.request.use(function(config) {
        config.withCredentials = true
        config.headers = {
          token : storage.token
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
    });
  }
  
  render() {
    return (<div></div>);
  }
}
export default Login;
```

### 异常处理

SecurityError：请求违反了一个策略声明，或者源（ origin ）不是 [一个有效的 scheme/host/port tuple](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Definition_of_an_origin) （例如如果origin使用 `file:` 或者 `data:` 形式将可能发生）。比如，用户可以有禁用允许对指定的origin存留数据的浏览器配置。
