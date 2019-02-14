# [js 获取页面元素位置](https://www.cnblogs.com/bmwa/articles/4975848.html)

 

document.documentElement.getBoundingClientRect

 

下面这是MSDN的解释：

Syntax

> ```
> oRect = object.getBoundingClientRect()
> ```

Return Value

> Returns a **TextRectangle** object. Each rectangle has four integer properties (top, left, right, and bottom) that represent a coordinate of the rectangle, in pixels.

Remarks

> This method retrieves an object that exposes the left, top, right, and bottom coordinates of the union of rectangles relative to the client's upper-left corner. In Microsoft Internet Explorer 5, the window's upper-left is at 2,2 (pixels) with respect to the true client.
>
>  

 

还是实际解释下，该方法获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。也不好理解，下面用图说明下。

该方法已经不再是IE Only了，FF3.0+和Opera9.5+已经支持了该方法，可以说在获得页面元素位置上效率能有很大的提高，在以前版本的Opera和Firefox中必须通过循环来获得元素在页面中的绝对位置。

 

![在新窗口打开图片](http://files.jb51.net/upload/201011/20101125220619525.gif)

 

![在新窗口打开图片](http://files.jb51.net/upload/201011/20101125220619816.gif)

 

下面的代码举了个简单的例子，可以滚动滚动条之后点红色区域看各个值的变化。

复制代码代码如下:

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

 

有了这个方法，获取页面元素的位置就简单多了， 

 

 

var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft; 

 

var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;