### codemirror配置

~~~html
<html>
<head>
    <link rel="stylesheet" href="codemirror.css">  <!-- 引入CSS文件 -->
    <script src="codemirror.js"></script>  <!-- 引入JS文件 -->
</head>
<body>
    <textarea id="code" name="code">http://www.cnblogs.com/oldphper</textarea>
    <script>
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {  // 标识到textarea
            value : "http://www.cnblogs.com/oldphper",  // 文本域默认显示的文本
            mode : "text/html",  // 模式
            // theme : "",  // CSS样式选择
            indentUnit : 2,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : false,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true  // 是否显示行号
            // .. 还有好多，翻译不完。需要的去看http://codemirror.net/doc/manual.html#config
        });
    </script>
</body>
</html>
~~~

常见 API

~~~js
function fun() {
 2             ob = "";
 3             //alert(editor.getValue()); // 得到所有内容
 4             //editor.setValue("abc"); // 将编辑器内容改为"abc"
 5              
 6             // 0为起点，2行第3个字母到2行第5个字母
 7             //alert(editor.getRange({line:1,ch:2},{line:1,ch:5}));  //得到
 8             //editor.replaceRange("shashasha",{line:1,ch:2},{line:2,ch:5});
 9              
10             //alert(editor.getLine(2));   // 第三行数据
11             //alert(editor.lineCount());   // 总共几行
12             //alert(editor.firstLine());   // 首行数0
13             //alert(editor.lastLine());   // 末行数19，共20行
14             //ob = editor.getLineHandle(1);   // 第二行数据句柄
15             //alert(editor.getLineNumber(ob)); // 行句柄在哪行
16             //editor.eachLine(0,2,alert(ob));
17              
18             //ob = editor.changeGeneration();    // 编辑动作次数，1次起
19             //editor.markClean();   // 清除动作
20             //editor.isClearn();    // 是否清除
21              
22             //ob = editor.getSelection();   // 获得选中的数据一条
23             //ob = editor.getSelections();  // 获得选中数据多条
24             editor.replaceSelection("ttttttt"); // 选中替换，一条根多条都替换，不选中则在光标处插入
25             //editor.replaceSelections(["aaa","bbb"]); // 选中替换，多条对多选
26             //editor.setSelection();  //设置选中
27             //editor.setSelections();  //设置选中
28             //ob = editor.listSelections(); //boj
29             //ob = editor.somethingSelected(); // 是否有选中
30             //editor.addSelection({line:2,ch:6}, {line:1,ch:2});  // 选中此段
31              
32             //ob = editor.getCursor();    // ob['line']、['ch']
33             //editor.setCursor(2);    // 设置光标位置
34              
35             //ob = editor.hasFocus();   // focus?全false
36              
37             //editor.addOverlay("aaaaa"); //..
38             //editor.removeOverlay("aaaaa"); //..
39              
40             //ob = editor.getDoc();   // 文档对象,很多
41             //ob = editor.getEditor();   //..
42              
43             //ob = editor.setBookmark({line:1,ch:3}); // 书签对象
44              
45             //editor.addWidget({line:1,ch:2},"<if></if>",true); //添加部件
46              
47             //editor.setSize(1100,1100);    //设置宽高
48             //editor.scrollTo(800,300); // 设置滚动条位置
49              
50             //editor.cursorCoords({line:1,ch:2},"aaaaaa"); //..
51              
52             //for (var i in ob)
53             //    alert(i);
54             //alert(ob);
55         }
~~~



~~~html
<!--选择脚本编码代码-->
<div class="controls">
    <input class="ck-code" type="radio" name="script_once_type" id="script_once_type1" checked> shell
     <input class="ck-code" type="radio" name="script_once_type" id="script_once_type2"> bat
     <input class="ck-code" type="radio" name="script_once_type" id="script_once_type3"> python
</div>

<!--选择脚本风格代码-->
<div class="controls">
    <select id='select'>
         <option>default</option>
         <option>3024-night</option>
         <option selected>erlang-dark</option>
    </select>
</div>

<!--textarea-->
<textarea id="script_once_code">
    #!/bin/sh
</textarea>
<textarea id="code2" class="hide">
    #!/usr/bin/env python
    # -*- coding: utf8 -*-
</textarea>
~~~

~~~js
//选择界面风格JS
$('#select').change(function(){
     var theme = $('#select').val();
         editor.setOption("theme", theme); //editor.setOption()为codeMirror提供的设置风格的方法
 }); 

//选择脚本类型JS
var txt1=$("#script_once_code").val();
var txt2='';
var txt3=$("#code2").val();
$(".ck-code").click(function(){
       var txt=editor.getValue(); //editor.getValue()获取textarea中的值
       var lang=$(this).prop("id");
       if(lang=="script_once_type1") {
               editor.setOption("mode","shell");//editor.setOption()设置脚本类型
                   editor.setValue(txt1);// editor.setValue()设置textarea中的值
       }
       else if(lang=="script_once_type2") {
               editor.setOption("mode","perl");
               editor.setValue(txt2);
       }
       else {
               editor.setOption("mode","python");
               editor.setValue(txt3);
    
       }
});
~~~



主题

~~~js
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/http/http'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'

~~~

7.初始化编译器时可设置属性：

value:初始内容
Mode:设置编译器编程语言关联内容，对应的mine值
Theme:编译器的主题，需要引入对应的包
tabSize：tab的空格宽度
lineNumbers：是否使用行号
smartIndent：自动缩进是否开启
indentUnit：缩进单位



extraKeys的快捷键绑定命令：

selectAllCtrl-A ：选择编辑器的全部内容。
killLine:Emacs式的清除行。用于删除行内光标后的内容。如果只包含空白字符，行尾的新行(应该是指换行 字符)也会被删除。
deleteLine :删除光标所在整行，包括行尾的新行。
delLineLeft:删除行内光标前的内容。
delWrappedLineLeft:删除光标所在可见行左边到光标处的部分。（这里是针对在行内有换行显示的情况，也就是说可能不是一行全部处理，而是只处理行的一部分）
delWrappedLineRight：删除光标所在可见行光标处到右边的部分。（同上）
undo：撤消最后一次更改。
redo:重做最后一次撤消更改。
undoSelection:撤消最后一次选择的更改，如果没有选择更改，那么就撤消最后一次文本更改。
redoSelection:重做最后一次选择的更改，如果没有选择更改，那么就重做最后一次文本更改。
goDocStart:移动光标到文档开始处。
goDocEnd:移动光标到文档结束处。
goLineStart:移动光标到行开始处。
goLineStartSmartHome:移动光标到行文字开始处，如果光标已经在那，那么就移动到行的真正开始处。
goLineEnd:移动光标到行结束处。
goLineRight:移动光标到可见行右边。
goLineLeft：移动光标到可见行左边。如果行内有换行，那么可能不会移动到行开始处。
goLineLeftSmart：移动光标到行文字开始处，如果光标已经在那，那么就移动到行的真正开始处。
goLineUp：移动光标到上一行。
goLineDown：移动光标到下一行。
goPageUp：移动光标到上一屏，（每次）向上滚动相同距离。
goPageDown：移动光标到下一屏，（每次）向下滚动相同距离。
goCharLeft：光标向左移动一个字符，如果在光标行首，那么移动到前一行。
goCharRight：光标向右移动一个字符，如果在光标行尾，那么移动到后一行。
goColumnLeft:光标向左移动一个字符，但是不会超过行边界。
goColumnRight：光标向右移动一个字符，但是不会超过行边界。
goWordLeft:光标移动到前一个词开始处。
goWordRight：光标移动到后一个词结束处。
goGroupLeft：移动光标到光标前的组的左边。组是词的扩展，扩展到标点符号，新行或者是多个空白字符。
goGroupRight：移动光标到光标后的组的右边。组是词的扩展，扩展到标点符号，新行或者是多个空白字符。
delCharBefore:删除光标前的一个字符。
delCharAfter:删除光标后的一个字符。
delWordBefore:删除光标前的一个词。
delWordAfter:删除光标后的一个词。
delGroupBefore：删除光标前的一个组。
delGroupAfter：删除光标后的一个组。
indentAuto：自动缩进当前行或选中行。
indentMore：缩进当前行或选中行一个缩进单位。
indentLess：反缩进当前行或选中行一个缩进单位。（移除一个缩进单元）
insertTab：在光标处插入Tab字符。
insertSoftTab：在光标处插入与Tab字符等宽的空格字符。
defaultTabTab：如果有选中行，则缩进一个缩进单位；如果没有选择行，则插入一个Tab字符。
transposeChars：交换光标前后的字符。
newlineAndIndentEnter：插入新行并且自动缩进。
toggleOverwriteInsert：反转overwrite标志。
save：只存在快捷键中，核心库未定义。这是为了给用户编码提供一个简单的方法来定义保存命令。
find：查找。
findNext:向前查找。
findPrev:向后查找。
replace:替换。
replaceAll:全部替换。
scrollbarStyle: 设置滚动条,默认为"null"为不显示的滚动条，可以使用提供的其他滚动条：“simple”,"overlay"选择内侧与外侧的滚动条,使用需引入以下工具包：

import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
1
2
readOnly：设置为只读true/false;也可设置为"nocursor"失去焦点
Autofocus：初始时是否自动获取焦点boolean
styleActiveLine: 设置光标所在行高亮true/false，需引入工具包：
import 'codemirror/addon/selection/active-line'
1
8.动态设置CodeMirror属性：(以设置支持语言mode为例)

this.CodeMirrorEditor.setOption("mode",this.something)   
1
编译器的事件触发器
触发器使用方法：(change事件为例)

this.CodeMirrorEditor.on("change",function(){
//事件触发后执行事件
alert("change")
});
1
2
3
4
取消触发器方法：

this.CodeMirrorEditor.off("change")
1
“changes”：每次编辑器内容更改时触发
“beforeChange”：事件在更改生效前触发
“cursorActivity”：当光标或选中(内容)发生变化，或者编辑器的内容发生了更改的时候触发。
“keyHandled”:快捷键映射(key map)中的快捷键被处理(handle)后触发
“inputRead”:当用户输入或粘贴时编辑器时触发。
“electrictInput”:收到指定的electrict输入时触发
“beforeSelectionChange”:此事件在选中内容变化前触发
“viewportChange”：编辑器的视口( view port )改变（滚动，编辑或其它动作）时触发
“gutterClick”：编辑器的gutter(行号区域)点击时触发
“focus”：编辑器收到焦点时触发
“blur”:编辑器失去焦点时触发
“scroll”:编辑器滚动条滚动时触发
“keydown”, “keypress”, “keyup”，“mousedown”, “dblclick”硬件事件触发器
API
this.CodeMirrorEditor.setValue(“Hello Kitty”)：设置编辑器内容
this.CodeMirrorEditor.getValue()：获取编辑器内容
this.CodeMirrorEditor.getLine(n):获取第n行的内容
this.CodeMirrorEditor.lineCount()：获取当前行数
this.CodeMirrorEditor.lastLine()：获取最后一行的行号
this.CodeMirrorEditor.isClean():boolean类型判断编译器是否是clean的
this.CodeMirrorEditor.getSelection()：获取选中内容
this.CodeMirrorEditor.getSelections():返回array类型选中内容
this.CodeMirrorEditor.replaceSelection(“替换后的内容”):替换选中的内容
this.CodeMirrorEditor.getCursor():获取光标位置,返回{line,char}
this.CodeMirrorEditor.setOption("",""):设置编译器属性
this.CodeMirrorEditor.getOption(""):获取编译器属性
this.CodeMirrorEditor.addKeyMap("",""):添加key-map键值，该键值具有比原来键值更高的优先级
this.CodeMirrorEditor.removeKeyMap（""）:移除key-map
this.CodeMirrorEditor.addOverlay(""):Enable a highlighting overlay…没试出效果
this.CodeMirrorEditor.removeOverlay（""）:移除Overlay
this.CodeMirrorEditor.setSize(width,height):设置编译器大小
this.CodeMirrorEditor.scrollTo(x,y):设置scroll到position位置
this.CodeMirrorEditor.refresh():刷新编辑器