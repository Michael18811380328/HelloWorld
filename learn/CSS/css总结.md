2018.01.13

font-family 可以选择多个字体，逗号隔开；不同电脑安装字体不一样，英文字体单个单词不用加引号，其他情况都需要加引号，尽量使用默认字体便于浏览器兼容，使用汉字部分系统XP不能识别，最好使用英文或者unicode编码字体-查找代码

字体使用斜杠\其他标签使用反斜杠/

使用i或者em标签也可以表示倾斜，属性normal或italic通常情况下可以让粗体变成非粗体
font-weight 属性：100-900 表示粗细 lighter bold(700) normal(400) 使用数字

~~~css
em {
color:blue;
font:normal bold 20px "微软雅黑";
}
~~~
重点：综合编辑字体样式,先后顺序不能乱（文字颜色单独写）前两个可以省略，字号和字体不能省略 font-size and font-family 否则不能使用

01.15

注意事项：选择器需要从类名称一直写到需要对象的所有层次-中间不能有间隔；如果有超链接文字，链接点击前后属性可能发生变化（点击后不能回到原始属性）；如果有不对的地方一定要弄明白原因，可能是语法错误；学会从浏览器测试中找原因。

01.17 优先级

！impotant>id>class>tag>body> * >继承

选择器还有一点模糊（子代后代，兄弟等等）JQ选择器和CSS选择器的关系。

01.19 盒子模型

~~~css
box-sizing: content-box;
/*标准W3C规定的盒子模式（总长度=width+padding+border)*/
box-sizing: border-box;
/*CSS3新增的盒子模型（总长度=width）content+padding+border=width*/
/*不管哪种盒子模型都不影响margin长度*/


opacity:0.8;
filter:alpha(opacity=95); /* 针对 IE8 以及更早的版本 */
transform: scale(1.3);

		div img {
			position:absolute;
			top:-20px;
			left: 250px;
			/*display:none;*/
			cursor: pointer;
			transition: all 10s;
		}
		div:hover img {
			display:block;
			transform: scale(5);
			opacity: 0.7;
		}
动画变形效果：父元素添加变形的时间；子盒子transform：具体的变形情况


利用文字阴影效果（内外）设计凹凸效果
/*整体设置背景颜色为灰色*/
	div {
		font:700 100px "microsoft yahei";
		color:#bbbbbb;
	}
	/*设置所有文字颜色为灰色，加粗（700）文字尽量大（100px）字体不能少；*/
	div:first-child {
		text-shadow: 1px 1px 1px #000, -1px -1px 1px #fff;
	}
	/*设置文字阴影：右下方一个黑色阴影，左上方白色阴影；*/
	/*div:first-child 伪类*/
	div:last-child {
		text-shadow: 1px 1px 1px #fff, -1px -1px 1px #000;
	}
~~~

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
	* {
		margin: 0;
		padding: 0;
		background-color: rgba(250,250,250,0.95);
	}
	div {
		background-color: pink;
		width: 400px;
		height: 400px;
		margin: 100px auto;
	}
	a {
		display: inline-block;
		text-decoration: none;
		height: 200px;
		padding-left: 20px;
		background-image: url(images/door.png) no-repeat;
	}
	a span {
		display: inline-block;
		height: 200px;
		padding-right: 20px;
		background-image: url(images/door.png) no-repeat right;	
	}
	div::before {
		content:"summer";
		background-color: #ccc;
		border: 1px solid black;
		display: inline-block;
	}
	</style>
</head>
<body>
	<!-- 滑动门练习 -->
	<div>
		<a href="#"><span>spring</span></a>
	</div>
</body>
</html>

<!-- 伪元素选择器 -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		div {
			width: 1000px;
			height: 600px;
			margin: 10px auto;
			position:relative;
		}
		div:hover::before {
			content: "";
			/*伪类选择器内部必须有内容否则无法显示*/
			display: block;
			width: 1000px;
			height: 600px;
			border: 1px solid red;
			position: absolute;
			top:0;
			left:0;
			box-sizing: border-box;
			/*转换成边框盒子模型效果更好*/
		}
	</style>
</head>
<body>
	<div><img src="travel.png" alt=""></div>
</body>
</html>

<!-- 过渡效果：动画 -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
	div {
		width: 200px;
		height: 200px;
		border: 2px dashed rgba(0,0,50,0,8);
		margin:100px auto;
		background-color: blue;
		transition: width 0.5s ease 0s, height 0.5s ease 0.5s, border 0.5s ease 1s, background-color 2.5s ease 1.5s;
	}
	/*凡是有变化的情况，不管是hover，还是::after,还是transform等，都可以用这个效果实现过渡。transition需要添加到变换的对象的父元素上面。*/
	div:hover {
		width: 400px;
		height: 400px;
		border: 5px solid rgba(1,1,1,0.3);
		background-color: pink;
	}
	</style>
</head>
<body>
	<div></div>
</body>
</html>


<!-- 变换旋转效果 -->
<style>
	* {
		margin: 0;
		padding: 0;
		background-color: rgba(0,0,0,0.5);
	}
	div {
		width: 300px;
		height: 300px;
		border: 1px solid blue;
		margin: 20px auto;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}
	div img {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 1s;
	}
	.first:hover img {
		transform: translate(10px,10px);
	}
	.middle:hover img {
		transform: scale(1.2,1.2);
	}
	.last img {
		width: 30%;
		height: 15%;
		margin: 200px 200px;
		transform-origin: left center;
		/*设置旋转中心的位置*/
	}
	.last:hover img:nth-child(1) {
		transform: rotate(60deg);
	}
	.last:hover img:nth-child(2){
		transform: rotate(120deg);
	}
</style>

<!-- 开门大吉效果 -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
	section {
		width: 240px;
		height: 240px;
		border: 1px solid #000;
		background-image: url(images/oil.jpg);
		margin:50px auto;
		position: relative;
	}
	section div {
		width: 50%;
		height: 240px;
		border: 1px solid black;
		background-color: pink;
		position: absolute;
		perspective: 1000px;
		/*3D透视距离*/
		transition: all 2s;
	}
	section:hover .door-l {
		transform-origin: left;
		transform: rotateY(130deg);
	}
	section:hover .door-r {
		transform-origin: right;
		transform: rotateY(130deg);
	}
	div.door-r {
		right:0;
	}
	.door-l::before {
		content:"";
		width: 20px;
		height: 20px;
		border: 1px solid #000;
		border-radius: 50%;
		position: absolute;
		right: 10px;
		top: 50%;
		background-color: gold;
	}
	.door-r::before {
		content:"";
		width: 20px;
		height: 20px;
		border: 1px solid #000;
		border-radius: 50%;
		position: absolute;
		left: 10px;
		top: 50%;
		background-color: gold;
	}
	</style>
</head>
<body>
	<section>
		<div class="door-l"></div>
		<div class="door-r"></div>
	</section>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
	div {
		width: 105px;
		height: 90px;
		margin: 100px auto;
		position: relative;
	}
	div img {
		position:absolute;
		transition: all 3s;
	}
	div img:first-child {
		z-index:1;
		backface-visibility:hidden;
	}
	div:hover img {
		transform: rotateY(180deg);
	}
	</style>
</head>
<body>
	<div>
		<img src="image" alt="">
		s<img src="image" alt="">
	</div>
</body>
</html>
~~~

