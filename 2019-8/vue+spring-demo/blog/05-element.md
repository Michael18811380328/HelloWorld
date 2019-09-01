之前我们实现了登录功能，但不得不说登录页面实在是太简陋了。在这个看脸的社会，如果代码写的烂，界面也做得不好看，就真的没得救了。但是如果不是专职做 UI 设计，又没有必要浪费这么多时间在上面，所以我们需要借助一些工具来制作我们的页面。

Element - The world’s most popular Vue UI framework，你值得拥有。此时我特别想高喊一句 “PHP 是世界上最好的语言”，现在搜啥啥都说自己是最好的，输什么不能输气势啊。先看一下修改完的登录页面

当然，Element 不仅仅是界面这么简单，它对 Vue 又做了进一步的封装，可以简便地使用许多实用的功能。

（小声比比）白卷，是我们全村最好的图书管理系统。

本篇目录
一、安装并引入 Element
1.安装 Element
2.引入 Element
二、优化登录页面
1.使用 Form 组件
2.添加样式
3.设置背景
4.完整代码
一、安装并引入 Element
Element 的官方地址为 http://element-cn.eleme.io/#/zh-CN

这一部分的内容在官方文档上都有体现，我只是照搬下来。在以后我们会经常使用 Element 提供的组件，大家要自己尝试查阅文档，这个是中文的，还是很好理解的。

1.安装 Element
根据官方文档的描述，在项目文件夹下，执行 npm i element-ui -S 即可


2.引入 Element
引入分为完整引入和按需引入两种模式，按需引入可以缩小项目的体积，这里我们选择完整引入。

根据文档，我们需要修改 main.js 为如下内容

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
这样便完成了 Element 的引入。为了测试一下，我们打开 Login.vue，把最外层的 <div> 标签改为 <el-card>（下面是 <template> 内的完整代码）

  <el-card>
      用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      <br><br>
      密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button v-on:click="login">登录</button>
  </el-card>
1
2
3
4
5
6
7
然后访问 http://localhost:8080/#/login ，查看效果

嗯，还是很丑，但是成功了。

二、优化登录页面
首先，让我们去掉这个清奇的 V ，打开 App.vue，把 <img src="./assets/logo.png"> 删掉即可。不过我一般喜欢先注释掉，确定没有影响了再删除。


1.使用 Form 组件
让我们来修改 Login.vue 的代码。原来是这样的

<template>
  <el-card>
      用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      <br><br>
      密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button v-on:click="login">登录</button>
  </el-card>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
      login () {
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {
          })
      }
    }
  }
</script>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
为了设计界面，我们需要关注的地方是 <template> 标签内的 html 和 <style> 标签内的 css。登录框我们一般会用 Form 来做，打开 Element 的组件文档（http://element-cn.eleme.io/#/zh-CN/component/），发现它为我们提供了丰富的 Form 组件，我们可以点击“显示代码”，复制我们需要的部分。

不过这里好像并没有特别符合我们应用场景的表单，或者说这些都是比较复杂的，我们只需要其中的一小部分。把页面再往下拉，可以看到关于这个组件的属性、事件、方法等的文档，根据这个文档，我们可以自己去构建需要的表单。

首先，我们修改 <template> 里的代码如下

<template>
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
上面的代码应该很好理解，<el-form> 里面可以放置 <el-form-item>，<el-form-item> 里面再放置其它的内容，比如 <el-input>，关于 <el-input> 的属性，可以查阅 Input 的文档，<el-button> 亦然。

在开发前端的内容时，我们修改了代码，就可以对应地看到效果，而不用重启项目。我一般会把浏览器也开着，以便实时监测。修改完上面的内容，页面变成了这样


2.添加样式
为了进一步优化界面，我们为组件再添加一些样式，即在 Login.vue 的最后添加如下代码

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
刷新页面（Ctrl + F5），看起来顺眼多了


3.设置背景
最后，我们为这个单调的登录页面设置一个背景。我在网上找了这张图

可以把它保存下来，放在 src\assets 文件夹下，命名为 eva.jpg 在 build 项目时，这个文件夹里的图片会被自动转成 base64。也可以在这个文件夹里再新建文件夹，方便管理。

为了使用背景图片，我在 <el-form> 标签的外又添加了一个父标签 <body>，id 设置为 poster，并在 <style> 中添加如下内容

  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
1
2
3
4
5
6
7
8
9
10
11
之所以还要再写一个 body 的样式，是为了覆盖掉浏览器（用户代理）的默认样式。添加后保存，则可以看到如下效果

这时候发现界面上方有一片空白，经过查找，发现问题出在 App.vue 里，把下面这句代码删除即可

OK，又一次大功告成了。

另外可以在 Login.vue 的 data 方法中设置输入框的默认值，省的每次进来都要再输一遍。

4.完整代码
最后附上 Login.vue 的完整代码，可以直接复制

<template>
  <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: 'admin',
          password: '123'
        },
        responseResult: []
      }
    },
    methods: {
      login () {
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {
          })
      }
    }
  }
</script>

<style>
  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
至此，登录页面的开发似乎已经较为完善了，但其实还没有完，因为这个登录页面其实没有用，别人直接输入首页的网址，就可以绕过登录页面。为了让它发挥作用，我们还需要开发一个拦截器。

下一篇文章主要讲解以下内容：

一、前端路由的 hash 模式与 history 模式
二、history 模式下后端错误页面的配置
三、登录拦截的实现

为什么要在登录页面上废这么多篇幅呢？因为把这个页面做完，就差不多理解了项目的构成，之后的开发就可以把精力集中在业务功能的实现上了。之后的基本模式，就是前端开发组件、后端开发控制器，调试功能，做起来会很快。

查看系列文章目录：
https://blog.csdn.net/Neuf_Soleil/article/details/88925013
--------------------- 
版权声明：本文为CSDN博主「Evan-Nightly」的原创文章，遵循CC 4.0 by-sa版权协议，转载请附上原文出处链接及本声明。
原文链接：https://learner.blog.csdn.net/article/details/89298717