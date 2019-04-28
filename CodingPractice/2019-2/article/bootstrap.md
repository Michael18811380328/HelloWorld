### bootstrap学习

不同视频教程的教学内容层次不齐，以实际官方文档为准。每次学习都有新的收获。不同的网站和不同的项目中需要使用不同的组件。

v3.bootcss.com 中文文档

#### 按钮 button

按钮及按钮组和下拉菜单的实现（按钮的大小设置，居中设置）

##### 默认七个按钮

btn-default primary info success danger warning link

##### 按钮尺寸

sm-xs-lg btn-lg

##### 状态

类名加入active或者disabled表示激活状态和禁止状态——H5

使用input标签type=button可以实现，最好使用button标签。

<a href="#" class='btn btn-default btn-lg' role='button'>Link按钮</a>

##### 下拉菜单

下拉菜单 dropdown-toggle类名 data-toggle=‘dropdown’。 对应的下拉菜单组（class = dropdown-menu; role=menu 通常使用ul+li嵌套下拉菜单）

视频教程使用DW软件，自己简单的DW也要熟悉（软件较大较卡未破解）

下拉菜单中的分割线和菜单头
<li role="presentation" class='divider'></li>
<li role='presentation' class='dropdown-header'></li>
这两个都不能点击，是下拉菜单的分隔符

disabled类：禁止选项（和JS链接，如果在某个状态增加disabled 这个按钮不能点击）


##### 分裂式下拉菜单 split button

通常的下拉菜单鼠标经过下拉菜单自动显示，这个分裂式需要单击才可以显示下拉菜单。这个下拉菜单使用不是很多。

bootstrap包含css和js文件，首先引用JQ文件，之后引入strap.js文件



##### 上弹下拉菜单

dropup

##### 字体图标

在BT中预设字体图标组件，将字体图标对应的类加入其中即可.

<span class="glyphicon glyphicon-euro"></span>
<span class="glyphicon glyphicon-heart"></span>

##### 按钮组

按钮组：按钮没有间距。中间的按钮是直角，边缘的按钮是圆角

btn-group

btn-group-vertical 垂直排列

btn-group-justified 两端对齐排列（和外部容器宽度相等）

##### 其他

html5shiv.min.js 让早期ie浏览器认识html5新标签

respond.min.js 
让早期ie浏览器媒体查询便于响应式布局（联网）

#### 导航栏

导航栏设置brand image (logo图片) navbar-header类。

在navbar中设置表单（搜索框）
加入form标签

##### 网站层级（路径导航）

breadcrumb类，标明用户在多少层级之下。（ul-li嵌套）官方是ol-li

#### 输入框input

##### 输入框组

input-group

#### 分页

对于文档博客型网站页面众多，使用分页效果很好。pagination

框架插件等功能需要多练习，练得多自然就可以熟练掌握了。现在期望找到Vue的练习项目。

#### 标签label

label-default 类似于button的样式

badge 徽章（微博的浏览量）

黑马程序员的教学视频相对更实际。

##### 巨幕

类似于一个大banner。内部嵌套一个H1。可以放置背景图片。

#####页头

整个视频有细节问题是错误的。

#### 表单

输入框组（input-group）：通常情况输入框外部还有一个选项.

辅助类：text-warning bg-warning 设置文本和背景的颜色。

关闭按钮：需要配合JS代码使用

##### 显示隐藏内容

在特定的标签上加入show和hidden类。

#### 响应式布局

visible-xs 在手机上显示 
hidden-xs 在手机上隐藏
