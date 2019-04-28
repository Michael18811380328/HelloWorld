## Code mirror 

code mirror 是一个代码编辑插件

### 在常规HTML界面使用

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

配置文件

~~~js
var editor = CodeMirror.fromTextArea($("#script_once_code")[0], { //script_once_code为你的textarea的ID号
           lineNumbers: true,//是否显示行号
           mode:"shell",　//默认脚本编码
          lineWrapping:true, //是否强制换行
 });
~~~

改变语言背景处理

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



### 在 react 中使用

1. 安装 react-codemirror

   ~~~bash
   npm install react
   npm install react-codemirror
   ~~~

2. 引入文件

   ~~~js
   import CodeMirror from 'react-codemirror';
   // 引入codemirror
   
   import 'codemirror/lib/codemirror.css';
   // 引入基本样式
   
   import 'codemirror/mode/sql/sql';
   // 引入语言类型(可选)
   
   import 'codemirror/theme/monikai.css';
   // 引入主题颜色(可选)
   ~~~

3. 组件使用
  ~~~js
  <CodeMirror
  	ref="editor"
  	value={this.state.code}
  	options={options}
  	onChange={code => this.handleCodeChange(code)}
		width="960px"
		height="600px"
  />
  ~~~

4. 组件配置
  ~~~js
  const options={  
    lineNumbers: true,                     //显示行号  
    mode: {name: "javascript", json: true},    //定义mode  
    extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置  
    theme: "ambiance",                  //选中的theme
    value: 'const a = 1;', // 初始值，字符串或者Document对象
    indentUnit: 4, // 缩进单位(默认2)
    smartIndent: true, // 是否智能缩进 默认 true
    tabSize: 4, // tab 宽度
    keyMap: 'default', // 是否配置秘钥映射
    lineWrapping: true, // 是否换行(默认不换行 scroll)
    lineNumbers: true, // 是否显示行号
    firstLineNumber: 3, // 初始行号(默认是1，通常不需要设置)
    readOnly: true/false/nocursor, // 只读模式
    undoDepth: 40, // 撤销次数
    autofocus: boolean, // 初始自动聚焦
    onDragEvent: true,
    onKeyEvent: true, // 是否允许拖拽事件和键盘事件
  };
  ~~~

5. 操作组件（API）
  ~~~js
const codeMirror = this.refs.editor.getCodeMirror();  
console.log(codeMirror.getSelection());

codeMirror.setValue(this.state.newCode);
codeMirror.getValue(this.state.newCode);
  ~~~

其他使用：https://uiw-react.github.io/react-codemirror/

事件 https://codemirror.net/doc/manual.html



#### 选择组件

~~~js
import React from 'react';
import styles from './index.less';

const Select = ({ value, options, onChange }) => {
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      {options.map((item, key) => {
        const optionProps = { key };
        if (value === item) {
          optionProps.value = item;
        }
        return (
          <option {...optionProps}> {item} </option>
        );
      })}
    </select>
  );
};

export default Select;
~~~

通过选择组件，控制 code-mirror 的语言类型、背景类型、代码编码类型（value）;

https://blog.csdn.net/jlu_lei/article/details/80259697