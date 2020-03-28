# 常用第三方库介绍

这部分第三方库是我经常使用或者接触的第三方库。

我们要站在巨人的肩膀上摘苹果，不要重复造轮子。当然，过多使用第三方轮子可能造成兼容性问题，项目代码繁杂，第三方潜在的风险，第三方不能满足我们的需求。

### UI 框架

- bootstrap
- Ant-Design
- Font-awesome
- iscroll-master

### React 系列

- react
- react-data-grid
- react-mentions
- react-motion
- react-responsr
- react-select
- react15-modal-demo
- reactstrap
- immutable

### 编辑器

- GGEditor
- codemirror
- echarts
- editorJS
- slate

### 文件操作

- file-upload
- seafile
- zipJS

### 图片编辑

基本上基于canvas，是单独的图片编辑工具，适应于 PC 端编辑图片，移动端不确定使用效果

### cropper 

cropper.js 这是国内同行写的组件，星标 7.8K，比较稳定。缺点：最新版本基于Jquery，早期版本原生JS。代码链接：https://fengyuanchen.github.io/cropper/

###  fabricjs

国外同行写的组件，github stars15K，代码成熟稳定。功能强大，适合矢量图和栅格图的编辑，Javascript Canvas Library, SVG-to-Canvas (& canvas-to-SVG) Parser。官网链接：http://fabricjs.com/；https://github.com/fabricjs/fabric.js

### EaselJS

功能强大，支持复杂的图片编辑。github stars 7.5K。Easel Javascript库提供了完整的分层显示列表，核心交互模型和帮助程序类，使使用HTML5 Canvas元素更加容易。这是一个用于在HTML5中构建高性能交互式2D内容的库。 它提供了功能丰富的显示列表，可让您操作和制作图形动画。 它还为鼠标和触摸交互提供了强大的交互模型。它非常适合构建游戏，生成艺术，广告，数据可视化以及其他高度图形化的体验。 它可以单独使用，也可以与其他CreateJS套件（SoundJS，PreloadJS和TweenJS）配合使用。它没有外部依赖关系，可以与使用的任何框架兼容。支持复杂图片编辑：液化蒙版模糊等

官网链接：http://createjs.com/；https://www.createjs.com/easeljs；https://github.com/CreateJS/EaselJS

### fabric-photo

这个是国内作者，基于思路2的代码，做出的React兼容的库。优点：和React兼容。缺点：github stars 80 较少。https://github.com/ximing/fabric-photo



### 移动端操作

说明：下面是基于 React 的移动端 UI 框架

#### 1、frozenUI

stars: 2.9k 由腾讯团队开发，使用iconfont展示图标，包含了按钮，列表，表单，提示，弹窗等常用组件。使用sass编写css代码。使用简单（静态CSS代码）。官网链接：<http://frozenui.github.io/>

 `<link rel="stylesheet" href="http://i.gtimg.cn/vipstyle/frozenui/2.0.0/css/frozen.css">`


#### 2、MUI

Stars: 12k。MUI不依赖任何第三方JS库，压缩后的JS和CSS文件仅有100+K和60+K；接近原生 APP 体验。有很多原生APP的组件，单独做移动端的网页的话比较麻烦，适合做APP混合开发。官网链接：<https://dev.dcloud.net.cn/mui/>


#### 3、AmazeUI

stars 13k，国内首家 UI 框架，官网链接 [https://amazeui.clouddeep.cn](https://amazeui.clouddeep.cn/) 

#### 4、SUI

Stars: 6k。淘宝团队 主要借鉴 **Framework7** 的形态并以此为基础，核心库压缩Gzip后的JS、CSS网络传输体积**总共只有52K**。<http://m.sui.taobao.org/>


#### 5、Ant-design

stars: 7k 蚂蚁金服团队主要用于淘宝支付宝；UI 风格和 calendar 组件类似。<https://mobile.ant.design/index-cn>

#### 6、React WeUI

基于微信和 React 框架制作，没有在 github 上开源。官网链接：<https://weui.github.io/react-weui/docs/#/react-weui/docs/page/0/articles/0>

### 其他

html5shiv-master
i18n
water-mark
jQuery
jest
response
svg
swiper
text-runner-JS
zepto

### 

## 打包工具

- [webpack](https://github.com/webpack/webpack) - 打包项目。
- [rollup](https://github.com/rollup/rollup) - 打包 npm 库。
- [parcel](https://github.com/parcel-bundler/parcel) - webpack 竞品，但发展前景不乐观，再观察一段时间。
- [systemjs](https://github.com/systemjs/systemjs) - 针对一些特殊场景会比较有用，比如云 ide，支付宝小程序 IDE 等。
- [microbundle](https://github.com/developit/microbundle) - 基于 rollup，简化配置。
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
- [vue-cli](https://github.com/vuejs/vue-cli)
- [create-react-app](https://github.com/facebook/create-react-app)
- [webpack-merge](https://github.com/survivejs/webpack-merge) - 合并 webpack 配置。
- [webpack-chain](https://github.com/neutrinojs/webpack-chain) - 通过 chain 风格 api 的方式修改 webpack 配置。

### webpack loader 和插件

- [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin) - 性能提升 70%，但有坑。
- [svgr](https://github.com/smooth-code/svgr) - svg 转 react 组件。
- [postcss](https://github.com/postcss/postcss) - CSS 界的 babel。
- [autoprefixer](https://github.com/postcss/autoprefixer) - 为 CSS 选择权自动加 prefix。
- [cssnano](https://github.com/cssnano/cssnano) - CSS 压缩，也有类 preset 的概念。
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) - 提取 CSS 为单独文件。
- [webpackbar](https://github.com/nuxt/webpackbar) - webpack 进度条。
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) - 构建产物占比分析。
- [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) - JS 压缩，产物为 ES5 语法。
- [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) - JS 压缩，产物为 ES6 语法。
- [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin) - 生成 manifest.json。
- [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) - 复制额外的文件到输出目录。
- [case-sensitive-paths-webpack-plugin](https://github.com/Urthen/case-sensitive-paths-webpack-plugin) - 大小写敏感检测，能规避一些问题，但构建时性能消耗较大。
- [css-hot-loader](https://github.com/shepherdwind/css-hot-loader) - CSS 热更新，搭配 mini-css-extract-plugin 使用。
- [duplicate-package-checker-webpack-plugin](https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin) - 重复依赖检测。

## 包管理

- [yarn](https://github.com/yarnpkg/yarn)
- [npm](https://github.com/npm/cli) 这个市场占有率更高

## babel

- [babel](https://github.com/babel/babel) 把ES6转换成ES5必备的工具
- [babel-plugin-rawest](https://github.com/sokra/rawact) - React 的 DOM 直出方案。
- [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) - 前端文件写 node 逻辑。
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) - 有些场景下会需要禁用 `import()` 语法。
- [babel-plugin-react-require](https://github.com/vslinko/babel-plugin-react-require) - 自动为 jsx 语法加 react 引用。
- [babel-plugin-react-remove-prop-types](https://github.com/nkt/babel-plugin-react-remove-prop-types) - 删除 prop-types，生产环境用。

## 测试

- [jest](https://github.com/facebook/jest) 适合单元测试
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [enzyme](https://github.com/airbnb/enzyme)
- [jsdom](https://github.com/jsdom/jsdom)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [react-test-rerender](https://github.com/facebook/react/tree/master/packages/react-test-renderer) - 官方出品。
- [react-testing-library](https://github.com/kentcdodds/react-testing-library) - kentcdodds 出品。

## 框架

- [react](https://github.com/facebook/react)
- [vue](https://github.com/vuejs/vue)
- [next.js](https://github.com/zeit/next.js)
- [nuxt.js](https://github.com/nuxt/nuxt.js)
- [gastby](https://github.com/gatsbyjs/gatsby)
- [umi](https://github.com/umijs/umi)
- [choo](https://github.com/choojs/choo)
- [taro](https://github.com/NervJS/taro)
- [after.js](https://github.com/jaredpalmer/after.js)

## react 相关库

- [preact](https://github.com/developit/preact)
- [inferno](https://github.com/infernojs/inferno)
- [react-router](https://github.com/ReactTraining/react-router)
- [reach-router](https://github.com/reach/router)
- [router5](https://github.com/router5/router5)
- [react-loadable](https://github.com/jamiebuilds/react-loadable)
- [ant-design](https://github.com/ant-design/ant-design)
- [material-ui](https://github.com/mui-org/material-ui)
- [react-intl](https://github.com/yahoo/react-intl)
- [react-dnd](https://github.com/react-dnd/react-dnd)
- [react-helmet](https://github.com/nfl/react-helmet)

## 数据流

- [redux](https://github.com/reduxjs/redux)
- [immer](https://github.com/mweststrate/immer)
- [mobx](https://github.com/mobxjs/mobx)
- [unstated](https://github.com/jamiebuilds/unstated)
- [rxjs](https://github.com/ReactiveX/rxjs)
- [dva](https://github.com/dvajs/dva)
- [rematch](https://github.com/rematch/rematch) - 基于 redux。

## redux 扩展

- [react-redux](https://github.com/reduxjs/react-redux) - 绑定 react 和 redux，这个名字取得不好，react-redux 还是 redux-react 老是记不清楚。
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [redux-persist](https://github.com/rt2zz/redux-persist)
- [redux-bundler](https://github.com/henrikjoreteg/redux-bundler)
- [redux-box](https://github.com/anish000kumar/redux-box)

## vue 相关库

- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)

## 工具类

- [history](https://github.com/ReactTraining/history)
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp)
- [lodash](https://github.com/lodash/lodash)
- [fastclick](https://github.com/ftlabs/fastclick)

## 性能优化

- [workbox](https://github.com/GoogleChrome/workbox) - PWA 方案，Google 出品。
- [critical](https://github.com/addyosmani/critical) - 提取关键 CSS。

## 其他语言

- [typescript](https://github.com/Microsoft/TypeScript)
- [flow](https://github.com/facebook/flow)
- [graphql](https://github.com/graphql/graphql-js)

## 文档

- [vuepress](https://github.com/vuejs/vuepress)
- [docz](https://github.com/pedronauck/docz)

## 工程

- [lerna](https://github.com/lerna/lerna) - monorepo 管理。
- [lerna-changelog](https://github.com/lerna/lerna-changelog) - 为 lerna 项目自动生成 changelog。
- [eslint](https://github.com/eslint/eslint) - JS 风格约束。
- [eslint-config-airbnb](https://github.com/airbnb/javascript)
- [prettier](https://github.com/prettier/prettier) - 更主观的风格自动修改。
- [yeoman-generator](https://github.com/yeoman/generator) - 脚手架工具。
- [serve](https://github.com/zeit/serve) - 本地静态服务器。
- [np](https://github.com/sindresorhus/np) - npm publish 辅助，自动 push、打 tag、升版本等。
- [lint-staged](https://github.com/okonet/lint-staged) - eslint 提速，只 lint 提交的代码。
- [coveralls](https://github.com/marketplace/coveralls) - 覆盖率。
- [husky](https://github.com/typicode/husky) - 添加 git hooks。
- [cross-env](https://github.com/kentcdodds/cross-env) - 跨平台的环境变量声明。
- [projj](https://github.com/popomore/projj) - 本地 git 项目管理，支持 github 和 gitlab。

## 编辑器

- [VSCode](https://code.visualstudio.com/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) - 我用这个。
- [codesandbox](https://codesandbox.io/)
- [stackblitz](https://stackblitz.com/)

## css

- [css modules](https://github.com/css-modules/css-modules)
- [emotion](https://github.com/emotion-js/emotion)

## 命令行

- [yargs](https://github.com/yargs/yargs) - 命令行入口套件。
- [yargs-parser](https://github.com/yargs/yargs-parser) - 命令行参数解析。
- [chalk](https://github.com/chalk/chalk) - 输出不同颜色。
- [cheerio](https://github.com/cheeriojs/cheerio) - 用类 jQuery 语法处理 HTML。
- [chokidar](https://github.com/paulmillr/chokidar) - 文件监听。
- [clipboardy](https://github.com/sindresorhus/clipboardy) - 复制文本到粘贴板。
- [debug](https://github.com/visionmedia/debug) - 打印调试信息。
- [deprecate](https://github.com/brianc/node-deprecate) - 给过期警告。
- [glob](https://github.com/isaacs/node-glob) - 文件查找。
- [signale](https://github.com/klaussinani/signale) - 漂亮的日志打印。
- [semver](https://github.com/npm/node-semver) - semver 版本处理。
- [update-notifier](https://github.com/yeoman/update-notifier) - 更新提醒。
- [rimraf](https://github.com/isaacs/rimraf) - 删除文件。

## 请求处理

- [whatwg-fetch](https://github.com/github/fetch)
- [got](https://github.com/sindresorhus/got)
- [axios](https://github.com/axios/axios)
- [request](https://github.com/request/request)
- [reqwest](https://github.com/ded/reqwest)

## 其他

这部分是 nodeJS 等第三方库

[electron](https://github.com/electron/electron)
[async](https://www.npmjs.com/package/async)                异步操作管理            
[bl](https://www.npmjs.com/package/bl)                      二进制数据解析          
[bluebird](https://www.npmjs.com/package/bluebird)          异步操作管理            
[browserify](https://www.npmjs.com/package/browserify)      发布浏览器可用的包      
[bunyan](https://www.npmjs.com/package/bunyan)              日志（logging）管理     
[chai](https://www.npmjs.com/package/chai)                  断言                    
[chalk](https://www.npmjs.com/package/chalk)                命令行彩色输出          
[co](https://www.npmjs.com/package/co)                      异步流程管理            
[colors](https://www.npmjs.com/package/colors)              命令行彩色输出          
[commander](https://www.npmjs.com/package/commander)        命令行工具              
[debug](https://www.npmjs.com/package/debug)                Debug输出器             
[dockerode](https://www.npmjs.com/package/dockerode)        Docker管理              
[duplexify](https://www.npmjs.com/package/duplexify)        Stream流操作工具        
[event-stream](https://www.npmjs.com/package/event-stream)  Stream流操作工具        
[express](https://www.npmjs.com/package/express)            Server服务器框架        
[glob](https://www.npmjs.com/package/glob)                  文件名匹配              
[grunt](https://www.npmjs.com/package/grunt)                构建工具                
[gulp](https://www.npmjs.com/package/gulp)                  构建工具                
[hapi](https://www.npmjs.com/package/hapi)                  Server服务器框架        
[hyperquest](https://www.npmjs.com/package/hyperquest)      轻量级HTTP客户端        
[istanbul](https://www.npmjs.com/package/istanbul)          测试用例覆盖率分析      
[JSONStream](https://www.npmjs.com/package/JSONStream)      Stream流管理工具        
[koa](https://www.npmjs.com/package/koa)                    Server服务器框架        
[levelup](https://www.npmjs.com/package/levelup)            LevelDB                 
[lodash](https://www.npmjs.com/package/lodash)              函数式编程工具          
[log4js](https://www.npmjs.com/package/log4js)              日志（logging）管理工具 
[minimatch](https://www.npmjs.com/package/minimatch)        文件名匹配              
[minimist](https://www.npmjs.com/package/minimist)          命令行操作              
[mocha](https://www.npmjs.com/package/mocha)                单元测试                
[moment](https://www.npmjs.com/package/moment)              日期时间输出            
[mongodb](https://www.npmjs.com/package/mongodb)            MongoDB                 
[mysql](https://www.npmjs.com/package/mysql)                MySQL                   
[nconf](https://www.npmjs.com/package/nconf)                配置工具                
[needle](https://www.npmjs.com/package/needle)              轻量级HTTP客户端        
[node-fetch](https://www.npmjs.com/package/node-fetch)      Fetch API               
[nodemailer](https://www.npmjs.com/package/nodemailer)      Email客户端             
[passport](https://www.npmjs.com/package/passport)          登录和认证              
[pg](https://www.npmjs.com/package/pg)                      Postgres                
[pump](https://www.npmjs.com/package/pump)                  Stream流管理工具        
[redis](https://www.npmjs.com/package/redis)                Redis                   
[request](https://www.npmjs.com/package/request)            HTTP客户端              
[restify](https://www.npmjs.com/package/restify)            REST API搭建            
[socket.io](https://www.npmjs.com/package/socket.io)        WebSocket实时通信       
[split2](https://www.npmjs.com/package/split2)              Stream流管理工具        
[tape](https://www.npmjs.com/package/tape)                  单元测试                
[through2](https://www.npmjs.com/package/through2)          Stream流管理工具        
[underscore](https://www.npmjs.com/package/underscore)      函数式编程工具          
[ws](https://www.npmjs.com/package/ws)                      Websockets              
[xml2js](https://www.npmjs.com/package/xml2js)              XML转换为JavaScript     

