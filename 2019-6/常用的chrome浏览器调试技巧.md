# 常用的chrome浏览器调试技巧

一、快速切换文件

　　如果你使用过sublime text，那么你可能不习惯没有Go to anything这个功能的覆盖。你会很高兴听到[chrome](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=chrome&k0=chrome&kdi0=0&luki=10&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww.admin10000.com%2Fdocument%2F6159.html&urlid=0)开发者功能也有这个功能，当DevTools被打开的时候，按Ctrl+P（cmd+p on mac）,就能快速搜寻和打开你项目的文件。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520082962.GIF)

　　二、在源代码中搜索

　　如果你希望在[源代码](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=%D4%B4%B4%FA%C2%EB&k0=%D4%B4%B4%FA%C2%EB&kdi0=0&luki=5&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww%2Eadmin10000%2Ecom%2Fdocument%2F6159%2Ehtml&urlid=0)中搜索要怎么办呢？在页面已经加载的文件中搜寻一个特定的字符串，快捷键是Ctrl + Shift + F (Cmd + Opt + F)，这种搜寻方式还支持正则表达式哦

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520566273.GIF)

　　三、快速跳转到指定行

　　在Sources标签中打开一个文件之后，在Windows和Linux中，按Ctrl + G，(or Cmd + L for Mac)，然后输入行号，DevTools就会允许你跳转到文件中的任意一行。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520022393.GIF)

　　另外一种方式是按Ctrl + O，输入`:`和行数，而不用去寻找一个文件。

　　四、在控制台选择元素

　　DevTools控制台支持一些变量和函数来选择DOM元素：

- $()–document.querySelector()的简写，返回第一个和css选择器匹配的元素。例如$(‘div’)返回这个页面中第一个div元素
- $$()–document.querySelectorAll()的简写，返回一个和[css](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=css&k0=css&kdi0=0&luki=6&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww.admin10000.com%2Fdocument%2F6159.html&urlid=0)选择器匹配的元素数组。
- $0-$4–依次返回五个最近你在元素面板选择过的DOM元素的历史记录，`$0`是最新的记录，以此类推。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520908924.GIF)

　　想要了解更多[控制台](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=%BF%D8%D6%C6%CC%A8&k0=%BF%D8%D6%C6%CC%A8&kdi0=0&luki=7&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww%2Eadmin10000%2Ecom%2Fdocument%2F6159%2Ehtml&urlid=0)命令，戳这里：[Command Line API](https://developer.chrome.com/devtools/docs/commandline-api)

　　五、使用多个插入符进行选择

　　当编辑一个文件的时候，你可以按住Ctrl（cmd for mac），在你要编辑的地方点击鼠标，可以设置多个插入符，这样可以一次在多个地方编辑。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520028830.GIF)

　　六、保存记录

　　勾选在Console标签下的保存记录选项，你可以使DevTools的console继续保存记录而不会在每个页面加载之后清除记录。当你想要研究在页面还没加载完之前出现的bug时，这会是一个很方便的方法。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520197052.GIF)

　　七、优质打印

　　Chrome’s Developer Tools有内建的美化代码，可以返回一段最小化且格式易读的代码。Pretty Print的按钮在Sources标签的左下角。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520468053.GIF)

　　八、设备模式

　　对于开发移动友好页面，DevTools包含了一个非常强大的模式，这个谷歌视频介绍了其主要特点，如调整屏幕大小、触摸仿真和模拟糟糕的网络连接

　　（ps:原文中这个视频文件丢失了，这个图是小编补充，你可以自己去测试这个[工具](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=%B9%A4%BE%DF&k0=%B9%A4%BE%DF&kdi0=0&luki=1&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww%2Eadmin10000%2Ecom%2Fdocument%2F6159%2Ehtml&urlid=0)，很有用）

[![ss](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520163910.PNG)](http://ido321.qiniudn.com/wp-content/uploads/2015/04/ss.png)

　　九、设备传感仿真

　　设备模式的另一个很酷的功能是模拟移动设备的传感器，例如触摸屏幕和加速计。你甚至可以恶搞你的地理位置。这个功能位于元素标签的底部，点击“show drawer”按钮，就可看见`Emulation标签 --> Sensors`.

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520025403.GIF)

　　十、颜色选择器

　　当在样式编辑中选择了一个颜色属性时，你可以点击颜色预览，就会弹出一个颜色选择器。当选择器开启时，如果你停留在页面，鼠标指针会变成一个放大镜，让你去选择像素精度的颜色。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520830382.GIF)

　　十一、强制改变元素状态

　　DevTools有一个可以模拟CSS状态的功能，例如元素的hover和focus,可以很容易的改变元素样式。在CSS编辑器中可以利用这个功能

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520615796.GIF)

　　十二、可视化的DOM阴影

　　Web浏览器在构建如文本框、按钮和输入框一类元素时，其它基本元素的视图是隐藏的。不过，你可以在`Settings -> General` 中切换成`Show user agent shadow DOM`，这样就会在元素标签页中显示被隐藏的代码。甚至还能单独设计他们的样式，这给你了很大的控制权。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520165896.GIF)

　　十三、选择下一个匹配项

　　当在Sources标签下编辑文件时，按下Ctrl + D (Cmd + D) ，当前选中的单词的下一个匹配也会被选中，有利于你同时对它们进行编辑。

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520449143.GIF)

　　十四、改变颜色格式

　　在颜色预览功能使用快捷键Shift + Click，可以在rgba、hsl和hexadecimal来回切换颜色的格式

![img](http://www.admin10000.com/UploadFiles/Document/201504/08/20150408150520996576.GIF)

　　十五、通过workspaces来编辑本地 文件

​    Workspaces是Chrome DevTools的一个强大功能，这使DevTools变成了一个真正的IDE。Workspaces会将Sources选项卡中的文件和本地项目中的文件进行匹配，所以你可以直接编辑和保存，而不必复制/粘贴外部改变的文件到编辑器。

　　为了配置Workspaces，只需打开Sources选项，然后右击左边面板的任何一个地方，选择Add Folder To Worskpace，或者只是把你的整个工程[文件夹](http://cpro.baidu.com/cpro/ui/uijs.php?adclass=0&app_id=0&c=news&cf=1001&ch=0&di=128&fv=16&is_app=0&jk=c3606459e08266c9&k=%CE%C4%BC%FE%BC%D0&k0=%CE%C4%BC%FE%BC%D0&kdi0=0&luki=4&mcpm=0&n=10&p=baidu&q=06011078_cpr&rb=0&rs=1&seller_id=1&sid=c96682e0596460c3&ssp2=1&stid=0&t=tpclicked3_hc&td=1922429&tu=u1922429&u=http%3A%2F%2Fwww%2Eadmin10000%2Ecom%2Fdocument%2F6159%2Ehtml&urlid=0)拖放入Developer Tool。现在，无论在哪一个文件夹，被选中的文件夹，包括其子目录和所有文件都可以被编辑。为了让Workspaces更高效，你可以将页面中用到的文件映射到相应的文件夹，允许在线编辑和简单的保存。