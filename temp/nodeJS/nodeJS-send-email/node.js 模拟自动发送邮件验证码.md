# node.js 模拟自动发送邮件验证码

### 引言

我们在开发网站时，发送验证码的功能是必定会遇到的，但发送短信验证码是需要付费的，那么邮箱验证码就是一个白嫖的好办法，今天就来教大家用node如何自动发送邮箱验证码。

### 正文

接下来跟着我的步骤走，就能轻松完成邮箱的自动发送

#### 1.  QQ邮箱设置

点击设置-账户-打开 POP3/SMTP 服务，QQ邮箱需要通过手机验证码验证

然后可以获取一个 POP3 的授权码，在第三方（本地NodeJS）中通过授权码设置并发送邮件

已经验证邮箱：233 验证码：ybospzvlfbijecih

#### 2. 安装nodemailer
~~~bash
npm i -S nodemailer
~~~

#### 3.配置信息

~~~js
//1. 导入nodemailer
const nodemailer = require('nodemailer')

//2. 创建运输对象
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secure: true,
  auth: {
    user: '5641132547@qq.com',//输入你开启SMTP服务的QQ邮箱
    pass: 'oxpbfzjtnurbjhei' //输入我们刚才获得的那串字符
  }
})

//3.配置发送邮件的信息
let mailOptions = {
  from: '5641132547@qq.com', // 发送者,也就是你的QQ邮箱
  to: '12938203121@qq.com', // 接受者邮箱,可以同时发送多个,以逗号隔开
  subject: '测试发送邮件', // 邮件标题
  html: `
<p>这是我的测试邮件</p>
<p>哈哈哈，收到请回复</p>	
`      //邮件内容，以html的形式输入，在邮件中会自动解析显示
};

//4.发送邮件
transporter.sendMail(mailOptions, function(err, data){
  //回调函数，用于判断邮件是否发送成功
  ...
})
~~~

#### 4.综合
但我们会发现，通常发送邮件是作为一个工具，目标邮箱，也就是我们要发送过去的邮箱，通常是会变化的，那我们就需要把代码封装一下，接下来放一个完整的代码。

~~~js
/*  文件名： sendEmail.js    */

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secure: true,
  auth: {
    user: '5641132547@qq.com',
    pass: 'asdasfsfwqqw' 
  }
});

module.exports = async function fn(email, code){
  let status = null
  await new Promise((resolve, reject) => {
    transporter.sendMail({
      from: '5641132547@qq.com',
      to: email, 
      subject: '网站账户注册验证码',
      html: `
<p>网站账户注册验证码：</p>
<span style="font-size: 18px; color: red">` + code + `</span>`

    }, function (err, info) {
      if (err) {
        status = 0
        reject()
      } else {
        status = 1
        resolve()
      }
    });
  })
  return status
}
~~~
文件名  main.js

~~~js
/*  文件名  main.js  */

//导入我们sendEmail.js文件中导出的东西
const sendEmail = require('./sendEmail.js')

//此时sendEmail是一个函数，可传参数有 email, code , 执行完会返回一个status, 用于判断是否发送成功
const result = sendEmail('190380192@qq.com', 568712)
if(result === 0) {
  console.log('邮件发送失败')
}
else if(result === 1) {
  console.log('邮件发送成功')
}
~~~

最后我们就会收到这样一封邮件啦

#### 5.讲解
对于上一部分对整个代码的封装当中， 可能大家对 async 和 await 这两个关键词有点陌生，这里我就给大家简单讲解一下吧，如果想深入了解的，可以去查阅ES7的资料进行了解。

首先， 我们的发送邮箱是属于异步操作的。 async 是 用于表示函数中存在异步操作， 而 await 后面必须给嗯一个Promise , 则在这个函数内，必须要等到 await 后面的 Promise 内的函数执行完毕以后，才会继续往下执行。



### 参考文章

原文链接：https://blog.csdn.net/l_ppp/article/details/106085864

https://nodemailer.com/about/

https://blog.csdn.net/l_ppp/article/details/106085864?utm_medium=distribute.pc_category.273470.nonecase&depth_1-utm_source=distribute.pc_category.273470.nonecase