本篇目录
前言
一、安装 Vue CLI
二、构建前端项目
1.通用方法
2.使用 IDE (IntelliJ IDEA)
三、Vue 项目结构分析
1.概览
2.index.html
3.App.vue
4.main.js
前言
从这篇文章开始，就进入真正的实践了。

在前端项目开发中，我们可以根据实际情况不同程度地使用 Vue。利用 Vue CLI（或写成 vue-cli，即 Vue 脚手架）搭建出来的项目，是最能体现 Vue 的特性的。这点在接下来的内容中我们可以慢慢感受。

关于项目的构建其实类似的文章网上有很多，但我还是重新写了一下，一是为了确保项目能够运行成功，二是对几个细节作了解释，三是加入了使用 IDE 的构建方法。

在动手操作之前，我希望大家已经清楚什么是 “前后端分离” ，什么是 “单页面应用” 。

简单地说，前后端分离 的核心思想是前端页面通过 ajax 调用后端的 restuful api 进行数据交互，而 单页面应用（single page web application，SPA），就是只有一张页面，并在用户与应用程序交互时动态更新该页面的 Web 应用程序。

附上 Vue 的官方教程：
https://cn.vuejs.org/v2/guide/

这是第一手的学习资料，本篇的实践内容虽然用不上，但是日后要经常查阅。

一、安装 Vue CLI
因为需要使用 npm 安装 Vue CLI，而 npm 是集成在 Node.js 中的，所以第一步我们需要安装 Node.js，访问官网 https://nodejs.org/en/，首页即可下载。

图中左边是长期支持版本，右边是当前版本，下载哪个都行，我一般选择长期支持版本。

下载完成后运行安装包，一路下一步就行。然后在 cmd 中输入 node -v，检查是否安装成功。

如图，出现了版本号（根据下载时候的版本确定），说明已经安装成功了。同时，npm 包也已经安装成功，可以输入 npm -v 查看版本号

输入 npm -g install npm ，将 npm 更新至最新版本。


之后可以选择安装 cnpm，即 npm 的国内镜像。使用 cnmp 的好处是在日后下载内容时会比较快，但是下载的包可能不是最新的。

安装 cnpm 的命令为 ：

npm install -g cnpm --registry=https://registry.npm.taobao.org

完成后就可以使用 cnpm 替代 npm 了，我不太喜欢用 cnpm，喜欢用的小伙伴注意一点，cnpm 不要与 npm 混合使用，一个项目用 cnpm 就从头用到底，不要中途敲错命令，否则就会出现混乱。不过万一遇到这种情况也不用慌，把项目的 node_modules 文件夹删了重新执行 npm/cnpm install 就行了，只是比较浪费时间。

之后，使用 npm install -g vue-cli 安装脚手架。

接下来，就可以搭建我们的前端项目了。

二、构建前端项目
1.通用方法
直接使用命令行构建项目。首先，进入到我们的工作文件夹中，我在 D 盘新建了一个叫 workspace 的文件夹，大家可以自行选择位置。

然后执行命令 vue init webpack wj-vue，这里 webpack 是以 webpack 为模板指生成项目，还可以替换为 pwa、simple 等参数，这里不再赘述。 wj-vue 是我们的项目名称（White Jotter），大家也可以起别的名字。

在程序执行的过程中会有一些提示，可以按照默认的设定一路回车下去，也可以按需修改，比如下图问我项目名称是不是 wj-vue，直接回车确认就行。


这里还会问是否安装 vue-router，一定要选是，也就是回车或按 Y，vue-router 是我们构建单页面应用的关键。

还有是否使用 es-lint，这玩意儿挺烦的，但为了代码质量先将就一下吧。

接下来等待项目构建完成就 OK 了。

可以看到 workspace 目录下生成了项目文件夹 wj-vue，里面的结构如图

接下来，进入到我们的项目文件夹里(cd D:\workspace\wj-vue)，执行npm run dev

项目构建成功，这一步如果报错，可能是未能加载项目所需的依赖包，即 node_modules 里的内容，需要在该文件夹执行 npm -install ，再执行 npm run dev

访问 http://localhost:8080，查看网页 demo，大工告成！


2.使用 IDE (IntelliJ IDEA)
对于习惯使用 IDE 的同学，可以使用更直观的方式构建项目。以 IntelliJ IDEA 为例，点击 Create New Project

然后选择 Static Web -> Vue.js，点击 next，输入相关参数


这里注意 Project location 需要输入到项目文件夹一级而不是 workspace。输入完成后点击 Next，等待 Vue CLI 初始化，然后在可视化界面上确认项目信息，修改或 Next 即可。IDEA 构建出的 Vue 项目是不含 node_modules 的，所以要先调出终端，执行 npm install

运行完成后，输入 npm run dev 即可。

另外 IDE 嘛，总是在 UI 上下了很多功夫，我们还可以在 package.json 文件上点击右键，选择 show npm scripts

然后就会出来 npm 命令窗口，想要执行哪个命令直接双击运行就可以了。

这些命令都是在 package.json 文件里预定义的。dev 和 start 是一样的，start 即是执行 npm run dev 命令

另外使用这种方法，可以激活 IDE 右上角的按钮，不过这些都不重要了。

上面的内容应该足够详细了，如果大家还是遇到了问题，可以在评论区反馈一下，我会第一时间解答。

三、Vue 项目结构分析
1.概览
使用 CLI 构建出来的 Vue 项目结构是这个样子的

里面我们需要关注的内容如下图，重点需要关注的我用小红旗标了出来

其中我们最常修改的部分就是 components 文件夹了，几乎所有需要手动编写的代码都在其中。

接下来我们分析几个文件，目的是理解各个部分是怎么联系到一起的。

2.index.html
首页文件的初始代码如下：

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>wj-vue</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
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
就是一个普普通通的 html 文件，让它不平凡的是 <div id="app"></div> ，下面有一行注释，构建的文件将会被自动注入，也就是说我们编写的其它的内容都将在这个 div 中展示。

还有不普通的一点是，整个项目只有这一个 html 文件，所以这是一个 单页面应用，当我们打开这个应用，表面上可以有很多页面，实际上它们都只不过在一个 div 中。

3.App.vue
上面图上我把这个文件称为“根组件”，因为其它的组件又都包含在这个组件中。

.vue 文件是一种自定义文件类型，在结构上类似 html，一个 .vue 文件即是一个 vue 组件。先看它的初始代码

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
大家可能注意到了，这里也有一句 <div id="app">，但跟 index.html 里的那个是没有关系的。这个 id=app 只是跟下面的 css 对应。

<script>标签里的内容即该组件的脚本，也就是 js 代码，export default 是 ES6 的语法，意思是将这个组件整体导出，之后就可以使用 import 导入组件了。大括号里的内容是这个组件的相关属性。

这个文件最关键的一点其实是第四行， <router-view/>，是一个容器，名字叫“路由视图”，意思是当前路由（ URL）指向的内容将显示在这个容器中。也就是说，其它的组件即使拥有自己的路由（URL，需要在 router 文件夹的 index.js 文件里定义），也只不过表面上是一个单独的页面，实际上只是在根组件 App.vue 中。

4.main.js
前面我们说 App.vue 里的 <div id="app"> 和 index.html 里的 <div id="app"> 没有关系，那么这两个文件是怎么建立联系的呢？让我们来看入口文件 main.js 的代码

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
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
这里插一嘴，这个 js 文件有的同学可能看着不顺眼，比如没有分号（;），因为是 ES6 的语法，不这么写反而会提示错误，虽说可以把 es-lint 改了或者关了，但我想熟悉一下新的规则也挺好。

最上面 import 了几个模块，其中 vue 模块在 node_modules 中，App 即 App.vue 里定义的组件，router 即 router 文件夹里定义的路由。

Vue.config.productionTip = false ,作用是阻止vue 在启动时生成生产提示。

在这个 js 文件中，我们创建了一个 Vue 对象（实例），el 属性提供一个在页面上已存在的 DOM 元素作为 Vue 对象的挂载目标，router 代表该对象包含 Vue Router，并使用项目中定义的路由。components 表示该对象包含的 Vue 组件，template 是用一个字符串模板作为 Vue 实例的标识使用，类似于定义一个 html 标签。

看完了以上三个文件，我想基本上就对前端项目的结构有所了解了。下一篇中我将用一个例子解释前后端分离的项目是如何联系起来的。

查看系列文章目录：
https://learner.blog.csdn.net/article/details/88925013

下一篇：
「Vue + Spring Boot 项目实战（三）：前后端结合测试（登录页面开发）」
--------------------- 
版权声明：本文为CSDN博主「Evan-Nightly」的原创文章，遵循CC 4.0 by-sa版权协议，转载请附上原文出处链接及本声明。
原文链接：https://learner.blog.csdn.net/article/details/88926242