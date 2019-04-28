1.安装package control
按Ctrl+ `(此符号为tab按键上面的按键) 调出console
粘贴以下代码到命令行并回车：

---sublime-text 3
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

---sublime-text 2
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')


下载完成之后重启Sublime Text 3。
如果在Perferences->中看到package control这一项，则安装成功。

2.汉化

找到preference 下的package control 
点击package control ，搜索install package点击进入
搜索ChineseLocalizations，找到中文插件，点击安装

3.输入法光标不跟随

需要安装修改版的IMESupport，下载地址是：https://github.com/zcodes/IMESupport
然后把解压后的文件夹放在插件目录Packages中（Preferences-->Browse Packages）

4.字符乱码

找到preference 下的package control 
点击package control ，搜索install package点击进入
搜索“ConvertToUTF8”进行安装



2018-05-01
—– BEGIN LICENSE —–
TwitterInc
200 User License
EA7E-890007
1D77F72E 390CDD93 4DCBA022 FAF60790
61AA12C0 A37081C5 D0316412 4584D136
94D7F7D4 95BC8C1C 527DA828 560BB037
D1EDDD8C AE7B379F 50C9D69D B35179EF
2FE898C4 8E4277A8 555CE714 E1FB0E43
D5D52613 C3D12E98 BC49967F 7652EED2
9D2D2E61 67610860 6D338B72 5CF95C69
E36B85CC 84991F19 7575D828 470A92AB
—— END LICENSE ——



**Sublime Text 3 For mac** **插件安装**



\1. 安装PakageControl插件



<https://packagecontrol.io/installation>

All Autocomplete 

Sublime Text 默认的 Autocomplete 功能只考虑当前的文件，而 AllAutocomplete 插件会搜索所有打开的文件来寻找匹配的提示词。



SublimeCodeIntel 

一个全功能的 Sublime Text 代码自动完成引擎 ，本人做过对比，但是如果和webstorm的自动寻找还是稍逊一筹，不过对于大部分人来说够用了，能很方便跳到你想要的方法

支持的语言挺多的（JavaScript, Mason, XBL, XUL, RHTML, SCSS, Python, HTML, Ruby, Python3, XML, Sass, XSLT, Django, HTML5, Perl, CSS, Twig, Less, Smarty, Node.js, Tcl, TemplateToolkit, PHP.）



CTags 

实在方法跳转，跳转到你方法

之后在win7下或者linux下安装ctags软件

打开ctags插件包的use-setting配置"command": "d:/IDE/ctags58/ctags.exe"这个路径是下载ctags的安装路径 这个插件能跨文件跳转，跳转到指定函数声明的地方(ctrl+alt+左键)。 使用package control 搜索ctags 进行安装（安装ctags插件就可以了， 还有一个 CTags for PHP 插件没什么用）,注意安装好插件后要需要安装ctags命令。window 下载 ctags.exe http://vdisk.weibo.com/s/7QZd7 。 将ctags.exe文件放在一个环境变量能访问到的地方。打开cmd， 输入ctags，如果有这个命令，证明成功了。ubuntu下安装运行命令：sudo apt-get install exuberant-ctags 。然后在 sublime项目文件夹右键 ， 会出 现Ctag:Rebuild Tags 的菜单。点击它，然后会 生成.tags的文件 然后在你代码中， 光标放在某个函数上， 点击就可以跳转到函数声明的地方。 



AutoFileName 

快速帮助你在文件中写路径整体来说还不错



Autoprefixer 

这个插件主要应用css的浏览器兼容书写，自动分析你的css文件，解析出新的css文件，可以配置你要兼容的浏览器，不过这个插件要在之前安装nodejs



BracketHighlighter 

配置文件的高亮设置，让你的代码有不同的颜色区分该插件提供配对标签，或大括号或字符引号的配对高亮显示，算是对系统高亮的加强吧。



BufferScroll 

你可以轻松书写一个文件多个位置了



Color Highlighter 

颜色功能还是很爽的，找了好久



CSS Comments 

该有的都有，不该有的也有了



CSS Format 

css序列化插件，支持默认多种序列方案，还可以自己配置自己喜欢的



CSS3 

css3语言提示插件，本来不想写的，也不是什么特别的，但是可能会有人用到

DocBlockr 

DocBlocker 是在Sublime平台上开发一款自动补全代码插件，支持JavaScript (including ES6), PHP, ActionScript, Haxe, CoffeeScript, TypeScript, Java, Apex, Groovy, Objective C, C, C++ and Rust.等众多语言



Emmet 

Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度



HTML-CSS-JS Prettify 

全能序列化



JavaScript Completions 

js最基本的api快查片段



JsFormat 

js序列化，能排在下载插件前25位，好的话就不用说了



Keymaps 

快速查找所有插件的快捷键



Pretty JSON 

JSON，一個輕量級的資料交換語言，目前許多網站AJAX request的回應結果都是JSON格式

SideBarEnhancements 



SublimeLinter 

代码校验插件，支持多种语言，这个是主插件，如果想检测特定的文件需要单独下载

SublimeLinter-jshint 

这个就是单独的插件，上面的一个分支

SublimeTmpl 

创建常用文件初始模板，必须html,css,js模板

Tag 

HTML/XML标签缩进、补全和校验

Alignment 

代码对齐

PackageResourceViewer 

通过这个特殊的插件，会给你查看和编辑SublimeText附带的不同的包带来很多方便。您也可以提取任何给定的包。这一行动将其复制到用户文件夹，以便您可以安全地对其进行编辑。

很多人苦恼不能修改左侧导航面板字体大小，用这个可以轻松办到

安装PackageResourceViewer 快捷键 ⌘(command)+⇧(shift)+P 打开 Command Palette 输入 Package Control:Install 回车，等待加载package列表 搜索并安装 PackageResourceViewer 包

最后，使用PackageResourceViewer打开Theme文件进行编辑 快捷键 ⌘(command)+⇧(shift)+P 打开 Command Palette 输入 PackageResourceViewer: Open Resource 回车，打开包列表 选择 Theme - Default，再选择 Default.sublimt-theme 搜索 sidebar_label，在 "class": "sidebar_label" 后边加一行："font.size": 18，将字体大小设置为18，保存。 好啦，大功告成！

插件的网址如下，你可以找到你喜欢的插件

https://packagecontrol.io/browse


typora for linux

```
# or run:
# sudo apt-key adv --keyserver keyserver.ubuntu.com--recv-keys BA300B7755AFCFAE
```

```
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
```

```
# add Typora's repository
```

```
sudo add-apt-repository 'deb https://typora.io/linux ./'
```

```
sudo apt-get update
```

```

# install typora
sudo apt-get install typora
```