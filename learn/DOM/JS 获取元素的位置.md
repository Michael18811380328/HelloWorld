## JS 获取界面的属性

在react中使用虚拟DOM进行渲染，但是BOM部分还是需要使用原生JS的内容。

网页可见区域宽： document.body.clientWidth 
网页可见区域高： document.body.clientHeight 
网页可见区域宽： document.body.offsetWidth (包括边线的宽) 
网页可见区域高： document.body.offsetHeight (包括边线的高) 

网页正文全文宽： document.body.scrollWidth 
网页正文全文高： document.body.scrollHeight 

网页被卷去的高： document.body.scrollTop 
网页被卷去的左： document.body.scrollLeft 

网页正文部分上： window.screenTop 
网页正文部分左： window.screenLeft 

屏幕分辨率的高： window.screen.height 
屏幕分辨率的宽： window.screen.width 

屏幕可用工作区高度： window.screen.availHeight 
屏幕可用工作区宽度： window.screen.availWidth 



浏览器兼容性
Opera使用 

document.body.clientWidth 
document.body.clientHeight 

可是IE和FireFox则使用 
document.documentElement.clientWidth 
document.documentElement.clientHeight 

**在IE中**： 
document.body.clientWidth ==> BODY对象宽度 
document.body.clientHeight ==> BODY对象高度 
document.documentElement.clientWidth ==> 可见区域宽度 
document.documentElement.clientHeight ==> 可见区域高度 

**在FireFox中**： 
document.body.clientWidth ==> BODY对象宽度 
document.body.clientHeight ==> BODY对象高度 
document.documentElement.clientWidth ==> 可见区域宽度 
document.documentElement.clientHeight ==> 可见区域高度 

**在Opera中**： 
document.body.clientWidth ==> 可见区域宽度 
document.body.clientHeight ==> 可见区域高度 
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽） 
document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高） 



而如果没有定义W3C的标准，则 
**IE为**： 
document.documentElement.clientWidth ==> 0 
document.documentElement.clientHeight ==> 0 
**FireFox为**： 
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高） 
**Opera为**： 
document.documentElement.clientWidth ==> 页面对象宽度（即BODY对象宽度加上Margin宽）document.documentElement.clientHeight ==> 页面对象高度（即BODY对象高度加上Margin高） 




原生JS获得光标位置——在react中不建议直接获取元素，在slate中有单独的API。

~~~js
// 获取光标位置
function getCursortPosition (textDom) {
  var cursorPos = 0;
  if (document.selection) {
    // IE Support
    textDom.focus ();
    var selectRange = document.selection.createRange();
    selectRange.moveStart ('character', -textDom.value.length);
    cursorPos = selectRange.text.length;
  }else if (textDom.selectionStart || textDom.selectionStart == '0') {
    // Firefox support
    cursorPos = textDom.selectionStart;
  }
  return cursorPos;
}

// 设置光标位置
function setCaretPosition(textDom, pos){
  if(textDom.setSelectionRange) {
    // IE Support
    textDom.focus();
    textDom.setSelectionRange(pos, pos);
  }else if (textDom.createTextRange) {
    // Firefox support
    var range = textDom.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

// 获取选中文字
function getSelectText() {
  var userSelection, text;
  if (window.getSelection) {
    // Firefox support
    userSelection = window.getSelection();
  } else if (document.selection) {
    // IE Support
    userSelection = document.selection.createRange();
  }
  if (!(text = userSelection.text)) {
    text = userSelection;
  }
  return text;
}

/**
* 选中特定范围的文本
* 参数：
*     textDom  [JavaScript DOM String] 当前对象
*     startPos  [Int]  起始位置
*     endPos  [Int]  终点位置
*/
function setSelectText(textDom, startPos, endPos) {
  var startPos = parseInt(startPos),
      endPos = parseInt(endPos),
      textLength = textDom.value.length;
  if(textLength){
    if(!startPos){
      startPos = 0;
    }
    if(!endPos){
      endPos = textLength;
    }
    if(startPos > textLength){
      startPos = textLength;
    }
    if(endPos > textLength){
      endPos = textLength;
    }
    if(startPos < 0){
      startPos = textLength + startPos;
    }
    if(endPos < 0){
      endPos = textLength + endPos;
    }
    if(textDom.createTextRange){
      // IE Support
      var range = textDom.createTextRange();
      range.moveStart("character",-textLength);
      range.moveEnd("character",-textLength);
      range.moveStart("character", startPos);
      range.moveEnd("character",endPos);
      range.select();
    }else{
      // Firefox support
      textDom.setSelectionRange(startPos, endPos);
      textDom.focus();
    }
  }
}

/**
* 在光标后插入文本
* 参数：
*     textDom  [JavaScript DOM String] 当前对象
*     value  [String]  要插入的文本
*/
function insertAfterText(textDom, value) {
  var selectRange;
  if (document.selection) {
    // IE Support
    textDom.focus();
    selectRange = document.selection.createRange();
    selectRange.text = value;
    textDom.focus();
  }else if (textDom.selectionStart || textDom.selectionStart == '0') {
    // Firefox support
    var startPos = textDom.selectionStart;
    var endPos = textDom.selectionEnd;
    var scrollTop = textDom.scrollTop;
    textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
    textDom.focus();
    textDom.selectionStart = startPos + value.length;
    textDom.selectionEnd = startPos + value.length;
    textDom.scrollTop = scrollTop;
  }
  else {
    textDom.value += value;
    textDom.focus();
  }
}

~~~



## js 获取页面元素位置

 document.documentElement.getBoundingClientRect

该方法获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。

该方法已经不再是IE Only了，FF3.0+和Opera9.5+已经支持了该方法，可以说在获得页面元素位置上效率能有很大的提高，在以前版本的Opera和Firefox中必须通过循环来获得元素在页面中的绝对位置。 

下面的代码举了个简单的例子，可以滚动滚动条之后点红色区域看各个值的变化。

~~~html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
  <head> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    <title>Demo</title> 
  </head> 
  <body style="width:2000px; height:1000px;"> 
    <div id="demo" style="position:absolute; left:518px; right:100px; width:500px; height:500px; background:#CC0000; top: 114px;">Demo为了方便就直接用绝对定位的元素</div> 
  </body> 
</html> 
<script> 
  document.getElementById('demo').onclick=function (){ 
    if (document.documentElement.getBoundingClientRect) { 
      alert("left:"+this.getBoundingClientRect().left) 
      alert("top:"+this.getBoundingClientRect().top) 
      alert("right:"+this.getBoundingClientRect().right) 
      alert("bottom:"+this.getBoundingClientRect().bottom) 
      var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft; 
      var Y = this.getBoundingClientRect().top+document.documentElement.scrollTop; 
      alert("Demo的位置是X:"+X+";Y:"+Y) 
    } 
  } 
</script> 
~~~


有了这个方法，获取页面元素的位置就简单多了


var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft; 

var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;