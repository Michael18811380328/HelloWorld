### bootstrap学习

讲的一般(兄弟连教学，Dw软件，部分bug解释不清楚)

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

~~~html
<a href="#" class='btn btn-default btn-lg' role='button'>Link按钮</a>
~~~

##### 下拉菜单

下拉菜单 dropdown-toggle类名 data-toggle=‘dropdown’。 对应的下拉菜单组（class = dropdown-menu; role=menu 通常使用ul+li嵌套下拉菜单）

视频教程使用DW软件，自己简单的DW也要熟悉（软件较大较卡未破解）

下拉菜单中的分割线和菜单头

~~~html
<li role="presentation" class='divider'></li>

<li role='presentation' class='dropdown-header'></li>

~~~

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

导航栏的样式分为普通和胶囊导航样式。

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

#### 响应式布局(重要)

visible-xs 在手机上显示 
hidden-xs 在手机上隐藏

xs-sm-md-lg

#### 栅格系统

栅格系统必须放在一个容器中（container或者container-fluid流式布局还是普通布局）一行可以分成12列。

媒体查询：自动检测屏幕的大小并显示隐藏部分内容。

container>row>
col-md-8 col-md-4

整体container内部放置多个行row，每个行内放置col列元素。

实际情况：同一个元素在不同的屏幕上显示不同的宽度和样式。

##### 偏移

col-md-offset-4 实现空白偏移（不使用padding-margin）

主要掌握整行排列的方式和offset偏移设置样式。

进度条可以设置动画效果（进度条包含有条纹样式，设置actice类名）整体上进度条的颜色最好一致（或者动态变化），个人觉得颜色堆叠效果不是很好看。

#### 媒体对象和列表组

媒体对象：就是项目中的产品和对应的说明文字。可以使用在用户评论中，可以使用在产品介绍中。

##### 面板和井

panel和well类：将一部分元素作为一个整体。

#### 插件

Bootstrap官方具有很多插件（13个）有一部分需要加载JS代码，这部分内容根据需求熟练使用

