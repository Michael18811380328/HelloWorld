## svg

http://www.ruanyifeng.com/blog/2018/08/svg.html

### 1、svg 插入界面

方法一：直接以svg标签插入界面中

方法二：以外部文件的形式插入embed iframe 标签中

方法三：以 css 的背景图片插入界面中

### 2、svg标签使用

==基本图形==

~~~html
<svg width='100%' height='100%' viewBox="50 50 50 50">
	<circle id="myCircle" cx='50' cy='50' r='50' class='redCircle'/>
  <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:5"/>
  <polyline points="3,3 30,28 3,53" fill="none" stroke="black" />
  <rect x="0" y="0" height="100" width="200"/>
  <ellipse cx='0' cy='0' rx='10' ry='20' stroke='black' stroke-width='2px' fill='blue'/>
  <polygon fill="green" stroke="orange" stroke-width="1" points="0,0 100,0 100,100 0,100 0,0"/>
</svg>
~~~

#### svg

其中的 width 和 height 属性类似于 canvas 中的属性，表示当前的svg文件在父元素中的宽度。默认svg的大小是 300×150px。width和height也可以使用像素定义（为了响应式通常采用百分比定义）。

viewBox 表示视口；前两个是坐标（左上角为00， 这时从 50，50 点开始）后两个是长度和宽度，表示（50-100，50-100 的图形）。实际上获取的svg图形是界面中的右下角的一部分。

#### circle

其中的cx-cy表示圆心的坐标，相对于左上角的原点的圆心的位置；r表示半径。class表示类名，可以给背景色（和 传统的背景色不同）。

~~~css
.redCircle {
  fill: red; /* 填充色 */
  stroke: black; /* 描边色 */
  stroke-width: 3pt; /* 描边宽度 */
}
/* 单位 pt 点(point) 9pt == 12px */
~~~

Px 是像素，实际的长度与屏幕分辨率有关，通常用于显示；pt 是点，实际的长度是固定的，通常同于字体印刷。

#### line

线段；from (x1, y1) to (x2, y2) 

属性只有 stroke  stroke-width 没有填充颜色

#### polyline

折线 从一些列的点进行绘制图形

#### rect

矩形

#### ellipse

椭圆形 表示椭圆的圆心和长半径短半径

#### polygon

多边形，给定不同顶点的坐标。

~~~html
<svg width="300" height="180">
<path d="
  M 18,3
  L 46,3
  Z
"></path>
</svg>
~~~

#### path

路径：move lineto 

==功能标签==

#### text

用于绘制文字

~~~html
<svg width='100%' height='100%'>
  <text x='0' y='100'>Hello SVG</text>
</svg>
~~~

#### use

~~~html
<svg>
  <g id="circle-group">
  	<circle cx='20' cy='30' r='10' id='circle-one'/>
    <circle cx='20' cy='30' r='10' id='circle-two'/>
  </g>
  <use href="#circle-one" x='10' y='10'/>
</svg>
~~~

将一个矢量图形复制到另一个位置，可以调节内部的颜色和其他属性；

#### g

群组标签，便于复制群组的svg。

~~~html
<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="path/to/image.jpg"
    width="50%" height="50%"/>
</svg>
~~~

#### image

用于在svg中设置另一个图片；xlink:href 属性设置图片的原始位置（和src不同）

~~~html
<svg width="500px" height="500px">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  </rect>
</svg>

<svg>
  <rect>
    <animate attributeName="x" from='0' to='500' dur="2s" repearCount='indefinite'/>
  </rect>
</svg>

<rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
  </rect>
~~~

#### animate 动画

对于转换的动画，使用 animateTransform 可以实现（transform: translate(3D)）

attributeName 表示变换的参数

from to 表示变换前后的位置属性

dur 表示变换的时间

repeatCount 表示变换动画名称

type 表示变形的名称 rotate translate 

### 3、JS 操作 svg

svg 作为一个DOM元素，可以使用 css 或者 JS 进行设计样式或者处理事件。

使用 class 设置界面的样式，使用 id 设置界面的动画。

~~~js
let svg = document.getElementByID('circle');
svg.addEventListener('click', function(){
  console.log("hi");
  svg.setSttribute('r', 100);
});
~~~

Svg  转化成为 canvas

~~~js
var img = new Image();
var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

var DOMURL = self.URL || self.webkitURL || self;
var url = DOMURL.createObjectURL(svg);

img.src = url;

// 图像加载完毕后

img.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
};
~~~



