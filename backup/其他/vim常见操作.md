# Vim概述

- :w 保存文件
- :wq 保存文件并退出
- :q 退出
- :q! 强制退出

## 动词

- d：delete 的缩写，表示删除
- c：change 的缩写，表示更改
- y：yank 的缩写，表示拷贝

## 名词

- w：word 的缩写，表示单个的词
- b：back 的缩写，表示后退一个词
- j：向下移动一行
# Vim的配置

- `:hlsearch` 打开高亮搜索
- `:syntax on` 打开语法高亮
- `:set hlsearch` 查找结果高亮
- `:set tabstop=4` 设置一个 tab 字符缩进的行数
- `:set autoindent` 打开“auto indent”功能。这导致vim能对新的文本行缩进与刚输入的文本行相同的列数。

这些命令（没有开头的冒号字符）添加到`~/.vimrc`，这些改动就会Vim每次启动时，自动生效。
# 剪切，复制，粘贴

## 剪切

`d`命令不仅删除文本，它还“剪切”文本。每次我们使用`d`命令，删除的部分被复制到一个粘贴缓冲区中（看作剪切板）。

## 粘贴

- `p`命令 剪切板中的文本粘贴到光标位置之后。
- `P` 剪切板中的文本粘贴到光标之前。
- `:r` 把指定的文件插入到光标位置之前

```
:r foo.txt
```

## 复制

- yy	复制当前行。
- 5yy	复制当前行及随后的四行文本。
- yW	复制从当前光标位置到下一个单词的开头。
- y$	复制从当前光标位置到当前行的末尾。
- y0	复制从当前光标位置到行首。
- y^	复制从当前光标位置到文本行的第一个非空字符。
- yG	复制从当前行到文件末尾。
- y20G	复制从当前行到文件的第20行。
# 编辑

## 插入模式

- i 在光标所在字符前面插入字符，并开启插入模式
- a 在光标所在字符后面插入字符，并开启插入模式
- A 移动到当前行的行尾，并开启插入模式。
- o	当前行的下方插入一行，并开启插入模式。
- O	当前行的上方插入一行，并开启插入模式。

## 删除

- x 删除当前字符
- 3x 删除当前字符及其后的两个字符。
- dd 删除当前行。
- 5dd 删除当前行及随后的四行文本。
- dW  删除从光标位置开始到下一个单词的开头。
- d$	删除从光标位置开始到当前行的行尾。
- d0	删除从光标位置开始到当前行的行首。
- d^	删除从光标位置开始到文本行的第一个非空字符。
- dG	删除从当前行到文件的末尾。
- d20G	删除从当前行到文件的第20行。
- J 删除本行行尾的换行符，即将本行与下一行连在一起。

## 撤销

- u 撤销上一个操作。
- Ctrl + R 撤销前一个撤销，即redo
- U 行撤销，即撤销所有在当前行的编辑
# 文件操作

## 基本操作

vi 可以同时打开多个文件。

```bash
$ vi file1 file2 file3
```

默认显示第一个文件。

- `:n` 转到下一个文件
- `:N` 回到先前的文件
- `:buffers` 显示正在编辑的文件列表
- `:buffer 1` 转到缓冲区1
- `:e` 加载一个新的文件

当我们从一个文件移到另一个文件时，如果当前文件没有保存修改，vi 会阻止我们转换文件， 这是 vi 强制执行的政策。在命令之后添加感叹号，可以强迫 vi 放弃修改而转换文件。

## 文件加密

Vim 可以对文件加密。如果直接打开经过加密的文件，只会看到乱码。默认的加密方法是 zip，窗口状态栏输入`:help 'cm'`，可以看到可选的加密方法。

```bash
$ vi +X test.txt
```

命令行的`+X`参数会让 Vim 提示你输入密码。窗口状态栏输入`:X`，也具有同样效果。打开经过加密的文件，Vi 会提示输入密码。只有密码正确，才能正常编辑，否则只能看到乱码。

窗口状态栏输入`:set key=`，可以移除密码。

# 帮助

`:help`进入帮助窗口，`:help {主题}`可以显示某个主题的帮助。下面是一些例子。

- :help deleting
- :help index： 显示帮助索引
- :help CTRL-A：显示CTRL-A的帮助
- :help i_CTRL-H：显示插入模式的`CTRL-H`的帮助
- :help c_CTRL-B：可视模式下`CTRL-B`的作用
- :help t(): 函数`t`
- :help -t：查看 Vim 启动时，`-t`参数的作用
- :help +t: 编译时特性`+t`
- :help 'number'：查看 number 选项
- :help E37：查看E37错误
- :helpgrep pattern：在所有帮助文件中查找某个模式
  - :cn 下一个匹配
  - :cN 前一个匹配
  - :cfirst 第一个匹配
  - :clast 最后一个匹配

命令。

- `ZZ`或`:q`退出帮助窗口
-
# 模式

Vim分成多种模式。按`i`键进入编辑模式，按`esc`键退出编辑模式。

在窗口底部输入`:set showmode`，以后窗口底部就会显示当前状态，比如输入模式是`---INSERT--`。
# 移动

- l or 右箭头	向右移动一个字符
- h or 左箭头	向左移动一个字符
- j or 下箭头	向下移动一行
- k or 上箭头	向上移动一行
- 0 (零按键)	移动到当前行的行首。
- ^	移动到当前行的第一个非空字符。
- $	移动到当前行的末尾。
- w	移动到下一个单词或标点符号的开头。
- W	移动到下一个单词的开头，忽略标点符号。
- b	移动到上一个单词或标点符号的开头。
- B	移动到上一个单词的开头，忽略标点符号。
- numberG	移动到第 number 行。例如，1G 移动到文件的第一行。
- G	移动到文件末尾。

以上很多命令，可以在前面加上一个数字，表示指定命令执行的次数。比如，命令”5j”导致 vi 向下移动5行。

## 垂直移动

- `{` 移动到当前段落或代码块的开始处
- `}` 移动到当前段落或代码块的结尾
- `Ctrl-f` or `Page Down` 向下翻一页，即向下移动一屏
- `Ctrl-b` or `Page Up` 向上翻一页，即向上移动一屏
# Vim操作

## 命令格式

vim的命令采用下面的格式。

```
[OPERATOR][NUMBER][MOTION]
```

Operator是动词。

- d – Delete (等同于cut命令)
- c – Change
- y – Yank
- p – Insert last deleted text after cursor (put command)
- r – Replace
- v - 可视化选择

Motion表示操作的上下文。

- w – 直到下一个单词的起始位置前面。
- s - sentence
- p - paragraph
- t - tag
- b - block
- e – 直到当前单词的最后一个位置。
- $ – 直到当前行的最后一个位置。
- ) – 下一个句子的开始。
- ( – 当前句子的开始。
- } – 下一段的开始。
- { – 当前段的开始。
- ] – 下一段部分（section）的开始
- `[` – 当前部分（section）的开始
- `H` – 当前屏幕的顶部行
- `L` – 当前屏幕的最后一行

Count是可选的，表示command和motion的重复次数。

- i - inside
- a - around
- NUM: number (e.g.: 1, 2, 10)

实例

- dw 删除一个词
- d4w 删除四个词
- d$ 删除当前行
- dd 删除当前行（d$的快捷方式）
- d2$ 删除两行
- cis - Change inside sentence，删除当前句子，并进入insert模式
- yip - yank inside paragrah 复制当前段落

## 撤销命令

- u 撤销上个命令

## 移动光标

- h – Left
- k – Up
- l – Right
- j – Down
- G 移动到文件最后一行
- 123 + G 跳到指定行
- gg 移动到文件第一行
- ctrl + g 查看当前文件总行数
- % 移动到当前代码区块的开始/结尾（匹配`()`，`[]`，`{}`）

## 插入文字

- i 当前位置前面
- a 当前位置后面
- o 当前行下方新增一行
- O 当前行上方新增一行

## 删除

- x 删除当前字符

## 搜索，替换

- :/cat 搜索光标位置后面
- :?dogs 搜索光标位置前面
- n 移动到下一个匹配
- N 移动到上一个匹配
- :s/cat/dog 只替换下一个
- :s/cat/dog/g 替换所有

## 执行shell命令

- :!ls -al

## 复制，粘贴，剪切

### 选择文本

- v+光标移动 （按字符选择）高亮选中所要的文本，然后进行各种操作（比如，d表示删除）。
- V （按行选择）
- v+选中的内容+c 更改选中的文字

### 复制：y(ank)

- y 用v命令选中文本后，用y进行复制
- yy 复制当前行，然后用p进行复制
- 5yy 复制从当前行开始的5行
- y_ 等同于yy
- Y 等同于yy
- yw 复制当前单词
- y$ 从当前位置复制到行尾
- y0 从当前位置复制到行首
- y^ 从当前位置复制到第一个非空白字符
- yG 从当前行复制到文件结束
- y20G 从当前行复制到第20行
- y?bar 复制至上一个出现bar的位置

### 粘贴

- p 在光标位置之后粘贴
- P 在光标位置之前粘贴

### 剪切

- v + 选中的内容 + d 剪切

### 剪贴板

（1） 简单复制和粘贴

vim提供12个剪贴板，它们的名字分别为vim有11个粘贴板，分别是`0`、`1`、`2`、`...`、`9`、`a`、`“`。如果开启了系统剪贴板，则会另外多出两个：`+`和`*`。使用`:reg`命令，可以查看各个粘贴板里的内容。

```bash
:reg
```

在vim中简单用y只是复制到`“`（双引号)粘贴板里，同样用p粘贴的也是这个粘贴板里的内容。

（2）复制和粘贴到指定剪贴板

要将vim的内容复制到某个粘贴板，需要退出编辑模式，进入正常模式后，选择要复制的内容，然后按"Ny完成复制，其中N为粘贴板号（注意是按一下双引号然后按粘贴板号最后按y），例如要把内容复制到粘贴板a，选中内容后按"ay就可以了。

要将vim某个粘贴板里的内容粘贴进来，需要退出编辑模式，在正常模式按"Np，其中N为粘贴板号。比如，可以按"5p将5号粘贴板里的内容粘贴进来，也可以按"+p将系统全局粘贴板里的内容粘贴进来。

（3）系统剪贴板

Vim支持系统剪贴板，需要打开clipboard功能。使用下面的命令，检查当前版本的Vim，是否支持clipboard。

```bash
$ vim --version
```

如果不支持的话，需要安装图形化界面的vim（即gvim），或者重新编译vim。

```bash
$ sudo apt-get install gvim
正在读取软件包列表... 完成
正在分析软件包的依赖关系树
正在读取状态信息... 完成
Package gvim is a virtual package provided by:
  vim-gtk 2:7.4.488-7
  vim-gnome 2:7.4.488-7
  vim-athena 2:7.4.488-7
You should explicitly select one to install.

E: Package 'gvim' has no installation candidate

$ sudo apt-get install vim-gnome
```

另一种方法，是安装vim-gui-common。

```bash
$ sudo apt-get install vim-gui-common
```

安装以后，可以用命令行界面，启动gvim，这时可用系统剪贴板。

```bash
$ gvim -v
```

星号（`*`）和加号（`+`）粘贴板是系统粘贴板。在windows系统下， * 和 + 剪贴板是相同的。对于 X11 系统， * 剪贴板存放选中或者高亮的内容， + 剪贴板存放复制或剪贴的内容。打开clipboard选项，可以访问 + 剪贴板；打开xterm_clipboard，可以访问 * 剪贴板。 * 剪贴板的一个作用是，在vim的一个窗口选中的内容，可以在vim的另一个窗口取出。

复制到系统剪贴板
- `"*y`
- `"+y`
- `"+2yy` – 复制两行
- `{Visual}"+y` - copy the selected text into the system clipboard
- `"+y{motion}` - copy the text specified by {motion} into the system clipboard
- `:[range]yank +` - copy the text specified by `[range]` into the system clipboard

剪切到系统剪贴板
- `"+dd` – 剪切一行

从系统剪贴板粘贴到vim
- `"*p`
- `"+p`
- `Shift+Insert`
- `:put +` - Ex command puts contents of system clipboard on a new line
- `<C-r>`+ - From insert mode (or commandline mode)

`"+p`比 Ctrl-v 命令更好，它可以更快更可靠地处理大块文本的粘贴，也能够避免粘贴大量文本时，发生每行行首的自动缩进累积，因为`Ctrl-v`是通过系统缓存的stream处理，一行一行地处理粘贴的文本。

## 多窗口

垂直切分窗口，Ctrl-w + s 或者使用下面的命令。

```bash
:split <文件名>
```

水平切分窗口，Ctrl-w + v 或者使用下面的命令。

```bash
:vsplit <文件名>
```

如果省略文件名，则打开的是当前文件。

切换窗口的命令。

- Ctrl-w +  Ctrl-w
- Ctrl-w + direction key

## vimrc文件配置

打开语法高亮

```bash
:syntax on
```

禁止使用箭头键。

```bash
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>
```

在窗口间移动。

```bash
nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l
```

## 命令行模式

```bash
# 列出所有buffer
:ls

# 列出所有buffer（包括不可见buffer）
:ls!

# 在当前窗口打开一个新的文件，
# 新建一个buffer，原有文件成为不可见buffer
:e file1

# 新建一个未命名的buffer，然后将其存为 /tmp/foo
:enew
:w /tmp/foo
```

## 插件

- [Markdown语法高亮](https://github.com/plasticboy/vim-markdown)

### dmw多窗口管理

网址：http://www.vim.org/scripts/script.php?script_id=4186

窗口按下面方式组织。

```
================= 
|      |     S1 | 
|      |==========
|  M   |     S2 | 
|      |========== 
|      |     S3 | 
================= 
```

操作
- CTRL-N 在[M]区域创建一个新窗口，将以前的窗口都堆在[S]区域
- CTRL-C 关闭当前窗口
- CTRL-J 跳到下一个窗口（顺时针方向）
- CTRL-K 跳到前一个窗口（逆时针方向）
- CTRL-F 将当前窗口放入[M]区域，并将其他窗口放在[S]区域

## 提示行操作

- :w: write your changes to the file
- :q!: get out of vim (quit), but without saving your changes (!)
- :wq: write your changes and exit vim
- :saveas ~/some/path/: save your file to that locationvim
- ZZ: a faster way to do :wq
# 查找和替换

## 查找

`f`查找一行，移动光标到下一个所指定的字符上。例如，命令`fa`会把光标定位到同一行中的下一个出现的`a`字符上。

在一行中执行了字符的查找命令之后，通过输入分号来重复这个查找。

`/`命令移动光标到下一个出现的单词或短语上。当你输入`/`命令后，一个`/`字符会出现在屏幕底部。下一步，输入要查找的单词或短语后， 按下回车。光标就会移动到下一个包含所查找字符串的位置。通过`n`命令来重复先前的查找。向后查找使用`?`。

## 全局查找和替换

`:s`命令用来查找和替换，代表`substitute`。

```vim
# 发现所有行的 foo，替换为 bar
:%s/foo/bar/g

# 发现当前行的所有 foo，替换为 bar
:s/foo/bar/g

# 替换所有的 foo 为 bar，每一次都会要求确认
:%s/foo/bar/gc

# 只有整个词 foo 时（即两边有词边界），才将它替换为 bar
# 每一次替换都会要求确认
:%s/\<foo\>/bar/gc

# 全局替换，大小写不敏感，每一次替换都会要求替换
:%s/foo/bar/gci

# 替换第5行到第12行的所有 foo 为 bar
:5,12s/foo/bar/g
```

全局的查找和替换执行下面的命令。

```
:%s/Line/line/g
```

上面命令几个部分的含义如下。

- `:`	冒号字符运行一个 ex 命令。
- `%`	指定要操作的行数。% 是一个快捷方式，表示从第一行到最后一行。另外，操作范围也 可以用 1,5 来代替（因为我们的文件只有5行文本），或者用 1,$ 来代替，意思是 “ 从第一行到文件的最后一行。” 如果省略了文本行的范围，那么操作只对当前行生效。
- `s`	指定操作。在这种情况下是，替换（查找与替代）。
- `/Line/line`	查找类型与替代文本。
- `g`	这是“全局”的意思，意味着对文本行中所有匹配的字符串执行查找和替换操作。如果省略 g，则 只替换每个文本行中第一个匹配的字符串。

上面命令的尾部添加`c`，可以确认每一次替换。

```
:%s/line/Line/gc
```

执行上面命令以后，发现一个匹配之后，Vim会显示如下提示。

```
replace with Line (y/n/a/q/l/^E/^Y)?
```

上面几个确认字符的含义如下。

- y	执行替换操作
- n	跳过这个匹配的实例
- a	对这个及随后所有匹配的字符串执行替换操作。
- q or esc	退出替换操作。
- l	执行这次替换并退出。l 是 “last” 的简写。
- Ctrl-e, Ctrl-y	分别是向下滚动和向上滚动。用于查看建议替换的上下文。

# shell 命令

有两种主要方法可以在 Vim 里调用外部程序：

- :!<command>——在从 Vim 内容跑某命令时很有用，尤其是在你想把运行结果输出到 Vim buffer 的情况下。
- :shell——以 Vim 子进程的方式弹开一个命令行。适合交互式命令。

可以用 :r! 把呼叫命令的回显直接贴到当前工作的文档里。例如，把当前目录的文档列表放进当前编辑文件就可以输入：

```bash
:r!ls
```

这种读取方式当然不光可以用在命令回显；你可以用 :r 轻松读进其他文件的内容，比如你的公钥或是你自定义的样版文件：

```bash
:r ~/.ssh/id_rsa.pub
:r ~/dev/perl/boilerplate/copyright.pl
```

值得注意的是，像排序和查找之类常见的操作，Vim 有其自带的方法 :sort 和 :grep。

Vim 有个 diffing 模式，即 vimdiff，它允许你查看不同版本文件间的区别，还提供三向合并用以解决版本冲突，你可以用 :diffput 和 :diffget 这样的命令来选择合适的代码段。你可以在命令行下直接运行 vimdiff，需要至少两个文件才能做对比：

```bash
$ vimdiff file-v1.c file-v2.c
```

你可以在 Vim 下直接调用版本控制的命令，这可能也是你大多数时候最需要的。% 永远是当前激活显示窗口的内容，记住这点非常有用：

```bash
:!svn status
:!svn add %
:!git commit -a
```
# 撤销

命令模块下，`u`（代表 undo）会撤销上一个操作。

默认情况下，撤销只在当前对话（session）有效。如果关闭文件再打开，就无法撤销上一个对话的操作。如果想跨对话撤销，需要在`.vimrc`里面打开下面的设置。

```
" 跨 session 撤销
set undofile
```

打开跨对话撤销以后，Vim 会对每个文件生成一个历史文件，保存在被编辑文件的相同目录下。下面的设置可以让所有历史文件，保存在一个地方。

首先，在 Vim 的配置目录里面，新建一个目录。

```bash
$ mkdir ~/.vim/undodir
```

然后在`.vimrc`里面，指定这个目录作为历史文件的保存位置。

```
" 历史文件的保存位置
set undodir=~/.vim/undodir
```

## 参考链接

- [Persistent Undo in Vim](https://jovicailic.org/2017/04/vim-persistent-undo/), by Jovica Ilic
# .vimrc 配置文件

用户主目录下的`.vimrc`，是 Vim 的配置文件。

```
colorscheme badwolf         " 配色方案
syntax enable           " 打开语法处理
set tabstop=4       " 打开新文件时，遇到 tab 键等于4个空格
set softtabstop=4   " 编辑时按下 tab 键，相当于4个空格
set expandtab       " 将 tab 键变为空格键的快捷方式
set number              " 显示行号
set showcmd             " 在底部显示上一条命令
set cursorline          " 高亮光标所在的行
filetype indent on      " 指定文件类型相关的缩进
set wildmenu            " 打开底部命令行的自动补全
set lazyredraw          " 只在需要时重绘
set incsearch           " 打开边输入边搜索
set hlsearch            " 打开搜索结果高亮
set foldenable          " 打开折叠功能
```
# 窗口

- `ZZ`：退出窗口

