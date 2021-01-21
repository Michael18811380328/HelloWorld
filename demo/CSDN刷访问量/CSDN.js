// get links from strings
var str = `<a href="https://blog.csdn.net/weixin_41697143/article/details/81049778" target="_blank">Web前端开发标准规范总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049809" target="_blank">最全面计算机英语单词列表（一）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88622936" target="_blank">CSS-界面滚动时不显示滚动条</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837145" target="_blank">React中loading界面处理</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81126291" target="_blank">Cannot read property innerHTML of null 报错信息</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82810451" target="_blank">React中获取元素位置</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837076" target="_blank">JavaScript暂停函数(JS中SLEEP函数)</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/87607578" target="_blank">使用 Python 自动生成 HTML</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80784701" target="_blank"><span class="article-type type-2 float-none">转载</span>Cross origin requests are only supported for protocol schemes浏览器报错及解决方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81840623" target="_blank">Blob和File对象API与兼容性问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837369" target="_blank">github提交PR（pull request）过程和问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82758886" target="_blank">JS实现异步请求的四种方法对比</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88181212" target="_blank">GG-Editor介绍-在线绘图软件</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89027238" target="_blank">zipJS 前端压缩使用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81506299" target="_blank">commit your changes or stash them before you can merge 解决方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/85212334" target="_blank">AttributeError：object has no attribute 报错及解决</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82758630" target="_blank">CDN在前端开发中的作用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837293" target="_blank">github删除本地分支和远程分支</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82810571" target="_blank">React Event 事件系统</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81989705" target="_blank">前端单元测试mocha和jest</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82895445" target="_blank">Intervention Slow network is detected 报错及解决方案</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/87632085" target="_blank">React-select 基本功能学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049798" target="_blank">setInterval和setTimeout的性能问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89026849" target="_blank">Editor.js 使用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84196494" target="_blank">JS 性能问题优化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89374791" target="_blank">Warning: A component is changing an uncontrolled input of type text to be controlled 报错分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049823" target="_blank">ArgumentError：invalid byte sequence in UTF-8 错误原因及分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84981130" target="_blank">Super expression must either be null or a function not undefined 报错及解决</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82810306" target="_blank">Failed to load resource: net::ERR_BLOCKED_BY_CLIENT 报错及解决方案</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103401207" target="_blank">Browserslist: caniuse-lite is outdated. Please run next command npm update caniuse-lite browserslis</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82110276" target="_blank">简述override和overload的区别</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83245782" target="_blank">web前端技术路线</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79835117" target="_blank">前端设计与用户体验</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79912195" target="_blank">电商网站前端代码特点分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80723740" target="_blank">web前端设计思路和用户新体验</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/98479748" target="_blank">React中使用LocalStorage用户登录</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88019260" target="_blank">前端设置 cookie 用户信息</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90401806" target="_blank">五月前端细节总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80424715" target="_blank">JS中构造函数和原型的细节分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80705610" target="_blank">前端旋转木马效果</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86089226" target="_blank">前端技术细节（不断更新中）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81066081" target="_blank">Error: Invalid CSS after and expected expression 错误原因及分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83098882" target="_blank">数据库简介（前端了解数据库）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84847655" target="_blank">React 避免重新渲染-性能优化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82913388" target="_blank">JEST前端单元测试</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/85211424" target="_blank">浏览器事件总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82758834" target="_blank">JS实现localStorage自动保存功能</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84444403" target="_blank">CLI 和 GUI 区别</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80069909" target="_blank">移动端web界面开发</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/99490779" target="_blank">npx和npm的区别</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049804" target="_blank">移动 H5 首屏秒开优化方案探讨</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86017694" target="_blank">svg绘制折线图</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86017990" target="_blank">SVG 绘制基本图像</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80978695" target="_blank">Vue和React中生命周期和钩子函数</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81813763" target="_blank">CSRF与XSS的关系与预防</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86552839" target="_blank">前端绘制小猪佩奇（CSS）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84196460" target="_blank">Python 条件判断和函数入门</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80761464" target="_blank">前端canvas制作微信小游戏（二）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83590043" target="_blank">前端与网络安全</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049812" target="_blank">最全面计算机英语单词列表（二）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80424542" target="_blank">JS中基于对象语言的特性</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/99713179" target="_blank">扫雷JS实现</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84447367" target="_blank">npm安装依赖流程</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/93977978" target="_blank">超级实用的chrome浏览器调试技巧</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80761062" target="_blank">前端canvas制作微信小游戏（一）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83589873" target="_blank">移动端指针事件和触摸事件</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80786966" target="_blank"><span class="article-type type-2 float-none">转载</span>input输入框number类型用户优化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/91524207" target="_blank">Airtable 在线数据库介绍</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/99947741" target="_blank">超级玛丽JavaScript实现（Super Mario JS recompiled）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88687133" target="_blank">Can't call setState (or forceUpdate) on an unmounted component ——React 内存泄漏问题处理</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/94554697" target="_blank">UUID库介绍和使用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/100086136" target="_blank">ssh: connect to host github.com port 22: Connection refused fatal: Could not read from remote 报错解决</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/94411200" target="_blank">favicon 尺寸问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049817" target="_blank">最全面计算机英语单词列表（三）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/85212664" target="_blank"><span class="article-type type-2 float-none">转载</span>React 高阶 API 学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/100082930" target="_blank">前端词云</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81049818" target="_blank">最全面计算机英语单词列表（四）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86693542" target="_blank">CodeMirror安装及使用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81840818" target="_blank">react框架如何优化代码(性能)？</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81126622" target="_blank">前端图片格式与浏览器性能优化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80978738" target="_blank">Vue中的事件属性四步实现</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86219954" target="_blank">文件上传五种方法对比</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82758722" target="_blank">Cookies在JS和前端中的应用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/87693707" target="_blank">python 中 turtle 库绘图</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79803661" target="_blank">前端 Ajax 异步get-post方法分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89556630" target="_blank">React data grid</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90706190" target="_blank">JavaScript语言精粹-读书笔记（1）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/85211542" target="_blank">Range对象</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88052575" target="_blank">Tooltip API 说明</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90212249" target="_blank">console.log同步与异步</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84196395" target="_blank">propTypes 在 react 中数据类型检验</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89027067" target="_blank">React-Router 学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/87695966" target="_blank">送给大龄程序员</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84847620" target="_blank">stopImmediatePropagation 事件</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79740861" target="_blank">innerHTML与innerText的关系</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/96436112" target="_blank">ladash 库 pick和omit函数介绍</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/99683362" target="_blank">贪吃蛇JS实现</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103204213" target="_blank">Pytest 安装踩坑总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/97693059" target="_blank">ECMA7 新标准</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79764329" target="_blank">JS中的原型与原型链简单分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79740932" target="_blank">JQ与原生JS的细节问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83245826" target="_blank">docker pull error：net/http: TLS handshake timeout 本周开发问题小结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81514492" target="_blank">Uncaught SyntaxError: Unexpected token JSON 报错解决方案</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88686716" target="_blank">FileReader与txt在线预览</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84767755" target="_blank">前端如何提高网站品质</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80705555" target="_blank">web前端与浏览器性能问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89785596" target="_blank">Slate 框架更新-删除文本节点的 leaves 属性</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83590009" target="_blank">No ‘Access-Control-Allow-Origin’ header is present on the requested resource 报错原因及解决方案</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84447991" target="_blank">React 状态提升</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/79803374" target="_blank">前端Ajax基础网络协议</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/88773925" target="_blank"><span class="article-type type-2 float-none">转载</span>GRASP软件设计的模式和原则</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84439754" target="_blank">onClick 和 addEventListener 比较</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/96875130" target="_blank">React-mentions 基本使用</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104029573" target="_blank">package.json scripts 脚本使用指南</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86552754" target="_blank">佩奇——Python方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80700629" target="_blank">JS实现继承的五种方法比较</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837668" target="_blank">常见服务器状态码及含义</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/91491250" target="_blank">报错 Preset files are not allowed to export objects 处理</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104517239" target="_blank">font-weight失效移动安卓处理方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84448049" target="_blank">React 理念与开发流程</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103896213" target="_blank">uglyJS 压缩丑化介绍</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90706246" target="_blank">JavaScript语言精粹-读书笔记（2）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83589965" target="_blank">propTypes 数据类型检验</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81839869" target="_blank">Warning: setState(...): Can only update a mounted or mounting component 报错分析</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83590152" target="_blank">10月总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103936695" target="_blank">使用C语言绘制一个笑脸smile</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/101778310" target="_blank">拒绝佛系，坚持撸码</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84755134" target="_blank">XML中Range 对象说明（slate适用）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84447925" target="_blank">React 受控组件</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81840890" target="_blank">JSON对象和字符串的转化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90706309" target="_blank">JavaScript语言精粹-读书笔记（4）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/86674130" target="_blank">数据结构——数组方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/93978694" target="_blank">代理服务器和反向代理的区别</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/99844332" target="_blank">Resumable 文件分块上传</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/93978991" target="_blank">超级实用前端知识点和面试题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103401663" target="_blank">Ant-design CSS 打包优化</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84196510" target="_blank">元素垂直居中水平居中的方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/84196437" target="_blank">Python 数据类型初步学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/89180739" target="_blank">Markdown 流程图绘制</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103152418" target="_blank">Unexpected end of JSON input while parsing near 报错及解决</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/90706276" target="_blank">JavaScript语言精粹-读书笔记（3）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/85211109" target="_blank">如何学习React框架</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103631213" target="_blank">JS 判断元素父子关系</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83098931" target="_blank">数据结构——队列</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/81837713" target="_blank">git常用命令全面归纳</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104427883" target="_blank">前端编辑图片缩放图片JScropperJSfabricJSEaselJSfabric-photo</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/102843060" target="_blank">npm publish 报错 Failed put 502</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80705419" target="_blank">JS 操作 CSS3 的问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/92796654" target="_blank">斐波那契数列（'兔子数列'）的性能问题</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103089073" target="_blank">更改自定义 input CheckBox 颜色</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103575335" target="_blank">log4js 安装和配置</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/80705596" target="_blank">JS的正则表达式</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/83098903" target="_blank">数据结构——数组</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103809056" target="_blank">z-index 无效解决方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/87693393" target="_blank">pyhton os 库</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/82778386" target="_blank">ES6中的迭代器(Iterator)和生成器(Generator)</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/96131370" target="_blank">进程和线程</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104669017" target="_blank">Ant design mobile Actionsheet 组件的思考和改进</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/97965772" target="_blank">7月前端知识点总结</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/96431031" target="_blank">避免事件频繁触发</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/102885261" target="_blank">fetchMetadata: sill mapToRegistry 报错 create-react-app 执行慢的解决方法</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/102620085" target="_blank">01 LeetCode 两数之和（简单题目）</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103311788" target="_blank">MySQL数据库入门学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/102806849" target="_blank">React 与 VUE 数据传输对比</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/102793282" target="_blank">SVN 版本控制学习</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103215620" target="_blank">Create React App 自动创建 SPA 项目</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103215938" target="_blank">JS数组去重的几种方法比较</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103305339" target="_blank">搭建 hub 和 table 注意事项</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/103305841" target="_blank">报错 mysql: command not found</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104551377" target="_blank">React 的 PureComponent 与 Component 区别</a>
<a href="https://blog.csdn.net/weixin_41697143/article/details/104820998" target="_blank">window-onbeforeunload 的使用</a>`;

var result = [];
var target = '\"';
// 思路：获取第一个和第二个双引号的位置，然后把这部分字符串拿出来放到数组中，原来的字符串递归处理

while (str.indexOf(target) > -1) {
  var first = str.indexOf(target);
  var last = str.indexOf(target, first + 1);
  if (first > -1 && last === -1) {
    break;
  }
  var link = str.slice(first + 1, last);
  if (link.indexOf('https') > -1) {
    result.push(link);
  }
  str = str.slice(last + 1);
}

console.log(result);