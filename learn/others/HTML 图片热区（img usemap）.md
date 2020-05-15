# HTML 图片热区（img usemap）

# <img> element ‘s attribute: usemap

MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

> The partial URL (starting with ‘#’) of an image map associated with the element.
>
> Usage note: You cannot use this attribute if the <img> element is a descendant of an <a> or <button> element.

与该元素关联的图片热区的部分URL（以’#’打头的）。

使用说明：如果 <img> 元素继承自 <a> 或者 <button> 元素，那么你将不能使用该属性。

该属性的值为 <map> 元素的 name 属性。

# <map>

MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map

> The HTML <map> element is used with <area> elements to define an image map (a clickable link area).

HTML 的 <map> 元素使用 <area> 元素来定义图片热区（一个可以单击的链接区域）。

## Attributes

### name

> The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value.

name 属性给了该热图一个名字，以至于它可以被引用。该属性必须存在并且必须是一个非空的值并且不带空格。名字属性的值在同一个文档中不能与其它map元素重复。如果 id 属性也被指定了，那么两个属性必须是相同的值。

# area

MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area

> The HTML <area> element defines a hot-spot region on an image, and optionally associates it with a hypertext link. This element is used only within a <map> element.

HTML area 元素在一个图片上定义了一个热点区域，并且有选择性地关联到一个超链接。该元素只能在<map>元素中使用。

## Attributes

### coords

> A set of values specifying the coordinates of the hot-spot region. The number and meaning of the values depend upon the value specified for the shape attribute. For a rect or rectangle shape, the coords value is two x,y pairs: left, top, right, and bottom. For a circle shape, the value is x,y,r where x,y is a pair specifying the center of the circle and r is a value for the radius. For a poly or polygon shape, the value is a set of x,y pairs for each point in the polygon: x1,y1,x2,y2,x3,y3, and so on. In HTML4, the values are numbers of pixels or percentages, if a percent sign (%) is appended; in HTML5, the values are numbers of CSS pixels.

一系列用来指定热点区域坐标的值。该数字和它的值的意义根据 shape 属性指定的值来决定。对于一个矩形（rect or rectangle），coords 的值是两对 x,y，左上和右下。对于圆形（circle），该值是 x,y,r，其中 x,y 对指定了圆的中心，r 是半径的值。对于一个多边形（poly or polygon），该值是一系列的 x,y 对，是多边形的每一个点，x1,y1,x2,y2,x3,y3, 等等。在HTML4中，该值可以是像素，如果百分号被追加到其后的话就是百分比；在HTML5中，该值是CSS中的像素。

### href

> The hyperlink target for the area. Its value is a valid URL. In HTML4, either this attribute or the nohref attribute must be present in the element. In HTML5, this attribute may be omitted; if so, the area element does not represent a hyperlink.

对应区域的超链接。它的值是一个合法的URL。在 HTML4中，在该元素中，这个属性或者 nohref 属性必须有一个存在。在 HTML5中，这个属性可以被省略，如果这样的话，区域元素就必能表示一个超链接。

### shape

> The shape of the associated hot spot. The specifications for HTML 5 and HTML 4 define the values rect, which defines a rectangular region; circle, which defines a circular region; poly, which defines a polygon; and default, which indicates the entire region beyond any defined shapes. Many browsers, notably Internet Explorer 4 and higher, support circ, polygon, and rectangle as valid values for shape.

与热点关联的形状。HTML5 和 HTML4 的说明书定义了 rect 值，它定义了一个矩形区域；circle，它定义了一个圆形区域；poly，它定义了一个多边形区域；默认情况下，它指明了所有定义的区域形状。许多浏览器，尤其是 Internet Explorer 4 和 更高版本， 支持圆形，多边形和矩形作为形状的合法值。

# Example

浏览器默认没有图片热区方框，而且 alt 属性（鼠标在其上时会有文字提示）也不会生效。

实现热区方框的方式有三种：

- div + border 
  适用于只有矩形或圆形的热区的情况下。首推，因为其最简便。
- svg 
  适用于具有多边形的热区的情况下。
- canvas 
  可以通过 ctx.beginPath() 来画点，然后通过 ctx.isPointInPath(x,y) 来判断点是否在形状内。但是由于区域不能保留故每次都要重新拼接，所以该方法并不推荐。

下面的例子演示了前两种。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf8">
    <style>
        #container {
            position: relative;
            margin: 50px;
            border: 1px dashed black;
            display: inline-block;
        }
        #mapBorder {
            position: absolute;
            border: 2px solid red;
            display: none;
        }
        #svg {
            position: absolute;
            top: 0;
            left: 0;
        }
        .normalSvgBorder {
            fill: rgba(220,220,220,0.3);
            stroke: black;
            stroke-width: 2;
            stroke-dasharray: 5;
        }
        .focusSvgBorder {
            fill: transparent;
            stroke: red;
            stroke-width: 5;
        }
    </style>
</head>
<body>
    <div id="container">
        <img id="img" src="SaintSeiya.jpg" usemap="imgMap"/>
        <map name="imgMap">
        </map>
        <div id="mapBorder"></div>
        <svg id="svg" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <script>
        //SVG 名空间
        var xmlns_svg = "http://www.w3.org/2000/svg";
        var baseHref = "https://www.baidu.com/s?ie=UTF-8&wd=";
        var mapAreas = [
            {"keyword": "星矢", "shape": "rect", "coords": [70, 10, 170, 110]},
            {"keyword": "一辉", "shape": "poly", "coords": [210, 100, 180, 140, 210, 190, 240, 150]},
            {"keyword": "紫龙", "shape": "poly", "coords": [230, 120, 270, 180, 300, 100]},
            {"keyword": "冰河", "shape": "poly", "coords": [300, 50, 280, 110, 330, 160, 380, 120, 380, 80, 370, 50]},
            {"keyword": "阿瞬", "shape": "circle", "coords": [420, 100, 40]}
        ];
        var img = document.getElementById("img");
        var imgMap = document.getElementsByName("imgMap")[0];
        var mapBorder = document.getElementById("mapBorder");
        var svg = document.getElementById("svg");

        img.onload = function() {
            svg.style.width = img.width;
            svg.style.height = img.height;
        }

        mapAreas.forEach(function(region) {
            //添加area
            var area = document.createElement("area");
            area.shape = region.shape;
            area.coords = region.coords.join(",");
            area.href = baseHref + encodeURI(region.keyword);
            area.target = "_blank";
            //area.addEventListener("mouseenter", showBorder);
            //area.addEventListener("mouseleave", hideBorder);
            imgMap.appendChild(area);

            //添加svg
            var svgElem;
            switch(region.shape) {
            case "circle":
                svgElem = createSvgElem("circle");
                svgElem.setAttribute("cx", region.coords[0]);
                svgElem.setAttribute("cy", region.coords[1]);
                svgElem.setAttribute("r", region.coords[2]);
                break;
            case "rect":
                svgElem = createSvgElem("rect");
                svgElem.setAttribute("x", region.coords[0]);
                svgElem.setAttribute("y", region.coords[1]);
                svgElem.setAttribute("width", region.coords[2] - region.coords[0]);
                svgElem.setAttribute("height", region.coords[3] - region.coords[1]);
                break;
            case "poly":
                svgElem = createSvgElem("polygon");
                svgElem.setAttribute("points", region.coords.join(" "));
                break;
            }
            svgElem.setAttribute("class", "normalSvgBorder");
            svgElem.addEventListener("mouseenter", showSvgBorder);
            svgElem.addEventListener("mouseleave", hideSvgBorder);
            svg.appendChild(svgElem);
        });

        //创建SVG标签
        function createSvgElem(elemTag) {
            return document.createElementNS(xmlns_svg, elemTag);
        }

        function showSvgBorder() {
            event.target.setAttribute("class", "focusSvgBorder");
        }

        function hideSvgBorder() {
            event.target.setAttribute("class", "normalSvgBorder");
        }

        function showBorder(){
            //offset是相对于父对象的边距. 对于普通元素用Left,Top; 对于event使用X,Y
            var x = img.offsetLeft;
            var y = img.offsetTop;
            var coords = event.target.coords.split(",");
            for(var i=0; i<coords.length; i++) {
                coords[i] = parseInt(coords[i]);
            }
            switch(event.target.shape) {
            case "circle":
                mapBorder.style.borderRadius = "50%";
                mapBorder.style.left = x + coords[0] - coords[2] + "px";
                mapBorder.style.top = y + coords[1] - coords[2] + "px";
                var size = 2 * coords[2];
                //这里一定要加单位，否则设置无效
                mapBorder.style.width = size + "px";
                mapBorder.style.height = size + "px";
            break;
            case "rect":
                mapBorder.style.borderRadius = 0;
                mapBorder.style.left = x + coords[0] + "px";
                mapBorder.style.top = y + coords[1] + "px";
                mapBorder.style.width = coords[2] - coords[0] + "px";
                mapBorder.style.height = coords[3] - coords[1] + "px";
            break;
            case "poly":
                //边框只能是矩形或者圆形，不能是任意的多边形
            break;
            }
            mapBorder.style.display = "block";
        }
        function hideBorder(){
            mapBorder.style.display = "none";
        }
    </script>
</body>
</html>
```

运行截图：

![这里写图片描述](https://img-blog.csdn.net/20170214000526778)

使用图片：

![这里写图片描述](https://img-blog.csdn.net/20170213201629401)

# 开源组件

另外，网上查到一款开源“地图高亮组件”：[http://www.netzgesta.de/mapper/#](http://www.netzgesta.de/mapper/#)

![这里写图片描述](https://img-blog.csdn.net/20170213141455877)

![这里写图片描述](https://img-blog.csdn.net/20170213141506300)